import Button from "./Components/UI/Button";
import Modal from "./Components/UI/Modal";
import ProductCard from "./Components/UI/ProductCard";
import Input from "./Components/UI/Input";
import { productList, formInputsList, Colors } from "./Data";
import { useState } from "react";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./Components/ErrorMessage";
import CircleColor from "./Components/UI/CircleColor";
import { v4 as uuid } from "uuid";

function App() {
  const DefaultProductObject: IProduct = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: { name: "", imageURL: "" },
    colors: [],
  };

  //** States */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [product, setProduct] = useState<IProduct>(DefaultProductObject);

  //** Handlers */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const validationErrors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg = Object.values(validationErrors).some(
      (error) => error !== ""
    );

    if (hasErrorMsg) {
      setErrors(validationErrors);
      return;
    }

    const newProduct: IProduct = {
      ...product,
      id: String(products.length + 1),
      colors: tempColors,
    };
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors },
      ...prev,
    ]);
    setProduct(DefaultProductObject);
    setTempColors([]);
    closeModal();
  };

  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setProduct(DefaultProductObject);
    setTempColors([]);
    closeModal();
  };

  // ** Renders
  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderProductColors = Colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderFormInputList = formInputsList.map((formInput) => (
    <div key={formInput.id} className="flex flex-col gap-2">
      <label
        className="mb-2 text-sm font-medium text-gray-500"
        htmlFor={formInput.id}
      >
        {formInput.label} :
      </label>
      <Input
        type={formInput.type}
        id={formInput.id}
        name={formInput.name}
        value={product[formInput.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[formInput.name as keyof typeof errors]} />
    </div>
  ));

  return (
    <main className="container mx-auto">
      <div className="border-1 border-gray-400 m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5 gap-5 rounded-2xl">
        {renderProductList}
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Add Product"
        description="Please fill the form below"
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex flex-wrap space-x-1 items-center">
            {renderProductColors}
          </div>
          <div className="flex flex-wrap space-x-1 items-center">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 rounded-full text-white text-xs"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex space-x-3 uppercase items-center mt-5">
            <Button className="uppercase bg-indigo-500 hover:bg-indigo-900">
              Submit
            </Button>
            <Button
              className="uppercase bg-gray-400 hover:bg-gray-700"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <div className="fixed top-0 bg-indigo-500 hover:bg-indigo-900 text-white p-3 cursor-pointer">
        <Button onClick={openModal}>Show Form</Button>
      </div>
    </main>
  );
}

export default App;
