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
          {challenges && (
            <>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  padding: "1rem 3.3rem",
                  fontFamily: "ui-serif",
                }}
              >
                {nickname}의 챌린지
              </p>
              <Grid container spacing={2} style={{ minHeight: "20rem" }}>
                {challenges.map((challenge) => (
                  <Grid key={challenge.id} item xs={3}>
                    <UserChallengeItem userChallenge={challenge} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          {challenges && posts && (
            <hr
              style={{
                border: "solid 3px",
                color: "#9b78ff",
                margin: "1rem 4rem",
              }}
            />
          )}
          {posts && (
            <>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  padding: "1rem 3.3rem",
                  fontFamily: "ui-serif",
                }}
              >
                {nickname}의 포스트
              </p>
              <Grid container spacing={2} style={{ minHeight: "20rem" }}>
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
  );
};

export default UserTabBox;
