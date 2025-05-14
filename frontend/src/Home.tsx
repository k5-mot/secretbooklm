import BookIcon from "@mui/icons-material/Book";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Home = () => {
  const [documents, setDocuments] = React.useState([
    {
      id: 1,
      name: "Sample.pdf",
      type: "pdf",
      date: "2023-05-10",
      size: "2.4MB",
      checked: false,
    },
  ]);
  const [message, setMessage] = React.useState([
    { id: 1, text: "Hello! How can I help you today?", isAI: true },
  ]);
  const [newMessage, setNewMessage] = React.useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessage([
        ...message,
        { id: message.length + 1, text: newMessage, isAI: false },
        { id: message.length + 2, text: "Message received!", isAI: true },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh", p: 2 }}>
      {/* Left Column - Document Reader */}
      <Grid size={3}>
        <Paper sx={{ height: "100%", p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Source
          </Typography>
          <Button variant='contained' sx={{ mb: 2 }}>
            Add Document
          </Button>
          <List>
            {documents.map((doc) => (
              <ListItem key={doc.id} disablePadding>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                  primary={doc.name}
                  secondary={`${doc.date} • ${doc.size}`}
                />
                <Checkbox
                  edge='end'
                  checked={doc.checked}
                  onChange={() => {
                    setDocuments(
                      documents.map((d) =>
                        d.id === doc.id ? { ...d, checked: !d.checked } : d
                      )
                    );
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Middle Column - Chat */}
      <Grid size={3}>
        <Paper sx={{ height: "100%", p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Chat
          </Typography>
          <div style={{ height: "80%", overflowY: "auto" }}>
            {message.map((msg) => (
              <div
                key={msg.id}
                style={{
                  textAlign: msg.isAI ? "left" : "right",
                  marginBottom: "10px",
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    display: "inline-block",
                    backgroundColor: msg.isAI ? "#f5f5f5" : "#e3f2fd",
                  }}
                >
                  {msg.text}
                </Paper>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Type a message...'
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
            <IconButton color='primary' onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </div>
        </Paper>
      </Grid>

      {/* Right Column - Studio */}
      <Grid size={3}>
        <Paper sx={{ height: "100%", p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Studio
          </Typography>
          <Button variant='outlined' fullWidth sx={{ mb: 2 }} startIcon={<BookIcon />}>
            Learning Guide
          </Button>
          <Button
            variant='outlined'
            fullWidth
            sx={{ mb: 2 }}
            startIcon={<DescriptionIcon />}
          >
            Briefing Document
          </Button>
          <Button
            variant='outlined'
            fullWidth
            sx={{ mb: 2 }}
            startIcon={<QuestionAnswerIcon />}
          >
            FAQ
          </Button>
          <Button
            variant='outlined'
            fullWidth
            sx={{ mb: 2 }}
            startIcon={<QuestionAnswerIcon />}
          >
            Timeline
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Home;
