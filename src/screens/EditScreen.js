import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Context } from '../context/BlogContext'
import BlogPostForm from '../components/BlogPostForm'

const EditScreen = ({ navigation }) => {
    //ORDER OF THE CONST VARIABLES MATTER
    const id = navigation.getParam('id')
    const { state, editBlogPost } = useContext(Context)
    const blogPost = state.find(blogPost => blogPost.id === id)
    
    return <BlogPostForm 
    initialValues = {{title: blogPost.title, content: blogPost.content}}
    onSubmit={(newTitle, newContent) => {
        editBlogPost(id, newTitle, newContent, () => navigation.pop())
    }
    }/>
    // pop function in the navigation prop allows us to navigate back to the previous screen. Again we want to pass the navigation argument into context to avoid loading issues during navigation
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1, 
        borderColor: 'black', 
        marginBottom: 15, 
        padding: 5, 
        margin: 5
    },
    label: {
        fontSize: 20, 
        marginBottom: 5, 
        margin: 5
    }
})

export default EditScreen