import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String! $password: String!){
    login(email: $email password: $password)
  }
`

export const REGISTER = gql`
  mutation Register($email: String! $password: String! $phoneNumber: String! $name:String!){
    register(email: $email password: $password phoneNumber: $phoneNumber name: $name)
  }
`

export const GET_USERS = gql`
  query getUsers{
    users{
      id
      email
      name
      phoneNumber
      create_at
      permission
    }
  }
`

export const GET_USER = gql`
  query user{
    user{
      id
      email
      name
      phoneNumber
      create_at
      permission
    }   
  }
`