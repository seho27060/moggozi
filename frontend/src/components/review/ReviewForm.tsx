import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReview, reviewAdd } from "../../lib/withTokenApi";
import { reviewFetch } from "../../store/review";
import { RootState } from "../../store/store";

// Rating 관련 import
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import styles from "./ReviewForm.module.scss";
import default_profile from "../../asset/default_profile.png";
import Modal from "../ui/Modal";

interface Props {
  user_image: string | undefined;
  userProgress: number;
}

const ReviewForm = (props: Props) => {
  const { user_image, userProgress } = props;

  const dispatch = useDispatch();
  const contentInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const currentUserId = useSelector(
    (state: RootState) => state.auth.userInfo.id
  );
  const [inputs, setInputs] = useState({ content: "" });
  const [rate, setRate] = useState(0);
  const { content } = inputs;
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

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target; // 우선 e.target 에서 content와 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // content 키를 가진 값을 value 로 설정
    });
  };

  const reviewSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(userProgress);
    if (userProgress === 0) {
      setAlertText(<div>도전하셔야 남길 수 있습니다.</div>);
      setModalOpen(true);
      return;
    }
    if (!rate) {
      setAlertText(<div>평점은 필수입니다.</div>);
      setModalOpen(true);
      return;
    }
    if (!content) {
      setAlertText(<div>내용은 필수입니다.</div>);
      setModalOpen(true);
      return;
    }
    const reviewData = {
      rate: rate,
      reviewContent: content,
      memberId: Number(currentUserId),
      challengeId: Number(id),
    };

    reviewAdd(reviewData).then((res) => {
      if (!!res) {
        // 서버에서 보내준 `이미 등록된 한줄평이 있습니다.` 출력
        setAlertText(<div>{res}</div>);
        setModalOpen(true);
      } else {
        setAlertText(<div>리뷰 작성이 완료되었습니다.</div>);
        setModalOpen(true);
        fetchReview(Number(id))
          .then((res) => {
            dispatch(reviewFetch(res));
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
      setRate(0);
      setValue(0);
      setInputs({ content: "" });
    });
  };

  ///// Rating 관련 코드
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <div className={styles.reviewForm}>
      {user_image ? (
        <img src={user_image} alt="user_img" />
      ) : (
        <img src={default_profile} alt="" />
      )}

      <form>
        <Box sx={{ "& > legend": { mt: 2 }, mb: 1, mt: 2 }}>
          <Rating
            name="rate"
            value={value}
            onChange={(event, newValue) => {
              console.log(newValue);
              if (newValue != null) {
                setRate(newValue);
              }
              setValue(newValue);
            }}
          />
        </Box>
        <div className={styles.input}>
          <input
            name="content"
            placeholder="챌린지 한줄평"
            type="text"
            required
            id="content"
            onChange={onChangeHandler}
            value={content}
            ref={contentInputRef}
          />
          <div className={styles.reviewSubmit} onClick={reviewSubmitHandler}>
            등록
          </div>
        </div>
      </form>
      <Modal open={modalOpen} close={closeAlertModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};
export default ReviewForm;
