
import styles from "./Paging.module.scss";

const Paging: React.FC<{
  page: number;
  totalPages: number;
  clickPageHandler: (event: React.MouseEvent, page: number) => void;
}> = ({ page, totalPages, clickPageHandler }) => {

  const pageArr = [page - 2, page - 1, page, page + 1, page + 2];
  console.log(page)
  
  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={(e) => clickPageHandler(e, 1)}
        disabled={page === 1}
      >
        &laquo;
      </button>
      <button
        className={styles.button}
        onClick={(e) => clickPageHandler(e, page - 1)}
        disabled={page === 1}
      >
        &lsaquo;
      </button>
      {pageArr.map((item) => {
        return (
          item > 0 &&
          item <= totalPages && (
            <button
              key={item}
              className={(item === page ? (styles.pageSelection, styles.button) : (styles.button))}
              onClick={(e) => clickPageHandler(e, item)}
            >
              {item}
            </button>
          )
        );
      })}
      <button
        className={(styles.paginationButton, styles.button)}
        onClick={(e) => clickPageHandler(e, page + 1)}
        disabled={page === totalPages}
      >
        &rsaquo;
      </button>
      <button
        className={(styles.paginationButton, styles.button)}
        onClick={(e) => clickPageHandler(e, totalPages)}
        disabled={page === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Paging;
