import { useState } from "react";
import SettingDashboard from "../Dashboard";
import EditPopup from "./EditPopup";

const settingsData = {
  general: [
    { type: "title", label: "Title" },
    { type: "desc", label: "Description" },
    { type: "favicon", label: "Favicon" },
  ],
  appearance: [
    { type: "facebook", label: "Facebook Link" },
    { type: "twitter", label: "Twitter Link" },
    { type: "instagram", label: "Instagram Link" },
    { type: "contactEmail", label: "Contact Email" },
    { type: "contactNumber", label: "Contact Number" },
    { type: "address", label: "Address" },
    { type: "copyright", label: "Copyright Details" },
    { type: "logo", label: "Logo" },
  ],
  security: [
    { type: "email", label: "Login Email" },
    { type: "passwords", label: "Login Password" },
  ],
};

function Settings() {
  const [editPopup, setEditPopup] = useState(null);
  const [settings, setSettings] = useState({
    title: "",
    desc: "",
    email: "",
    passwords: "",
    timezone: "",
    favicon: "",
    logo: "",
    twitter: "",
    facebook: "",
    instagram: "",
    contactEmail: "",
    contactNumber: "",
    address: "",
  });

  function openEditPopup(type) {
    setEditPopup(type);
  }

  function closeEditPopup() {
    setEditPopup(null);
  }

  function handleSave(type, value) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [type]: value,
    }));
    closeEditPopup();
  }

  return (
    <div className="flex w-full flex-col px-8">
      <SettingDashboard />
      <div className="flex flex-col bg-gray-100 w-full min-h-screen gap-8 pb-16">
        {/* settings top start*/}
        <div className="flex justify-between py-2 border-b-2 border-b-gray-300 px-4">
          <span className="text-xl font-bold text-dark">Settings</span>
          {/* <div className="flex justify-center items-center flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div> */}
        </div>
        {/* settings top end */}

        <div className="flex flex-col gap-4 px-8 text-sm sm:text-base">
          {Object.keys(settingsData).map((section) => (
            <div key={section} className="flex flex-col gap-4">
              <label
                htmlFor="generalSetting"
                className="font-medium text-gray-400"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)} Settings
              </label>
              {settingsData[section].map(({ type, label }) => (
                <div
                  key={type}
                  className="w-full px-2 py-2 flex flex-col rounded-md border-[1px] border-gray-300 bg-white md:gap-2 cursor-pointer"
                  onClick={() => openEditPopup(type)}
                >
                  <label htmlFor={type} className="font-medium text-dark">
                    {label}
                  </label>
                  <span className="break-all">
                  {type === "passwords" ? (
                    "*".repeat(settings[type].length)
                  ) : type === "logo" || type === "favicon" ? (
                    <img src={settings[type]} alt={type} className={type==='logo'?`w-12 aspect-square`: `w-8 aspect-square`} />
                  ) : (
                    settings[type]
                  )}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Render the EditPopup based on editPopup state */}
      {editPopup && (
        <EditPopup
          type={editPopup}
          value={settings[editPopup]}
          onSave={handleSave}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
}

export default Settings;
