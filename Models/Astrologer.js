import mongoose from "mongoose";

const astrologerSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },

  experience: {
    type: Number,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  bio: {
    type: String,
    required: true
  },

  profilePicture: {
    url: String,
    publicId: String
  }

},{timestamps:true});

export default mongoose.model("Astrologer", astrologerSchema);