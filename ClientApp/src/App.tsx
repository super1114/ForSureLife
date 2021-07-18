import React from 'react';
import 'antd/dist/antd.less';
import './styles/antd_overrides.less';
import { Provider } from 'react-redux';
import { LayoutWrapper } from './components/Layout/layout';
import { HashRouter as Router } from 'react-router-dom';
import { StoreService } from './containers/services/store_service';
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd';
import { InitialLanding1Page } from './containers/lead/initial_landing1';
import { Route } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react'


class App extends React.Component {

  componentDidMount() {
  }


  render() {

    const validateMessages = {
      required: `Field is required`,
      types: {
        email: "Email is invalid",
      },
      string: {
        max: `Max length exceeded`
      }
    };

    return (
      <Provider store={StoreService.getStore()}>

        <Router>
          <IntlProvider locale="en-us">
            <ConfigProvider form={{ validateMessages, requiredMark: false }}>
              <PersistGate loading={null} persistor={StoreService.getPersistor()}>
                <LayoutWrapper />
              </PersistGate>
            </ConfigProvider>
          </IntlProvider>
        </Router>

      </Provider>
    );
  }
}
export default App;
