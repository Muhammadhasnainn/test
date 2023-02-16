import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
