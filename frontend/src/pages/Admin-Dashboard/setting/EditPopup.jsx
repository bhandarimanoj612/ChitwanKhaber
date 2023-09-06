import { useState } from "react";

function EditPopup({ type, value, onSave, onClose }) {
  const [newValue, setNewValue] = useState(value);
  

  const handleSave = () => {
    onSave(type, newValue);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center">
      <div className="w-80 bg-white rounded-md p-4">
        {type === "desc" ? (
          <textarea
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-sm w-full mb-4 resize-none"
          />
        ) : type === "favicon" ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            {newValue && (
              <div className="flex gap-2 items-center">
              <img src={newValue} alt="Favicon" className="w-8 h-8" />
              <span className="text-sm text-blue-500 cursor-pointer" onClick={()=>{setNewValue(null)}}>Remove</span>
              </div>
            )}
            <span className="text-sm italic text-txtLight ">make sure the image is of size 16x16px</span>
          </>
        ): type === "logo" ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            {newValue && (
              <div className="flex gap-2 items-center">
              <img src={newValue} alt="logo" className="w-8 h-8" />
              <span className="text-sm text-blue-500 cursor-pointer" onClick={()=>{setNewValue(null)}}>Remove</span>
              </div>
            )}
            <span className="text-sm italic text-txtLight ">make sure the size of image is less than 100kb</span>
          </>
        ) : (
          <input
            type={type}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-sm w-full mb-4"
          />
        )}
        {/* buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-dark text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
