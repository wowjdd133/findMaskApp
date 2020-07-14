import gql from "graphql-tag";

export const GET_BOARDS = gql`
  query getBoards($offset: Float, $limit: Float){
    boards(offset: $offset, limit: $limit) {
      id
      viewCount
      title
      uid {
        id
        email
        name
      }
      create_at
      update_at
    }
  }
`;

export const GET_BOARD = gql`
  query getBoard($id: String!){
    board(id: $id){
      id
      viewCount
      title
      uid{
        id
        name
      }
      content
      update_at
      create_at
      comments{
        id
        content
        create_at
        update_at
        author{
          email
          name
        }
      }
      image
    }
  }
`;

export const WRITE_BOARD = gql`
  mutation writeBoard($title: String!, $content: String!, $image: String) {
    writeBoard(title: $title, content: $content, image: $image)
  }
`;

export const UP_VIEWCOUNT = gql`
  mutation upViewCount($id: String!){
    upViewCount(id: $id)
  }
`

export const UPDATE_BOARD = gql`
  mutation updateBoard($title: String!, $content: String!, $id: String!) {
    updateBoard(title: $title, content: $content, id: $id)
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($id: String!) {
    deleteBoard(id: $id)
  }
`;
