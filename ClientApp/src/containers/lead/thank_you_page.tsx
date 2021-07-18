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
import Logo from '../../assets/us-flag-banner.jpg';
import Logos from '../../assets/Tick_Mark_Circle-128.png';

const { Text, Title } = Typography;

interface Props extends RouteComponentProps {
    flow: LeadFlow;
    app: ApplicationDto;
}

interface State {
}

export class ThankYouPageClass extends React.Component<Props, State>{


    componentDidMount() {
        ReactPixel.init('518791495779783');
        ReactPixel.track('Lead');
    }

    render() {

        const { history } = this.props;
        return (
            <div  >
                <PageWrapper>
                    <Row justify="center" >
                    <img src={Logo} style={{ width: "100%", marginTop: 0, marginBottom: 0 }} />
                    <img src={Logos} style={{ width: "20%", marginTop: 0, marginBottom: 0 }} />
                    <br />
                    <br />
                    <br />

                        <Text style={{ fontSize: "32px", textAlign: "center" }} strong>
                            Thank you!
                             <br />
                            <br />
                            We will be contacting you soon!
                             <br />
                            <br />

                            Please look for a phone call within the next 24-48 hours.  A state representative will be able to assist you with your family's legacy regarding burial funding.
                         <br />
                            <br />

                            These representatives are trained and vetted through the state to ensure you receive the best advice that is tailored to your specific needs.
                        </Text>

                    <br />
                    <br />
                    <br />
                    <br />
                        <br />
                        </Row>
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

export const ThankYouPage = connect(mapStateToProps, mapDispatchToProps)(ThankYouPageClass);
