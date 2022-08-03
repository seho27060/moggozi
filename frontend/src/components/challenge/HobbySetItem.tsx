import { useDispatch } from "react-redux";
import { deleteHobby, Hobby } from "../../store/challenge";

const HobbySetItem: React.FC<{ hobby: Hobby }> = ({ hobby }) => {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteHobby(hobby.id));
  };
  return (
    <li>
      <span>{hobby.name}</span>
      <button onClick={deleteHandler}>제거</button>
    </li>
  );
};

export default HobbySetItem;
