import { Button, ImageList, ImageListItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";

const App = () => {
  return (
    <React.Fragment>
      <Typography variant='h1'>TOP</Typography>
      <ImageList>
        <ImageListItem>
          <img
            src={viteLogo}
            alt='Vite logo'
            style={{ width: "100px", height: "100px" }}
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src={reactLogo}
            alt='React logo'
            style={{ width: "100px", height: "100px" }}
          />
        </ImageListItem>
      </ImageList>
      <Button component={Link} to='/' variant='contained' color='primary'>
        TOP
      </Button>
      <Button component={Link} to='/home' variant='contained' color='primary'>
        HOME
      </Button>
      <Button component={Link} to='/about' variant='contained' color='primary'>
        ABOUT
      </Button>
    </React.Fragment>
  );
};

export default App;
