import { UserInfo } from "../../store/auth";
import UserItem from "./UserItem";

import styles from "./UserList.module.scss"

const UserList: React.FC<{ users: UserInfo[] }> = ({ users }) => {
  return (
    <div className={styles.userList}>
        {users.map((user) => (
          <UserItem key={user.id} user={user}></UserItem>
        ))}
    </div>
  );
};

export default UserList;
