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
import { UseMutateFunction } from "react-query";
/* import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query"; */

interface CreateNoteProp {
  isOpen: boolean;
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
  /* refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown>>; */
  reset: UseFormReset<{
    title: string;
    text: string;
  }>;
  getValues: UseFormGetValues<{
    title: string;
    text: string;
  }>;
  mutate: UseMutateFunction<
    void,
    unknown,
    {
      text: string;
      title: string;
    },
    unknown
  >;
}

const CreateNoteModal = ({
  isOpen,
  closeModal,
  onSubmit,
  register,
  errors,
  reset,
}: // getValues,
// mutate,
CreateNoteProp) => {
  const onSuccess = () => {
    if (!errors.text && !errors.title) {
      closeModal();
      // mutate(getValues());
      setTimeout(() => {
        reset();
      }, 1000);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal} onSubmit={onSubmit}>
      <ModalHeader className="flex justify-between items-center">
        Add Note{" "}
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
        <span className="text-sm text-red-500">
          {errors.text && `${errors.text.message}`}
        </span>
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
