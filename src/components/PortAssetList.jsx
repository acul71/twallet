import React from 'react'
import PropTypes from 'prop-types'
import { Button, Image, Flex, Spacer, Center,  Avatar, Text } from '@chakra-ui/react'
import { Asset } from './Asset'
import { formatPrice } from '../lib/utils'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"




export const PortAssetList = (props) => {
  //let assetsData = []
  //assetsData = getAssets(props.Moralis)
  //props.assetsData = assetsData

  // Stub
  //const totValue = 10000
  console.log('PortAssetList: totValue=', props.totValue)
  return (
    <>
      
      <Table>
        <Thead className="">
          <Tr>
            <Th>Asset Name</Th>
            <Th>Price</Th>
            <Th>Balance</Th>
            <Th>Value</Th>
            <Th>Portfolio %</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            props.assetsData.map( 
            
               ({key, name, ticker, balance, price}) => 
                  <Asset 
                     key={key}
                     assetName = {name + ' (' + ticker + ')'}
                     name={name} 
                     ticker={ticker}
                     balance={balance === parseInt(balance) ? balance : parseFloat(balance).toFixed(5)}
                     price={formatPrice(price, props.currency)}
                     value={formatPrice(balance * price, props.currency)}
                     portafolioPerc={parseFloat(Number(balance * price / props.totValue * 100, props.currency).toFixed(2)) + '%'}
                  /> 
            )
          }
        </Tbody>
      </Table>
    </>
  )
}

PortAssetList.propTypes = {

}

/*
props.coinData.map( 
  ({key, name, ticker, balance, price}) => 
     <Asset 
        key={key}
        assetName = {name + ' (' + ticker + ')'}
        name={name} 
        ticker={ticker}
        balance={balance}
        price={formatPrice(price, props.currency)}
        value={formatPrice(balance * price, props.currency)}
        portafolioPerc={parseFloat(Number(balance * price / totValue * 100, props.currency).toFixed(2)) + '%'}
     /> 
)
*/