import { useState } from "react";
import Modal from "../ui/Modal";
import StageForm from "./StageForm";

import styles from "../../pages/stage/StageEdit.module.scss"
import AddIcon from '@mui/icons-material/Add';

const StageAddBtn: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className={styles.box} onClick={openModal}><div className={styles.addIcon}><AddIcon /></div></div>
      <Modal open={modalOpen} close={closeModal} header="스테이지 생성">
        <StageForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default StageAddBtn;
