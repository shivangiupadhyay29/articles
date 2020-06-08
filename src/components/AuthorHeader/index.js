import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { alt, deleteArticle, editArticle } from '../../constants';
import AuthorLink from '../FormHelpers/authorLink';

export default (props) => {

const { user, article = {}, style:{ link } ={}, toggleFavoriteArticle,  toggleFollowingAuthor, deleteArticle:deleteHandler, editArticle:editHandler } = props; 

const generateButtons = (user = {}, article = {}) => {
    
    const { username: loginUsername  } = user || {};
    const {  author: { username:authorUsername, following } = { }, favoritesCount, favorited } = article || {};

    return loginUsername === authorUsername ? (<div>
                <Button variant={ link?"outline-secondary":'outline-light'} size="sm" type="submit" style={link ? {margin:0.5+'rem',opacity:0.4}:{margin:0.5+'rem'}} onClick={editHandler}>
                    <i className="fa fa-pencil" aria-hidden="true" style={{margin:0.2+'rem'}}></i>{editArticle}
                </Button>
                <Button variant="outline-danger" size="sm" type="submit" style={{margin:0.5+'rem'}} onClick={deleteHandler}>
                    <i className="fa fa-trash" aria-hidden="true" style={{margin:0.2+'rem'}}></i>{deleteArticle}
                </Button>
    </div>):(<div>
                <Button variant={link?"outline-secondary":'outline-light'} size="sm" type="submit" style={link ? {margin:0.5+'rem',opacity:0.4}:{margin:0.5+'rem'}} onClick={toggleFollowingAuthor}>
                    <i className="fa fa-plus" aria-hidden="true" style={{margin:0.5+'rem'}}></i>{`${following ? "Unfollow" : "Follow"} ${authorUsername}`}
                </Button>
                <Button variant="outline-success" size="sm" type="submit" style={{margin:0.5+'rem'}} onClick={toggleFavoriteArticle} >
                    <i className="fa fa-heart" aria-hidden="true" style={{margin:0.5+'rem'}}></i>{` ${favorited ? "Unfavorite":"Favorite"}(${favoritesCount})`}
                </Button>
    </div>)
}

const {  author: { username:authorUsername, image } = {}, createdAt } = article || {};

return  (<div style={{display:'inline-flex', fontWeight: 300}}>
                <a href={`/@${ authorUsername }`}>
                    <img src={image} alt={alt} style={{ height: 26+'px',borderRadius: 50+'px',
                    marginTop: 0.8+'rem',marginRight:0,marginBottom:0,marginLeft:0.8+'rem',cursor:'pointer'}} />
                </a>
                <div style={{ margin:0.5+'rem'}}>
                        <AuthorLink  
                             link={link}
                             authorUsername={authorUsername}
                             createdAt={createdAt}
                        />
                </div>
                {generateButtons(user, article)}           
</div>)
}