import React from 'react';
import { connect } from "react-redux";
import { GlobalState } from '../../../reducers/root_reducer';
import { RouteComponentProps } from "react-router";
import { customBindActionCreators } from '../../../utilities/helper';
import { Col, Input, Row, Form, List, Typography, Divider, FormInstance } from 'antd';
import resumeLandingBanner from '../../../assets/Resume-Flow-Top-Prelim.png'
import checkedIcon from '../../../assets/checked.svg'
import './resume_landing_page.css'
import { CustomButton } from "../../../components/custom_buttom";
import AboutUsReader from "../../../assets/immediate_assets/Application-Process.png";
import CustomCard from "../../../components/CustomCard/CustomCard";
import { validatePhone } from '../../../utilities/validator';
import MaskedInput from "antd-mask-input";
import { navigate } from "../../../utilities/navigation_util";
import { navRoutes } from "../../../nav/routes";
import { LeadFlow, SetLeadFlow } from "../../../actions/nav_actions";
import { ApplicationClient, ApplicationDto, AuthorizeClient, LoginModelDto } from "../../../clients/api.generated.clients";
import { httpWithTokenInHeader } from "../../../clients/api.clients.base";
import { UpdateLeadInfo } from "../../../actions/lead_actions";
import { TokenResponse } from '../../..';
import { saveJwt } from '../../../utilities/jwt';
import { InitializeApplication } from '../../../actions/application_actions';

interface Props extends RouteComponentProps {
    flow: LeadFlow;
    app: ApplicationDto;
    updateLeadInfo: (leadInfo) => void;
    initializeApplication: (app: ApplicationDto) => void;
    setLeadFlow: (leadFlow: LeadFlow) => void;
}

class ResumeLandingClass extends React.Component<Props, any> {

    componentDidMount() {
        const { updateLeadInfo, setLeadFlow, initializeApplication } = this.props;
        const ChallengeCode = new URLSearchParams(this.props.location.search).get("ChallengeCode");
        const email = new URLSearchParams(this.props.location.search).get("email");
        const phone = new URLSearchParams(this.props.location.search).get("phone");
        const applicationId = new URLSearchParams(this.props.location.search).get("applicationId");
        const applicationClient = new ApplicationClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);

        if (ChallengeCode != undefined && ChallengeCode != '') {
            ChallengeCode && applicationClient.resumeActivityChallenge(email, phone, ChallengeCode).then((app) => {
                initializeApplication(app);
                setLeadFlow(isNaN(Number(app.leadInfo.leadSource)) ? Number(app.leadInfo.leadSource.substring(app.leadInfo.leadSource.length - 1)) : Number(app.leadInfo.leadSource));
                this.initializeToken(app.applicationId);
                this.navigateResume(this.props.app);
            }).catch(error => {
                console.log(error)
                alert("challenge code has expired");
            });
        }


