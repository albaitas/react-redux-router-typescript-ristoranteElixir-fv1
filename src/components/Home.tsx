import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Spinner } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { IDishes, ILeaders, IPromotions } from '../actions/types';
import { useTrail, animated } from 'react-spring';

interface HomeProps {
  dish: IDishes;
  dishLoading: boolean;
  dishError: null | string;
  leader: ILeaders;
  leaderLoading: boolean;
  leaderError: null | string;
  promotion: IPromotions;
  promotionLoading: boolean;
  promotionError: null | string;
}

interface RenderCardProps {
  item: IDishes | ILeaders | IPromotions;
  loading: boolean;
  error: null | string;
}

function RenderCard({ item, loading, error }: RenderCardProps) {
  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <h4>Server Error...</h4>;
  } else {
    return (
      <Card>
        <CardImg src={baseUrl + 'assets/' + item.image} alt={item.name} />
        <CardBody>
          <CardTitle style={{ color: '#512da8' }}>{item.name}</CardTitle>
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

function Home({
  dish,
  dishLoading,
  dishError,
  leader,
  leaderLoading,
  leaderError,
  promotion,
  promotionLoading,
  promotionError
}: HomeProps) {
  const trail = useTrail(1, {
    from: { opacity: 0, transform: 'rotateY(-20deg)', scale: 0.8 },
    to: { opacity: 1, transform: 'rotateY(0)', scale: 1 },
    config: { duration: 1000 }
  });
  return (
    <div className='container'>
      <div className='row align-items-start'>
        <div className='col-12 col-md m-1'>
          {trail.map((props, index) => (
            <animated.div key={index} style={props}>
              <RenderCard item={dish} loading={dishLoading} error={dishError} />
            </animated.div>
          ))}
        </div>

        <div className='col-12 col-md m-1'>
          {trail.map((props, index) => (
            <animated.div key={index} style={props}>
              <RenderCard item={leader} loading={leaderLoading} error={leaderError} />
            </animated.div>
          ))}
        </div>

        <div className='col-12 col-md m-1'>
          {trail.map((props, index) => (
            <animated.div key={index} style={props}>
              <RenderCard item={promotion} loading={promotionLoading} error={promotionError} />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
