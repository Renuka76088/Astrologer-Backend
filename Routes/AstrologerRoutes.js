import express from "express";
import upload from "../midleware/upload.js";

import {
  registerAstrologer,
  getAllAstrologers,
  getSingleAstrologer,
  updateAstrologer,
  deleteAstrologer
} from "../Controllers/AstrologerController.js";

const router = express.Router();

router.post("/register", upload.single("profilePicture"), registerAstrologer);

router.get("/", getAllAstrologers);

router.get("/:id", getSingleAstrologer);

router.put("/:id", upload.single("profilePicture"), updateAstrologer);

router.delete("/:id", deleteAstrologer);

export default router;