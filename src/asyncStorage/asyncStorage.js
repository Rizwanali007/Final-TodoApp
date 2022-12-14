import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const SetToken = async (Token) => {
    try {
        console.log("SET TOKEN", Token)
        await AsyncStorage.setItem("@Token", JSON.stringify(Token))

    } catch (error) {
        console.log('error', error)

    }
}
export const emptyToken = async () => {
    try {
        console.log("Empty TOKEN")
        await AsyncStorage.setItem("@Token", "")

    } catch (error) {
        console.log('error', error)

    }
}
export const GetToken = async () => {
    try {
        var data = await AsyncStorage.getItem("@Token")
        data = JSON.parse(data)
        // console.log("Get TOKEN", data)
        return data
    } catch (error) {
        console.log('ERRor', error)

    }
}
export const removeData = async () => {
    try {
        const savedUser = await AsyncStorage.clear();
        console.log("savedUSer", savedUser)
    } catch (error) {
        console.log(error);
    }
};
