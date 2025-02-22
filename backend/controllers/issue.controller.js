import Issue from "../models/issue.model.js";

export const createIssue = async (req, res) => {
  try {
    const { title, description, assignedTo} = req.body;
    const createdBy = req.user._id;
    console.log("createdBy", createdBy );
    
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
