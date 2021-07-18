import { Checkbox, Col, Form, FormInstance, Input, Row, Spin } from 'antd';
import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { SavePayload, StartSaveApplication } from '../../actions/application_actions';
import { AAFinalExpense, ApplicationDto, QuoteClient } from '../../clients/api.generated.clients';
import { AppReview } from '../../components/app_review';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';
import _ from "lodash";
import { httpWithTokenInHeader } from '../../clients/api.clients.base';
import { FinishSaveAmAmApplication, InitializeAmAmApplication, SaveAmAmPayload, StartSaveAmAmApplication } from '../../actions/amam_actions';

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

class ReviewAppClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {
            loadingAmAm: false,
            enabledSigning: true
        }
    }

    componentDidMount() {
        const { initializeAmAmApplication, app } = this.props;
        const quoteClient = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
        this.formRef.current.setFieldsValue({
            acceptAnyPlan: app.applicationInfo.acceptAnyPlan ? [true] : [],
            check: []
        });
        this.setState({ loadingAmAm: true }, () => {
            quoteClient.getAmAmApplication(app.applicationId).then(response => {
                initializeAmAmApplication(response);
                this.setState({ loadingAmAm: false });
            }).catch(ex => {
                console.log({ ex });
                this.setState({ loadingAmAm: false });
            });
        });



    }

    navigate = (values: FormState) => {
        const { history, startSaveApplication, aaFinalExpense, finishSaveAmAmApplication, app } = this.props;
        const acceptAnyPlan = values.acceptAnyPlan.length > 0;
        const updatedApp = _.cloneDeep(app);
        updatedApp.applicationInfo.acceptAnyPlan = acceptAnyPlan;
        updatedApp.leadInfo.reviewPageSubmit = true;
        startSaveApplication({ app: updatedApp, path: navRoutes.Review.ReviewLoadApp.path, history })
        //fetch(process.env.REACT_APP_IPIFY).then((data: Response) => {
        //    data.json().then((ipResponse: { ip: string }) => {
        //        const aaFinalExpenseUpdated = _.cloneDeep(aaFinalExpense);
        //        aaFinalExpenseUpdated.signed = true;
        //        aaFinalExpenseUpdated.signedDate = new Date().toJSON();
        //        aaFinalExpenseUpdated.signatureLocationCity = updatedApp.leadInfo.city;
        //        aaFinalExpenseUpdated.signatureLocationState = updatedApp.leadInfo.state;
        //        aaFinalExpenseUpdated.clientIPAddress = ipResponse.ip;
        //        const client = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
        //        return client.updateAmAmApplication(aaFinalExpenseUpdated).then(response => {
        //            const quoteClient = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
        //            finishSaveAmAmApplication(response);
        //            quoteClient.submitAmAmApplication(aaFinalExpenseUpdated.application.applicationId).then(response => {
        //                startSaveApplication({ app: updatedApp, path: navRoutes.Submit.SubmitLanding.path, history })
        //            });
        //        }).catch(ex => {
        //            return ex;
        //        });
        //    }).catch(ex => {
        //        console.log({ ex });
        //    })
        //}).catch(ex => {
        //    console.log({ ex });
        //})
    }

    validateSignature = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => {
        const { app } = this.props;
        const { firstName, lastName } = app.applicationInfo;
        if (value) {
            const signature = value.replace(/\s/g, '').toLowerCase();
            const fn = firstName.replace(/\s/g, '').toLowerCase();
            const ln = lastName.replace(/\s/g, '').toLowerCase();
            if (signature !== fn + ln) {
                callback(`Signature must match name ${firstName} ${lastName}`);
            } else {
                callback();
            }
        } else {
            callback();
        }
    }

    render() {
        const { history, app, aaFinalExpense } = this.props;

        const validation = (rule: RuleObject, value: any, callback: (error?: string) => void) => {
            if (value[0]) {
                return callback();
            }
            return callback("Please accept the terms and conditions");
        };
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.ReviewQuestions.ReviewApp.Title}
                        questionText={QuestionList.ReviewQuestions.ReviewApp.Text}
                    />
                    <Form<FormState>
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.navigate}
                        scrollToFirstError={{
                            behavior: (actions) => {
                                actions.forEach(({ el, top, left }) => {
                                    el.scrollTop = top - 1000
                                    el.scrollLeft = left
                                })
                            }
                        }}
                    >
                        <Row justify="start" align="top">
                            <Col md={24} xs={24}>
                                <Form.Item name="check" rules={[{ validator: validation }]} required>
                                    <Checkbox.Group>
                                        <Checkbox value={true}>
                                            {`I agree with the terms and conditions below. `}
                                        </Checkbox>
                                    </Checkbox.Group>
                                </Form.Item>
                            </Col>

                            <Col md={24} xs={24} >
                                <Form.Item name="signature" label="Signature" rules={[{ required: true }, {
                                    validator: (
                                        rule: RuleObject, value: StoreValue, callback: (error?: string) => void
                                    ) => this.validateSignature(rule, value, callback)
                                    , validateTrigger: 'onBlur'
                                }]} required>
                                    <Input
                                        className="sig1"
                                        size="large"
                                        placeholder="Sign Here"
                                        style={{ fontSize: '24px !important' }}
                                        disabled={!this.state.enabledSigning}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>
                        <NavigationButtons
                            nextText="Submit"
                            hideProgress
                            disable={this.state.loadingAmAm}
                      
                        />

                        {this.state.loadingAmAm
                            ? <Row style={{ marginTop: 20 }} justify="center">
                                <Spin tip="Loading..." />
                            </Row>
                            : <div>
                                <AppReview aaFinalExpense={aaFinalExpense} app={app} />
                                <Row justify="start" align="top">
                                    <Col md={24} xs={24}>
                                        <Form.Item name="check" rules={[{ validator: validation }]} required>
                                            <Checkbox.Group>
                                                <Checkbox value={true}>
                                                    {`By checking this box, I certify the information I have entered
                                is accurate, to the best of my knowledge and I agree to the terms
                                and conditions as presented. `}
                                                </Checkbox>
                                            </Checkbox.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col md={24} xs={24} >
                                        <Form.Item name="signature" label="Signature" rules={[{ required: true }, {
                                            validator: (
                                                rule: RuleObject, value: StoreValue, callback: (error?: string) => void
                                            ) => this.validateSignature(rule, value, callback)
                                            , validateTrigger: 'onBlur'
                                        }]} required>
                                            <Input
                                                className="sig1"
                                                size="large"
                                                placeholder="Sign Here"
                                                style={{ fontSize: '24px !important' }}
                                                disabled={!this.state.enabledSigning}
                                            />
                                        </Form.Item>

                                    </Col>
                                </Row>
                                <NavigationButtons
                                    nextText="Submit" 
                                    hideProgress
                                    disable={this.state.loadingAmAm}
                         
                                />

                            </div>}
                        <Col style={{ marginTop: 20 }} md={24} xs={24}>
                            <Form.Item name="acceptAnyPlan">
                                <Checkbox.Group>
                                    <Checkbox value={true}>
                                        {`Check here if you are willing to accept any plan for which you qualify based on
                                            this application. The insurance for which you qualify may have a graded or return
                                            of premium death benefit for the first two (2) or three (3) years, a face amount
                                            less than any indicated on this application, and riders may not be available.`}
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    </Form>
                </CardWrapper>
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

export const ReviewAppPage = connect(mapStateToProps, mapDispatchToProps)(ReviewAppClass);
