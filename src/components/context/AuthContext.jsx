import { useState, useEffect, createContext, useContext, useMemo, useCallback } from "react"
import { auth } from "../../firebase-confg"
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { collection, setDoc, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase-confg"

const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const messageRef = useMemo(() => collection(db, "messages"),[])  

  useEffect(() => {
    authCheck()

    return () => {
      authCheck
    }
  }, [auth])
  
  const authCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
        const newUser = {...user}
        setCurrentUser(newUser)
      } else {
        setCurrentUser(user)
      }
  })

  const signInWithGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }, [])

  const logout = useCallback(() => {
    return signOut(auth)
  }, [])

  const ifNewCreateUserInFirestoreDatabase = async (cred) => {
    const userRef = doc(db, "users", cred.user.uid)
    const userDoc = await getDoc(userRef)
    if (!userDoc.exists()) {
      //If it doesn't exist yet, we create the user in the database
      setDoc(userRef, {
        pseudo: cred.user.displayName,
        email: cred.user.email,
      })
    }
  }

  const contextValues = useMemo(
    () => ({
      currentUser,
      loading,
      setLoading,
      signInWithGoogle,
      logout,
      ifNewCreateUserInFirestoreDatabase,
      messageRef,
    }),
    [
      currentUser,
      loading,
    ]
  )

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}

export default AuthContextProvider


export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé dans le context adéquat"
    )
  }

  return context
}