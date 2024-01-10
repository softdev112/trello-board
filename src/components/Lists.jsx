import { useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import cardsAPI from "../services/cardsAPI";
import ListSpace from "./ListSpace";
import CreateList from "./CreateList";
import "../assets/css/Lists.css";

const Lists = (props) => {
    const context = useAppContext();

    // get lists.
    useEffect(() => {

        const getLists = async () => {
            try {
                const resp = await listsAPI.getLists();
                context.setLists([...context.lists, ...resp]);
            } catch (error) {
                console.log("Unable to retrieve lists");
            }
        }
        const getCards = async () => {
            try {
                const resp = await cardsAPI.getCards();
                context.setCards([...context.cards, ...resp]);
            } catch (error) {
                console.log("Unable to retrieve cards");
            }
        };
        getLists();
        getCards();
        
    }, [context]);

    return (
        <>
            <div className="lists">
                {/* list filter by current board */}
                {context.lists
                    .map(list =>
                        <ListSpace key={list.id} list={list} ></ListSpace>
                        )}
                <CreateList  />
            </div>
        </>
    );
};

export default Lists;