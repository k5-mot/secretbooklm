import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import React, { useState } from "react";

const MagnitoAuthenticator: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // ダミー認証
  };

  return (
    <Box>
      <Typography variant='h6' mb={2} align='center'>
        Magnito (ローカル) ログイン
      </Typography>
      <TextField
        label='ユーザー名'
        fullWidth
        margin='normal'
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        label='パスワード'
        type='password'
        fullWidth
        margin='normal'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
        disabled={loading}
      >
        ログイン
      </Button>
      {loading && (
        <Box display='flex' justifyContent='center' mt={2}>
          <CircularProgress color='secondary' />
        </Box>
      )}
    </Box>
  );
};

export default MagnitoAuthenticator;
