import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StageDeleteBtn from "../../components/stage/StageDeleteBtn";
import StageItem from "../../components/stage/StageItem";
import StageUpdateBtn from "../../components/stage/StageUpdateBtn";
import { fetchStages } from "../../lib/withTokenApi";
import { fetchStage } from "../../store/stage";
import { RootState } from "../../store/store";

const StageEdit: React.FC = () => {
  const { challengeId } = useParams();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    fetchStages(Number(challengeId))
      .then((res) => {
        dispatch(fetchStage(res));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [challengeId, isLoggedIn, dispatch]);

  const stages = useSelector((state: RootState) => state.stages);
  return (
    <div>
      <h3>StageEdit</h3>
      {isLoading === true && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {isLoading === false && (
        <ul>
          {stages.map((stage) => (
            <li key={stage.id}>
              <StageItem stage={stage} />
              <StageUpdateBtn stage={stage} />
              <StageDeleteBtn id={stage.id!} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StageEdit;
