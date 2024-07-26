import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
 query GetProducts {
  products {
    id
    name
    price
    quantity
  }
}
`

export const GET_CATEGORIES_PRODUCT = gql`
  query GetCategoriesProduct {
    categories {
      id
      name
    }
  }
`