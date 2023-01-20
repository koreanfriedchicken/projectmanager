import { createContext, useEffect, useReducer } from "react";
import { auth, db } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null, icon: ''}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        case 'ICON':
            return {...state, icon: action.payload}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
        icon: ''
    })

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, user => {
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsub()

            if(user){
                const getUserIcon = async (id) => {
                    const docRef = doc(db, 'users', id) 
                    const docSnap = await getDoc(docRef)
        
                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        const i = data.icon
                        dispatch({ type: 'ICON', payload: i})
                    } else {
                        console.log("No such document!");
                    }
                }
                getUserIcon(user.uid)
            }

        })
    }, [])


    console.log('auth', state)
    

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}