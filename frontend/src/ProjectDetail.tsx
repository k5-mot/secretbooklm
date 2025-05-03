import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MicIcon from "@mui/icons-material/Mic";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditIcon from "@mui/icons-material/Edit";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import TuneIcon from "@mui/icons-material/Tune";
import ArticleIcon from "@mui/icons-material/Article";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Avatar,
  Box,
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Checkbox,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Source, Message, Memo, ProjectDetail } from "./types/ProjectDetail";
import { fetchProjectDetail } from "./api/ProjectDetail"; // APIからプロジェクト詳細を取得する関数

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // プロジェクトデータの状態
  const [projectData, setProjectData] = React.useState<ProjectDetail>({
    id: "",
    name: "",
    description: "",
    sources: [],
    messages: [],
    memos: [],
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // プロジェクトIDが存在しない場合はリダイレクト
  React.useEffect(() => {
    if (!projectId) {
      void navigate("/list");
    }
  }, [projectId, navigate]);

  // プロジェクトデータを取得
  React.useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProjectDetail(projectId);
        setProjectData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "プロジェクトの取得に失敗しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProjectData();
  }, [projectId]);

  // ソース（左列）の状態
  // const [sources, setSources] = React.useState<Source[]>([]);

  // チャット（中央列）の状態
  // const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState("");

  // メッセージ一覧の自動スクロール用のref
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // スタジオ（右列）の状態
  // const [memos, setMemos] = React.useState<Memo[]>([]);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = React.useState(false);
  const [podcastProgress, setPodcastProgress] = React.useState(0);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = React.useState(false);
  const [customPrompt, setCustomPrompt] = React.useState("");

  // 左列と右列の折り畳み状態
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = React.useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = React.useState(false);

  // ソース詳細表示の状態
  const [selectedSourceId, setSelectedSourceId] = React.useState<string | null>(null);
  const [sourceContent, setSourceContent] = React.useState<string>("");

  // メモ詳細表示の状態
  const [selectedMemoId, setSelectedMemoId] = React.useState<string | null>(null);

  // メッセージの評価状態 (messageId -> "good" | "bad" | null)
  const [messageRatings, setMessageRatings] = React.useState<
    Record<string, "good" | "bad" | null>
  >({});

  // ソースリストのUI状態
  const [hoveredSourceId, setHoveredSourceId] = React.useState<string | null>(null);
  const [contextMenuAnchor, setContextMenuAnchor] = React.useState<{
    mouseX: number;
    mouseY: number;
    sourceId: string;
  } | null>(null);

  // メッセージが追加されたときに自動的に下にスクロール
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [projectData.messages]);

  // 各列の幅を計算
  const getColumnWidths = () => {
    const collapsedWidth = "60px"; // 折り畳み時の幅（アイコンのみ表示）

    // ソース詳細表示とメモ詳細表示が同時に行われている場合は、中央列を非表示にして50%:50%で表示
    if (selectedSourceId !== null && selectedMemoId !== null) {
      const leftWidth = "calc(50% - 4px)"; // 50%（gap分を調整）
      const rightWidth = "calc(50% - 4px)"; // 50%（gap分を調整）
      const centerWidth = "0px"; // 中央列を非表示
      return { leftWidth, centerWidth, rightWidth };
    }

    // ソース詳細表示時は左列を5/12の幅にする
    if (selectedSourceId !== null) {
      const leftWidth = "calc(41.67% - 12px)"; // 5/12 ≈ 41.67%
      const rightWidth = isRightPanelCollapsed ? collapsedWidth : "calc(28.57% - 0px)";
      const centerWidth = isRightPanelCollapsed
        ? `calc(58.33% - ${collapsedWidth} - 20px)`
        : "calc(29.76% - 0px)"; // 残りの幅
      return { leftWidth, centerWidth, rightWidth };
    }

    // メモ詳細表示時は右列を5/12の幅にする
    if (selectedMemoId !== null) {
      const rightWidth = "calc(41.67% - 12px)"; // 5/12 ≈ 41.67%
      const leftWidth = isLeftPanelCollapsed ? collapsedWidth : "calc(28.57% - 0px)";
      const centerWidth = isLeftPanelCollapsed
        ? `calc(58.33% - ${collapsedWidth} - 20px)`
        : "calc(29.76% - 0px)"; // 残りの幅
      return { leftWidth, centerWidth, rightWidth };
    }

    const leftWidth = isLeftPanelCollapsed ? collapsedWidth : "calc(28.57% - 0px)";
    const rightWidth = isRightPanelCollapsed ? collapsedWidth : "calc(28.57% - 0px)";

    // 中央列の幅を動的に計算（marginとgapを考慮）
    let centerWidth: string;
    if (isLeftPanelCollapsed && isRightPanelCollapsed) {
      centerWidth = `calc(100% - ${collapsedWidth} - ${collapsedWidth} - 0px)`;
    } else if (isLeftPanelCollapsed || isRightPanelCollapsed) {
      centerWidth = `calc(71.43% - ${collapsedWidth} - 0px)`;
    } else {
      centerWidth = "calc(42.86% - 0px)";
    }

    return { leftWidth, centerWidth, rightWidth };
  };

  const { leftWidth, centerWidth, rightWidth } = getColumnWidths();

  // プロジェクト情報を取得（実際のAPIコールの代わりに、モックデータを使用）
  const projectName = React.useMemo(() => {
    // 実際の実装では、projectIdを使ってAPIからプロジェクト情報を取得
    return `プロジェクト (${projectId ?? "Unknown"})`;
  }, [projectId]);

  // ファイルアップロード処理
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newSource: Source = {
          id: "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
          name: file.name,
          type: file.type.includes("pdf") ? "pdf" : "document",
          date: new Date().toISOString().split("T")[0],
          checked: true,
        };

        setProjectData((prev: ProjectDetail) => {
          return {
            ...prev,
            sources: prev.sources.concat([newSource]),
          };
        });
      });
    }
  };

  // ソース削除処理
  const handleDeleteSource = (id: string) => {
    setProjectData((prev: ProjectDetail) => ({
      ...prev,
      sources: prev.sources.filter((source) => source.id !== id),
    }));
    // 削除されたソースが選択されていた場合は詳細表示を閉じる
    if (selectedSourceId === id) {
      setSelectedSourceId(null);
      setSourceContent("");
    }
  };

  // ソースのチェック状態を切り替え
  const handleToggleSourceCheck = (id: string) => {
    setProjectData((prev: ProjectDetail) => ({
      ...prev,
      sources: prev.sources.map((source) =>
        source.id === id ? { ...source, checked: !source.checked } : source
      ),
    }));
  };

  // ソース名変更処理
  const handleRenameSource = (id: string, newName: string) => {
    setProjectData((prev: ProjectDetail) => ({
      ...prev,
      sources: prev.sources.map((source) =>
        source.id === id ? { ...source, name: newName } : source
      ),
    }));
  };

  // ソース項目クリック処理
  const handleSourceClick = (sourceId: string) => {
    if (selectedSourceId === sourceId) {
      // 同じソースを再度クリックした場合は詳細表示を閉じる
      setSelectedSourceId(null);
      setSourceContent("");
    } else {
      // 新しいソースを選択
      setSelectedSourceId(sourceId);
      // 実際の実装では、ここでAPIを呼んでソースのテキストコンテンツを取得
      const selectedSource = projectData.sources.find((s) => s.id === sourceId);
      if (selectedSource) {
        // モックデータ：実際の実装ではAPIから取得
        setSourceContent(`${selectedSource.name} のテキスト化されたコンテンツです。

このドキュメントには以下の内容が含まれています：

1. 概要
   - このドキュメントの目的と範囲について説明します。
   - 重要なポイントを要約して記載します。

2. 詳細内容
   - 具体的な説明や手順について詳しく記載されています。
   - 技術的な詳細や実装方法について説明します。
   - 例示やサンプルコードが含まれることもあります。

3. まとめ
   - 本ドキュメントの要点をまとめています。
   - 今後の展開や関連する情報への参照が含まれます。

※ これはテキスト化されたコンテンツのサンプルです。実際の実装では、PDFやWord文書などから抽出されたテキストが表示されます。`);
      }
    }
  };

  // ファイル種別に応じたアイコンを取得
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <PictureAsPdfIcon />;
      case "doc":
      case "docx":
        return <DescriptionIcon />;
      case "txt":
        return <TextSnippetIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  // メモ種別に応じたアイコンを取得
  const getMemoIcon = (type: Memo["type"]) => {
    switch (type) {
      case "bookmark":
        return <BookmarkIcon />;
      case "document":
        return <ArticleIcon />;
      case "note":
        return <SpeakerNotesIcon />;
      default:
        return <SpeakerNotesIcon />;
    }
  };

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: uuidv4(),
        content: newMessage,
        timestamp: new Date().toISOString(),
        sender: "user",
      };

      const aiResponse: Message = {
        id: uuidv4(),
        content: "Message received! This is a simulated AI response.",
        timestamp: new Date().toISOString(),
        sender: "assistant",
      };

      // setMessages((prev) => [...prev, userMessage, aiResponse]);
      setProjectData((prev: ProjectDetail) => ({
        ...prev,
        messages: prev.messages.concat([userMessage, aiResponse]),
      }));
      setNewMessage("");
    }
  };

  // メモ保存処理
  const handleSaveMemo = (messageContent: string) => {
    const uuid = uuidv4();
    const newMemo: Memo = {
      id: uuid,
      title: "ブックマーク " + uuid,
      content: messageContent,
      summary:
        messageContent.length > 50
          ? messageContent.substring(0, 50) + "..."
          : messageContent,
      type: "bookmark",
      updatedAt: new Date().toISOString(),
    };
    setProjectData((prev: ProjectDetail) => ({
      ...prev,
      memos: prev.memos.concat([newMemo]),
    }));
  };

  // メモ項目クリック処理
  const handleMemoClick = (memoId: string) => {
    if (selectedMemoId === memoId) {
      // 同じメモを再度クリックした場合は詳細表示を閉じる
      setSelectedMemoId(null);
    } else {
      // 新しいメモを選択
      setSelectedMemoId(memoId);
    }
  };

  // メッセージ評価処理
  const handleMessageRating = (messageId: string, rating: "good" | "bad") => {
    setMessageRatings((prev) => ({
      ...prev,
      [messageId]: prev[messageId] === rating ? null : rating, // 同じ評価をクリックした場合は取り消し
    }));
  };

  // メッセージコピー処理
  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // コピー成功のフィードバックは一旦省略（実際の実装では toast やスナックバーで表示）
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  // ポッドキャスト生成処理
  const handleGeneratePodcast = () => {
    setIsGeneratingPodcast(true);
    setPodcastProgress(0);

    // シミュレーション：プログレスを段階的に更新
    const interval = setInterval(() => {
      setPodcastProgress((prev) => {
        if (prev >= 100) {
          setIsGeneratingPodcast(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // カスタマイズモーダルを開く
  const handleOpenCustomizeModal = () => {
    setIsCustomizeModalOpen(true);
  };

  // カスタマイズモーダルを閉じる
  const handleCloseCustomizeModal = () => {
    setIsCustomizeModalOpen(false);
    setCustomPrompt("");
  };

  // カスタムプロンプトでポッドキャスト生成
  const handleGenerateCustomPodcast = () => {
    console.log("Custom prompt:", customPrompt);
    handleCloseCustomizeModal();
    handleGeneratePodcast();
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ヘッダー */}
      <AppBar position='static' sx={{ zIndex: 1 }}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          px={2}
          // py={1}
        >
          <Box display='flex' alignItems='center'>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={() => {
                void navigate("/");
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant='h6' component='div' ml={1}>
              {projectName}
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Button variant='contained' startIcon={<SettingsIcon />} sx={{ mr: 2 }}>
              設定
            </Button>
            <IconButton color='inherit'>
              <Avatar alt='User Avatar' src='/path/to/avatar.jpg' />
            </IconButton>
          </Box>
        </Box>
      </AppBar>

      {/* 3列レイアウト */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden", p: 1, gap: 1 }}>
        {/* 左列: ソース機能 */}
        <Paper
          elevation={2}
          sx={{
            width: leftWidth,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            transition: "width 0.3s ease",
            // m: 1,
          }}
        >
          {isLeftPanelCollapsed ? (
            /* 折り畳み時: アイコンのみ表示 */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
              }}
            >
              <IconButton
                onClick={() => {
                  setIsLeftPanelCollapsed(false);
                }}
                sx={{ mb: 1 }}
              >
                <ChevronRightIcon />
              </IconButton>
              <IconButton component='label' sx={{ mb: 1 }}>
                <UploadFileIcon />
                <input
                  type='file'
                  hidden
                  multiple
                  accept='.pdf,.doc,.docx,.txt'
                  onChange={handleFileUpload}
                />
              </IconButton>
              {projectData.sources.map((source) => (
                <IconButton key={source.id}>{getFileIcon(source.type)}</IconButton>
              ))}
            </Box>
          ) : (
            /* 展開時: 通常表示 */
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant='h6'>ソース</Typography>
                <IconButton
                  size='small'
                  onClick={() => {
                    setIsLeftPanelCollapsed(true);
                    // ソース詳細表示中の場合はリセット
                    if (selectedSourceId !== null) {
                      setSelectedSourceId(null);
                      setSourceContent("");
                    }
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Box>

              {selectedSourceId === null ? (
                // ソース一覧表示時：ファイルアップロードボタンとソースリストを表示
                <>
                  <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <Button
                      component='label'
                      variant='contained'
                      startIcon={<UploadFileIcon />}
                      fullWidth
                    >
                      ファイルをアップロード
                      <input
                        type='file'
                        hidden
                        multiple
                        accept='.pdf,.doc,.docx,.txt'
                        onChange={handleFileUpload}
                      />
                    </Button>
                  </Box>

                  <Box sx={{ flex: 1, overflow: "auto" }}>
                    <List sx={{ width: "98%" }}>
                      {projectData.sources.map((source) => (
                        <ListItem
                          key={source.id}
                          sx={{
                            cursor: "pointer",
                            borderRadius: 1,
                            mx: 1,
                            mb: 0,
                            transition: "all 0.2s ease",
                            backgroundColor:
                              hoveredSourceId === source.id
                                ? "rgba(0, 0, 0, 0.04)"
                                : "transparent",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                          onMouseEnter={() => {
                            setHoveredSourceId(source.id);
                          }}
                          onMouseLeave={() => {
                            setHoveredSourceId(null);
                          }}
                          onClick={() => {
                            handleSourceClick(source.id);
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {getFileIcon(source.type)}
                          </ListItemIcon>
                          <ListItemText primary={source.name} sx={{ mr: 1 }} />
                          {hoveredSourceId === source.id && (
                            <IconButton
                              size='small'
                              onClick={(event) => {
                                event.stopPropagation(); // リスト項目のクリックイベントを阻止
                                setContextMenuAnchor({
                                  mouseX: event.clientX,
                                  mouseY: event.clientY,
                                  sourceId: source.id,
                                });
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          )}
                          <Checkbox
                            checked={!!source.checked}
                            onChange={(event) => {
                              event.stopPropagation(); // リスト項目のクリックイベントを阻止
                              handleToggleSourceCheck(source.id);
                            }}
                            size='small'
                            color='primary'
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              ) : (
                // ソース詳細表示時：ヘッダーとコンテンツを表示（ファイルアップロードボタンの領域も含む）
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  {/* ヘッダー */}
                  <Box
                    sx={{
                      p: 2,
                      borderBottom: "1px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size='small'
                      onClick={() => {
                        setSelectedSourceId(null);
                        setSourceContent("");
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant='subtitle1' sx={{ fontWeight: "medium" }}>
                      {projectData.sources.find((s) => s.id === selectedSourceId)
                        ?.name ?? "ソース詳細"}
                    </Typography>
                  </Box>

                  {/* コンテンツ */}
                  <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
                    <Typography
                      variant='body2'
                      sx={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        color: "text.primary",
                      }}
                    >
                      {sourceContent}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* コンテキストメニュー */}
              <Menu
                open={contextMenuAnchor !== null}
                onClose={() => {
                  setContextMenuAnchor(null);
                }}
                anchorReference='anchorPosition'
                anchorPosition={
                  contextMenuAnchor !== null
                    ? {
                        top: contextMenuAnchor.mouseY,
                        left: contextMenuAnchor.mouseX,
                      }
                    : undefined
                }
              >
                <MenuItem
                  onClick={() => {
                    if (contextMenuAnchor) {
                      const newName = prompt("新しいファイル名を入力してください");
                      if (newName) {
                        handleRenameSource(contextMenuAnchor.sourceId, newName);
                      }
                    }
                    setContextMenuAnchor(null);
                  }}
                >
                  <EditIcon sx={{ mr: 1 }} />
                  名前変更
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (contextMenuAnchor) {
                      handleDeleteSource(contextMenuAnchor.sourceId);
                    }
                    setContextMenuAnchor(null);
                  }}
                >
                  <DeleteIcon sx={{ mr: 1 }} />
                  削除
                </MenuItem>
              </Menu>
            </>
          )}
        </Paper>

        {/* 中央列: チャット機能 */}
        {/* ソース詳細表示とメモ詳細表示が同時に行われている場合は中央列を非表示 */}
        {!(selectedSourceId !== null && selectedMemoId !== null) && (
          <Paper
            elevation={2}
            sx={{
              width: centerWidth,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              transition: "width 0.3s ease",
              // m: 1,
            }}
          >
            <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
              <Typography variant='h6'>チャット</Typography>
            </Box>

            {/* メッセージ一覧 */}
            <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
              {projectData.messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: message.sender === "user" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  {/* アバター */}
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: message.sender === "user" ? "#1976d2" : "#f44336",
                      mt: 0.5,
                    }}
                  >
                    {message.sender === "user" ? <PersonIcon /> : <SmartToyIcon />}
                  </Avatar>

                  {/* メッセージ */}
                  <Card
                    sx={{
                      maxWidth: "70%",
                      bgcolor: message.sender === "user" ? "#1976d2" : "#f5f5f5",
                      color: message.sender === "user" ? "white" : "black",
                    }}
                  >
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Typography variant='body2'>{message.content}</Typography>
                      {message.sender === "assistant" && (
                        <Box
                          sx={{
                            mt: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 0.5,
                          }}
                        >
                          {/* Good アイコン */}
                          <IconButton
                            size='small'
                            onClick={() => {
                              handleMessageRating(message.id, "good");
                            }}
                            sx={{
                              color:
                                messageRatings[message.id] === "good"
                                  ? "#4caf50"
                                  : "#666",
                              "&:hover": {
                                color: "#4caf50",
                              },
                            }}
                          >
                            <ThumbUpIcon fontSize='small' />
                          </IconButton>
                          {/* Bad アイコン */}
                          <IconButton
                            size='small'
                            onClick={() => {
                              handleMessageRating(message.id, "bad");
                            }}
                            sx={{
                              color:
                                messageRatings[message.id] === "bad"
                                  ? "#f44336"
                                  : "#666",
                              "&:hover": {
                                color: "#f44336",
                              },
                            }}
                          >
                            <ThumbDownIcon fontSize='small' />
                          </IconButton>
                          {/* コピーアイコン */}
                          <IconButton
                            size='small'
                            onClick={() => {
                              void handleCopyMessage(message.content);
                            }}
                            sx={{
                              color: "#666",
                              "&:hover": {
                                color: "#2196f3",
                              },
                            }}
                          >
                            <ContentCopyIcon fontSize='small' />
                          </IconButton>
                          {/* ブックマークアイコン */}
                          <IconButton
                            size='small'
                            onClick={() => {
                              handleSaveMemo(message.content);
                            }}
                            sx={{ color: "#666" }}
                          >
                            <BookmarkIcon fontSize='small' />
                          </IconButton>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              ))}
              {/* 自動スクロール用の要素 */}
              <div ref={messagesEndRef} />
            </Box>

            {/* メッセージ入力 */}
            <Box
              sx={{
                p: 2,
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder='メッセージを入力...'
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                color='primary'
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "20%", // 円形にする
                  width: 48,
                  height: 48,
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  "&:disabled": {
                    bgcolor: "action.disabled",
                    color: "action.disabled",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        )}

        {/* 右列: スタジオ機能 */}
        <Paper
          elevation={2}
          sx={{
            width: rightWidth,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            transition: "width 0.3s ease",
            // m: 1,
          }}
        >
          {isRightPanelCollapsed ? (
            /* 折り畳み時: アイコンのみ表示 */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
              }}
            >
              <IconButton
                onClick={() => {
                  setIsRightPanelCollapsed(false);
                }}
                sx={{ mb: 1 }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton sx={{ mb: 1 }}>
                <MicIcon />
              </IconButton>
              {projectData.memos.map((memo) => (
                <IconButton
                  key={memo.id}
                  onClick={() => {
                    handleMemoClick(memo.id);
                  }}
                >
                  {getMemoIcon(memo.type)}
                </IconButton>
              ))}
              {/* <IconButton
                onClick={() => {
                  handleGeneratePodcast();
                }}
                disabled={isGeneratingPodcast}
              >
                <BookmarkIcon />
              </IconButton> */}
            </Box>
          ) : (
            /* 展開時: 通常表示 */
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant='h6'>スタジオ</Typography>
                <IconButton
                  size='small'
                  onClick={() => {
                    setIsRightPanelCollapsed(true);
                    // メモ詳細表示中の場合はリセット
                    if (selectedMemoId !== null) {
                      setSelectedMemoId(null);
                    }
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {selectedMemoId === null ? (
                // 通常表示時：ポッドキャスト機能とブックマーク一覧を表示
                <>
                  {/* ポッドキャスト機能 */}
                  <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <Typography variant='subtitle1' sx={{ mb: 2 }}>
                      ポッドキャスト
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mb: 2,
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        sx={{ width: "45%" }}
                        variant='contained'
                        startIcon={<MicIcon />}
                        fullWidth
                        onClick={handleGeneratePodcast}
                        disabled={isGeneratingPodcast}
                      >
                        {isGeneratingPodcast ? "生成中..." : "生成"}
                      </Button>
                      <Button
                        sx={{ width: "45%" }}
                        variant='outlined'
                        startIcon={<TuneIcon />}
                        onClick={handleOpenCustomizeModal}
                        disabled={isGeneratingPodcast}
                      >
                        カスタマイズ
                      </Button>
                    </Box>

                    {isGeneratingPodcast && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress variant='determinate' value={podcastProgress} />
                        <Typography variant='caption' sx={{ mt: 1, display: "block" }}>
                          {podcastProgress}% 完了
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* ブックマーク機能 */}
                  <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <Typography variant='subtitle1'>ブックマーク</Typography>
                  </Box>

                  <Box sx={{ flex: 1, overflow: "auto" }}>
                    <List>
                      {projectData.memos.map((memo) => (
                        <ListItem
                          key={memo.id}
                          sx={{
                            py: 0.5,
                            cursor: "pointer",
                            borderRadius: 1,
                            mx: 1,
                            mb: 0,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                          onClick={() => {
                            handleMemoClick(memo.id);
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {getMemoIcon(memo.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant='subtitle2'
                                sx={{ fontWeight: "medium" }}
                              >
                                {memo.title}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant='body2' color='text.secondary'>
                                  {memo.summary}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                      {projectData.memos.length === 0 && (
                        <ListItem>
                          <ListItemText
                            primary='ブックマークがありません'
                            secondary='チャットメッセージをブックマークして保存できます'
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </>
              ) : (
                // メモ詳細表示時：ヘッダーとコンテンツを表示（ポッドキャスト機能の領域も含む）
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  {/* ヘッダー */}
                  <Box
                    sx={{
                      p: 2,
                      borderBottom: "1px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size='small'
                      onClick={() => {
                        setSelectedMemoId(null);
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant='subtitle1' sx={{ fontWeight: "medium" }}>
                      {projectData.memos.find((m) => m.id === selectedMemoId)?.title ??
                        "メモ詳細"}
                    </Typography>
                  </Box>

                  {/* コンテンツ */}
                  <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
                    <Typography
                      variant='body2'
                      sx={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        color: "text.primary",
                      }}
                    >
                      {projectData.memos.find((m) => m.id === selectedMemoId)
                        ?.content ?? ""}
                    </Typography>

                    {/* メタ情報 */}
                    <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                      <Typography variant='caption' color='text.disabled'>
                        最終更新:{" "}
                        {(() => {
                          const memo = projectData.memos.find(
                            (m) => m.id === selectedMemoId
                          );
                          return memo?.updatedAt
                            ? new Date(memo.updatedAt).toLocaleString()
                            : "不明";
                        })()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Paper>

        {/* カスタマイズモーダル */}
        <Dialog
          open={isCustomizeModalOpen}
          onClose={handleCloseCustomizeModal}
          maxWidth='md'
          fullWidth
        >
          <DialogTitle>ポッドキャスト生成のカスタマイズ</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='カスタムプロンプト'
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              value={customPrompt}
              onChange={(e) => {
                setCustomPrompt(e.target.value);
              }}
              placeholder='ポッドキャスト生成時に使用する追加の指示やテーマを入力してください...'
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCustomizeModal}>キャンセル</Button>
            <Button
              onClick={handleGenerateCustomPodcast}
              variant='contained'
              disabled={!customPrompt.trim()}
            >
              生成開始
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};
export default Project;
