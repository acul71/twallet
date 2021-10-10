import './App.css';
import { useMoralis } from "react-moralis"
import { Auth } from './components/Auth'
import { Button, Image, Flex, Spacer, Center,  Avatar, Text } from '@chakra-ui/react'
import { Container, Heading, VStack } from '@chakra-ui/layout';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Footer } from './components/Footer';
import { PortRecap} from './components/PortRecap'
import { PortAssetList } from './components/PortAssetList'
import { Swap } from './components/Swap'
import { useState, useEffect } from 'react';
import { getEthereumPrice, getTokenPrice } from './lib/utils'

//import { ParaSwap } from 'paraswap';
//// 3 = ropsten
//const paraSwap = new ParaSwap(3);

// Refresh time in secs
let RefreshTimeSec = 30

let firstTime = true

// Portfolio tot value
let PortfolioTotValue = 0 

let intervalId = null

function App() {
  const [assetsData, setAssetsData] = useState([])
  const [currency, setCurrency] = useState('USD')
  
  const { isAuthenticated, isAuthenticating, user, Moralis, web3, logout, ...rest } = useMoralis();

  


  const logOut = async () => {
    clearInterval(intervalId)
    await logout()
    setAssetsData([])
    firstTime = true
  }

  const LogoutButton = () => {
    //const { logout, isAuthenticating } = useMoralis();
  
    return (
      <Button onClick={() => logOut()} disabled={isAuthenticating}>
        Logout
      </Button>
    )
  }

  const getAssets = async () => {
    

      const options = { chain: 'ropsten'}
    //const options = { chain: 'eth'}

    
    const nativeBalance = await Moralis.Web3API.account.getNativeBalance(options)
    console.log('getAssets: nativeBalance=', nativeBalance)
    
    const tokenBalances = await Moralis.Web3API.account.getTokenBalances(options)
    console.log('getAssets: tokenBalances=', tokenBalances)
    
    const NFTs = await Moralis.Web3API.account.getNFTs(options)
    console.log('getAssets: NFTs=', NFTs)
  
    // Init assets array
    const assets = []

    PortfolioTotValue = 0

    // Get Ethereum balance
    const amountInEth = web3.utils.fromWei(nativeBalance.balance, 'ether')
    console.log('getAssets: amountInEth=', amountInEth)
    // Get Eth price
    let ethPrice = await getEthereumPrice()
    // Handle error
    if (!ethPrice) {
      ethPrice = -1 
    } else {
      PortfolioTotValue += ethPrice * amountInEth
    }

    assets.push({
      key: 'eth',
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: 'Ether',
      ticker: 'eth',
      balance: amountInEth,
      price: ethPrice
    })

    let tokenContractAddresses = ""
    // Get token balances
    tokenBalances.forEach( (token, idx) => {
      tokenContractAddresses += token.token_address + ','
    })

    const tokenInfo = await getTokenPrice('ethereum', tokenContractAddresses, 'usd')

    tokenBalances.forEach( (token, idx) => {
      const normBalance = token.balance / (10**token.decimals)
      const tokenPrice = tokenInfo[token.token_address] === undefined ? 0 : tokenInfo[token.token_address].usd
      PortfolioTotValue += tokenPrice * normBalance

      assets.push({
        key: token.symbol + '_' + token.name,
        address: token.token_address,
        name: token.name,
        ticker: token.symbol,
        balance: parseFloat(normBalance),
        price: tokenPrice
      })
    })

    console.log('getAssets: assets=', assets)

    setAssetsData(assets)
    
  }

  
  const listenToUpdates = async () => {
    const query = new Moralis.Query("EthTransactions")
    const subscription = await query.subscribe()

    subscription.on("create", (object) => {
      console.log('new transaction!!')
      console.log(object)
      getAssets()
    })
  }

  const componentDidMount = () => {
    
    getAssets()
    listenToUpdates()
    
    intervalId = setInterval( () => {
      try {
        console.log('setInterval: Here!!!')
        getAssets()
      } 
      catch {
        console.log('setInterval: getAssets error')
      }
    }, RefreshTimeSec*1000)
    
    
  }

  useEffect( () => {
    
    if (!isAuthenticated) return;
    if (isAuthenticating) return;

    
    //if (assetsData.length === 0) {
    if (firstTime) {
      // componentDidMount
      firstTime = false
      console.log("componentDidMount")
      componentDidMount()

    } else {
      // componentDidUpdate
      console.log("componentDidUpdate")

    }
  })

  if (!isAuthenticated) {
    return (
      <VStack spacing={20}>
        <Auth/>
        
        <Footer/>
      </VStack>
      
    )
  
  }

  console.log('user=', user)
  console.log('rest=', rest)
  
  
  return (
    <Container>
      <Flex my={6}>
        <Link to='/'>
        <Button mr={3}>Assets</Button>
        </Link>
        <Link to='/swap'>
        <Button mr={3}>Swap</Button>
        </Link>
        <LogoutButton/>
      </Flex>
      <Switch>
        <Route exact path="/">
          <Flex my={6}>
            <PortRecap assetsData={assetsData} currency={currency} totValue={PortfolioTotValue}/>
          </Flex>
          <Flex my={6}>
            <PortAssetList assetsData={assetsData} currency={currency} totValue={PortfolioTotValue}/>
          </Flex>
          <Flex my={20}>
            <Footer/>
          </Flex>
        </Route>
        <Route exact path='/swap'>
          <Swap assetsData={assetsData} currency={currency}/>
          <Flex my={20}>
            <Footer/>
          </Flex>
        </Route>
      </Switch>
    </Container>

  )

  
}



export default App;
