import { createSlice } from "@reduxjs/toolkit";
import { PostTest } from "./post";

export interface PostUpdateSend {
  title: string | null;
  content: string | null;
  postId: number | null;
  postImg: string | null;
}
export interface PostSend {
  memberId : number,
  title: string | null;
  content: string | null;
  stageId: number | null;
  postImg: string | undefined;
}
interface PostModal {
  PostModalState: PostTest | null;
  updatePost: PostSend | null;
  postFormModalOpen: boolean;
  postUpdateFormState: boolean;
  postFormButtonState: boolean;
  postModalState :boolean
}
const initialPostModalState: PostModal = {
  PostModalState: {
    id: 0,
    title: null,
    content: null,
    createdTime: null,
    modifiedTime: null,
    postImg: null,
    postLikeList: null,
    writer: null,
  },
  updatePost: null,
  postFormModalOpen: false,
  postUpdateFormState: false,
  postFormButtonState: false,
  postModalState : false
};
export const postModalSlice = createSlice({
  name: "postModal",
  initialState: initialPostModalState,
  reducers: {
    setModalPostState: (state: PostModal, action) => {
      state.PostModalState!.id = action.payload.id;
      state.PostModalState!.title = action.payload.title;
      state.PostModalState!.content = action.payload.content;
      state.PostModalState!.createdTime = action.payload.createdTime;
      state.PostModalState!.modifiedTime = action.payload.modifiedTime;
      state.PostModalState!.postImg = action.payload.postImg;
      state.PostModalState!.postLikeList = action.payload.postLikeList;
      state.PostModalState!.writer = action.payload.writer;
    },
    setPostFormModalOpen: (state: PostModal) => {
      state.postFormModalOpen = !state.postFormModalOpen;
    },
    setPostFormButtonState: (state: PostModal,action) => {
      state.postFormButtonState = action.payload
    },
    setPostUpdateFormState: (state: PostModal,action) => {
      state.postUpdateFormState = action.payload
    },
    setPostModalState:(state: PostModal,action) => {
      state.postModalState = action.payload
    },
  },
});

export const {
  setModalPostState,
  setPostFormModalOpen,
  setPostFormButtonState,
  setPostUpdateFormState,
  setPostModalState
} = postModalSlice.actions;

export default postModalSlice.reducer;
