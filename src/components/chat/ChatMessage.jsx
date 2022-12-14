import { useState, memo } from 'react'

const ChatMessage = (props) => {
    const [msgTxt, setMsgTxt] = useState(`${props.message.message}`)
    const regex = /\/\d0/g;
    const regex2 = / /g;
    const dateMsg = props.date ? props.date.toDate().toLocaleString().replace(regex,"/").replace(regex2," à ") : "Récupération depuis le serveur en cours..."
    const uid = props.user ? props.user.uid : null
 
    const divCss = "flex items-center justify-end gap-1 w-full text-white"
    const logoCss = "flex justify-center items-center w-12 h-12 rounded-full"
    const pCss = "leading-6 px-4 py-3 rounded-3xl max-w-full break-words sm:px-3"
    const { senderEmail, senderId } = props.message

    let divMsgCss = ""
    let imgCss = ""
    let msgCss = ""

    if(uid === senderId){
        divMsgCss = `${divCss}`
        imgCss = `${logoCss} bg-indigo-400`
        msgCss = `${pCss} bg-indigo-400`
    } else {
        divMsgCss = `${divCss} flex-row-reverse`
        imgCss = `${logoCss} bg-orange-300`
        msgCss = `${pCss} bg-orange-300`
    }

    const trigramme = senderEmail.substr(0,3).toUpperCase()

    const handleEnter = () => {
        setMsgTxt(`Date : ${dateMsg}`)
    }
    const handleExit = () => {
        setMsgTxt(`${props.message.message}`)
    }

    return(
        <div className={divMsgCss} onMouseEnter={()=>handleEnter()} onMouseLeave={()=>handleExit()}>
            <span className={msgCss}>{msgTxt}</span>
            <div>
                <p className={imgCss}>{trigramme}</p>
            </div>
        </div>
    )
}

export default memo(ChatMessage)