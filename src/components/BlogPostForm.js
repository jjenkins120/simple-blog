import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title)
    const [content, setContent] = useState(initialValues.content)

    return (
        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput value={title} onChangeText={text => setTitle(text)} style={styles.input}/>
            <Text style={styles.label}>Enter Content:</Text>
            <TextInput value={content} onChangeText={text => setContent(text)} style={styles.input}/>
            <Button 
                title='Save Blog Post' 
                onPress={() => onSubmit(title, content)}
                //the callback function for navigation is entered as a third argument. This is best practice when working with an API because we don't want to navigate back to the index screen until the fetch promise is made without error 
                />
        </View>
    )
}

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
}
//object to be used to fill in default props for an object in case we need blank values (like for the create screen) - defaultProps is a function that comes with react

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

export default BlogPostForm