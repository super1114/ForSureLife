import { Row, Col } from "antd";
import React from "react";
import { FormattedNumber } from "react-intl";
import { isMobileDevice } from "../../utilities/responsive";
import "./compare_quote.css";

interface Props {
  length?: string;
  coverage: number;
  monthly: number;
  png?: JSX.Element;
  amAm: boolean;
  selectedBenefitAmount: number;
}

export class CompareQuote extends React.Component<Props, any> {
  render() {
    const { length, coverage, monthly, png, amAm, selectedBenefitAmount } =
      this.props;
    return (
      <Row
        style={{
          height: 80,
          marginTop: 5,
          color: amAm ? "#fff" : "#484848",
          fontWeight: "bold",
          fontSize: isMobileDevice() ? 12 : "inherit",
          border: "solid #ececec",
          background: amAm ? "#3BC11E" : undefined,
          borderWidth: amAm ? 0 : 1,
          padding: 5,
          borderRadius: 10,
          boxShadow: amAm ? "3px 3px #248621" : "3px 3px #ececec",
        }}
        className={`${amAm ? "best-price" : ""}`}
        align="middle"
      >
        <Col className="" xs={{ span: 8, offset: 1 }}>
          <div className={`${amAm ? "best-price-img" : "ant-col-flex-center"}`}>
            {png}
          </div>
        </Col>
        {length && (
          <Col
            className="ant-col-flex-center"
            lg={5}
            xs={{ span: 7, offset: 1 }}
          >
            <div style={{ fontSize: "18px" }}> Length:</div>
            <div style={{ fontWeight: "normal" }}>{length}</div>
          </Col>
        )}
        <Col className="ant-col-flex-center" lg={5} xs={{ span: 7, offset: 1 }}>
          <div style={{ fontSize: "18px" }}>Coverage:</div>
          <div
            style={{
              fontWeight: "normal",
              fontSize: isMobileDevice() ? "18px" : "26px",
            }}
          >
            {selectedBenefitAmount !== coverage ? (
              "N/A"
            ) : (
              <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                value={coverage}
                style="currency"
                currency="USD"
              />
            )}
          </div>
        </Col>
        <Col className="ant-col-flex-center" lg={5} xs={7}>
          <div style={{ fontSize: "18px" }}> Monthly:</div>
          <div
            style={{
              color: amAm ? "#fff" : "#E80000",
              fontWeight: "bold",
              fontSize: isMobileDevice() ? "18px" : "26px",
            }}
          >
            {selectedBenefitAmount !== coverage ? (
              "N/A"
            ) : (
              <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                value={monthly}
                style="currency"
                currency="USD"
              />
            )}
          </div>
        </Col>
      </Row>
    );
  }
}
