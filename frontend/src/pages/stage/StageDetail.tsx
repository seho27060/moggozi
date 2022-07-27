import { useParams } from "react-router-dom";
import { StageDummy } from "./StageMain";
import StageDetailItem from "../../components/stage/StageDetailItem";

function StageDetail() {
  const { id } = useParams(); // 변수라우팅을 통한 변수 할당.
  const itemDummy = StageDummy[Number(id)-1];

  return (
    <div>
      <StageDetailItem stage = {itemDummy}/>
    </div>
  );
}

export default StageDetail;
