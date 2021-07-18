import { CalendarOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Input, Radio, Row, Select } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import moment from 'moment';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { StartSaveApplication } from '../../actions/application_actions';
import { ApplicationDto, Gender, LeadDTO, States } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { Colors } from '../../styles/colors';
import { customBindActionCreators } from '../../utilities/helper';
import { QuestionList } from '../../utilities/questions';
import * as H from 'history';
import _ from 'lodash';
import { validateZip } from '../../utilities/validator';

const { Option } = Select;

interface Props extends RouteComponentProps {
    leadInfo: LeadDTO;
    app: ApplicationDto;
    startSaveApplication: (app: ApplicationDto, path: string, history: H.History) => void;
    loading: boolean;
}

interface FormState {
    firstName: string;
    middleName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    dob: string;
    gender: string;
    phone: string;
    zipCode: string;
    email: string;
};

class ReviewUpdateContactClass extends React.Component<Props, any> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //initialize from app
        const { leadInfo, app } = this.props;
        this.formRef.current.setFieldsValue({
            firstName: app.applicationInfo.firstName,
            middleName: app.applicationInfo.middleName,
            lastName: app.applicationInfo.lastName,
            address1: leadInfo.address1,
            city: leadInfo.city,
            state: leadInfo.state,
            dob: app.applicationInfo.dob ? moment(leadInfo.dob).format("MM/DD/YYYY") : "",
            gender: leadInfo.gender === 0 ? "Male" : "Female",
            phone: leadInfo.phone,
            zipCode: leadInfo.zipCode.toString(),
            email: leadInfo.email
        });



    }

    onSuccessSubmit = (values: FormState) => {
        // success call back when all required fields are present
        const { history, startSaveApplication, app } = this.props;
        const updateApp = _.cloneDeep(app);
        updateApp.leadInfo = {
            ...updateApp.leadInfo, ...values, zipCode: values.zipCode, dob: new Date(values.dob).toJSON(),
            gender: values.gender === "Male" ? Gender.Male : Gender.Female
        };
        updateApp.applicationInfo.firstName = values.firstName;
        updateApp.applicationInfo.middleName = values.middleName;
        updateApp.applicationInfo.lastName = values.lastName;
        updateApp.leadInfo.address1 = values.address1;
        updateApp.leadInfo.city = values.city;
        updateApp.leadInfo.state = values.state;

        updateApp.leadInfo.phone = values.phone;
        updateApp.leadInfo.zipCode = values.zipCode.toString();
        updateApp.leadInfo.email = values.email;
        startSaveApplication(updateApp, navRoutes.Review.ReviewMenuOther.path, history);
    }

    render() {
        const { history, loading } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={<span>Okay, feel free to make any changes to your <span style={{ color: Colors.red }}>contact info</span> below:</span>}
                        questionText={QuestionList.ReviewQuestions.ReviewUpdateMenuOther.Text}
                    />
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.onSuccessSubmit}
                        scrollToFirstError
                    >
                        < Row gutter={[16, 16]} justify="center" >

                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="firstName" rules={[{ required: true }]} label="First Name" required>
                                    <Input size="large" placeholder="First Name" />
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="middleName" label="Middle Initial" rules={[{ required: true }]} required>
                                    <Input size="large" placeholder="Middle Initial" />
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]} required>
                                    <Input size="large" placeholder="Last Name" />
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-flex-center" xs={24}>
                                <Form.Item name="address1" label="Home Address" rules={[{ required: true }]} required>
                                    <Input size="large" placeholder="Home Address" addonAfter={<HomeOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="city" label="City" rules={[{ required: true }]} required>
                                    <Input size="large" placeholder="City" />
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="state" label="State" rules={[{ required: true }]} required>
                                    <Select virtual={false} placeholder="State" size="large" style={{ width: '100%' }}>
                                        {
                                            Object.keys(States).filter(key => !isNaN(Number(States[key]))).map(r => {
                                                return (
                                                    <Option key={r} value={r}>{r.replace(/([A-Z])/g, ' $1').trim()}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="zipCode" label="Zip" rules={[{
                                    required: true,
                                    validator: validateZip
                                }]} required>
                                    <MaskedInput mask="11111" size="large" placeholder="Zip" />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item name="dob" rules={[{ required: true }]} label="Date of Birth" required>
                                    <MaskedInput
                                        size="large"
                                        suffix={<CalendarOutlined />}
                                        mask="11/11/1111"
                                        type="tel"
                                        placeholder="MM/DD/YYYY" />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item name="gender" rules={[{ required: true }]} label="Sex" required>
                                    <Radio.Group options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]} />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24} >
                                <Form.Item name="email" label="Email Address" required rules={[{ type: 'email', required: true }]}>
                                    <Input size="large" placeholder="Email Address" />
                                </Form.Item>

                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]} required >
                                    <MaskedInput type="tel" size="large" prefix={<PhoneOutlined />} mask="111-111-1111" placeholder="111-111-1111" />
                                </Form.Item>
                            </Col>
                        </Row >
                        <NavigationButtons
                            hideProgress
                            nextText="Save Changes"
                            loading={loading}
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
        leadInfo: state.app.leadInfo,
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

export const ReviewUpdateContactPage = connect(mapStateToProps, mapDispatchToProps)(ReviewUpdateContactClass);
