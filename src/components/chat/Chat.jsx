import { query, getDocs, orderBy, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"
import ChatMessage from "./ChatMessage"

const getDataFromFirestoreOnce = async(messageRef) => {
  const q = query(messageRef, orderBy("date"))
  const querySnapshot = await getDocs(q)
  return querySnapshot
}

const Chat = () => {
  const { logout, currentUser, messageRef } = useAuth()
  const [messages, setMessages] = useState(null)
  const [newMsg, setNewMsg] = useState("")
  const inputRef = useRef()
  const chatDummyDiv = useRef()

  const sendMessage = async () => {
      newMsg && await addDoc(messageRef, { date: serverTimestamp(), message: newMsg, senderId: currentUser.uid, senderEmail: currentUser.email })
      inputRef.current.value = ""
      setNewMsg("")
  }

  useEffect(() => {
    const q = query(messageRef, orderBy("date"))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
        const msgList = []
        querySnapshot.forEach((doc, index) => {
          const msg = doc.data()
          const newMsg = { 
            key: doc.id,
            date: msg.date,
            user: currentUser.displayName,
            message: msg,
           }
           msgList.push(newMsg)
        })
        setMessages(msgList)
    })
    return () => {
        unsuscribe()
    }
  }, [])

  useEffect(() => {
    chatDummyDiv.current.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    chatDummyDiv.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="h-[95vh] w-80 flexJIC flex-col mx-2 pb-3 bg-whiteBg rounded-3xl sm:w-[400px]">
      <div className="grid grid-cols-8 justify-around py-2">
        <h3 className="col-start-4 col-span-2 w-full flexJIC px-10 py-2 border-b-2 border-slate-300 text-2xl tracking-tight font-semibold">Chat</h3>
        <div className="col-start-7 col-span-2 flexJIC bg-transparent text-exit m-0 px-4 py-2 border-b-0 border-slate-300">
            <button className="bg-transparent m-0 p-0 text-2xl tracking-tight font-semibold" onClick={() => logout()}>×</button>
        </div>
      </div>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col justify-start items-start gap-3 px-2 -mt-2">
        <i className="mt-1" />
        {
          messages && messages.map(msg => (
            <ChatMessage key={msg.key} date={msg.date} user={currentUser} sender={msg.user} message={msg.message} />
          ))
        }
        <div className="mt-1" ref={chatDummyDiv}></div>
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
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <div className="flex justify-center items-center bg-indigo-400 border-indigo-500 border-2 cursor-pointer w-12 h-full rounded-full hover:bg-whiteBg">
          <i onClick={sendMessage}>🕊️</i>
        </div>
      </div>
    </div>
  )
}

export default Chat