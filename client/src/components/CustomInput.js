import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function CustomInput() {
  const { handleSubmit } = useMessageInputContext();
  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <div className="str-chat__input-flat--textarea-wrapper">
          <ChatAutoComplete />
        </div>
        <button
          onClick={handleSubmit}
          className="ml-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default CustomInput;
