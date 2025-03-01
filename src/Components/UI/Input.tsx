interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input
      {...rest}
      className="border-[1px]  border-gray-300 shadow-md focus:border-indigo-900 focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded-md px-3 py-3 text-md"
    />
  );
};
export default Input;
