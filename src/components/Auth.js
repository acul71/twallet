import { Button, Image, Stack} from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
//import { useState } from 'react'
import { ErrorBox } from './Error'

/*
const SignUp = () => {
  const {signup} = useMoralis()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <Stack spacing={3}>
      <Input type='email' placeholder='email' value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
      <Input type='password' placeholder='password' value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
      <Button onClick={() => signup(email,password,email)}>Sign up</Button>
    </Stack>
  )
}

const Login = () => {
  const {login} = useMoralis()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <Stack spacing={3}>
      <Input type='email' placeholder='email' value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
      <Input type='password' placeholder='password' value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
      <Button onClick={() => login(email,password)}>Login</Button>
    </Stack>
  )
}
*/



export const Auth = () => {
  const { authenticate, isAuthenticating, authError } = useMoralis()

  return <Stack spacing={6}>
    {authError &&
      <ErrorBox title='Authentication has failed' message={authError.message} />
    }
    <Image boxSize="15px" src="img/TWLogo.png" alt="TW Logo"/>
    <Button isLoading={isAuthenticating} onClick={ () => authenticate({ signingMessage: "TWallet Authentication" }) }>
        Authenticate via Metamask
    </Button>
  </Stack>

  
}