import logo from './logo.svg';
import './App.css';
import { useMoralis } from "react-moralis"
import { Moralis } from 'moralis'

const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();

  return (
    <button onClick={() => logout()} disabled={isAuthenticating}>
      Logout
    </button>
  )
}

async function App() {
  const { authenticate, isAuthenticated, user, ...rest } = useMoralis();
  // Moralis.Web3.getAllERC20()
  
  
  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate({ signingMessage: "twallet Authentication" })}>Authenticate</button>
      </div>
    );
  }
  console.log('user=', user)
  console.log('rest=', rest)
  console.log('getAllERC20=', await Moralis.Web3.getAllERC20())
  return (
    <>
    <div>
      <LogoutButton />
    </div>
    <div>
      <h1>Welcome {user.get("username")}</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
        
      </pre>
    </div>
    </>
  );
}

export default App;
