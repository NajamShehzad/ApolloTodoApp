import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { GET_TASKS } from '../getTasks';

const DELETE_TASK = gql`
  mutation($_id: String!) {
    deleteTask(_id: $_id) {
      message
      success
    }
  } 
`

const deleteTask = Component => props => {
  return (
    <Mutation mutation={DELETE_TASK}>
      {deleteTask => {
        return (
          <Component
            deleteTask={({ _id }) => {
              return deleteTask({
                variables: { _id },
                refetchQueries: [{ query: GET_TASKS }],
              })
            }}
            {...props}
          />
        )
      }}
    </Mutation>
  )
}

export default deleteTask;