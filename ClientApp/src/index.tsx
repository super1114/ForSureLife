import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { httpWithTokenInHeader } from './clients/api.clients.base';
import { AuthorizeClient, LoginModelDto, ApplicationClient, ApplicationDto, QuoteClient } from './clients/api.generated.clients';
import { accessCookie, removeCookie } from './utilities/cookie_util';
import { EmptyObjects } from './utilities/empty_objects';
import { decodeJwt, saveJwt } from './utilities/jwt';
import { configureStore, FslStore } from './utilities/redux_store';
import { reduxInitialState } from './reducers/root_reducer';
import { StoreService } from './containers/services/store_service';
import { InitializeApplication } from './actions/application_actions';
import { getQueryParams } from './utilities/url';
import { SetLeadFlow } from './actions/nav_actions';

export interface TokenResponse {
    token: string;
    applicationId: string;
}

export const onStart = (store: FslStore, persistor) => {
    var path = window.location.hash.toLowerCase();


    StoreService.initialize(store, persistor);
    const client = new AuthorizeClient(process.env.REACT_APP_API_URL);

    const login: LoginModelDto = {
        username: "ForSureLifeApp",
        password: "SomethingSecret",
        applicationId: ""
    }
    const appClient = new ApplicationClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);

    const jwt = accessCookie("fsl_jwt");

    const queryParams = getQueryParams(window.location.hash);
    var leadFlow = 5;
    if (queryParams.flow) {
        store.dispatch(SetLeadFlow(queryParams.flow));
        window.history.pushState({}, document.title, window.location.hash.split('?')[0]);
        leadFlow = queryParams.flow;
    }

    const decodedJwt = decodeJwt(jwt);
    const expired = decodedJwt && Date.now() >= decodedJwt.exp * 1000;
    if (path !== "#/thankyou") {
        const challengeCode = queryParams.ChallengeCode;
        const email = queryParams.email;
        const phone = queryParams.phone;
        const resumeFlow = !!challengeCode && !!email && !!phone;
        if (jwt && !expired) {

            // appClient.get().then(response => {
            //   store.dispatch(InitializeApplication(response));
            // }).catch(ex => {
            //   console.log({ ex });
            // })

        } else if (!resumeFlow) {

            if (expired) {
                removeCookie("fsl_jwt")
            }
            const emptyApplication = EmptyObjects.EmptyApplication;
            login.applicationId = emptyApplication.applicationId;
            client.createToken(login)
                .then(response => response.data.text())
                .then((data => {
                    const tokenResponse: TokenResponse = JSON.parse(data);
                    saveJwt(tokenResponse.token);
                    // emptyApplication.applicationId = tokenResponse.applicationId;
                    appClient.create(emptyApplication).then(response => {
                        store.dispatch(InitializeApplication(response));
                    }).catch(ex => {
                        console.log({ ex });
                    });
                }
                )).catch(ex => {
                    console.log({ ex });
                });
        }

    }
}

const store = configureStore(reduxInitialState);
onStart(store.store, store.persistor);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
