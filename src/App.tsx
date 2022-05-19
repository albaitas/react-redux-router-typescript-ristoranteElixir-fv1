import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Menu from './components/Menu';
import DishDetails from './components/DishDetails';
import Contact from './components/Contact';
import React, { useEffect } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import { addDishes, addLeaders, addPromotions, addComments } from './actions';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RouterProps {
  dishId: string;
}

function App() {
  const { dishes, dishesLoading, dishesError } = useTypedSelector((state) => state.dishesReducer);
  const { leaders, leadersLoading, leadersError } = useTypedSelector((state) => state.leadersReducer);
  const { promotions, promotionsLoading, promotionsError } = useTypedSelector((state) => state.promotionsReducer);
  const { comments, commentsLoading, commentsError } = useTypedSelector((state) => state.commentsReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addDishes());
    dispatch(addLeaders());
    dispatch(addPromotions());
    dispatch(addComments());
  }, [dispatch]);

  const HomePage = () => {
    return (
      <Home
        dish={dishes.filter((dish) => dish.featured)[0]}
        dishLoading={dishesLoading}
        dishError={dishesError}
        leader={leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={leadersLoading}
        leaderError={leadersError}
        promotion={promotions.filter((promotion) => promotion.featured)[0]}
        promotionLoading={promotionsLoading}
        promotionError={promotionsError}
      />
    );
  };

  const AboutPage = () => {
    return <About leaders={leaders} leadersLoading={leadersLoading} leadersError={leadersError} />;
  };

  const MenuPage = () => {
    return <Menu dishes={dishes} dishesLoading={dishesLoading} dishesError={dishesError} />;
  };

  const DishDetailsPage = ({ match }: RouteComponentProps<RouterProps>) => {
    return (
      <DishDetails
        dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        commentsLoading={commentsLoading}
        commentsError={commentsError}
      />
    );
  };

  const ContactPage = () => {
    return <Contact />;
  };

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route path='/aboutus' component={AboutPage} />
          <Route exact path='/menu' component={MenuPage} />
          <Route path='/menu/:dishId' component={DishDetailsPage} />
          <Route path='/contactus' component={ContactPage} />
          <Redirect to='/home' />
        </Switch>
        <ToastContainer />
        <Footer />
      </Router>
    </div>
  );
}
export default App;
