import tagsConstant  from './tags.constant';

export const getTags = (params) => ({
    type: tagsConstant.GET_TAGS_REQUEST,
    params
});