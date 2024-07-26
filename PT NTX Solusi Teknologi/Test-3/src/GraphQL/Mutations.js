import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
 mutation AddProduct($name: String!, $price: numeric! $quantity: Int!) {
  insert_products(objects: {name: $name, price: $price quantity: $quantity}) {
   returning {
       name
       quantity
     }
   
  }
 }
`

export const DELETE_PRODUCT = gql`
 mutation DeleteProduct($id: Int!) {
  delete_products(where: {id: {_eq: $id}}) {
   returning {
    id
    name
   }
  }
 }
`

export const UPDATE_PRODUCT = gql`
 mutation UpdateProduct($id: Int!, $changes: products_set_input) {
  update_products(_set: $changes, where: {id: {_eq: $id}}) {
   returning {
    name
    price
    quantity
   }
  }
 }
`

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    insert_categories(objects: {name: $name}) {
      returning {
        name
      }
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Int, $changes: categories_set_input) {
    update_categories(_set: $changes, where: {id: {_eq: $id}}) {
      returning {
        name
      }
    }
  }
`


export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int) {
    delete_categories(where: {id: {_eq: $id}}) {
      returning {
        name
      }
    }
  }
`