import { Link, useNavigate } from "react-router-dom";
import { GoBackButton } from "../../layout/HistoryButton";
import { Stage } from "../../store/stage";
import StageItem from "./StageItem";

// interface StagesProps {
//   stages: Array<Stage>;
//   children?: React.ReactNode;
//   element?: React.ReactNode | null;
// }

const StageList: React.FC<{ stages: Stage[] }> = ({ stages }) => {
  const navigator = useNavigate()
  const moveToStageAdd = () => {

    console.log(`make new Stage to Challenge ${stages[0].challenge_id}`)
    navigator("/stage/new")
    return
  }
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
      <button onClick ={moveToStageAdd}>Add New Stage</button>
    </div>
  );
};
export default StageList;
