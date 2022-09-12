import { useRef, useLayoutEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import logoGoogle from "../../assets//logo-google.png"


const SigninWith = ({withWhat, setAuthing}) => {
    const { signInWithGoogle, ifNewCreateUserInFirestoreDatabase } = useAuth()
    const btnRef = useRef(null)

    const cssBtn = 'flex justify-center w-[8.8rem] rounded px-9 py-4 border-2 border-ivory transition-all'
    const cssBtnFadeOut = 'opacity-0'
    const cssBtnFadeIn = 'opacity-100'
    const cssBtnHover = 'transition'
    const cssBtnClicked = `bg-slate-400 cursor-not-allowed`
    let btnCss = `${cssBtn} ${cssBtnHover} ${cssBtnFadeOut}`

    const imgLogo = {
        img: withWhat === "google" ? logoGoogle : null,
        alt: `Logo de ${withWhat === "google" ? "Google" : null}`,
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            if(null !== btnRef.current){
                btnRef.current.className = `${cssBtn} ${cssBtnHover} ${cssBtnFadeIn}`
            }
        }, 25);
    }, [])

    const handleClick = () => {
        setAuthing(true)
        if(null !== btnRef.current){
            btnRef.current.className = `${cssBtn} ${cssBtnClicked}`
        }
        switch (withWhat) {
            case "google":
                signInWithGoogle().then((cred) => {
                    ifNewCreateUserInFirestoreDatabase(cred)
                }).catch((error) => {
                    console.log(error)
                    setAuthing(false)
                })
                break
            default:
                break
        }
    }

    return (
        <button ref={btnRef} className={btnCss} onClick={() => handleClick()} >
            <img className="h-full w-full min-h-[64.826px]" src={imgLogo.img} alt={imgLogo.alt} />
        </button>
    )
}

export default SigninWith