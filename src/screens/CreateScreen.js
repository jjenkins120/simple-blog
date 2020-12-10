import React, { useContext, useState } from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import { Context } from '../context/BlogContext'

const CreateScreen = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { addBlogPost } = useContext(Context)

    return (
        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput value={title} onChangeText={text => setTitle(text)} style={styles.input}/>
            <Text style={styles.label}>Enter Content:</Text>
            <TextInput value={content} onChangeText={text => setContent(text)} style={styles.input}/>
            <Button 
                title='Add Blog Post' 
                onPress={() => {
                    addBlogPost(title, content, () => {
                        navigation.navigate('Index')
                    }) 
                }}
                //the callback function for navigation is entered as a third argument. This is best practice when working with an API because we don't want to navigate back to the index screen until the fetch promise is made without error 
                />
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

export default CreateScreen