import Button from "./Button";
import ProductImage from "./image";
import { IProduct } from "../../interfaces";
import { textSlicer } from "../../Utils";
interface IProps {
  product: IProduct;
}
const ProductCart = ({ product }: IProps) => {
  const { title, description, imageURL, price, category, id } = product;
  return (
    <div
      key={id}
      className="border rounded-md p-2 flex flex-col gap-3 justify-between"
    >
      <div className="h-min-[50%]">
        <ProductImage alt="Car" ImageURL={imageURL} />
      </div>
      <h3 className="text-2xl">{title}</h3>
      <p className="text-sm">{textSlicer(description)}</p>
      <div className="flex items-center space-x-2">
        <span className="w-5 h-5 rounded-full bg-indigo-600 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-yellow-600 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-red-600 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-black cursor-pointer" />
      </div>
      <div className="flex items-center justify-between">
        <span>${price}</span>
        <ProductImage
          ImageURL={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button
          onClick={() => alert(`you Need to Edit ${title}`)}
          className="bg-indigo-700 hover:bg-indigo-900"
          width="w-full"
        >
          EDIT
        </Button>
        <Button className="bg-red-700 hover:bg-red-900 ">DELETE</Button>
      </div>
    </div>
  );
};
export default ProductCart;
