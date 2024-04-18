import express from "express";
import * as NoteControllers from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", NoteControllers.getNotes);
router.get("/:id", NoteControllers.getNotesByID);
router.post("/", NoteControllers.createNotes);
router.patch("/:id", NoteControllers.updateNote);
router.delete("/:id", NoteControllers.deleteNote);
export default router;
