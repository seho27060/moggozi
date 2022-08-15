import { UserInfo } from "../../store/auth";
import SearchUserItem from "./SearchUserItem";

import styles from "./SearchUserList.module.scss"

const SearchUserList: React.FC<{ users: UserInfo[] }> = ({ users }) => {
  return (
    <div className={styles.userList}>
      <div>
        {users.map((user) => (
          <SearchUserItem key={user.id} user={user}></SearchUserItem>
        ))}
      </div>
      {users.length === 0 && <div className={styles.noUserList}><div>검색 결과가 존재하지 않습니다.</div></div>}
    </div>
  );
};

export default SearchUserList;
