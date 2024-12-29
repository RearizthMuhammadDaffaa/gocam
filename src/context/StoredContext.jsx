import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import Cookies from "js-cookie";
export const StoredContext = createContext(null);

 const StoreContextProvider = (props) => {
  const [auth, setAuth] = useState(() => {
    try {
        const storedAuth = Cookies.get("authuserrental"); // Ambil data auth dari cookie
        return storedAuth ? JSON.parse(storedAuth) : { roles: [], user: null };
    } catch (e) {
        console.error("Error accessing cookies:", e);
        return { roles: [], user: null };
    }
});

useEffect(() => {
        
  try {
      if (auth && Object.keys(auth).length > 0) {
          // Set auth data ke cookie
          Cookies.set("authuserrental", JSON.stringify(auth), { expires: 7 }); // Cookie akan kadaluarsa dalam 7 hari
      } else {
          // Hapus cookie jika auth kosong
          Cookies.remove("authuserrental");
      }
  } catch (e) {
      console.error("Error setting cookies:", e);
  }
}, [auth]);

  const contextValue = {
    food_list,
    auth,
    setAuth
  }
  return (
    <StoredContext.Provider value={contextValue}>
      {props.children}
    </StoredContext.Provider>
  )
}

export default StoreContextProvider;