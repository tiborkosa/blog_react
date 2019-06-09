import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'; 
import BlogPage from './containers/BlogPage/BlogPage';
import CreateBlog from './containers/CreateBlog/CreateBlog';
import ReadBlog from './containers/ReadBlog/ReadBlog';
import MyBlogs from './containers/MyBlogs/MyBlogs';
import Settings from './containers/Settings/Settings';

import About from './containers/AboutPage/AboutPage';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './Common/ErrorBoundary';
import Header from './containers/Header/Header';

import {logOut} from './store/actions'
class App extends Component {

  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={BlogPage} />
        <Route path="/about" exact component={About} />
        <Route path="/read-blog/:id" component={ReadBlog} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated){ 
      routes = (
        <Switch>
          <Route path="/" exact component={BlogPage} />
          <Route path="/about" exact component={About} />
          <Route path="/myblogs" component={MyBlogs} />
          <Route path="/read-blog/:id" component={ReadBlog} />
          <Route path="/editblog" component={CreateBlog} /> 
          <Route path="/new-blog" component={CreateBlog} />
          <Route path="/settings" component={Settings} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <ErrorBoundary>
        <Header />
        {routes}
        <Footer />
      </ErrorBoundary>
    );
  }
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.tokenId !== null
	}
}
const mapDispatchToProps = dispatch => {
  return {
    logout: _ => dispatch(logOut())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App) );
