import React from "react";
import { Typography, Card } from "@material-ui/core";
import useStyles from "../Constants/Styles";

const About = () => {
  const classes = useStyles();
  return (
    <Card className={classes.aboutCardRoot} raised>
      <Typography variant="h4" align="center" color="primary">
        About this App
      </Typography>
      <Typography variant="body1" align="center">
        This is a full stack React app for keeping contacts
      </Typography>
      <Typography variant="subtitle2" align="center">
        Version:<Typography variant="body2">1.6.0</Typography>
      </Typography>
    </Card>
  );
};

export default About;
