// stage store에서 스테이지 번호를 갱신하고..접근해야하ㅡ나?

import { Stage } from "../../pages/stage/StageMain"
import { GoBackButton } from "../../layout/HistoryButton"
const StageDetailItem: React.FC<{stage : Stage}> = ({stage}) => {
  return(<div>
      <div></div>
      StageDetail
      <h2>{stage.stage_id}번 stage item 입니다.</h2>
      <p>{stage.challenge_id}</p>
      <p>{stage.name}</p>
      <p>{stage.order}</p>
      <p>{stage.period}</p>
      <p>{stage.content}</p>
      <img src={stage.stage_img} alt="img" />
      <GoBackButton/>
  </div>)
}

export default StageDetailItem