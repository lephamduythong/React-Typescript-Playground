/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Switch, Route, BrowserRouter, NavLink } from 'react-router-dom';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { AboutPage } from './containers/AboutPage';
import asyncComponent from './hoc/asyncComponent/index';

const AsyncLazyPage = asyncComponent(() => {
  let lazyPromise = import('./containers/LazyPage');
  return lazyPromise;
});

const StyledNav = styled.div`
  a.active {
    color: yellow;
  }
`;

export function App() {
  // const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      {/* <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet> */}

      <StyledNav>
        <h1>Routing</h1>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: '/about',
                hash: '#submit',
                search: '?quick-submit=true',
              }}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/lazy">
              Lazy
            </NavLink>
          </li>
        </ul>
      </StyledNav>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/lazy" component={AsyncLazyPage} />
        <Route component={NotFoundPage} />
      </Switch>

      {/* <GlobalStyle /> */}
    </BrowserRouter>
  );
}
