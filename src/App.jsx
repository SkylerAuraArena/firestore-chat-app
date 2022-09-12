import Chat from "./components/chat/Chat"
import { useAuth } from "./components/context/AuthContext"
import Login from "./components/login/Login"

function App() {

  const { currentUser } = useAuth()

  return (
    <div className="fullSize flexJIC bg-indigo-200">
      { !currentUser && <Login /> }
      { currentUser && <Chat /> }
    </div>
  )
}

export default App
