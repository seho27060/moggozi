import { imgState, StageState } from "../../store/stage";
import Dompurify from "dompurify";

const StageEditItem: React.FC<{
  stage: StageState;
  index: number | null;
}> = ({ stage }) => {
  return (
    <div>
      <h4>스테이지 아이템</h4>
      <p>스테이지 이름 : {stage.name}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: Dompurify.sanitize(stage!.content!.toString()),
        }}
        // className={styles.postDetail}
        className="view ql-editor"
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
