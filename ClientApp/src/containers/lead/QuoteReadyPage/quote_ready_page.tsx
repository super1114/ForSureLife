import React from "react";
import { GlobalState } from "../../../reducers/root_reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../../nav/routes";
import { Typography } from "antd";
import { navigate } from "../../../utilities/navigation_util";
import { Row, Col, Button } from "antd";
import {
  ApplicationDto,
  QuoteDto,
  Relationship,
} from "../../../clients/api.generated.clients";
import { LeadFlow } from "../../../actions/nav_actions";
import { isMobileDevice } from "../../../utilities/responsive";
import { FormattedNumber } from "react-intl";
import {
  CaretRightOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { customBindActionCreators } from "../../../utilities/helper";
import { UpdateSelectedCoverageAndRate } from "../../../actions/quote_actions";
import AmAmImg from "../../../assets/Am-Am Logo.png";
import BbaImg from "../../../assets/bbb-a-plus.png";
import ForesterImg from "../../../assets/foresterslogo.png";
import AmericoImg from "../../../assets/americo.jpg";
import PropserityImg from "../../../assets/Prosperity-Life-Agent-Contracts-New Vista- SUSA.jpg";
import LincolnImg from "../../../assets/Lincoln  Heritage.png";
import norton from "../../../assets/norton_seal.png";
import { Colors } from "../../../styles/colors";
import bbb from "../../../assets/bbb_logo.png";
import "./quote_ready_page.css";
import {
  SavePayload,
  StartSaveApplication,
} from "../../../actions/application_actions";
import { CompareQuote } from "../../../components/compare_quote/compare_quote";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";

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
  loading: boolean;
}

interface State {
  selectedRateIndex: number;
  selectedSusaBenefit: number;
  selectedForesterBenefit: number;
  selectedEagleBenefit: number;
}

