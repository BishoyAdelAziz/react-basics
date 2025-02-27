interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  width?: "w-full" | "w-1/2" | "w-1/3" | "w-1/4" | "w-1/5" | "w-fit";
}
const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      {...rest}
      className={`${className} p-2 ${width} rounded-md text-white`}
    >
      {children}
    </button>
  );
};
export default Button;
