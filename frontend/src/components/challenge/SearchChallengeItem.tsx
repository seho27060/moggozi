import { Link } from "react-router-dom";
import { ChallengeItemState } from "../../store/challenge";

import styles from "./SearchChallengeItem.module.scss";

const SearchChallengeItem: React.FC<{ challenge: ChallengeItemState, close: () => void }> = ({
  challenge, close
}) => {
  return (
    <Link to={`/challenge/${challenge.id}`} onClick={close}>
      <div className={styles.challengeItem}>
        <div>
        {challenge.img ? (
          <img className={styles.img} src={challenge.img} alt=""></img>
        ) : (
          <img
            className={styles.img}
            src="https://1.gall-img.com/hygall/files/attach/images/82/346/211/368/30cba3c91088e77386e13055cddb4f80.png"
            alt=""
          ></img>
        )}</div>

        <div className={styles.challengeInfo}>
          <div style={{alignContent: 'center'}}>
            <div className={styles.title}>
              <div>{challenge.name}</div>
              {(() => {
                if (challenge.level === 1) return (<div className={styles.level1}>Lv.1</div>);
                if (challenge.level === 2) return (<div className={styles.level2}>Lv.2</div>);
                if (challenge.level === 3) return (<div className={styles.level3}>Lv.3</div>);
              }) () }
            </div>
            <div className={styles.writer}>
              <div>{challenge.writer.nickname}</div>
              <div><span style={{color: "red"}}>♥</span> {challenge.likeNum}</div>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default SearchChallengeItem;
