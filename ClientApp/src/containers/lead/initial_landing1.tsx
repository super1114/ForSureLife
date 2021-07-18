import React from 'react';
import { GlobalState, reduxInitialState } from '../../reducers/root_reducer';
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { navRoutes } from '../../nav/routes';
import { navigate } from '../../utilities/navigation_util';
import { Button, Col, Row, Typography } from 'antd';
import { ArrowRightOutlined, CaretRightOutlined } from '@ant-design/icons';
import Logo from '../../assets/YoungAtHeart.jpg';
import Umbrella from '../../assets/Umbrella.png';
import LogoWhite from '../../assets/logo_only_white.png'
import LogoBlue from '../../assets/Blue 2- SImple.png'
import CheckUp from '../../assets/checkup.png'
import CheckList from '../../assets/checklist.png'
import BigDefense from '../../assets/Shield.png'
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

export class LandingPage1Class extends React.Component<Props, State>{


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
        } else {
            navigate(history, navRoutes.Quote.BirthYear.path);
        }
    }



    componentDidMount() {
        //ReactDOM.findDOMNode('videoask')
        //$(window.videoask.loadModal)({
        //    "url": "https://www.videoask.com/f2e686p74",
        //})


        //var loadScript = function (src) {

        //    var tag = document.createElement('script');

        //    tag.async = false;
        //    tag.src = src;

        //}

        //loadScript('../../utilities/VideoAskLanding.js');

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
                                <Text style={{ fontSize: isMobileDevice() ? 16 : 24, color: "#514A6F" }} strong>Click "Get Free Quote" to Get a Quote in the Next 60 Seconds!</Text>
                            </div>

                            <Button shape="round" size="large" style={{ padding: "0" , width: isMobileDevice() ? 250 : 400, color: "#FFFFFF", backgroundColor: "#FF7C29", marginTop: isMobileDevice() ? 25 : 50, marginBottom: isMobileDevice() ? 25 : 75, fontSize: isMobileDevice() ? 20 : 30,  height: isMobileDevice() ? 35 : 70, verticalAlign: "center" }}
                                onClick={() => this.navigate()}
                            >Get Free Quote   <img src={LogoWhite} style={{ width: isMobileDevice() ? 25 :  35, marginLeft: 10 }} /></Button>

                        </div>
                    </Col>
                </Row>

                <Row justify="center" style={{ backgroundColor: "#FAFAFA" }}>
                    <div style={{ padding: 0, textAlign: 'center', marginBottom: 0, marginTop: 0 }}>
                        <Col >
                            <Title style={{ color: "#012F79", fontSize: isMobileDevice() ? 25 : 40, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 0 : 15, marginTop: 10 }} >Benefits of Final Expense Plan</Title>

                            <div style={{ display: 'inline-block', marginTop: 10 }}>
                                <Row align="middle">
                                    <Col style={{ marginRight: isMobileDevice() ? 13 : 30 }}>
                                        <img width={isMobileDevice() ? 30 : 60} src={Umbrella} />
                                    </Col>
                                    <Col style={{ width: isMobileDevice() ? 300 : 800, textAlign: 'left' }}>

                                        <Text strong style={{ color: "#012F79", fontSize: isMobileDevice() ? 15 : 25 }}> {`Up to $30,000 benefit amounts.`}

                                        </Text>
                                        <br />
                                        <Text style={{ color: "#1A1A1A", fontSize: isMobileDevice() ? 12 : 17 }}> {`Our Final Expense Plan provides you with guaranteed coverage amounts that will never be changed or cancelled without your say.`}          </Text>
                                    </Col>

                                </Row>
                                <Row align="middle">
                                    <Col style={{ marginRight: isMobileDevice() ? 13 : 30 }}>
                                        <img width={isMobileDevice() ? 30 : 60} src={CheckUp} />
                                    </Col>
                                    <Col style={{ width: isMobileDevice() ? 300 : 800, textAlign: 'left' }}>

                                        <Text strong style={{ color: "#012F79", fontSize: isMobileDevice() ? 15 : 25 }}> {`No medical exams are required to be eligible.`}

                                        </Text>
                                        <br />
                                        <Text style={{ color: "#1A1A1A", fontSize: isMobileDevice() ? 12 : 17 }}> {`You never have to undergo any medical exams or visit any doctors to apply for coverage. No needles, no waiting for results, and no scheduling medical appointments.`}          </Text>
                                    </Col>

                                </Row>
                                <Row align="middle">
                                    <Col style={{ marginRight: isMobileDevice() ? 13 : 30 }}>
                                        <img width={isMobileDevice() ? 30 : 60} src={CheckList} />
                                    </Col>
                                    <Col style={{ width: isMobileDevice() ? 300 : 800, textAlign: 'left' }}>

                                        <Text strong style={{ color: "#012F79", fontSize: isMobileDevice() ? 15 : 25 }}> {`Quick and simple online application.`}

                                        </Text>
                                        <br />
                                        <Text style={{ color: "#1A1A1A", fontSize: isMobileDevice() ? 12 : 17 }}> {`There are no mountains of paperwork to complete! You can apply online and purchase a plan right from your phone in the comfort of home.`}          </Text>
                                    </Col>

                                </Row>
                                <Row align="middle">
                                    <Col style={{ marginRight: isMobileDevice() ? 13 : 30 }}>
                                        <img width={isMobileDevice() ? 30 : 60} src={BigDefense} />
                                    </Col>
                                    <Col style={{ width: isMobileDevice() ? 300 : 800, textAlign: 'left' }}>

                                        <Text strong style={{ color: "#012F79", fontSize: isMobileDevice() ? 15 : 25 }}> {`Fixed and leveled premiums.`}

                                        </Text>
                                        <br />
                                        <Text style={{ color: "#1A1A1A", fontSize: isMobileDevice() ? 12 : 17 }}> {`From the moment you purchase a plan, your premiums are entirely locked in. There are no surprise premium changes for the life of the policy.`}          </Text>
                                    </Col>

                                </Row>

                            </div>




                        </Col>
                        <Row justify="center">
                            <Button shape="round" size="large" style={{ padding: "0", width: isMobileDevice() ? 250 : 400, color: "#FFFFFF", backgroundColor: "#FF7C29", marginTop: isMobileDevice() ? 25 : 30, marginBottom: isMobileDevice() ? 15 : 35, fontSize: isMobileDevice() ? 20 : 30, height: isMobileDevice() ? 35: 70, verticalAlign: "center" }}
                                onClick={() => this.navigate()}
                            >Get Free Quote   <img src={LogoWhite} style={{ width: isMobileDevice() ? 25 : 35, marginLeft: 10 }} /></Button>
                        </Row>
                    </div>
                </Row>

                <Row justify="center">
                    <Col style={{ width: isMobileDevice() ? 300 : 400, lineHeight: 1 }}>
                        <Text style={{ color: "#575757", fontSize: isMobileDevice() ? 35 : 50, verticalAlign: "top" }} > <br /> Who is American Senior Direct?</Text>
                    </Col>
                    <Col style={{ width: isMobileDevice() ? 300 : 800, marginTop: isMobileDevice() ? 10 : 10 }}>
                        <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 15 : 18, }} > <br /> For over 20 years, we’ve been helping seniors and their families secure the best final expense coverage available, face-to-face . We wanted to offer more options, so now we’ve created a simple process that allows you to apply for insurance online, all on your own, without the help of an agent.

                            <br />
                            <br />
We’ve partnered with select carriers to ensure that you always get the most affordable rate, without compromising reliability. It’s quick and easy to secure coverage for you and your loved ones, today! Click “Get a Free Quote” to get your quote in the next 60 seconds.</Text>
                    </Col>

                </Row>
                <Row justify="center">
                    <Button shape="round" size="large" style={{ padding: "0", width: isMobileDevice() ? 250 : 400, color: "#012F79", border: "double", backgroundColor: "#FFFFFF", marginTop: isMobileDevice() ? 25 : 50, marginBottom: isMobileDevice() ? 25 : 75, fontSize: isMobileDevice() ? 20 : 30, height: isMobileDevice() ? 35 : 70, verticalAlign: "center" }}
                        onClick={() => this.navigate()}
                    >Get Free Quote   <img src={LogoBlue} style={{ width: isMobileDevice() ? 25 : 35, marginLeft: 10 }} /></Button>
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

export const InitialLanding1Page = connect(mapStateToProps, mapDispatchToProps)(LandingPage1Class);
