import React from "react";
import { useDispatch } from "react-redux";
import { stageDelete } from "../../lib/withTokenApi";
import { deleteStage } from "../../store/stage";

const StageDeleteBtn: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();

  const deleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    stageDelete(id)
      .then((res) => {
        alert("삭제가 완료되었습니다.");
        dispatch(deleteStage(id));
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
