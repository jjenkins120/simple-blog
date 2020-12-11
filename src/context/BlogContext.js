import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'
//NO LONGER NEED BECAUSE OF createDataContext
// const BlogContext = React.createContext()
//this is the piping network that will move information stored in global state (our provider component) to our individual components that need access to that information

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload
        // case 'add_blogpost': 
        //     return [...state, {title: action.payload.title, content: action.payload.content, id: Math.floor(Math.random() * 9999)}]
        // don't need this anymore because we are working with the API
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload)
        case 'edit_blogpost':
            return state.map(blogPost => {
                return blogPost.id === action.payload.id ? action.payload : blogPost
            })
        default: 
            return state
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')
        //remember - the '/blogposts' will be concatenated on the baseURL in the jsonServer
        dispatch({ type: 'get_blogposts', payload: response.data })
        //response.data is the json array of blogpost objects
    }
}


const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content })
        if (callback){
            callback()
        }
    }
}

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`)
        dispatch({type: 'delete_blogpost', payload: id})
        // we can continue to use the dispatch here so that the backend and frontend are updated. We could, if we wanted to, could make another fetch request to get all the blogposts, but it is expensive and unnecessary 
    }
}

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.patch(`/blogposts/${id}`, { title, content })
        dispatch({type: 'edit_blogpost', 
            payload: {id, title, content}
        })
        if (callback){
            callback()
        }
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
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, 
    []
)