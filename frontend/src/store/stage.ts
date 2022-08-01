import { createSlice } from "@reduxjs/toolkit";
import { Stage } from "../pages/stage/StageMain";

export interface StageState {
  stageInfo: Stage;
}

const initialState: StageState = {
  stageInfo: {
    stage_id: 0,
    challenge_id: 0,
    name: "",
    period: 0,
    content: "",
    stage_img: "",
    order: 0,
  },
};


export const stageSlice = createSlice({
    name : "stageInfo",
    initialState,
    reducers: {
        stageAdd : () => {

        },
        stageRemove : () => {

        },
        stageUpdate : () => {

        }
    }
})

export const { stageAdd, stageRemove, stageUpdate } = stageSlice.actions

export default stageSlice.reducer
