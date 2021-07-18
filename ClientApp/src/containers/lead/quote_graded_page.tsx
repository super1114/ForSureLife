import React from "react";
import { GlobalState } from "../../reducers/root_reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../nav/routes";
import { Typography } from "antd";
import { navigate, previous } from "../../utilities/navigation_util";
import { Row, Col, Button } from "antd";
import {
  ApplicationDto,
  QuoteDto,
  RateDto,
  Relationship,
} from "../../clients/api.generated.clients";
import { LeadFlow } from "../../actions/nav_actions";
import { customBindActionCreators } from "../../utilities/helper";
import { UpdateSelectedCoverageAndRate } from "../../actions/quote_actions";
import { PageWrapper } from "../../components/page_wrapper";
import GradedPlanImg from "../../assets/Graded Plan.png";
import AmAmImg from "../../assets/Am-Am Logo.png";
import BbaImg from "../../assets/bbb-a-plus.png";
import CheckboxImg from "../../assets/Checkbox.png";
import GradedCoverageImg from "../../assets/Graded Coverage Graph.png";
import ForesterImg from "../../assets/foresterslogo.png";
import PropserityImg from "../../assets/Prosperity-Life-Agent-Contracts-New Vista- SUSA.jpg";
import AmericoImg from "../../assets/americo.jpg";
import EagleImg from "../../assets/americo-eagle-premier-logo.png";
import { Colors } from "../../styles/colors";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedNumber } from "react-intl";
import { isMobileDevice } from "../../utilities/responsive";
import { CompareQuote } from "../../components/compare_quote/compare_quote";
import {
  SavePayload,
  StartSaveApplication,
} from "../../actions/application_actions";

const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
  flow: LeadFlow;
  quote: QuoteDto;
  updateSelectedCoverageAndRate: (payload: {
    selectedBenefitAmount: number;
    selectedMonthlyRate: number;
    selectedIndex: number;
  }) => void;
  startSaveApplication: (savePayload: SavePayload) => void;
  app: ApplicationDto;
}

interface State {
  selectedRateIndex: number;
  selectedSusaBenefit: number;
  selectedForesterBenefit: number;
  selectedEagleBenefit: number;
}

