import { FormInstance, Spin, Typography } from 'antd';
import { RuleObject } from 'antd/lib/form';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { SavePayload, StartSaveApplication } from '../../actions/application_actions';
import { AAFinalExpense, ApplicationDto, QuoteClient } from '../../clients/api.generated.clients';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import _ from "lodash";
import { httpWithTokenInHeader } from '../../clients/api.clients.base';
import { FinishSaveAmAmApplication, InitializeAmAmApplication, SaveAmAmPayload, StartSaveAmAmApplication } from '../../actions/amam_actions';
import { isMobileDevice } from '../../utilities/responsive';
const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
    app: ApplicationDto;
    aaFinalExpense: AAFinalExpense;
    startSaveAmAmApplication: (savePayload: SaveAmAmPayload) => void;
    initializeAmAmApplication: (payload: AAFinalExpense) => void;
    finishSaveAmAmApplication: (aaFinalExpense: AAFinalExpense) => void;
    startSaveApplication: (savePayload: SavePayload) => void;
}

interface State {
    enabledSigning: boolean;
    loadingAmAm: boolean;
}

interface FormState {
    acceptAnyPlan: boolean[];
    check: boolean[];
}

class ReviewLoadAppClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {
            loadingAmAm: false,
            enabledSigning: true
        }
    }

    componentDidMount() {

        const { history, startSaveApplication, aaFinalExpense, finishSaveAmAmApplication, app } = this.props;
        const updatedApp = _.cloneDeep(app);
        setTimeout(() => {
            fetch(process.env.REACT_APP_IPIFY).then((data: Response) => {
                data.json().then((ipResponse: { ip: string }) => {
                    const aaFinalExpenseUpdated = _.cloneDeep(aaFinalExpense);
                    aaFinalExpenseUpdated.signed = true;
                    aaFinalExpenseUpdated.signedDate = new Date().toJSON();
                    aaFinalExpenseUpdated.signatureLocationCity = updatedApp.leadInfo.city;
                    aaFinalExpenseUpdated.signatureLocationState = updatedApp.leadInfo.state;
                    aaFinalExpenseUpdated.clientIPAddress = ipResponse.ip;
                    const client = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
                    return client.updateAmAmApplication(aaFinalExpenseUpdated).then(response => {
                        const quoteClient = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
                        finishSaveAmAmApplication(response);
                        quoteClient.submitAmAmApplication(aaFinalExpenseUpdated.application.applicationId).then(response => {
                            updatedApp.signed = true;
                            updatedApp.leadInfo.reviewPageSubmit = true;
                            startSaveApplication({ app: updatedApp, path: navRoutes.Submit.SubmitLanding.path, history })
                        });
                    }).catch(ex => {
                        return ex;
                    });
                }).catch(ex => {
                    console.log({ ex });
                })
            }).catch(ex => {
                console.log({ ex });
            })
        }, 3500);
    }

    navigate = (values: FormState) => {
        const { app } = this.props;
        const acceptAnyPlan = values.acceptAnyPlan.length > 0;
        const updatedApp = _.cloneDeep(app);
        updatedApp.applicationInfo.acceptAnyPlan = acceptAnyPlan;

    }



    render() {

        const validation = (rule: RuleObject, value: any, callback: (error?: string) => void) => {
            if (value[0]) {
                return callback();
            }
            return callback("Please accept the terms and conditions");
        };
        return (

            <div style={{ padding: 3, textAlign: 'center', marginBottom: 35 }}>
                <Title style={{ fontSize: isMobileDevice() ? 24 : 36, color: "#4676E1" }}>{`We're submitting your application!`}</Title>
                <div style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: isMobileDevice() ? 14 : 16, color: "#828282" }} strong>{`Please do not close your browser!`}</Text>
                </div>
                <div style={{ margin: 30 }}>
                    <Spin />
                </div>


                {/*<NavigationButtons*/}
                {/*    navigate={() => { this.navigate() }}*/}
                {/*    nextText="See Quote"*/}
                {/*    hideProgress*/}
                {/*/>*/}

            </div>

        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        app: state.app,
        aaFinalExpense: state.aaFinalExpense
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            startSaveAmAmApplication: (savePayload: SaveAmAmPayload) => StartSaveAmAmApplication(savePayload),
            initializeAmAmApplication: (payload: AAFinalExpense) => InitializeAmAmApplication(payload),
            finishSaveAmAmApplication: (aaFinalExpense: AAFinalExpense) => FinishSaveAmAmApplication(aaFinalExpense),
            startSaveApplication: (savePayload: SavePayload) => StartSaveApplication(savePayload)
        }, dispatch)

    }
}

export const ReviewLoadAppPage = connect(mapStateToProps, mapDispatchToProps)(ReviewLoadAppClass);
