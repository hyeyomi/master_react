import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Container = styled.div`
  padding: 20px 40px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul`
  font-size: 30px;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  a {
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Loader = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 50px;
  font-weight: 600;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// const coins = [
//   {
//     id: 'btc-bitcoin',
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: 'coin',
//   },
//   {
//     id: 'eth-ethereum',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     rank: 2,
//     is_new: false,
//     is_active: true,
//     type: 'coin',
//   },
//   {
//     id: 'hex-hex',
//     name: 'HEX',
//     symbol: 'HEX',
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: 'token',
//   },
// ];

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      console.log(json);
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
                &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
