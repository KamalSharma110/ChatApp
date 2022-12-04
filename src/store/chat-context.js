import React, { useReducer } from "react";


const ChatContext = React.createContext({
  chats: [],
  user: {},
  combinedId: null,
  dispatchChatState: () => {},
});

const chatReducer = (prevState, action) => {
  let updatedState;

  if (action.type === "USER_CHANGED") {
    updatedState = {
      chats: action.payload.messages,
      combinedId: action.payload.combinedId,
      user: {
        photoUrl: action.payload.photoUrl,
        localId: action.payload.localId,
      },
    };

    return updatedState;
  }

  if(action.type === 'MESSAGE_UPDATE'){
    updatedState = {
      ...prevState,
      chats: action.payload,
    };
    return updatedState;
  }

  return prevState;
};

export const ChatContextProvider = (props) => {
  const [chatState, dispatchChatState] = useReducer(chatReducer, {
    chats: [],
    combinedId: null,
    user: {
      photoUrl: "",
      localId: null,
    },
  });


  return (
    <ChatContext.Provider
      value={{
        chats: chatState.chats,
        user: chatState.user,
        combinedId: chatState.combinedId,
        dispatchChatState,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
