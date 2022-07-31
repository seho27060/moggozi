import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import Api from "../../lib/customApi"

function UserPage() {
  const currentState = useSelector((state: RootState) => state.user);
  
  const userInfo = async () => {
    const { data } = await Api.get(`user/${currentState.userInfo.userId}`)
    return data
  }
  // 데이터가 어떻게 오는지 보고 판단해야 할 듯
  console.log(userInfo)
  
  return (
    <div>
      UsersPage
    </div>
  );
}

export default UserPage;
