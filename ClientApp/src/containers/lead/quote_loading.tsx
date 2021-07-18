import React from "react";
import { connect } from "react-redux";
import { Col, Row, Spin, Typography } from "antd";
import { RouteComponentProps } from "react-router";
import { StoreQuote } from "../../actions/quote_actions";
import { httpWithTokenInHeader } from "../../clients/api.clients.base";
import {
  ApplicationDto,
  ApplicationInfo,
  ApplicationInfoDto,
  QuoteClient,
  QuoteDto,
  SeniorChoicePremiumType,
} from "../../clients/api.generated.clients";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { isMobileDevice } from "../../utilities/responsive";
// import PathCheck from "../../assets/Path-Check.svg";
import checkIcon from "../../assets/gray-checkmark.svg";
import { Colors } from "../../styles/colors";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import {
  SavePayload,
  StartSaveApplication,
} from "../../actions/application_actions";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { QuestionList } from "../../utilities/questions";
import { QuestionDisplay } from "../../components/question_display";

import "./quote_loading.css";
const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
  storeQuote: (quote: QuoteDto) => void;
  app: ApplicationDto;
  startSaveApplication: (savePayload: SavePayload) => void;
}

class QuoteLoadingClass extends React.Component<Props, any> {
  componentDidMount() {
    const { storeQuote, history, app, startSaveApplication } = this.props;

    const client = new QuoteClient(
      process.env.REACT_APP_API_URL,
      httpWithTokenInHeader
    );
    var quoteReponseObject;
    client
      .getQuote(app.applicationId)
      .then((quoteResponse) => {
        storeQuote(quoteResponse);
        app.leadInfo.quoteReceived = true;
        app.leadInfo.selectedBenefitAmount =
          quoteResponse.selectedBenefitAmount;
        app.leadInfo.selectedMonthlyRate = quoteResponse.selectedMonthlyRate;
        app.leadInfo.premiumType = quoteResponse.premiumType;
        quoteReponseObject = quoteResponse;
      })
      .catch((ex) => {
        console.log({ ex });
      });
    setTimeout(() => {
        try {
            const path = window.location.hash.toLowerCase();
            var navRoute = path;
            if (path == "#/quote/loading") {
                 navRoute = navRoutes.Quote.QuoteReady.path;
            }

        startSaveApplication({
          app,
          history,
            path: navRoute,
        });
      } catch (exception) {
        navigate(history, navRoutes.Quote.QuoteReady.path);
      }
    }, 3500);
  }

  navigate = () => {
    const { history, app } = this.props;
    navigate(history, navRoutes.Quote.QuoteReady.path);
  };

  render() {
    const checkboxText = {
      fontSize: isMobileDevice() ? 18 : 20,
      color: "#4A4A4A",
    } as React.CSSProperties;

    return (
      <CardWrapper>
        <QuestionDisplay
          questionTitle={`We're getting your quote ready!`}
          questionSubtext={`By the way, you can apply for coverage yourself, without talking to an agent on the next screen. It takes just 10 minutes to get coverage!`}
        />
        <div className="text-center">
          <div className="mb-10 text-center d-inline-block">
            <Row align="middle">
              <Col>
                <img src={checkIcon} className="mr-5" />
                <Text style={checkboxText}>
                  {`Permanent Whole Life Coverage`}
                </Text>
              </Col>
            </Row>
            <Row align="middle">
              <Col>
                <img src={checkIcon} className="mr-5" />
                <Text style={checkboxText}>{`Coverage never goes down`}</Text>
              </Col>
            </Row>

            <Row align="middle">
              <Col>
                <img src={checkIcon} className="mr-5" />
                <Text style={checkboxText}> {`Rate will never increase`} </Text>
              </Col>
            </Row>

            <Row align="middle">
              <Col>
                <img src={checkIcon} className="mr-5" />
                <Text style={checkboxText}> {`No medical exam`} </Text>
              </Col>
            </Row>

            <Row align="middle">
              <Col>
                <img src={checkIcon} className="mr-5" />
                <Text style={checkboxText}> {`Simple Yes/ No Questions`} </Text>
              </Col>
            </Row>
          </div>
          <div>
            <Spin className="spinner" />
          </div>
          <NavigationButtons
            navigate={() => {
              this.navigate();
            }}
            nextText="See Quote"
            hideProgress
          />
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
    app: state.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        storeQuote: (quote: QuoteDto) => StoreQuote(quote),
        startSaveApplication: (savePayload: SavePayload) =>
          StartSaveApplication(savePayload),
      },
      dispatch
    ),
  };
};

export const QuoteLoadingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteLoadingClass);
