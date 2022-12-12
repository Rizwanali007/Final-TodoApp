import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import tempData from './tempData'
import firestore from '@react-native-firebase/firestore';
import { GetToken } from '../asyncStorage/asyncStorage';
import AntDesign from "react-native-vector-icons/AntDesign"

const AddListModal = (props) => {
    const backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"]
    const [name, setName] = useState('')
    const [color, setColor] = useState(backgroundColors[0])

    async function createTodo() {
        const list = { name, color }
        const todoRef = await firestore().collection('Todo').doc();
        const userUid = await GetToken()
        let UId = todoRef.id
        todoRef.set({
            heading: name,
            color: color,
            subTodos: [],
            todoId: UId,
            Userid: userUid
        })

        props.addList(list)

        // tempData.push({
        //     name,
        //     color,
        //     todos: []
        // })
        setName('')
        props.closeModal();
    }

    function renderColors() {
        return backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => setColor(color)}
                />
            )
        })
    }

    return (
        <View style={{ height: "90%" }}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }}
                    onPress={() => props.closeModal()}
                >
                    <AntDesign name="close" size={24} color={"#2D3436"} />
                </TouchableOpacity>
                <View style={{ alignSelf: "stretch", marginHorizontal: 3 }}>
                    <Text style={styles.title}>Create Todo List  </Text>
                    <TextInput style={styles.input} placeholder="List Name?"
                        onChangeText={(text) => setName(text)}
                    />
                    <View style={{
                        flexDirection: "row", justifyContent: "space-between",
                        marginTop: 12, marginHorizontal: 20
                    }}>
                        {renderColors()}
                    </View>
                    <TouchableOpacity style={[styles.create, { backgroundColor: color }]}
                        onPress={() => createTodo()}
                    >
                        <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Create </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default AddListModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "blue",
        alignSelf: "center",
        marginBottom: 18,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#24A6D9",
        marginLeft: 20,
        height: 50,
        width: "90%",
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginLeft: 20,
        marginTop: 44,
        height: 50,
        width: "90%",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
})