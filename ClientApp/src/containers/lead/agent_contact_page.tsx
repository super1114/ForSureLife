import React from 'react';
import { GlobalState } from '../../reducers/root_reducer';
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { navRoutes } from '../../nav/routes';
import { navigate } from '../../utilities/navigation_util';
import { Button, Col, Row, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { LeadFlow } from '../../actions/nav_actions';
import { FlowFlags } from 'typescript';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionList } from '../../utilities/questions';
import { QuestionDisplay } from '../../components/question_display';
import { PageWrapper } from '../../components/page_wrapper';
import ReactPixel from 'react-facebook-pixel';
import { ApplicationClient, ApplicationDto } from '../../clients/api.generated.clients';
import { httpWithTokenInHeader } from '../../clients/api.clients.base';

const { Text, Title } = Typography;

interface Props extends RouteComponentProps {
    flow: LeadFlow;
    app: ApplicationDto;
}

interface State {
}

export class AgentContactPageClass extends React.Component<Props, State>{


    componentDidMount() {
        ReactPixel.init('518791495779783');
        ReactPixel.track('Lead');

        const { app } = this.props;
        app.leadInfo.contactAgent = true;
        const saveApplicationClient = new ApplicationClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
        saveApplicationClient.update(app).catch(ex => {
            console.log({ ex });
        });
    }

    render() {

        const { history } = this.props;
        return (
            <div >
                <PageWrapper>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <QuestionDisplay
                        questionTitle={QuestionList.LeadQuestions.AgentContact.Title}
                        questionText={QuestionList.LeadQuestions.AgentContact.Text} />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </PageWrapper>
            </div>

        )
    }
}


const mapStateToProps = (props: GlobalState) => {
    return {
        flow: props.navigation.leadFlow,
        app: props.app
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export const AgentContactPage = connect(mapStateToProps, mapDispatchToProps)(AgentContactPageClass);
