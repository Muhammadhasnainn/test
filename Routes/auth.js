import { Router } from "express";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  localVariables,
  verifyTokenAndAdmin,
} from "../Middlewares/verifyUser.js";
import { OAuth2Client } from "google-auth-library";
import * as controller from "../controllers/authController.js";

const router = Router();
const JWT_SECRET = "Thisisasecretkey";
const client = new OAuth2Client(
  "695802779040-5i3sg98etcsljlf2m9kqf7d3npltek5f.apps.googleusercontent.com"
);

// Register
router.post("/register", async (req, res) => {
  if (!req.app.locals.resetSession)
    return res.status(440).json({ error: "Session expired!" });

  const { email, password, phone, fname, lname } = req.body;

  try {
    const exist = await User.findOne({ email });
    let success = false;
    if (exist) {
      res.json({ error: "An account with this email already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: securePassword,
      phone,
      lname,
      fname,
    });

    await user.save();
    req.app.locals.resetSession = false;

    const data = {
      user: {
        email: email,
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;

    res.json({ success, msg: "Successfull!", authToken });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  let success = false;
  if (!user) {
    return res.status(500).json({ msg: "No Account on this email!" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(400).json({ success, msg: "Invalid credentials!" });
  }

  const data = {
    user: {
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    },
  };

  const authToken = jwt.sign(data, JWT_SECRET);
  success = true;

  res.json({ success, msg: "Successfull!", authToken });
});

router.get("/users", verifyTokenAndAdmin, async (req, res) => {
  const users = await User.find({ isAdmin: false }).select("-password");
  res.json(users);
});

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "695802779040-5i3sg98etcsljlf2m9kqf7d3npltek5f.apps.googleusercontent.com",
  });

  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

// OTP Generate
router.get("/generateotp", localVariables, async (req, res) =>
  controller.generateOTP(req, res)
);

router.get("/registerotp", localVariables, async (req, res) =>
  controller.generateRegisterOTP(req, res)
);

router.post("/verifyotp", async (req, res) => controller.verifyOTP(req, res));

router.get("/createResetSession", (req, res) =>
  controller.createResetSession(req, res)
);

router.put("/resetPassword", (req, res) => controller.resetPassword(req, res));

router.put("/changepassword", (req, res) =>
  controller.ChangePassword(req, res)
);

export default router;
