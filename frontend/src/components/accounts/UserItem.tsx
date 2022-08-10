import { Link } from "react-router-dom";
import { UserInfo } from "../../store/auth";

const UserItem: React.FC<{ user: UserInfo }> = ({ user }) => {
  console.log(user);
  return (
    <div>
      <Link to={`/user/${user.id}`}>{user.nickname}</Link>
      {!!user.img && <img src={user.img} alt="user Img"></img>}
    </div>
  );
};

export default UserItem;
