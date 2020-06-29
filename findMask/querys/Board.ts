import gql from "graphql-tag";


export const GET_BOARD_DATA = gql`
  query{
    boards{
      id
      title
      uid{
        id
        email
        name
      }
      content
      create_at
      upodate_at
    }
  }
`;

export const WRITE_BOARD = gql`
  mutation writeBoard(title: String! content: String!){
    writeBoard(title: $title, content: $content)
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(title: String! content: String! id:ID!){
    updateBoard(title: $title, content: $content, id:$id)
  }
`

export const DELETE_BOARD = gql`
  mutation deleteBoard(id: ID!){
    deleteBoard(id:$id)
  }
`
