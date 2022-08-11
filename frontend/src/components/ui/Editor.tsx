import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};
const Editor: React.FC<{ placeholder: string; value: ReactQuill.Value }> = ({
  placeholder,
  value,
  ...rest
}) => {
  return (
    // 테마 (bubble, snow, custom) https://quilljs.com/docs/themes/
    <ReactQuill
      {...rest}
      placeholder={placeholder}
      value={value || ""}
      theme="snow"
      modules={modules}
      formats={formats}
    ></ReactQuill>
  );
};
// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열

export default Editor;
