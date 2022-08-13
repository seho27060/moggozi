import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { noticePageRead, noticeRead } from "../../lib/withTokenApi";
import { Notice, setNotice, setNoticeList } from "../../store/notice";
import { RootState } from "../../store/store";

const NoticeDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const { noticeId } = useParams();

  const notice = useSelector((state: RootState) => state.notice.notice);

  useEffect(() => {
    noticeRead(Number(noticeId))
      .then((res) => {
        console.log(`${noticeId}번 공지사항 불러오기`, res);
        // dispatch(setNoticeList(res))
        dispatch(setNotice(res));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div>
      <p>
        <div>{notice.id}</div>
        <div>{notice.title}</div>
        <p>{notice.content}</p>
        {/* <div>{notice.updatedDate!.toString()}</div>/ */}
        <div>{notice.createdDate!.toString()}</div>
      </p>
    </div>
  );
};

export default NoticeDetailPage;
