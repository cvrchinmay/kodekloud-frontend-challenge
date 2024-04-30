import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, type = "button", ...props },
  ref
) {
  return (
    <button
      type={type}
      className={`
          bg-primary-500
          w-full rounded-md border border-transparent px-6 py-3
          text-white disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-400
          hover:opacity-95
          transition
          ${className || ""}`.trim()}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
