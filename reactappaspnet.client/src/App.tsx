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
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  const handleRemoveProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const idInput = document.getElementById("removeId") as HTMLInputElement;

    // Send a DELETE request to your API
    const response = await fetch(`products/${idInput.value}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // If the product was successfully removed, update your products list
      populateProductsData();
    }

    idInput.value = "";
  };

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameInput = document.getElementById("addName") as HTMLInputElement;
    const priceInput = document.getElementById("addPrice") as HTMLInputElement;

    // Send a POST request to your API
    const response = await fetch(`products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        price: priceInput.value,
      }),
    });

    if (response.ok) {
      // If the product was successfully added, update your products list
      populateProductsData();
    }

    nameInput.value = "";
    priceInput.value = "";
  };

  const handleEditProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const idInput = document.getElementById("editId") as HTMLInputElement;
    const nameInput = document.getElementById("editName") as HTMLInputElement;
    const priceInput = document.getElementById("editPrice") as HTMLInputElement;

    // Send a PUT request to your API
    const response = await fetch(`products/${idInput.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idInput.value,
        name: nameInput.value,
        price: priceInput.value,
      }),
    });

    if (response.ok) {
      // If the product was successfully edited, update your products list
      populateProductsData();
    }

    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
  };

  return (
    <div>
      <h1 id="tabelLabel">Products Demo App1</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}

      <form onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <div>
          <label htmlFor="addName">Name:</label>
          <input type="text" id="addName" name="addName" required />
        </div>
        <div>
          <label htmlFor="addPrice">Price:</label>
          <input type="number" id="addPrice" name="addPrice" required />
        </div>
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleRemoveProduct}>
        <h2>Remove Product</h2>
        <div>
          <label htmlFor="removeId">ID:</label>
          <input type="number" id="removeId" name="removeId" required />
        </div>
        <button type="submit">Remove</button>
      </form>

      <form onSubmit={handleEditProduct}>
        <h2>Edit Product</h2>
        <div>
          <label htmlFor="editId">ID:</label>
          <input type="number" id="editId" name="editId" required />
        </div>
        <div>
          <label htmlFor="editName">Name:</label>
          <input type="text" id="editName" name="editName" required />
        </div>
        <div>
          <label htmlFor="editPrice">Price:</label>
          <input type="number" id="editPrice" name="editPrice" required />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );

  async function populateProductsData() {
    const response = await fetch("products");
    const data = await response.json();
    setProducts(data);
  }

  // add other CRUD operations here

  //   async function addProduct(product: Products) {
  //     try {
  //       const response = await fetch("products", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(product),
  //       });
  //       const data = await response.json();
  //       setProducts(products ? [...products, data] : [data]);
  //     } catch (error) {
  //       console.error("Error adding product:", error);
  //     }
  //   }

  //   async function updateProduct(product: Products) {
  //     try {
  //       const response = await fetch(`products/${product.id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(product),
  //       });
  //       const data = await response.json();
  //       const updatedProducts = products?.map((p) =>
  //         p.id === product.id ? data : p
  //       );
  //       setProducts(updatedProducts || []);
  //     } catch (error) {
  //       console.error("Error updating product:", error);
  //     }
  //   }

  //   async function deleteProduct(productId: number) {
  //     try {
  //       await fetch(`products/${productId}`, {
  //         method: "DELETE",
  //       });
  //       const updatedProducts = (products || []).filter(
  //         (p) => p.id !== productId
  //       );
  //       setProducts(updatedProducts);
  //     } catch (error) {
  //       console.error("Error deleting product:", error);
  //     }
  //   }
  //   async function getProduct(productId: number) {
  //     try {
  //       const response = await fetch(`products/${productId}`);
  //       const data = await response.json();
  //       return data;
  //     } catch (error) {
  //       console.error("Error getting product:", error);
  //       return null;
  //     }
  //   }
}
export default App;
