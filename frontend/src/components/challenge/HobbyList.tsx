import { Hobby } from "../../store/challenge";
import HobbyItem from "./HobbyItem";

import styles from "./HobbyList.module.scss"
const HobbyList: React.FC<{ hobbies: Hobby[] }> = ({ hobbies }) => {
  return (
    <div className={styles.hobbyList}>
      {hobbies.map((hobby) => (
        <HobbyItem key={hobby.id} hobby={hobby} />
      ))}
    </div>
  );
};

export default HobbyList;
