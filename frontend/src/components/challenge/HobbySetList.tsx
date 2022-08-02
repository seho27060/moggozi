import { Hobby } from "../../store/challenge";
import HobbySetItem from "./HobbySetItem";

const HobbySetList: React.FC<{ hobbies: Hobby[] }> = ({ hobbies }) => {
  return (
    <ul>
      {hobbies.map((hobby) => (
        <HobbySetItem key={hobby.id} hobby={hobby} />
      ))}
    </ul>
  );
};

export default HobbySetList;
