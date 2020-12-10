import React, { useContext } from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native'
import { Context } from '../context/BlogContext'
//this will import the props Context from the BlogContext, useContext will let us be able to use the props in a meaningful way
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, addBlogPost, deleteBlogPost } = useContext(Context)
    //this assigns the value state prop to a variable   

    return (
        <View>
            <Button title='Add Post' onPress={addBlogPost}/>
            <FlatList 
                data={state}
                keyExtractor={blogPost => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id) }>
                                    <Feather name="trash" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,  
        borderTopWidth: 1,  
        borderColor: 'black'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
})

export default IndexScreen