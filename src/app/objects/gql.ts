import {gql} from '@apollo/client';

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
export const DELETE_PRODUCT_GQL = gql`
  mutation DeleteProductGQL($uid: String!) {
    deleteProduct(uid: $uid)
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
export const SEND_INQUIRY_GQL = gql`
  mutation SendInquiry($gqlInput: InquiryCreateInput!) {
    createInquiry(gqlInput: $gqlInput)
  }
`

export const GET_USER_BY_TOKEN = gql`
  query GetUserByToken {
  getUserByToken {
    id
    email
  }
}
`

export const LOGIN__GQL = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
      }
    }
  }


`
