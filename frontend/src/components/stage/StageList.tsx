import React, { MouseEvent, useState } from "react";
import { StageState } from "../../store/stage";
import StageItem from "./StageItem";

import styles from "./StageList.module.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { setPostingStageId } from "../../store/post";

const StageList: React.FC<{
  stages: StageState[];
  challengeProgress: number;
}> = ({ stages, challengeProgress }) => {
  const [value, setValue] = useState(0);
  const [choice, setChoice] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const [showStageId, setShowStageId] = useState(
    stages.length !== 0 ? stages[0].id : null
  );

  const stageSelectHandler = (
    event: React.MouseEvent,
    id: number,
    index: number
  ) => {
    event.preventDefault();
    setChoice(index);
    dispatch(setPostingStageId(id));
  };

  return (
    <Box className={styles.tabs}>
      {/* <div className={styles.tabs}> */}
      <Tabs
        sx={{
          borderBottom: "2px solid #afafaf",
          // color: "blue",
          px: 3,
          // fontSize: "60px",
        }}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        textColor="inherit"
        // textColor={{
        //   style: {
        //     color: "black",
        //   }
        // }}
        // indicatorColor="secondary"
        TabIndicatorProps={{
          style: {
            background: "rgba(81, 255, 20, 0.62)",
            height: "10px",
            bottom: "10px",
          },
        }}
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {stages.map((stage, index) => (
          <Tab
            key={stage.id}
            onClick={(event: MouseEvent) => {
              stageSelectHandler(event, stage.id!, index);
            }}
            // disabled={value === stage.id}
            label={`${index + 1}. ${stage.name}`}
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              fontFamily: "Noto Sans",
              // textIndent: "15px",
              textAlign: "center",
              marginRight: "20px",
              px: 1,
            }}
          />
        ))}
      </Tabs>
      <div style={{ height: "1000px" }}>
        {stages.map((stage, index) => (
          <div key={stage.id}>
            {choice === index && (
              <StageItem
                stage={stage}
                index={index}
                challengeProgress={challengeProgress}
              />
            )}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default StageList;
