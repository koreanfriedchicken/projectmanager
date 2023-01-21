import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='dashboard'>
          <Sidebar />
          <div className='dashboard_content'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='signup' element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
