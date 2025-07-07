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
import { fetchProjectDetail } from "./api/ProjectDetail";

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // プロジェクトデータの状態
  const [projectData, setProjectData] = React.useState<ProjectDetail | null>(null);
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
        setSources(data.sources);
        setMessages(data.messages);
        setMemos(data.memos);
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
  const [sources, setSources] = React.useState<Source[]>([]);

  // チャット（中央列）の状態
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState("");

  // メッセージ一覧の自動スクロール用のref
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // スタジオ（右列）の状態
  const [memos, setMemos] = React.useState<Memo[]>([]);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = React.useState(false);
  const [podcastProgress, setPodcastProgress] = React.useState(0);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = React.useState(false);
  const [customPrompt, setCustomPrompt] = React.useState("");

  // 左列と右列の折り畳み状態
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = React.useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = React.useState(false);

  // ソース詳細表示の状態
  const [selectedSourceId, setSelectedSourceId] = React.useState<number | null>(null);
  const [sourceContent, setSourceContent] = React.useState<string>("");

  // メモ詳細表示の状態
  const [selectedMemoId, setSelectedMemoId] = React.useState<number | null>(null);

  // メッセージの評価状態 (messageId -> "good" | "bad" | null)
  const [messageRatings, setMessageRatings] = React.useState<
    Record<number, "good" | "bad" | null>
  >({});

  // ソースリストのUI状態
  const [hoveredSourceId, setHoveredSourceId] = React.useState<number | null>(null);
  const [contextMenuAnchor, setContextMenuAnchor] = React.useState<{
    mouseX: number;
    mouseY: number;
    sourceId: number;
  } | null>(null);

  // メッセージが追加されたときに自動的に下にスクロール
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // プロジェクト名を取得
  const projectName = React.useMemo(() => {
    return projectData?.name ?? `プロジェクト (${projectId ?? "Unknown"})`;
  }, [projectData, projectId]);

  // ファイルアップロード処理
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        const newSource: Source = {
          id: sources.length + index + 1,
          name: file.name,
          type: file.type.includes("pdf") ? "pdf" : "document",
          date: new Date().toISOString().split("T")[0],
          checked: true,
        };
        setSources((prev) => [...prev, newSource]);
      });
    }
  };

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        content: newMessage,
        timestamp: new Date().toISOString(),
        sender: "user",
      };

      const aiResponse: Message = {
        id: messages.length + 2,
        content: "Message received! This is a simulated AI response.",
        timestamp: new Date().toISOString(),
        sender: "assistant",
      };

      setMessages((prev) => [...prev, userMessage, aiResponse]);
      setNewMessage("");
    }
  };

  // ローディング状態の表示
  if (isLoading) {
    return (
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppBar position='static' sx={{ zIndex: 1 }}>
          <Box display='flex' alignItems='center' justifyContent='space-between' px={2}>
            <Typography variant='h6'>読み込み中...</Typography>
          </Box>
        </AppBar>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>プロジェクトを読み込んでいます...</Typography>
        </Box>
      </Box>
    );
  }

  // エラー状態の表示
  if (error) {
    return (
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppBar position='static' sx={{ zIndex: 1 }}>
          <Box display='flex' alignItems='center' justifyContent='space-between' px={2}>
            <Typography variant='h6'>エラー</Typography>
          </Box>
        </AppBar>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box textAlign='center'>
            <Typography color='error' sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Button variant='contained' onClick={() => window.location.reload()}>
              再読み込み
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ヘッダー */}
      <AppBar position='static' sx={{ zIndex: 1 }}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          px={2}
          py={1}
        >
          <Box display='flex' alignItems='center'>
            <IconButton
              color='inherit'
              onClick={() => navigate("/list")}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant='h6' component='h1'>
              {projectName}
            </Typography>
          </Box>
          <IconButton color='inherit'>
            <SettingsIcon />
          </IconButton>
        </Box>
      </AppBar>

      {/* 3列レイアウト */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden", p: 1, gap: 1 }}>
        {/* 左列: ソース */}
        <Paper
          elevation={2}
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
          }}
        >
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
          </Box>

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
            <List>
              {sources.map((source) => (
                <ListItem key={source.id}>
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary={source.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>

        {/* 中央列: チャット */}
        <Paper
          elevation={2}
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Typography variant='h6'>チャット</Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Card
                  sx={{
                    maxWidth: "70%",
                    bgcolor: message.sender === "user" ? "#1976d2" : "#f5f5f5",
                    color: message.sender === "user" ? "white" : "black",
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Typography variant='body2'>{message.content}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              variant='outlined'
              size='small'
              placeholder='メッセージを入力...'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <IconButton
              color='primary'
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* 右列: メモ */}
        <Paper
          elevation={2}
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant='h6'>メモ</Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto" }}>
            <List>
              {memos.map((memo) => (
                <ListItem key={memo.id}>
                  <ListItemIcon>
                    <SpeakerNotesIcon />
                  </ListItemIcon>
                  <ListItemText primary={memo.title} secondary={memo.summary} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Project;
