import { useState } from 'react'
import { Link } from 'react-router-dom'

import useSignUp from '../hooks/useSignUp'

import './SignUp.css'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [validator, setValidator] = useState([false, false, false, false])
  const { error, signup } = useSignUp()

  const handlepassword = (input) => {

    setPassword(input)

    if(input.length > 4){
      validator[0] = true
      setValidator(validator)
    } else {
      validator[0] = false
      setValidator(validator)
    }

    if(input.search(/[A-Z]/) > -1){
      validator[1] = true
      setValidator(validator)
    } else {
      validator[1] = false
      setValidator(validator)
    }

    if(input.search(/[0-9]/) > -1){
      validator[2] = true
      setValidator(validator)
    } else {
      validator[2] = false
      setValidator(validator)
    }

    if(input.search(/[!@#$%^&*()]/) > -1){
      validator[3] = true
      setValidator(validator)
    } else {
      validator[3] = false
      setValidator(validator)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //check if password meets all requirements
    if(!validator.some((i) => i === false) && username){
        signup(email, password, username)
    }
  }

  return (
    <div className='signup'>
      <form className='signup_form' onSubmit={handleSubmit}>
        <div className='signup_header'>Sign Up</div>
        <div className='signup_field'>
            <input
                placeholder=' '
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label htmlFor='email'>Email</label>
        </div>
        <div className='signup_field'>
            <input
                placeholder=' '
                required
                type="password"
                onChange={(e) => handlepassword(e.target.value)}
                value={password}
            />
            <label htmlFor='password'>Password</label>
        </div>
        <div className='signup_bars'>
            <span className={validator.reduce((a, i) => a + i) > 0 ? 'show' : 'hidden'}/>
            <span className={validator.reduce((a, i) => a + i) > 1 ? 'show' : 'hidden'}></span>
            <span className={validator.reduce((a, i) => a + i) > 2 ? 'show' : 'hidden'}></span>
            <span className={validator.reduce((a, i) => a + i) > 3 ? 'show' : 'hidden'}></span>
        </div>
        <div className='signup_requirements'>
            <div className={validator[0] ? 'green' : 'grey'}> must be at least 5 characters</div>
            <div className={validator[1] ? 'green' : 'grey'}> must contain a capital letter</div>
            <div className={validator[2] ? 'green' : 'grey'}> must contain a number</div>
            <div className={validator[3] ? 'green' : 'grey'}> must contain a special character</div>
        </div>
        <div className='signup_field'>
            <input
                placeholder=' '
                required
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label htmlFor='text'>Username</label>
        </div>
        
        {error && <p>{error}</p>}
        <button className='submit' type='submit'>Submit</button>
      </form>
      <Link to='/signin' className='signin_alt'>Or sign in here instead</Link>
    </div>
  )
}

export default SignUp