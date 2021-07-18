import { Col, Input, Row } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';

interface Props extends RouteComponentProps {

}

interface State {
    firstName: string;
    lastName: string;
}

class PolicySeparateOwnerClass extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
        }
    }

    updateAndNavigate = () => {
        const { history } = this.props;
        navigate(history, navRoutes.Policy.PolicyOwnerRelationship.path);
    }

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicyOwnerName.Title}
                        questionText={QuestionList.PolicyQuestions.PolicyOwnerName.Text}
                    />

                    <Row gutter={[16, 16]} justify="center">
                        <Col md={6} xs={24}>
                            <Input
                                size="large"
                                onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                                placeholder="First Name" />
                        </Col>
                        <Col md={6} xs={24}>
                            <Input
                                size="large"
                                onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                                placeholder="Last Name" />
                        </Col>
                    </Row>

                    <NavigationButtons
                        progressPercent={48}
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

export const PolicySeparateOwnerNamePage = connect(mapStateToProps, mapDispatchToProps)(PolicySeparateOwnerClass);
