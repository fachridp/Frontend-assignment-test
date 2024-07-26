import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client"
import { GET_CATEGORIES_PRODUCT } from "../GraphQL/Queries";
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "../GraphQL/Mutations";

export default function Categories() {
 // State hook for insert new product
 const [categoryName, setCategoryName] = useState("");
 const [showModal, setShowModal] = useState(false);
 const [currentCategoryId, setCurrentCategorytId] = useState("");
 const [currentCategoryName, setCurrentCategoryName] = useState("");

 // Query
 const { data, loading, error } = useQuery(GET_CATEGORIES_PRODUCT);

 // Mutations
 const [insert_categories, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_CATEGORY);
 const [update_categories, { loading: mutationUpdateLoading, error: mutationErrorLoading }] = useMutation(UPDATE_CATEGORY)
 const [delete_categories, { loading: mutationDeleteLoading, error: mutationDeleteError }] = useMutation(DELETE_CATEGORY)

 if (loading) return "Loading..."
 if (error) return <pre>{error.message}</pre>
 if (mutationLoading) return "Loading..."
 if (mutationError) return <pre>{mutationError.message}</pre>
 if (mutationUpdateLoading) return "Loading..."
 if (mutationErrorLoading) return <pre>{mutationErrorLoading.message}</pre>
 if (mutationDeleteLoading) return "Loading..."
 if (mutationDeleteError) return <pre>{mutationDeleteError.message}</pre>


 const handleSubmit = (e) => {
  // This a function called handleSubmit that is triggered when a form is submitted. It prevents the default form submission behavior using e.preventDefault(). Then, it calls a function called insert_categories with an object containing a name property. The name property is set to the value of a variable called categoryName. Finally, it passes an array containing a single object with a query property set to GET_CATEGORIES_PRODUCT as the refetchQueries argument to the insert_categories function.

  e.preventDefault();

  insert_categories({
   variables: {
    name: categoryName
   },
   refetchQueries: [{ query: GET_CATEGORIES_PRODUCT }]
  })
 }

 const handleDelete = (id) => {
  //   This is function called handleDelete is a callback function that is called when a delete action is triggered. It uses a GraphQL mutation to delete a category from the database.

  // The function takes an id parameter, which is the unique identifier of the category to be deleted. It then calls the delete_categories function, passing an object with the id as a variable. The refetchQueries property is an array that specifies a query to refetch data after the mutation is complete. In this case, it is refetching the GET_CATEGORIES_PRODUCT query to update the list of categories.

  delete_categories({
   variables: {
    id: id
   },
   refetchQueries: [{ query: GET_CATEGORIES_PRODUCT }]
  })
 }

 const editButtonClicked = (id, categoryName) => {
  // This is a function called editButtonClicked that takes two parameters: id and categoryName. Inside the function, it sets the state variables currentCategoryId and currentCategoryName to the values of id and categoryName respectively. It also sets the state variable showModal to true. This function is likely used to handle the click event of an edit button in a user interface, updating the state variables with the relevant information and displaying a modal.

  setCurrentCategorytId(id);
  setCurrentCategoryName(categoryName);
  setShowModal(true)
 }

 const handleUpdate = (e) => {
  //   This is function called handleUpdate that is used to update a category in a React component.

  // The function is an event handler for a form submission or a button click. It prevents the default form submission behavior using e.preventDefault().

  // Inside the function, it calls the update_categories function from the useMutation hook, passing an object with two properties: id and changes. The id property is set to the value of currentCategoryId, and the changes property is an object with a name property set to the value of currentCategoryName.

  // After that, it specifies a refetchQueries property in the object passed to update_categories. This property is an array containing a single object with a query property set to GET_CATEGORIES_PRODUCT. This query is used to refetch the list of categories after the update is completed.

  // Finally, it sets the state variable showModal to false to hide a modal.

  e.preventDefault();

  update_categories({
   variables: {
    id: currentCategoryId,

    changes: {
     name: currentCategoryName
    }
   },
   refetchQueries: [{ query: GET_CATEGORIES_PRODUCT }]
  })

  setShowModal(false);
 }

 const cancelUpdate = (e) => {
  // This isfunction called cancelUpdate is an event handler that is triggered when a form submission or a button click is cancelled. It prevents the default form submission behavior using e.preventDefault(). Then, it clears the current category ID and name by setting them to empty strings using setCurrentCategorytId("") and setCurrentCategoryName(""). Finally, it hides a modal by setting the showModal state to false using setShowModal(false).

  e.preventDefault();

  setCurrentCategorytId("");
  setCurrentCategoryName("");
  setShowModal(false);
 }

 return (
  <div className={`relative ${showModal ? "after:content-[''] after:fixed after:opacity-40 after:bg-black after:w-screen after:h-screen after:left-0 after:top-0" : ""}`}>
   <h1 className="mt-6 text-5xl text-center">List Categories Product</h1>
   <Link to="/" className="inline-block px-5 py-2 mt-6 ml-5 text-white duration-75 ease-in-out bg-blue-600 rounded-sm hover:bg-blue-500">
    Go to the list products page
   </Link>

   <div className="flex items-start justify-center gap-4 mt-10">
    <table className="text-center border border-separate table-fixed border-spacing-3">
     <thead>
      <tr>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">No</th>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">ID</th>
       <th className="px-5 text-white border border-slate-600 bg-slate-700">Name</th>
       <th className="px-5 text-white duration-75 ease-in-out border border-slate-600 bg-slate-700">Actions</th>
      </tr>
     </thead>

     <tbody>
      {data && data.categories.map((category, index) => (
       <tr key={category.id}>
        <td className="px-5 border border-slate-700">{index + 1}</td>
        <td className="px-5 border border-slate-700">{category.id}</td>
        <td className="px-5 border border-slate-700">{category.name}</td>
        <td className="space-x-4">
         <button onClick={() => editButtonClicked(category.id, category.name)} className="px-5 py-1 text-white duration-75 ease-in-out bg-blue-700 rounded-sm hover:bg-blue-500">Edit</button>
         <button onClick={() => handleDelete(category.id)} className="px-5 py-1 text-white duration-75 ease-in-out bg-red-700 rounded-sm hover:bg-red-500">Delete</button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>

    <form onSubmit={handleSubmit}>
     <label htmlFor="category-name">
      <p>Category Name</p>
      <input autoComplete="true" autoCapitalize="true" onChange={(e) => setCategoryName(e.target.value)} type="text" className="border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Insert new cateogory" name="category-name" id="category-name" required />
     </label>
     <button type="submit" className="block px-5 py-2 mt-6 text-white duration-75 ease-in-out bg-blue-600 rounded-sm hover:bg-blue-500">Add new category</button>
    </form>
   </div>

   {/* Modal */}
   <div className={`fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[28rem] ${showModal ? "z-50 animate__animated animate__fadeIn animate__faster" : "hidden"}`}>
    <div className="p-5 text-white rounded-md shadow-md bg-slate-700">
     <h2 className="mb-5 text-xl tracking-wide text-center uppercase">Update Product</h2>

     <form onSubmit={handleUpdate}>
      <label htmlFor="category-id">
       <p>Category ID</p>
       <input autoComplete="true" type="number" value={currentCategoryId} onChange={(e) => setCurrentCategorytId(e.target.value)} className="text-black w-full border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Product id" name="category-id" id="category-id" disabled />
      </label>
      <label htmlFor="category-name">
       <p>Category Name</p>
       <input autoComplete="true" type="text" value={currentCategoryName} onChange={(e) => setCurrentCategoryName(e.target.value)} className="text-black w-full border-[1px] focus:outline-none py-1 px-2 focus:px-2 border-slate-600" placeholder="Category name" name="category-name" id="category-name" required />
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
