import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import "../assets/css/ListMenu.css"

const ListMenu = props => {
    const context = useAppContext();
    const menuRef = useRef();
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                document.removeEventListener("mousedown", handleClickOutside);
                setToggleMenu(false);
            }
        }
        if (toggleMenu)
            document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuRef, toggleMenu]);

    const deleteList = async () => {

        const filteredCards = context.cards
        .filter((card) => {
          return card.groupDto !== null && props.listId === card.groupDto.id;
        });
        
        if (filteredCards.length > 0) {
            window.confirm("This action cannot be performed. In order to delete this group, please remove all cards for this group.");
        } else {
            const confirmation = window.confirm("This action will delete this group. Are you sure?");
            if (confirmation) {
                try {
                    const groups = context.lists.filter(list => list.id === props.listId);
                    if (groups.length === 0 ) {
                        return;
                    }        
                    await listsAPI.deleteList(groups[0]);
                    const newCards = context.cards.filter(card => card.groupDto.id !== props.listId);
                    const newLists = context.lists.filter(list => list.id !== props.listId);
                    context.setCards(newCards);
                    context.setLists(newLists);
                    setToggleMenu(!toggleMenu);
                }
                catch (error) {
                    console.log(error.message);
                    alert("Unable to archive this list");
                }
            }            
        }
    }

    return (
        <div className="lists__menu" ref={menuRef}>
            <button className="lists__menu-btn" onClick={() => 
                setToggleMenu(!toggleMenu)
            }>
                <i className="fa-solid fa-bars"></i>
            </button>
            {toggleMenu &&
                <div className="lists__menu-dropdown">
                    <div className="lists__menu-title">
                        <p>List actions</p>
                        <hr></hr>
                    </div>
                    <ul className="lists__menu-dropdown__options">
                        <li onClick={deleteList}>Delete all cards in this list...</li>
                        <li onClick={deleteList}>Delete this list</li>
                    </ul>
                </div>}
        </div>
    );
}

export default ListMenu;