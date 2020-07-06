import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $phoneNumber: String!
    $name: String!
    $image: String
  ) {
    register(
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      name: $name
      image: $image
    )
  }
`;
export const COMPARE_PASSWORD = gql`
  query comparePassword($password: String!) {
    comparePassword(password: $password)
  }
`;

export const EDIT_PROFILE = gql`
  mutation updateProfile(
    $id: String!
    $name: String!
    $phoneNumber: String!
    $image: String
  ) {
    updateProfile(
      id: $id
      name: $name
      phoneNumber: $phoneNumber
      image: $image
    )
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      email
      name
      phoneNumber
      create_at
      permission
      image
    }
  }
`;

export const GET_USER = gql`
  query {
    user {
      id
      email
      name
      image
      create_at
      phoneNumber
    }
  }
`;
