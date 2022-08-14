
import moggozi from "../../asset/moggozi.png"
import styles from "./Footer.module.scss";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div>
        <div>
          <div className={styles.block}>
            <div className={styles.navigate}>
              <div>Navigate</div>
              <div onClick={() => { navigate("/") }}>Main</div>
              <div onClick={() => { navigate("/challenge") }}>Challenge</div>
              <div onClick={() => { navigate("/post/all") }}>Posting</div>
              <div onClick={() => { navigate("/") }}>about</div>
              <div onClick={() => { navigate("/search") }}>Search</div>
            </div>
            
            <div className={styles.creator}>
              <div className={styles.team}>Create by Team Moggozi<GitHubIcon /> </div>
              <div className={styles.group}>
                <div>
                  <a href="https://github.com/WeedInGist" target="_blank" rel="noopener noreferrer">Cho Seongmin</a>
                  <a href="https://github.com/nomzaxs" target="_blank" rel="noopener noreferrer">Park Sanghyun</a>
                  <a href="https://github.com/junghojin" target="_blank" rel="noopener noreferrer">Jung hojin</a>
                </div>
                <div>
                  <a href="https://github.com/seho27060" target="_blank" rel="noopener noreferrer">Park Seho</a>
                  <a href="https://github.com/yunhlim" target="_blank" rel="noopener noreferrer">Lim Yunhyeok</a>
                  <a href="https://github.com/DasisCore" target="_blank" rel="noopener noreferrer">Heo Jaeyeong</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}><img src={moggozi} alt="" /><div>ⓒ 2022 Moggozi, All right reseved.</div></div>
        </div>
        <div>
      </div>

    </div>
  );
};

export default Footer;