export class QuoteGradedPageClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      quote: { susaRates, foresterRates, eagleRates, selectedBenefitAmount },
    } = props;
    this.state = {
      selectedRateIndex: props.quote.rates.findIndex(
        (r) => r.benefitCoverage === selectedBenefitAmount
      ),
      selectedSusaBenefit: susaRates.findIndex(
        (r) => r.benefitCoverage === selectedBenefitAmount
      ),
      selectedForesterBenefit: foresterRates.findIndex(
        (r) => r.benefitCoverage === selectedBenefitAmount
      ),
      selectedEagleBenefit: eagleRates.findIndex(
        (r) => r.benefitCoverage === selectedBenefitAmount
      ),
    };
  }
  updateAndNavigate = (relationship: Relationship) => {
    const { history } = this.props;
    navigate(history, navRoutes.Quote.Hobby.path);
  };

  navigate = () => {
    const { flow, history } = this.props;
    if (flow == LeadFlow.A) {
      navigate(history, navRoutes.Quote.Quote.path);
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Quote.Quote.path);
    } else if (flow == LeadFlow.C) {
      navigate(history, navRoutes.Quote.Quote.path);
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Quote.Quote.path);
    } else {
      navigate(history, navRoutes.Quote.Quote.path);
    }
  };

  apply = () => {
    const {
      updateSelectedCoverageAndRate,
      quote,
      history,
      app,
      startSaveApplication,
    } = this.props;
    updateSelectedCoverageAndRate({
      selectedBenefitAmount:
        quote.rates[this.state.selectedRateIndex].benefitCoverage,
      selectedMonthlyRate:
        quote.rates[this.state.selectedRateIndex].monthlyRate,
      selectedIndex: this.state.selectedRateIndex,
    });
    navigate(history, navRoutes.Beneficiary.BeneficiaryForm.path);
    app.leadInfo.clickedEnrolled = true;
    app.leadInfo.selectedBenefitAmount =
      quote.rates[this.state.selectedRateIndex].benefitCoverage;
    app.leadInfo.selectedMonthlyRate =
      quote.rates[this.state.selectedRateIndex].monthlyRate;
    app.leadInfo.desiredCoverageAmount =
      quote.rates[this.state.selectedRateIndex].benefitCoverage;

    startSaveApplication({
      app,
      history,
      path: navRoutes.Beneficiary.BeneficiaryForm.path,
    });
  };

  render() {
    const {
      quote: { susaRates, foresterRates, eagleRates, selectedBenefitAmount },
      quote,
    } = this.props;
    const {
      selectedRateIndex,
      selectedSusaBenefit,
      selectedEagleBenefit,
      selectedForesterBenefit,
    } = this.state;

    const checkboxText = {
      fontSize: 20,
      color: Colors.textPurple,
    } as React.CSSProperties;

    return (
      <PageWrapper md={24} xs={24} xl={22}>
        <Row gutter={[16, 16]} align="top" justify="center">
          <Col className="ant-col-flex-center" lg={12} md={15} xs={24}>
            <Row justify="center">
              <Col className="ant-col-flex-center" xs={24}>
                <Text
                  style={{ fontSize: 20 }}
                >{`Due to existing medical conditions, you qualify for the graded plan:`}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }} justify="center" align="middle">
              <Col className="ant-col-flex-center" md={10} xs={24}>
                <img width={221} src={GradedPlanImg} />
              </Col>
              <Col md={14} xs={24} style={{ textAlign: "justify" }}>
                <div>
                  <Text
                    style={{ color: "#4676E1", fontSize: 36, fontWeight: 600 }}
                  >{`Graded Plan`}</Text>
                </div>
                <div>
                  <Text style={{ fontSize: 20 }}>
                    {`
                                        American Amicable's graded plan grants you additional peace of mind coverage for each year that your plan is active. You'll have access to a portion of your face amount of coverage immediately from your start date then enjoy full benefits once your policy has been active for 36 months. `}
                    <br />
                    <br />
                    {`No medical exams are required, and no payment will be due today. Instead, you'll select your preffered payment date at the end of this application and verify your identity by simply providing your social security number through a secure, encrypted form. `}
                  </Text>
                </div>
                <Row style={{ flexWrap: "inherit" }} align="middle">
                  <Col>
                    <img width={50} src={CheckboxImg} />
                  </Col>
                  <Col>
                    <Text style={checkboxText}>
                      {" "}
                      {`Permanent whole life insurance`}{" "}
                    </Text>
                  </Col>
                </Row>
                <Row style={{ flexWrap: "inherit" }} align="middle">
                  <Col>
                    <img width={50} src={CheckboxImg} />
                  </Col>
                  <Col>
                    <Text style={checkboxText}> {`Rates never increase`} </Text>
                  </Col>
                </Row>
                <Row style={{ flexWrap: "inherit" }} align="middle">
                  <Col>
                    <img width={50} src={CheckboxImg} />
                  </Col>
                  <Col>
                    <Text style={checkboxText}>
                      {" "}
                      {`Coverage never goes down`}{" "}
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }} justify="center">
              <Col className="ant-col-flex-center" xs={24}>
                <Text style={{ ...checkboxText, color: Colors.buttonGray }}>
                  {" "}
                  {`Feel free to make any adjustments needed to your requested coverage amount to fit your budget. Then let's start your application!`}{" "}
                </Text>
              </Col>
              <Col
                style={{ marginTop: 20 }}
                className="ant-col-flex-center"
                md={8}
                xs={24}
              >
                <Button
                  style={{ width: "100%", fontSize: 24, height: 60 }}
                  shape="round"
                  size="large"
                  type="primary"
                  onClick={() => {
                    this.apply();
                  }}
                >
                  Enroll Now
                </Button>
                <Text
                  style={{
                    fontSize: isMobileDevice() ? 16 : 18,
                    color: "#828282",
                  }}
                  strong
                >{`No Payment Due Today!`}</Text>
              </Col>
            </Row>
            <Row align="middle" style={{ marginTop: 40, textAlign: "start" }}>
              <Col md={12} xs={24}>
                <div
                  style={{
                    font: "arial",
                    fontSize: 24,
                    color: "#484848",
                    fontWeight: "bold",
                  }}
                >
                  Why Choose American Amicable?
                </div>
                <div style={{ fontSize: 21 }}>
                  American Amicable has helped millions of seniors gain peace of
                  mind in their final expenses since 1910. They have an
                  <b style={{ color: "#006495" }}>
                    {" "}
                    A+ rating with the Better Business Bureau
                  </b>
                  , so you can trust that they take their obligations seriously
                  and will support the needs of you and your family, every step
                  of the way.
                </div>
              </Col>
              <Col className="ant-col-flex-center" md={12} xs={24}>
                <img width={177} src={BbaImg} />
              </Col>
            </Row>
            <Row style={{ marginTop: 40, textAlign: "justify" }}>
              <Col xs={24}>
                <div
                  style={{
                    font: "arial",
                    fontSize: 24,
                    color: "#484848",
                    fontWeight: "bold",
                  }}
                >
                  How Does American Amicable Compare?
                </div>
              </Col>
              <Col xs={24} style={{ fontSize: 18, font: "arial" }}>
                <CompareQuote
                  selectedBenefitAmount={
                    quote.rates[selectedRateIndex].benefitCoverage
                  }
                  png={<img width={68} src={AmAmImg} />}
                  amAm={true}
                  length={"Whole Life"}
                  coverage={quote.rates[selectedRateIndex].benefitCoverage}
                  monthly={quote.rates[selectedRateIndex].monthlyRate}
                />
                <CompareQuote
                  selectedBenefitAmount={
                    quote.rates[selectedRateIndex].benefitCoverage
                  }
                  png={<img width={100} src={AmericoImg} />}
                  amAm={false}
                  length={"Whole Life"}
                  coverage={susaRates[selectedSusaBenefit].benefitCoverage}
                  monthly={susaRates[selectedSusaBenefit].monthlyRate}
                />
                <CompareQuote
                  selectedBenefitAmount={
                    quote.rates[selectedRateIndex].benefitCoverage
                  }
                  png={<img width={100} src={PropserityImg} />}
                  amAm={false}
                  length={"Whole Life"}
                  coverage={
                    foresterRates[selectedForesterBenefit].benefitCoverage
                  }
                  monthly={foresterRates[selectedForesterBenefit].monthlyRate}
                />
              </Col>
              <Col xs={24} style={{ marginTop: 40 }}>
                <div style={{ fontSize: 21 }}>
                  You're still getting the best rate! There's <b>no reason</b>{" "}
                  to pay more for the same coverage elsewhere. American Amicable
                  offers the lowest rates for your coverage, with the additional
                  peace of mind that your{" "}
                  <b style={{ color: "#006495" }}>
                    coverage will never decrease and your monthly rate will
                    never go up!
                  </b>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 40, textAlign: "justify" }}>
              <Col xs={24}>
                <div
                  style={{
                    font: "arial",
                    fontSize: 24,
                    color: "#484848",
                    fontWeight: "bold",
                  }}
                >
                  How Does the Graded Plan through American Amicable work?
                </div>
              </Col>
              <Col
                xs={24}
                style={{ marginTop: 20 }}
                className="ant-col-flex-center"
              >
                <img width={350} src={GradedCoverageImg} />
              </Col>
              <Col xs={24} style={{ marginTop: 20 }}>
                <div style={{ fontSize: 21 }}>
                  Graded Plans exist to level the playing field for those who've
                  experienced health issues in the past. <br />
                  <br />
                  Where other insurers might have stricter qualifications or
                  outright deny someone with certain pre-existing conditions,
                  American Amicable offers their plans available to even more
                  individuals by offering additional coverage, the longer your
                  plan is active. <br />
                  <br />
                  From the start date of your policy, you'll have immediate
                  access to 30% of your face amount of coverage, which goes up
                  to 70% the second year, and 100% at the start of your third
                  year. <br />
                  <br />
                  We also undestand that not everything is under your control.
                  So, as an additional peace of mind, American Amicable will pay
                  100% for an accidental death effective at the start date of
                  your policy.
                </div>
              </Col>
              <Col xs={24} style={{ marginTop: 20 }}>
                <div
                  style={{
                    font: "arial",
                    fontSize: 24,
                    color: "#484848",
                    fontWeight: "bold",
                  }}
                >
                  How to get started:
                </div>
              </Col>
              <Col xs={24} style={{ marginTop: 20 }}>
                <div style={{ fontSize: 21 }}>
                  You're already half way there! From here, we just need to get
                  a few more personal details, including your beneficiaries and
                  contact info to verify your identity. <br />
                  <br />
                  You'll choose your start date and then have the opportunity to
                  review all of the information you've submitted before signing
                  and submitting your application to American Amicable. Enroll
                  today to have peace of mind for you and your family!
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }} justify="center">
              <Col
                style={{ marginTop: 20 }}
                className="ant-col-flex-center"
                md={8}
                xs={24}
              >
                <Button
                  style={{ width: "100%", fontSize: 24, height: 60 }}
                  shape="round"
                  size="large"
                  type="primary"
                  onClick={() => {
                    this.apply();
                  }}
                >
                  Enroll Now
                </Button>
                <Text
                  style={{
                    fontSize: isMobileDevice() ? 16 : 18,
                    color: "#828282",
                  }}
                  strong
                >{`No Payment Due Today!`}</Text>
              </Col>
            </Row>
          </Col>
          <Col
            className="ant-col-flex-center"
            lg={7}
            md={9}
            xs={24}
            style={{ position: "sticky", top: "200px" }}
          >
            <div>
              {" "}
              <Text style={{ fontSize: 20 }}>{`Adjust quote if needed:`}</Text>
            </div>
            <div
              style={{
                borderRadius: "30px 30px",
                textAlign: "center",
                backgroundColor: "#F4A03E",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Row
                style={{ width: "100%" }}
                justify="space-between"
                align="middle"
              >
                <Col className="ant-col-flex-center" md={6} xs={6}>
                  <Button
                    onClick={() => {
                      if (selectedRateIndex > 0) {
                        const newSelectedSusaBenefit = susaRates.findIndex(
                          (r) =>
                            r.benefitCoverage ===
                            quote.rates[selectedRateIndex - 1].benefitCoverage
                        );
                        const newSelectedForesterBenefit =
                          foresterRates.findIndex(
                            (r) =>
                              r.benefitCoverage ===
                              quote.rates[selectedRateIndex - 1].benefitCoverage
                          );
                        const newSelectedEagleBenefit = eagleRates.findIndex(
                          (r) =>
                            r.benefitCoverage ===
                            quote.rates[selectedRateIndex - 1].benefitCoverage
                        );
                        this.setState({
                          selectedRateIndex: selectedRateIndex - 1,
                          selectedSusaBenefit:
                            newSelectedSusaBenefit !== -1
                              ? newSelectedSusaBenefit
                              : selectedSusaBenefit,
                          selectedForesterBenefit:
                            newSelectedForesterBenefit !== -1
                              ? newSelectedForesterBenefit
                              : selectedForesterBenefit,
                          selectedEagleBenefit:
                            newSelectedEagleBenefit !== -1
                              ? newSelectedEagleBenefit
                              : selectedEagleBenefit,
                        });
                      }
                    }}
                    shape="circle"
                    type="primary"
                    size="large"
                    icon={<MinusOutlined />}
                  />
                </Col>
                <Col className="ant-col-flex-center" md={12} xs={12}>
                  <div style={{ fontSize: 34 }}>
                    <FormattedNumber
                      minimumFractionDigits={0}
                      maximumFractionDigits={0}
                      value={quote.rates[selectedRateIndex].benefitCoverage}
                      style="currency"
                      currency="USD"
                    />
                  </div>
                </Col>
                <Col className="ant-col-flex-center" md={6} xs={6}>
                  <Button
                    onClick={() => {
                      if (selectedRateIndex < quote.rates.length - 1) {
                        const newSelectedSusaBenefit = susaRates.findIndex(
                          (r) =>
                            r.benefitCoverage ===
                            quote.rates[selectedRateIndex + 1].benefitCoverage
                        );
                        const newSelectedForesterBenefit =
                          foresterRates.findIndex(
                            (r) =>
                              r.benefitCoverage ===
                              quote.rates[selectedRateIndex + 1].benefitCoverage
                          );
                        const newSelectedEagleBenefit = eagleRates.findIndex(
                          (r) =>
                            r.benefitCoverage ===
                            quote.rates[selectedRateIndex + 1].benefitCoverage
                        );
                        this.setState({
                          selectedRateIndex: selectedRateIndex + 1,
                          selectedSusaBenefit:
                            newSelectedSusaBenefit !== -1
                              ? newSelectedSusaBenefit
                              : selectedSusaBenefit,
                          selectedForesterBenefit:
                            newSelectedForesterBenefit !== -1
                              ? newSelectedForesterBenefit
                              : selectedForesterBenefit,
                          selectedEagleBenefit:
                            newSelectedEagleBenefit !== -1
                              ? newSelectedEagleBenefit
                              : selectedEagleBenefit,
                        });
                      }
                    }}
                    shape="circle"
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                  />
                </Col>
              </Row>

              <span style={{ fontSize: 18 }}>
                in coverage for just{" "}
                <FormattedNumber
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                  value={quote.rates[selectedRateIndex].monthlyRate}
                  style="currency"
                  currency="USD"
                />
                /mo.
              </span>
            </div>
          </Col>
        </Row>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
    app: state.app,
    quote: state.quote,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateSelectedCoverageAndRate: (payload: {
          selectedBenefitAmount: number;
          selectedMonthlyRate: number;
          selectedIndex: number;
        }) => UpdateSelectedCoverageAndRate(payload),
        startSaveApplication: (savePayload: SavePayload) =>
          StartSaveApplication(savePayload),
      },
      dispatch
    ),
  };
};

export const QuoteGradedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteGradedPageClass);
