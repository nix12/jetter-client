// pages/_app.js
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import Cookies from 'universal-cookie';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from '../themes/theme';

import authReducer from '../store/reducers/auth';
import registerReducer from '../store/reducers/register';
import userReducer from '../store/reducers/user';

import redirectTo from '../shared/redirectTo';

import Layout from '../containers/Layout/Layout';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
});

const makeStore = (initialState, options) => createStore(rootReducer, initialState, applyMiddleware(thunk));

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = new Cookies();
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    if (typeof cookies.get('token') === 'undefined') {
      if (ctx.pathname == '/auth' || ctx.pathname === '/user/new') {
        return { pageProps };
      }
      redirectTo('/auth', '/login', { res: ctx.res, status: 301 });
    } else {
    }

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Head>
            <title>Jetter</title>
          </Head>
          <ThemeProvider theme={DefaultTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
