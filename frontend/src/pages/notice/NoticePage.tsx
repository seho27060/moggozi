import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import NoticeItem from "../../components/notices/NoticeItem";
import { noticePageRead } from "../../lib/withTokenApi";
import { Notice } from "../../store/notice";

const NoticePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noticePageNum } = useParams();
  let noticeList: Notice[] = [];
  let totalPages:Number = 0
  noticePageRead(Number(noticePageNum))
    .then((res) => {
      console.log(`${noticePageNum}번 페이지 공지사항 불러오기`, res);
      // dispatch(setNoticeList(res))
      noticeList = [...res.content];
      totalPages = Number(res.totalPages)
    })
    .catch((err) => {
      console.log("err", err);
    });

  return (
    <div>
      <div>
        공지사항
      </div>
      <hr />
      {noticeList!.map((notice) => {
        return (
          <div key={notice.id}>
            <NoticeItem notice={notice} />;
            <hr />
          </div>
        );
      })}
      <div>
        <div>
          <Link to={(Number(noticePageNum) > 0) ? `/notice/${Number(noticePageNum) - 1}` : "#"}>이전페이지</Link>
        </div>
        <Link to={(Number(noticePageNum) < totalPages) ? `/notice/${Number(noticePageNum) + 1}` : "#"}>다음페이지</Link>
      </div>
    </div>
  );
};

export default NoticePage;
