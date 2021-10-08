import React from 'react'
import PropTypes from 'prop-types'
import { Button, Image, Flex, Spacer, Center,  Avatar, Text } from '@chakra-ui/react'
import { VictoryPie, VictoryTheme } from 'victory';

export const PortRecap = (props) => {
  /*
  const data = [
    { x: 'Ether', y: 15000},
    { x: 'PAID', y: 700},
    { x: 'XMR', y: 2000},
  ] 
  */
  let dataAssets = []
  props.assetsData.forEach( (asset) => {
    if (asset.balance * asset.price > 0) {
      dataAssets.push({
        x: asset.ticker,
        y: asset.balance * asset.price
      })
    }
  })

  return (
      <>
      <VictoryPie
        colorScale="warm"
        style={{
          labels: {
            fontSize: 15, fill: "#c43a31"
          }
        }}
        height={280}
        //radius={30}
        theme={VictoryTheme.material}
        data={dataAssets}
        
        innerRadius={75}
        
      />
</>
    
  )
}

PortRecap.propTypes = {

}

