import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'

import './dist/css/main.css'
import 'animate.css'
import Categories from './pages/Categories.jsx'

const client = new ApolloClient({
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'jw8y3lwW7Vk4HKuROjlbs3flnrYaDsE1vkqNqhtTgv3rIo8bC655Fx6WmSZk4KvO'
  },
  uri: 'https://sirefcode.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/categories-product",
    element: <Categories />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </ApolloProvider>
  </React.StrictMode>,
)
