import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

type variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | undefined;

type size = "default" | "sm" | "lg" | "icon" | undefined;

const generalStyle =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
const variants = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-[#08529b]/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

const buttonVariant = (val: variant) => {
  if (!val) return variants.variant.default;
  const button = variants.variant[val];
  if (!button) return variants.variant.default;
  return button;
};

const buttonSize = (val: size) => {
  if (!val) return variants.size.default;
  const button = variants.size[val];
  if (!button) return variants.size.default;
  return button;
};

const Button = ({
  variant,
  type,
  className,
  size,
  children,
  onClick,
}: ButtonProps) => {
  const variants = buttonVariant(variant);
  const sizes = buttonSize(size);
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${generalStyle} ${variants} ${sizes} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
