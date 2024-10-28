// role-context.js
import { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [nasId, setNASID] = useState('');

  return (
    <Context.Provider value={{ role, setRole,nasId,setNASID }}>
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };