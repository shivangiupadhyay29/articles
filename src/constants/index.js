//doc title options
export const docTitle = ' — Conduit'; 

//local storage related constants
export const userInfo = 'userinfo';
export const jwt = 'jwt';

//Routing based constants
export const mapRoutesToName = {
    '/login': 'Sign in',
    '/register': 'Sign up',
    '/editor':  'Editor',
    '/settings': 'Settings',
    '/': 'Home',
} 

// auth form placeholders constants
export const formPlaceholder = {
    'UserName':'Username',
    'Email':'Email',
    'Password':'Password'
}

//fallback component constants
export const notFoundPage = {
    title: '404! Page Not Found',
    message:'Page that you are requesting is not found,Please check your url'
}

//Setting page Constants
export const settingsTitle = 'Your Settings'
export const settingFormPlaceholder = {
    imageUrl: 'URL of profile picture',
    username:'Username',
    bio:'Short bio about you',
    email:'Email',
    newPassword:'New Password',
    updateSettings:'Update Settings',
    logout:'Or click here to logout.'
}

//article form
export const articleForm = {
    title:'Article Title',
    topic:"What's this article is about?",
    article:'Write your article (in markdown)',
    tags:'Enter tags',
    submit: 'Publish Article'
}

//img constant
export const alt= "Author Avatar";
export const loginAlt = "User Avatar";

//article
export const deleteArticle = 'Delete Article';
export const editArticle = 'Edit Article';

//comment
export const postComment= 'Post Comment';
export const  placeholderComment='Write a comment....';

export const myArticleLink = 'My Articles';
export const favoritedLink= 'Favorited Articles';

export const readMore= 'Read more.....';

export const yourFeed= 'Your Feed';
export const globalFeed = 'Global Feed';

export const defaultImageSrc = 'https://static.productionready.io/images/smiley-cyrus.jpg';