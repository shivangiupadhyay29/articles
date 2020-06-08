import tagsConstant  from './tags.constant';

const initState = {
    tags: [],
    loading:false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
      case tagsConstant.GET_TAGS_REQUEST:
           return { ...state, loading:true };
    case tagsConstant.GET_TAGS_RECEIVED:
        return { ...state, tags:action.json, loading:false }
    default:
      return  {...state}
  }
}

export default reducer;