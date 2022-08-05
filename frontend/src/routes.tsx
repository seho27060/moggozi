import { useRoutes } from "react-router-dom";

// Layouts
import MainLayout from "./layout/MainLayout";
import AccountLayout from "./layout/AccountsLayout";
import ChallengeLayout from "./layout/ChallengeLayout";
import PostLayout from "./layout/PostLayout";
import StageLayout from "./layout/StageLayout";
import UserLayout from "./layout/UserLayout";
import SearchLayout from "./layout/SearchLayout";

// Accounts
import Login from "./pages/accounts/Login";
import CompleteSignUp from "./pages/accounts/CompleteSignUp";
import Signup from "./pages/accounts/Signup";
import UserUpdate from "./pages/accounts/UserUpdate";
import UpdatePassword from "./pages/accounts/UpdatePassword";
import PasswordReissue from "./pages/accounts/PasswordReissue";
import Withdrawal from "./pages/accounts/Withdrawal";

//OAuth
import KakaoOAuthRedirectHandler from "./pages/KakaoOAuthRedirectHandler";
import NaverOAuthRedirectHandler from "./pages/NaverOAuthRedirectHandler";
import GoogleOAuthRedirectHandler from "./pages/GoogleOAuthRedirectHandler";

// Challenge
import ChallengeDetail from "./pages/challenge/ChallengeDetail";
import ChallengeNew from "./pages/challenge/ChallengeNew";
import Challenges from "./pages/challenge/Challenges";
import ChallengeUpdate from "./pages/challenge/ChallengeUpdate";

// Post
import PostDetail from "./pages/post/PostDetail";
import PostNew from "./pages/post/PostNew";
import PostUpdate from "./pages/post/PostUpdate";

// Stage

// User
import UserPage from "./pages/user/UserPage";

// Main
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import UnknownPage from "./pages/UnknownPage";
import WebsocketPage from "./pages/WebsocketTest";
import StageEdit from "./pages/stage/StageEdit";
import PostCommentTestPage from "./pages/PostCommentTestPage";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <MainPage />,
        },
      ],
    },
    {
      path: "/search",
      element: <SearchLayout />,
      children: [
        {
          path: "",
          element: <SearchPage />,
        },
      ],
    },
    {
      path: "/oauth/callback/kakao",
      element: <KakaoOAuthRedirectHandler />,
    },
    {
      path: "/oauth/callback/naver",
      element: <NaverOAuthRedirectHandler />,
    },
    {
      path: "/oauth/callback/google",
      element: <GoogleOAuthRedirectHandler />,
    },
    {
      path: "/account",
      element: <AccountLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "complete",
          element: <CompleteSignUp />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "userUpdate",
          element: <UserUpdate />,
        },
        {
          path: "passwordReissue",
          element: <PasswordReissue />,
        },
        {
          path: "updatePw",
          element: <UpdatePassword />,
        },
        {
          path: "withdrawal",
          element: <Withdrawal />,
        },
      ],
    },
    {
      path: "/challenge",
      element: <ChallengeLayout />,
      children: [
        {
          path: "",
          element: <Challenges />,
        },
        {
          path: ":id",
          element: <ChallengeDetail />,
        },
        {
          path: ":id/update",
          element: <ChallengeUpdate />,
        },
        {
          path: "new",
          element: <ChallengeNew />,
        },
      ],
    },
    {
      path: "/post",
      element: <PostLayout />,
      children: [
        {
          path: ":id",
          element: <PostDetail />,
        },
        {
          path: ":id/update",
          element: <PostUpdate />,
        },
        {
          path: "new",
          element: <PostNew />,
        },
      ],
    },
    {
      path: "/stage",
      element: <StageLayout />,
      children: [
        {
          path: ":challengeId",
          element: <StageEdit />,
        },
      ],
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [{ path: ":id", element: <UserPage /> }],
    },
    {
      path: "/websocketTest",
      element: <WebsocketPage />,
    },
    {
      path: "/postcommentTest",
      element: <PostCommentTestPage />,
    },
    {
      path: "/*",
      element: <UnknownPage />,
    },
  ]);
}
