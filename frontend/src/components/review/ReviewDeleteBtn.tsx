import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReview, reviewDelete } from "../../lib/withTokenApi";
import { reviewFetch, ReviewState } from "../../store/review";
import { RootState } from "../../store/store";
import Modal from "../ui/Modal";

const ReviewDeleteBtn: React.FC<{ review: ReviewState }> = ({ review }) => {
  const dispatch = useDispatch();
  const challengeId = useParams().id;
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

  const deleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (userId !== review.writer.id) {
      setAlertText(<div>내가 작성한 글만 삭제 가능합니다.</div>);
      setModalOpen(true);
      return;
    }
    reviewDelete(review.id!)
      .then((res) => {
        fetchReview(Number(challengeId)).then((res) => {
          dispatch(reviewFetch(res));
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      <div>
        <button onClick={deleteHandler}>삭제</button>
      </div>
      <Modal open={modalOpen} close={closeAlertModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};

export default ReviewDeleteBtn;
