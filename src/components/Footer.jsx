import { Container } from "@chakra-ui/layout"
import { Image, Box } from '@chakra-ui/react'
import { Text } from "@chakra-ui/react"

export const Footer = () => {
  return(
    <Container align="center">
      <Box borderWidth="0px">
        <Image boxSize="10px" src="img/TWLogo.png" alt="TW Logo" align="top"/>
        <Text fontSize="xs">Trading Wallet by PL</Text>
      </Box>
      <Text fontSize="xs">Made with Moralis</Text>
    </Container>
  )
  // <Text fontSize="xs">Trading Wallet by PL</Text>
}