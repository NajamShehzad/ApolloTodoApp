import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { GET_TASKS } from '../getTasks';

const UPDATE_TASK = gql`
  mutation($_id: String!, $description: String!, $state: String!) {
    updateTask(_id: $_id, description: $description, state: $state) {
        message
        success
    }
  } 
`

const updateTask = Component => props => {
    return (
        <Mutation mutation={UPDATE_TASK}>
            {updateTask => {
                return (
                    <Component
                        updateTask={({ _id, description, state }) => {
                            return updateTask({
                                variables: { _id, description, state },
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

export default updateTask;