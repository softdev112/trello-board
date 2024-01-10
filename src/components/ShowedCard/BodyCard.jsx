import { useState } from 'react'
import { useAppContext } from "../../context/context";
import cardsAPI from "../../services/cardsAPI";
import "../../assets/css/Card/BodyCard.css";

const BodyCard = (props) => {
    const context = useAppContext();
    const [description, setDescription] = useState(props.payload.body)
    const [toggleEditDescription, setToggleEditDescription] = useState(false)


    const updateDescription = async () => {
        try {
            const resp = await cardsAPI.updateCard(
                {
                    "id": props.payload.id,
                    "name": props.payload.name,
                    "body": description,
                    "groupDto": props.payload.groupDto
                }
            );
            context.setCards(context.cards.map(card => card.id === props.payload.id ? resp : card))
            props.setCurrentCard(resp)
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to change description.");
            // reset Description if delete is fail
            setDescription(props.payload.body)
        }
        setToggleEditDescription(false)
    }



    return (
        <>
            <div className="card__section">
                <div className='card__section__headtitle'>
                    <div className='card__section__headtitle--maintitle'>
                        <i className="fa-solid fa-bars fa-lg" ></i>
                        <h3 className='card__section__headtitle--title'>
                            Body
                        </h3>
                    </div>
                    {/* Button change to text area and reset value of Desc when close with itself */}
                    <button type="button" className="card__section__headtitle--button options--button"
                        onClick={() => { 
                            setToggleEditDescription(!toggleEditDescription);
                            setDescription(props.payload.body) }}>
                        {toggleEditDescription ? "Cancel" : props.payload.body ? "Edit" : "New"}
                    </button>
                </div>

                {toggleEditDescription ?
                    <>
                        <div className="body__input--background" onClick={() => { setToggleEditDescription(false); setDescription(props.payload.body) }}>
                        </div>
                        < div className='body__input--main'>
                            <textarea className="card__options--textarea" autoFocus
                                value={description} 
                                onChange={event => setDescription(event.target.value)}>
                            </textarea>
                            <button
                                className=" card__section__desc--button options--button"
                                onClick={updateDescription}
                            >
                                Save
                            </button>
                        </div>
                    </>
                    : <p className="card__section--desc">{description}</p>}
            </div>
        </>
    )
}
export default BodyCard