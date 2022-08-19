// import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Comment,
  commentRemove,
  // setCommentUpdateFormToggle,
} from "../../store/comment";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { commentDelete } from "../../lib/withTokenApi";

interface Props {
  comment: Comment;
  setCommentUpdateFormToggle :Dispatch<SetStateAction<boolean>>
}

function CommentOptionBtn(props: Props): JSX.Element {
  const { comment,setCommentUpdateFormToggle } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ///////////////////////////////////////////////////////////////////////////////////
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  const dispatch = useDispatch();

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
                setCommentUpdateFormToggle(true)
                handleClose()
              }}
            >
              수정
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default CommentOptionBtn;
