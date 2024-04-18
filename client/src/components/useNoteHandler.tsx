import axios from "axios";
import { noteType } from "../schema/noteSchema";
import { useQuery, useMutation, useQueryClient } from "react-query";

const url = "http://localhost:3000/api/notes/";

export const postNote = async (values: noteType) => {
  console.log("Submitting data:", values);
  try {
    const response = await axios.post(url, values);
    console.log("response data", response.data); // Handle successful response (optional)
  } catch (error) {
    console.error(`Error getting data from client side ${error}`);
    throw new Error("Error fetching data");
  }
};

export const fetchNote = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(`Error getting data from client side ${error}`);
  }
};
export const useNoteHandler = () => {
  return useQuery("note", fetchNote);
};

export const useAddNoteHandler = () => {
  const queryClient = useQueryClient();

  return useMutation(postNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("note");
    },
  });
};
