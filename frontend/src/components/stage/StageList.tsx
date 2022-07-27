import { Link } from "react-router-dom";
import { GoBackButton } from "../../layout/HistoryButton";
import { Stage } from "../../pages/stage/StageMain";
import StageItem from "./StageItem";

// interface StagesProps {
//   stages: Array<Stage>;
//   children?: React.ReactNode;
//   element?: React.ReactNode | null;
// }

const StageList: React.FC<{ stages: Stage[] }> = ({ stages }) => {
  return (
    <div>
      <ul>
        {stages.map((stage) => (
          <div style={{border : "solid", margin : "1rem"}}>
            <Link to={`/stage/${stage.stage_id}`} style={{color: 'inherit', textDecoration: 'none'}}>
              <StageItem key={stage.stage_id} stage={stage}/>
            </Link>
          </div>
        ))}
      </ul>
      <GoBackButton/>
    </div>
  );
};
export default StageList;
