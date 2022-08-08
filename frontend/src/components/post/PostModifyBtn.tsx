import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDelete } from "../../lib/withTokenApi";
import { postRemove } from "../../store/post";
import {
  setPostUpdateFormState,
  setPostModalState,
} from "../../store/postModal";
import { RootState } from "../../store/store";
const PostModifyBtn: React.FC<{}> = () => {
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector(
    (state: RootState) => state.postModal.postModalState
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const postModifyHandler = (event: MouseEvent) => {
    event.preventDefault();
    setIsToggle(!isToggle);
    dispatch(setPostUpdateFormState(true));
  };
  const postRemoveHandler = (event: MouseEvent) => {
    event.preventDefault();
    postDelete(post!.id)
      .then((res) => {
        console.log("post 삭제완료", res);
        dispatch(postRemove(post));
        dispatch(setPostModalState(false));
      })
      .catch((err) => {
        console.log(err);
      });
    setIsToggle(!isToggle);
  };
  console.log(userInfo, post?.writer);
  return (
    <div>
      {userInfo.id === post!.writer!.id && (
        <button onClick={() => setIsToggle(!isToggle)}>ㆍㆍㆍ</button>
      )}

      {isToggle && <button onClick={postModifyHandler}>수정</button>}
      {isToggle && <button onClick={postRemoveHandler}>삭제</button>}
    </div>
  );
};

export default PostModifyBtn;
