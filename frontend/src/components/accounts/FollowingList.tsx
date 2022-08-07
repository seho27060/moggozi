import { ReactElement } from 'react';
import { useNavigate } from "react-router-dom"

interface Props {
  id: number | null;
  userImg: string | null;
  nickname: string | null;
  close: () => void;
}

const FollowingList = (props: Props): ReactElement =>{
  const navigate = useNavigate();
    const { id, userImg, nickname, close } = props;

    function moveHandler() {
      navigate(`/user/${id}`);
      close()
    }

    return <div style={{display:"flex", margin:"30px"}}>

      <div onClick={moveHandler}><img src={`${userImg}`} alt="profile_image" style={{width:"60px"}} /></div>
      <p onClick={moveHandler}>{ nickname }</p>
    </div>
}

export default FollowingList;