import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { BeneficiaryFormPage } from "../containers/beneficiary/BeneficiaryFormPage/beneficiary_form_page";
import { CardiomyopathyPage } from "../containers/health/cardiomyopathy_page";
import { CardiomyopathyTimelinePage } from "../containers/health/cardiomyopathy_timeline_page";
import { CerebralpalsyPage } from "../containers/health/cerebralpalsy_page";
import { CirrhosisDiagnosisPage } from "../containers/health/cirrhosis_diagnosis_page";
import { CirrhosisTimelinePage } from "../containers/health/cirrhosis_timeline_page";
import { COPDPage } from "../containers/health/copd_page";
import { COPDTimelinePage } from "../containers/health/copd_timeline_page";
import { DrugsAlcoholPage } from "../containers/health/drugs_or_alcohol_page";
import { HeartBrainPage } from "../containers/health/heart_brain_page";
import { HeartBrainTimelinePage } from "../containers/health/heart_brain_timeline_page";
import { HeartHealthPage } from "../containers/health/heart_health_page";
import { HeartTimelinePage } from "../containers/health/heart_timeline_page";
import { KidneyDiseasePage } from "../containers/health/kidney_disease_page";
import { InitialLanding1Page } from "../containers/lead/initial_landing1";
import { LiverDiseasePage } from "../containers/health/liver_disease_page";
import { OutstandingTestingPage } from "../containers/health/outstanding_testing_page";
import { ParalysisPage } from "../containers/health/paralysis_page";
import { SeriousComplicationsPage } from "../containers/health/serious_complications_page";
import { BeneficiaryRelationshipPage } from "../containers/lead/beneficiary_relationship_page";
import { BirthPage } from "../containers/lead/BirthYearPage/birth_year_page";
import { CoverageAmountPage } from "../containers/lead/CoverageAmountPage/coverage_amount_page";
import { CurrentCoveragePage } from "../containers/lead/current_coverage_page";
import { FirstNamePage } from "../containers/lead/FirstNamePage/first_name_page";
import { HobbyPage } from "../containers/lead/HobbyPage/hobby_page";
import { HomeAddressPage } from "../containers/lead/HomeAddressPage/home_address_page";
import { PhoneNumberPage } from "../containers/lead/PhoneNumberPage/phone_number_page";
import { BeneficiaryLandingPage } from "../containers/beneficiary/beneficiary_landing_page";
import { PolicyBirthPage } from "../containers/policy/policy_birthday";
import { PolicyNamePage } from "../containers/policy/PolicyName/policy_name";
import { PolicySocialPage } from "../containers/policy/PolicySocial/policy_social";
import { PolicySeparateOwnerPage } from "../containers/policy/policy_separate_owner";
import { PolicySeparateOwnerNamePage } from "../containers/policy/policy_separate_owner_name";
import { PolicySeparateOwnerRelationshipPage } from "../containers/policy/policy_separate_owner_relationship";
import { PolicySeparateOwnerAddressPage } from "../containers/policy/policy_separate_owner_address";
import { PolicySeparateOwnerSocialPage } from "../containers/policy/PolicySeparateOwnerSocial/policy_separate_owner_social";
import { PolicyExistingInsurancePage } from "../containers/policy/policy_existing_insurance";
import { PolicyReplaceExistingInsurancePage } from "../containers/policy/policy_replace_existing_insurance";
import { PolicyExistingInfoPage } from "../containers/policy/policy_existing_info";
import { TobacooUsePage } from "../containers/knockout/tobacoo_use";
import { CancerPage } from "../containers/knockout/cancer";
import { CancerTimelinePage } from "../containers/knockout/cancer_timeline_page";
import { ChronicIllnessPage } from "../containers/knockout/chronic_illness";
import { HospiceCarePage } from "../containers/knockout/hospice_care";
import { LivePast12MonthsPage } from "../containers/knockout/live_past_12_months";
import { MultipleCancerPage } from "../containers/knockout/multiple_cancer";
import { NotEligiblePage } from "../containers/knockout/not_eligible";
import { OrganDialysisDiseasePage } from "../containers/knockout/organ_dialysis_disease";
import { OxygenPage } from "../containers/knockout/oxygen";
import { OxygenTimelinePage } from "../containers/knockout/oxygen_timeline";
import { SelfReliantPage } from "../containers/knockout/self_reliant";
import { HospitilizedPage } from "../containers/knockout/hospitilized";
import { ReviewLandingPage } from "../containers/review/review_landing_page";
import { ReviewAppPage } from "../containers/review/review_app_page";
import { ReviewUpdateMenuPage } from "../containers/review/review_update_menu_page";
import { PaymentCheckingOrSavingsPage } from "../containers/payment/payment_checking_or_savings";
import { PaymentDatePage } from "../containers/payment/payment_date";
import { PaymentAccountInfoPage } from "../containers/payment/payment_account_info";
import { PaymentLandingPage } from "../containers/payment/payment_landing_page";
import { PaymentSelectDatePage } from "../containers/payment/payment_selected_date";
import { PaymentSocialSecurityDatePage } from "../containers/payment/payment_social_security_date";
import { ReviewBeneficiaryPage } from "../containers/review/review_beneficiaries";
import { ReviewUpdateMenuOther } from "../containers/review/review_update_menu_other";
import { ReviewUpdateContactPage } from "../containers/review/review_update_contact_page";
import { ReviewUpdateDoctorPage } from "../containers/review/review_update_doctor";
import { ReviewInsurancePage } from "../containers/review/review_insurance_page";
import { ReviewUpdateHealthInfoPage } from "../containers/review/review_update_health_info";
import { SubmitPage } from "../containers/submit/submit_page";
import { HeightPage } from "../containers/lead/height_page";
import { WeightPage } from "../containers/lead/weight_page";
import { QuoteReadyPage } from "../containers/lead/QuoteReadyPage/quote_ready_page";
import { QuotePage } from "../containers/lead/quote_page";
import { GenderPage } from "../containers/lead/gender_page";
import { EmailPage } from "../containers/lead/EmailPage/email_page";
import { HealthLandingPage } from "../containers/health/healthLanding/health_landing";
import { TransitionPage1 } from "../containers/lead/transition_page1";
import { InitialLanding2Page } from "../containers/lead/initial_landing2";
import { InitialLanding3Page } from "../containers/lead/initial_landing3";
import { InitialLanding4Page } from "../containers/lead/initial_landing4";
import { InitialLanding5Page } from "../containers/lead/initial_landing5";
import { QuoteLoadingPage } from "../containers/lead/quote_loading";
import { PolicyStatePage } from "../containers/policy/PolicyState/policy_state";
import { CovidPage } from "../containers/health/covid_page";
import { CovidResidualPage } from "../containers/health/covid_residual_page";
import { CovidTimelinePage } from "../containers/health/covid_timeline_page";
import { AgentContactPage } from "../containers/lead/agent_contact_page";
import { DoctorPage } from "../containers/policy/policy_doctor";
import { KnockoutTransitionPage } from "../containers/knockout/health_landing";
import { ContingentBeneficiaryFormPage } from "../containers/beneficiary/beneficiary_contingent_form";
import { QuoteGradedPage } from "../containers/lead/quote_graded_page";
import { QuoteModifiedPage } from "../containers/lead/quote_modified_page";
import { Covid30DaysPage } from "../containers/health/covid_30_days";
import { CovidDisqualificationPage } from "../containers/health/covid_disqualitifaction";
import { TermsAndConditionsPage } from "../containers/review/review_terms_and_conditions";
import { ThankYouPage } from "../containers/lead/thank_you_page";
import { ReviewLoadAppPage } from "../containers/review/review_loading";
import { QuoteImmediatePage } from "../containers/lead/quote_immediate_page";
import { QuoteLoading2Page } from "../containers/lead/quote_loading2_page";
import { PrivacyPolicyPage } from "../containers/lead/privacy_policy";
import { DesigneePage } from "../containers/policy/policy_designee_page";
import { DesigneeFormPage } from "../containers/policy/policy_designee_form_page";
import { AboutUsPage } from "../containers/misc/about_us";
import { ResumeLandingPage } from "../containers/resume/resume_landing_page/resume_landing_page";
import { ResumeCheckMail } from "../containers/resume/ResumeCheckMail/ResumeCheckMail";
import { PaymentSelectedTypePage } from "../containers/payment/payment_selection_type";
import { HomeAddressManualPage } from "../containers/lead/HomeAddressPage/home_address_manual_page";

