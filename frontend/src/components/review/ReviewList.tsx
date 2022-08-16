import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReviewState } from "../../store/review";
import { RootState } from "../../store/store";
import ReviewItem from "./ReviewItem";

const ReviewList: React.FC<{ reviews: ReviewState[] }> = ({ reviews }) => {
  const [page, setPage] = useState(1);
  const [showReviews, setShowReviews] = useState<ReviewState[]>([]);
  const [maxPage, setMaxPage] = useState(0);
  // const [myReview, setMyReview] = useState<ReviewState>();
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  useEffect(() => {
    setPage(1);
    setShowReviews(reviews.slice(0, 5));
    setMaxPage(reviews.length / 5);
  }, [userId, reviews]);

  const showMoreHandler = (event: React.MouseEvent) => {
    // 페이지를 변경
    event.preventDefault();
    setPage(page + 1);
  };

  useEffect(() => {
    // 의존성 배열을 활용해 페이지 바뀌면 렌더링
    setShowReviews(reviews.slice(0, page * 5));
  }, [page, reviews]);

  return (
    <div>
      {/* <hr></hr>
      <p>내 리뷰</p>
      {myReview && (
        <div>
          <ReviewItem review={myReview} />
        </div>
      )}
      <hr></hr> */}
      <ul>
        {showReviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
      {maxPage > page && <button onClick={showMoreHandler}>더보기</button>}
    </div>
  );
};
export default ReviewList;
