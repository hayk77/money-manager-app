import React, { useEffect } from 'react';

import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import store from './redux/store';

import Homepage from './pages/home-page/homepage';
import NewRecordPage from './pages/new-record-page/new-record-page';
import RecordsPage from './pages/records-page/records-page';
import RecordPage from './pages/records-page/record-edit/record-edit';
import AboutPage from './pages/about-page/about-page';
import Menu from './components/menu/menu';
import SignupPage from './pages/signup-page/signup-page';
import SigninPage from './pages/signin-page/signin-page';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/private-route/private-route';
import AddAccountPage from './pages/add-account-page/add-account-page';
import EditAccountPage from './pages/edit-account-page/edit-account-page';
import Alert from './containers/alert/alert';
import CategoriesPage from './pages/categories-page/categories-page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { loadUser } from './redux/auth/auth.actions';
import { Provider } from 'react-redux';
import NewCategoryPage from './pages/new-category-page/new-category-page';

if (localStorage.jwttoken) {
  setAuthToken(localStorage.jwttoken);
}

const App: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <Menu />
          {/* <IonTabs> */}
          <IonRouterOutlet id='main'>
            <PrivateRoute exact path='/' component={Homepage} />

            <PrivateRoute
              exact
              path='/accounts/new'
              component={AddAccountPage}
            />
            <PrivateRoute
              exact
              path='/accounts/:id'
              component={EditAccountPage}
            />

            <PrivateRoute exact path='/categories' component={CategoriesPage} />
            <PrivateRoute
              exact
              path='/categories/new'
              component={NewCategoryPage}
            />

            <PrivateRoute exact path='/records/new' component={NewRecordPage} />
            <PrivateRoute
              exact
              path='/records/:recordId'
              component={RecordPage}
            />
            <PrivateRoute exact path='/records' component={RecordsPage} />

            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/signin' component={SigninPage} />
            <Redirect to='/' />
          </IonRouterOutlet>
          {/* <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='records' href='/records'>
            <IonIcon icon={cashOutline} />
            <IonLabel>Records</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
          {/* </IonTabs> */}
        </IonReactRouter>
        <Alert />
      </IonApp>
    </Provider>
  );
};

export default App;
