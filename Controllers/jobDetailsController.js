import JobDetails from "../Models/JobDetails.js";


// CREATE JOB DETAILS
export const createJobDetails = async (req, res) => {

  try {

    const jobDetails = new JobDetails(req.body);

    const savedDetails = await jobDetails.save();

    res.status(201).json({
      success: true,
      message: "Job details created successfully",
      data: savedDetails
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

    const jobDetails = await JobDetails.findOne({ jobId });

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
