import React, { useContext } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Context } from '../context/BlogContext'
import { EvilIcons } from '@expo/vector-icons'

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context)

    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'))
    //in order to access the id from above, we have to use the navigation prop and call getParam. State is being passed down via context 

    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    )
}

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
            {/* the second argument on navigate is the id we want to pass down to the edit page (as it was passed down to the ShowScreen) so that we can identify the proper blog to edit */}
            <EvilIcons name="pencil" style={styles.icon} />
        </TouchableOpacity>
        ),
    };
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 35,
        marginRight: 20
    }
})

export default ShowScreen