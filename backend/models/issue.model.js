import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "closed", "in progress"],
    default: "open",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user (technician)
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to the user (admin)
    required: true,
  },
  statusTimestamps: {
    open: { type: Date },
    inProgress: { type: Date },
    closed: { type: Date },
  },
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
