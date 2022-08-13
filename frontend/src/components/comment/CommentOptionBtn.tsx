// import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Comment,
  commentModify,
  commentRemove,
  CommentSend,
} from "../../store/comment";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { commentDelete, commentUpdate } from "../../lib/withTokenApi";

interface Props {
  comment: Comment;
  postId: number | null;
}

function CommentOptionBtn (props: Props): JSX.Element {
  const { comment, postId } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ///////////////////////////////////////////////////////////////////////////////////

  const [isToggle, setIsToggle] = useState(false);
  const [isFormToggle, setIsFormToggle] = useState(false);

  const enteredComment = useRef<HTMLInputElement>(null);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  const dispatch = useDispatch();
  const state: number = userId === comment.writer!.id ? 1 : 0;
  let commentSend: CommentSend = {
    postId: postId,
    text: null,
    parent: comment.parentId,
    order: comment.order,
    state: state,
  };
  let commentState: Comment = {
    createdTime: comment.createdTime,
    id: comment.id,
    state: comment.state,
    order: comment.order,
    parentId: comment.parentId,
    text: comment.text,
    writer: comment.writer,
    modifiedTime: comment.modifiedTime,
  };
  const commentModifyHandler = (event: MouseEvent) => {
    event.preventDefault();
    commentSend.text = enteredComment.current!.value;
    commentState.text = enteredComment.current!.value;
    commentUpdate(comment.id, commentSend).then((res) => {
      console.log("comment 수정완료", res);
      dispatch(commentModify(commentState));
    });
    setIsFormToggle(!isFormToggle);
    setIsToggle(!isToggle);
  };

  const commentRemoveHandler = (event: MouseEvent) => {
    event.preventDefault();
    commentDelete(comment.id).then((res) => {
      console.log(`${comment.id} 삭제 완료`, res);
      dispatch(commentRemove(comment.id));
    });
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        {userId !== comment.writer!.id && <MenuItem onClick={() => {return commentModifyHandler}}>숨김</MenuItem>}
        {userId === comment.writer!.id && <MenuItem onClick={() => {return commentRemoveHandler}}>삭제</MenuItem>}
        {userId === comment.writer!.id && (
          <div>
            <MenuItem onClick={() =>{setIsFormToggle(!isFormToggle)}}>{!isFormToggle && "수정"}</MenuItem>
            {isFormToggle && (
              <form>
                <button onClick={() => {return commentModifyHandler}}>수정완료</button>
                <label htmlFor="content"></label>
                <input
                  type="text"
                  id="content"
                  ref={enteredComment}
                  defaultValue={comment.text!}
                />
              </form>
            )}
          </div>
        )}
      </Menu>
    </div>
  );
}

// const CommentOptionBtn: React.FC<{
//   comment: Comment;
//   postId: number | null;
// }> = ({ comment, postId }) => {
  
// };

export default CommentOptionBtn;
