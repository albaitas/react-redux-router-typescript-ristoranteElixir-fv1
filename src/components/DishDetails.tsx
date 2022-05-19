import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import CommentForm from './CommentForm';
import { IComments, IDishes } from '../actions/types';
import { FaStar } from 'react-icons/fa';
import { useFadeIn } from '../spring/animations';
import { v4 as uuidv4 } from 'uuid';

interface DishDetailsProps {
  comments: IComments[];
  commentsLoading: boolean;
  commentsError: null | string;
  dish: IDishes;
}

interface RenderDishProps {
  dish: IDishes;
}

interface RenderCommentsProps {
  comments: IComments[];
  dishId: number;
}

function RenderDish({ dish }: RenderDishProps) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <Card>
        <CardImg width='100%' src={baseUrl + 'assets/' + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, dishId }: RenderCommentsProps) {
  if (comments != null) {
    const commentListItems = comments.map((comment) => {
      return (
        <div key={comment.id}>
          {[...Array(Number(comment.rating))].map((i) => {
            return <FaStar key={i + uuidv4()} className='star' size={20} />;
          })}
          <p>{comment.comment}</p>
          <p style={{ color: '#512da8' }}>
            -- {comment.author}, {comment.date}
          </p>
        </div>
      );
    });

    return (
      <div className='col-12 col-md-5 m-1'>
        <h4>Comments</h4>
        <ul className='list-unstyled'>{commentListItems}</ul>
        <CommentForm dishId={dishId} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function DishDetails({ comments, commentsLoading, commentsError, dish }: DishDetailsProps) {
  const { animated, spring } = useFadeIn();
  if (commentsLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Spinner />
        </div>
      </div>
    );
  } else if (commentsError) {
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
              <BreadcrumbItem>
                <Link to='/menu'>Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className='col-12'>
              <h3>{dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className='row'>
            <RenderDish dish={dish} />
            <RenderComments comments={comments} dishId={dish.id} />
          </div>
        </div>
      </animated.div>
    );
  }
}

export default DishDetails;
