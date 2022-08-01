import { useParams } from "react-router-dom";
import StageDetailItem from "../../components/stage/StageDetailItem";

export interface postWriter {
  id: number;
  name: string | null;
}

export interface postItem {
  id: number;
  title: string | null;
  like_count: number | null;
  img: string | null;
  writer: postWriter;
}
export interface StageDetailType {
  stage_id: number;
  challenge_id: number | null;
  name: string | null;
  period: number | null;
  content: string | null;
  stage_img: string | undefined;
  order: number | null;
  children?: React.ReactNode;
  postings: postItem[];
}
function StageDetail() {
  // 해당 페이지로 이동시 스테이지 내용 + 포스팅 가져오기
  const { id } = useParams(); // 변수라우팅을 통한 변수 할당.
  // 가져온다는 보장에 dummy는 같은 내용 기입.

  // 더미데이터 생성인데 이거 응용해서 데이터 받기
  // const itemDummy: StageDetailType = {
  //   stage_id: stage.stage_id,
  //   challenge_id: stage.challenge_id,
  //   name: stage.name,
  //   period: stage.period,
  //   content: stage.content,
  //   stage_img: stage.stage_img,
  //   order: stage.order,
  //   postings: [
  //     {
  //       id: 1,
  //       title: "post title 1",
  //       like_count: 5,
  //       img: "img path 1",
  //       writer: {
  //         id: 26,
  //         name: "박세호",
  //       },
  //     },
  //     {
  //       id: 2,
  //       title: "post title 2",
  //       like_count: 999,
  //       img: "img path 2",
  //       writer: {
  //         id: 35,
  //         name: "이명호",
  //       },
  //     }
  //   ],
  // };

  return (
    <div>
      {/* <StageDetailItem stage={itemDummy} /> */}
      {/* 요청을 통한 정보를 넣어야함 */}
    </div>
  );
}

export default StageDetail;
