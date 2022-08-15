import { Hobby } from "../../store/challenge";

const HobbyItem: React.FC<{ hobby: Hobby }> = ({ hobby }) => {
  return (
    <div>  
      # { hobby.name }
    </div>
  )
};

export default HobbyItem;