import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css"; // Import your custom styles

const Editor = ({ values, setFieldValue }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        // Custom handler for image upload
        image: function () {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();

                // Insert image with custom size (20px)
                const img = `<img src="${e.target.result}" style="width: 20px;"/>`;
                quill.clipboard.dangerouslyPasteHTML(range.index, img);
              };
              reader.readAsDataURL(file);
            }
          };
        },
      },
    },
  };
  // useEffect(() => {
  //   const quill = quillRef.current.getEditor();
  //   quill.getModule("toolbar").container = "#toolbar";
  // }, []);

  return (
    <div>
      <div id="toolbar">
        <select className="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <div className="divider"></div> {/* Divider */}
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <div className="divider"></div> {/* Divider */}
        <button
          className="ql-align"
          value=""></button>
        <button
          className="ql-align"
          value="center"></button>
        <button
          className="ql-align"
          value="right"></button>
        {/* <button
          className="ql-align"
          value="justify"></button> */}
        <div className="divider"></div> {/* Divider */}
        <button className="ql-image mr-2"></button> {/* Image button */}
        {/* <button className="ql-link">Link</button>
        <button className="ql-video">Video</button>
        <button className="ql-formula">Formula</button> */}
      </div>
      <ReactQuill
        ref={quillRef}
        value={values.reply}
        onChange={(content) => setFieldValue("reply", content)}
        modules={{ toolbar: "#toolbar" }}
        className=" h-[280px]"
      />
    </div>
  );
};

export default Editor;
