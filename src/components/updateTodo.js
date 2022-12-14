import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const UpdateData = (props) => {
    // console.log("PROPSSSS", props.list.heading)
    const [showModal, setShowModal] = useState(false)
    const [addTask, setAddTask] = useState(props.list.heading)

    const updateData = async (id) => {
        const todoRef = firestore().collection('Todo').doc(id);
        const data = {
            heading: addTask,
        };
        todoRef.update(data).then(() => {
            setAddTask('');
        }).catch((error) => {
            console.log("ADD DATA ERROR UPDATE", error)
        })


    }

    return (
        <View style={{ marginTop: 40, flex: 1, alignItems: "center" }}>
            <TouchableOpacity
                style={{
                    backgroundColor: "white", marginTop: -30,
                    marginLeft: 35, marginRight: 35, height: 25,
                    width: 160, borderRadius: 10
                }}
                onPress={() =>
                    setShowModal(true)}
            >
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "700" }}>Update </Text>
            </TouchableOpacity>
            <Modal visible={showModal} transparent={true}>
                <ScrollView>
                    <View style={{ backgroundColor: "#000000aa", height: 300, marginTop: 300 }}>
                        <View style={{ margin: 5, backgroundColor: "#ffffff", flex: 1, borderRadius: 8, padding: 50 }}>
                            <Text style={{ marginTop: -40, fontWeight: '600' }}>  Name:</Text>
                            <TextInput
                                placeholder='Enter Name'
                                style={{
                                    borderColor: 'black', borderWidth: 1, height: 40,
                                    marginTop: 5, borderRadius: 10
                                }}
                                value={addTask}
                                onChangeText={(text) => setAddTask(text)}
                            />
                            <TouchableOpacity style={{
                                alignItems: 'center', marginTop: 20,
                                backgroundColor: "#00A86B", borderRadius: 10,
                                width: "40%", marginLeft: 75
                            }}
                                onPress={() => {
                                    setShowModal(false)
                                    updateData(props.list.todoId)
                                }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>update  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default UpdateData