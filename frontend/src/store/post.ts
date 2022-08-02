import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  post_id : number|null,
  member_id : number|null,
  stage_id : number|null,
  title : string|null,
  content: string|null,
  post_time : Date|null,
  update_time : Date|null,
  post_img : string|null
}

interface PostState {
  postInfo : Post
}

const initialState: PostState = {
  postInfo : {
    post_id : 0,
    member_id : 0,
    stage_id : 0,
    title : "",
    content: "",
    post_time : null,
    update_time : null,
    post_img : ""
  }
}
export interface postWriter {
  id: number;
  name: string | null;
}

export interface postItem {
  id: number;
  title: string | null;
  like_count: number | null;
  img: string | null;
  writer: postWriter;
}
export const postSlice = createSlice({
  name: 'postInfo',
  initialState,
  reducers:{
    postAdd: () => {

    },
    postRemove: () => {

    },
    postUpdate: () => {

    },
  }
})

export const { postAdd, postRemove, postUpdate} = postSlice.actions

export default postSlice.reducer