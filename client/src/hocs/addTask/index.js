
import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { GET_TASKS } from '../getTasks';

const ADD_TASK = gql`
  mutation($description: String!, $state: String!) {
    addTask(description: $description, state: $state) {
        message
        success
    }
  }
`

const addTask = Component => props => {
    return (
        <Mutation mutation={ADD_TASK}>
            {addTask => {
                return (
                    <Component
                        addTask={({ description, state }) => {
                            return addTask({
                                variables: { description, state },
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

export default addTask;