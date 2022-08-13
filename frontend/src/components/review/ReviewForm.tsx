import React, { ChangeEvent, useRef, useState } from "react";
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

interface Props {
  user_image: string | undefined;
}

const ReviewForm = (props: Props) => {
  const { user_image } = props;

  const dispatch = useDispatch();
  const contentInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const currentUserId = useSelector(
    (state: RootState) => state.auth.userInfo.id
  );

  const [inputs, setInputs] = useState({ content: "" });
  const [rate, setRate] = useState(0);

  const { content } = inputs;

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
    if (rate === 0 || !content) {
      alert("평점과 내용은 필수입니다.");
    } else {
      const reviewData = {
        rate: rate,
        reviewContent: content,
        memberId: Number(currentUserId),
        challengeId: Number(id),
      };
      console.log(reviewData);
      reviewAdd(reviewData).then((res) => {
        alert("review 생성이 완료되었습니다.");
        fetchReview(Number(id))
          .then((res) => {
            dispatch(reviewFetch(res));
            setRate(0);
            setInputs({ content: "" });
          })
          .catch((err) => {
            alert(err.response);
          });
      });
    }
  };

  ///// Rating 관련 코드
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <div className={styles.reviewForm}>
      {user_image ? (
        <img src={user_image} alt="user_img" />
      ) : (
        <img
          src="https://i.pinimg.com/550x/2c/b2/aa/2cb2aa6c4b8aac0be04d52ce2b1cc21a.jpg"
          alt=""
        />
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
    </div>
  );
};
export default ReviewForm;
