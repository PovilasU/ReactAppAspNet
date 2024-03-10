import { useEffect, useState } from "react";
import "./App.css";

interface Products {
  id: number;
  name: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Products[]>();

  useEffect(() => {
    populateProductsData();
  }, []);

  const contents =
    products === undefined ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See{" "}
          <a href="https://aka.ms/jspsintegrationreact">
            https://aka.ms/jspsintegrationreact
          </a>{" "}
          for more details.
        </em>
      </p>
    ) : (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div>
      <h1 id="tabelLabel">Products Demo App</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );

  async function populateProductsData() {
    const response = await fetch("products");
    const data = await response.json();
    setProducts(data);
  }
}

export default App;
