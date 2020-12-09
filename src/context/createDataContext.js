//the title of this file is lower case - by convention, if you are just exporting a plain function, then you title the file lowercase
//this is a reusable function that we can use throughout our application that will automate the context and provider information. This significantly helps us decrease repetitive code

import React, { useReducer } from 'react'

export default (reducer, actions, initialState) => {
    const Context = React.createContext()

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState)

        //actions === { addBlogPost: (dispatch) => { return () => {} }}
        const boundActions = {}
        for (let key in actions){
            boundActions[key] = actions[key](dispatch)
        }

        return (
        <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
        )
    }

    return { Context, Provider }
}
//reducer is the reducer function
//actions are all the callback functions that we want to make available to our child components
//initialState is the initial state value
//Context allows us to communicate to the child components