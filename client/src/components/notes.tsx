import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import Button from "./ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, noteType } from "../schema/noteSchema";
import CreateNoteModal from "./createNoteModal";
import { useNoteHandler, useAddNoteHandler } from "./useNoteHandler";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { formattedDate } from "./formatedDate";

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

  const onSubmit = () => {
    mutate(getValues());
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex justify-center py-5">
        <Button onClick={openModal} className="font-bold">
          + Add new note
        </Button>
      </div>
      <CreateNoteModal
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        reset={reset}
        getValues={getValues}
        mutate={mutate}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((note: noteProps) => {
            const { _id, title, text, createdAt, updatedAt } = note;
            const shownDate = formattedDate(createdAt, updatedAt);

            return (
              <Card key={_id}>
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
                    <MenuItem className={"flex gap-2 items-center p-2"}>
                      <Pencil size={"20px"} strokeWidth={"2.5px"} />{" "}
                      <span className="text-base font-normal">Edit</span>
                    </MenuItem>
                    <MenuItem
                      className={"flex gap-x-2 items-center p-2 text-red-500"}
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
      </div>
    </div>
  );
};

export default Notes;
