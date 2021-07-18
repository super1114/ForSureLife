import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { ApplicationDto, ApplicationInfoDto } from '../../clients/api.generated.clients';
import { SavePayload, StartSaveApplication, UpdateApplicationInfo } from '../../actions/application_actions';
import _ from "lodash";
import { STATE_HASH } from '../../utilities/data';
import { isMobileDevice } from '../../utilities/responsive';
const { Option } = Select;

interface Props extends RouteComponentProps {
    updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
    startSaveApplication: (savePayload: SavePayload) => void;
    applicationInfo: ApplicationInfoDto;
    app: ApplicationDto;
    loading: boolean;
}

interface State {
}

interface FormState {
    physicianName: string,
    city: string,
    state: string
}

class DoctorPageClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        //initialize from app
        const { applicationInfo } = this.props;
        this.formRef.current.setFieldsValue({
            physicianName: applicationInfo.doctorName,
            city: applicationInfo.doctorCity,
            state: STATE_HASH[applicationInfo.doctorState]
        });
    }

    onSuccessSubmit = (values: FormState) => {
        const { history, startSaveApplication, app } = this.props;
        const updateApp = _.cloneDeep(app);
        updateApp.applicationInfo.doctorName = values.physicianName;
        updateApp.applicationInfo.doctorCity = values.city;
        updateApp.applicationInfo.doctorState = STATE_HASH[values.state];
        startSaveApplication({ app: updateApp, path: navRoutes.Policy.PolicySocialPage.path, history });
    }

    render() {
        const { loading } = this.props;

        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={`Now, we'll just need contact info for your doctor`}
                        height={isMobileDevice() ? 100 : 200}
                    />
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.onSuccessSubmit}
                        scrollToFirstError
                    >
                        < Row gutter={[16, 16]} justify="center" >

                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="physicianName" rules={[{ required: true }]} label="Physician Name" required >
                                    <Input
                                        size="large"
                                        placeholder="Physician Name" />
                                </Form.Item>
                            </Col>
                        </ Row>

                        <Row gutter={[16, 16]} style={{ marginTop: 10 }} justify="center">
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item required rules={[{ required: true }]} label="City" name="city">
                                    <Input
                                        size="large"
                                        placeholder="City" />
                                </Form.Item>
                            </Col>
                        </ Row>
                        <Row gutter={[16, 16]} style={{ marginTop: 10 }} justify="center">
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Form.Item name="state" label="State" rules={[{ required: true }]} required>
                                    <Select defaultActiveFirstOption={false} virtual={false} placeholder="State" size="large" style={{ width: '100%' }}>
                                        {
                                            Object.keys(STATE_HASH).filter(key => isNaN(Number(STATE_HASH[key]))).map(r => {
                                                return (
                                                    <Option key={r} value={STATE_HASH[r]}>{STATE_HASH[r]}</Option>
                                                )
                                            })
                                        }
                                    </Select>
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
        applicationInfo: state.app.applicationInfo,
        app: state.app,
        loading: state.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => UpdateApplicationInfo(appInfoDto),
            startSaveApplication: (savePayload: SavePayload) => StartSaveApplication(savePayload)
        }, dispatch)

    }
}

export const DoctorPage = connect(mapStateToProps, mapDispatchToProps)(DoctorPageClass);
