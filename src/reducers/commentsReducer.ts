import { IComments, ICommentForm, CommentsActionTypes, CommentsAction } from '../actions/types';

interface CommentsState {
  commentsLoading: boolean;
  comments: IComments[];
  commentsError: null | string;
  comment?: ICommentForm[];
}

const defaultState: CommentsState = {
  commentsLoading: false,
  comments: [],
  commentsError: null,
  comment: []
};

export const commentsReducer = (state = defaultState, action: CommentsAction): CommentsState => {
  switch (action.type) {
    case CommentsActionTypes.ADD_COMMENTS_STARTED:
      return { ...state, commentsLoading: true, comments: [], commentsError: null };
    case CommentsActionTypes.ADD_COMMENTS_SUCCESS:
      return { ...state, commentsLoading: false, comments: action.payload, commentsError: null };
    case CommentsActionTypes.ADD_COMMENTS_FAILURE:
      return { ...state, commentsLoading: false, comments: [], commentsError: action.payload };
    case CommentsActionTypes.ADD_COMMENT:
      let comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
