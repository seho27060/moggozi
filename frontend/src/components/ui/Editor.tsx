import { useState, useMemo, useEffect, useRef, MouseEvent } from "react";
import styles from "./Editor.module.scss";
//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
const EditorComponent: React.FC<{
  QuillRef: React.MutableRefObject<ReactQuill | undefined>;
  value: ReactQuill.Value;
  maxlength : number
}> = ({ QuillRef, value,maxlength }) => {
  const [contents, setContents] = useState<ReactQuill.Value>(value);
  let textCountRef = useRef(0);

  class Counter {
    quill: any;
    options: any;
    container: any;
    constructor(
      quill: { on: (arg0: string, arg1: () => void) => void },
      options: { container: any }
    ) {
      this.quill = quill;
      this.options = options;
      this.container = document.querySelector(options.container);
      quill.on("text-change", this.update.bind(this));
      this.update(); // Account for initial contents
    }

    calculate() {
      let text = this.quill.getText().trim();
      if (this.options.unit === "word") {
        text = text.trim();
        // Splitting empty text returns a non-empty array
        return text.length > 0 ? text.split(/\s+/).length : 0;
      } else {
        return text.length;
      }
    }

    update() {
      var length = this.calculate();
      var label = this.options.unit;
      if (length !== 1) {
        label += "s";
      }
      this.container.innerText = length +"/"+maxlength.toString()+"자";
    }
  }
  Quill.register("modules/counter", Counter);

  Quill.register(
    "modules/maxlength",
    function (
      quill: {
        on: (arg0: string, arg1: (e: any) => void) => void;
        getText: () => any;
        history: { undo: () => void };
      },
      options: { value: number }
    ) {
      quill.on("text-change", function (e) {
        let size = quill.getText();
        if (size.length > options.value) quill.history.undo();
      });
    }
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          [],
        ],
      },
      counter: {
        container: "#counter",
        unit: "character",
      },
      maxlength: { value: maxlength },
      history: { delay: 100, userOnly: true },
    }),
    []
  );
  return (
    <div>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        className={styles.Editor}
      />
      <div id="counter"></div>
    </div>
  );
};

export default EditorComponent;
