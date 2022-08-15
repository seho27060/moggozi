import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StageAddBtn from "../../components/stage/StageAddBtn";
import StageDeleteBtn from "../../components/stage/StageDeleteBtn";
import StageEditItem from "../../components/stage/StageEditItem";
import StageUpdateBtn from "../../components/stage/StageUpdateBtn";
import { fetchStages, stageOrderChange } from "../../lib/withTokenApi";
import { stageFetch } from "../../store/stage";
import { RootState } from "../../store/store";
import styles from "./StageEdit.module.scss";

import {
  SortableList,
  SortableItemProps,
  ItemRenderProps,
} from "@thaddeusjiang/react-sortable-list";
import DOMPurify from "dompurify";
import Loader from "../../components/ui/Loader";

const StageEdit: React.FC = () => {
  const { challengeId } = useParams();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const stages = useSelector((state: RootState) => state.stages);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [items, setItems] = useState<SortableItemProps[]>([]);
  const [isOrderEdit, setIsOrderEdit] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchStages(Number(challengeId))
      .then((res) => {
        dispatch(stageFetch(res));
        setItems(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    document.body.style.overflow = "auto";
  }, [challengeId, isLoggedIn, dispatch, isOrderEdit]);

  const orderChangeHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    items.map((item, index) => {
      return stageOrderChange(Number(item.id), index + 1)
        .then((res) => {
          console.log(item.id);
          console.log(index);
          console.log("순서 변경 완료");
          setIsOrderEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const orderFormHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOrderEdit(!isOrderEdit);
  };

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <div className={styles.title}>스테이지</div>

        {isLoading === true && <Loader />}
        {isLoading === false && (
          <div>
            {isOrderEdit ? (
              <div>
                <div className={styles.stageBox}>
                  <SortableList
                    items={items}
                    setItems={setItems}
                    itemRender={({ item }: ItemRenderProps) => (
                      <div className={styles.box}>
                        <p>제목: {item.name}</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.content.toString()),
                          }}
                          className="view ql-editor"
                        ></div>
                      </div>
                    )}
                  />
                </div>
                <div className={styles.orderBtn}>
                  <button onClick={orderFormHandler}>취소</button>
                  <button onClick={orderChangeHandler}>수정 완료</button>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.stageBox}>
                  {stages.map((stage, index) => (
                    <div key={stage.id} className={styles.box}>
                      <StageEditItem stage={stage} index={index} />
                      <StageUpdateBtn stage={stage} index={index} />
                      <StageDeleteBtn id={stage.id!} />
                    </div>
                  ))}
                  <StageAddBtn />
                </div>
                <div className={styles.orderBtn}>
                  <button onClick={orderFormHandler}>순서 변경</button>
                  <button>완료</button>
                </div>
              </div>
            )}
          </div>
        )}
        <div className={styles.horizon}></div>

        <div className={styles.explain}>
          <div>스테이지 수정에 대한 간략한 설명</div>
          <div>ㆍ스테이지는 + 를 눌러 추가할 수 있어요!</div>
          <div>ㆍ이미지는 스테이지를 추가한 후 수정할 때 추가할 수 있어요.</div>
          <div>ㆍ순서 변경을 클릭해 순서를 바꿀 수 있어요.</div>
        </div>
      </div>
    </div>
  );
};

export default StageEdit;
