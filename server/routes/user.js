const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const verifyToken = require("../middleware/verify-token");
const upload = require("../middleware/upload-photo");
const cloudinary = require("../middleware/cloudinary");

router.put(
  "/account",
  verifyToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      let user = await User.findByIdAndUpdate(req.decoded._id, {
        username: req.body.username,
        password: req.body.password,
        photo: result.url,
      });

      await user.save();

      res.status(202).json({
        success: true,
        message: "Updated user profile successfully",
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
    }
  }
);

router.get("/account", verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id });

    res.status(200).send({
      success: true,
      data: foundUser,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/people", verifyToken, async (req, res) => {
  try {
    let people = await User.find().exec();

    const peopleButMe = people.filter(
      (item) => JSON.stringify(item._id) !== JSON.stringify(req.decoded._id)
    );
    res.status(200).send({
      success: true,
      data: peopleButMe,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
