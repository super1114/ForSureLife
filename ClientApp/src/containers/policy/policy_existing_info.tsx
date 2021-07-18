import { Col, Input, Row, InputNumber } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { Stepper, StepStatus } from '../../components/stepper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate, previous } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { FolderOpenOutlined, GlobalOutlined, NumberOutlined } from '@ant-design/icons';

interface Props extends RouteComponentProps {

}

interface State {
    insuranceCompany: string;
    policyNumber: string;
    amountOfCoverage: number;
}

class PolicyExistingInfoClass extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            insuranceCompany: "",
            policyNumber: "",
            amountOfCoverage: 0
        }
    }

    updateAndNavigate = () => {
        const { history } = this.props;
        navigate(history, navRoutes.Review.ReviewApp.path);
    }

    render() {
        const { insuranceCompany, policyNumber, amountOfCoverage } = this.state;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicyBirthday.Title}
                        questionText={QuestionList.PolicyQuestions.PolicyBirthday.Text}
                    />

                    <Row gutter={[16, 16]} justify="center">
                        <Col md={8} xs={24}>
                            <Input
                                size="large"
                                addonAfter={<FolderOpenOutlined />}
                                value={insuranceCompany}
                                onChange={(e) => { this.setState({ insuranceCompany: e.target.value }) }}
                                placeholder="Insurance Company" />
                        </Col>

                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: 10 }} justify="center">
                        <Col md={8} xs={24}>
                            <Input
                                size="large"
                                addonAfter={<NumberOutlined />}
                                value={policyNumber}
                                onChange={(e) => { this.setState({ policyNumber: e.target.value }) }}
                                placeholder="Policy Number" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: 10 }} justify="center">
                        <Col md={8} xs={24}>
                            <InputNumber
                                size="large"
                                style={{ width: '100%' }}
                                value={Number(amountOfCoverage)}
                                onChange={(val) => this.setState({ amountOfCoverage: Number(val) })}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => +value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="Amount of Coverage" />
                        </Col>
                    </Row>
                    <NavigationButtons
                        progressPercent={96}
                        navigate={() => this.updateAndNavigate()}
                    />
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

export const PolicyExistingInfoPage = connect(mapStateToProps, mapDispatchToProps)(PolicyExistingInfoClass);
