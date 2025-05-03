import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProjectList from "./ProjectList.tsx";
import ProjectDetail from "./ProjectDetail.tsx";
import "./styles/index.tsx";
import "@aws-amplify/ui-react/styles.css";

const App: React.FC = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  if (authStatus !== "authenticated") {
    return (
      <Box justifyContent='center' alignItems='center' display='flex' height='100vh'>
        <Authenticator>
          <CircularProgress color='secondary' />
          <CircularProgress color='success' />
          <CircularProgress color='inherit' />
        </Authenticator>
      </Box>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/list' replace />} />
        <Route path='/list' element={<ProjectList />} />
        <Route path='/project/:projectId' element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
