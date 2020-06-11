const express = require("express");

const router = express.Router();

//  @route    POST  api/contacts
//  @desc     get all user's contacts
//  @access   Private
router.get("/", (req, res) => {
  res.send("Get all your contacts");
});

//  @route    POST  api/contacts
//  @desc     add new contact
//  @access   Private
router.post("/", (req, res) => {
  res.send("add a contact");
});

//  @route    POST  api/contacts/:id
//  @desc     update a contact
//  @access   Private
router.put("/:id", (req, res) => {
  res.send("update contact");
});

//  @route    POST  api/contacts/:id
//  @desc     delete contact
//  @access   Private
router.delete("/:id", (req, res) => {
  res.send("delete contact");
});

module.exports = router;
