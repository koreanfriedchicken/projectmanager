import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

import './Navbar.css'

const Navbar = ({ setSearch }) => {

  const { user } = useAuthContext()
  const { logout } = useLogout()

  const date = new Date
  const d = date.toDateString()

  return (
    <div className='navbar'>
        {user && 
          <div className='navbar_top'>
            <div className='navbar_left'>
              <div>My Projects</div>
              <input onChange={(e) => setSearch(e.target.value)}></input>
            </div>
            <div className='navbar_right'>
              <div className='navbar_user'>Welcome {user.displayName},</div>
              <div className='navbar_date'>Today is {d}</div>

                <button className='navbar_signout' onClick={logout}>Sign Out</button>
              </div>
          </div>
        }
    </div>
  )
}

export default Navbar