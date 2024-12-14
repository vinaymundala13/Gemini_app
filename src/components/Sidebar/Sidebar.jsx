import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [modalContent, setModalContent] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState({
    theme: "Light",
    notifications: true, 
  }); 

  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
 
  useEffect(()=>{
    if(settings.theme === "Dark"){
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
    else{
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  },[settings.theme])
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const handleModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === "Light" ? "Dark" : "Light";
    setSettings((prev) => ({
      ...prev,
      theme: newTheme
    }));
    document.body.classList.toggle("dark-mode",newTheme === "Dark");
    document.body.classList.toggle("light-mode",newTheme === "Light");
  };


  const toggleNotifications = () => {
    setSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu-img"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus-icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="message-icon" />
                <p>{item.slice(0, 18)}..</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div
          className="bottom-item recent-entry"
          onClick={() => handleModal("Help")}
        >
          <img src={assets.question_icon} alt="question icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div
          className="bottom-item recent-entry"
          onClick={() => handleModal("History")}
        >
          <img src={assets.history_icon} alt="history icon" />
          {extended ? <p>History</p> : null}
        </div>
        <div
          className="bottom-item recent-entry"
          onClick={() => handleModal("Settings")}
        >
          <img src={assets.setting_icon} alt="settings icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>

      {/* Modal Implementation */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            {modalContent === "Help" && <HelpContent />}
            {modalContent === "History" && <HistoryContent />}
            {modalContent === "Settings" && (
              <SettingsContent
                settings={settings}
                toggleTheme={toggleTheme}
                toggleNotifications={toggleNotifications}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const HelpContent = () => (
  <div>
    <h2>Help</h2>
    <p>Here are some tips and FAQs to get started:</p>
    <ul>
      <li>Click "New Chat" to start a fresh conversation.</li>
      <li>Use the History section to revisit past chats.</li>
      <li>Configure your preferences in the Settings menu.</li>
    </ul>
  </div>
);

const HistoryContent = () => {
  const dummyHistory = [
    { id: 1, title: "Chat with Bot", date: "2024-12-01" },
    { id: 2, title: "Help with React", date: "2024-12-02" },
    { id: 3, title: "JavaScript Debugging", date: "2024-12-03" },
  ];

  return (
    <div>
      <h2>History</h2>
      <p>Your recent chats:</p>
      <ul>
        {dummyHistory.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.title}</strong> - {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SettingsContent = ({ settings, toggleTheme, toggleNotifications }) => (
  <div>
    <h2>Settings</h2>
    <div className="settings-item">
      <p>Theme:</p>
      <button onClick={toggleTheme}>{settings.theme}</button>
    </div>
    <div className="settings-item">
      <p>Notifications:</p>
      <button onClick={toggleNotifications}>
        {settings.notifications ? "On" : "Off"}
      </button>
    </div>
    <div>
      <p>Note: Changes are automatically saved.</p>
    </div>
  </div>
);

export default Sidebar;
