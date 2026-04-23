import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Catalog from './pages/Catalog';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Proyek from './pages/Proyek';
import RABRealisasi from './pages/RABRealisasi';
import Pengeluaran from './pages/Pengeluaran';
import Invoice from './pages/Invoice';
import Vendor from './pages/Vendor';
import TenagaKerja from './pages/TenagaKerja';

function SiiKontraktor() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <Layout sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)}>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"    element={<Dashboard />} />
        <Route path="proyek"       element={<Proyek />} />
        <Route path="rab"          element={<RABRealisasi />} />
        <Route path="pengeluaran"  element={<Pengeluaran />} />
        <Route path="invoice"      element={<Invoice />} />
        <Route path="vendor"       element={<Vendor />} />
        <Route path="tenagakerja"  element={<TenagaKerja />} />
        <Route path="*"            element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/"                    element={<Catalog />} />
          <Route path="/sii-kontraktor/*"    element={<SiiKontraktor />} />
          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
