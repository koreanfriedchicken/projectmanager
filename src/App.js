import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//styles
import './App.css'

//components
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

//pages
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Create from './pages/Create'

function App() {
  const {user, authIsReady} = useAuthContext()

  const [search, setSearch] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <div className='dashboard'>
          <Sidebar />
          <div className='dashboard_content'>
            <Navbar setSearch={setSearch}/>
            {authIsReady &&
            <Routes>
              <Route path='/' element={user ? <Home search={search}/> : <Navigate to='/signup' />} />
              <Route path='signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
              <Route path='signin' element={!user ? <SignIn /> : <Navigate to='/'/>} />
              <Route path='create' element={!user ? <SignUp /> : <Create />} />
            </Routes>
            }
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
