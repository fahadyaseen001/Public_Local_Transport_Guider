// DestinationContext.js
import React, { createContext, useState, useContext } from 'react';

const DestinationContext = createContext();

export const useDestination = () => useContext(DestinationContext);

export const DestinationProvider = ({ children }) => {
  const [toAddress, setToAddress] = useState('');

  const value = {
    toAddress,
    setToAddress
  };

  return (
    <DestinationContext.Provider value={value}>
      {children}
    </DestinationContext.Provider>
  );
};
