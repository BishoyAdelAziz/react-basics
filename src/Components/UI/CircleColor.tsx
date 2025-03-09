import { HTMLAttributes } from "react";
interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      className={`w-5 h-5 block bg-[${color}] rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
};
export default CircleColor;
