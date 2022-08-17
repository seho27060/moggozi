import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageDelete } from "../../lib/withTokenApi";
import { stageFetch } from "../../store/stage";

import styles from "./StageDeleteBtn.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../ui/Modal";

const StageDeleteBtn: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const { challengeId } = useParams();
  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);

  const closeAlertModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
      document.body.style.height = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [modalOpen]);

  const deleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      stageDelete(id)
        .then((res) => {
          setAlertText(<div>스테이지 본문이 필요합니다.</div>);
          setModalOpen(true);
          fetchStages(Number(challengeId!)).then((res) => {
            dispatch(stageFetch(res));
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  return (
    <div>
      <div className={styles.delete} onClick={deleteHandler}>
        <CloseIcon />
      </div>
      <Modal open={modalOpen} close={closeAlertModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};

export default StageDeleteBtn;
