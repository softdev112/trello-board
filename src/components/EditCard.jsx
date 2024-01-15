import { useAppContext } from "../context/context";
import { useRef, useState } from "react";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/EditCard.css";
import MoveCard from "./MoveCard";

const EditCard = (props) => {
  const context = useAppContext();
  const textarea = useRef();
  const [moveCard, setMoveCard] = useState(false);

  // card title change function
  const updateCard = async () => {
    try {
      const cards = context.cards.filter(card => card.id === props.id);
      if (cards.length === 0 ) {
          return;
      }
      const lists = context.lists.filter(list => list.id === props.idList);
      if (lists.length === 0 ) {
          return;
      }
      const resp = await cardsAPI.updateCard(
        {        
          "id": cards[0].id,
          "name": textarea.current.value,
          "body": cards[0].description,
          "groupDto": {
            "id": lists[0].id,
            "name": lists[0].id.name,
            "description": lists[0].id.description
          }
        }
      );
    const newCards = context.cards.map((card) =>
      card.id === resp.id ? resp : card
    );
    // update cards in List component
    context.setCards(newCards);
  } catch (error) {
      console.log(error.message);
      alert("Unable to update card");
  }
    // toggle card edit mode
    props.setCardEdit(false);
  };

  // card delete function
  const deleteCard = async () => {
    const confirmation = window.confirm("This action will delete this card. Are you sure?");
    if (confirmation) {
      try {
        const cards = context.cards.filter(card => card.id === props.id);
        if (cards.length === 0 ) {
            return;
        }
        const lists = context.lists.filter(list => list.id === props.idList);
        if (lists.length === 0 ) {
            return;
        }
        const resp = await cardsAPI.deleteCard(
          {
            "id": cards[0].id,
            "name": cards[0].name,
            "body": cards[0].description,
            "groupDto": {
              "id": lists[0].id,
              "name": lists[0].id.name,
              "description": lists[0].id.description
            }
          }
        );
          // copy listCards and remove deleted card
          const newListCards = context.cards.filter(
            (card) => card.id !== props.id
          );
          // update cards in List component
          context.setCards(newListCards);
      } catch (error) {
        console.log(error.message);
        alert("Unable to delete card");
      }
      }            

  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      props.setCardEdit(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      updateCard();
    }
  };

  return (
    <>
      {/* modal background. if clicked -> toggle edit mode off */}
      <div
        className="cards__modal-bkground"
        onClick={() => props.setCardEdit(false)}
      ></div>
      {/* close button */}
      <i
        className="fa-solid fa-plus cards__edit-close-btn"
        onClick={() => props.setCardEdit(false)}
      ></i>
      {/* wrapper */}
      <div className="cards__card" key={props.id}>
        <div className="cards__edit">
          {/* title input */}
          <textarea
            className="cards__name cards__name--edit"
            defaultValue={props.name}
            ref={textarea}
            onKeyDown={(e) => handleKeyPress(e)}
            // Focus on load and select all text
            autoFocus
            onFocus={(e) => e.target.select()}
          />
          {/* update card title button */}
          <button
            className="cards__edit-save-btn create-card__add-btn"
            onClick={updateCard}
          >
            Save
          </button>
          {/* actions sidebar */}
          <div className="cards__edit-sidebar">
            <button className="cards__edit-action-btn" onClick={deleteCard}>
              <i className="fa-solid fa-trash"></i> Delete
            </button>
            <button
              className="cards__edit-action-btn"
              onClick={() => setMoveCard(true)}
            >
              <i className="fa-solid fa-arrow-right"></i> Move
            </button>
            {moveCard && (
              <MoveCard
                id={props.id}
                idList={props.idList}
                setMoveCard={setMoveCard}
                setCardEdit={props.setCardEdit}
                idBoard={props.idBoard}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCard;
