import { UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | string;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<{
    text: string;
    title: string;
  }>;
}

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  className,
  register,
}: InputProps) => {
  return (
    <div className="flex flex-col mb-3 space-y-3">
      <label className="text-slate-800" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register("title")}
        className={`p-2 h-8 border focus:outline-gray-700 focus:outline-1 ${className}`}
      />
    </div>
  );
};

export default Input;
