import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import BautismosPage from './components/bautismos/BautismosPage';
import ComunionesPage from './components/comuniones/ComunionesPage';
import ConfirmacionesPage from './components/confirmaciones/ConfirmacionesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 print:bg-white flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bautismos" element={<BautismosPage />} />
            <Route path="/comuniones" element={<ComunionesPage />} />
            <Route path="/confirmaciones" element={<ConfirmacionesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;