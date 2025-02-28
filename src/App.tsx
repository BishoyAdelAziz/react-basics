import Modal from "./Components/UI/Modal";
import ProductCart from "./Components/UI/ProductCard";
import { productList } from "./Data";

function App() {
  // ** Renders
  const renderProductList = productList.map((product) => (
    <ProductCart key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto">
      <div className="border-1 border-gray-400  m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5 gap-5 rounded-2xl">
        {renderProductList}
      </div>
      <Modal />
    </main>
  );
}

export default App;
