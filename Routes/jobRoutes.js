import express from "express";
import {
  createJob,
  getJobs,
  getSingleJob,
  updateJob,
  deleteJob
} from "../Controllers/jobController.js";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/jobs", getJobs);
router.get("/job/:id", getSingleJob);
router.put("/update-job/:id", updateJob);
router.delete("/delete-job/:id", deleteJob);

export default router;
