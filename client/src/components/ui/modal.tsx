import React from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  onSubmit?: () => Promise<void>;
}

const Modal = ({ isOpen, children, onSubmit }: ModalProps) => {
  return (
    <form
      className={`${
        !isOpen && "hidden"
      } flex fixed inset-0 z-50 items-center flex-col p-5 `}
      onSubmit={onSubmit}
    >
      <div className="fixed inset-0 bg-black opacity-20"></div>
      <div className="p-6 w-full max-w-lg bg-white rounded-lg z-[100] mt-20 ">
        {children}
      </div>
    </form>
  );
};

const ModalHeader = ({ children, className }: ModalProps) => {
  return (
    <div className={`mb-4 text-lg font-bold ${className}`}>{children}</div>
  );
};

const ModalBody = ({ children, className }: ModalProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

const ModalFooter = ({ children, className }: ModalProps) => {
  return <div className={`flex justify-end" ${className}`}>{children}</div>;
};

export { Modal, ModalHeader, ModalBody, ModalFooter };
