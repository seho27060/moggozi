import { Link } from "react-router-dom";
import { UserInfo } from "../../store/auth";

import styles from "./UserItem.module.scss";

const UserItem: React.FC<{ user: UserInfo; close: () => void }> = ({
  user,
  close,
}) => {
  console.log(user);
  return (
    <div className={styles.items}>
      ㅁ {!!user.img && <img src={user.img} alt="user Img"></img>}
      <Link to={`/user/${user.id}`} onClick={close}>
        {user.nickname}
      </Link>
    </div>
  );
};

export default UserItem;
