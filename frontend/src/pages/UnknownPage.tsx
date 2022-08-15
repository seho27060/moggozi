import styles from "./UnknownPage.module.scss"

function UnknownPage() {
  return (
  <div className={styles.container}>
    <div className={styles.unknown}>
      <div>
        <span>4</span><span>0</span><span>4</span>
      </div>
      <div>요청한 페이지를 찾을 수 없습니다.</div>
      <div>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</div>
    </div>
  </div>);
}

export default UnknownPage;
