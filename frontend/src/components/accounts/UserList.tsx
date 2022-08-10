import { UserInfo } from "../../store/auth";
import UserItem from "./UserItem";

const UserList: React.FC<{ users: UserInfo[] }> = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <UserItem key={user.id} user={user}></UserItem>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
