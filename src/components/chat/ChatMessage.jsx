import { useState, memo } from 'react'

const ChatMessage = (props) => {
    const [msgTxt, setMsgTxt] = useState(`${props.message.message}`)
    const dateMsg = props.date ? props.date.toDate().toLocaleString() : "Récupération depuis le serveur en cours..."
    const uid = props.user ? props.user.uid : null
 
    const divCss = "flex items-center gap-1 w-full text-white"
    const logoCss = "flex justify-center items-center w-12 h-12 rounded-full"
    const pCss = "leading-6 px-3 py-3 rounded-3xl max-w-full break-all"
    const { senderEmail, senderId } = props.message

    let divMsgCss = ""
    let imgCss = ""
    let msgCss = ""

    if(uid === senderId){
        divMsgCss = `${divCss} justify-end`
        imgCss = `${logoCss} bg-indigo-400`
        msgCss = `${pCss} bg-indigo-400`
    } else {
        divMsgCss = `${divCss}`
        imgCss = `${logoCss} bg-orange-300`
        msgCss = `${pCss} bg-orange-300`
    }

    const trigramme = senderEmail.substr(0,3).toUpperCase()
    const msg = uid === senderId ? (
        <div className={divMsgCss} onMouseEnter={()=>handleEnter()} onMouseLeave={()=>handleExit()}>
            <span className={msgCss}>{msgTxt}</span>
            <div>
                <p className={imgCss}>{trigramme}</p>
            </div>
        </div>
    ) : (
        <div className={divMsgCss} onMouseEnter={()=>handleEnter()} onMouseLeave={()=>handleExit()}>
            <div>
                <p className={imgCss}>{trigramme}</p>
            </div>
            <span className={msgCss}>{msgTxt}</span>
        </div>
    )

    const handleEnter = () => {
        setMsgTxt(`Date du message : ${dateMsg}`)
    }
    const handleExit = () => {
        setMsgTxt(`${props.message.message}`)
    }

    return(
        <>
            { msg }
        </>
    )
}

export default memo(ChatMessage)