import { createSlice } from "@reduxjs/toolkit";
import ReactQuill, { Value } from "react-quill";
import { PostData } from "./post";

export interface PostUpdateSend {
  title: string | null;
  content: ReactQuill.Value | null;
  postId: number | null;
}
export interface PostSend {
  title: string | null;
  content: Value | string | null;
  stageId: number | null;
}
interface PostModal {
  postModalState: PostData;
  alertPostModalState: PostData;
  postFormModalOpen: boolean;
  postUpdateFormOpen: boolean;
  postFormButtonOpen: boolean;
  postModalOpen: boolean;
  alertPostModalOpen: boolean;
  postModalStageId: number | null;
}
const initialPostModalState: PostModal = {
  postModalState: {
    id: 0,
    title: null,
    content: null,
    createdTime: null,
    modifiedTime: null,
    postImg: [],
    liked: false,
    likeNum: null,
    writer: null,
  },
  alertPostModalState: {
    id: 0,
    title: null,
    content: null,
    createdTime: null,
    modifiedTime: null,
    postImg: [],
    liked: null,
    likeNum: null,
    writer: null,
  },
  postFormModalOpen: false,
  postUpdateFormOpen: false,
  postFormButtonOpen: false,
  postModalOpen: false,
  alertPostModalOpen: false,
  postModalStageId: null,
};
export const postModalSlice = createSlice({
  name: "postModal",
  initialState: initialPostModalState,
  reducers: {
    setModalPostState: (state: PostModal, action) => {
      state.postModalState = { ...action.payload };
    },
    setAlertModalPostState: (state: PostModal, action) => {
      state.alertPostModalState = { ...action.payload };
    },
    setPostFormButtonState: (state: PostModal, action) => {
      state.postFormButtonOpen = action.payload;
    },
    setPostUpdateFormState: (state: PostModal, action) => {
      state.postUpdateFormOpen = action.payload;
    },
    setPostModalOpen: (state: PostModal, action) => {
      state.postModalOpen = action.payload;
    },
    setAlertPostModalOpen: (state: PostModal, action) => {
      state.alertPostModalOpen = action.payload;
    },
    setPostFormModalOpen: (state: PostModal, action) => {
      state.postFormModalOpen = action.payload;
    },
    setPostModalStageId: (state: PostModal, action) => {
      state.postModalStageId = action.payload;
    },
  },
});

export const {
  setModalPostState,
  setAlertModalPostState,
  setPostFormModalOpen,
  setPostFormButtonState,
  setPostUpdateFormState,
  setPostModalOpen,
  setAlertPostModalOpen,
  setPostModalStageId,
} = postModalSlice.actions;

export default postModalSlice.reducer;
