import React from 'react';
import { GlobalState } from '../../reducers/root_reducer';
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { navRoutes } from '../../nav/routes';
import { navigate } from '../../utilities/navigation_util';
import { Button, Col, Row, Table, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Logo from '../../assets/YoungAtHeart.jpg';
import { LeadFlow } from '../../actions/nav_actions';
import { FlowFlags } from 'typescript';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { isMobileDevice } from '../../utilities/responsive';

const { Text, Title } = Typography;

interface Props extends RouteComponentProps {
    flow: LeadFlow;
}

interface State {
}

export class PrivacyPolicyPageClass extends React.Component<Props, State>{

    render() {

        const { history } = this.props;
        return (
            <div>
                <Row justify="center">
                    <div style={{ padding: 0, textAlign: 'left', marginBottom: 0, marginTop: 0, maxWidth: 1400 }}>
                        <Col style={{ width: '100%' }}>
                            <Title style={{ color: "#012F79", fontSize: isMobileDevice() ? 25 : 40, lineHeight:1, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >American Senior Direct’s Data </Title>
                            <Title style={{ color: "#012F79", fontSize: isMobileDevice() ? 25 : 40, lineHeight: 1, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Privacy Pledge</Title>
                        </Col>
                    </div>
                </Row>
                <Row justify="center">
                    <div style={{ padding: 0, textAlign: 'center', marginBottom: 0, marginTop: 0, maxWidth: 1400 }}>
                        <Col style={{ width: '100%' }}>
                            <Title style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >TL;DR: We promise to never misuse your data and all information you share is secure.</Title>
                        </Col>
                    </div>
                </Row>
                <Row justify="center">
                    <div style={{ padding: 0, textAlign: 'left', marginBottom: 0, marginTop: 25, width: isMobileDevice() ? '100%' : '80%', maxWidth: 1400 }}>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 35 }}>

                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'left', marginTop: 0 }} >In light of growing concerns about companies selling customers’ private data, we thought this would be a good opportunity to tell you about what types of data we collect, why we collect it, and what we do with it.</Text>
                            </Col>

                        </Row>

                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Data is important. In fact, it’s the foundation on which most of the technology we’ve grown to love is built. Without it, services like ride sharing and music streaming wouldn’t exist. Data is what lets companies like ours personalize their service, making it instant, fun, and hassle free.

                            </Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >We use data to personalize coverage, pay claims in seconds, prevent fraud, help our users perform instant changes to their policy, collect payments, and improve our advertising. But, what we don't do, and never will, is misuse or carelessly disburse your private information. </Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >The data we require to provide our insurance services includes personal info that can identify you or be linked to you, such as your name, address, email, date of birth, social security number (only in cases that we explicitly ask for it), and your IP address. A full list of the categories of info we collect and don’t collect can be found in the chart below.</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Here’s how we may use your data:</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 17 : 24, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >General site visits</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >We collect anonymous website traffic to help us analyze performance in certain markets and improve our ad efficiency. Ensuring that we aren’t spending excess amounts of money on marketing and advertising allows us and our partners to keep costs low for our customers. For example, our team evaluates the efficiency of new ad campaigns by tracking visits from that campaign to our website. We’re using secure, industry-standard, third-party tools to analyze this data.</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 17 : 24, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Obtaining insurance quotes</Text>
                            </Col>

                        </Row>

                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >To be able to offer the best coverage at the right price, insurance companies evaluate the risks involved. For example, to be able to ensure that an individual is eligible for coverage, we require responses to health questions. And to ensure that the right person is both applying for and receiving the benefits of the insurance policy, we may, in some cases, require personal, identifiable information such as full name, date of birth, and social security number. We’re using secure, industry-standard, third-party tools to analyze and protect this data.</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 17 : 24, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Fighting fraud</Text>
                            </Col>

                        </Row>

                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >To be able to detect potential fraud attempts, we may reach out to health care providers or past insurance providers, as well as in some cases obtain criminal background information. We’re using secure, industry-standard, third-party tools to provide and analyze this data.</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 17 : 24, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Paying for and using insurance</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >When buying a policy, we use third-party encrypted forms to protect your banking and account information. We’re using secure, industry-standard, third-party tools to collect, store and analyze this data.</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 17 : 24, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Marketing and advertising</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >We may use cookies to help us optimize our digital campaigns, and to allow our customers to have a more personalized experience when coming back to our website. We’re using secure, industry-standard, third-party tools to analyze this data. We may also use information you submit to send you relevant content, personalized offers and announcements.</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 17 : 24, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >Cookies and first/third-party tracking</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >“Cookies” are small bits of info that a website sends to a computer’s hard drive when a website is viewed. We use cookies on our website and on marketing channels. We participate in behavior-based advertising which means a third party uses tech (like a cookie or web beacon) to collect info about your use of our website so that they can provide ads tailored to your interests on our site or other sites.</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >We will always maintain our commitment to protecting your privacy</Text>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 25 }}>
                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 0 }} >If there are changes to our privacy pledge, or (god forbid) a breach to your data, we will make sure to notify you via email, regular mail, or phone - as required by law.</Text>
                            </Col>

                        </Row>
                    </div>
                </Row>

                <Row justify="center" style={{ maxWidth: '1400'}} >
                    <div style={{ padding: 0, marginBottom: 0, marginTop: 25, width: isMobileDevice() ? '100%' : '80%', maxWidth: 1400 }}>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", backgroundColor: "#e6e6e6", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Category of Personal Information</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", backgroundColor: "#e6e6e6", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Collected and Required to Provide Our Service</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", backgroundColor: "#e6e6e6", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Sold to Third Party (We will never do that)</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", backgroundColor: "#e6e6e6", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >We May Send It To One of Our Service Providers</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Images, audio and video recordings.</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ verticalAlign: "middle", color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 50, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Bank Account Number</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Claim Payments</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Secure Payment Processing</Text>
                            </Col>
                        </Row>





                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Biometric Information  <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 9 : 14, padding: 0, textAlign: 'center' }} >(such as voice and handwriting recogntion)</Text></Text>

                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 130 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Characteristics of protected classifications    <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 9 : 14, padding: 0, textAlign: 'center' }} >(e.g., age, gender, race, ethnicity, physical or mental handicap, etc.)</Text></Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 130 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Age, gender</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 130 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 130 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Analytics providers</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 145 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Commercial information  <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 9 : 14, padding: 0, textAlign: 'center' }} >(e.g., products or services purchased, or other purchasing or consuming histories or tendencies)</Text></Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 145 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 145 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 145 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Credit Card Number</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Secure payment processing</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Debit card number</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Secure Payment Processing</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Driver’s License Number / State ID</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Education</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Electronic network activity   <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 9 : 14, padding: 0, textAlign: 'center' }} >(e.g., browsing history)</Text> </Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Only on our website / apps</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Analytics providers</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Email address</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Employment history</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Geolocation data</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Analytics providers</Text>
                            </Col>
                        </Row>





                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Health insurance information</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Rarely during claims</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Identifiers <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 9 : 14, padding: 0, textAlign: 'center' }} >(e.g., name or alias)</Text></Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Claim support services</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Insurance Policy Number</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Claim support services</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 95 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Medical information</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 95 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Only for Whole Life applications, and rarely during claims</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 95 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 95 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Claim support services</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >National origin, citizenship, immigration status</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Online identifier <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 9 : 14, padding: 0, textAlign: 'center' }} >(e.g. IP address)</Text></Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Analytics providers</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Other financial information</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Sometimes during claims</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Passport Number</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Rarely during claims</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Postal address</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Signature</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Digital only</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Social Security Number</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >We may ask for it sometimes, mostly the last 4 digits.</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 90 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Claim support services and insurance background check</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Telephone Number</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Required for coverage</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Claim support services</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Transaction information</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Digital only</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }} >
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >X</Text>
                            </Col>
                            <Col style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "center", width: '25%', height: isMobileDevice() ? 70 : 100, textAlign: "center" }}>
                                <Text style={{ color: "#282828", fontSize: isMobileDevice() ? 12 : 20, padding: 0, textAlign: 'center' }} >Payments processors</Text>
                            </Col>
                        </Row>


                    </div>
                    <br />
                    <br />
                    <br />
                    <br />


                </Row>

                <Row justify="center">
                    <div style={{ padding: 0, textAlign: 'left', marginBottom: 0, marginTop: 25, width: isMobileDevice() ? '100%' : '80%', maxWidth: 1400 }}>
                        <Row style={{ marginBottom: isMobileDevice() ? 10 : 35 }}>

                            <Col>
                                <Text style={{ color: "#4A4A4A", fontSize: isMobileDevice() ? 15 : 20, padding: 0, textAlign: 'center', marginBottom: isMobileDevice() ? 2 : 15, marginTop: 10 }} >California Information Sharing Disclosure: This Information Sharing Disclosure is provided for FOR CALIFORNIA RESIDENTS to comply with the California Consumer Privacy Act, codified at California Civil Code Sections 1798.100 through 1798.199 (CCPA), and supplements the American Senior Direct Privacy Policy to which it is appended. Sections 1798.115(c), 1798.130(a)(5)(c), 1798.130(c), and 1798.140 of the CCPA indicate that organizations should disclose whether the following categories of personal information are collected, transferred for “valuable consideration,” or transferred for an organization’s “business purpose” (as those terms are defined under California law). The table above indicates the categories of personal information we collect and transfer in a variety of contexts. Please note that because this list is comprehensive, it may refer to types of information that we collect and share about people other than yourself.</Text>
                           </Col>

                        </Row>
                    </div>
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

export const PrivacyPolicyPage = connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyPageClass);
