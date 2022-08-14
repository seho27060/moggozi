import { useState } from "react";
import Modal from "../ui/Modal";
import StageForm from "./StageForm";

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
      <button onClick={openModal}>생성</button>
      <Modal open={modalOpen} close={closeModal} header="스테이지 생성">
        <StageForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default StageAddBtn;
