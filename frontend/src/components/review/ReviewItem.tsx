import { Review } from "../../store/review";
import ReviewDeleteBtn from "./ReviewDeleteBtn";

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div>
      <p>리뷰 : {review.content}</p>
      <p>생성일자 : {review.createdTime}</p>
      <p>수정일자 : {review.modifiedTime}</p>
      <p>작성자 : {review.writer.nickname}</p>
      <button>수정</button>
      <ReviewDeleteBtn id={review.id!} />
    </div>
  );
};
export default ReviewItem;
