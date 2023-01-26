import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'

import './SignIn.css'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { error, login } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }



  return (
    <div className='signin'>
            <form className='signin_form'>
                <div className='signin_header'>Sign In</div>
                <div className='signin_field'>
                    <input
                        placeholder=' '
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label htmlFor='email'>Email</label>
                </div>
                <div className='signin_field'>
                    <input
                        placeholder=' '
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <label htmlFor='password'>Password</label>
                </div>
                {error && <p>{error}</p>}
                <button className='signin_submit' onClick={handleSubmit}>Submit</button>
            </form>

            <Link to='/signup' className='signin_alt'>No account? Sign up here</Link>
    </div>
  )
}


export default SignUp