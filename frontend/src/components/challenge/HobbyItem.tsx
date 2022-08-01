import { Hobby } from "../../store/challenge";

const HobbyItem: React.FC<{ hobby: Hobby }> = ({ hobby }) => {
  return (
    <li>  
      { hobby.name }
    </li>
  )
};

export default HobbyItem;