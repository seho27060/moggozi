import { StageState } from "../../store/stage";
import StageItem from "./StageItem";

const StageList: React.FC<{ stages: StageState[] }> = ({ stages }) => {
  return (
    <div>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            <StageItem stage={stage} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StageList;
