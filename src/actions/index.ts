import {
  IDishes,
  DishesActionTypes,
  DishesAction,
  AddDishesStarted,
  AddDishesSuccess,
  AddDishesFailure,
  ILeaders,
  LeadersActionTypes,
  LeadersAction,
  AddLeadersStarted,
  AddLeadersSuccess,
  AddLeadersFailure,
  IPromotions,
  PromotionsActionTypes,
  PromotionsAction,
  AddPromotionsStarted,
  AddPromotionsSuccess,
  AddPromotionsFailure,
  IComments,
  CommentsActionTypes,
  CommentsAction,
  AddCommentsStarted,
  AddCommentsSuccess,
  AddCommentsFailure,
  ICommentForm,
  AddComment,
  IFeedbackForm,
  ADD_FEEDBACK,
  AddFeedback
} from '../actions/types';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

// dishes Home 1
export const addDishesStarted = (): AddDishesStarted => {
  return {
    type: DishesActionTypes.ADD_DISHES_STARTED
  };
};
export const addDishesSuccess = (dishes: IDishes[]): AddDishesSuccess => {
  return {
    type: DishesActionTypes.ADD_DISHES_SUCCESS,
    payload: dishes
  };
};
export const addDishesFailure = (error: any): AddDishesFailure => {
  return {
    type: DishesActionTypes.ADD_DISHES_FAILURE,
    payload: error
  };
};
export const addDishes = () => async (dispatch: Dispatch<DishesAction>) => {
  dispatch(addDishesStarted());
  try {
    const res = await axios(baseUrl + 'dishes');
    dispatch(addDishesSuccess(res.data));
  } catch (err) {
    dispatch(addDishesFailure(err));
  }
};

// leaders Home 2
export const addLeadersStarted = (): AddLeadersStarted => {
  return {
    type: LeadersActionTypes.ADD_LEADERS_STARTED
  };
};
export const addLeadersSuccess = (leaders: ILeaders[]): AddLeadersSuccess => {
  return {
    type: LeadersActionTypes.ADD_LEADERS_SUCCESS,
    payload: leaders
  };
};
export const addLeadersFailure = (error: any): AddLeadersFailure => {
  return {
    type: LeadersActionTypes.ADD_LEADERS_FAILURE,
    payload: error
  };
};
export const addLeaders = () => async (dispatch: Dispatch<LeadersAction>) => {
  dispatch(addLeadersStarted());
  try {
    const res = await axios(baseUrl + 'leaders');
    dispatch(addLeadersSuccess(res.data));
  } catch (err) {
    dispatch(addLeadersFailure(err));
  }
};

// promotions Home 3
export const addPromotionsStarted = (): AddPromotionsStarted => {
  return {
    type: PromotionsActionTypes.ADD_PROMOTIONS_STARTED
  };
};
export const addPromotionsSuccess = (promotions: IPromotions[]): AddPromotionsSuccess => {
  return {
    type: PromotionsActionTypes.ADD_PROMOTIONS_SUCCESS,
    payload: promotions
  };
};
export const addPromotionsFailure = (error: any): AddPromotionsFailure => {
  return {
    type: PromotionsActionTypes.ADD_PROMOTIONS_FAILURE,
    payload: error
  };
};
export const addPromotions = () => async (dispatch: Dispatch<PromotionsAction>) => {
  dispatch(addPromotionsStarted());
  try {
    const res = await axios(baseUrl + 'promotions');
    dispatch(addPromotionsSuccess(res.data));
  } catch (err) {
    dispatch(addPromotionsFailure(err));
  }
};

// comments
export const addCommentsStarted = (): AddCommentsStarted => {
  return {
    type: CommentsActionTypes.ADD_COMMENTS_STARTED
  };
};
export const addCommentsSuccess = (comments: IComments[]): AddCommentsSuccess => {
  return {
    type: CommentsActionTypes.ADD_COMMENTS_SUCCESS,
    payload: comments
  };
};
export const addCommentsFailure = (error: any): AddCommentsFailure => {
  return {
    type: CommentsActionTypes.ADD_COMMENTS_FAILURE,
    payload: error
  };
};
export const addComments = () => async (dispatch: Dispatch<CommentsAction>) => {
  dispatch(addCommentsStarted());
  try {
    const res = await axios(baseUrl + 'comments');
    dispatch(addCommentsSuccess(res.data));
  } catch (err) {
    dispatch(addCommentsFailure(err));
  }
};

// toast
export const showToast = () => {
  toast.success('Added successfully!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000, theme: 'colored' });
};

// comment
export const addComment = (comment: IComments[]): AddComment => ({
  type: CommentsActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment =
  ({ dishId, rating, author, comment }: ICommentForm) =>
  async (dispatch: Dispatch<AddComment>) => {
    const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
      date: new Date().toLocaleString()
    };
    try {
      const res = await axios.post(baseUrl + 'comments', newComment);
      dispatch(addComment(res.data));
      showToast();
    } catch (err) {
      console.log(err);
    }
  };

// feedback
export const addFeedback = (feedback: IFeedbackForm[]): AddFeedback => ({
  type: ADD_FEEDBACK,
  payload: feedback
});

export const postFeedback =
  ({ firstName, lastName, telNumber, email, agree, contactType, message }: IFeedbackForm) =>
  async (dispatch: Dispatch<AddFeedback>) => {
    const newFeedback = {
      firstName: firstName,
      lastName: lastName,
      telNumber: telNumber,
      email: email,
      agree: agree,
      contactType: contactType,
      message: message,
      date: new Date().toLocaleString()
    };

    try {
      const res = await axios.post(baseUrl + 'feedback', newFeedback);
      dispatch(addFeedback(res.data));
      showToast();
    } catch (err) {
      console.log(err);
    }
  };
