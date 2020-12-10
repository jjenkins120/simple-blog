import React, { useContext, useState } from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import { Context } from '../context/BlogContext'

const EditScreen = ({ navigation }) => {
    //ORDER OF THE CONST VARIABLES MATTER - VARIABLES NEED TO BE DEFINED BEFORE THEY CAN BE IMPLEMENTED -otherwise the hooks below wont work
    const { state } = useContext(Context)
    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'))
    
    const [title, setTitle] = useState(blogPost.title)
    const [content, setContent] = useState(blogPost.content)
    // const { editBlogPost } = useContext(Context)

    return (
        <View>
            <Text>Edit Screen - {navigation.getParam('id')}</Text>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput value={title} onChangeText={text => setTitle(text)} style={styles.input}/>
            <Text style={styles.label}>Enter Content:</Text>
            <TextInput value={content} onChangeText={text => setContent(text)} style={styles.input}/>
            {/* <Button 
                title='Add Blog Post' 
                onPress={() => {
                    addBlogPost(title, content, () => {
                        navigation.navigate('Index')
                    }) 
                }} 
                /> */}
               
                
        </View>
    )
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