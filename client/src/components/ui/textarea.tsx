import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<{
    text: string;
    title: string;
  }>;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  className,
  register,
}) => {
  return (
    <div className="flex flex-col mb-3 space-y-3">
      <label className="text-slate-800" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        {...register("text")}
        className={`p-2 h-20 border focus:outline-gray-700 focus:outline-1 ${className}`}
      />
    </div>
  );
};

export default TextArea;
