import Toast from 'react-native-simple-toast';
import { Dimensions } from 'react-native'

export const screenWidth = Math.round(Dimensions.get('window').width);
export function showToast(title) {
    Toast.show(title, Toast.LONG);
}
export const validateUserEmail = (text) => {

    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {

        return false;
    }
    else {
        return true;
    }
};