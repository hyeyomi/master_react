import {
  Link,
  useLocation,
  useParams,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Price from './Price';
import Chart from './Chart';

interface Params {
  coinId: string;
}
const Container = styled.div`
  padding: 20px 40px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 50px;
  font-weight: 600;
`;

const HomeBtn = styled.button`
  position: absolute;
  top: 13%;
  background-color: inherit;
  border: none;
  color: ${(props) => props.theme.accentColor};
  left: 5%;
  padding: 2px 10px;
  font-size: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    width: 10px;
    height: 19px;
  }
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const OverView = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.accentColor};
  padding: 10px;
  border-radius: 10px;
  justify-content: space-around;
`;
const OverViewItem = styled.div`
  background-color: #04b1b1;
  border: none;
  padding: 5px;
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border-radius: 2px;
  align-items: center;
  margin-right: 3px;
  span {
    font-size: 20px;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const Description = styled.div`
  h1 {
    font-size: 25px;
    font-weight: 600;
  }
  div {
    margin-top: 8px;
    font-size: 18px;
    line-height: 1.2em;
  }
  margin-bottom: 30px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 7px 0px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => (props.isActive ? 'red' : 'white')};
  cursor: pointer;
  a {
    display: block;
  }
  &:hover {
    opacity: 0.8;
  }
`;

function Coin() {
  const [loading, setLoading] = useState(true);
  //useParam으로 Url에서 얻고 싶은 정보에 접근할 수 있다.
  const { coinId } = useParams<Params>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>{state?.name || coinId}</Title>
      </Header>
      <Link to='/'>
        {' '}
        <HomeBtn>⇐</HomeBtn>
      </Link>
      {loading ? (
        <Loader>
          Loading...
          {/* <Link to ={`/${coinId}/${priceInfo.}`} >
          <PriceBtn>Price</PriceBtn>
          </Link> */}
        </Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>RANK</span>
              <span>{info.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>ALGORITHM</span>
              <span>{info.hash_algorithm}</span>
            </OverViewItem>
            <OverViewItem>
              <span>SYMBOL</span>
              <span>{info.symbol}</span>
            </OverViewItem>
          </OverView>
          <Description>
            <h1>Description</h1>
            <div>{info.description}</div>
          </Description>

          <OverView>
            <OverViewItem>
              <span>Total Suply</span>
              <span>{priceInfo?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply</span>
              <span>{priceInfo?.max_supply}</span>
            </OverViewItem>
          </OverView>

          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart />
            </Route>
          </Switch>
          {/* <PriceBtn>Price</PriceBtn> */}
        </>
      )}
    </Container>
  );
}
export default Coin;
