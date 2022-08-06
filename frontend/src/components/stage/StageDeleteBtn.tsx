import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageDelete } from "../../lib/withTokenApi";
import { fetchStage } from "../../store/stage";

const StageDeleteBtn: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const { challengeId } = useParams();

  const deleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    stageDelete(id)
      .then((res) => {
        alert("삭제가 완료되었습니다.");
        fetchStages(Number(challengeId!))
          .then((res) => {
            dispatch(fetchStage(res));
          })
          .catch((err) => {
            alert(err.response);
          });
      })
      .catch((err) => {
        alert(err.response);
      });
  };
  return (
    <div>
      <button onClick={deleteHandler}>삭제</button>
    </div>
  );
};

export default StageDeleteBtn;
