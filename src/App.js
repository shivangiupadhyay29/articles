import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//components
import Header from './components/Header';
import RootRouter from './router';
import Footer from './components/Footer';

//error boundary component
import ErrorBoundary from './errorBoundary';

//supporting libraries
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppStore } from './store';

import { getToken, getProperty } from './utils';
import action from './redux/login';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from './constants';

import Loading from './portals';

//styles
import './App.css';

function AppRoute() {
  const { restore } = action;
  const dispatch = useDispatch();
  const token = getToken();
  const articleloading = useSelector(state => state.article.loading);

  useEffect(() => {
    if (token) {
      let user = getProperty(userInfo);
      dispatch(restore(user));
    }
  }, [token, dispatch, restore]);

  return (
      <Container fluid style={{height:100+'%', minHeight:100+'%',overflow:'auto'}}>
          <Row className={'h10'} style={{height:10+'%'}}>
                 <Header/>
            </Row>
          <Row className={'h80'} style={{height:80+'%'}}>
               <RootRouter/>
          </Row>
          {/* <Row className={'h10'} style={{height:10+'%'}}> */}
                {/* <Footer /> */}
          {/* </Row> */}
    </Container>
  )
}

function App() {
  const publicURL = '/';
  return (
    <Provider store={AppStore}>
      <Router baseUrl={publicURL | '/'}>
        <ErrorBoundary>
             <AppRoute />
        </ErrorBoundary>
      </Router>
    </Provider>
  )
}

export default App;
