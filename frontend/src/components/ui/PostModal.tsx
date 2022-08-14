import React, { ReactElement, useEffect } from "react";
import styles from "./PostModal.module.scss";

interface Props {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
}

const PostModal = (props: Props): ReactElement => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.postModal} onClick={close} >
      <div
        className={
          open ? `${styles.openModal} ${styles.modal}` : `${styles.modal}`
        }
      >
        {/* <div className={open ? 'openModal modal' : 'modal'}> */}
        {open ? (
          <section onClick={(event) => { event.stopPropagation();}}>
            {props.children}
              {/* <button className="close" onClick={close}>
                &times;
              </button> */}
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default PostModal;
