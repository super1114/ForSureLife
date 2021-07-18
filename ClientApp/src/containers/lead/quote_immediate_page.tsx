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
import ImmediateBenefitShield from "../../assets/Immediate benefit.png";
import logoWhite from "../../assets/logo_only_white.png";
import { Colors } from "../../styles/colors";
import { FormattedNumber } from "react-intl";
import logoBbb from "../../assets/bbb_logo.png";
import logoNorton from "../../assets/norton_seal.png";
import "./quote_immediate.css";
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

export class QuoteImmediatePageClass extends React.Component<Props, State> {
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
    app.leadInfo.selectedBenefitAmount =
      quote.rates[this.state.selectedRateIndex].benefitCoverage;
    app.leadInfo.selectedMonthlyRate =
      quote.rates[this.state.selectedRateIndex].monthlyRate;
    app.leadInfo.desiredCoverageAmount =
      quote.rates[this.state.selectedRateIndex].benefitCoverage;
    app.leadInfo.clickedEnrolled = true;

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
      <>
        <Row
          style={{ flexDirection: "column" }}
          className="immediate-banner"
          align="middle"
          justify="center"
        >
          <Col>
            <span style={{ fontSize: 18 }}>{`Requested Amount:`}</span>
          </Col>
          <Col>
            <span style={{ fontSize: 28 }}>
              <FormattedNumber
                minimumFractionDigits={0}
                maximumFractionDigits={0}
                value={selectedBenefitAmount}
                style="currency"
                currency="USD"
              />
              <span style={{ fontSize: 18 }}> for </span>
              <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                value={quote.rates[selectedRateIndex].monthlyRate}
                style="currency"
                currency="USD"
              />
              <span style={{ fontSize: 18 }}> /mo. </span>
            </span>
          </Col>
        </Row>

        <div className="immediate-wrapper">
          {/*<div>*/}
          {/*  <img*/}
          {/*    style={{ position: "relative", zIndex: 5 }}*/}
          {/*    width={110}*/}
          {/*    src={ImmediateBenefitShield}*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="immediate-content">
            <div className="immediate-content-detail">
              <h2 className="immediate-congratulations">
                <img width={110} src={ImmediateBenefitShield} />
                <strong>Congratulations!</strong>You qualify for the best plan
                available!
              </h2>
              <div className="immediate-tip">
                Tip: Only 26% of applicants <br /> qualify for this plan!
              </div>
            </div>
            <div className="immediate-content-inner">
              <b style={{ fontSize: 29, color: "#606060" }}>
                Just a reminder...
              </b>
              <ul className="immediate-reminder-list">
                <li>No waiting period</li>
                <li>No payment due today</li>
                <li>Permanent whole life insurance</li>
                <li>Rates never increase</li>
                <li>Coverage never goes down</li>
              </ul>
            </div>
            <div>
              <Button
                onClick={() => this.apply()}
                className="immediate-button"
                style={{ height: 55 }}
                size="large"
                type="primary"
                shape="round"
              >
                <div className="immediate-button-content">
                  Finish My Application
                  <img style={{ marginLeft: 10 }} width={32} src={logoWhite} />
                </div>
              </Button>
            </div>
            <div className="immediate-time">
              <span>{`Time Left: 3 mins`}</span>
            </div>
            <div className="immediate-logos">
              <img src={logoBbb} width={130} />
              <img src={logoNorton} width={130} />
            </div>
          </div>

          <div className="immediate-why">
            <span style={{ fontSize: 40 }}>{`Why Choose Us?`}</span>
            <br />
            <span
              style={{ fontSize: 23 }}
            >{`We're committed to connecting the every day American with affordable life insurance, that fits within your budget and meets your needs. `}</span>
            <br />
            <br />
            <span
              style={{ fontSize: 23 }}
            >{`At the end of the day, we all want to protect what matters most. We take great care to offer compassion and guidance because we know, while it's never easy to think about final needs, it's always better to prepare ahead in order to look after those you love, long after you're gone. `}</span>
          </div>
        </div>
        <div className="immediate-footer">
          <b>{`You're Almost There!`}</b>
          <br />
          <br />
          <span
            style={{ fontSize: 23 }}
          >{`Just a few more questions, which means you're just minutes away from having protection for you and your loved ones.`}</span>
          <br />
          <br />
          <span
            style={{ fontSize: 23 }}
          >{`Click "Finish My Application" below to continue.  `}</span>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 44 }}
          >
            <Button
              onClick={() => this.apply()}
              className="immediate-button"
              style={{ height: 55 }}
              size="large"
              type="primary"
              shape="round"
            >
              <div className="immediate-button-content">
                Finish My Application
                <img style={{ marginLeft: 10 }} width={32} src={logoWhite} />
              </div>
            </Button>
          </div>
        </div>
      </>
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

export const QuoteImmediatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteImmediatePageClass);
