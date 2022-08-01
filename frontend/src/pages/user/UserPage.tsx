// import type { RootState } from "../../store/store";
// import { useSelector } from "react-redux";

import { userDetail } from "../../lib/withTokenApi"

function UserPage() {
    
  console.log(userDetail())

  return (
    <div>
      UsersPage
    </div>
  );
}

export default UserPage;
