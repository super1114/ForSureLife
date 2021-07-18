import { CheckOutlined } from '@ant-design/icons';
import { Col, Row, Tag, Descriptions, Typography, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React from 'react';
import { AAFinalExpense, AccountType, ApplicationDto, Gender, Relationship, SSDDate } from '../clients/api.generated.clients';
import { PDF } from '../utilities/strings';
import moment from 'moment';
import { ordinal_suffix_of } from '../utilities/number';
import { FormattedNumber } from 'react-intl';
interface Props {
    app: ApplicationDto;
    aaFinalExpense: AAFinalExpense;
}
interface State {
}

enum SSDDateLong {
    FirststDOM = "1st",
    ThirdDOM = "3rd",
    SecondW = "2nd Wednesday",
    ThirdW = "3rd Wednesday",
    ForthW = "4th Wednesday",
}

export class AppReview extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }


    render() {
        const { app: { applicationInfo, leadInfo, healthQuestions }, aaFinalExpense, app } = this.props;
        return (
            <Row style={{ marginTop: 60 }} gutter={16} justify="center">
                <Col md={24} xs={24}>
                    <div id="app_review" style={{ border: '1px solid lightgray', padding: 10 }}>
                        <Row style={{ marginBottom: 25 }} justify="center">
                            <Col style={{ textAlign: 'center' }} xs={24}>
                                <Tag style={{ whiteSpace: 'pre-wrap' }}>
                                    <div style={{ fontWeight: 'bold' }}>AMERICAN-AMICABLE LIFE INSURANCE COMPANY OF TEXAS</div>
                                    <div>P.O. BOX 2549, WACO, TX 76702-2549 • (254) 297-2777</div>
                                </Tag>
                            </Col>
                        </Row>
                        <Descriptions bordered
                            title={<Tag >INDIVIDUAL LIFE INSURANCE APPLICATION</Tag>}
                            size={"small"}>
                            <Descriptions.Item label="Proposed Insured">
                                {`${applicationInfo.firstName} ${applicationInfo.middleName} ${applicationInfo.lastName}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Address">
                                {`${leadInfo.address1} ${leadInfo.address2}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="City">
                                {`${leadInfo.city} `}
                            </Descriptions.Item>
                            <Descriptions.Item label="State">
                                {`${leadInfo.state} `}
                            </Descriptions.Item>
                            <Descriptions.Item label="ZipCode">
                                {`${leadInfo.zipCode} `}
                            </Descriptions.Item>
                        </Descriptions>
                        <hr />
                        <Descriptions bordered
                            size={"small"}>
                            <Descriptions.Item label="Gender">
                                {leadInfo.gender === Gender.Male ? "Male" : "Female"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">
                                {`${moment(applicationInfo.dob).format("MM/DD/YYYY")} `}
                            </Descriptions.Item>
                            <Descriptions.Item label="Age">
                                {`${moment().diff(moment(applicationInfo.dob).format("MM/DD/YYYY"), 'years')} `}
                            </Descriptions.Item>
                            <Descriptions.Item label="State of Birth">
                                {`${applicationInfo.stateOfBirth}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Social Security Number">
                                {`${applicationInfo.ssn}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Height">
                                {`${applicationInfo.heightFt}ft. ${applicationInfo.heightIn}in.`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Weight">
                                {`${applicationInfo.weight}`}
                            </Descriptions.Item>
                        </Descriptions>
                        <hr />
                        <Descriptions bordered
                            title={<Tag >Owner</Tag>}
                            size={"small"}>
                            <Descriptions.Item label="Name">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="Relationship">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="SS#">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="Address">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="City/State/Zip">
                                <span />
                            </Descriptions.Item>
                        </Descriptions>
                        <hr />
                        <Descriptions bordered
                            size={"small"}>
                            <Descriptions.Item label="Primary Beneficiary">
                                {app.beneficiaries.length > 1 ? `Multi Bene - See Addendum` : (app.beneficiaries.length == 1 ? app.beneficiaries[0].personalInfo.firstName + " " + app.beneficiaries[0].personalInfo.lastName : "")}

                            </Descriptions.Item>
                            <Descriptions.Item label="Relationship">
                                {app.beneficiaries.length > 1 ? `Multiple Beneficiaries` : (app.beneficiaries.length === 1 ? app.beneficiaries[0].relationship : "")}

                            </Descriptions.Item>
                            <Descriptions.Item label="Contingent Beneficiary">
                                {app.contingentBeneficiaries.length > 1 ? `Multi Bene - See Addendum` : (app.contingentBeneficiaries.length == 1 ? app.contingentBeneficiaries[0].personalInfo.firstName + " " + app.contingentBeneficiaries[0].personalInfo.lastName : "")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Relationship">
                                {app.contingentBeneficiaries.length > 1 ? `Multiple Beneficiaries` : (app.contingentBeneficiaries.length === 1 ? app.contingentBeneficiaries[0].relationship : "")}
                            </Descriptions.Item>
                        </Descriptions>
                        <hr />
                        <Descriptions bordered
                            layout="vertical"
                            size={"small"}>
                            <Descriptions.Item label="Plan:">
                                {`Return of Premium Death Benefit`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Face Amount of Insurance">
                                <FormattedNumber minimumFractionDigits={0} maximumFractionDigits={0} value={leadInfo.desiredCoverageAmount} style="currency" currency="USD" />
                            </Descriptions.Item>
                            <Descriptions.Item label="During the past 12 months have you used tobacco in any form (excluding occasional pipe and cigar use)?">
                                Yes
                            </Descriptions.Item>
                        </Descriptions>
                        <hr />
                        <Descriptions bordered
                            layout="horizontal"
                            size={"small"}>
                            <Descriptions.Item label="Rider:">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="Number of Children Applying">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="Units">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="Other">

                            </Descriptions.Item>


                            <Descriptions.Item label="Automatic Premium Loan Elected?">
                                Yes
                            </Descriptions.Item>
                            <Descriptions.Item label="Mode:">
                                Bank Draft
                            </Descriptions.Item>

                            <Descriptions.Item label="CWA">
                            </Descriptions.Item>
                            <Descriptions.Item label="Mail Policy To:">
                                Insured
                    </Descriptions.Item>
                            <Descriptions.Item label="Requested Policy Date:">
                                {`${moment(aaFinalExpense.effectiveDate).format("MM/DD/YYYY")} `}
                            </Descriptions.Item>
                            <Descriptions.Item label="Modal Prem:">
                                <FormattedNumber minimumFractionDigits={2} maximumFractionDigits={2} value={aaFinalExpense.selectedMonthlyRate} style="currency" currency="USD" />
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions bordered
                            layout="vertical"
                            size={"small"}>
                            <Descriptions.Item label="A. Do you have existing life insurance or an annuity contract?">
                                {leadInfo.currentCoverage ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="B. Will you replace an existing life insurance policy or an annuity?">
                                No
                    </Descriptions.Item>

                        </Descriptions>
                        <Descriptions bordered
                            layout="horizontal"
                            size={"small"}>

                            <Descriptions.Item label="Company">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="Policy #">
                                <span />
                            </Descriptions.Item>
                            <Descriptions.Item label="Amount of Coverage $">
                                <span />
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions bordered
                            layout="horizontal"
                            size={"small"}>
                            <Descriptions.Item label="Physician Name:">
                                {applicationInfo.doctorName}
                            </Descriptions.Item>
                            <Descriptions.Item label="City/State:">
                                {applicationInfo.doctorCity}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone:">
                                <span />
                            </Descriptions.Item>
                        </Descriptions>
                        <hr />
                        {this.renderHealthInformation()}

                    </div>
                </Col>


            </Row>

        )


    }
    renderHealthInformation = () => {
        const { aaFinalExpense } = this.props;
        if (aaFinalExpense.applicationAnswers.length === 13) {
            return (
                <div>
                    <Descriptions bordered
                        title={<Tag>HEALTH INFORMATION</Tag>}
                        size={"small"}
                        layout="vertical">
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.ONE}>
                            {aaFinalExpense.applicationAnswers[0].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.TWO}>
                            {aaFinalExpense.applicationAnswers[1].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.THREE}>
                            {aaFinalExpense.applicationAnswers[2].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                    </Descriptions>
                    {this.renderSectionHeader("If any answer to questions 1 through 3 is answered “Yes” the Proposed Insured is not eligible for any coverage.")}
                    <Descriptions
                        bordered
                        size={"small"}
                        layout="vertical">
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.FOUR}>
                            {aaFinalExpense.applicationAnswers[3].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.FIVE}>
                            {aaFinalExpense.applicationAnswers[4].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.SIX}>
                            {aaFinalExpense.applicationAnswers[5].answer ? "Yes" : "No"}
                        </Descriptions.Item>

                    </Descriptions>
                    <Descriptions bordered size="small" layout="vertical" >
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.TEXT}>
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.A}>
                            {aaFinalExpense.applicationAnswers[6].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.B}>
                            {aaFinalExpense.applicationAnswers[7].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.C}>
                            {aaFinalExpense.applicationAnswers[8].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.SEVEN.D}>
                            {aaFinalExpense.applicationAnswers[9].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                    </Descriptions>
                    {this.renderSectionHeader("If any answer to questions 4 through 7 is answered “Yes” the Proposed Insured should apply for the Return of Premium Death Benefit Plan.")}
                    <Descriptions bordered size="small" layout="vertical" >
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.TEXT}>
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.A}>
                            {aaFinalExpense.applicationAnswers[10].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.B}>
                            {aaFinalExpense.applicationAnswers[11].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label={PDF.HEALTH_INFORMATION.EIGHT.C}>
                            {aaFinalExpense.applicationAnswers[12].answer ? "Yes" : "No"}
                        </Descriptions.Item>
                    </Descriptions>
                    {this.renderSectionHeader("If any answer to question 8 is answered “Yes” the Proposed Insured should apply for the Graded Death Benefit Plan.")}
                    {this.renderSectionHeader("If all questions 1 through 8 are answered “No” the Proposed Insured should apply for the Immediate Death Benefit Plan.")}
                    {this.renderNotice()}
                    {this.renderChildCoverage()}
                    {this.renderAuthorizationStatements()}
                    {this.renderAgentReport()}
                    {this.renderPreauthorizationCheckPlan()}
                    <div style={{ borderBottom: "2px dashed gray", margin: 15 }} />
                    {this.renderConditionalReceipt()}
                    {this.renderCovidQuestions()}
                </div >

            )
        }
    }

    renderSectionHeader = (text: string) => {
        return (<div>
            <hr />
            <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 12 }}>{text}</div>
            <hr />
        </div>)
    }

    renderAuthorizationStatements = () => {
        return (
            <div style={{ textAlign: 'justify' }}>
                <div>
                    <b>{PDF.STATEMENTS.CHILDRENSHEALTHSTATEMENT_TITLE}</b>
                    {PDF.STATEMENTS.CHILDRENSHEALTHSTATEMENT}
                </div>
                <div style={{ marginTop: 10 }}>
                    <b>{PDF.STATEMENTS.CHILDREN_EXCEPTION}</b>
                    <hr />
                </div>
                <div>
                    <b>{PDF.STATEMENTS.AGREEMENT_TITLE}</b>
                    {PDF.STATEMENTS.AGREEMENT_TEXT}
                </div>
                <div>
                    <b>{PDF.STATEMENTS.AUTHORIZATION_TITLE}</b>
                    {PDF.STATEMENTS.AUTHORIZATION_TEXT}
                </div>
            </div>
        )
    }

    renderChildCoverage = () => {
        return (
            <Descriptions bordered
                title={<Tag><b>CHILD, GRANDCHILD, AND GREAT GRANDCHILD COVERAGE - </b>Children Proposed for Insurance (list additional children on a separate sheet):</Tag>}
                size={"small"}
                layout="vertical">
                <Descriptions.Item label={"Proposed Insured Name"}>
                </Descriptions.Item>
                <Descriptions.Item label={"Sex"}>
                </Descriptions.Item>
                <Descriptions.Item label={"Birthdate"}>
                </Descriptions.Item>
                <Descriptions.Item label={"Relationship"}>
                </Descriptions.Item>
            </Descriptions>
        )
    }

    renderNotice = () => {
        return (<div>
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                <div>NOTICE</div>
                <div>{PDF.NOTICE.PUBLICLAW}</div>
            </div>
            <div style={{ textAlign: 'justify' }}>
                {PDF.NOTICE.COMPLIANCE}
            </div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>
                <div>{PDF.NOTICE.MIBINC}</div>
            </div>
            <div style={{ textAlign: 'justify' }}>
                {PDF.NOTICE.PRENOTICE}
            </div>
        </div>)
    }

    renderAgentReport = () => {
        const NA = "N/A"
        const { app: { applicationInfo }, aaFinalExpense } = this.props;
        return (
            <div>
                <Descriptions bordered
                    title={<Tag>AGENT'S REPORT</Tag>}
                    size={"small"}
                    layout="vertical">
                    <Descriptions.Item label={"Does the proposed insured have any existing life insurance or annuity contract?"}>
                        Yes
                     </Descriptions.Item>
                    <Descriptions.Item label={"Is the proposed insurance intended to replace or change any existing life insurance or annuity?"}>
                        Yes
                     </Descriptions.Item>
                </Descriptions>
                <i>{`I certify that I have personally asked each question on this application to the proposed insured(s), I have truly and completely recorded on the
application the information supplied by him/her, and I witnessed their signature.`}</i>
                <div>I certify that the Terminal Illness Accelerated Benefit Rider and Confined Care Accelerated Benefit Rider Disclosure Forms have been presented to the
applicant, if applicable.</div>
            </div>)
    }

    renderPreauthorizationCheckPlan = () => {
        const { app: { applicationInfo, paymentInfo }, aaFinalExpense } = this.props;
        return (<div>
            <Descriptions bordered
                title={<Tag>{`PREAUTHORIZATION CHECK PLAN - AUTHORIZATION TO HONOR CHARGE DRAWN`}</Tag>}
                size={"small"}
            >
                <Descriptions.Item label={"Insured"}>
                    {`${applicationInfo.firstName} ${applicationInfo.middleName} ${applicationInfo.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label={"Account Holder"}>
                    {`${applicationInfo.firstName} ${applicationInfo.middleName} ${applicationInfo.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label={"Financial Institution"}>
                    {`${paymentInfo.bankingInsitution}`}
                </Descriptions.Item>
                <Descriptions.Item label={"Address"}>
                    {`${paymentInfo.bankAddress}`}
                </Descriptions.Item>
                <Descriptions.Item label={"Transit/ABA Number"}>
                    {`${paymentInfo.routingNumber}`}
                </Descriptions.Item>
                <Descriptions.Item label={"Account Number"}>
                    {`${paymentInfo.accountNumber}`}
                </Descriptions.Item>
                <Descriptions.Item label={"Checking"}>
                    {paymentInfo.bankType === AccountType.Checking ? <CheckOutlined /> : <span />}
                </Descriptions.Item>
                <Descriptions.Item label={"Savings"}>
                    {`${paymentInfo.bankType === AccountType.Savings ? <CheckOutlined /> : ""} `}
                </Descriptions.Item>
                <Descriptions.Item label={"Requested Draft Day (1st-28th)"}>
                    {`${paymentInfo.socialSecurityWithdrawDate !== 0 ? SSDDateLong[SSDDate[paymentInfo.socialSecurityWithdrawDate]] : ordinal_suffix_of(paymentInfo.paymentWithdrawlDate)}`}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ textAlign: 'justify' }}>
                <b>{`ATTACH VOIDED CHECK OR DEPOSIT SLIP`}</b>
                <div>{`As a convenience to me, I hereby request and authorize you to pay and charge to my account amounts drawn on my account, whether by electronic
or paper means, by and payable to the order of American-Amicable Life Insurance Company of Texas, for the purpose of paying premiums on life insurance
policy, provided there are sufficient funds in said account to pay the same upon presentation. I agree that your rights with respect to each such charge
shall be the same as if it were signed personally by me. This authorization is to remain in effect until revoked by me in writing and until you actually
receive such notice. I agree that you shall be fully protected in honoring any such check. I further agree that if any such check be dishonored,
whether with or without cause, and whether intentionally or inadvertently, you shall be under no liability whatsoever even though such dishonor results
in the forfeiture of insurance.`}</div>
                <Descriptions bordered
                    size={"small"}
                    layout="vertical"
                >
                    <Descriptions.Item label={"SIGNATURE (AS ON FINANCIAL INSTITUTION RECORDS)"}>
                        <span />
                    </Descriptions.Item>
                    <Descriptions.Item label={"DATE"}>
                        {moment().format("MM/DD/YYYY")}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </div>)
    }

    renderConditionalReceipt = () => {
        const { app: { applicationInfo, paymentInfo }, aaFinalExpense } = this.props;
        return (
            <div>
                <Row style={{ marginBottom: 25 }} justify="center">
                    <Col style={{ textAlign: 'center' }} xs={24}>
                        <Tag style={{ whiteSpace: 'pre-wrap' }}>
                            <div style={{ fontWeight: 'bold' }}>AMERICAN-AMICABLE LIFE INSURANCE COMPANY OF TEXAS</div>
                            <div>[P.O. BOX 2549, WACO, TX 76702-2549]</div>
                        </Tag>
                    </Col>
                </Row>
                <div style={{ textAlign: 'center' }}><b>{`CONDITIONAL RECEIPT`}</b></div>
                <div style={{ textAlign: 'justify' }}>
                    {`NO COVERAGE WILL BECOME EFFECTIVE PRIOR TO POLICY DELIVERY UNLESS AND UNTIL ALL CONDITIONS OF THIS RECEIPT ARE MET. NO AGENT HAS THE AUTHORITY
TO ALTER THE TERMS OR CONDITIONS OF THIS RECEIPT`}
                </div>
                <div style={{ textAlign: 'center' }}>{`ALL PREMIUM CHECKS MUST BE PAYABLE TO THE COMPANY`}</div>
                <div style={{ textAlign: 'center' }}>{`DO NOT MAKE CHECK PAYABLE TO THE AGENT OR LEAVE PAYEE BLANK`}</div>

                <div style={{ textAlign: 'justify' }}>
                    {`If (1) an amount equal to the first full premium is submitted; and if (2) all underwriting requirements, including any medical examinations required by the Company’s
                        rules, are completed; and (3) the proposed insured is, on the date of application, a risk acceptable for insurance exactly as applied for without modification of plan,
                        premium rate, or amount under the Company’s rules and practices, then insurance under the policy applied for shall become effective on the latest of (a) the date
                        of application, or (b) the date of the latest medical exam required by the Company. THE AMOUNT OF LIFE INSURANCE, INCLUDING ANY AMOUNT IN FORCE OR BEING
                        APPLIED FOR, WHICH MAY BECOME EFFECTIVE PRIOR TO THE DELIVERY OF THE POLICY SHALL IN NO EVENT EXCEED $30,000.00 (INCLUDING LIFE INSURANCE AND
                        ACCIDENTAL DEATH BENEFITS).
                        If any of the above conditions are not met, the liability of the Company shall be limited to the return of any amount paid.`}
                </div>
            </div>
        )
    }

    renderCovidQuestions = () => {
        const { app: { applicationInfo, paymentInfo }, aaFinalExpense } = this.props;
        return (
            <div>
                <Row style={{ marginBottom: 25 }} justify="center">
                    <Col style={{ textAlign: 'center' }} xs={24}>
                        <Tag style={{ whiteSpace: 'pre-wrap' }}>
                            <div style={{ fontWeight: 'bold' }}>Addendum to Application for COVID-19</div>
                            <div>[P.O. BOX 2549, WACO, TX 76702-2549]</div>
                        </Tag>
                    </Col>
                </Row>

                <div style={{ textAlign: 'justify' }}>
                    {`Proposed Insured’s Name (Please Print): `}  {`${applicationInfo.firstName} ${applicationInfo.middleName} ${applicationInfo.lastName}`}
                </div>

                <Descriptions bordered
                    title={<Tag></Tag>}
                    size={"small"}
                    layout="vertical">
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.NINE.TEXT}>
                        {aaFinalExpense.application.healthQuestions[13].healthAnswer ? "Yes" : "No"}
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.TEN.TEXT}>
                        {aaFinalExpense.application.healthQuestions[14].healthAnswer ? "Yes" : "No"}
                    </Descriptions.Item>
                    <Descriptions.Item label={PDF.HEALTH_INFORMATION.ElEVEN.TEXT}>
                        {aaFinalExpense.application.healthQuestions[15].healthAnswer ? "Yes" : "No"}
                    </Descriptions.Item>
                </Descriptions>

                <div style={{ textAlign: 'justify' }}>
                    {`This Addendum to Application amends and is made a part of my individual life insurance application. To the best of my
knowledge and belief, all answers and statements contained in this application are true, complete, and correctly recorded.
I will notify the Company of any changes in the statements or answers given in this application between the time of
application and delivery of the policy.
Fraud Notice: Any person who knowingly presents a false statement in application for insurance may be guilty of a
criminal offense and subject to penalties under state  `}  
                </div>

            </div>
            )
    }


}