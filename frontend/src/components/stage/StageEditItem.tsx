import { imgState, StageState } from "../../store/stage";

const StageEditItem: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  return (
    <div>
      <h4>스테이지 아이템</h4>
      <p>스테이지 이름 : {stage.name}</p>
      <p>스테이지 내용 : {stage.content}</p>
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
