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
        setIsLoading(false);
        setItems(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
    <div>
      <h3>StageEdit</h3>
      {isLoading === true && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {isLoading === false && (
        <div>
          <hr />
          {/* 순서 바꾸는 곳 */}
          {isOrderEdit ? (
            <div className={styles.container}>
              <button onClick={orderFormHandler}>순서 변경 취소</button>
              <hr />
              <SortableList
                items={items}
                setItems={setItems}
                itemRender={({ item }: ItemRenderProps) => (
                  <div className={styles.container}>
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
              <hr />
              <button onClick={orderChangeHandler}>순서 수정</button>
            </div>
          ) : (
            <div>
              <StageAddBtn />
              <hr />
              <ul className={styles.container}>
                {stages.map((stage, index) => (
                  <li key={stage.id}>
                    <StageEditItem stage={stage} index={index} />
                    <StageUpdateBtn stage={stage} />
                    <StageDeleteBtn id={stage.id!} />
                  </li>
                ))}
              </ul>
              <hr />
              <button onClick={orderFormHandler}>순서 변경</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StageEdit;
