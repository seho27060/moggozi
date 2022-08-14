import { Link } from "react-router-dom";
import { Notice } from "../../store/notice";

import styles from "./NoticeItem.module.scss"
const NoticeItem: React.FC<{ notice: Notice }> = ({ notice }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // console.log(notice)/
  return (
    <div className={styles.container}>
      <Link to={`/notice/detail/${notice.noticeId}`} className={styles.noticeTitle}>
        <div >{notice.title}</div>
      </Link>
      <div className={styles.noticeDate}>
        {new Date(notice!.modifiedDate!).toLocaleDateString("ko-Kr", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}  |  관리자
      </div>
    </div>
  );
};

export default NoticeItem;
