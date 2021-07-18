import { Col, Descriptions, Form, FormInstance, Input, Radio, Row, Tag } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { Colors } from '../../styles/colors';
import { customBindActionCreators } from '../../utilities/helper';
import { QuestionList } from '../../utilities/questions';
import { PDF } from '../../utilities/strings';
import _ from 'lodash';
import { AAFinalExpense } from '../../clients/api.generated.clients';
import { SaveAmAmPayload, StartSaveAmAmApplication } from '../../actions/amam_actions';
interface Props extends RouteComponentProps {
    aaFinalExpense: AAFinalExpense;
    startSaveAmAmApplication: (payload: SaveAmAmPayload) => void;
    loading: boolean;
}

interface State {

}

type FormState = any;

class ReviewUpdateHealthClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //initialize from app
        const { aaFinalExpense } = this.props;
        if (aaFinalExpense.applicationAnswers.length === 13) {
            this.formRef.current.setFieldsValue({
                _1: aaFinalExpense.applicationAnswers[0].answer ? "Yes" : "No",
                _2: aaFinalExpense.applicationAnswers[1].answer ? "Yes" : "No",
                _3: aaFinalExpense.applicationAnswers[2].answer ? "Yes" : "No",
                _4: aaFinalExpense.applicationAnswers[3].answer ? "Yes" : "No",
                _5: aaFinalExpense.applicationAnswers[4].answer ? "Yes" : "No",
                _6: aaFinalExpense.applicationAnswers[5].answer ? "Yes" : "No",
                _7a: aaFinalExpense.applicationAnswers[6].answer ? "Yes" : "No",
                _7b: aaFinalExpense.applicationAnswers[7].answer ? "Yes" : "No",
                _7c: aaFinalExpense.applicationAnswers[8].answer ? "Yes" : "No",
                _7d: aaFinalExpense.applicationAnswers[9].answer ? "Yes" : "No",
                _8a: aaFinalExpense.applicationAnswers[10].answer ? "Yes" : "No",
                _8b: aaFinalExpense.applicationAnswers[11].answer ? "Yes" : "No",
                _8c: aaFinalExpense.applicationAnswers[12].answer ? "Yes" : "No"
            });
        } else {
            this.formRef.current.setFieldsValue({
                _1: "",
                _2: "",
                _3: "",
                _4: "",
                _5: "",
                _6: "",
                _7a: "",
                _7b: "",
                _7c: "",
                _7d: "",
                _8a: "",
                _8b: "",
                _8c: ""
            });
        }
    }

    renderSectionHeader = (text: string) => {
        return (<div>
            <hr />
            <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 12 }}>{text}</div>
            <hr />
        </div>)
    }


    onSuccessSubmit = (values: FormState) => {
        // success call back when all required fields are present
        const { history, startSaveAmAmApplication, aaFinalExpense } = this.props;
        const aaFinalExpenseUpdated = _.cloneDeep(aaFinalExpense);
        aaFinalExpenseUpdated.applicationAnswers[0].answer = values._1 === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[1].answer = values._2 === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[2].answer = values._3 === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[3].answer = values._4 === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[4].answer = values._5 === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[5].answer = values._6 === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[6].answer = values._7a === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[7].answer = values._7b === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[8].answer = values._7c === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[9].answer = values._7d === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[10].answer = values._8a === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[11].answer = values._8b === "Yes";
        aaFinalExpenseUpdated.applicationAnswers[12].answer = values._8c === "Yes";

        //alert("Got to here value " + values._8c);
        //alert("Got to here value " + values._1  + values._2    + values._3   + values._4   + values._5    + values._6   + values._7a  + values._7b    + values._7c + values._7d   + values._8a  + values._8b + values._8c);
        var nextRoute = navRoutes.Review.ReviewMenuOther.path;
        if (aaFinalExpenseUpdated.applicationAnswers[0].answer ||
            aaFinalExpenseUpdated.applicationAnswers[1].answer ||
            aaFinalExpenseUpdated.applicationAnswers[2].answer) {

            nextRoute = navRoutes.Knockout.NotEligible.path;

        }
        startSaveAmAmApplication({ aa: aaFinalExpenseUpdated, path: nextRoute, history });
    }

    renderAppView = () => {
        return (
            <div>
                <Descriptions bordered
                    title={<Tag>HEALTH INFORMATION</Tag>}
                    size={"small"}
                    layout="vertical">
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.ONE}>
                        <Form.Item name="_1" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.TWO}>
                        <Form.Item name="_2" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.THREE}>
                        <Form.Item name="_3" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                </Descriptions>
                { this.renderSectionHeader("If any answer to questions 1 through 3 is answered “Yes” the Proposed Insured is not eligible for any coverage.")}
                <Descriptions
                    bordered
                    size={"small"}
                    layout="vertical">
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.FOUR}>
                        <Form.Item name="_4" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.FIVE}>
                        <Form.Item name="_5" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.SIX}>
                        <Form.Item name="_6" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>

                </Descriptions>
                <Descriptions bordered size="small" layout="vertical" >
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.TEXT}>

                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.A}>
                        <Form.Item name="_7a" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.B}>
                        <Form.Item name="_7b" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.C}>
                        <Form.Item name="_7c" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.D}>
                        <Form.Item name="_7d" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                </Descriptions>
                { this.renderSectionHeader("If any answer to questions 4 through 7 is answered “Yes” the Proposed Insured should apply for the Return of Premium Death Benefit Plan.")}
                <Descriptions bordered size="small" layout="vertical" >
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.TEXT}>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.A}>
                        <Form.Item name="_8a" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.B}>
                        <Form.Item name="_8b" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.C}>
                        <Form.Item name="_8c" ><Input bordered={false} /></Form.Item>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )


    }

    render() {

        const numberStyle = { fontSize: 24, color: "#959595", display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={<span>Okay, feel free to make any changes to your <span style={{ color: Colors.red }}>health info</span> below:</span>}
                        questionText={QuestionList.ReviewQuestions.ReviewUpdateMenuOther.Text}
                    />
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.onSuccessSubmit}
                        scrollToFirstError
                    >



                        <Row>
                            <Col md={6}>
                                <div>

                                    <div style={numberStyle}>1.
                                    <Form.Item name="_1" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>


                                    <div style={numberStyle}>2.
                                    <Form.Item name="_2" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>3.
                                    <Form.Item name="_3" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>4.
                                    <Form.Item name="_4" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>5.
                                    <Form.Item name="_5" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>6.
                                    <Form.Item name="_6" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>7A.
                                    <Form.Item name="_7a" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>7B.
                                    <Form.Item name="_7b" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>7C.
                                    <Form.Item name="_7c" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>7D.
                                    <Form.Item name="_7d" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>8A.
                                    <Form.Item name="_8a" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>8B.
                                    <Form.Item name="_8b" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                    <div style={numberStyle}>8C.
                                    <Form.Item name="_8c" rules={[{ required: true }]} required><Radio.Group size="large">
                                            <Radio value={"Yes"}>
                                                Yes
                                            </Radio>
                                            <Radio value={"No"}>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                    </div>
                                 </div>
                            </Col>
                            <Col md={18}>
                                <div id="app_review" style={{ border: '1px solid gray', height: 750, overflowY: 'auto', padding: 10 }}>
                                    {this.renderAppView()}
                                </div>
                            </Col>
                        </Row>
                        <NavigationButtons
                            hideProgress
                            nextText="Save Changes"
                        />
                    </Form>
                </CardWrapper>
            </div >
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        aaFinalExpense: state.aaFinalExpense,
        loading: state.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            startSaveAmAmApplication: (payload: SaveAmAmPayload) => StartSaveAmAmApplication(payload)
        }, dispatch)

    }
}

export const ReviewUpdateHealthInfoPage = connect(mapStateToProps, mapDispatchToProps)(ReviewUpdateHealthClass);
