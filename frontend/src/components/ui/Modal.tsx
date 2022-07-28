import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SIZE_FULL_HEIGHT, SIZE_FULL_WIDTH } from "~/commons/constans/Size";
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  body: any;
}
const CommponModal = (props: Props) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={styles.container}>
        <View
          style={styles.blankSpace}
          onTouchEnd={() => props.setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
        />
        {props.body}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blankSpace: {
    position: "absolute",
    width: SIZE_FULL_WIDTH,
    height: SIZE_FULL_HEIGHT,
    backgroundColor: "#000000",
    opacity: 0.8,
  },
});
export default CommponModal;
