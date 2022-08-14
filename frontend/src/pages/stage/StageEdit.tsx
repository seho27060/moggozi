import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StageAddBtn from "../../components/stage/StageAddBtn";
import StageDeleteBtn from "../../components/stage/StageDeleteBtn";
import StageEditItem from "../../components/stage/StageEditItem";
import StageUpdateBtn from "../../components/stage/StageUpdateBtn";
import { stageImgFetchAPI } from "../../lib/imgApi";
import { fetchStages } from "../../lib/withTokenApi";
import { stageFetch, StageState } from "../../store/stage";
import { RootState } from "../../store/store";

const StageEdit: React.FC = () => {
  const { challengeId } = useParams();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const stages = useSelector((state: RootState) => state.stages);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchStagesImg(stages: StageState[]) {
    await stages.reduce(async (acc, stage) => {
      await acc.then();
      await stageImgFetchAPI(stage.id!)
        .then((res) => {
          stage.img = res;
        })
        .catch((err) => {
          stage.img = [];
        });
      return acc;
    }, Promise.resolve());
    return stages;
  }

  useEffect(() => {
    setIsLoading(true);
    fetchStages(Number(challengeId))
      .then((res) => {
        fetchStagesImg(res).then((res) => {
          console.log(res);
          dispatch(stageFetch(res));
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [challengeId, isLoggedIn, dispatch]);

  return (
    <div>
      <h3>StageEdit</h3>
      <StageAddBtn />
      {isLoading === true && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {isLoading === false && (
        <ul>
          {stages.map((stage, index) => (
            <li key={stage.id}>
              <StageEditItem stage={stage} index={index} />
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
