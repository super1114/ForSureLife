import React from 'react';
import { GlobalState } from '../../reducers/root_reducer';
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { Button, Col, Row, Typography } from 'antd';
import { QuestionDisplay } from '../../components/question_display';
import { QuestionList } from '../../utilities/questions';
import { PageWrapper } from '../../components/page_wrapper';
import { ApplicationClient, ApplicationDto } from '../../clients/api.generated.clients';
import { SavePayload } from '../../actions/application_actions';
import { httpWithTokenInHeader } from '../../clients/api.clients.base';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';

const { Text, Title } = Typography;

interface Props extends RouteComponentProps {
    startSaveApplication: (savePayload: SavePayload) => void;
    app: ApplicationDto;
    /*navigate: () => void;*/
}

interface State {
}



class NotEligiblePageClass extends React.Component<Props, State> {

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
            <CardWrapper>
                <Row justify="center">
                    <Col className="ant-col-flex-center" md={16} xs={24}>
                        <QuestionDisplay
                            questionTitle={QuestionList.KnockoutQuestions.NotEligible.Title}
                            questionText={QuestionList.KnockoutQuestions.NotEligible.Text}
                        />
                        <Button shape="round" type="primary">Learn More</Button>
                    </Col>
                </Row>
            </CardWrapper>

        )
    }
}


const mapStateToProps = (props: GlobalState) => {
    return {
        app: props.app
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export const NotEligiblePage = connect(mapStateToProps, mapDispatchToProps)(NotEligiblePageClass);