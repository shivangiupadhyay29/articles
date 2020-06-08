import commentConstant from './comment.constant';

export const getComments = ( params, handler ) => ({
    type: commentConstant.COMMENTS_REQUEST,
    params,
    handler
})

export const addComment = (params, addCommentHandler) =>({
    type:commentConstant.ADD_COMMENT_REQUEST,
    params,
    addCommentHandler
})

export const deleteComment = (params, deleteHandler) =>({
    type:commentConstant.DELETE_COMMENT_REQUEST,
    params,
    deleteHandler
})
