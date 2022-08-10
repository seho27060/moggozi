import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { otherUserDetail } from "../../lib/generalApi";
import { UserInfo } from "../../store/auth";

import styles from "./SearchUserItem.module.scss";

const SearchUserItem: React.FC<{ user: UserInfo }> = ({ user }) => {
  const [nickname, setNickname] = useState("");
  const [isPrivate, setIsPrivate] = useState("");
  const [img, setImg] = useState("");
  const [introduce, setIntroduce] = useState("");

  useEffect(() => {
    otherUserDetail(user.id, 0)
      .then((res) => {
        setNickname(res.nickname);
        setIsPrivate(res.isPrivate);
        setImg(res.img);
        setIntroduce(res.introduce);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Link to={`/user/${user.id}`} className={styles.link}>
      <div className={styles.items}>
        {img ? (
          <img src={img} alt="" />
        ) : (
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUaworQRvFcmCL5AwklqSA8jkWoW56F00JdA&usqp=CAU"
            }
            alt=""
          />
        )}
        <div className={styles.info}>
          <div className={styles.title}>
            <div>{nickname}</div>
            {isPrivate ? <div>프로필 / 비공개</div> : <div>프로필 / 공개</div>}
            {/* <div>{isPrivate}</div> */}
          </div>
          <div className={styles.introduce}>{introduce}</div>
        </div>
      </div>
    </Link>
  );
};

export default SearchUserItem;
