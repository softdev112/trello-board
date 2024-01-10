import { useAppContext } from "../context/context";
import Lists from "./Lists";
import "../assets/css/UserBoards.css";

const Board = props => {
    const context = useAppContext();

    
    return (
        <>
            <div className="header">
                <div className="boards">
                    <h1 className="boards__title">Board</h1>
                    <div
                        className="boards__link"
                        key={"board"}
                    >
                        My Board {context.board}
                    </div>
                </div>
            </div>
            <Lists />
        </>
    );
};

export default Board;
