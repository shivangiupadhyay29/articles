export const baseApiURL = "https://conduit.productionready.io";

export const type = { GET:'GET',  POST:'POST',  PUT:'PUT',  DELETE:'DELETE' };

export  const articlesURL = (isFeed) => `/api/articles${!isFeed?'':'/feed'}`; 
export const loginURL = "/api/users/login";
export const registerURL = '/api/users';
export const userURL = '/api/user';
export const profileURL = '/api/profiles/';
export const createArticleURL = '/api/articles';
export const articleUrl = (slug) =>  `/api/articles/${slug}`;
export const commentUrl = (slug) => `/api/articles/${slug}/comments`;
export const commentDeleteUrl = ({articleSlug, id }) => `/api/articles/${articleSlug}/comments/${id}`;
export const favoriteArticleUrl = (articleSlug) =>`/api/articles/${articleSlug}/favorite`;
export const followingAuthorUrl = (username) => `/api/profiles/${username}/follow`;
export const tagsUrl = `/api/tags`;
// export const userURL= `/api/user`;