import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { IDishes } from '../actions/types';
import { useFadeIn } from '../spring/animations';

interface MenuProps {
  dishes: IDishes[];
  dishesLoading: boolean;
  dishesError: null | string;
}

interface RenderMenuItemProps {
  dish: IDishes;
}

function RenderMenuItem({ dish }: RenderMenuItemProps) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width='100%' src={baseUrl + 'assets/' + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <span className='shadow'>
            <CardTitle>{dish.name}</CardTitle>
          </span>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Menu({ dishes, dishesLoading, dishesError }: MenuProps) {
  const { animated, spring } = useFadeIn();
  const menu = dishes.map((dish) => {
    return (
      <div key={dish.id} className='col-12 col-md-5 m-1'>
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (dishesLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Spinner />
        </div>
      </div>
    );
  } else if (dishesError) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>Server Error...</h4>
        </div>
      </div>
    );
  } else {
    return (
      <animated.div style={spring}>
        <div className='container'>
          <div className='row'>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to='/home'>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Menu</BreadcrumbItem>
            </Breadcrumb>
            <div className='col-12'>
              <h3>Menu</h3>
              <hr />
            </div>
          </div>
          <div className='row'>{menu}</div>
        </div>
      </animated.div>
    );
  }
}

export default Menu;
