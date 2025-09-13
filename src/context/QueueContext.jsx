import { createContext, useContext } from "react";

const QueueContext = createContext();

export function QueueProvider({ children }) {


  const exports = {
  };

  return (
    <QueueContext.Provider value={exports}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);

  if (!context)
    throw new Error("useQueue must be used within QueueContext");

  return context;
}
