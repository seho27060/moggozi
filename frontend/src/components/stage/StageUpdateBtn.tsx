import { useState } from "react";
import { StageState } from "../../store/stage";
import Modal from "../ui/Modal";
import StageUpdateForm from "./StageUpdateForm";

const StageUpdateBtn: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>수정</button>
      <Modal open={modalOpen} close={closeModal} header="스테이지 수정">
        <StageUpdateForm stage={stage} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default StageUpdateBtn;
