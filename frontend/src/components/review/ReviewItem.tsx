import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewState } from "../../store/review";

import ReviewDeleteBtn from "./ReviewDeleteBtn";
import ReviewUpdateForm from "./ReviewUpdateForm";

import styles from "./ReviewItem.module.scss";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ReviewItem: React.FC<{ review: ReviewState }> = ({ review }) => {
  const navigate = useNavigate();
  const [isUpdate, setUpdate] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const updateHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (review.writer.id !== userId) {
      alert("내가 작성한 글만 수정 가능합니다.");
      return;
    }
    setUpdate(!isUpdate);
  };

  const closeHandler = () => {
    setUpdate(false);
  };
  return (
    <div>
      {!isUpdate && (
        <div className={styles.comment}>
          <img
            onClick={() => {
              navigate(`/user/${review.writer.id}`);
            }}
            src="https://i1.daumcdn.net/thumb/C230x300/?fname=https://blog.kakaocdn.net/dn/CUI4O/btqIarIJfHs/LxRhxkC8CcQ19Dyy8Wf6bK/img.jpg"
            alt=""
          />

          <div className={styles.data}>
            <div className={styles.line}>
              <div
                onClick={() => {
                  navigate(`/user/${review.writer.id}`);
                }}
              >
                {review.writer.nickname}
              </div>
              <div>
                <span>★</span> {review.rate}
              </div>
              {moment(review.createdTime?.slice(2, 10)).isBefore(
                review.modifiedTime?.slice(2, 10)
              ) ? (
                <div>{review.modifiedTime?.slice(2, 10)}</div>
              ) : (
                <div>{review.createdTime?.slice(2, 10)}</div>
              )}
              <div>
                <button onClick={updateHandler}>수정</button>
                <div className={styles.widthLine}></div>
                <ReviewDeleteBtn review={review} />
              </div>
            </div>
            <div className={styles.review}>{review.content}</div>

            <div className={styles.horizon}></div>
          </div>
        </div>
      )}

      {isUpdate && (
        <div>
          <ReviewUpdateForm closeHandler={closeHandler} review={review} />
          <div className={styles.cancel}>
            <button onClick={updateHandler}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReviewItem;
