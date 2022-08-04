import { useSelector } from "react-redux";
import StageDeleteBtn from "../../components/stage/StageDeleteBtn";
import StageItem from "../../components/stage/StageItem";
import StageUpdateBtn from "../../components/stage/StageUpdateBtn";
import { RootState } from "../../store/store";

const StageEdit: React.FC = () => {
  const stages = useSelector((state: RootState) => state.stages);
  return (
    <div>
      <h3>StageEdit</h3>
      <ul>
        {stages.map((stage) => (
          <div>
            <StageItem key={stage.id} stage={stage} />
            <StageUpdateBtn key={stage.id} stage={stage} />
            <StageDeleteBtn key={stage.id} id={stage.id!} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default StageEdit;
