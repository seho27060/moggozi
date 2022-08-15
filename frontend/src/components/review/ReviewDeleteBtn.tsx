import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReview, reviewDelete } from "../../lib/withTokenApi";
import { reviewFetch, ReviewState } from "../../store/review";
import { RootState } from "../../store/store";

const ReviewDeleteBtn: React.FC<{ review: ReviewState }> = ({ review }) => {
  const dispatch = useDispatch();
  const challengeId = useParams().id;
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  const deleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (userId !== review.writer.id) {
      alert("내가 작성한 글만 삭제 가능합니다.");
      return;
    }
    reviewDelete(review.id!)
      .then((res) => {
        alert("삭제가 완료되었습니다.");
        fetchReview(Number(challengeId)).then((res) => {
          dispatch(reviewFetch(res));
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
