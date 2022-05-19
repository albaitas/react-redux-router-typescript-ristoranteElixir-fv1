export interface IDishes {
  id: number;
  name: string;
  image: string;
  description: string;
  designation: string;
  featured: boolean;
}

export enum DishesActionTypes {
  ADD_DISHES_STARTED = 'ADD_DISHES_STARTED',
  ADD_DISHES_SUCCESS = 'ADD_DISHES_SUCCESS',
  ADD_DISHES_FAILURE = 'ADD_DISHES_FAILURE'
}

export interface AddDishesStarted {
  type: DishesActionTypes.ADD_DISHES_STARTED;
}

export interface AddDishesSuccess {
  type: DishesActionTypes.ADD_DISHES_SUCCESS;
  payload: IDishes[];
}

export interface AddDishesFailure {
  type: DishesActionTypes.ADD_DISHES_FAILURE;
  payload: string;
}

export type DishesAction = AddDishesSuccess | AddDishesStarted | AddDishesFailure;

export interface ILeaders {
  id: number;
  name: string;
  image: string;
  description: string;
  designation: string;
  featured: boolean;
}

export enum LeadersActionTypes {
  ADD_LEADERS_STARTED = 'ADD_LEADERS_STARTED',
  ADD_LEADERS_SUCCESS = 'ADD_LEADERS_SUCCESS',
  ADD_LEADERS_FAILURE = 'ADD_LEADERS_FAILURE'
}

export interface AddLeadersStarted {
  type: LeadersActionTypes.ADD_LEADERS_STARTED;
}

export interface AddLeadersSuccess {
  type: LeadersActionTypes.ADD_LEADERS_SUCCESS;
  payload: ILeaders[];
}

export interface AddLeadersFailure {
  type: LeadersActionTypes.ADD_LEADERS_FAILURE;
  payload: string;
}

export type LeadersAction = AddLeadersSuccess | AddLeadersStarted | AddLeadersFailure;

export interface IPromotions {
  id: number;
  name: string;
  image: string;
  description: string;
  designation: string;
  featured: boolean;
}

export enum PromotionsActionTypes {
  ADD_PROMOTIONS_STARTED = 'ADD_PROMOTIONS_STARTED',
  ADD_PROMOTIONS_SUCCESS = 'ADD_PROMOTIONS_SUCCESS',
  ADD_PROMOTIONS_FAILURE = 'ADD_PROMOTIONS_FAILURE'
}

export interface AddPromotionsStarted {
  type: PromotionsActionTypes.ADD_PROMOTIONS_STARTED;
}

export interface AddPromotionsSuccess {
  type: PromotionsActionTypes.ADD_PROMOTIONS_SUCCESS;
  payload: IPromotions[];
}

export interface AddPromotionsFailure {
  type: PromotionsActionTypes.ADD_PROMOTIONS_FAILURE;
  payload: string;
}

export type PromotionsAction = AddPromotionsSuccess | AddPromotionsStarted | AddPromotionsFailure;

export interface IComments {
  id: number;
  dishId?: number;
  author: string;
  rating: string;
  comment: string;
  date: string;
}

export enum CommentsActionTypes {
  ADD_COMMENTS_STARTED = 'ADD_COMMENTS_STARTED',
  ADD_COMMENTS_SUCCESS = 'ADD_COMMENTS_SUCCESS',
  ADD_COMMENTS_FAILURE = 'ADD_COMMENTS_FAILURE',
  ADD_COMMENT = 'ADD_COMMENT'
}

export interface AddCommentsStarted {
  type: CommentsActionTypes.ADD_COMMENTS_STARTED;
}

export interface AddCommentsSuccess {
  type: CommentsActionTypes.ADD_COMMENTS_SUCCESS;
  payload: IComments[];
}

export interface AddCommentsFailure {
  type: CommentsActionTypes.ADD_COMMENTS_FAILURE;
  payload: string;
}

export interface AddComment {
  type: CommentsActionTypes.ADD_COMMENT;
  payload: IComments[];
}

export type CommentsAction = AddCommentsSuccess | AddCommentsStarted | AddCommentsFailure | AddComment;

export const ADD_FEEDBACK = 'ADD_FEEDBACK';

export interface IFeedbackForm {
  firstName: string;
  lastName: string;
  telNumber: number;
  email: string;
  agree: boolean;
  contactType: string;
  message: string;
  date: string;
}

export interface AddFeedback {
  type: typeof ADD_FEEDBACK;
  payload: IFeedbackForm[];
}

export const ADD_COMMENT = 'ADD_COMMENT';

export interface ICommentForm {
  id?: number;
  dishId: number;
  rating: string;
  author: string;
  comment: string;
  date?: string;
}
