import { Grid } from "@mui/material";
import UserChallengeItem from "../../components/user/UserChallengeItem";
import UserPostItem from "../../components/user/UserPostItem";
import { UserChallengeType, UserPostType } from "../../store/userPage";
import styles from "./UserPage.module.scss";

const UserTabBox: React.FC<{
  nickname: string;
  challenges: UserChallengeType[] | null;
  posts: UserPostType[] | null;
}> = ({ nickname, challenges, posts }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{margin: "30px 0 50px 0"}}>
            {challenges && (
              <>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    padding: "2rem",
                  }}
                >
                  {nickname}의 챌린지
                </p>
                <Grid container spacing={1}>
                  {challenges.map((challenge) => (
                    <Grid key={challenge.id} item xs={3}>
                      <UserChallengeItem userChallenge={challenge} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </div>
          
          <div>
            {posts && (
              <>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    padding: "2rem",
                  }}
                >
                  {nickname}의 포스트
                </p>
                <Grid container spacing={2}>
                  {posts!.map((post) => (
                    <Grid key={post.id} item xs={3}>
                      <UserPostItem userPost={post} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTabBox;
