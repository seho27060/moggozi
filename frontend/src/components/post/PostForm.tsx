import { FormEvent, useEffect, useRef, useState } from "react";
import { PostSend } from "../../store/postModal";
import { postAdd } from "../../lib/withTokenApi";
import { postRegister } from "../../store/post";
import { useDispatch } from "react-redux";
import { StageState } from "../../store/stage";

import styles from "./PostForm.module.scss";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";
import { stageDetail } from "../../lib/generalApi";
import { style } from "@mui/system";
import UserImgForm from "../accounts/UserImgForm";
import ChallengeImgForm from "../challenge/ChallengeImgForm";

const PostForm: React.FC<{
  stageId: number;
  modalClose: () => void;
  challenge: string | null;
}> = ({ stageId, modalClose, challenge }) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();
  const postImgInputRef = useRef<HTMLInputElement>(null);

  const [stageInfo, setStageInfo] = useState<StageState[]>([]);

  const PostData: PostSend = {
    title: "",
    content: "",
    postImg: "",
    stageId: stageId,
  };

  const [ titleCnt, setTitleCnt ] = useState("")

  const postingSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    PostData.title = titleInputRef.current!.value;
    PostData.content = contentInputRef.current!.value;
    PostData.postImg = postImgInputRef.current!.value;
    console.log(PostData);
    postAdd(PostData)
      .then((res) => {
        console.log("포스팅 성공", res);
        dispatch(postRegister(res));
        modalClose();
      })
      .catch((err) => console.log("포스팅 실패", err));
  };

  useEffect(() => {
    stageDetail(stageId)
      .then((res) => {
        setStageInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.title}>포스팅 작성</div>
      <div className={styles.head}>
        <div>챌린지</div>
        <div>{challenge}</div>
        <div>스테이지</div>
        <div>1단계 - css 실력 키우기</div>
      </div>
      {/* <div>{stageInfo.id}단계 - {stageInfo.name}</div> */}
      <form className={styles.form}>
        <div className={styles.inputTitle}>
          <label htmlFor="title">제목</label>
          <div className={styles.titleCnt}>
            <input type="text" id="title" ref={titleInputRef} placeholder="포스팅 제목을 입력해주세요. (최대 30자)" maxLength={29} onChange={(event) => {setTitleCnt(event.target.value)}} />
            <div>{titleCnt.length} / 30</div>
          </div>
        </div>
        <div className={styles.photo}>
          <div>사진 첨부 (선택)</div>
          <div>사진을 첨부해주세요.</div>
        </div>
        <div style={{display: 'flex', justifyContent: "center", margin: "20px 0 20px 0"}}>
          {/* <label htmlFor="img">사진첨부</label>
          <input type="text" id="img" ref={postImgInputRef} /> */}
          <img className={styles.img} src="https://via.placeholder.com/400x250.png/" alt="" />
        </div>
        {/* 에디터 적용 */}
        <div>
          <EditorComponent QuillRef={contentInputRef} value={"자세하고 솔직한 작성은 다른 챌린저들에게 큰 도움이 됩니다."} />
        </div>
        <div style={{display:"flex", justifyContent: "end"}}>
          <button className={styles.submitt} onClick={postingSubmitHandler}>등록하기</button>
        </div>
      </form>
    </div>
    // 모달창으로 할지, 페이지로 할지에 따라 닫기or 뒤로가기 버튼 구현 필요
  );
};
export default PostForm;
