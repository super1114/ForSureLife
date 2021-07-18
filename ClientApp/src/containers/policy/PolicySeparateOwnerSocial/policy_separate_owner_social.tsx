import { Col, Form, FormInstance, Input, Row, Space } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../../components/question_display';
import { navRoutes } from '../../../nav/routes';
import { GlobalState } from '../../../reducers/root_reducer';
import { customBindActionCreators } from '../../../utilities/helper';
import { navigate } from '../../../utilities/navigation_util';
import { QuestionList } from '../../../utilities/questions';
import { CardWrapper } from '../../../components/Card-wrapper/card_wrapper';
import MaskedInput from 'antd-mask-input';
import lock from '../../../assets/lock.png';
import norton from '../../../assets/norton_seal.png';
import SafetyBadge from "../../../assets/SafetyBadge.svg";
import "./policy_separate_owner_social.css"
interface Props extends RouteComponentProps {

}

interface State {
    ss: string;
}

interface FormState {
    ssn: string;
}

class PolicySeparateOwnerSocialClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
    }

    updateAndNavigate = () => {
        const { history } = this.props;
        navigate(history, navRoutes.Policy.PolicySocialPage.path);
    }

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            ssn: ""
        })
    }

    render() {
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicyOwnerSocial.Title}
                        questionText={QuestionList.PolicyQuestions.PolicyOwnerSocial.Text}
                    />
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.updateAndNavigate}
                        scrollToFirstError
                    >

                        <div className="policy-separate-social-form">

                            <Row gutter={[4, 4]} justify="center" align="bottom">
                                <Col md={11} xs={24}  style={{alignSelf:'center'}}>
                                    <div className="social-security-number">
                                        <Form.Item rules={[{required: true}]} name="ssn"
                                                   label={<div style={{margin: "2px 0px"}}>
                                                       <div>{`Social Security Number`}</div>
                                                   </div>} required>
                                            <MaskedInput
                                                mask="111-11-1111"
                                                type="tel"
                                            />
                                        </Form.Item>
                                        <Form.Item rules={[{required: true}]}
                                                   label={<div style={{margin: "2px 0px"}}>
                                                       <div>{`Account Number`}</div>
                                                   </div>} required>
                                            <MaskedInput
                                                mask="111111111111"
                                                type="tel"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div style={{
                                        fontSize: 14,
                                        color: '#fff',
                                        fontWeight: 100,
                                        display: 'flex',
                                        alignItems: "center"
                                    }}>
                                        <img className="secure-img" src={lock} width={20}/>
                                        <div className="secure-text">{`Secure form protected by `}</div>
                                        <img className="secure-img1" src={norton} width={50}/>
                                    </div>
                                </Col>
                                <Col md={{span: 12, offset:1}} xs={24} style={{alignSelf:"center"}}>
                                    <div className="policy-separate-social-form-instruction">
                                        <img src={SafetyBadge} alt="saftey badge" className="policy-img"/>
                                        <Form.Item rules={[{required: true}]} name="Bank"
                                                   label={<div style={{margin: "2px 0px"}}>
                                                       <div>{`Bank Name`}</div>
                                                   </div>} required>
                                            <input
                                                type="name"
                                            />
                                        </Form.Item>
                                        <Form.Item rules={[{required: true}]} name="Address"
                                                   label={<div style={{margin: "2px 0px"}}>
                                                       <div>{`Address`}</div>
                                                   </div>} required>
                                            <input
                                                type="name"
                                            />
                                        </Form.Item>
                                        <p>This side fills out automatically.</p>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                        <NavigationButtons
                            progressPercent={72}
                        />
                    </Form>

                </CardWrapper>
            </div>

        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({

        }, dispatch)

    }
}

export const PolicySeparateOwnerSocialPage = connect(mapStateToProps, mapDispatchToProps)(PolicySeparateOwnerSocialClass);
