import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './layouts/common/login/Login'
import Register from './layouts/common/register/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
