import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  themecolor: {
    type: String,
  },
  primarycolor: {
    type: String,
  },
  secondarycolor: {
    type: String,
  },
  logo: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: String,
  },
});

export default mongoose.model("Setting", SettingsSchema);
