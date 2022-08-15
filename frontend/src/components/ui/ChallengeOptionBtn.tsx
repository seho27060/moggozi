import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { ChallengeDetailState } from "../../store/challenge";
import ChallengeDeleteBtn from "../challenge/ChallengeDeleteBtn";
import { registerChallenge } from "../../lib/withTokenApi";

interface Props {
  id: string | undefined;
  userId: number | null;
  writerId: number | null;
  state: number | null;
  loadedChallenge: ChallengeDetailState | undefined;
}

export default function ChallengeOptionBtn(props: Props) {
  const { id, userId, writerId, state, loadedChallenge } = props;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const registerHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (loadedChallenge!.stageList.length === 0) {
      alert("스테이지가 존재하지 않아 등록하지 못합니다.");
      return;
    }
    if (
      window.confirm("챌린지 등록하시겠습니까? 등록하면 취소할 수 없습니다!")
    ) {
      registerChallenge(Number(id))
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
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
        {/* const { userId, writerId, state } = props; */}
        {userId === writerId && state === 0 && (
          <MenuItem onClick={registerHandler}>
            <div>챌린지 등록</div>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            navigate(`/stage/${id}`);
          }}
        >
          <div>스테이지 편집</div>
        </MenuItem>

        <Link
          to={`/challenge/${id}/update`}
          state={loadedChallenge}
          style={{ textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>
            <div>챌린지 수정</div>
          </MenuItem>
        </Link>

        <MenuItem>
          <ChallengeDeleteBtn />
        </MenuItem>
      </Menu>
    </div>
  );
}
