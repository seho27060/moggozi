import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChallengeDetailState } from "../../store/challenge";
import ChallengeDeleteBtn from "../challenge/ChallengeDeleteBtn";
import { registerChallenge } from "../../lib/withTokenApi";

import styles from "./ChallengeOptionBtn.module.scss";
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
    <div className={styles.buttons}>
      {userId === writerId && state === 0 && (
        <div className={styles.divTag} onClick={registerHandler}>
          <div>챌린지 등록</div>
        </div>
      )}
      <div className={styles.divTag}
        onClick={() => {
          navigate(`/stage/${id}`);
        }}
      >
        <div>스테이지 편집</div>
      </div>
      <Link className={styles.aTag}
        to={`/challenge/${id}/update`}
        state={loadedChallenge}
        style={{ textDecoration: "none" }}
      >
        <div>챌린지 수정</div>
      </Link>

      <div className={styles.divTag}>
        <ChallengeDeleteBtn />
      </div>
    </div>
  );
}
