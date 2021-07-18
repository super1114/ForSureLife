import { Col, Input, InputNumber, Radio, Row, Form, FormInstance } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationDto, ApplicationInfoDto } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { Colors } from '../../styles/colors';
import { customBindActionCreators } from '../../utilities/helper';
import { QuestionList } from '../../utilities/questions';
import * as H from 'history';
import { StartSaveApplication } from '../../actions/application_actions';
import _ from 'lodash';

interface Props extends RouteComponentProps {
    app: ApplicationDto;
    startSaveApplication: (app: ApplicationDto, path: string, history: H.History) => void;
    loading: boolean;
}

interface State {
}

type FormState = Partial<ApplicationInfoDto>;

class ReviewInsuranceClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //initialize from app
        const { app } = this.props;
        this.formRef.current.setFieldsValue({
            ...app.applicationInfo
        });
    }

    onSuccessSubmit = (values: FormState) => {
        const { history, startSaveApplication, app } = this.props;
        const updateApp = _.cloneDeep(app);
        updateApp.applicationInfo = { ...app.applicationInfo, ...values };
        startSaveApplication(updateApp, navRoutes.Review.ReviewMenuOther.path, history);
    }
    render() {

        const { } = this.state;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={<span>Okay, feel free to make any changes to your <span style={{ color: Colors.red }}>insurance info</span> below:</span>}
                        questionText={QuestionList.ReviewQuestions.ReviewUpdateMenuOther.Text}
                    />
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.onSuccessSubmit}
                        scrollToFirstError
                    >

                        <Row gutter={[16, 16]} justify="start">
                            <Col md={16} xs={24}>
                                <div style={{ fontSize: 16, color: "#959595" }}> Do you have existing life insurance or an annuity contract? </div>
                                <Form.Item name="lifePolicy" rules={[{ required: true }]} required >
                                    <Radio.Group >
                                        <Radio style={radioStyle} value={true}>
                                            Yes
                        </Radio>
                                        <Radio style={radioStyle} value={false}>
                                            No
                        </Radio>
                                    </Radio.Group>
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} justify="start">
                            <Col md={16} xs={24}>
                                <div style={{ fontSize: 16, color: "#959595" }}> {QuestionList.PolicyQuestions.PolicyReplacement.Title} </div>
                                <Form.Item name="lifePolicy" rules={[{ required: true }]} required >
                                    <Radio.Group>
                                        <Radio style={radioStyle} value={true}>
                                            Yes
                        </Radio>
                                        <Radio style={radioStyle} value={false}>
                                            No
                        </Radio>
                                    </Radio.Group>
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }} gutter={[16, 16]} justify="start">
                            <Col md={12} xs={24}>
                                <Form.Item label="Insurance Company" name="lifePolicyInsuranceCompany" rules={[{ required: true }]} required >
                                    <Input
                                        size="large"


                                        placeholder="Insurance Company" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }} gutter={[16, 16]} justify="start">
                            <Col md={12} xs={24}>
                                <Form.Item label="Policy Number" name="lifePolicyNumber" rules={[{ required: true }]} required >

                                    <Input
                                        size="large"
                                        placeholder="Policy Number" />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row style={{ marginTop: 16 }} gutter={[16, 16]} justify="start">
                            <Col md={12} xs={24}>
                                <Form.Item label="Amount of Coverage" name="lifeCoverageAmount" rules={[{ required: true }]} required >
                                    <InputNumber
                                        size="large"
                                        style={{ width: '100%' }}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        placeholder="Amount of Coverage" />
                                </Form.Item>
                            </Col>
                        </Row>


                        <NavigationButtons
                            hideProgress
                            nextText="Save Changes"
                            loading={this.props.loading}
                        />
                    </Form>


                </CardWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        app: state.app,
        loading: state.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            startSaveApplication: (app: ApplicationDto, path: string, history: H.History) => StartSaveApplication({ app, path, history })
        }, dispatch)

    }
}

export const ReviewInsurancePage = connect(mapStateToProps, mapDispatchToProps)(ReviewInsuranceClass);
