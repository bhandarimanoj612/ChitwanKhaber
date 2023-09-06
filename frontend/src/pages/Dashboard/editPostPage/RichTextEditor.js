import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ setContent, contentToSend }) => {
  const editor = useRef(null);
  const [contents, setContents] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: [
        "italic",
        "bold",
        "underline",
        "link",
        "unlink",
        "hr",
        "font",
        "fontsize",
        "symbol",
        "brush",
        "image",
        "fullsize",
      ],
    }),
    []
  );

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="w-[320px] md:w-full">
          <JoditEditor
            ref={editor}
            value={contentToSend}
            config={config}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RichTextEditor;
