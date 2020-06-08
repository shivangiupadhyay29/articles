import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Containers from '../containers';
import { mapRoutesToName } from '../constants';
import { useSelector } from 'react-redux';
import ProtectedRoute from '../hocs/authorization.hoc';
import NotFound from '../components/NotFound';

export default function () { 
    const { Home, Login, SignUp, Setting, User, NewArticle, EditArticle, FavoriteArticle, ViewArticle } = Containers;
    const {  articleId = '*' } = {};
   const user = useSelector(state => state.login.user);
   const { username:userName = '*' } = user || {};
    return (<Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login headerTitle={mapRoutesToName['/login']}  /> } />
                    <Route path="register" element={<SignUp headerTitle={mapRoutesToName['/register']} />} />
                    <ProtectedRoute path="settings" element={Setting} />
                    <Route path={`@:username`} element={<User />} >
                        <Route path={'favorites'} element={<FavoriteArticle/>}/>
                    </Route>
                    <ProtectedRoute path='editor' element={NewArticle}>
                        <ProtectedRoute path={`:articleSlug`} element={EditArticle} />
                    </ProtectedRoute>
                    <Route path={`article/:articleSlug`}element={<ViewArticle/>} />
                    <Route path="*" element={<NotFound  /> } />
            </Routes>); 
}