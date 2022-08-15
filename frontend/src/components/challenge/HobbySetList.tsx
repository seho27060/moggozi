import { Hobby } from "../../store/challenge";
import HobbySetItem from "./HobbySetItem";

import styles from "./HobbySetList.module.scss"

const HobbySetList: React.FC<{ hobbies: Hobby[] }> = ({ hobbies }) => {
  return (
    <div className={styles.hobbySetList}>
      {hobbies.map((hobby) => (
        <HobbySetItem key={hobby.id} hobby={hobby} />
      ))}
    </div>
  );
};

export default HobbySetList;
