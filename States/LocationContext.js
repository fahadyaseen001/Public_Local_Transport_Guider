import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [locationCoords, setLocationCoords] = useState(null);

  const value = {
    locationCoords,
    setLocationCoords
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
