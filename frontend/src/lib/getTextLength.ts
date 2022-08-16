const getTextLength = (str: string) => {
  var byte = 0;
  for (var i = 0; i < str.length; ++i) {
    str.charCodeAt(i) > 127 ? (byte += 2) : byte++;
  }
  return byte;
};

export default getTextLength;
