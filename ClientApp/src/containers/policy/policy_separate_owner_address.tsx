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
import {  HomeOutlined } from '@ant-design/icons';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
interface Props extends RouteComponentProps {

}

interface State {
    address: string;
}

class PolicySeparateOwnerAddressClass extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            address: ""
        }
    }

    updateAndNavigate = () => {
        const { history } = this.props;
        navigate(history, navRoutes.Policy.PolicyOwnerSocial.path);
    }

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicyOwnerAddress.Title}
                        questionText={QuestionList.PolicyQuestions.PolicyOwnerAddress.FunctionText("NAME_GOES_HERE")}
                    />

                    <Row gutter={[16, 16]} justify="center">
                        <Col md={12} xs={24}>
                            <Input size="large" onChange={(e) => { this.setState({ address: e.target.value }) }} placeholder="Home Address" addonAfter={<HomeOutlined />} />
                        </Col>
                    </Row>

                    <NavigationButtons
                        progressPercent={64}
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

export const PolicySeparateOwnerAddressPage = connect(mapStateToProps, mapDispatchToProps)(PolicySeparateOwnerAddressClass);
