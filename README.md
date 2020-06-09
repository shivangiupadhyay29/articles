This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `yarn`
to install this project on your local system.
### `yarn start`
to run the application on your local system.

## Application is published on heroku platform to checkout use this link https://articles-project.herokuapp.com/

# login credentials :`email:shivangi@gmail.com,password:123456789`

or else feel free to register yourself with your id and explore :)

## This application consists of all the features mentioned in the assignment:-
1.Personal feed  
2.Global feed  
3.Filter articles by tags  
# `support for tags in article is implemented with favorites.`
4.Author Profile view  
5.Author following and unfollowing features.  
6.Posting and deleting comments on the articles.  
7.Article view with edit and delete features.  
8.logout and update user settings.  
9.with auth and session management.  

## Few pointers on code level description:-
1.Hocs like auth for `protecting urls`  

2.Hoc for setting the `document title of page.`

3.new article and edit article ares some `routes that are protected and you will redirected to sign in url.`

4.for Invalid  urls you will be directed as a fallback to 
# `Not found page`.

5.`token` is not found you in local storage , the page will be again redirected to sign in page.

6.`localstorage` is used as directed can be found in utils folder.

7. `error boundary` support at root level is provided.
