import { Container } from "@chakra-ui/layout"
import { Text } from "@chakra-ui/react"

export const Footer = () => {
  return(
    <Container textAlign="center">
      <Text fontSize="xs">Trading Wallet by LP</Text>
      <Text fontSize="xs">Made with Moralis</Text>
    </Container>
  )
}