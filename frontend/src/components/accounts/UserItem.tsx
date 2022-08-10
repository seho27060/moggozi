import { Link } from "react-router-dom";
import { UserInfo } from "../../store/auth";

import styles from "./UserItem.module.scss"

const UserItem: React.FC<{ user: UserInfo }> = ({ user }) => {
  console.log(user);
  return (
    <div className={styles.items}>
      ㅁ <Link to={`/user/${user.id}`}>{user.nickname}</Link>
      {!!user.img && <img src={user.img} alt="user Img"></img>}
    </div>
  );
};

export default UserItem;
