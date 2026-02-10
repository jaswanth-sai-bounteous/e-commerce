
import type { FC, ButtonHTMLAttributes } from "react"
import clsx from "clsx"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  className?: string
}


const baseStyles =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"


const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-black text-white hover:bg-gray-800 focus:ring-black",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
}


const Button: FC<ButtonProps> = ({ className, variant = "default", ...props }) => {
  return <button className={clsx(baseStyles, variantStyles[variant], className)} {...props} />
}

export default Button
