// stage store에서 스테이지 번호를 갱신하고..접근해야하ㅡ나?

import { GoBackButton } from "../../layout/HistoryButton";
import { Link } from "react-router-dom";
import PostList from "../post/PostList";
import { StageState } from "../../store/stage";

const StageDetailItem: React.FC<{ stage: StageState }> = ({ stage }) => {
  return (
    <div>
      StageDetail
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        <h2>{stage.id}번 stage item 입니다.</h2>
        <p>{stage.challengeId}</p>
        <p>{stage.name}</p>
        <p>{stage.postOrder}</p>
        <p>{stage.period}</p>
        <p>{stage.content}</p>
        <img src={stage.stageImg} alt="img" />
      </div>
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        {/* <PostList posts={stage.postList} /> */}
      </div>
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        <GoBackButton />
        <Link
          to={`/stage/${stage.id}/update`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <button>수정하기</button>
        </Link>
        {/* 삭제하기 버튼 필요 */}
      </div>
    </div>
  );
};

export default StageDetailItem;
