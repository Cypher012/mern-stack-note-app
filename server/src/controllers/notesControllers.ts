import { RequestHandler } from "express";
import NoteModel from "../model/note.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("Error connecting to server");
    const notes = await NoteModel.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNotesByID: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(404, "invalid note id");
    const note = await NoteModel.findById(id);
    if (!id) {
      throw createHttpError(400, "Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteInterface {
  title?: string;
  text?: string;
}

export const createNotes: RequestHandler<
  unknown,
  unknown,
  CreateNoteInterface,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
    const notes = await NoteModel.create({ title, text });
    res.status(202).json(notes);
  } catch (error) {
    next(error);
  }
};

interface updateNoteParams {
  id: string;
}

interface updateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  updateNoteParams,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(404, "Invalid note id");
    }

    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }

    const note = await NoteModel.findByIdAndUpdate(
      id,
      { title, text },
      { new: true }
    );

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.status(201).json(note); // Send updated note as JSON response
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

interface DeleteNoteParams {
  id: string;
}

export const deleteNote: RequestHandler<DeleteNoteParams> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(404, "Invalid note id");
    }

    const deletedNote = await NoteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      throw createHttpError(404, "Note not found");
    }

    res.status(204).send(); // Send a success response with status code 204 (No Content)
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};
