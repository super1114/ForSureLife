import React from 'react';
import { GlobalState, reduxInitialState } from '../../reducers/root_reducer';
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { navRoutes } from '../../nav/routes';
import { navigate } from '../../utilities/navigation_util';
import { Button, Col, Row, Typography } from 'antd';
import { ArrowRightOutlined, CaretRightOutlined } from '@ant-design/icons';
import Logo from '../../assets/YoungAtHeart.jpg';
import Umbrella from '../../assets/insurance.png';
import LogoWhite from '../../assets/logo_only_white.png'
import LogoBlue from '../../assets/Blue 2- SImple.png'
import CheckUp from '../../assets/checkup.png'
import CheckList from '../../assets/checklist.png'
import BigDefense from '../../assets/big-defense-shield.png'
import { LeadFlow } from '../../actions/nav_actions';
import { FlowFlags } from 'typescript';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { removeCookie } from '../../utilities/cookie_util';
import { configureStore } from '../../utilities/redux_store';
import { onStart } from '../..';
import { isMobileDevice } from '../../utilities/responsive';
import { Colors } from '../../styles/colors';
const { Text, Title } = Typography;

interface Props extends RouteComponentProps {
    flow: LeadFlow;
}

interface State {
}

export class LandingPage5Class extends React.Component<Props, State>{


    navigate = () => {
        const { flow, history } = this.props;
        if (flow == LeadFlow.A) {
            navigate(history, navRoutes.Quote.BirthYear.path);
        } else if (flow == LeadFlow.B) {
            navigate(history, navRoutes.Quote.BirthYear.path);
        } else if (flow == LeadFlow.C) {
            navigate(history, navRoutes.Quote.BirthYear.path);
        } else if (flow == LeadFlow.D) {
            navigate(history, navRoutes.Quote.BirthYear.path);
        } else if (flow == LeadFlow.E) {
            navigate(history, navRoutes.Quote.BirthYear.path);
        } else {
            navigate(history, navRoutes.Quote.BirthYear.path);
        }
    }

    componentDidMount() {
        //removeCookie("fsl_jwt");

        //const store = configureStore(reduxInitialState);

        //onStart(store.store, store.persistor);

        //window.history.pushState({}, document.title, window.location.hash.split('?')[0]);
    }


    render() {

        const { history } = this.props;
        return (
            <div>
                <Row justify="center">

                    <Col md={16} xs={24}>
                        <img src={Logo} style={{ width: "100%", marginTop: 0, marginBottom: 0 }} onClick={() => { this.navigate() }} />
                        <div style={{ padding: 0, textAlign: 'center', marginBottom: 0, marginTop: 0 }} onClick={() => { this.navigate() }}>
                            <Title style={{ color: "#4676E1", fontSize: isMobileDevice() ? 20 : 30 }} > <br /> YES! I would like to know if I qualify</Title>

                            <div style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: isMobileDevice() ? 12 : 20, color: "#828282" }} strong>
                                    Some basic information is required to accurately generate your request.
                                    However, your information is kept private and is NOT sold, or shared with any
                            third parties, marketing lists or vendors.</Text>
                            </div>

                            <div style={{ marginBottom: 1 }}>
                                <Text style={{ fontSize: isMobileDevice() ? 16 : 24, color: "#514A6F" }} strong>Hit start to verify your information then click "Submit" to process your request.</Text>
                            </div>

                        </div>
                        <NavigationButtons
                            navigate={() => { this.navigate() }}
                            nextText="Start"
                            hideProgress
                        />

                    </Col>
                </Row>
            </div>

        )
    }
}

const mapStateToProps = (props: GlobalState) => {
    return {
        flow: props.navigation.leadFlow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export const InitialLanding5Page = connect(mapStateToProps, mapDispatchToProps)(LandingPage5Class);
