import React, { ReactElement, useEffect } from "react";
import styles from "./Modal.module.scss";

interface Props {
  open: boolean;
  close: () => void;
  header: string;
  children: React.ReactNode;
}

const Modal = (props: Props): ReactElement => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div onClick={close}>
    <div className={
        open ? `${styles.openModal} ${styles.modal}` : `${styles.modal}`
      }
    >
      {/* <div className={open ? 'openModal modal' : 'modal'}> */}
      {open ? (
        <section onClick={(event) => { event.stopPropagation(); }}>
          <header>
            {header}
            <button className={styles.close} onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button style={{width: "60px", height: "30px"}}  className={styles.close} onClick={close}>
              확인
            </button>
          </footer>
        </section>
      ) : null}
    </div>
    </div>
  );
};

export default Modal;
