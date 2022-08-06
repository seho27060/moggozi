import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReview, reviewDelete } from "../../lib/withTokenApi";
import { reviewFetch } from "../../store/review";

const ReviewDeleteBtn: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const challengeId = useParams().id;

  const deleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    reviewDelete(id)
      .then((res) => {
        alert("삭제가 완료되었습니다.");
        fetchReview(Number(challengeId))
          .then((res) => {
            dispatch(reviewFetch(res));
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

export default ReviewDeleteBtn;
