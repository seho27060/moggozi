import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReview, reviewUpdate } from "../../lib/withTokenApi";
import { ReviewState, reviewFetch } from "../../store/review";
import StarRating from "./StarRating";

import styles from "./ReviewUpdateForm.module.scss"

const ReviewUpdateForm: React.FC<{
  review: ReviewState;
  closeHandler: () => void;
}> = ({ review, closeHandler }) => {
  const dispatch = useDispatch();
  const contentInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const [inputs, setInputs] = useState({ content: review.content || "" });
  const [rate, setRate] = useState(review.rate || 0);

  const { content } = inputs;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target; // 우선 e.target 에서 content와 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // content 키를 가진 값을 value 로 설정
    });
  };

  const rateChangeHandler = (star: number) => {
    setRate(star);
  };

  const reviewSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (rate === 0) {
      alert("평점을 입력해주세요.");
    } else {
      const reviewData = {
        rate: rate!,
        reviewContent: content!,
        reviewId: review.id!,
      };
      console.log(reviewData);
      reviewUpdate(reviewData, Number(id)).then((res) => {
        alert("review 수정이 완료되었습니다.");
        fetchReview(Number(id))
          .then((res) => {
            dispatch(reviewFetch(res));
            closeHandler();
          })
          .catch((err) => {
            alert(err.response);
          });
      });
    }
  };

  return (
    <div className={styles.reviewForm}>
      <img src="https://i1.daumcdn.net/thumb/C230x300/?fname=https://blog.kakaocdn.net/dn/CUI4O/btqIarIJfHs/LxRhxkC8CcQ19Dyy8Wf6bK/img.jpg" alt="" />
      <div>{review.writer.img}</div>
      <form>
          <StarRating rate={rate!} rateChangeHandler={rateChangeHandler} />
        <div className={styles.input}>
          <input
            name="content"
            placeholder="수정할 내용"
            type="text"
            required
            id="content"
            onChange={onChangeHandler}
            value={content}
            ref={contentInputRef}
          />
        <div className={styles.reviewSubmit} onClick={reviewSubmitHandler}>
          수정
        </div>
        </div>
      </form>
    </div>
  );
};
export default ReviewUpdateForm;
