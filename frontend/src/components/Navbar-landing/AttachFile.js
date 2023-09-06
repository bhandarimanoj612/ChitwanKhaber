import { useState, useRef } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

function AttachFile() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Do something with the file
    console.log(file);
    const mailtoLink = `mailto:${"khalifa@gmail.com"}?subject=${encodeURIComponent(
      "Job Application"
    )}&body=Please find attached my CV for the job application.`;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("attachment", selectedFile);
      mailtoLink += "&attachment=" + encodeURIComponent(selectedFile.name);
    }

    window.location.href = mailtoLink;
  };

  return (
    <div className="flex items-center justify-center">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      <MdOutlineAttachFile
        className="text-gray-200 text-xl cursor-pointer"
        onClick={handleIconClick}
      />
      {selectedFile && (
        <span className="text-gray-300 font-thin md:font-normal text-xs md:text-sm flex gap-2 items-center justify-center  flex-nowrap">
          {selectedFile.name}{" "}
          <AiOutlineClose
            className="cursor-pointer bg-gray-400 bg-opacity-10 font-thin text-gray-300 hover:text-gray-100 rounded-full text-xs"
            onClick={() => {
              setSelectedFile(null);
              fileInputRef.current.value = "";
            }}
          />
        </span>
      )}
      {!selectedFile && (
        <p className="text-xs md:text-thin text-gray-400">CV</p>
      )}
    </div>
  );
}

export default AttachFile;
