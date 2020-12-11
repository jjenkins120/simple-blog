import React, { useContext, useEffect } from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native'
import { Context } from '../context/BlogContext'
//this will import the props Context from the BlogContext, useContext will let us be able to use the props in a meaningful way
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context)
    //this assigns the value state prop to a variable   

    useEffect (() => {
        getBlogPosts()

        navigation.addListener('didFocus', () => {
            getBlogPosts()
        })

        return () => {
            listener.remove()
        }

    }, []) 
    //the navigation callback function essentially means that anytime we return to this screen, do another fetch request
    //if you add state in the second argument, it will keep rerendering and break
    //listener.remove is best practice

    return (
        <View>
            <FlatList 
                data={state}
                keyExtractor={blogPost => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            {/* navigate can take two arguments*/}
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

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" style={styles.headerIcon}/>
          </TouchableOpacity>
        ),
    };
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
    },
    headerIcon: {
        marginRight: 20, 
        fontSize: 30
    }
})

export default IndexScreen