import { Row, Col } from "antd";
import React from "react";
import { QuoteDto } from "../../clients/api.generated.clients";
import { GlobalState } from "../../reducers/root_reducer";
import { connect } from "react-redux";
import "./card_wrapper.css";
import { Stepper } from "../Stepper/stepper";

interface Props {
  quote: QuoteDto;
  children: any;
}

class CardWrapperClass extends React.Component<Props, any> {
  render() {
    const height = window.innerHeight;
    const path = window.location.hash.toLowerCase();

    const autoHeight = [
      "#/quote/quoteready",
      "#/payment/accountinfo",
      "#/policy/social",
      "#/review/app",
      "#/quote/coverageamount",
      "#/policy/name",
      "#/review/beneficiaries",
    ];
    return (
      <div style={{ minHeight: height - 64, backgroundColor: "#142951" }}>
        {path !== "ThankYou" && <Stepper />}
        <div className="card-wrapper">
          <Row justify="center">
            <Col xl={24} md={16} xs={24}>
              <div
                className="main-card"
                style={{
                  height: autoHeight.includes(path) ? "auto" : "553px",
                }}
              >
                {this.props.children}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return {
    quote: state.quote,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const CardWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardWrapperClass);
