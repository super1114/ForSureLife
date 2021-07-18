import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import _ from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { SavePayload, StartSaveApplication } from '../../actions/application_actions';
import { ApplicationDto } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { Colors } from '../../styles/colors';
import { customBindActionCreators } from '../../utilities/helper';
import { QuestionList } from '../../utilities/questions';
import { STATE_HASH } from '../../utilities/data';
const { Option } = Select;

interface Props extends RouteComponentProps {
    app: ApplicationDto;
    startSaveApplication: (payload: SavePayload) => void;
    loading: boolean;
}

interface State {

}

interface FormState {
    physicianName: string,
    city: string,
    state: string
}
class ReviewUpdateDoctorClass extends React.Component<Props, State> {
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
            physicianName: app.applicationInfo.doctorName,
            city: app.applicationInfo.doctorCity,
            state: STATE_HASH[app.applicationInfo.doctorState]
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
                        questionTitle={<span>Okay, feel free to make any changes to your <span style={{ color: Colors.red }}>doctor info</span> below:</span>}
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
                                    <Select virtual={false} placeholder="State" size="large" style={{ width: '100%' }}>
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
        app: state.app,
        loading: state.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            startSaveApplication: (payload: SavePayload) => StartSaveApplication(payload)
        }, dispatch)

    }
}

export const ReviewUpdateDoctorPage = connect(mapStateToProps, mapDispatchToProps)(ReviewUpdateDoctorClass);
