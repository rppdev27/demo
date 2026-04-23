import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ currentPage, onNavigate, sidebarOpen, onToggle, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} isOpen={sidebarOpen} onToggle={onToggle} />
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <Header currentPage={currentPage} onToggle={onToggle} />
        <main className="p-4 lg:p-6 min-h-[calc(100vh-64px)]">{children}</main>
      </div>
    </div>
  );
}
