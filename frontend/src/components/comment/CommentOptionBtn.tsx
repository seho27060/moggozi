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
  // setCommentUpdateFormToggle,
} from "../../store/comment";
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { commentDelete, commentUpdate } from "../../lib/withTokenApi";

interface Props {
  comment: Comment;
  postId: number | null;
  setCommentUpdateFormToggle :Dispatch<SetStateAction<boolean>>
}

function CommentOptionBtn(props: Props): JSX.Element {
  const { comment, postId,setCommentUpdateFormToggle } = props;
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

  const commentRemoveHandler = (event: MouseEvent) => {
    event.preventDefault();
    console.log("remove comment",comment.id)
    commentDelete(comment.id).then((res) => {
      console.log(`${comment.id} 삭제 완료`, res);
      dispatch(commentRemove(comment.id));
    });
  };

  return (
    <div>
      {userId === comment.writer!.id && (
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
      )}
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
        {/* {userId !== comment.writer!.id && (
          <MenuItem
            onClick={() => {
              return commentModifyHandler;
            }}
          >
            숨김
          </MenuItem>
        )} */}
        {userId === comment.writer!.id && (
          <MenuItem
            onClick={(event:MouseEvent) => {
              commentRemoveHandler(event)
            }}
          >
            삭제
          </MenuItem>
        )}
        {userId === comment.writer!.id && (
          <div>
            <MenuItem
              onClick={() => {
                // setIsFormToggle(!isFormToggle);
                setCommentUpdateFormToggle(true)
                handleClose()
              }}
            >
              {/* {!isFormToggle && "수정"} */}
              수정
            </MenuItem>
            {/* {isFormToggle && (
              <form>
                <button
                  onClick={commentModifyHandler}
                >
                  수정완료
                </button>
                <label htmlFor="content"></label>
                <input
                  type="text"
                  id="content"
                  ref={enteredComment}
                  defaultValue={comment.text!}
                />
              </form>
            )} */}
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
