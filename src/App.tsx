import Button from "./Components/UI/Button";
import Modal from "./Components/UI/Modal";
import ProductCart from "./Components/UI/ProductCard";
import Input from "./Components/UI/Input";
import { productList, formInputsList } from "./Data";
import { useState } from "react";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./Components/ErrorMessage";

function App() {
  const DefaultProductObject = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: { name: "", imageURL: "" },
    colors: [],
  };
  //** States */
  const [Product, setProduct] = useState<IProduct>(DefaultProductObject);
  const [isOpen, setIsOpen] = useState(true);
  const [Error, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  //** Handlers */
  const closeModal = () => setIsOpen(false);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...Product, [name]: value });
    setError({ ...Error, [name]: "" });
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = Product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    console.log(errors);
    const hasErrorMsg =
      Object.values(errors).every((prop) => prop === "") &&
      Object.values(errors).some((prop) => prop === "");
    console.log(hasErrorMsg);
    if (!hasErrorMsg) {
      setError(errors);
    }
    console.log("Product is Sent to server");
  };
  const onCancle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Cancled");
    setProduct(DefaultProductObject);
    closeModal();
  };
  // ** Renders
  const renderProductList = productList.map((product) => (
    <ProductCart key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((FormInput) => (
    <div key={FormInput.name} className="flex flex-col gap-2">
      <label
        className="mb-2 text-sm font-medium text-gray-500"
        htmlFor={FormInput.id}
      >
        {FormInput.label} :
      </label>
      <Input
        type={FormInput.type}
        name={FormInput.name} // Ensure name is set correctly
        value={Product[FormInput.name]} // Use product here
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={Error[FormInput.name]} />
    </div>
  ));

  return (
    <main className="container mx-auto">
      <div className="border-1 border-gray-400  m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5 gap-5 rounded-2xl">
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
          <div className="flex space-x-3 uppercase items-center mt-5">
            <Button className="uppercase bg-indigo-500 hover:bg-indigo-900 ">
              Submit
            </Button>
            <Button
              className="uppercase bg-gray-400 hover:bg-gray-700"
              onClick={onCancle}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <div className="fixed top-0 bg-indigo-500 hover:bg-indigo-900 text-white p-3  cursor-pointer">
        <Button onClick={() => setIsOpen(true)}>Show Form</Button>
      </div>
    </main>
  );
}

export default App;
