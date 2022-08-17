import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChallenge } from "../../lib/generalApi";
import { isLoginFetchChallenge } from "../../lib/withTokenApi";
import { ChallengeDetailState } from "../../store/challenge";
import { RootState } from "../../store/store";

import ChallengeImgForm from "../../components/challenge/ChallengeImgForm";
import ChallengeUpdateForm from "../../components/challenge/ChallengeUpdateForm";

import styles from "./ChallengeUpdate.module.scss";
import Loader from "../../components/ui/Loader";

const ChallengeUpdate: React.FC = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallenge, setLoadedChallenge] =
    useState<ChallengeDetailState>();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      if (isLoggedIn) {
        // 로그인 한 경우
        isLoginFetchChallenge(Number(id))
          .then((res) => {
            const challenge: ChallengeDetailState = {
              ...res,
            };
            setLoadedChallenge(challenge);
            setIsLoading(false);
          })
          // console.log(res)
          .catch((err) => {
            setIsLoading(false);
          });
      } else {
        // 로그인 안 한 경우
        fetchChallenge(Number(id))
          .then((res) => {
            const challenge: ChallengeDetailState = {
              ...res,
            };
            setLoadedChallenge(challenge);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  }, [id, isLoggedIn, dispatch]);

  const imgHandler = (url: string) => {
    setLoadedChallenge({
      ...loadedChallenge!,
      img: url,
    });
  };

  return (
    <div className={styles.container}>
      {isLoading === true && <Loader />}
      {isLoading === false && (
        <div className={styles.width}>
          <div className={styles.title}>챌린지</div>
          <ChallengeImgForm
            challengeImg={loadedChallenge!.img || ""}
            imgHandler={imgHandler}
            challengeId={loadedChallenge!.id!}
          />
          <ChallengeUpdateForm challenge={loadedChallenge!} />
        </div>
      )}
    </div>
  );
};

export default ChallengeUpdate;
