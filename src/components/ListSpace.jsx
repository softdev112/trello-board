import { ItemTypes } from "../utils/ItemTypes";
import { useDrop } from "react-dnd";
import { useAppContext } from "../context/context";
import SingleList from "./SingleList";

const ListSpace = props => {
    const context = useAppContext();

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.LIST,
        drop: async (item) => {},
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [context.lists]);

    return (
        <div ref={drop}>
            <SingleList list={props.list}></SingleList>
        </div>
    );
}

export default ListSpace;