export class Routes extends React.Component {
  renderRoutes() {
    function getRoutes(routeObj) {
      return Object.keys(routeObj)
        .map((key) => {
          const route = routeObj[key];
          return (
            <Route key={key} path={route.path} component={route.component} />
          );
        })
        .filter((route) => route);
    }
    const quoteRoutes = getRoutes(navRoutes.Quote);
    const healthRoutes = getRoutes(navRoutes.Health);
    const beneficiaryRoutes = getRoutes(navRoutes.Beneficiary);
    const policyRoutes = getRoutes(navRoutes.Policy);
    const knockoutRoutes = getRoutes(navRoutes.Knockout);
    const reviewRoutes = getRoutes(navRoutes.Review);
    const paymentRoutes = getRoutes(navRoutes.Payment);
    const submitRoutes = getRoutes(navRoutes.Submit);
    const resumeRoutes = getRoutes(navRoutes.Resume);
    const aboutUsRoutes = getRoutes(navRoutes.About);
    return [
      ...quoteRoutes,
      ...healthRoutes,
      ...beneficiaryRoutes,
      ...policyRoutes,
      ...knockoutRoutes,
      ...reviewRoutes,
      ...paymentRoutes,
      ...resumeRoutes,
      ...submitRoutes,
      ...aboutUsRoutes,
    ];
  }

