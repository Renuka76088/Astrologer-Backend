import JobDetails from "../Models/JobDetails.js";


// CREATE JOB DETAILS
export const createJobDetails = async (req, res) => {
  try {

    const {
      jobId,
      description,
      responsibilities,
      requirements,
      applicants,
      posted
    } = req.body;

    const jobDetails = await JobDetails.create({
      jobId,
      description,
      responsibilities,
      requirements,
      applicants,
      posted
    });

    // 👇 populate job data
    const populatedJob = await JobDetails.findById(jobDetails._id)
      .populate("jobId");

    res.status(201).json({
      success: true,
      message: "Job details created successfully",
      data: populatedJob
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// GET JOB DETAILS BY JOB ID
export const getJobDetails = async (req, res) => {

  try {

    const { jobId } = req.params;

    const jobDetails = await JobDetails.findOne({ jobId })
      .populate("jobId");   // 👈 yeh line add karni hai

    if (!jobDetails) {
      return res.status(404).json({
        success: false,
        message: "Job details not found"
      });
    }

    res.status(200).json({
      success: true,
      data: jobDetails
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// UPDATE JOB DETAILS
export const updateJobDetails = async (req, res) => {

  try {

    const { jobId } = req.params;

    const updated = await JobDetails.findOneAndUpdate(
      { jobId },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Job details updated",
      data: updated
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// DELETE JOB DETAILS
export const deleteJobDetails = async (req, res) => {

  try {

    const { jobId } = req.params;

    await JobDetails.findOneAndDelete({ jobId });

    res.status(200).json({
      success: true,
      message: "Job details deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
