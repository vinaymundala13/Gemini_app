import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } =
    useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Vinay</span>
              </p>
              <p>Your digital companion is here. What would you like to explore today?</p>
            </div>
            <div className="card-container">
              <div className="card">
                <p>Explore new ideas that inspire creativity and broaden your perspective.</p>
                <img src={assets.compass_icon} alt="compass" />
              </div>
              <div className="card">
                <p>Find insights and inspiration to fuel your projects and ambitions.</p>
                <img src={assets.bulb_icon} alt="light bulb" />
              </div>
              <div className="card">
                <p>Connect and chat with me for assistance or friendly conversation.</p>
                <img src={assets.message_icon} alt="chat" />
              </div>
              <div className="card">
                <p>Get code solutions to enhance your projects and solve challenges.</p>
                <img src={assets.code_icon} alt="code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ?
                <div className="loader">
                  <hr/>
                  <hr/>
                  <hr/>
                </div>
                :
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search for something..."
            />
            <div className="s_img">
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={onSent} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini can make mistakes, double check your response
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
