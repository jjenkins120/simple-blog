import createDataContext from './createDataContext'

//NO LONGER NEED BECAUSE OF createDataContext
// const BlogContext = React.createContext()
//this is the piping network that will move information stored in global state (our provider component) to our individual components that need access to that information

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost': 
            return [...state, {title: action.payload.title, content: action.payload.content, id: Math.floor(Math.random() * 9999)}]
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload)
        default: 
            return state
    }
}

const addBlogPost = dispatch => {
    return (title, content, callback) => {
        dispatch({type: 'add_blogpost', payload: { title, content }})
        callback()
    }
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({type: 'delete_blogpost', payload: id})
    }
}

//NO LONGER NEED BECAUSE OF createDataContext
// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, [])
//     //useReducer makes sense here because we are working on CRUD functionality and this allows us to compile multiple means by which to update our global state. Remember useContext allows us to communicate with child components, but it isn't what changes state
    
//     return <BlogContext.Provider value={{data: blogPosts, addBlogPost }}>
//         {children}
//     </BlogContext.Provider>
// }
//children is a feature in react that makes sense to used within the context system - this allows our blog provider to essentially accept a component as an argument
//the value prop in BlogContext.Provider is the information that we want to get access to in a child


//NO LONGER NEED BECAUSE OF createDataContext
// export default BlogContext

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost }, 
    [{ title: 'TEST POST', content:'TEST CONTENT',  id: 1 }]
    // typically the initial state above would be an empty array, but for testing purposes, we've entered in data so that we don't have to continually add a blog post in order to test it
    )