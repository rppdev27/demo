import { createContext, useContext, useState, useCallback } from 'react';
import { initialProjects,initialRABItems,initialExpenses,initialInvoices,initialVendors,initialWorkers } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [rabItems, setRabItems] = useState(initialRABItems);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [vendors, setVendors] = useState(initialVendors);
  const [workers, setWorkers] = useState(initialWorkers);
  const [currentUser] = useState({ nama:'Ahmad Fauzi', role:'Owner', avatar:'AF' });

  const mkId = (prefix, arr) => `${prefix}-${String(arr.length+1).padStart(3,'0')}`;

  const addProject = useCallback((d) => setProjects(p=>[...p,{...d,id:mkId('PRJ',p)}]),[]);
  const updateProject = useCallback((id,d) => setProjects(p=>p.map(x=>x.id===id?{...x,...d}:x)),[]);
  const deleteProject = useCallback((id) => setProjects(p=>p.filter(x=>x.id!==id)),[]);

  const addRABItem = useCallback((d) => setRabItems(p=>[...p,{...d,id:mkId('RAB',p)}]),[]);
  const updateRABItem = useCallback((id,d) => setRabItems(p=>p.map(x=>x.id===id?{...x,...d}:x)),[]);
  const deleteRABItem = useCallback((id) => setRabItems(p=>p.filter(x=>x.id!==id)),[]);

  const addExpense = useCallback((d) => setExpenses(p=>[...p,{...d,id:mkId('EXP',p)}]),[]);
  const updateExpense = useCallback((id,d) => setExpenses(p=>p.map(x=>x.id===id?{...x,...d}:x)),[]);
  const deleteExpense = useCallback((id) => setExpenses(p=>p.filter(x=>x.id!==id)),[]);

  const addInvoice = useCallback((d) => setInvoices(p=>[...p,{...d,id:`INV-2024-${String(p.length+1).padStart(3,'0')}`}]),[]);
  const updateInvoice = useCallback((id,d) => setInvoices(p=>p.map(x=>x.id===id?{...x,...d}:x)),[]);
  const deleteInvoice = useCallback((id) => setInvoices(p=>p.filter(x=>x.id!==id)),[]);

  const addVendor = useCallback((d) => setVendors(p=>[...p,{...d,id:mkId('VND',p)}]),[]);
  const updateVendor = useCallback((id,d) => setVendors(p=>p.map(x=>x.id===id?{...x,...d}:x)),[]);
  const deleteVendor = useCallback((id) => setVendors(p=>p.filter(x=>x.id!==id)),[]);

  const addWorker = useCallback((d) => setWorkers(p=>[...p,{...d,id:mkId('WRK',p)}]),[]);
  const updateWorker = useCallback((id,d) => setWorkers(p=>p.map(x=>x.id===id?{...x,...d}:x)),[]);
  const deleteWorker = useCallback((id) => setWorkers(p=>p.filter(x=>x.id!==id)),[]);

  return (
    <AppContext.Provider value={{
      currentUser, projects,addProject,updateProject,deleteProject,
      rabItems,addRABItem,updateRABItem,deleteRABItem,
      expenses,addExpense,updateExpense,deleteExpense,
      invoices,addInvoice,updateInvoice,deleteInvoice,
      vendors,addVendor,updateVendor,deleteVendor,
      workers,addWorker,updateWorker,deleteWorker,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
