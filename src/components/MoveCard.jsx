import { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/MoveCard.css";

const MoveCard = (props) => {
  const context = useAppContext();
  // selected list
  const [targetListId, setTargetListId] = useState(props.idList);

  useEffect(() => {
  }, []);

  // 'Move' btn gives new position value and requests update
  const handleSubmit = async () => {
    try {
      // request
      const list = context.lists.filter(list => list.id === targetListId);
      if (list.length === 0) {
        return;
      }
      const resp = await cardsAPI.updateCard(
        {
          'id': props.card.id,
          'name': props.card.name,
          'body': props.card.body,
          'groupDto': {
            'id': list[0].id,
            'name': list[0].name,
            'description': list[0].description            
          }
        }
      );
      // recreate cards array and replace modified card
      const newCards = context.cards.map((card) =>
        card.id === resp.id ? resp : card
      );
      // update cards in List component
      context.setCards(newCards);
    } catch (error) {
      console.log(error.message);
      alert("Unable to update card");
    }
    props.setMoveCard(false);
    props.setCardEdit(false);
  };

  return (
    <div className="move-card">
      <div className="move-card__title-bar">
        <div>Move card</div>
        <i
          className="fa-regular fa-plus move-card__close-btn"
          onClick={() => props.setMoveCard(false)}
        ></i>
      </div>
      {/* board's lists drop-down menu */}
      <div className="move-card__select-section">
        <div className="move-card__select">
          <label htmlFor="list-select">List</label>
          <select
            id="list-select"
            className="move-card__select-list"
            name="list"
            defaultValue={props.idList}
            onChange={(e) => setTargetListId(e.target.value)}
          >
            {context.lists.filter(list => list.idBoard === props.idBoard).map((list, i) => (
              <option value={list.id} key={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>

      </div>
      {/* 'Move' btn */}
      <div className="move-card__btn-section">
        <button
          type="submit"
          className="create-card__add-btn"
          onClick={handleSubmit}
        >
          Move
        </button>
      </div>
    </div>
  );
};

export default MoveCard;
