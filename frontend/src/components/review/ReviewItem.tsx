import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewState } from "../../store/review";

import ReviewDeleteBtn from "./ReviewDeleteBtn";
import ReviewUpdateForm from "./ReviewUpdateForm";

import styles from "./ReviewItem.module.scss";
import default_profile from "../../asset/default_profile.png";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "../ui/Modal";

const ReviewItem: React.FC<{ review: ReviewState }> = ({ review }) => {
  const navigate = useNavigate();
  const [isUpdate, setUpdate] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);

  const closeAlertModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };
  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
      document.body.style.height = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [modalOpen]);

  const updateHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (review.writer.id !== userId) {
      setAlertText(<div>내가 작성한 글만 수정 가능합니다.</div>);
      setModalOpen(true);
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
            src={!!review.writer.path ? review.writer.path : default_profile}
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
      <Modal open={modalOpen} close={closeAlertModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};
export default ReviewItem;
