import Input from "./ui/input";
import TextArea from "./ui/textarea";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./ui/modal";
import { X } from "lucide-react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormReset,
  UseFormGetValues,
} from "react-hook-form";
import Button from "./ui/button";

interface CreateNoteProp {
  isOpen: boolean;
  addTitle: string;
  closeModal: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void>;
  register: UseFormRegister<{
    text: string;
    title: string;
  }>;
  errors: FieldErrors<{
    text: string;
    title: string;
  }>;
  reset: UseFormReset<{
    title: string;
    text: string;
  }>;
  getValues: UseFormGetValues<{
    title: string;
    text: string;
  }>;
}

const CreateNoteModal = ({
  addTitle,
  isOpen,
  closeModal,
  onSubmit,
  register,
  errors,
  reset,
  getValues,
}: CreateNoteProp) => {
  const onSuccess = () => {
    if (getValues().title) {
      closeModal();
      setTimeout(() => {
        reset();
      }, 1000);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal} onSubmit={onSubmit}>
      <ModalHeader className="flex justify-between items-center">
        {addTitle}
        <X
          onClick={closeModal}
          className="duration-300 cursor-pointer hover:text-destructive"
        />
      </ModalHeader>
      <ModalBody>
        <Input label="Title" register={register} name="title" />
        <span className="text-sm text-red-500">
          {errors.title && `${errors.title.message}`}
        </span>
        <TextArea label="Text" register={register} name="text" />
      </ModalBody>
      <ModalFooter className="flex justify-end">
        <Button onClick={onSuccess} type="submit" className="font-bold">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateNoteModal;
