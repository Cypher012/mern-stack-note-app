import { noteProps } from "./notes";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { formattedDate } from "./formatedDate";
import { UseMutateFunction } from "react-query";
import { useNoteHandlerById } from "./useNoteHandler";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, noteType } from "../schema/noteSchema";
import CreateNoteModal from "./createNoteModal";
import { useEditNoteHandler } from "./useNoteHandler";
import Masonry from "@mui/lab/Masonry";

interface AllNoteProps {
  data: noteProps[];
  mutateDelete: UseMutateFunction<void, unknown, string, unknown>;
  openModal: () => void;
}

export interface editValuesProps {
  title: string;
  text: string;
}

const AllNotes = ({ data, mutateDelete }: AllNoteProps) => {
  const [noteId, setNoteId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: values } = useNoteHandlerById(noteId);

  const getNoteIdFunc = (id: string) => {
    setNoteId(id);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
    values,
  });

  const { mutate } = useEditNoteHandler();

  const onSubmit = () => {
    mutate({ itemId: noteId, updatedValues: getValues() });
    console.log(values);
  };

  const editFunc = () => {
    openModal();
  };
  return (
    <Masonry
      columns={{ xs: 1, sm: 2, lg: 3 }}
      className="xl:px-16 lg:px-10 md:px-5 sm:px-2"
      spacing={2}
      sequential
    >
      {data &&
        data.map((note: noteProps) => {
          const { _id, title, text, createdAt, updatedAt } = note;
          const shownDate = formattedDate(createdAt, updatedAt);

          return (
            <Card key={_id}>
              <CreateNoteModal
                addTitle="Edit Note"
                isOpen={isOpen}
                closeModal={closeModal}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                reset={reset}
                getValues={getValues}
              />
              <CardHeader className="flex justify-between">
                {title}
                <Menu
                  align="end"
                  direction="right"
                  transition={true}
                  menuStyle={{
                    width: "7rem",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                  menuButton={
                    <MenuButton>
                      <EllipsisVertical
                        size="20px"
                        className="cursor-pointer"
                      />
                    </MenuButton>
                  }
                >
                  <MenuItem
                    onClick={() => {
                      getNoteIdFunc(_id);
                      editFunc();
                    }}
                    className={"flex gap-2 items-center p-2"}
                  >
                    <Pencil size={"20px"} strokeWidth={"2.5px"} />{" "}
                    <span className="text-base font-normal">Edit</span>
                  </MenuItem>
                  <MenuItem
                    className={"flex gap-x-2 items-center p-2 text-red-500"}
                    onClick={() => {
                      mutateDelete(_id);
                    }}
                  >
                    <Trash strokeWidth={"2.5px"} size={"20px"} />{" "}
                    <span className="text-base font-normal">Delete</span>
                  </MenuItem>
                </Menu>
              </CardHeader>
              <CardContent>{text}</CardContent>
              <CardFooter className="text-[15px] text-stone-700">
                {shownDate}
              </CardFooter>
            </Card>
          );
        })}
    </Masonry>
  );
};

export default AllNotes;
