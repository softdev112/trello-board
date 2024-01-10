import { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { useAppContext } from "../context/context";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import ListName from "./ListName";
import Cards from "./Cards";
import ModalCard from "./ShowedCard/ModalCard";
import CreateCard from "./CreateCard";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/Lists.css";

const SingleList = (props) => {
  const context = useAppContext();
  const ref = useRef();
  const [listCards, setListCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item) =>{
        return moveCard(item.card, props.list)},
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [context.cards, listCards]
  );
  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.LIST,
      item: {
        listId: props.list.id,
        pos: props.list.pos,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [context.lists]
  );
  drag(drop(ref));
  
  useEffect(() => {
    const filteredCards = context.cards
    .filter((card) => {
      return card.groupDto !== null && props.list.id === card.groupDto.id;
    });
    
    setListCards(filteredCards);
  }, [context.cards, props.list.id]);
  
  const moveCard = async (item, list) => {
    try {
      // request
      const resp = await cardsAPI.updateCard(
        {
          "id": item.id,
          "name": item.name,
          "body": item.body ?? '',
          "groupDto": {
            "id": list.id,
            "name": list.name,
            "description": list.description
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
  };

  return (
    <>
      <div ref={ref} className="lists__list">
        <ListName
          name={props.list.name}
          description={props.list.description}
          listId={props.list.id}
        />
        <Cards
          listCards={listCards}
          setListCards={setListCards}
          showCard={setCurrentCard}
          moveCard={moveCard}
        />
        {/* 'add card' button */}
        <CreateCard list={props.list} />
      </div>
      {currentCard ? (
        <ModalCard currentCard={currentCard} setCurrentCard={setCurrentCard} />
      ) : null}
    </>
  );
};

export default SingleList;
