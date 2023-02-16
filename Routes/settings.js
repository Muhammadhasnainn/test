import { Router } from "express";
import { verifyTokenAndAdmin } from "../Middlewares/verifyUser.js";
import Settings from "../Models/Settings.js";

const router = Router();

router.get("/", async (req, res) => {
  const settings = await Settings.find();
  res.json({ success: true, data: settings });
});

router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  const {
    themecolor,
    primarycolor,
    secondarycolor,
    company,
    logo,
    email,
    number,
  } = req.body;

  try {
    const newSetting = {};
    if (themecolor) {
      newSetting.themecolor = themecolor;
    }
    if (primarycolor) {
      newSetting.primarycolor = primarycolor;
    }
    if (secondarycolor) {
      newSetting.secondarycolor = secondarycolor;
    }
    if (company) {
      newSetting.company = company;
    }
    if (logo) {
      newSetting.logo = logo;
    }
    if (email) {
      newSetting.email = email;
    }
    if (number) {
      newSetting.number = number;
    }

    let setting = await Settings.findById(req.params.id);

    if (!setting) {
      return res.status(404).send("Not Found");
    }

    setting = await Settings.findByIdAndUpdate(
      req.params.id,
      { $set: newSetting },
      { new: true }
    );
    res.json({ setting });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
