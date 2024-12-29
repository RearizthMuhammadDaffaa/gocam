import { useContext } from "react";
import {StoredContext} from "../context/StoredContext"

const useAuth = () => {
    return useContext(StoredContext);
}

export default useAuth;