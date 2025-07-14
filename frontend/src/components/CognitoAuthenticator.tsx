import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import React, { useState } from "react";

const CognitoAuthenticator: React.FC = () => {
  const [email, setEmail] = useState("");
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
        Cognito (AWS) ログイン
      </Typography>
      <TextField
        label='メールアドレス'
        fullWidth
        margin='normal'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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

export default CognitoAuthenticator;
