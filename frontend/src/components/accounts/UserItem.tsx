import { Link } from "react-router-dom";
import { UserInfo } from "../../store/auth";

import styles from "./UserItem.module.scss";
import PortraitIcon from "@mui/icons-material/Portrait";

const UserItem: React.FC<{ user: UserInfo; close: () => void }> = ({
  user,
  close,
}) => {
  return (
    <div className={styles.items}>
      <PortraitIcon />
      {/* {!!user.img && <img src={user.img} alt="user Img"></img>} */}
      <Link to={`/user/${user.id}`} onClick={close}>
        {user.nickname}
      </Link>
    </div>
  );
};

export default UserItem;
