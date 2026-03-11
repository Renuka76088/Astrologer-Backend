import mongoose from "mongoose";

const jobDetailsSchema = new mongoose.Schema(
{
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  description: String,

  responsibilities: [String],

  requirements: [String],

  applicants: {
    type: Number,
    default: 0
  },

  posted: String
},
{ timestamps: true }
);

export default mongoose.model("JobDetails", jobDetailsSchema);
