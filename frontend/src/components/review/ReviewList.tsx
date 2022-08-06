import { ReviewState } from "../../store/review";
import ReviewItem from "./ReviewItem";

const ReviewList: React.FC<{ reviews: ReviewState[] }> = ({ reviews }) => {
  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReviewList;
