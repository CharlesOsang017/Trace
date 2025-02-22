import Issue from "../models/issue.model.js";
import User from "../models/user.model.js";

export const createIssue = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const createdBy = req.user._id;
    console.log("createdBy", createdBy);

    if (!title || !description) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const issue = new Issue({
      title,
      description,
      assignedTo: assignedTo || null,
      createdBy,
      statusTimestamps: { open: new Date() },
    });

    await issue.save();
    return res
      .status(201)
      .json({ message: "Issue created successfully", issue });
  } catch (error) {
    console.log("error in create Issue controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const assignIssue = async (req, res) => {
  try {
    const { issueId, technicianId } = req.body;

    // Find the issue
    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    // Ensure the issue is not already assigned
    if (issue.assignedTo) {
      return res.status(400).json({
        message: "This issue is already assigned to another technician",
      });
    }

    // Find the technician and ensure they are not an admin
    const technician = await User.findById(technicianId);
    if (!technician || technician.role !== "technician") {
      return res
        .status(400)
        .json({ message: "Invalid technician ID or technician not found" });
    }

    // Check if the technician is already assigned to another issue
    const existingAssignment = await Issue.findOne({
      assignedTo: technicianId,
    });
    if (existingAssignment) {
      return res
        .status(400)
        .json({ message: "Technician is already assigned to another issue" });
    }

    // Assign the issue to the technician
    issue.assignedTo = technicianId;
    issue.statusTimestamps.inProgress = new Date();
    await issue.save();

    return res
      .status(200)
      .json({ message: "Issue assigned successfully", issue });
  } catch (error) {
    console.error("Error in assignIssue:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteIssue = async (req, res) => {
  const { issueId } = req.params;
  try {
    const issue = await Issue.findByIdAndDelete(issueId);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    return res.status(200).json({ message: "Issue deleted successfully!" });
  } catch (error) {
    console.log("error in delete issue controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateIssue = async (req, res) => {
  const { issueId } = req.params;
  const { title, description } = req.body;
  try {
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    //  updating the fields
    issue.title = title || issue.title;
    issue.description = description || issue.description;

    await issue.save();

    return res.status(200).json(issue);
  } catch (error) {
    console.log("error in update issue controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    if (!issues) return res.status(200).json({});
    return res.status(200).json(issues);
  } catch (error) {
    console.log("error in getAll issues controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get issues by status (Admin & Technician)
export const getIssuesByStatus = async (req, res) => {
  try {
    const { status } = req.query; // Get status from query params

    // Ensure a valid status is provided
    const validStatuses = ["open", "closed", "in progress"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    let issues;

    if (req.user.role === "admin") {
      // Admin can view all issues with the given status
      issues = await Issue.find({ status }).populate(
        "assignedTo",
        "name email"
      );
    } else {
      // Technicians can only see issues assigned to them with the given status
      issues = await Issue.find({ status, assignedTo: req.user.id });
    }

    return res.status(200).json({ count: issues.length, issues });
  } catch (error) {
    console.error("Error in getIssuesByStatus:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
