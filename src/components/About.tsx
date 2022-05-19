import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { ILeaders } from '../actions/types';
import { useTrail, animated } from 'react-spring';
import { useFadeIn } from '../spring/animations';

interface AboutProps {
  leaders: ILeaders[];
  leadersLoading: boolean;
  leadersError: null | string;
}

interface RenderLeadersProps {
  leaders: ILeaders[];
  loading: boolean;
  error: null | string;
}

interface RenderLeaderProps {
  leader: ILeaders;
}

function RenderLeaders({ leaders, loading, error }: RenderLeadersProps) {
  const trail = useTrail(leaders.length, {
    from: { marginLeft: -20, opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { marginLeft: 20, opacity: 1, transform: 'translate3d(0,0px,0)' }
  });

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <h4>{error}</h4>;
  } else {
    return (
      <Media list>
        {trail.map((props, index) => (
          <animated.div key={index} style={props}>
            <RenderLeader leader={leaders[index]} />
          </animated.div>
        ))}
      </Media>
    );
  }
}

function RenderLeader({ leader }: RenderLeaderProps) {
  return (
    <div className='col-12 m-1'>
      <Media left middle>
        <Media object src={baseUrl + 'assets/' + leader.image} alt={leader.name} width='130' height='130' />
      </Media>
      <Media body>
        <Media style={{ color: '#512da8' }}>{leader.name}</Media>
        <p>{leader.designation}</p>
        <p className='note'>{leader.description}</p>
      </Media>
    </div>
  );
}

function About({ leaders, leadersLoading, leadersError }: AboutProps) {
  const data = <RenderLeaders leaders={leaders} loading={leadersLoading} error={leadersError} />;
  const { animated, spring } = useFadeIn();

  return (
    <animated.div style={spring}>
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>About Us</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>About Us</h3>
            <hr />
          </div>
        </div>

        <div className='row row-content'>
          <div className='col-12 col-md-6'>
            <h4>Our History</h4>
            <p>
              Started in 2010, Ristorante Elixir quickly established itself as a culinary icon par excellence in Hong
              Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage
              from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world,
              you never know what will arrive on your plate the next time you visit us.
            </p>
            <p>
              The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our
              CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </p>
          </div>
          <div className='col-12 col-md-6'>
            <Card>
              <CardHeader className='bg-primary text-white'>Facts At a Glance</CardHeader>
              <CardBody>
                <dl className='row p-1'>
                  <dt className='col-6'>Started</dt>
                  <dd className='col-6'>3 Feb. 2013</dd>
                  <dt className='col-6'>Major Stake Holder</dt>
                  <dd className='col-6'>HK Fine Foods Inc.</dd>
                  <dt className='col-6'>Last Year's Turnover</dt>
                  <dd className='col-6'>$1,250,375</dd>
                  <dt className='col-6'>Employees</dt>
                  <dd className='col-6'>40</dd>
                </dl>
              </CardBody>
            </Card>
          </div>
          <div className='col-12'>
            <Card>
              <CardBody className='bg-faded'>
                <blockquote className='blockquote'>
                  <p className='mb-0'>
                    You better cut the pizza in four pieces because I'm not hungry enough to eat six.
                  </p>
                  <footer className='blockquote-footer'>
                    Yogi Berra,
                    <cite title='Source Title'>The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books, 2014</cite>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className='row row-content'>
          <div className='col-12'>
            <h4>Corporate Leadership</h4>
          </div>
          <div className='col-12'>{data}</div>
        </div>
      </div>
    </animated.div>
  );
}

export default About;
