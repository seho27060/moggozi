import { useEffect, useState } from "react";
import { StageState } from "../../store/stage";
import StageEditModal from "../ui/StageEditModal";
import StageUpdateForm from "./StageUpdateForm";

import styles from "./StageUpdateBtn.module.scss";

const StageUpdateBtn: React.FC<{
  stage: StageState;
  index: number;
}> = ({ stage, index }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
      document.body.style.height = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.edit} onClick={openModal}>
        수정
      </div>
      <StageEditModal
        open={modalOpen}
        close={closeModal}
        header="스테이지 수정"
      >
        <StageUpdateForm stage={stage} closeModal={closeModal} />
      </StageEditModal>
    </div>
  );
};

export default StageUpdateBtn;
