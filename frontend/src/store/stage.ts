import { createSlice } from "@reduxjs/toolkit";

export interface Stage {
  stage_id : number;
  challenge_id: number | null;
  name: string | null;
  period: number | null;
  content: string | null;
  stage_img: string | undefined;
  order: number | null;
  children?: React.ReactNode;
}

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
