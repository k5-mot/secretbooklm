import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <React.Fragment>
      <Typography variant='h3' component='h1'>
        About
      </Typography>

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

export default About;
