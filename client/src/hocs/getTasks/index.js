import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

export const GET_TASKS = gql`
  {
    getTasks {
        _id
        description
        state
    }
  }
`

const getTasks = Component => props => {
    return (
        <Query query={GET_TASKS}>
            {({ loading, data, error }) => {
                console.log(error)
                let errorTosend
                if (error) {
                    errorTosend = error.networkError.result
                }
                return (
                    <Component
                        loading={loading}
                        apolloError={errorTosend}
                        getTasks={data && data.getTasks}
                        {...props}
                    />
                )
            }}
        </Query>
    )
}

export default getTasks