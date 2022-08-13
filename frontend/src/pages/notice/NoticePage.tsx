import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NoticeItem from "../../components/notices/NoticeItem";
import { noticePageRead } from "../../lib/withTokenApi";
import { Notice } from "../../store/notice";

const NoticePage: React.FC = () => {
  const dispatch = useDispatch();
  const { noticePageNum } = useParams();

  let noticeList: Notice[] = [];
  noticePageRead(Number(noticePageNum))
    .then((res) => {
      console.log(`${noticePageNum}번 페이지 공지사항 불러오기`, res);
      // dispatch(setNoticeList(res))
      noticeList = [...res];
    })
    .catch((err) => {
      console.log("err", err);
    });

  return (
    <div>
      {noticeList!.map((notice) => {
        return (
          <div key={notice.id}>
            <NoticeItem notice={notice} />;
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default NoticePage;
