import commentConstant  from './comment.constant';

const initState = {
    comments: null,
    loading:false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
      case commentConstant.COMMENTS_REQUEST:
           return { ...state };
      case commentConstant.COMMENTS_RECEIVED:
            return { ...state, comments:action.json, error:action.errors };
     case commentConstant.ADD_COMMENT_REQUEST:
        return { ...state, loading: true };
      case commentConstant.ADD_COMMENT_RECEIVED:{
          let { comments } = state;
          if(!action.errors){
            comments = [ action.json, ...comments ]
         }
        return { ...state, loading: false, comments, error:action.errors };
    }
     case commentConstant.DELETE_COMMENT_RECEIVED: {
            let { comments } = state;
            if(!action.errors){
               const id = action.json;
               const index = comments.findIndex(element => element.id === id);
               comments.splice(index,1);
          }
        return { ...state, loading: false, comments:[...comments], error:action.errors };
    }
     default:
         return {...state } 
    }
} 

export default reducer;
