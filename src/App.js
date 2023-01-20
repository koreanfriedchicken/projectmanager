import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='dashboard'>
          <Routes>
            <Route to='/' element={<Home />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
