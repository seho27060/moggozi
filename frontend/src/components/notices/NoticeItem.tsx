import { Link } from "react-router-dom";
import { Notice } from "../../store/notice";

const NoticeItem: React.FC<{ notice: Notice }> = ({ notice }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <Link to={`/notice/detail/${notice.id}`}>
        <p>
          {notice.title}/
          {notice.updatedDate!.toLocaleDateString("ko-Kr", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </Link>
    </div>
  );
};

export default NoticeItem;
