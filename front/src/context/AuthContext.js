import { CircularProgress } from '@material-ui/core';
import { Ax } from '../services';
import React, { useContext, useState, useEffect } from 'react'
import fire from '../config/fire'
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(true);
    async function signUp ({email, password, firstName, lastName ,countryId, cityId,}){
        const user = await fire.auth().createUserWithEmailAndPassword(email, password);
        const token = await fire.auth().currentUser.getIdToken();
        const userModel = {
            firstName,
            lastName,
            email,
            uuid: user.user.uid,
            countryId,
            cityId,
        }
        const headers = {
            authorization: `Bearer ${token}`
        }
        const completeRegis = await Ax.post('users',userModel, {
            headers
        })
        setCurrentUser({...user.user, userM: userModel});
    }
    async function logIn (email,pass){
        const user = await fire.auth().signInWithEmailAndPassword(email, pass);
        const token = await fire.auth().currentUser?.getIdToken();
        const headers = {
            authorization: `Bearer ${token}`
        }
        const userMongoData = await Ax.get(`users/${user.uid}`,{
            headers
        });
        const userM = userMongoData.data;
        const userr = user.user;
        setCurrentUser({...userr, userM})
    }
    function logOut (){
        return fire.auth().signOut();
    }
    const value = {
        currentUser,
        logIn,
        logOut,
        signUp
    }

    useEffect(()=>{
        const unsuscribe = fire.auth().onAuthStateChanged(async (user)=>{
            let userT = user;
            if(user){
                const token = await fire.auth().currentUser?.getIdToken();
                const headers = {
                    authorization: `Bearer ${token}`
                }
                const userMongoData = await Ax.get(`users/${user.uid}`,{
                    headers
                });
                const userM = userMongoData.data;
                userT = { ...user, userM }
            }
            setCurrentUser(userT);
            setLoading(false);
    
        })
    
        return unsuscribe
    },[])
    return (
        <AuthContext.Provider value={value}>
        {
            loading ? (
                <div style={{height:"100vh"}} className="d-flex justify-content-center align-items-center">
                <CircularProgress />
                </div>
            ) : children
        }    
        </AuthContext.Provider>
    )
}
