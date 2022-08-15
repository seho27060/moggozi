import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDelete } from "../../lib/withTokenApi";
import { postRemove, setCheckedPost } from "../../store/post";
import {
  setPostUpdateFormState,
  setPostModalOpen,
  setAlertPostModalOpen,
} from "../../store/postModal";
import { RootState } from "../../store/store";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function LongMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const post = useSelector(
    (state: RootState) => state.postModal.postModalState
  );
  // const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const postModifyHandler = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(setPostUpdateFormState(true));
    setAnchorEl(null);
  };
  const postRemoveHandler = (event: MouseEvent) => {
    event.preventDefault();
    postDelete(post!.id)
      .then((res) => {
        console.log("post 삭제완료", res);
        dispatch(postRemove(post));
        dispatch(setCheckedPost(-1))
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setPostModalOpen(false));
    dispatch(setAlertPostModalOpen(false));
    setAnchorEl(null);
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
        <MenuItem onClick={postModifyHandler}>수정</MenuItem>
        <MenuItem onClick={postRemoveHandler}>삭제</MenuItem>
      </Menu>
    </div>
  );
}
