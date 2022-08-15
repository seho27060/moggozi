import { useState } from "react";
import { StageState } from "../../store/stage";
import StageEditModal from "../ui/StageEditModal";
import StageUpdateForm from "./StageUpdateForm";

import styles from "./StageUpdateBtn.module.scss"

const StageUpdateBtn: React.FC<{
  stage: StageState; index: number;
}> = ({ stage, index }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className={styles.index}>{index}</div>
      <div className={styles.edit} onClick={openModal}>수정</div>
      <StageEditModal open={modalOpen} close={closeModal} header="스테이지 수정">
        <StageUpdateForm stage={stage} closeModal={closeModal} />
      </StageEditModal>
    </div>
  );
};

export default StageUpdateBtn;
