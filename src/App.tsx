import Button from "./Components/UI/Button";
import Modal from "./Components/UI/Modal";
import ProductCart from "./Components/UI/ProductCard";
import Input from "./Components/UI/Input";
import { productList, formInputsList } from "./Data";
import { useState } from "react";
function App() {
  //** States */
  const [isOpen, setIsOpen] = useState(true);
  //** Handlers */
  const closeModal = () => setIsOpen(false);
  // ** Renders
  const renderProductList = productList.map((product) => (
    <ProductCart key={product.id} product={product} />
  ));
  const renderFormInputList = formInputsList.map((FormInput) => (
    <div key={FormInput.id} className="flex flex-col gap-2">
      <label
        className="mb-2 text-sm font-medium text-gray-500"
        htmlFor={FormInput.id}
      >
        {FormInput.label} :
      </label>
      <Input key={FormInput.id} />
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
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex space-x-3 uppercase items-center mt-5">
            <Button className="uppercase bg-indigo-500 hover:bg-indigo-900 ">
              Submit
            </Button>
            <Button className="uppercase bg-gray-400 hover:bg-gray-700">
              Cancle
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
