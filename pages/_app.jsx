// pages/_app.js
import React from "react";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import Head from 'next/head';
import withRedux from "next-redux-wrapper";
import Cookies from 'universal-cookie';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from '../themes/theme';

import authReducer from '../store/reducers/auth';
import registerReducer from '../store/reducers/register';

import redirectTo from '../shared/redirectTo';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
});

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
    return createStore(
        rootReducer, 
        initialState,
        applyMiddleware(thunk)
    );
};

class MyApp extends App {

  static async getInitialProps({Component, router, ctx}) {
    const cookies = new Cookies();
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    if (typeof cookies.get('token') === 'undefined') {
      if (ctx.pathname == "/auth" || ctx.pathname === '/user/new') {
        return {pageProps};
      } else {
        redirectTo('/auth', '/login', { res: ctx.res, status: 301 });
      }
    } else {

    }

    return {pageProps};
  }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <Provider store={store}>
                  <Head>
                    <title>My page</title>
                  </Head>

                  <ThemeProvider theme={ DefaultTheme }>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </Provider>
            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);
