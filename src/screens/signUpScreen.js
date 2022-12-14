import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import screenNames from '../helpers/screenNames'
import { SignUpUser } from '../firebase/signUpUser';
import Icon from 'react-native-vector-icons/AntDesign';
import { showToast, validateUserEmail } from '../helpers/utils'
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({ navigation }) => {
    const [Password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [Email, setEmail] = useState('')

    const signUpMailAndPassword = async () => {
        await SignUpUser(Email, Password)
            .then(async (user) => {
                console.log("user.user.uid", user.user.uid)
                console.log('User account created & signed in!');
                alert("Account created successfully.")
                navigation.navigate(screenNames.Login)
                addUser(user.user.uid)
            })

            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    showToast('That email address is already in use!')
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                if (error.code === 'auth/network-request-failed') {
                    showToast('Network Error')
                }
            });
    }

    const btnActionSignUp = () => {
        if (Email === '') {
            showToast('Email is required!')
        }
        else if (!validateUserEmail(Email)) {
            showToast('Enter Valid Email!')
        }

        else if (Password === '') {
            showToast('Password is required!')
        }
        else if (Password.length < 8) {
            showToast('Password should be at least 8 characters ')
        }
        else if (confirmPassword === '') {
            showToast('Confirm Password is required!')
        }
        else if (confirmPassword !== Password) {
            showToast('Password does not Matched!')
        }
        else {
            signUpMailAndPassword()
        }

        // navigation.navigate(Screeenames.AfterSignupScreen) 
    }

    async function addUser(id) {
        const todoRef = await firestore().collection('UserInfo').doc();
        todoRef.set({
            UserEmail: Email,
            UserPassword: Password,
            UserId: id,
        })
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#eee', }}>
            <ScrollView>
                <View>

                    <View style={{ flex: 1, marginTop: 250, }}>

                        <TextInput
                            placeholder='Email Address'
                            value={Email}
                            style={{ width: '98%', borderWidth: 1, borderRadius: 10, marginTop: 10, paddingStart: 20 }}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType='email-address'
                        />
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true}
                            value={Password}
                            style={{ width: '98%', borderWidth: 1, borderRadius: 10, marginTop: 10, paddingStart: 20 }}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                            value={confirmPassword}
                            style={{ width: '98%', borderWidth: 1, borderRadius: 10, marginTop: 10, paddingStart: 20 }}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                    </View>
                    <View style={{ flex: 1, marginTop: 10, }}>
                        <TouchableOpacity
                            style={{ width: '90%', borderWidth: 1, borderRadius: 10, marginTop: 10, paddingStart: 20, backgroundColor: 'black', marginLeft: 15, height: 40, }}
                            onPress={() => {
                                btnActionSignUp()
                            }}
                        >
                            <Text style={{ textAlign: 'center', padding: 8, color: 'white', fontWeight: 'bold', marginRight: 17 }} >Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ textAlign: 'center', padding: 5, fontWeight: '600' }}>Already Have an account?</Text>
                        <TouchableOpacity
                            style={{ width: '40%', paddingStart: 6, marginLeft: 100, }}
                            onPress={() => {
                                navigation.navigate(screenNames.Login)
                            }} >
                            <Text style={{ textAlign: 'center', padding: 5, color: 'black', fontWeight: 'bold', fontSize: 20, textDecorationLine: 'underline' }} >SignIn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default SignUpScreen;