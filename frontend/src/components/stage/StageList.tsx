import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import StageItem from "./StageItem";

const StageList: React.FC = () => {
  const stages = useSelector((state: RootState) => state.stages);
  return (
    <div>
      <ul>
        {stages.map((stage) => (
          <StageItem key={stage.id} stage={stage} />
        ))}
      </ul>
    </div>
  );
};
export default StageList;
