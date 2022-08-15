import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NoticeItem from "../../components/notices/NoticeItem";
import { noticePageRead } from "../../lib/withTokenApi";
import { setNoticeList } from "../../store/notice";
import { RootState } from "../../store/store";

import styles from "./NoticePage.module.scss";
const NoticePage: React.FC = () => {
  const dispatch = useDispatch();

  const { noticePageNum } = useParams();
  const noticeList = useSelector((state: RootState) => state.notice.noticeList);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    noticePageRead(Number(noticePageNum))
      .then((res) => {
        console.log(`${noticePageNum}번 페이지 공지사항 불러오기`, res);
        // dispatch(setNoticeList(res))
        dispatch(setNoticeList([...res.content]));
        setTotalPages(Number(res.totalPages));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [noticePageNum]);

  return (
    <div className={styles.container}>
      <div className={styles.noticeList}>
        <div className={styles.noticeBanner}>공지사항</div>
        <div className={styles.horizon}></div>
        <div className={styles.minHeight}>
          {noticeList!.map((notice) => (
            <div key={notice.noticeId}>
              <NoticeItem notice={notice} />
            </div>
          ))}
        </div>
        <div className={styles.navigateBtnContainer}>
          <Link
            to={
              Number(noticePageNum) > 0
                ? `/notice/${Number(noticePageNum) - 1}`
                : "#"
            }
            className={styles.navigateBtn}
          >
            이전
          </Link>
          <Link
            to={
              Number(noticePageNum) < totalPages - 1
                ? `/notice/${Number(noticePageNum) + 1}`
                : "#"
            }
            className={styles.navigateBtn}
          >
            다음
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