export class QuoteReadyPageClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      quote: { susaRates, foresterRates, eagleRates, selectedBenefitAmount },
    } = props;
    this.state = {
      selectedRateIndex: props?.quote?.rates?.findIndex(
        (r) => r.benefitCoverage === selectedBenefitAmount
      ),
      selectedSusaBenefit: susaRates?.findIndex(
        (r) => r.benefitCoverage === selectedBenefitAmount
      ),
      selectedForesterBenefit: foresterRates?.findIndex(
        (r) => r.benefitCoverage === selectedBenefitAmount
      ),
      selectedEagleBenefit: eagleRates?.findIndex(
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
  };

  apply = () => {
    const {
      updateSelectedCoverageAndRate,
      flow,
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

    app.leadInfo.selectedBenefitAmount =
      quote.rates[this.state.selectedRateIndex].benefitCoverage;
    app.leadInfo.selectedMonthlyRate =
      quote.rates[this.state.selectedRateIndex].monthlyRate;
    app.leadInfo.desiredCoverageAmount =
      quote.rates[this.state.selectedRateIndex].benefitCoverage;
    app.leadInfo.clickedApplied = true;
    let nextRoute = navRoutes.Knockout.Hospitilized.path;

    if (
      app.applicationInfo.validApplyStates.indexOf(
        app.leadInfo.state.toLowerCase()
      ) !== -1
    ) {
      if (flow == LeadFlow.A) {
        nextRoute = navRoutes.Health.HealthLanding.path;
      } else if (flow == LeadFlow.B) {
        nextRoute = navRoutes.Health.HealthLanding.path;
      } else if (flow == LeadFlow.C) {
        nextRoute = navRoutes.Health.HealthLanding.path;
      } else if (flow == LeadFlow.D) {
        nextRoute = navRoutes.Health.HealthLanding.path;
      } else if (flow == LeadFlow.E) {
        nextRoute = navRoutes.Health.HealthLanding.path;
        /*            nextRoute = navRoutes.Knockout.Hospitilized.path;*/
      } else {
        nextRoute = navRoutes.Health.HealthLanding.path;
      }
    } else {
      nextRoute = navRoutes.Quote.AgentContact.path;
    }

    startSaveApplication({ app, history, path: nextRoute });
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
      fontWeight: 600,
      color: Colors.textPurple,
    } as React.CSSProperties;

    return (
      <CardWrapper>
        <div className="price-card" style={{ marginTop: isMobileDevice() ? 0 : 30 }}>
          <Row justify="center">
            <Col lg={22}>
              <Title
                style={{ fontSize: 30, color: "#606060" }}
              >{`Great news! Your quote is ready:`}</Title>
            </Col>
            <Col lg={{ span: 20 }} md={20} xs={24}>
              <CompareQuote
                selectedBenefitAmount={
                  quote.rates[selectedRateIndex]?.benefitCoverage
                }
                png={<img width={68} src={AmAmImg} />}
                amAm={true}
                coverage={quote.rates[selectedRateIndex]?.benefitCoverage}
                monthly={quote.rates[selectedRateIndex]?.monthlyRate}
              />
              <CompareQuote
                selectedBenefitAmount={
                  quote.rates[selectedRateIndex]?.benefitCoverage
                }
                png={<img width={100} src={AmericoImg} />}
                amAm={false}
                coverage={eagleRates[selectedEagleBenefit]?.benefitCoverage}
                monthly={eagleRates[selectedEagleBenefit]?.monthlyRate}
              />
              <CompareQuote
                selectedBenefitAmount={
                  quote.rates[selectedRateIndex].benefitCoverage
                }
                png={
                  <img width={isMobileDevice() ? 100 : 150} src={LincolnImg} />
                }
                amAm={false}
                coverage={susaRates[selectedSusaBenefit]?.benefitCoverage}
                monthly={susaRates[selectedSusaBenefit]?.monthlyRate}
              />
            </Col>
                </Row>
                {isMobileDevice() ? 
          <Row justify="center">

                        <Col lg={8}>
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Button
                  className="quote-btn"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.apply();
                  }}
                >
                  See if I Qualify <CaretRightOutlined />
                </Button>
                <Text
                  style={{
                    fontSize: isMobileDevice() ? 16 : 18,
                    color: "#828282",
                  }}
                >{`No Payment Due Today!`}</Text>
              </div>
            </Col>
            <Col>
 
                        </Col>
                        <Col lg={20}>
                            <div className="price-text">
                                <p>
                                    Based on the information you've provided, your best option for
                  Final Expense Insurance is with <span>American Amicable</span>
                  ! Learn more about this plan below or click the button to see
                  if you qualify:
                </p>
                            </div>
                        </Col>
                   
                        <div className="quote-ready-logos">
                            <Row justify="center" align="middle">
                                <Col span={8} md={4}>
                                    <img className="w-100" src={bbb} />
                                </Col>
                                <Col span={8} md={4}>
                                    <img className="w-100" src={norton} />
                                </Col>
                            </Row>
                        </div>
                        <Col lg={20} xs={22}>
                            <hr />
                        </Col>
                    </Row>
                    :

                    <Row justify="center">
                        <Col lg={20}>
                            <div className="price-text">
                                <p>
                                    Based on the information you've provided, your best option for
                  Final Expense Insurance is with <span>American Amicable</span>
                  ! Learn more about this plan below or click the button to see
                  if you qualify:
                </p>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div style={{ textAlign: "center" }}>
                                <Button
                                    className="quote-btn"
                                    shape="round"
                                    size="large"
                                    onClick={() => {
                                        this.apply();
                                    }}
                                >
                                    See if I Qualify <CaretRightOutlined />
                                </Button>
                                <Text
                                    style={{
                                        fontSize: isMobileDevice() ? 16 : 18,
                                        color: "#828282",
                                    }}
                                >{`No Payment Due Today!`}</Text>
                            </div>
                        </Col>
                        <Col>
                            <div className="quote-ready-logos">
                                <Row justify="center" align="middle">
                                    <Col span={8} md={4}>
                                        <img className="w-100" src={bbb} />
                                    </Col>
                                    <Col span={8} md={4}>
                                        <img className="w-100" src={norton} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={20} xs={22}>
                            <hr />
                        </Col>
                    </Row>

            }
          {/* why choose  */}
          <Row justify="center">
            <Col lg={22}>
              <h3
                className="sub-title"
                style={{ fontSize: isMobileDevice() ? 22 : 24 }}
              >
                Why Choose American Amicable?
              </h3>
            </Col>
            <Col lg={20}>
              <Row>
                <Col lg={{ span: 16, order: 1 }} xs={{ order: 2 }}>
                  <div className="why-choose">
                    <p>
                      American Amicable has helped millions of seniors gain
                      peace of mind in their final expenses since 1910. They
                      have an
                      <b style={{ color: "#006495" }}>
                        {" "}
                        A+ rating with the Better Business Bureau
                      </b>
                      , so you can trust that they take their obligations
                      seriously and will support the needs of you and your
                      family, every step of the way.
                    </p>
                  </div>
                </Col>
                <Col
                  lg={{ span: 6, offset: 1, order: 2 }}
                  xs={{ span: 24, order: 1 }}
                >
                  <div className="text-center mb-10">
                    <img width={177} src={BbaImg} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row justify="center">
            <Col lg={22}>
              <h3
                className="sub-title"
                style={{ fontSize: isMobileDevice() ? 22 : 24 }}
              >
                What does their Final Expense Plan Cover?
              </h3>
            </Col>
            <Col lg={20}>
              <div className="why-choose">
                <p>
                  All Final Expense options from American Amicable are{" "}
                  <b style={{ color: "#006495" }}>whole life insurance plans</b>{" "}
                  which means:
                </p>
                <ul>
                  <li>
                    Your insurance plan{" "}
                    <b style={{ color: "#006495" }}>will always</b> stay active{" "}
                    <u>as long as you pay premiums.</u>
                  </li>
                  <li>
                    Your insurance plan is{" "}
                    <b style={{ color: "#006495" }}>guaranteed to pay</b> your
                    death benefit to{" "}
                    <u>your beneficiary at the time of your death.</u>
                  </li>
                  <li>
                    Your{" "}
                    <b style={{ color: "#006495" }}>rates will never go up</b>{" "}
                    and your <u>coverage amount will never go down</u>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          <Row justify="center">
            <Col lg={22}>
              <h3
                className="sub-title"
                style={{ fontSize: isMobileDevice() ? 22 : 24 }}
              >
                There are additional benefits, too:
              </h3>
            </Col>
            <Col lg={20}>
              <div className="why-choose">
                <p>
                  Whole life policies earn cash value that acts like a savings
                  account, which allows you access tax-free in the event of an
                  emergency. So however you take advantage of the value, it can
                  help you save for your future.
                </p>
              </div>
            </Col>
          </Row>

          <Row justify="center">
            <Col lg={22}>
              <h3
                className="sub-title"
                style={{ fontSize: isMobileDevice() ? 22 : 24 }}
              >
                Confirm Your Coverage Amount
              </h3>
            </Col>
            <Col lg={20}>
              <div className="why-choose">
                <p>
                  You originally requested a quote for{" "}
                  {
                    <FormattedNumber
                      minimumFractionDigits={0}
                      maximumFractionDigits={0}
                      value={quote.selectedBenefitAmount}
                      style="currency"
                      currency="USD"
                    />
                  }{" "}
                  in coverage which will cost{" "}
                  <FormattedNumber
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                    value={quote.selectedMonthlyRate}
                    style="currency"
                    currency="USD"
                  />{" "}
                  per month.
                </p>
                <p>
                  If that's not quite in your budget, feel free to adjust your
                  desired coverage amount to find a monthly premium that's
                  affordable to you.
                </p>
                <p>
                  Otherwise, click below to answer a few more questions to see
                  if you qualify for coverage!
                </p>
              </div>
            </Col>
          </Row>

          <Row justify="center">
            <Col className="ant-col-flex-center" lg={14} md={16} xs={24}>
              <div
                style={{
                  margin: "30px 0",
                  borderRadius: "30px 30px",
                  textAlign: "center",
                  backgroundColor: "#5D646A",
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
                                quote.rates[selectedRateIndex - 1]
                                  .benefitCoverage
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
                    <div style={{ marginTop: 5 }}>
                      Subtract
                      <br /> $1000
                    </div>
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
                                quote.rates[selectedRateIndex + 1]
                                  .benefitCoverage
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
                    <div style={{ marginTop: 5 }}>
                      Add
                      <br /> $1000
                    </div>
                  </Col>
                </Row>
                <span style={{ fontSize: 18 }}>
                  coverage
                  <br /> for just{" "}
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

          <Row justify="center">
            <Col lg={8}>
              <div style={{ textAlign: "center" }}>
                <Button
                  className="quote-btn"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.apply();
                  }}
                >
                  See if I Qualify <CaretRightOutlined />
                </Button>
                <Text
                  style={{
                    fontSize: isMobileDevice() ? 16 : 18,
                    color: "#828282",
                  }}
                >{`No Payment Due Today!`}</Text>
              </div>
            </Col>
            <Col md={24}>
              <div className="quote-ready-logos">
                <Row justify="center" align="middle">
                  <Col span={8} md={4}>
                    <img className="w-100" src={bbb} />
                  </Col>
                  <Col span={8} md={4}>
                    <img className="w-100" src={norton} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </CardWrapper>
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

export const QuoteReadyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteReadyPageClass);
