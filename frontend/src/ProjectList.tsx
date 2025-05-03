import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  IconButton,
  Paper,
  Typography,
  AppBar,
  Avatar,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import type { ProjectList } from "./types/ProjectList";
import { fetchProjectList } from "./api/ProjectList";
import { getRandomEmoji } from "./util/RandomEmoji";

const ProjectListUI: React.FC = () => {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<ProjectList>({ projects: [] });
  const [sortBy, setSortBy] = useState<"updatedAt" | "name">("updatedAt");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  // ソートされたプロジェクトリスト
  const sortedProjects = useMemo(() => {
    const projects = [...projectList.projects];
    return projects.sort((a, b) => {
      if (sortBy === "updatedAt") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }, [projectList.projects, sortBy]);

  useEffect(() => {
    // Fetch project list from the API
    const run = async () => {
      try {
        const result = await fetchProjectList();
        setProjectList(result);
      } catch (error) {
        console.error("Error fetching project list:", error);
      }
    };
    void run();
  }, []);

  const handleCreateProject = () => {
    // TODO: 新規プロジェクト作成画面に遷移
    console.log("新規プロジェクト作成");
  };

  return (
    <Box>
      <AppBar position='static'>
        <Box display='flex' alignItems='center' justifyContent='space-between' px={2}>
          <Box display='flex' alignItems='center'>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={() => {
                void navigate("/");
              }}
            >
              <BookIcon />
            </IconButton>
            <Typography variant='h6' component='div' ml={1}>
              SecretbookLM
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<SettingsIcon />}
            >
              設定
            </Button>
            <IconButton color='inherit'>
              <Avatar alt='User Avatar' src='/path/to/avatar.jpg' />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Container>
        <Box mt={2}>
          <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
            <Typography variant='h4' gutterBottom>
              プロジェクト一覧
            </Typography>
            <Box display='flex' alignItems='center' gap={1}>
              <Button
                variant='outlined'
                startIcon={<SortIcon />}
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  setSortAnchorEl(event.currentTarget);
                }}
              >
                {sortBy === "updatedAt" ? "更新日順" : "タイトル順"}
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => {
                  setSortAnchorEl(null);
                }}
              >
                <MenuItem
                  onClick={() => {
                    setSortBy("updatedAt");
                    setSortAnchorEl(null);
                  }}
                  selected={sortBy === "updatedAt"}
                >
                  更新日が新しい順
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSortBy("name");
                    setSortAnchorEl(null);
                  }}
                  selected={sortBy === "name"}
                >
                  タイトルのアルファベット順
                </MenuItem>
              </Menu>
              <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={handleCreateProject}
              >
                新規作成
              </Button>
            </Box>
          </Box>
          <Box
            display='grid'
            gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))'
            gap={2}
          >
            {sortedProjects.map((project) => (
              <Paper
                key={project.id}
                elevation={2}
                sx={{ p: 2, cursor: "pointer", height: "fit-content" }}
                onClick={() => {
                  void navigate(`/project/${String(project.id)}`);
                }}
              >
                <Box display='flex' alignItems='center' mb={1}>
                  <Typography variant='h5' component='span' mr={1}>
                    {getRandomEmoji(project.id)}
                  </Typography>
                  <Typography variant='h6' noWrap>
                    {project.name}
                  </Typography>
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  {project.updatedAt}・{project.sourceCount}このソース
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectListUI;
