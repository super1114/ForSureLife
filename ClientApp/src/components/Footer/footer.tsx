import React from 'react';
import { Col, Layout, Modal, Row } from 'antd';
import logoWhite from '../../assets/logo_white.png';
import logoBbb from '../../assets/bbb_logo.png';
import logoNorton from '../../assets/norton.png';
import "./footer.css"
const { Footer } = Layout;


class FooterClass extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
    }

    render() {
        

        return (
                    <Footer className="footer-wrapper">
                <Modal destroyOnClose title="Disclosure" visible={this.state.isModalVisible} onOk={() => { this.setState({ isModalVisible: false }) }} onCancel={() => { this.setState({ isModalVisible: false }) }}>
                    <p>Statements regarding insurance coverage are informational only and are to be used for general description purposes. Individual rates may vary, please refer to individual quote for rates. Website and host do not make any representations regarding individual coverage, terms, conditions, exclusions, products, services, and/or programs until a quote is obtained, underwriting is approved, and coverage obtained.</p>
                </Modal>

                        <div >
                            <Row align="middle" justify="center">
                                <Col span={18} md={24} xxl={14}>
                                    <Row>
                                        <Col xs={24} md={5}>
                                            <div className="branding-logo">
                                                <img src={logoWhite} />
                                                <p>109 Ferngrove Ct., Moorseville, NC 28117</p>
                                            </div>
                                        </Col>
                                        <Col md={19}>
                                            <Row justify="space-between">
                                                <Col md={4}>
                                                    <ul className="footer-menu-list">
                                                        {/*<li>Our Plan</li>*/}
                                                        {/*<li>FAQs</li>*/}
                                                        {/*<li>Contact</li>*/}
                                                        {/*<li>About Us</li>*/}
                                                    </ul>
                                                </Col>
                                                <Col xs={24} md={6}>
                                                    <div className="logo"><img src={logoBbb} />
                                                        <img src={logoNorton} /></div>
                                                </Col>
                                                <Col xs={24} md={5}>
                                                    <div className="contactInfo">
                                                        Contact Us: <br/>
                                                        info@americanseniordirect.com
                                                    </div>
                                                </Col>
                                                <Col xs={24} md={5}>
                                                    <div className="policyLink">
                                                        <a href="#reivew/termsconditions">Terms and Conditions</a>
                                                <a href="#privacypolicy">Privacy Policy</a>
                                                <a onClick={() => { this.setState({ isModalVisible: true }) }} >Disclosure</a>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="footer-copyRight">
                                <Col>
                                    American Senior Direct © 2021
                                </Col>
                            </Row>
                        </div>
                    </Footer>

        )
    }

}


export default FooterClass;

