import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilPage from "./pages/ProfilPage/ProfilPage";
import Loader from "./components/Loader/Loader";

export interface MetamaskContextType {
  account: string | null;
  contract: any; // Type of contract object is not defined yet
}

export const MetamaskContext = createContext<MetamaskContextType | null>(null);

function App(): JSX.Element {
  const [context, setContext] = useState<MetamaskContextType | null>(null);

  const initWeb3 = async (): Promise<void> => {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    setContext({
      account: accounts[0],
      contract: null,
    });
  };

  useEffect(() => {
    if (!context) {
      initWeb3().then(() => {
        console.log("Web3 initialized!");
      });
    }
  }, [context]);

  if (!context) {
    return <Loader />;
  }

  return (
    <MetamaskContext.Provider value={context}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Routes>
      </Router>
    </MetamaskContext.Provider>
  );
}

export default App;
