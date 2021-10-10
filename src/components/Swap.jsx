import React from 'react'
import { useState, useEffect } from 'react';
//import PropTypes from 'prop-types'
import { Select, Box, Button, InputGroup, Input,  Image, Flex, Spacer, Center,  Avatar, Text } from '@chakra-ui/react'
import { Container, Heading, VStack } from '@chakra-ui/layout';
import { Asset } from './Asset'
import { formatPrice } from '../lib/utils'
import { useMoralis } from "react-moralis"

import { ParaSwap } from 'paraswap';


export const Swap = (props) => {
  const [tokensFrom, setTokensFrom] = useState([])
  const [tokensTo, setTokensTo] = useState([])
  const [swapDisabled, setSwapDisabled] = useState(true)
  const [priceRoute, setPriceRoute] = useState({})

  const tokensFromSel = React.createRef()
  const tokensToSel = React.createRef()
  const tokenAmountInput = React.createRef()

  //let priceRoute;

  const { Moralis } = useMoralis();

  // 3 = ropsten
  const paraSwap = new ParaSwap(3);

  const paraswapTest = async () => {
    // const tokens = await paraSwap.getTokens();
    const tokens = await paraSwap.getTokens();
    console.log('paraswapTest: tokens=', tokens)

    // To get the rate of a token pair using the API:
    const srcToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // ETH
    const destToken = '0x21718C0FbD10900565fa57C76e1862cd3F6a4d8E'; // sUSD
    //let srcAmount = '1000000000000000000'; //The source amount multiplied by its decimals: 10 ** 18 here
    const srcAmount = '10000000000000000'
    const priceRoute: OptimalRates = await paraSwap.getRate(
      srcToken,
      destToken,
      srcAmount,
    );
    console.log('paraswapTest: priceRoute=', priceRoute)
    console.log('paraswapTest: priceRoute.destAmount=', priceRoute.destAmount)
    //console.log('paraswapTest: useraccount=', user.attributes.ethAddress)
    //console.log('paraswapTest: useraccount=', user.attributes.accounts[0])
    //console.log('paraswapTest: useraccount=', Moralis.User.current().get("ethAddress"))
    //return;

    // To build and sign a transaction
    //srcToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    //destToken = '0x21718C0FbD10900565fa57C76e1862cd3F6a4d8E';
    //srcAmount = '1000000000000000000'; //The source amount multiplied by its decimals
    //srcAmount = '1000000000000000000'; //The source amount multiplied by its decimals
    const destAmount = priceRoute.destAmount
    const senderAddress = Moralis.User.current().get("ethAddress")
    //const senderAddress =
    //const receiver = '0xB22538c79ef316E128840a55866A7D918a126A7d'; // Useful in case of swap and transfer
    const receiver = Moralis.User.current().get("ethAddress") // Useful in case of swap and transfer
    const referrer = 'my-company-or-nick-name';

    const txParams = await paraSwap.buildTx(
      srcToken,
      destToken,
      srcAmount,
      destAmount,
      priceRoute,
      senderAddress,
      referrer,
      receiver,
    );

    const web3 = await Moralis.enable();
    // Test
    console.log(web3)
    /*
    console.log(web3.currentProvider.selectedAddress)
    var account = web3.eth.accounts[0];
    console.log('account=', account)
    */
    web3.eth.sendTransaction(
      txParams,
      async (err: Error, transactionHash: string) => {
        if (err) {
          console.log('web3.eth.sendTransaction', err.toString())
          return this.setState({ error: err.toString(), loading: false });
        }
        console.log('transactionHash', transactionHash);
      },
    );
  }



  const getParaSwapTokens = async (assetsData) => {
    const paraSwapTokens = await paraSwap.getTokens()
    console.log('getParaSwapTokens: tokens=', paraSwapTokens)
    //const mytokensFrom = paraSwapTokens
    //mytokensFrom.filter( (tokens) => {
    //  if (paraSwapTokens.address === )
    //})
    setTokensFrom(paraSwapTokens)
    setTokensTo(paraSwapTokens)

  }

/*
  [
    {
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        "decimals": 18,
        "symbol": "ETH",
        "tokenType": "ERC20",
        "mainConnector": "",
        "connectors": [
            "ETH"
        ],
        "network": 3,
        "img": "https://img.paraswap.network/ETH.png"
    },
    {
        "address": "0xc55f20a1bb0fdaf619226317ad870c5931c99ae8",
        "decimals": 8,
        "symbol": "WBTC",
        "tokenType": "ERC20",
        "mainConnector": "",
        "connectors": [
            "ETH"
        ],
        "network": 3,
        "img": "https://img.paraswap.network/WBTC.png"
    },
    {
        "address": "0xaD6D458402F60fD3Bd25163575031ACDce07538D",
        "decimals": 18,
        "symbol": "DAI",
        "tokenType": "ERC20",
        "mainConnector": "",
        "connectors": [
            "ETH"
        ],
        "network": 3,
        "img": "https://img.paraswap.network/DAI.png"
    },
    {
        "address": "0x21718C0FbD10900565fa57C76e1862cd3F6a4d8E",
        "decimals": 18,
        "symbol": "sUSD",
        "tokenType": "ERC20",
        "mainConnector": "",
        "connectors": [
            "ETH"
        ],
        "network": 3,
        "img": "https://img.paraswap.network/sUSD.png"
    },
    {
        "address": "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        "decimals": 18,
        "symbol": "WETH",
        "tokenType": "ERC20",
        "mainConnector": "",
        "connectors": [
            "ETH"
        ],
        "network": 3,
        "img": "https://img.paraswap.network/WETH.png"
    },
    
]
*/
  const getParaSwapPrice = async (srcToken, destToken, srcAmount) => {
    // To get the rate of a token pair using the API:
    //const srcToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // ETH
    //const destToken = '0x21718C0FbD10900565fa57C76e1862cd3F6a4d8E'; // sUSD
    //let srcAmount = '1000000000000000000'; //The source amount multiplied by its decimals: 10 ** 18 here
    //const srcAmount = '10000000000000000'
    //const priceRoute: OptimalRates = await paraSwap.getRate(
    const priceRoutePara = await paraSwap.getRate(
      srcToken,
      destToken,
      srcAmount,
    );
    //priceRoute = priceRoutePara
    setPriceRoute(priceRoutePara)
    console.log('getParaSwapPrice: priceRoute=', priceRoutePara)
    console.log('getParaSwapPrice: priceRoute.destAmount=', priceRoutePara.destAmount)
    //return priceRoute;
  }
  
  const handleSwap = async () => {
    console.log('handleSwap: priceRoute=',priceRoute)
    await buildAndSubmitParaSwapTransaction()
  }

  const buildAndSubmitParaSwapTransaction = async () => {
    // To build and sign a transaction
    //srcToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const srcToken = priceRoute.srcToken
    //destToken = '0x21718C0FbD10900565fa57C76e1862cd3F6a4d8E';
    const destToken = priceRoute.destToken
    //srcAmount = '1000000000000000000'; //The source amount multiplied by its decimals
    const srcAmount = priceRoute.srcAmount
    const destAmount = priceRoute.destAmount
    const senderAddress = Moralis.User.current().get("ethAddress")
    //const senderAddress =
    //const receiver = '0xB22538c79ef316E128840a55866A7D918a126A7d'; // Useful in case of swap and transfer
    const receiver = Moralis.User.current().get("ethAddress") // Useful in case of swap and transfer
    const referrer = 'my-company-or-nick-name';
    console.log('buildAndSubmitParaSwapTransaction=', srcToken, destToken,    srcAmount,    destAmount,    priceRoute,    senderAddress,    referrer,    receiver);
    //return;
    const txParams = await paraSwap.buildTx(
      srcToken,
      destToken,
      srcAmount,
      destAmount,
      priceRoute,
      senderAddress,
      referrer,
      receiver,
    );

    const web3 = await Moralis.enable();
    // Test
    console.log(web3)
    /*
    console.log(web3.currentProvider.selectedAddress)
    var account = web3.eth.accounts[0];
    console.log('account=', account)
    */
    web3.eth.sendTransaction(
      txParams,
      async (err: Error, transactionHash: string) => {
        if (err) {
          console.log('web3.eth.sendTransaction', err.toString())
          return this.setState({ error: err.toString(), loading: false });
        }
        console.log('transactionHash', transactionHash);
      },
    );
  }
  
  
  useEffect( () => { 
    if (tokensFrom.length === 0) {
      getParaSwapTokens(props.assetsData)
    }
  })

  const handleTokenSel = async () => {
    
    //console.log('handleTokenSel', tokensFromSel.current.value)
    //console.log('handleTokenSel', tokensToSel.current.value)
    setSwapDisabled(true)
    if (!tokensFromSel.current.value) return;
    if (!tokensToSel.current.value) return;
    if (tokensFromSel.current.value === tokensToSel.current.value) return;
    if (tokenAmountInput.current.value <= 0) return;

    console.log('handleTokenSel PASSED!!!')
    setSwapDisabled(false)
  
    // Fix this! put destDecimals not 10**18
    const srcAmount = tokenAmountInput.current.value*(10**18)
    //priceRoute = await getParaSwapPrice(tokensFromSel.current.value, tokensToSel.current.value, srcAmount)
    await getParaSwapPrice(tokensFromSel.current.value, tokensToSel.current.value, srcAmount)
  }

  return (
    <Container>
      <p>Swap</p>
      <Button mr={3} onClick={() => paraswapTest()}>ParaswapTest</Button>
      <Box align="center" mt={5} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text>Swap tokens with Paraswap</Text>
        <InputGroup>
        <Select ref={tokensFromSel} onChange={handleTokenSel}  mt={3} placeholder="Swap from:">
          {
            tokensFrom.map( (token) => {
              return <option value={token.address}>{token.symbol}</option>
            })
          }
        </Select>
        <Input ref={tokenAmountInput} onChange={handleTokenSel} placeholder="Enter amount" mt={3}/>
        </InputGroup>
        <Select ref={tokensToSel} onChange={handleTokenSel} mt={3} placeholder="Swap to:">
          {
            tokensTo.map( (token) => {
              return <option value={token.address}>{token.symbol}</option>
            })
          }
        </Select>
        <Button onClick={handleSwap} mt={4} isDisabled={swapDisabled}>SWAP</Button>
        
        
      </Box>
    </Container>
  )
}