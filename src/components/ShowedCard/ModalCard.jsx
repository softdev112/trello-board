import AsideCard from "./AsideCard";
import BodyCard from "./BodyCard";
import { useState, useEffect } from 'react'
import "../../assets/css/Card/ModalCard.css";

const ModalCard = (props) => {
    const [comments, setComments] = useState([])
    const [checkList, setCheckList] = useState([])
    useEffect(() => {
    }, [])


    return (
        <>
            <div className="card--background">
                <div className="card__total">
                    <div className="card__head" >
                        {props.currentCard.closed===true ?
                            <>
                                <div className="card__head--archive card__head__title card__head--archivebackground">  
                                    <i className="fa-sharp fa-solid fa-computer fa-xl"></i>
                                    <h2 className="card__head__title--title">
                                        This Card is archived
                                    </h2>
                                </div>
                                <div className="card__head--X" onClick={() => props.setCurrentCard(null)}>
                                        <i className="fa-solid fa-xmark fa-xl"></i>
                                </div>
                            </>
                            :<>
                            <div className="card__head card__head__title">
                                <i className="fa-sharp fa-solid fa-computer fa-xl"></i>
                                <h2 className="card__head__title--title">
                                    {props.currentCard.name}
                                </h2>
                            </div>
                                <div className="card__head--X" onClick={() => props.setCurrentCard(null)}>
                                    <i className="fa-solid fa-xmark fa-xl"></i>
                            </div></>
                        }
                    </div>
                    <div className="card__main">
                        <div className="card__body">
                            <BodyCard 
                                payload={props.currentCard} 
                                comments={comments} 
                                checkList={checkList}
                                setComments={setComments} 
                                setCheckList={setCheckList}
                                setCurrentCard={props.setCurrentCard} />
                        </div>
                        <div className="card__aside">
                            <AsideCard payload={props.currentCard} 
                                setCheckList={setCheckList} 
                                checkList={checkList} 
                                setCurrentCard={props.setCurrentCard}
                               />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )




}
export default ModalCard