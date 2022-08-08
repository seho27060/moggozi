import React, { useState } from "react";
import { ReviewState } from "../../store/review";
import ReviewDeleteBtn from "./ReviewDeleteBtn";
import ReviewUpdateForm from "./ReviewUpdateForm";

const ReviewItem: React.FC<{ review: ReviewState }> = ({ review }) => {
  const [isUpdate, setUpdate] = useState(false);
  const updateHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setUpdate(!isUpdate);
  };

  const closeHandler = () => {
    setUpdate(false);
  };
  return (
    <div>
      {!isUpdate && (
        <div>
          <p>리뷰 : {review.content}</p>
          <p>생성일자 : {review.createdTime}</p>
          <p>수정일자 : {review.modifiedTime}</p>
          <p>작성자 : {review.writer.nickname}</p>
          <p>평점 : {review.rate}</p>
          <button onClick={updateHandler}>수정</button>
          <ReviewDeleteBtn id={review.id!} />
        </div>
      )}
      {isUpdate && (
        <div>
          <ReviewUpdateForm closeHandler={closeHandler} review={review} />
          <button onClick={updateHandler}>수정 취소</button>
        </div>
      )}
    </div>
  );
};
export default ReviewItem;
