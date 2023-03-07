import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Enter your First name!"],
  },
  lname: {
    type: String,
    required: [true, "Enter your Last name!"],
  },
  phone: {
    type: Number,
    required: [true, "Enter your Phone number!"],
  },
  email: {
    type: String,
    required: [true, "Please provide unique email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  member_since: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
