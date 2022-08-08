import { createSlice } from "@reduxjs/toolkit";
import { PostData } from "./post";

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
  postModalState: PostData;
  postFormModalOpen: boolean;
  postUpdateFormOpen: boolean;
  postFormButtonOpen: boolean;
  postModalOpen :boolean
}
const initialPostModalState: PostModal = {
  postModalState: {
    id: 0,
    title: null,
    content: null,
    createdTime: null,
    modifiedTime: null,
    postImg: null,
    liked : null,
    likeNum : null,
    writer: null,
  },
  postFormModalOpen: false,
  postUpdateFormOpen: false,
  postFormButtonOpen: false,
  postModalOpen : false
};
export const postModalSlice = createSlice({
  name: "postModal",
  initialState: initialPostModalState,
  reducers: {
    setModalPostState: (state: PostModal, action) => {
      state.postModalState = {...action.payload}
    },
    setPostFormModalOpen: (state: PostModal) => {
      state.postFormModalOpen = !state.postFormModalOpen;
    },
    setPostFormButtonState: (state: PostModal,action) => {
      state.postFormButtonOpen = action.payload
    },
    setPostUpdateFormState: (state: PostModal,action) => {
      state.postUpdateFormOpen = action.payload
    },
    setPostModalState:(state: PostModal,action) => {
      state.postModalOpen = action.payload
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
