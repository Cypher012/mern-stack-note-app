import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-[#ffe790] rounded-sm border border-gray-300   ${className} `}
    >
      {children}
    </div>
  );
};
// CardHeader component
function CardHeader({ children, className }: CardProps) {
  return (
    <div
      className={`px-2 pt-2 pb-1 text-lg font-bold text-neutral-900 ${className}`}
    >
      {children}
    </div>
  );
}

// CardContent component
function CardContent({ children, className }: CardProps) {
  return <div className={`px-2 pb-2 ${className}`}>{children}</div>;
}

// CardFooter component
function CardFooter({ children, className }: CardProps) {
  return (
    <div className={`px-2 py-1 border-t border-slate-200 ${className}`}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardContent, CardFooter };
