import React from 'react'
import PropTypes from 'prop-types'
import { Tr, Td, Tooltip } from "@chakra-ui/react"

export const Asset = (props) => {
  const assetNameShort = props.name.substr(0,10) + ' (' + props.ticker + ')'
  return (
    
    <Tr>
      <Tooltip label={props.assetName} aria-label="asset fullname">
        <Td>{assetNameShort}</Td>
      </Tooltip>
      <Td>{props.price}</Td>
      <Td>{props.balance}</Td>
      <Td>{props.value}</Td>
      <Td>{props.portafolioPerc}</Td>
    </Tr>
    
  )
}

Asset.propTypes = {
  assetName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  portafolioPerc: PropTypes.string.isRequired
}
