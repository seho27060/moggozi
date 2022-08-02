import { Hobby } from "../../store/challenge";
import HobbyItem from "./HobbyItem";

const HobbyList: React.FC<{ hobbies: Hobby[] }> = ({ hobbies }) => {
  return (
    <ul>
      {hobbies.map((hobby) => (
        <HobbyItem key={hobby.id} hobby={hobby} />
      ))}
    </ul>
  );
};

export default HobbyList;
