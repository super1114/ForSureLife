import { Col, Form, FormInstance, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../../components/question_display";
import { navRoutes } from "../../../nav/routes";
import { GlobalState } from "../../../reducers/root_reducer";
import { customBindActionCreators } from "../../../utilities/helper";
import { QuestionList } from "../../../utilities/questions";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import MaskedInput from "antd-mask-input";
import _ from "lodash";
import {
    SavePayload,
    StartSaveApplication,
    UpdateApplicationInfo,
} from "../../../actions/application_actions";
import {
    ApplicationDto,
    ApplicationInfoDto,
} from "../../../clients/api.generated.clients";
import lock from "../../../assets/lock.png";
import norton from "../../../assets/norton_seal.png";
import SafetyBadge from "../../../assets/SafetyBadge.svg";
import { LeadFlow } from "../../../actions/nav_actions";
import "./policy_social.css";
import { isMobileDevice } from "../../../utilities/responsive";

interface Props extends RouteComponentProps {
    updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
    startSaveApplication: (payload: SavePayload) => void;
    flow: LeadFlow;
    applicationInfo: ApplicationInfoDto;
    app: ApplicationDto;
}

interface State { }

interface FormState {
    ssn: string;
}

class PolicySocialClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {};
    }

    updateAndNavigate = (values: FormState) => {
        const {
            history,
            flow,
            updateApplicationInfo,
            applicationInfo,
            startSaveApplication,
            app,
        } = this.props;
        const updatedApp = _.cloneDeep(app);
        const updatedAppInfo: ApplicationInfoDto = _.cloneDeep(applicationInfo);
        updatedApp.applicationInfo.ssn = values.ssn.replace(/-/g, "");
        updateApplicationInfo(updatedAppInfo);

        let nextRoute = navRoutes.Payment.PaymentLanding.path;

        if (flow == LeadFlow.A) {
            nextRoute = navRoutes.Payment.PaymentLanding.path;
        } else if (flow == LeadFlow.B) {
            nextRoute = navRoutes.Payment.PaymentLanding.path;
        } else if (flow == LeadFlow.C) {
            nextRoute = navRoutes.Payment.PaymentLanding.path;
        } else if (flow == LeadFlow.D) {
            nextRoute = navRoutes.Payment.PaymentLanding.path;
        } else if (flow == LeadFlow.E) {
            nextRoute = navRoutes.Review.ReviewApp.path;
        } else {
            nextRoute = navRoutes.Payment.PaymentLanding.path;
        }
        updatedApp.leadInfo.socialSet = true;
        updatedApp.leadInfo.reviewPageSeen = true;
        startSaveApplication({
            app: updatedApp,
            history,
            path: nextRoute,
        } as SavePayload);
    };

    componentDidMount() {
        const { applicationInfo } = this.props;
        this.formRef.current.setFieldsValue({
            ssn: applicationInfo.ssn ? applicationInfo.ssn.toString() : "",
        });
    }

    render() {
        const { history, flow } = this.props;
        return (
            <div>
                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicySocial.Title}
                        questionText={QuestionList.PolicyQuestions.PolicySocial.SubText}
                    />
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.updateAndNavigate}
                        scrollToFirstError
                    >
                        <div className="policy-social-form">
                            <Row gutter={[4, 4]} justify="center" align="bottom">
                                <Col md={11} xs={24} style={{ alignSelf: "stretch" }}>
                                    <div style={{ fontFamily: "Arial", marginTop: 20}}>
                                        <Form.Item
                                            rules={[{ required: true }]}
                                            name="ssn"
                                            style={{ marginLeft: isMobileDevice ? 10 : 0, width:"95%" }}
                                            label={
                                                <p className="security-label">{`Social Security Number`}</p>
                                            }
                                            required
                                        >
                                            <MaskedInput style={{ width: isMobileDevice ? "75%" : "100%" }}size="large" mask="111-11-1111" type="tel" />
                                        </Form.Item>
                             
                                    </div>
                                </Col>
                                <Col md={{ span: 12, offset: 1 }} xs={24}>
                                    <img
                                        src={SafetyBadge}
                                        alt="saftey badge"
                                        className="safety-shield-img"
                                        style={{ top: isMobileDevice() ? -50 : -20 }}
                                    />
                                    <div className="policy-social-form-instruction">

                                        <p>
                                            This will only be used for underwriting to verify your identity
                                            instead of requiring a medical exam. This will not affect
                      your credit and your information is guranteed secure.{" "}
                                        </p>
                                    </div>
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
                                    <img src={norton} width={100} />
                                </div>
                                <Col>
                                   
                                </Col>
                            </Row>
                        </div>

                        <NavigationButtons
                            nextText="Review"
                            progressPercent={flow == LeadFlow.E ? 80 : 25}
                        />
                    </Form>
                    {/*<iframe src="../../videoask-SSNPage.html" style={{*/}
                    {/*    border: "none", height: "300px",*/}
                    {/*    width: "300px", position: "fixed", right: isMobileDevice() ? "0px" : "150px", bottom: isMobileDevice() ? "0px" : "50px"*/}
                    {/*}} />*/}
                </CardWrapper>
            </div>
        );
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        flow: state.navigation.leadFlow,
        applicationInfo: state.app.applicationInfo,
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
                updateApplicationInfo: (appInfoDto: ApplicationInfoDto) =>
                    UpdateApplicationInfo(appInfoDto),
            },
            dispatch
        ),
    };
};

export const PolicySocialPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PolicySocialClass);
