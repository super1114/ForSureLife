import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import AboutUsTopImage from '../../assets/immediate_assets/About-Us-Top.png';
import AboutUsHappyOld from '../../assets/immediate_assets/Happy-Couple-About.png';
import AboutUsOurTeam from '../../assets/immediate_assets/Our-Team.png';
import { animateScroll as scroll } from 'react-scroll'

import AboutUsReader from '../../assets/immediate_assets/Application-Process.png';
import './about_us.css';
import { Row, Col, Space } from 'antd';
import { GetFreeQuote } from '../../components/get_free_quote';
import { CustomButton } from '../../components/custom_buttom';

interface Props extends RouteComponentProps {

}

class AboutUsClass extends React.Component<Props, any> {

    render() {
        return (
            <>
                <Row className="about-us-top-row">
                    <Col>
                        <div>
                            <div>
                                <span className="about-us-title">About Us</span>
                                <div className="about-us-bottom" />
                            </div>
                            <img className="about-us-top-image" src={AboutUsTopImage} width={130} />
                        </div>
                    </Col>
                    <Col>
                        <GetFreeQuote />

                    </Col>

                </Row>
                <div className="about-us-content">
                    <div className="about-us-asd-text">
                        <span style={{ color: "#040273", fontSize: 26 }}>American Senior Direct<span style={{ fontSize: 24, color: "initial" }}> is an independent insurance brokerage that specializes in affordable permament life insurance for seniors and their families.</span></span>
                    </div>
                    <Row className="about-us-committment">
                        <Col xs={12} className="about-us-committment-text">

                            We're committed to connecting the every day American with affordable life insurance, that fits within your budget and meets your needs.
                                <br />
                            <br />
                                At the end of the day, we all want to protect what matters most. We take great care to offer compassion and guidance because we know, while it's never easy to think about final needs, it's always better to prepare ahead in order to look after those you love, long after you're gone.

                        </Col>
                        <Col className="about-us-happy-col" xs={12}>
                            <img className="about-us-happy-old-img" src={AboutUsHappyOld} />
                            {/* some text */}
                        </Col>


                    </Row>

                    <div className="about-us-divider" />
                </div>
                <Row className="about-us-future" justify="center" align="middle">
                    <Col style={{ fontSize: 28, padding: 10 }} xs={12} >
                        We're here to help you secure a financial future that protects you and your family.
                        </Col>
                    <Col style={{ fontSize: 20, padding: 10 }} xs={12}>
                        Amerian Senior Direct focuses on providing seniors with the easiest options for handling their final expenses, and in turn, saving their families from covering these costs on their own.
                        </Col>

                </Row>

                <Row className="about-us-why-wrapper">
                    <Col>
                        <img className="about-us-our-team-img" src={AboutUsOurTeam} />
                    </Col>
                    <Col className="about-us-our-team-col">
                        <span style={{ fontSize: 32 }}>Why Choose Us?</span>
                        <br />
                        You probably know the feeling: you just wanted to get a simple quote and sign up for the plan that's right for you, without dealing with the hassle of invasive medical exams, or going through a pushy agent that only cares about their sales commissions.
                        <br />
                        <br />
                        We get it. That's why we have created a simple application that allows you to get a quote and get covered in about the time it takes you to make your morning coffee. There are no medical exams and we only work with carriers you can trust will do the right thing when the time comes.
                        <br />
                        <br />
                        And the best part? You can sign up right from the comfort of your phone or latptop and get peace of mind for you and your family, today!
                    </Col>
                </Row>
                <div style={{ marginTop: 50 }} className="about-us-content">
                    <Row className="about-us-committment">
                        <Col xs={12} className="about-us-committment-text">
                            <div>
                                <span style={{ fontSize: 26 }}>Our application process is streamlined,
                                quick and free of waiting periods.
                            <br />
                                    <span style={{ fontSize: 22 }}>
                                        <br />
                        For over 20 years, we’ve been helping seniors and their families secure the best final expense coverage available, face-to-face. We wanted to offer more options to get covered, so now we’ve created a simple process that allows you to apply for insurance online, all on your own right from your phone.
                        <br />
                                        <br />
                        We’ve partnered with only A+ rated carriers to ensure that you always get the most affordable rate, without compromising reliability. It’s quick and easy to secure coverage for you and your loved ones, today! Click “Get a Free Quote” to get your quote in the next 60 seconds.
                                </span><br />

                                </span>
                            </div>

                            <div style={{ marginTop: 10 }}>
                                <CustomButton onClick={() => { scroll.scrollToTop(); }} inverted icon text="Get Free Quote" />
                            </div>
                        </Col>
                        <Col className="about-us-happy-col" xs={12}>
                            <img className="about-us-happy-old-img" src={AboutUsReader} />
                            {/* some text */}
                        </Col>
                    </Row>
                </div>
                <div className="about-us-bottom-row">

                    <div style={{ color: "#142951", fontSize: 24, marginBottom: 20 }}>Top 7 Reasons to Get Insured</div>
                    <CustomButton dark text="Go to Our Plan" />

                </div>
            </>

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

export const AboutUsPage = connect(mapStateToProps, mapDispatchToProps)(AboutUsClass);