import gql from 'graphql-tag';

export const WRITE_COMMENT = gql`
  mutation writeComment($bid:String! $content: String!){
    writeComment(bid:$bid content:$content)
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!){
    deleteComment(id: $id)
  }
`