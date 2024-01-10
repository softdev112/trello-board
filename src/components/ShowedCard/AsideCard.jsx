import { useState } from "react"
import { useAppContext } from "../../context/context";
import MoveCard from "../MoveCard";
import WarningAdvise from "./WarningAdvise";
import "../../assets/css/Card/AsideCard.css";
import cardsAPI from "../../services/cardsAPI";

const AsideCard = (props) => {
    const context = useAppContext()
    const [toggleDelete, setToggleDelete] = useState(false)
    const [moveCard, setMoveCard] = useState(false)
    
    const deleteCard = async () => {
        const cards = context.cards.filter(card => card.id === props.payload.id);
        if (cards.length === 0 ) {
            return;
        }
        try {
            await cardsAPI.deleteCard(
                cards[0]          
            );
            context.setCards(context.cards.filter((card) => card.id !== props.payload.id));
            props.setCurrentCard(null)
        } catch (error) {
            console.log(error.message);
            alert("Unable to delete card");
        }
    };

    return (
        <>  
            {/* Delete */}
            {!toggleDelete ?
                <p className="card__aside card__aside__options card__aside__options--delete" onClick={() => setToggleDelete(true)} >
                    Delete</p> :
                <WarningAdvise
                    title={"Delete card? "}
                    text={"All actions will be removed from the activity feed and you won't be able to re-open the card. There is no undo."}
                    setToggle={setToggleDelete}
                    onClick={deleteCard}
                />
            }
            <div>
                <div className="card__aside card__aside__options" onClick={() => setMoveCard(true)}>
                    <i className="fa-solid fa-arrow-right fa-lg"></i>
                    <span className=" card__aside__options--title" >Move</span>
                </div>
                {moveCard &&
                    <MoveCard card={props.payload} 
                        setMoveCard={setMoveCard} 
                        setCardEdit={setMoveCard} 
                        idList={props.payload.groupDto.id} 
                        idBoard={props.payload.idBoard}/>
                }
            </div>
        </>
    )

}

export default AsideCard