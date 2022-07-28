import { useParams } from "react-router-dom";
import StageUpdateForm from "../../components/stage/StageUpdateForm";
import { StageDummy } from "./StageMain";

function StageUpdate() {
  // store에 현재 보고있는 챌린지의 스테이지 리스트 정보 저장해서 가져와야함
  // router v6 부터는 link에 props를 할당하지 못함 ㅠㅠ
  const {id} = useParams()
  const itemDummy = StageDummy[Number(id)-1]
  return (
  <div>
    StageUpdate
    <StageUpdateForm stage = {itemDummy}/>
  </div>
  )
}

export default StageUpdate;
