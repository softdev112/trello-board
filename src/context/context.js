import { createContext, useContext, useState } from "react";
// import cardsAPI from "../services/cardsAPI";

export const AppContext = createContext();

const BOARD = "9206728921179140002";
const AccessToken = "a4468a4d-85ae-432d-b552-7dfd9d40ac67";

export function AppWrapper({ children }) {
    const [keys, setKeys] = useState({
        token: AccessToken
    });
    const [board, setBoard] = useState(BOARD);
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState([]);
   
    return (
        <AppContext.Provider value={{   keys, setKeys,
                                        board, setBoard,
                                        lists, setLists,
                                        cards, setCards,
                                    }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
