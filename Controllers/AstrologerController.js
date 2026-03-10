import Astrologer from "../Models/Astrologer.js";
import { uploadToCloudinary, deleteFromCloudinary  } from "../Utils/cloudinary.js";

export const registerAstrologer = async (req, res) => {

  try {

    const {
      fullName,
      experience,
      specialization,
      language,
      price,
      bio
    } = req.body;

    if (
      !fullName ||
      !experience ||
      !specialization ||
      !language ||
      !price ||
      !bio
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Profile picture required"
      });
    }

    // Upload image to cloudinary
    const uploadImage = await uploadToCloudinary(req.file.path, "astrologers");

    const astrologer = await Astrologer.create({

      fullName,
      experience,
      specialization,
      language,
      price,
      bio,

      profilePicture: {
        url: uploadImage.url,
        publicId: uploadImage.publicId
      }

    });

    res.status(201).json({
      message: "Astrologer registered successfully",
      astrologer
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

export const getAllAstrologers = async (req, res) => {
  try {

    const astrologers = await Astrologer.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: astrologers.length,
      astrologers
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

export const getSingleAstrologer = async (req, res) => {

  try {

    const astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({
        message: "Astrologer not found"
      });
    }

    res.status(200).json(astrologer);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};



export const updateAstrologer = async (req, res) => {

  try {

    const astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({
        message: "Astrologer not found"
      });
    }

    const {
      fullName,
      experience,
      specialization,
      language,
      price,
      bio
    } = req.body;

    if (req.file) {

      // delete old image
      await deleteFromCloudinary(astrologer.profilePicture.publicId);

      const uploadImage = await uploadToCloudinary(req.file.path, "astrologers");

      astrologer.profilePicture = {
        url: uploadImage.url,
        publicId: uploadImage.publicId
      };

    }

    astrologer.fullName = fullName || astrologer.fullName;
    astrologer.experience = experience || astrologer.experience;
    astrologer.specialization = specialization || astrologer.specialization;
    astrologer.language = language || astrologer.language;
    astrologer.price = price || astrologer.price;
    astrologer.bio = bio || astrologer.bio;

    await astrologer.save();

    res.status(200).json({
      message: "Astrologer updated successfully",
      astrologer
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

export const deleteAstrologer = async (req, res) => {

  try {

    const astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({
        message: "Astrologer not found"
      });
    }

    // delete image
    await deleteFromCloudinary(astrologer.profilePicture.publicId);

    await Astrologer.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Astrologer deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};