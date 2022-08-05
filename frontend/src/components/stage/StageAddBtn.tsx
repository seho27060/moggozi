import { useState } from "react";
import { StageState } from "../../store/stage";
import Modal from "../ui/Modal";
import StageForm from "./StageForm";

const StageAddBtn: React.FC<{ stage: StageState }> = ({ stage }) => {
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
        <StageForm stage={stage} />
      </Modal>
    </div>
  );
};

export default StageAddBtn;
