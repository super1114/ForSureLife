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
import AmAmImg from "../../assets/Am-Am Logo.png";
import BbaImg from "../../assets/bbb-a-plus.png";
import ForesterImg from "../../assets/foresterslogo.png";
import PropserityImg from "../../assets/Prosperity-Life-Agent-Contracts-New Vista- SUSA.jpg";
import EagleImg from "../../assets/americo-eagle-premier-logo.png";
import AmericoImg from "../../assets/americo.jpg";
import ModifiedPlanImg from "../../assets/Modified.png";
import ModifiedOver65Img from "../../assets/Modified Coverage Graph Over 65.png";
import ModifiedUnder65Img from "../../assets/Modified Coverage Graph under 65.png";
import CheckboxImg from "../../assets/Checkbox.png";
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

export class QuoteModifiedPageClass extends React.Component<Props, State> {
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
                >{`Due to existing medical conditions, you qualify for the modified plan:`}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }} justify="center" align="middle">
              <Col className="ant-col-flex-center" md={10} xs={24}>
                <img width={221} src={ModifiedPlanImg} />
              </Col>
              <Col md={14} xs={24} style={{ textAlign: "justify" }}>
                <div>
                  <Text
                    style={{ color: "#4676E1", fontSize: 36, fontWeight: 600 }}
                  >{`Modified Plan`}</Text>
                </div>
                <div>
                  <Text style={{ fontSize: 20 }}>
                    Our modified plan grants you peace of mind by offering full
                    death benefits after 24 months of payments made to your
                    policy. Should, heaven forbid, you pass before then,
                    everything you contribute to your policy will be returned to
                    your beneficiaries at a rate of 110%; a rate with higher
                    returns than any bank, bond or stock investment!
                    <br />
                    <br />
                    No medical exams are required, and no payment will be due
                    today. Instead, you'll select your preffered payment date at
                    the end of this application and verify your identity by
                    simply providing your social security number through a
                    secure, encrypted form.
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
                  coverage={
                    foresterRates[selectedForesterBenefit].benefitCoverage
                  }
                  monthly={foresterRates[selectedForesterBenefit].monthlyRate}
                />
                <CompareQuote
                  selectedBenefitAmount={
                    quote.rates[selectedRateIndex].benefitCoverage
                  }
                  png={<img width={100} src={PropserityImg} />}
                  amAm={false}
                  length={"Whole Life"}
                  coverage={susaRates[selectedSusaBenefit].benefitCoverage}
                  monthly={susaRates[selectedSusaBenefit].monthlyRate}
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
                  How Does the Modified Plan through American Amicable work?
                </div>
              </Col>
              <Col
                xs={24}
                style={{ marginTop: 20 }}
                className="ant-col-flex-center"
              >
                <img
                  width={350}
                  src={quote.age < 65 ? ModifiedUnder65Img : ModifiedOver65Img}
                />
              </Col>
              <Col xs={24} style={{ marginTop: 20 }}>
                <div style={{ fontSize: 21 }}>
                  Modified Plans exist to level the playing field for those
                  who've experienced severe health issues in the past. <br />
                  <br />
                  Where most insurers might outright deny someone with
                  pre-existing conditions, American Amicable makes their plans
                  available to even more individuals by offering this special
                  modified plan, which matures after only two years of paying
                  your premius. <br />
                  <br />
                  From the start date of your policy, you'll have 100% access to
                  the full face amount of your policy in the even of an
                  accidental death. For all other causes of death, your
                  beneficiaries will receive a reimsursement of the premium
                  you've contributed so far with a bonus 10% interest, during
                  the first 3 years your policy is active. <br />
                  <br />
                  After 3 years, your beneficiaries will be paid 100% of the
                  full face amount of coverage of your insurance policy, at the
                  time of your death.
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
                  contact info to verify your identity.
                  <br />
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

export const QuoteModifiedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteModifiedPageClass);
