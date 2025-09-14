import {gql} from '@apollo/client';


// Products
export const PRODUCTS_GQL = gql`
  query {
    products {
      id
      index
      uploadedAt
    }
  }
`
export const CREATE_PRODUCT_GQL = gql`
  mutation {
    createProduct {
      id
      index
      uploadedAt
    }
  }
`

export const REORDER_PRODUCTS_GQL = gql`
  mutation ReorderProductsGQL($gqlInput: [ProductOrderInput!]!) {
    reorderProducts(gqlInput: $gqlInput)
  }
`

export const DELETE_PRODUCTS_GQL = gql`
  mutation DeleteProductsGQL($uids: [String!]!) {
    deleteProducts(uids: $uids) {
      id
      index
      uploadedAt
    }
  }
`


// Inquiries
export const SEND_INQUIRY_GQL = gql`
  mutation SendInquiry($gqlInput: InquiryCreateInput!) {
    createInquiry(gqlInput: $gqlInput)
  }
`

// Users
export const GET_USER_BY_TOKEN = gql`
  query GetUserByToken {
    getUserByToken {
      id
      email
    }
  }
`
export const LOGIN_GQL = gql`
  mutation Login($gqlInput: UserLoginInput!) {
    login(gqlInput: $gqlInput) {
      accessToken
      refreshToken
      user {
        id
        email
      }
    }
  }
`


// Blogs
export const BLOGS_GQL = gql`
  query {
    blogs {
      id
      index
      title
      subtitle
      author
      paragraphs {
        title
        text
        image
        index
      }
    }
  }
`

export const CREATE_BLOG = gql`
  mutation CreateBlog($gqlInput: BlogCreateInput!) {
    createBlog(gqlInput: $gqlInput) {
      id
      title
      subtitle
      author
      paragraphs {
        title
        text
        image
        index
      }
    }
  }
`

export const REORDER_BLOGS = gql`
  mutation ReorderBlogs($gqlInput: [BlogUpdateInput!]!) {
    reorderBlogs(gqlInput: $gqlInput)
  }
`

// mutation DeleteProductsGQL($uids: [String!]!) {
//   deleteProducts(uids: $uids) {
//     id
//     index
//     uploadedAt
//   }
// }

export const DELETE_BLOGS = gql`
  mutation DeleteBlogs($uids: [String!]!) {
    deleteBlogs(uids: $uids) {
      id
      title
      subtitle
      author
      index
      paragraphs {
        title
        text
        image
        index
      }
    }
  }
`
