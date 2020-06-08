import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import action from '../../redux';
import { useLocation, useNavigate, Outlet, useParams  } from 'react-router-dom';
import { alt,  myArticleLink, favoritedLink , defaultImageSrc} from '../../constants';
import ProfileArticles from '../Article';
import { getToken } from '../../utils';
import style from './style';

 function Profile (){
    const token = getToken();
    const profile = useSelector(state => state.login.profile);
    const user = useSelector(state => state.login.user);
    const dispatch = useDispatch();
    const { username:usernameLoc } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const  { auth:{profile:getProfile, user:getUser }, article:{toggleFollowing} }= action;
    const { username, bio, image, following } = profile || {};

    const moveToSettings = () => navigate('/settings');

    const followingHandler = () => { 
        dispatch(getProfile(usernameLoc));
    }

    const toggleFollowingAuthor= ( toggleValue) => (event) => {
        event.preventDefault();
        if(!token){
            navigate('/login');
        } else{
        dispatch(toggleFollowing({ username, toggleValue },followingHandler));
    }
}


    const generateHeaderBtns = () => {
      return username === user?.username ?
        <Button variant="outline-secondary" size="md" type="submit" onClick={moveToSettings} style={style.btnMargin}>
            <i className="fa fa-cog" style={style.icon} />{`Edit Profile Settings`}
        </Button>
        : following ? <Button variant="outline-secondary" size="md" type="submit"  style={style.btnMargin}  onClick={ toggleFollowingAuthor(false) }>
                    <i className="fa fa-check" style={style.icon} />{`Unfollow ${username}`}
        </Button>:
        <Button variant="outline-secondary" size="md" type="submit" style={style.btnMargin} onClick={ toggleFollowingAuthor(true) }>
            <i className="fa fa-plus" style={style.icon} />{`Follow ${username}`}
        </Button>
 }

    useEffect(() => {
        dispatch(getProfile(usernameLoc));
        // dispatch(getUser(usernameLoc));
    },[usernameLoc]);

    return <Container fluid style={style.fullWidth}>
                <Row>
                   <Col style={style.header}>
                       <div>
                                <img  style={style.userImg}  src={image?image:defaultImageSrc} alt={alt} />
                                <h4 style={style.title}>{username}</h4>
                                <p>{bio}</p>
                                 <div>{generateHeaderBtns()}</div>
                       </div>
                     
                   </Col>
                 </Row>
       
            <Row fluid = {'true'}>
                   <Col>
                   <Container>
                          <div>
                                <Navbar fill={'true'} variant="tabs" defaultactiveKey={`/@${username}`}>
                                    <Nav.Item>
                                          <Nav.Link href={`/@${username}`}>{myArticleLink}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                          <Nav.Link href={`/@${username}/favorites`}>{favoritedLink}</Nav.Link>
                                    </Nav.Item>
                                </Navbar>
                               {pathname.indexOf('favorites') !== -1 ? <Outlet /> : <ProfileArticles /> }
                        </div>
                        </Container>
                   </Col>
            </Row>
    </Container>
}

export default Profile;