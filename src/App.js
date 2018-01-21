import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './Home';
import Page from './Page';
import Media from './Media';
import Preview from './Preview';
import Help from './Help';
import NotFound from './NotFound';
import './App.css';
import Layout from './Layout'

const App = (props) => (
  <Layout>
    <Router>
      <div className="section">
        <Switch>
          <Route exact path="/" render={routeProps => <Home {...routeProps} prismicCtx={props.prismicCtx} />} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/longform/:uid" render={routeProps => <Page {...routeProps} prismicCtx={props.prismicCtx} />} />
          <Route exact path="/media/:uid" render={routeProps => <Media {...routeProps} prismicCtx={props.prismicCtx} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Layout>
);

export default App;
