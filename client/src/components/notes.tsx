import Button from "./ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, noteType } from "../schema/noteSchema";
import CreateNoteModal from "./createNoteModal";
import {
  useNoteHandler,
  useAddNoteHandler,
  useDeleteNoteHandler,
} from "./useNoteHandler";
import AllNotes from "./AllNotes";

export interface noteProps {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const Notes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<noteType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { data, isLoading, error } = useNoteHandler();

  const { mutate } = useAddNoteHandler();
  const { mutate: mutateDelete } = useDeleteNoteHandler();

  const onSubmit = () => {
    mutate(getValues());
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex justify-center my-10">
        <Button onClick={openModal} className="font-bold">
          + Add new note
        </Button>
      </div>
      <CreateNoteModal
        addTitle="Add Note"
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        reset={reset}
        getValues={getValues}
      />
      {data && (
        <AllNotes
          data={data}
          mutateDelete={mutateDelete}
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default Notes;
