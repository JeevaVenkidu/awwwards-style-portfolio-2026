/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const SmoothScrollContext = createContext({
  lenis: null,
  setLenis: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);

  return (
    <SmoothScrollContext.Provider value={{ lenis, setLenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
