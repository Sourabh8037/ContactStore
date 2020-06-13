import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Contacts from "../Components/Molecules/Contacts";
import ContactForm from "../Components/Molecules/ContactForm";
import FilterForm from "../Components/Molecules/ContactFilter";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

import { AnimatePresence, motion } from "framer-motion";

const HomePage = (props) => {
  useEffect(() => {
    props.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FilterForm />
            <Contacts />
          </Grid>
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(actions.loadUser()),
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
