import { PostData } from "../../store/post";
// import PostForm from "./PostForm";

import styles from "./PostItem.module.scss"
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostItem: React.FC<{post: PostData}> = ({post}) =>{
  
  return(
    <div className={styles.postItem}>
      {post.postImg ? <img src={post.postImg!} alt="" /> : <img src="" alt="" /> }
      <div className={styles.title}>
        {post.title!.length > 18 ? <div>{post.title?.slice(0, 18) + "..."}</div> : <div>{post.title}</div>}
        <div className={styles.name}><FavoriteIcon /> <div>{post.likeNum}</div></div>
      </div>
      <div className={styles.writer}>{post.writer?.nickname}</div>
    </div>
  
  ) 
}
export default PostItem;