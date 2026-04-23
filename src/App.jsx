import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Proyek from './pages/Proyek';
import RABRealisasi from './pages/RABRealisasi';
import Pengeluaran from './pages/Pengeluaran';
import Invoice from './pages/Invoice';
import Vendor from './pages/Vendor';
import TenagaKerja from './pages/TenagaKerja';

const pages = {
  dashboard: Dashboard,
  proyek: Proyek,
  rab: RABRealisasi,
  pengeluaran: Pengeluaran,
  invoice: Invoice,
  vendor: Vendor,
  tenagakerja: TenagaKerja,
};

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const Page = pages[currentPage] || Dashboard;

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={(page) => { setCurrentPage(page); if (window.innerWidth < 1024) setSidebarOpen(false); }}
      sidebarOpen={sidebarOpen}
      onToggle={() => setSidebarOpen(o => !o)}
    >
      <Page onNavigate={setCurrentPage} />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
