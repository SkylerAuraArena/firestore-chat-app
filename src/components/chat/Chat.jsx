import { addDoc, serverTimestamp } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import ChatMessage from "./ChatMessage"

const Chat = () => {
  
  // const { user } = useFirebaseConnectionContext()
  // const [messageRef, messages] = useFirebaseChatFetch()
  // <Chat messageRef={messageRef} messages={messages} user={user} handleClose={handleClose}/> 

  const inputRef = useRef()
  const chatDummyDiv = useRef()
  const [newMsg, setNewMsg] = useState("")

  const sendMessage = async () => {
      newMsg && await addDoc(messageRef, { date: serverTimestamp(), message: newMsg, senderId: user.uid, senderEmail: user.email })
      inputRef.current.value = ""
      setNewMsg("")
  }

  // useEffect(() => {
  //     chatDummyDiv.current.scrollIntoView({ behavior: "smooth" })
  // }, [messages])

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);


  return (
    <div className="h-[95vh] w-80 flexJIC flex-col mx-2 pb-3 bg-whiteBg rounded-3xl sm:w-96">
      <div className="flex justify-around py-2">
        <h3 className="w-full mb-8 px-10 py-2 border-b-2 border-slate-300 text-2xl tracking-tight font-semibold">Chat</h3>
      </div>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col justify-start items-start gap-3 px-3">
        <i className="mt-1" />
        {/* {
          messages && messages.map((msg, index) => (
            <ChatMessage key={index} date={msg.date} user={user} message={msg} />
          ))
        } */}
        <div ref={chatDummyDiv}></div>
      </div>
      <div className="flex flex-row justify-center items-center gap-2 w-full mt-2 px-2 pb-2 sm:pb-0">
        <textarea
          className="w-11/12 h-[5.5rem] max-h-24 px-2 py-4 tracking-normal text-left resize-none font-bold shadow-2xl rounded-3xl"
          cols="40" rows="10"
          aria-invalid="false"
          ref={inputRef}
          type="text"
          value={newMsg}
          placeholder="Votre message..."
          onChange={e => setNewMsg(e.target.value)}
        />
        <div className="flex justify-center items-center bg-indigo-400 border-indigo-500 border-2 cursor-pointer w-12 h-full rounded-full hover:bg-whiteBg">
          <i onClick={sendMessage}>🕊️</i>
        </div>
      </div>
    </div>
  )
}

export default Chat