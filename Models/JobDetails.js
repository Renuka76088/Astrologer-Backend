import mongoose from "mongoose";

const jobDetailsSchema = new mongoose.Schema({

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  description: {
    type: String,
    required: true
  },

  responsibilities: [
    {
      type: String
    }
  ],

  requirements: [
    {
      type: String
    }
  ],

  applicants: {
    type: Number,
    default: 0
  },

  posted: {
    type: String
  }

}, { timestamps: true });

const JobDetails = mongoose.model("JobDetails", jobDetailsSchema);

export default JobDetails;
