// 다르게 쓰일까 싶어서 메인으로 가는 모달은 따로 빼둠.
// 스타일링 하는 과정에서 다시 기존 Modal로 병합될 가능성 농후 - 재영

import React, { ReactElement} from 'react';

import styles from "./ReturnMainModal.module.scss"

interface Props {
  open: boolean;
  close: () => void;
  header: string;
  children: React.ReactNode;
}

const ReturnMainModal = (props: Props): ReactElement => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <div className={open ? `${styles.openModal} ${styles.modal}` : `${styles.modal}` }>
    {/* <div className={open ? 'openModal modal' : 'modal'}> */}
      {open ? (
        <section>
          <header>
            <div>{header}</div>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className='close' onClick={close}>
              확인
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ReturnMainModal;