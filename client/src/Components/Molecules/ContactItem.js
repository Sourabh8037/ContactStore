import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardActions,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../../Constants/Styles";

const ContactItem = (props) => {
  const classes = useStyles();
  const { _id, name, email, phone, type } = props.contact;
  const onDeleteHandler = () => {
    props.onDelete(_id);
  };
  const setCurrentHandler = () => {
    props.setCurrent(props.contact);
  };

  return (
    <Card className={classes.cardContactRoot} raised>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <Typography
            variant="h5"
            align="center"
            style={{ margin: "1rem auto 0.3rem" }}
            noWrap={true}>
            {name}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography>
          <CardActions style={{ margin: "1rem 1.2rem" }}>
            <IconButton className={classes.bgDark} onClick={setCurrentHandler}>
              <EditIcon style={{ color: "#fff" }} />
            </IconButton>
            <IconButton className={classes.bgDanger} onClick={onDeleteHandler}>
              <DeleteIcon style={{ color: "#fff" }} />
            </IconButton>
          </CardActions>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardContent className={classes.p0}>
            <List className={classes.p0}>
              {email !== null && (
                <ListItem>
                  <ListItemAvatar>
                    <EmailIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email"
                    secondary={email}></ListItemText>
                </ListItem>
              )}
              {phone !== null && (
                <ListItem>
                  <ListItemAvatar>
                    <PhoneIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Phone"
                    secondary={phone}></ListItemText>
                </ListItem>
              )}
            </List>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (_id) => dispatch(actions.deleteContact(_id)),
    setCurrent: (contact) => dispatch(actions.setCurrentContact(contact)),
  };
};

export default connect(null, mapDispatchToProps)(ContactItem);
