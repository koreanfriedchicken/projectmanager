import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

import { doc, setDoc } from 'firebase/firestore'


function useSignUp() {
    const [error, setError] = useState(null)

    const { dispatch } = useAuthContext()

    async function signup (email, password, displayName){
        setError(null)
        const res = await createUserWithEmailAndPassword(auth, email, password)
        
        if(!res){
            throw new Error('Sign up error')
        }

        await updateProfile(res.user, {displayName})

        await setDoc(doc(db, 'users', res.user.uid), {name:res.user.displayName})

        dispatch({ type: 'LOGIN', payload: res.user})
    }
    return{error, signup}
}

export default useSignUp