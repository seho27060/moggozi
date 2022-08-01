import { Fragment } from "react";
import { Hobby } from "../../store/challenge";
import HobbyItem from "./HobbyItem";

const HobbyList: React.FC<{ hobbies: Hobby[] }> = ({ hobbies }) => {
  console.log(hobbies)
  return (
    <ul>
      {hobbies.map((hobby) => (
        <Fragment>
          
          <HobbyItem hobby={hobby} />
        </Fragment>
      ))}
    </ul>
  );
};

export default HobbyList;
