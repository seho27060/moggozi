import { post, posting } from "./post";

export interface stage {
  stageId : number | null,
  challengeId : number | null,
  name : string | null,
  period : number | null,
  content : string | null,
  stageImg : string | undefined,
  createTime : number | null,
  updateTime : number | null,
  order : number | null,
}

export interface stageDetail {
  stageId : number | null,
  challengeId : number | null,
  name : string | null,
  period : number | null,
  content : string | null,
  stageImg : string | undefined,
  createTime : number | null,
  updateTime : number | null,
  order : number | null,
  postings : posting[] | null
}
// export const stageSlice = createSlice({
//     name : "stageInfo",
//     initialState,
//     reducers: {
//         stageAdd : () => {

//         },
//         stageRemove : () => {

//         },
//         stageUpdate : () => {

//         }
//     }
// })

// export const { stageAdd, stageRemove, stageUpdate } = stageSlice.actions

// export default stageSlice.reducer
