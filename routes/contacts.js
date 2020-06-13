const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();
const Contact = require("../models/Contacts");
const { check, validationResult } = require("express-validator");

//  @route    POST  api/contacts
//  @desc     get all user's contacts
//  @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

//  @route    POST  api/contacts
//  @desc     add new contact
//  @access   Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        phone,
        email,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error);
      res.status(500).send("server Error");
    }
  }
);

//  @route    POST  api/contacts/:id
//  @desc     update a contact
//  @access   Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

//  @route    POST  api/contacts/:id
//  @desc     delete contact
//  @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "contact removed..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
