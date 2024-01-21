import axios from 'axios';
import { CUSTOMERS_API } from '../../../Utilities/APIs';

const LOGIN_URL = CUSTOMERS_API + 'login'
const REGISTER_URL = CUSTOMERS_API + 'register'


// Register user

async function register(customerData) {

    const response = await axios.post(REGISTER_URL, customerData);

    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }

    return response.data

}

async function login(customerData) {

    const response = await axios.post(LOGIN_URL, customerData);

    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }

    return response.data

}

// Register user with facebook

async function registerWithFacebook(customerData) {

    const response = await axios.post(CUSTOMERS_API + "registerWithFacebook/", customerData)

    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }

    return response.data
}

async function loginWithFacebook(customerData) {

    const response = await axios.post(CUSTOMERS_API + "loginWithFaceBook/", customerData)

    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }

    return response.data
}
//google
async function registerWithGoogle(customerData) {

    const response = await axios.post(CUSTOMERS_API + "registerWithGoogle/", customerData)

    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }

    return response.data

}

async function loginWithGoogle(customerData) {

    const response = await axios.post(CUSTOMERS_API + "loginWithGoogle/", customerData)

    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }

    return response.data

}

async function addPhoneNumber(customerData) {

    const response = await axios.patch(CUSTOMERS_API + "addMobileNumber/", customerData)
    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('customer')
}

const authService = {
    register,
    logout,
    login,
    registerWithFacebook,
    loginWithFacebook,
    registerWithGoogle,
    loginWithGoogle,
    addPhoneNumber
}

export default authService;