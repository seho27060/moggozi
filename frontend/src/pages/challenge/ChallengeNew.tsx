import { useEffect, useState } from "react";
import ChallengeForm from "../../components/challenge/ChallengeForm";
import ChallengeImgForm from "../../components/challenge/ChallengeImgForm";
import { ChallengeSaveState } from "../../store/challenge";

import styles from "./ChallengeNew.module.scss"

const ChallengeNew: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Challenge, setLoadedChallenge] =
    useState<ChallengeSaveState>();

  useEffect(() => {
    setIsLoading(true);
    
  }, []);

  const imgHandler = (url: string) => {
    setLoadedChallenge({
      ...Challenge!,
      img: url,
    });
  };

  return (
    <div className={styles.container}>
      { isLoading && <></>}
      {/* isloading ~~ */}


    <div className={styles.width}>
      <div className={styles.title}>챌린지 생성</div>
        <ChallengeImgForm
          challengeImg={Challenge?.img || ""}
          imgHandler={imgHandler}
        />
        <ChallengeForm></ChallengeForm>
    </div>
    </div>
  );
};

export default ChallengeNew;
