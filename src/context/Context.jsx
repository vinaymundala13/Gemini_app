import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";  
  const apiKey = "AIzaSyBLmFPEU4MFXOajUav3dWVSOCKNtzAGav8"; 
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95, 
    topK: 40, 
    maxOutputTokens: 8192, 
    responseMimeType: "text/plain",
  };
  
const ContextProvider =(props)=>{
    const[input,setInput] =useState("");
    const[recentPrompt,setRecentPrompt] =useState("");
    const[prevPrompts,setPrevPrompts] =useState([]);
    const[showResult,setShowResult] =useState(false);
    const[loading,setLoading] =useState(false);
    const[resultData,setResultData] =useState("");

    const delay=(index,nextWord)=>{
            setTimeout(function() {
                setResultData(prev => prev+nextWord)
            }, 75*index);
    }

    const newChat=()=>{
      setLoading(false);
      setShowResult(false);
    }

    const onSent = async (prompt) => {
        const currentPrompt = prompt ?? input.trim();
        if(!currentPrompt) return;
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
          setRecentPrompt(input);
          setPrevPrompts(prev=>[...prev,input])
          response = await run(input)
        try {
            const chatSession = model.startChat({
                generationConfig,
                history: [],
              });
              
              let responseArray = response.split("**");
              let newResponse="";
              for(let i=0;i<responseArray.length;i++){
                if(i==0 || i%2!=1){
                    newResponse += responseArray[i];
                }
                else{
                    newResponse += "<b>" + responseArray[i]+"</b>"
                }
              }
              let newResponse2 = newResponse.split("*").join("</br>")
              let newResponseArray = newResponse2.split(" ");
              for(let i=0;i<newResponseArray.length;i++){
                const nextWord = newResponseArray[i];
                delay(i,nextWord+" ")
              } 
        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData("An error occurred while processing your request.");
        } finally {
            setLoading(false);
            setInput("");
        }
    };
    
    const contextValue ={
       prevPrompts,
       setPrevPrompts,
       onSent,
       setRecentPrompt,
       recentPrompt,
       showResult,
       loading,
       resultData,
       input,
       setInput,
       newChat,
    };
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;


