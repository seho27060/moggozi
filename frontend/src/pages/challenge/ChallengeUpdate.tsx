import { useLocation } from "react-router-dom";
import ChallengeUpdateForm from "../../components/challenge/ChallengeUpdateForm";
import { ChallengeDetailState } from "../../store/challenge";

const ChallengeUpdate: React.FC = () => {
  const challenge = useLocation().state as ChallengeDetailState;
  return (
    <div>
      <h3>ChallengeUpdate</h3>
      <ChallengeUpdateForm challenge={challenge}></ChallengeUpdateForm>
    </div>
  );
};

export default ChallengeUpdate;
