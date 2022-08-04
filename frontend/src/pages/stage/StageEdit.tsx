import { useLocation } from "react-router-dom";
import { StageState } from "../../store/stage";

const StageEdit: React.FC = () => {
  const stages = useLocation().state as StageState[];
  console.log(stages);
  return (
    <div>
      <h3>StageEdit</h3>
    </div>
  );
};

export default StageEdit;
