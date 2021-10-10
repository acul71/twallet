import axios from 'axios'

const formatPrice = (price, currency='USD') => {
  let [symbol, prec] = formatCurrency(currency)
  if (price < 10) prec = 5
  return symbol + parseFloat(Number(price).toFixed(prec))
}

const formatCurrency = (currency) => {
  let symbol = ''
  let prec = 2
  switch (currency) {
    case 'USD':
      symbol = '$'
      prec = 2
      break
    case 'BTC':
      symbol = 'BTC '
      prec = 10
      break
    default:
      break
  }
  return [symbol, prec]
}

// Get Ethereum price (Coingecko)
// https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd
/*
Response body
{
  "ethereum": {
    "usd": 3594.05
  }
}
*/

const getEthereumPrice = async (currency='usd') => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currency}`)
    console.log('getEthereumPrice: response.data=', response.data)
    return response.data.ethereum.usd
  }
  catch {
    return null
  }
}


// Get token price (Coingecko)
// https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xefbd6d7def37ffae990503ecdb1291b2f7e38788&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true


/*
Response body
{
  "0xefbd6d7def37ffae990503ecdb1291b2f7e38788": {
    "usd": 0.00067606,
    "usd_market_cap": 0,
    "usd_24h_vol": 0,
    "usd_24h_change": null,
    "last_updated_at": 1631266145
  }
}

https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x94d6b4fb35fb08cb34aa716ab40049ec88002079%2C0x7e9e431a0b8c4d532c745b1043c7fa29a48d4fba%2C0xefbd6d7def37ffae990503ecdb1291b2f7e38788%2C0x49e033122c8300a6d5091acf667494466ee4a9d2%2C0xb31c219959e06f9afbeb36b388a4bad13e802725&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true

Response body
{
  "0xb31c219959e06f9afbeb36b388a4bad13e802725": {
    "usd": 0.00000751,
    "usd_market_cap": 0,
    "usd_24h_vol": 36.87031191126119,
    "usd_24h_change": null,
    "last_updated_at": 1632412826
  },
  "0x7e9e431a0b8c4d532c745b1043c7fa29a48d4fba": {
    "usd": 0.00185776,
    "usd_market_cap": 1787013.8976926845,
    "usd_24h_vol": 1938.5786148102968,
    "usd_24h_change": -6.955726493255818,
    "last_updated_at": 1633549837
  },
  "0xefbd6d7def37ffae990503ecdb1291b2f7e38788": {
    "usd": 0.00067606,
    "usd_market_cap": 0,
    "usd_24h_vol": 0,
    "usd_24h_change": null,
    "last_updated_at": 1631266145
  }
}
*/

const getTokenPrice = async (assetPlatform='ethereum', contractAddresses='0x......,0x......,....', currency='usd') => {
  try {
    const query = `https://api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?contract_addresses=${contractAddresses}&vs_currencies=${currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
    console.log('getTokenPrice: query=', query )
    
    const response = await axios.get(query)
    console.log('getTokenPrice: response.data=', response.data)
    
    return response.data
  }
  catch {
    return null
  }
}



export {formatPrice, formatCurrency, getEthereumPrice, getTokenPrice}