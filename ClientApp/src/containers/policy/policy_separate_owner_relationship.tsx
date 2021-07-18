import { Col, Row, Select } from 'antd';
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
import { Relationship } from '../../clients/api.generated.clients';
const { Option } = Select;
interface Props extends RouteComponentProps {

}

interface State {
    relationship: Relationship;
}

class PolicySeparateOwnerClass extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            relationship: Relationship.SeparatePolicyOwnerOther
        }
    }

    updateAndNavigate = () => {
        const { history } = this.props;
        navigate(history, navRoutes.Policy.PolicyOwnerAddress.path);
    }

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicyOwnerRelationship.Title}
                        questionText={QuestionList.PolicyQuestions.PolicyOwnerRelationship.FunctionText("NAME_GOES_HERE")}
                    />

                    <Row gutter={[16, 16]} justify="center">
                        <Col md={6} xs={24}>
                            <Select virtual={false} value={this.state.relationship} onChange={(val) => {
                                this.setState({ relationship: val })
                            }} placeholder="Relationship" size="large" style={{ width: '100%' }}>
                                {
                                    Object.keys(Relationship).filter(key => !isNaN(Number(Relationship[key]))).map(r => {
                                        return (
                                            <Option key={r} value={Relationship[r]}>{r.replace(/([A-Z])/g, ' $1').trim()}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>

                    </Row>

                    <NavigationButtons
                        progressPercent={56}
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

export const PolicySeparateOwnerRelationshipPage = connect(mapStateToProps, mapDispatchToProps)(PolicySeparateOwnerClass);
