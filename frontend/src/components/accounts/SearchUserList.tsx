import { UserInfo } from "../../store/auth";
import SearchUserItem from "./SearchUserItem";

import styles from "./SearchUserList.module.scss"

const SearchUserList: React.FC<{ users: UserInfo[] }> = ({ users }) => {
  return (
    <div className={styles.userList}>
        {users.map((user) => (
          <SearchUserItem key={user.id} user={user}></SearchUserItem>
        ))}
    </div>
  );
};

export default SearchUserList;
