import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [showNewContact, setShowNewContact] = useState(false);
  const [showUpdateContact, setShowUpdateContact] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [seeContact, setSeeContact] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showNewUser, setShowNewUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [seeUser, setSeeUser] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        refresh, setRefresh,
        showNewContact,
        setShowNewContact,
        seeContact,
        setSeeContact,
        isOpenContact, setIsOpenContact,
        showUpdateContact, setShowUpdateContact,

        showNewUser,
        setShowNewUser,
        seeUser,
        setSeeUser,
        isOpenUser, setIsOpenUser,
        showUpdateUser, setShowUpdateUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  return context;
};

export default GlobalContext;