        if (applicationId != undefined && applicationId != '') {
            applicationId && applicationClient.getResume(email, phone, applicationId).then((app) => {
                initializeApplication(app);
                setLeadFlow(isNaN(Number(app.leadInfo.leadSource)) ? Number(app.leadInfo.leadSource.substring(app.leadInfo.leadSource.length - 1)) : Number(app.leadInfo.leadSource));
                this.initializeToken(app.applicationId);
                this.navigateResume(this.props.app);
            }).catch(error => {
                console.log(error)
                alert("Invalid Link")
            });
        }
    }

    getResume = (values: any) => {
        const { history } = this.props;
        const applicationId = new URLSearchParams(this.props.location.search).get("applicationId");
        const ChallengeCode = new URLSearchParams(this.props.location.search).get("ChallengeCode");
        const applicationClient = new ApplicationClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);

        applicationId && applicationClient.getResume(values.email, values.phone, applicationId).then((responce) => {
            console.log("applicationId", responce)
            this.navigateResume(this.props.app);
        }).catch(error => { console.log(error) });

        !applicationId && !ChallengeCode && applicationClient.resumeActivity(values.email, values.phone).then((responce) => {
            console.log(responce)
            navigate(history, navRoutes.Resume.CheckMail.path);
        }).catch(error => { console.log(error) });
    }

    initializeToken = (appId: string) => {
        const client = new AuthorizeClient(process.env.REACT_APP_API_URL);
        const login: LoginModelDto = {
            username: "ForSureLifeApp",
            password: "SomethingSecret",
            applicationId: appId
        }
        client.createToken(login)
            .then(response => response.data.text())
            .then((data => {
                const tokenResponse: TokenResponse = JSON.parse(data);
                saveJwt(tokenResponse.token);
            }
            )).catch(ex => {
                console.log({ ex });
            });
    }

    navigateResume = (app: ApplicationDto) => {
        const { flow, history } = this.props;

        //flow = app.leadInfo.leadSource.match(/(\d+)/);
     
        if (app.leadInfo.reviewPageSeen) {
            //alert("Got to Review");
            navigate(history, navRoutes.Review.ReviewApp.path);
        } else if (app.leadInfo.socialSet) {
            //alert("Got to Social");
            navigate(history, navRoutes.Policy.PolicySocialPage.path);
        } else if (app.leadInfo.paymentAccountSet) {
            //alert("Got to Account");
            navigate(history, navRoutes.Payment.PaymentLanding.path);
        } else if (app.leadInfo.paymentDateSet) {
            //alert("Got to Date");
            navigate(history, navRoutes.Payment.PaymentDate.path);
        } else if (app.leadInfo.beneficiarySet) {
            //alert("Got to Beneficiaries");
            navigate(history, navRoutes.Beneficiary.BeneficiaryForm.path);
        } else if (app.leadInfo.secondQuoteReceived || app.leadInfo.clickedEnrolled) {
            navigate(history, navRoutes.Quote.QuoteLoading2.path);
        } else if (app.leadInfo.healthQuestionsAnswered) {
            /*alert("Got to Health");*/
            navigate(history, navRoutes.Health.Paralysis.path);
        } else if (app.leadInfo.isEligible) {
            /*alert("Got to Knockout");*/
            navigate(history, navRoutes.Knockout.SelfReliant.path);
        } else if (app.leadInfo.quoteReceived || app.leadInfo.clickedApplied) {
            /*alert("Got to Quote");*/
            navigate(history, navRoutes.Quote.QuoteLoading.path);
        } else if (app.leadInfo.leadCompleted) {
            /*alert("Got to Email");*/
            navigate(history, navRoutes.Policy.PolicyEmail.path);
        } else {

            navigate(history, navRoutes.Quote.QuoteLoading.path);
        }
    }

    render() {
        const email = new URLSearchParams(this.props.location.search).get("email");
        const phone = new URLSearchParams(this.props.location.search).get("phone");
        const data = [
            'Peace of mind for you and your love ones.',
            'Fixed premiums that will never go up.',
            'Coverage will never go down.',
            'No waiting period.',
            'Cash value benefits',
            'No medical exams.',
            'You control the entire process.',
        ];

        const cardData = {
            title: "Let's pick up where you left off.",
            description: "Enter your email address and phone number to log in to your profile and finish your application."
        }
        return (
            <>
                <Form
                    onFinish={this.getResume}
                    layout="vertical"
                    name="basic"
                >
                    {/*RESUME FLOW BANNER*/}
                    <div className="resume-wrapper">
                        <Row justify="center" align="bottom">
                            <Col lg={12} xxl={8} span={24}>
                                <div>
                                    <h1>
                                        <span className="resume-wrapper-title">Welcome Back!</span>
                                        <div className="resume-wrapper-bottom" />
                                    </h1>
                                    <img className="resume-wrapper-img"
                                        src={resumeLandingBanner}
                                        alt="resume landing banner" />
                                </div>
                            </Col>
                            <Col xxl={6} lg={7} span={24}>
                                <CustomCard className="resume-wrapper-form" title={cardData.title} description={cardData.description} >
                                    <div className="resume-wrapper-form-field">
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{
                                                required: true,
                                                type: "email",
                                                message: 'Please input your Email'
                                            },
                                            {}]}
                                            initialValue={email}
                                        >
                                            <Input type="email" size="large" placeholder="Email" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Phone"
                                            name="phone"
                                            rules={[{ required: true, validator: validatePhone, validateTrigger: 'onBlur', message: 'Please input your Phone' }]}
                                            initialValue={phone}
                                        >
                                            <MaskedInput type="tel" size="large" mask="111-111-1111" placeholder="123-456-7891" />
                                        </Form.Item>
                                        <CustomButton icon text="Finish My Application" />
                                        <p className="time-counter">Time Left: 3 mins</p>
                                    </div>
                                </CustomCard>

                            </Col>
                        </Row>
                    </div>

                    {/*RESUME FLOW TAGLINE*/}

                    <div className="resume-flow-tagline">
                        <Row justify="center">
                            <Col span={24} md={12}>
                                <h3>We're here to help you secure a financial future that protects you and your family.</h3>
                            </Col>
                        </Row>
                    </div>

                    {/*RESUME FLOW PLAN BENEFITS*/}

                    <div className="resume-plan-benefits">
                        <Row justify="center">
                            <Col style={{ textAlign: 'center' }}>
                                <div className="plan-benefits-list">
                                    <List
                                        header={'7 Benefits of Our Plan'}
                                        dataSource={data}
                                        renderItem={item => (<>
                                            <List.Item>
                                                <img src={checkedIcon} /><Typography.Text mark></Typography.Text>
                                                {item}
                                            </List.Item>
                                            <Divider />
                                        </>
                                        )}
                                    />
                                </div>
                                <CustomButton icon text="Finish My Application" />
                            </Col>
                        </Row>
                    </div>

                    {/*RESUME APPLICATION CONTENT*/}

                    <div className="resume-application-content">
                        <Row>
                            <Col>
                                <h1 className="resume-application-title">Don't Wait. Rates only go up as you get older.</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 10, order: 1 }} xs={{ span: 24, order: 2 }}>
                                <div className="resume-committment-text">
                                    <h1 className="resume-application-title-inside">Don't Wait. Rates only go up as you get
                                        older.
                                    </h1>
                                    <p>You've already done the hard part! You've filled out your health information and
                                        found that you're eligible for coverage. </p>
                                    <p>Now it's time to lock in your rate before missing out on your lowest possible costs.
                                        Getting coverage before another year passes and while you're still eligible for
                                        coverage is critical to saving the most on your final expense insurance. </p>
                                    <p>From here, it will take just 3 minutes to finish your application!</p>

                                </div>
                                <div className="custtom-button">
                                    <CustomButton inverted icon text="Finish Application" />
                                </div>
                            </Col>
                            <Col md={{ span: 12, order: 2, offset: 2, }} xs={{ span: 24, order: 1 }}>
                                <div className="resume-happy-wrapper"><img className="resume-happy-old-img" src={AboutUsReader} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </>

        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        flow: state.navigation.leadFlow,
        app: state.app,
        leadInfo: state.app.leadInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateLeadInfo: (leadInfo) => UpdateLeadInfo(leadInfo),
            initializeApplication: (app) => InitializeApplication(app),
            setLeadFlow: (leadFlow) => SetLeadFlow(leadFlow)
        }, dispatch)
    }
}

export const ResumeLandingPage = connect(mapStateToProps, mapDispatchToProps)(ResumeLandingClass);
