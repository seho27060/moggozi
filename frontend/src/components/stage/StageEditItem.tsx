import { imgState, StageState } from "../../store/stage";
import Dompurify from "dompurify";

import styles from "./StageEditItem.module.scss"

const StageEditItem: React.FC<{
  stage: StageState;
  index: number | null;
}> = ({ stage }) => {
  return (
    <div>
      <div className={styles.stageTitle}>
        <div>스테이지 이름</div>
        <div>{stage.name}</div>
      </div>
      <div style={{height: "240px", overflow: "hidden"}}
        dangerouslySetInnerHTML={{
          __html: Dompurify.sanitize(stage!.content!.toString()),
        }}
        // className={styles.postDetail}
        className={`view ql-editor ${styles.stageContent}`}
      ></div>

      <ul>
        {Array.isArray(stage.img) &&
          stage.img.map((img: imgState) => {
            return (
              <li>
                <img src={img.url!} alt="img" />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default StageEditItem;
