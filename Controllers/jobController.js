import Job from "../Models/Job.js";


// CREATE JOB
export const createJob = async (req, res) => {
  try {

    const job = new Job(req.body);
    const savedJob = await job.save();

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: savedJob
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {

    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// UPDATE JOB
export const updateJob = async (req, res) => {
  try {

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// DELETE JOB
export const deleteJob = async (req, res) => {
  try {

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
