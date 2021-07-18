import { Col, Row } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateHealthQuestionAnswer, UpdateHealthQuestionAnswerPayload } from '../../actions/application_actions';
import { httpWithTokenInHeader } from '../../clients/api.clients.base';
import { ApplicationClient, ApplicationDto } from '../../clients/api.generated.clients';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';

interface Props extends RouteComponentProps {
    app: ApplicationDto;
}

class CovidDisqualificationPageClass extends React.Component<Props, any> {

    componentDidMount = () => {
        const { app } = this.props;
        const saveApplicationClient = new ApplicationClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
        app.leadInfo.knockedOut = true;
        saveApplicationClient.update(app).catch(ex => {
            console.log({ ex });
        });
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <Row justify="center">

                    <Col md={16} xs={24}>
                        <div style={{ fontFamily: "Arial", fontSize: 34 }}>
                            <br />
                            <span style={{ color: "#CC0600" }}> Unfortunately</span>

                            , you are not medically eligible to qualify for coverage at this time.

                If the your test results reveal a positive diagnosis of Covid-19, you may reapply 90 days after the diagnosis as long as  there are no lasting residual effects.
                        </div>

                    </Col>
                </Row>
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
            updateHealthQuestion: (healthQuestionAnswer: UpdateHealthQuestionAnswerPayload) => UpdateHealthQuestionAnswer(healthQuestionAnswer)
        }, dispatch)

    }
}

export const CovidDisqualificationPage = connect(mapStateToProps, mapDispatchToProps)(CovidDisqualificationPageClass);
