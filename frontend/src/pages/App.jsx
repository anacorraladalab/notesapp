import 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import AddPage from './AddPage';
import DetailPage from './DetailPage';
import '../styles/app.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddPage />} />
      <Route path='/note/:id' element={<DetailPage />} />
      <Route path='*' element={<p>Not found</p>} />
    </Routes>
  )
}

export default App
