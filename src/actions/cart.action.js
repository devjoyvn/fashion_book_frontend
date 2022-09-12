import {cartTypes } from '../constants/action.types'
import axios from 'axios'
import storeConfig from '../config/storage.config'
export const setCart = (data) => ({
    type: cartTypes.SET_CART,
    data
})
export const getCart = () => async (dispatch, getState) => {
    let cart = null
    cart = storeConfig.getCart()
    if(cart !== null) {
        dispatch(setCart(cart))
        return
    }
    if(storeConfig.getUser() === null)
        return
    let id_user = storeConfig.getUser().id
    try{
         cart = await axios.get('http://localhost:8080/cart/' + id_user)
    }
    catch(err) {
        console.log(err)
        return
    }
    if(cart.data.data !== null) {
        dispatch(setCart(cart.data.data.products))
    }
    
}
export const updateProductInCart = (product) => async (dispatch, getState) => {
    if (!getState().userReducers.login.islogin) {
        storeConfig.updateProductInCart(product)
    }
    else {
        try {
            await axios.post('http://localhost:8080/cart/update', {
                id_user: storeConfig.getUser().id,
                product: product
            })
        }
        catch(err) {
            console.log(err.response)
        }
    }
    dispatch(getCart())
}
export const deteleProductInCart = (id_product) => async(dispatch, getState) => {
    if (!getState().userReducers.login.islogin) {
        storeConfig.deteleProductInCart(id_product)
    } else {
        try {
            await axios.post('http://localhost:8080/cart/delete', {
                id_user: storeConfig.getUser().id,
                id_product: id_product
            })
        }
        catch(err) {
            console.log(err.response)
        }
    }
    dispatch(getCart())
}
export const setCity = (data) => ({
    type: cartTypes.SET_CITY,
    data
})
export const setDistrict = (data) => ({
    type: cartTypes.SET_DICTRICT,
    data
})
export const setWard = (data) => ({
    type: cartTypes.SET_WARD,
    data
})
export const getCity = () => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.get('http://localhost:8080/address/city/all')
    }
    catch(err) {
        console.log(err)
    }  
    dispatch(setCity(res.data.data))
}
export const getDistrict = (code) => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.get('http://localhost:8080/address/city/district/' + code)
    }
    catch(err) {
        console.log(err)
    }  
    dispatch(setDistrict(res.data.data))
}
export const getWard = (codecity, codedistrict) => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.post('http://localhost:8080/address/city/district/ward', {
            codecity: codecity,
            codedistrict: codedistrict
        })
    }
    catch(err) {
        console.log(err)
    }  
    dispatch(setWard(res.data.data))
}
export const paymentSuccess = () => ({
    type: cartTypes.PAYMENT_SUCCESS
})
export const paymentFail = () => ({
    type: cartTypes.PAYMENT_FAIL
})
export const resetPayment = () => ({
    type: cartTypes.RESET_PAYMENT
})
export const payment = (city, district, ward, address, phone, name) => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.post('http://localhost:8080/bill/add', {
            id_user: storeConfig.getUser().id,
            city: city,
            district: district,
            ward: ward,
            address: address,
            phone: phone,
            name: name,
            email: storeConfig.getUser().email
        })
    }
    catch(err) { 
        dispatch(paymentFail())
        console.log(err.response)
        dispatch(resetPayment())
        return
    }
    dispatch(paymentSuccess())
    dispatch(resetPayment())
    dispatch(getCart())
}