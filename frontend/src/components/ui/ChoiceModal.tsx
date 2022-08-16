import React, { ReactElement, useEffect } from "react";
import styles from "./ChoiceModal.module.scss"

interface Props {
  open: boolean;
  close: () => void;
  choice1: () => void;
  choice2: (event: React.MouseEvent) => void;
  header: string;
  children: React.ReactNode;
}

const ChoiceModal = (props: Props): ReactElement => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, choice1, choice2, header } = props;
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
            <div className={styles.buttons}>
              <button className={styles.close} onClick={choice1}>
                취소
              </button>
              <button className={styles.close} onClick={choice2}>
                확인
              </button>
            </div>
          </footer>
        </section>
      ) : null}
    </div>
    </div>
  );
};

export default ChoiceModal;