  render() {
    return (
      <Route
        render={(props) => {
          const { location } = props;
          return (
            <Switch location={location}>
              {this.renderRoutes()}
              <Route exact path="/" component={InitialLanding1Page} />
            </Switch>
          );
        }}
      />
    );
  }
}

interface RouteKey {
  [key: string]: {
    path: string;
    component: any;
  };
}
interface Route {
  Quote: RouteKey;
  Health: RouteKey;
  Beneficiary: RouteKey;
  Policy: RouteKey;
  Knockout: RouteKey;
  Review: RouteKey;
  Payment: RouteKey;
  Resume: RouteKey;
  Submit: RouteKey;
  About: RouteKey;
}

export const navRoutes: Route = {
  Quote: {
    BirthYear: {
      path: `/quote/birthyear`,
      component: BirthPage,
    },
    PrivacyPolicy: {
      path: `/privacyPolicy`,
      component: PrivacyPolicyPage,
    },
    CurrentCoverage: {
      path: `/quote/currentcoverage`,
      component: CurrentCoveragePage,
    },
    CoverageAmount: {
      path: `/quote/coverageamount`,
      component: CoverageAmountPage,
    },
    BeneficiaryRelationship: {
      path: `/quote/beneficiaryrelationship`,
      component: BeneficiaryRelationshipPage,
    },
    Hobby: {
      path: `/quote/hobby`,
      component: HobbyPage,
    },
    FirstName: {
      path: `/quote/firstname`,
      component: FirstNamePage,
    },
    HomeAddress: {
      path: `/quote/homeaddress`,
      component: HomeAddressPage,
        },
    HomeAddressManual: {
        path: `/quote/homeaddressmanual`,
        component: HomeAddressManualPage,
    },
    PhoneNumber: {
      path: `/quote/phonenumber`,
      component: PhoneNumberPage,
    },
    InitialLanding1: {
      path: `/quote/initiallanding1`,
      component: InitialLanding1Page,
    },
    InitialLanding2: {
      path: `/quote/initiallanding2`,
      component: InitialLanding2Page,
    },
    InitialLanding3: {
      path: `/quote/initiallanding3`,
      component: InitialLanding3Page,
    },
    InitialLanding4: {
      path: `/quote/initiallanding4`,
      component: InitialLanding4Page,
    },
    InitialLanding5: {
      path: `/quote/initiallanding5`,
      component: InitialLanding5Page,
    },
    Height: {
      path: `/quote/height`,
      component: HeightPage,
    },
    Weight: {
      path: `/quote/weight`,
      component: WeightPage,
    },
    QuoteReady: {
      path: `/quote/quoteready`,
      component: QuoteReadyPage,
    },
    Quote: {
      path: `/quote/quote`,
      component: QuotePage,
    },
    Gender: {
      path: `/quote/gender`,
      component: GenderPage,
    },
    Transition1: {
      path: `/quote/transition1`,
      component: TransitionPage1,
    },
    QuoteLoading: {
      path: `/quote/loading`,
      component: QuoteLoadingPage,
    },
    QuoteLoading2: {
      path: `/quote/loading2`,
      component: QuoteLoading2Page,
    },
    AgentContact: {
      path: `/quote/agentcontact`,
      component: AgentContactPage,
    },
    QuoteGraded: {
      path: `/quote/graded`,
      component: QuoteGradedPage,
    },
    QuoteModified: {
      path: `/quote/modified`,
      component: QuoteModifiedPage,
    },
    QuoteImmediate: {
      path: `/quote/immediate`,
      component: QuoteImmediatePage,
    },
    ThankYou: {
      path: `/thankyou`,
      component: ThankYouPage,
    },
  },
  Health: {
    HealthLanding: {
      path: "/health/healthlanding",
      component: HealthLandingPage,
    },
    HeartHealth: {
      path: "/health/hearthealth",
      component: HeartHealthPage,
    },
    HeartTimeline: {
      path: "/health/hearttimeline",
      component: HeartTimelinePage,
    },
    CirrhosisDiagnosis: {
      path: "/health/cirrhosisdiagnosis",
      component: CirrhosisDiagnosisPage,
    },
    CirrhosisTimeline: {
      path: "/health/cirrhosistimeline",
      component: CirrhosisTimelinePage,
    },
    KidneyDisease: {
      path: "/health/kidneydisease",
      component: KidneyDiseasePage,
    },
    COPD: {
      path: "/health/copd",
      component: COPDPage,
    },
    COPDTimeline: {
      path: "/health/copdtimeline",
      component: COPDTimelinePage,
    },
    HeartOrBrainProcedure: {
      path: "/health/heartorbrainprocedure",
      component: HeartBrainPage,
    },
    HeartOrBrainProcedureTimeline: {
      path: "/health/heartorbrainproceduretimeline",
      component: HeartBrainTimelinePage,
    },
    OutstandingTesting: {
      path: "/health/outstandingTesting",
      component: OutstandingTestingPage,
    },
    SeriousComplications: {
      path: "/health/seriouscomplications",
      component: SeriousComplicationsPage,
    },
    DrugsOrAlcohol: {
      path: "/health/drugsoralcohol",
      component: DrugsAlcoholPage,
    },
    Cardiomyopathy: {
      path: "/health/cardiomyopathy",
      component: CardiomyopathyPage,
    },
    CardiomyopathyTimeline: {
      path: "/health/cardiomyopathytimeline",
      component: CardiomyopathyTimelinePage,
    },
    LiverDisease: {
      path: "/health/liverdisease",
      component: LiverDiseasePage,
    },
    Covid: {
        path: "/health/covid",
      component: CovidPage,
    },
    CovidTimeline: {
        path: "/health/covidtimeline",
      component: CovidTimelinePage,
    },
    CovidResidual: {
        path: "/health/covidresidual",
      component: CovidResidualPage,
    },
    Covid30Days: {
        path: "/health/covidr30days",
      component: Covid30DaysPage,
    },
    CovidDisqualification: {
        path: "/health/covidDisqualify",
      component: CovidDisqualificationPage,
    },
    CerebralPalsy: {
      path: "/health/cerebralpalsy",
      component: CerebralpalsyPage,
    },
    Paralysis: {
      path: "/health/paralysis",
      component: ParalysisPage,
    },
  },
  Beneficiary: {
    BeneficiaryLanding: {
      path: "/beneficiary/landing",
      component: BeneficiaryLandingPage,
    },
    BeneficiaryForm: {
      path: "/beneficiary/form",
      component: BeneficiaryFormPage,
    },
    ContingentBeneficiaryForm: {
      path: "/beneficiary/contingent",
      component: ContingentBeneficiaryFormPage,
    },
  },
  Policy: {
    PolicyBirthday: {
      path: "/policy/birthday",
      component: PolicyBirthPage,
    },
    PolicyState: {
      path: "/policy/state",
      component: PolicyStatePage,
    },
    PolicyFullname: {
      path: "/policy/name",
      component: PolicyNamePage,
    },
    PolicySocialPage: {
      path: "/policy/social",
      component: PolicySocialPage,
    },
    PolicySeparateOwner: {
      path: "/policy/owner",
      component: PolicySeparateOwnerPage,
    },
    PolicyEmail: {
      path: `/quote/email`,
      component: EmailPage,
    },
    PolicyHomeAddress: {
      path: `/policy/homeaddress`,
      component: HomeAddressPage,
    },
    PolicyPhone: {
      path: `/policy/phone`,
      component: PhoneNumberPage,
    },
    PolicyOwnerName: {
      path: "/policy/ownername",
      component: PolicySeparateOwnerNamePage,
    },
    PolicyOwnerRelationship: {
      path: "/policy/relationship",
      component: PolicySeparateOwnerRelationshipPage,
    },
    PolicyOwnerAddress: {
      path: "/policy/address",
      component: PolicySeparateOwnerAddressPage,
    },
    PolicyOwnerSocial: {
      path: "/policy/ownersocial",
      component: PolicySeparateOwnerSocialPage,
    },
    PolicyExistingInsurance: {
      path: "/policy/insurance",
      component: PolicyExistingInsurancePage,
    },
    PolicyReplacement: {
      path: "/policy/replacement",
      component: PolicyReplaceExistingInsurancePage,
    },
    PolicyExistingInfo: {
      path: "/policy/info",
      component: PolicyExistingInfoPage,
    },
    PolicyDoctor: {
      path: "/policy/doctor",
      component: DoctorPage,
    },
    PolicyDesignee: {
      path: "/policy/designee",
      component: DesigneePage,
    },
    PolicyDesigneeForm: {
      path: "/policy/designeeform",
      component: DesigneeFormPage,
    },
  },
  Knockout: {
    TobacooUse: {
      path: "/knockout/tobacoo",
      component: TobacooUsePage,
    },
    Cancer: {
      path: "/knockout/cancer",
      component: CancerPage,
    },
    CancerTimeline: {
      path: "/knockout/cancertimeline",
      component: CancerTimelinePage,
    },
    ChronicIllness: {
      path: "/knockout/chronicillness",
      component: ChronicIllnessPage,
    },
    HospiceCare: {
      path: "/knockout/hospicecare",
      component: HospiceCarePage,
    },
    Hospitilized: {
      path: "/knockout/hospitilized",
      component: HospitilizedPage,
    },
    LivePast12Months: {
      path: "/knockout/live12months",
      component: LivePast12MonthsPage,
    },
    MultipleCancer: {
      path: "/knockout/multiplecancer",
      component: MultipleCancerPage,
    },
    NotEligible: {
      path: "/noteligible",
      component: NotEligiblePage,
    },
    OrganDialysisDisease: {
      path: "/knockout/transplant",
      component: OrganDialysisDiseasePage,
    },
    Oxygen: {
      path: "/knockout/oxygen",
      component: OxygenPage,
    },
    OxygenTimeline: {
      path: "/knockout/oxygentimeline",
      component: OxygenTimelinePage,
    },
    SelfReliant: {
      path: "/knockout/selfreliant",
      component: SelfReliantPage,
    },
    KnockoutTransition: {
      path: "/knockout/transition",
      component: KnockoutTransitionPage,
    },
  },
    Payment: {
        PaymentType: {
            path: "/payment/paymenttype",
            component: PaymentSelectedTypePage
        },
        PaymentLanding: {
            path: "/payment/accountinfo",
            component: PaymentLandingPage,
        },
        PaymentCheckingOrSavings: {
            path: "/payment/checkingsavings",
            component: PaymentCheckingOrSavingsPage,
        },
        PaymentDate: {
            path: "/payment/paymentdate",
            component: PaymentDatePage,
        },
        PaymentSocialSecurityDate: {
            path: "/payment/socialsecuritydate",
            component: PaymentSocialSecurityDatePage,
        },
        PaymentSelectDate: {
            path: "/payment/paymentselectdate",
            component: PaymentSelectDatePage,
        },
    },
  Review: {
    ReviewLanding: {
      path: "/review/landing",
      component: ReviewLandingPage,
    },
    ReviewApp: {
      path: "/review/app",
      component: ReviewAppPage,
    },
    ReviewUpdateMenu: {
      path: "/review/menu",
      component: ReviewUpdateMenuPage,
    },
    ReviewBeneficiaries: {
      path: "/review/beneficiaries",
      component: ReviewBeneficiaryPage,
    },
    ReviewMenuOther: {
      path: "/review/other",
      component: ReviewUpdateMenuOther,
    },
    ReviewContact: {
      path: "/review/contact",
      component: ReviewUpdateContactPage,
    },
    ReviewDoctor: {
      path: "/review/doctor",
      component: ReviewUpdateDoctorPage,
    },
    ReviewInsurance: {
      path: "/review/insurance",
      component: ReviewInsurancePage,
    },
    ReviewHealth: {
      path: "/reivew/healthinfo",
      component: ReviewUpdateHealthInfoPage,
    },
    ReviewTermsConditions: {
      path: "/reivew/termsconditions",
      component: TermsAndConditionsPage,
    },
    ReviewLoadApp: {
      path: "/reivew/loading",
      component: ReviewLoadAppPage,
    },
  },
  Resume: {
    ResumeLanding: {
      path: "/resume/landing",
      component: ResumeLandingPage,
    },
    CheckMail: {
      path: "/resume/checkMail",
      component: ResumeCheckMail,
    },
  },
  Submit: {
    SubmitLanding: {
      path: "/submit",
      component: SubmitPage,
    },
  },
  About: {
    AboutUsPage: {
      path: "/aboutus",
      component: AboutUsPage,
    },
  },
};
