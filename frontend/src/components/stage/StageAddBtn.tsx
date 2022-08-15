import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import StageForm from "./StageForm";

import styles from "../../pages/stage/StageEdit.module.scss";
import AddIcon from "@mui/icons-material/Add";

const StageAddBtn: React.FC = () => {
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
      <div className={styles.box} onClick={openModal}>
        <div className={styles.addIcon}>
          <AddIcon />
        </div>
      </div>
      <Modal open={modalOpen} close={closeModal} header="스테이지 생성">
        <StageForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default StageAddBtn;
