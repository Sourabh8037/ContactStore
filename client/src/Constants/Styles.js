import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  flexGrow1: {
    flexGrow: 1,
  },
  contactsContainer: {
    margin: "1rem auto",
  },
  formContainer: {
    margin: "1rem auto 0",
    maxWidth: 400,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 320,
    },
  },
  aboutCardRoot: {
    maxWidth: 500,
    margin: "5rem auto",
    padding: "2rem 1rem",
  },
  aboutBackground: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#ccc",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
  },
  cardContactRoot: {
    margin: "1rem auto",
    maxWidth: 400,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 320,
    },
  },
  p0: {
    padding: 0,
  },
  bgDark: {
    backgroundColor: "#455a64",
    "&:hover": {
      backgroundColor: "#718792",
    },
  },
  bgDanger: {
    backgroundColor: "#ff1744",
    "&:hover": {
      backgroundColor: "#ff616f",
    },
  },
  my1xauto: {
    margin: "1rem auto",
  },
  submitButton: {
    display: "block",
    margin: "1rem auto",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
    },
  },
  alertContainer: {},
  formButton: {
    margin: "1rem 0",
  },
  w100: {
    display: "block",
  },
  inputLarge: {
    margin: "1rem auto",
    width: "100%",
    fontSize: 16,
    padding: "0.4rem",
  },
}));

export default useStyles;
