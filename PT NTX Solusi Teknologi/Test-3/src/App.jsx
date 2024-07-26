import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client"
import { GET_PRODUCTS } from "./GraphQL/Queries"
import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "./GraphQL/Mutations";
import { Link } from "react-router-dom";

export default function App() {
 // State hook for insert new product
 const [productName, setProductName] = useState("");
 const [productPrice, setProductPrice] = useState("");
 const [productQuantity, setProductQuantity] = useState("");

 // State hook for updating product
 const [currentProductId, setCurrentProductId] = useState("")
 const [currentProductName, setCurrentProductName] = useState("");
 const [currentProductPrice, setCurrentProductPrice] = useState("");
 const [currentProductQuantity, setCurrentProductQuantity] = useState("");

 // State hook for pop up the modal box
 const [showModal, setShowModal] = useState(false);

 // Query
 const { data, loading, error } = useQuery(GET_PRODUCTS);

 // Mutations
 const [insert_products, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_PRODUCT)
 const [delete_products, { loading: mutationDeleteLoading, error: mutationDeleteError }] = useMutation(DELETE_PRODUCT)
 const [update_products, { loading: mutationUpdateLoading, error: mutationUpdateError }] = useMutation(UPDATE_PRODUCT)

 if (loading) return "Loading..."
 if (error) return <pre>{error.message}</pre>
 if (mutationLoading) return "Updating data, please wait..."
 if (mutationError) return <pre>{mutationError.message}</pre>
 if (mutationDeleteLoading) return "Deleting data, please wait..."
 if (mutationDeleteError) return <pre>{mutationDeleteError.message}</pre>
 if (mutationUpdateLoading) return "Updating data, please wait..."
 if (mutationUpdateError) return <pre>{mutationUpdateError.message}</pre>

 const handleSubmit = (e) => {
  // This is a function called handleSubmit that is triggered when a form is submitted. It prevents the default form submission behavior, then uses an Apollo GraphQL mutation to insert a new product into the database. The product's name, price, and quantity are passed as variables to the mutation. After the mutation is successful, the productName, productPrice, and productQuantity state variables are reset to empty strings.

  e.preventDefault();

  insert_products({
   variables: {
    name: productName,
    price: Number(productPrice),
    quantity: Number(productQuantity)
   },
   refetchQueries: [{ query: GET_PRODUCTS }]
  });

  setProductName("");
  setProductPrice("");
  setProductQuantity("");
 }

 const handleDelete = (id) => {
  // This is a function called handleDelete that takes an id parameter. Inside the function, it calls the delete_products function with an object as an argument. The object contains a variables property with an id property set to the value of the id parameter. Additionally, it includes a refetchQueries property with an array containing a single object with a query property set to the value of GET_PRODUCTS. This code is likely used to delete a product by calling the delete_products function with the appropriate id and refetching the list of products after the deletion.

  delete_products({
   variables: {
    id: id
   },
   refetchQueries: [{ query: GET_PRODUCTS }]
  })
 }

 const editButtonClicked = (id, productName, productPrice, productQuantity) => {
  // This is function called editButtonClicked that triggered when the user clicks the edit button for a product.
  // It sets the current product ID, name, price, and quantity in the state.
  // It also sets the showModal state to true, which will display the modal box.
  // The function takes four parameters: id, productName, productPrice, and productQuantity.
  // These parameters are used to update the current product information in the state.
  // The function does not return anything.
  setCurrentProductId(id)
  setCurrentProductName(productName);
  setCurrentProductPrice(productPrice);
  setCurrentProductQuantity(productQuantity);

  setShowModal(true);
 }

 const handleUpdate = (e) => {
  // This is function called handleUpdate that is triggered when an event (e) occurs. It prevents the default behavior of the event, then calls the update_products function with an object as an argument. 

  // The object contains a variables property with an id property set to the value of currentProductId, and a changes property with name, price, and quantity properties set to the values of currentProductName, currentProductPrice, and currentProductQuantity respectively. 

  // It also includes a refetchQueries property with an array containing a single object with a query property set to the value of GET_PRODUCTS. Finally, it calls setShowModal with the argument false to hide a modal.

  e.preventDefault();

  update_products({
   variables: {
    id: currentProductId,

    changes: {
     name: currentProductName,
     price: currentProductPrice,
     quantity: currentProductQuantity
    },
   },
   refetchQueries: [{ query: GET_PRODUCTS }]
  });

  setShowModal(false);
 }

 const cancelUpdate = (e) => {
  //   This a function called cancelUpdate that is used to cancel updating a product and close a modal.

  // It first prevents the default behavior of the event e. Then it sets the current product ID, name, price, and quantity to empty strings using the setCurrentProductId, setCurrentProductName, setCurrentProductPrice, and setCurrentProductQuantity functions respectively. Finally, it sets the showModal state to false using the setShowModal function.

  // This function is likely used in a React component where a user is updating a product and can cancel the update. When the user clicks the cancel button, this function is called to reset the product information and hide the modal.
  e.preventDefault();

  setCurrentProductId("");
  setCurrentProductName("");
  setCurrentProductPrice("");
  setCurrentProductQuantity("");

  setShowModal(false);
 }

 return (
  <div className={`relative ${showModal ? "after:content-[''] after:fixed after:opacity-40 after:bg-black after:w-screen after:h-screen after:left-0 after:top-0" : ""}`}>
   <h1 className="mt-6 text-5xl text-center">List of Products</h1>
   <Link to="/categories-product" className="inline-block px-5 py-2 mt-6 ml-5 text-white duration-75 ease-in-out bg-blue-600 rounded-sm hover:bg-blue-500">
    List categories product
   </Link>

   <div className="flex items-start justify-center gap-4 mt-10">
    <table className="text-center border border-separate table-fixed border-spacing-3">
     <thead>
      <tr>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">No</th>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">ID</th>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">Name</th>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">Price</th>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">Quantity</th>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">Total Price</th>
       <th className="px-5 text-white duration-75 ease-in-out border border-slate-600 bg-slate-700">Actions</th>
      </tr>
     </thead>

     <tbody>
      {data && data.products.map((product, index) => (
       <tr key={product.id}>
        <td className="px-5 border border-slate-700">{index + 1}</td>
        <td className="px-5 border border-slate-700">{product.id}</td>
        <td className="px-5 border border-slate-700">{product.name}</td>
        <td className="px-5 border border-slate-700">${product.price.toLocaleString('en-US', { maximumFractionDigits: 3 })
        }</td>
        <td className="px-5 border border-slate-700">{product.quantity}</td>
        <td className="px-5 font-bold border border-slate-700">${(product.quantity * product.price).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td>
        <td className="space-x-4">
         <button onClick={() => editButtonClicked(product.id, product.name, product.price, product.quantity)} className="px-5 py-1 text-white duration-75 ease-in-out bg-blue-700 rounded-sm hover:bg-blue-500">Edit</button>
         <button onClick={() => handleDelete(product.id)} className="px-5 py-1 text-white duration-75 ease-in-out bg-red-700 rounded-sm hover:bg-red-500">Delete</button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>

    <form onSubmit={handleSubmit}>
     <label htmlFor="product-name">
      <p>Product Name</p>
      <input autoComplete="true" autoCapitalize="true" onChange={(e) => setProductName(e.target.value)} type="text" className="border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Insert new product name" name="product-name" id="product-name" required />
     </label>
     <label htmlFor="product-price">
      <p>Product Price</p>
      <input autoComplete="true" onChange={(e) => setProductPrice(e.target.value)} type="text" className="border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Insert new product price" name="product-price" id="product-price" required />
     </label>
     <label htmlFor="product-quantity">
      <p>Product Quantity</p>
      <input autoComplete="true" onChange={(e) => setProductQuantity(e.target.value)} type="text" className="border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Insert new product qty" name="product-quantity" id="product-quantity" required />
     </label>
     <button type="submit" className="block px-5 py-2 mt-6 text-white duration-75 ease-in-out bg-blue-600 rounded-sm hover:bg-blue-500">Add new product</button>
    </form>
   </div>

   {/* Modal */}
   <div className={`fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[28rem] ${showModal ? "z-50 animate__animated animate__fadeIn animate__faster" : "hidden"}`}>
    <div className="p-5 text-white rounded-md shadow-md bg-slate-700">
     <h2 className="mb-5 text-xl tracking-wide text-center uppercase">Update Product</h2>

     <form onSubmit={handleUpdate}>
      <label htmlFor="product-id">
       <p>Product ID</p>
       <input autoComplete="true" type="text" value={currentProductId} className="text-black w-full border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Product id" name="product-id" id="product-id" disabled />
      </label>
      <label htmlFor="product-name">
       <p>Product Name</p>
       <input autoComplete="true" type="text" value={currentProductName} onChange={(e) => setCurrentProductName(e.target.value)} className="text-black w-full border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Product name" name="product-name" id="product-name" required />
      </label>
      <label htmlFor="product-price">
       <p>Product Price</p>
       <input autoComplete="true" type="text" value={currentProductPrice} onChange={(e) => setCurrentProductPrice(e.target.value)} className="text-black w-full border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Product price" name="product-price" id="product-price" required />
      </label>
      <label htmlFor="product-quantity">
       <p>Product Quantity</p>
       <input autoComplete="true" type="text" value={currentProductQuantity} onChange={(e) => setCurrentProductQuantity(e.target.value)} className="text-black w-full border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Product quantity" name="product-quantity" id="product-quantity" required />
      </label>

      <div className="flex items-center gap-4">
       <button onClick={cancelUpdate} className="flex-1 block px-5 py-2 mt-6 text-white duration-75 ease-in-out bg-red-700 rounded-sm hover:bg-red-500">Cancel</button>
       <button type="submit" className="flex-1 block px-5 py-2 mt-6 text-white duration-75 ease-in-out bg-blue-600 rounded-sm hover:bg-blue-500">Update</button>
      </div>
     </form>
    </div>
   </div>
  </div>
 )
}
