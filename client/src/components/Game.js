import React, { useState, useEffect, useRef } from "react";
import Board from "./Board";
import {
  Window,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

function Game({ channel, setChannel }) {
  const { client } = useChatContext();
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [showChat, setShowChat] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const chatRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const updateUnreadCount = () => {
      const currentUserId = client.userID;
      const lastRead = channel.state.read[currentUserId]?.last_read;
      const unreadMessages = channel.state.messages.filter(
        (message) =>
          message.created_at > lastRead && message.user.id !== currentUserId
      ).length;
      setUnreadCount(unreadMessages);
    };

    channel.on("user.watching.start", (event) => {
      setPlayersJoined(event.watcher_count === 2);
    });

    channel.on("message.new", (event) => {
      if (event.user.id !== client.userID && !showChat) {
        updateUnreadCount();
      }
    });

    channel.on("message.read", (event) => {
      if (event.user.id === client.userID) {
        setUnreadCount(0);
      } else {
        updateUnreadCount();
      }
    });

    updateUnreadCount();

    return () => {
      channel.off("user.watching.start");
      channel.off("message.new");
      channel.off("message.read");
    };
  }, [channel, client.userID, showChat]);

  const toggleChat = () => {
    setShowChat((prev) => {
      if (!prev) {
        setUnreadCount(0);
      }
      return !prev;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setShowChat(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!playersJoined) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white">
        Waiting for other player to join...
      </div>
    );
  }

  return (
    <div className="preline h-screen flex flex-col relative">
      <div className="bg-gray-800 text-white py-2 w-full flex items-center justify-center">
        <h1 className="text-lg font-bold">Tic Tac Toe Game</h1>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-[3.5rem]">
        <Board result={result} setResult={setResult} />
        {result.state === "won" && (
          <div className="mt-4 text-xl text-green-500">
            {result.winner} Won The Game
          </div>
        )}
        {result.state === "tie" && (
          <div className="mt-4 text-xl text-red-500">Game Tied</div>
        )}
      </div>
      {showChat && (
        <div
          ref={chatRef}
          className="absolute inset-x-0 bottom-0 w-full bg-white border-t border-gray-200"
        >
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
      <div className="fixed bottom-4 left-4">
        <button
          className="relative bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full tooltip"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="tooltip-text">Quit Game</span>
        </button>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          ref={toggleButtonRef}
          className="relative bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded-full tooltip"
          onClick={toggleChat}
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FontAwesomeIcon icon={faComments} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {unreadCount}
            </span>
          )}
          {showTooltip && (
            <span className="tooltip-text">
              {showChat ? "Close Chat" : "Open Chat"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Game;
