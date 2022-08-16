const getTextLength = (str: string) => {
  // 바이트 계산
  // var byte = 0;
  // for (var i = 0; i < str.length; ++i) {
  //   str.charCodeAt(i) > 127 ? (byte += 2) : byte++;
  // }
  // return byte;
  return str.length;
};

export default getTextLength;
