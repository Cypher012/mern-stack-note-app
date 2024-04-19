import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchNote,
  postNote,
  deleteNote,
  editNote,
  fetchNoteById,
} from "./crud";

export const useNoteHandler = () => {
  return useQuery("note", fetchNote);
};

export const useNoteHandlerById = (id: string) => {
  return useQuery(["note", id], () => fetchNoteById(id));
};

export const useAddNoteHandler = () => {
  const queryClient = useQueryClient();

  return useMutation(postNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("note");
    },
  });
};

export const useDeleteNoteHandler = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("note");
    },
  });
};

export const useEditNoteHandler = () => {
  const queryClient = useQueryClient();

  return useMutation(editNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("note");
    },
  });
};
