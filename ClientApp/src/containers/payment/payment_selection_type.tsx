import { Button, Col, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
    SavePayload,
    StartSaveApplication,
    UpdatePaymentInfo,
} from "../../actions/application_actions";
import { LeadFlow } from "../../actions/nav_actions";
import {
    AccountType,
    ApplicationDto,
    PaymentInfo,
    PaymentInfoDto,
    PaymentType,
} from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";
import { isMobileDevice } from "../../utilities/responsive";
import './payment_checking_or_savings.css';
import _ from "lodash";
import lock from "../../assets/lock.png";
import norton from "../../assets/norton_seal.png";
import SafetyBadge from "../../assets/SafetyBadge.svg";

interface Props extends RouteComponentProps {
    updatePaymentInfo: (paymentinfo: PaymentInfoDto) => void;
    paymentInfo: PaymentInfo;
    startSaveApplication: (payload: SavePayload) => void;
    app: ApplicationDto;
    flow: LeadFlow;
}

interface State {
    bankType: AccountType;
}

class PaymentSelectedTypePageClass extends React.Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            PaymentType: PaymentType.BankDraft,
        };
    }

    creditDebit = () => {
        const {
            history,
            paymentInfo,
            flow,
            updatePaymentInfo,
            startSaveApplication,
            app,
        } = this.props;
        const updatedApp = _.cloneDeep(app);
        const updatedPayment = { ...paymentInfo, PaymentType: PaymentType.Credit };
        updatePaymentInfo(updatedPayment);

        let nextRoute = navRoutes.Review.ReviewApp.path;
        if (flow == LeadFlow.A) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.B) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.C) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.D) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.E) {
            nextRoute = navRoutes.Policy.PolicySocialPage.path;
        } else {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        }

        updatedApp.leadInfo.paymentAccountSet = true;
        startSaveApplication({
            app: updatedApp,
            history,
            path: nextRoute,
        } as SavePayload);
    };

    bankDraft = () => {
        const {
            history,
            paymentInfo,
            flow,
            updatePaymentInfo,
            startSaveApplication,
            app,
        } = this.props;
        const updatedApp = _.cloneDeep(app);
        const updatedPayment = { ...paymentInfo, PaymentType: PaymentType.BankDraft };
        updatePaymentInfo(updatedPayment);

        let nextRoute = navRoutes.Review.ReviewApp.path;
        if (flow == LeadFlow.A) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.B) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.C) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.D) {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        } else if (flow == LeadFlow.E) {
            nextRoute = navRoutes.Policy.PolicySocialPage.path;
        } else {
            nextRoute = navRoutes.Payment.PaymentDate.path;
        }

        startSaveApplication({
            app: updatedApp,
            history,
            path: nextRoute,
        } as SavePayload);
    };

    componentDidMount() {
        const { paymentInfo } = this.props;
        this.setState({ bankType: paymentInfo.bankType });
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <CardWrapper>
                    <div className="d-flex justify-between flex-column h-100">
                        <div style={{ textAlign: isMobileDevice() ? 'center' : 'left' }}>
                            <QuestionDisplay
                                questionTitle={
                                    QuestionList.PaymentQuestions.PaymentCheckingOrSavings.Title
                                }
                                questionText={
                                    QuestionList.PaymentQuestions.PaymentCheckingOrSavings.Text
                                }
                                height={isMobileDevice() ? 100 : 200}
                            />
                        </div>
                        <div>
                            <Row style={{ marginTop: 30 }}>
                                <Col md={24}>
                                    <div className="payment-type">
                                        <img
                                            src={SafetyBadge}
                                            alt="saftey badge"
                                            className="safety-shield-img"
                                        />
                                        <p className="text-center text-white" style={{ fontSize: '15px' }}>Some Text here?</p>
                                        <Row gutter={[16, 16]} align="middle" justify="center">
                                            <Col className="ant-col-flex-center" md={8} xs={12}>

                                                <Button
                                                    className="payment-type-btn"
                                                    shape="round"
                                                    size="large"
                                                    onClick={() => {
                                                        this.creditDebit();
                                                    }}
                                                >
                                                    Credit/Debit
                          </Button>
                                            </Col>
                                            <Col className="ant-col-flex-center" md={8} xs={12}>
                                                <Button
                                                    className="payment-type-btn"
                                                    shape="round"
                                                    size="large"
                                                    onClick={() => {
                                                        this.bankDraft();
                                                    }}
                                                >
                                                    BankDraft
                          </Button>
                                            </Col>

                                        </Row>
                                        <Row style={{ marginTop: 16 }} justify="end">
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: "#1C1C1C",
                                                    fontWeight: 100,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginBottom: 5,
                                                }}
                                            >
                                                <img style={{ margin: -5 }} src={lock} width={30} />
                                                <div className="text-center text-white"
                                                    style={{
                                                        marginLeft: 5,

                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {`This is a secure form protected by Norton Security.`}
                                                </div>
                                            </div>
                                            <Col className="ant-col-flex-center" md={4} xs={24}>
                                                <img src={norton} width={100} />
                                            </Col>
                                        </Row>
                                    </div>

                                </Col>

                            </Row>
                        </div>
                        <NavigationButtons
                            progressPercent={60}
                            hideNext
                            navigate={() =>
                                navigate(history, navRoutes.Knockout.MultipleCancer.path)
                            }
                        />
                    </div>
                </CardWrapper>
            </div>
        );
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        flow: state.navigation.leadFlow,
        paymentInfo: state.app.paymentInfo,
        app: state.app,
        loading: state.layout.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators(
            {
                startSaveApplication: (payload: SavePayload) =>
                    StartSaveApplication({
                        app: payload.app,
                        path: payload.path,
                        history: payload.history,
                    }),
                updatePaymentInfo: (paymentInfo) => UpdatePaymentInfo(paymentInfo),
            },
            dispatch
        ),
    };
};

export const PaymentSelectedTypePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentSelectedTypePageClass);
