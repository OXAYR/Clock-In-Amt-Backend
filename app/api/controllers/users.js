/** @format */

const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function (req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userRole: req.body.userRole,
    };
    console.log(
      "in the controller",
      data.name,
      data.email,
      data.password,
      data.userRole
    );
    userModel
      .create(data)
      .then((result) => {
        res.send({ status: 200, msg: "User created successfully" });
      })
      .catch((err) => {
        res.send({ status: 500, msg: "Error creating user" });
      });
  },

  authenticate: async (req, res, next) => {
    try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
        res.status(412).json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userInfo.password
      );
      if (isPasswordValid) {
        const token = jwt.sign({ id: userInfo._id }, req.app.get("secretKey"), {
          expiresIn: "1h",
        });
        res.json({
          status: "success",
          message: "User found!!!",
          data: { user: userInfo, token: token },
        });
      } else {
        res.status(412).json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
