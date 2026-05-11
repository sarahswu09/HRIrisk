import { Route, Routes } from 'react-router-dom';
import Calculator from './pages/Calculator';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
    </Routes>
  );
}
