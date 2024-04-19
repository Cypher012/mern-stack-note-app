import axios from "axios";
import { noteType } from "../schema/noteSchema";

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

export const fetchNoteById = async (noteId: string) => {
  try {
    const res = await axios.get(`${url}/${noteId}`);
    return res.data;
  } catch (error) {
    console.error(`Error getting data from client side ${error}`);
  }
};

// Function to delete an item by ID
export const deleteNote = async (itemId: string) => {
  try {
    const response = await axios.delete(`${url}/${itemId}`);
    console.log("Item deleted successfully:", response.data);
    // You can handle the deletion success here, such as updating the UI or state
  } catch (error) {
    console.error("Error deleting item:", error);
    // Handle any errors that occur during the deletion process
  }
};

export const editNote = async ({
  itemId,
  updatedValues,
}: {
  itemId: string;
  updatedValues: object;
}) => {
  try {
    const response = await axios.patch(`${url}/${itemId}`, updatedValues);
    console.log("Item edited successfully:", response.data);
    // You can handle the deletion success here, such as updating the UI or state
  } catch (error) {
    console.error("Error editing item:", error);
    // Handle any errors that occur during the editing process
    throw new Error("Error editing item");
  }
};
