import React, { useState, useEffect, useRef } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef(null);

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  const toggleChat = () => {
    setShowChat((prev) => !prev); // Toggle the showChat state
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!playersJoined) {
    return <div> Waiting for other player to join...</div>;
  }

  return (
    <div className="preline h-screen flex flex-col relative">
      <div className="bg-gray-800 text-white py-4 px-6">
        <button
          className="text-white text-lg font-bold"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          Leave Game
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Board result={result} setResult={setResult} />
      </div>
      {showChat && (
        <div
          ref={chatRef}
          className="absolute inset-x-0 bottom-0 w-2/3 bg-white border-t border-gray-200 animate-fade-in"
        >
          <div className="bg-gray-800 text-white py-4 px-6">
            <button
              className="text-green text-lg font-bold cursor-pointer"
              onClick={toggleChat}
            >
              Close Chat
            </button>
          </div>
          <div className="bg-white p-4">
            <Window>
              <MessageList
                disableDateSeparator
                closeReactionSelectorOnClick
                hideDeletedMessages
                messageActions={["react"]}
              />
              <MessageInput noFiles />
            </Window>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 right-4">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
            showChat ? "hidden" : ""
          }`}
          onClick={toggleChat}
        >
          Open Chat
        </button>
      </div>
      {result.state === "won" && <div> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div> Game Tieds</div>}
    </div>
  );
}

export default Game;
