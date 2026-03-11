import express from "express";

import {
  createJobDetails,
  getJobDetails,
  updateJobDetails,
  deleteJobDetails
} from "../Controllers/jobDetailsController.js";

const router = express.Router();


// create job details
router.post("/create-job-details", createJobDetails);


// get job details by jobId
router.get("/job-details/:jobId", getJobDetails);


// update job details
router.put("/update-job-details/:jobId", updateJobDetails);


// delete job details
router.delete("/delete-job-details/:jobId", deleteJobDetails);


export default router;
