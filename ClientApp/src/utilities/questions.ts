const YesNoAnswerOption = ["Yes", "No"];
export const QuestionTypes = {
  Radio: "Radio",
};

export const Strings = {
  Lead: {
    TellUsAboutYourSelf: "Tell us a little about yourself:",
  },
};

interface QuestionType {
  [key: string]: {
    Title: string;
    FunctionTitle?: (...args: string[]) => string;
    FunctionText?: (...args: string[]) => string;
    Text?: string;
    SubText?: string;
    QuestionNumber?: number;
  };
}

interface QuestionList {
  LeadQuestions: QuestionType;
  HealthQuestions: QuestionType;
  BeneficiaryQuestions: QuestionType;
  PolicyQuestions: QuestionType;
  KnockoutQuestions: QuestionType;
  ReviewQuestions: QuestionType;
  PaymentQuestions: QuestionType;
  SubmitQuestions: QuestionType;
}

export const QuestionList: QuestionList = {
  LeadQuestions: {
    BirthYear: {
      Title: "Let's get started with your age:",
      Text: "Tip: Most insurance companies base your quote on factors like age, smoking habits and your overall health.",
      SubText: "",
    },
    CurrentCoverage: {
      Title: "Do you currently have coverage, already?",
      Text: "                       ",
      SubText: "",
    },
    CoverageAmount: {
      Title: "How much coverage would you like?",
      Text: "",
      SubText:
        "Tip: The average cost of a funeral in America is $9,400, so it's best to quote for the amount that you need. Anything extra is nice, but only if it's within your budget.",
    },
    BeneficiaryRelationship: {
      Title: "Who will you be your beneficiary?",
      Text: "In other words, who will you be leaving the money to?",
    },
    Hobby: {
      Title: "What's your favorite hobby?",
      Text: "We use this for security purposes.",
    },
    FirstName: {
      Title: "What is your first name only?",
      Text: "We don't ask for your last name \n to protect your privacy",
    },
    HomeAddress: {
      Title: "",
      FunctionTitle: (firstName: string) => {
        return `Nice to meet you, ${firstName}!`;
      },
      Text: "Where can we send you more information?",
    },
    PhoneNumber: {
      Title: "What's the best number to reach you?",
      Text: "Your phone number will be your personal password, and helps just in case we have any more questions.",
    },
    Height: {
      Title: "Tell us a little about yourself:",
      Text: "How tall are you?",
    },
    Weight: {
      Title: "Tell us a little about yourself:",
      Text: "How much do you weigh?",
    },
    QuoteReady: {
      Title: "We're getting your quote ready!",
      Text: "Peace of mind is just a few minutes away!",
    },
    Quote: {
      Title: "Way to go! Your quote is ready:",
      Text: "Adjust the quote and apply now!",
    },
    Gender: {
      Title: "What is your gender?",
      Text: "As mentioned, most insurance companies base your quote on factors like age, smoking habits and your overall health.",
    },
    Email: {
      Title: "What's your preferred email address?",
      Text: "Your email address will be used as your username and will be the easiest way to receive policy information.",
    },
    Transition1: {
      Title: "",
      FunctionTitle: (name: string) => {
        return `Nice Job! You're half way there, ${name}.`;
      },
      Text: "We'll have your quote and eligibility information ready after just a few more questions!",
    },
    AgentContact: {
      Title: "Thanks! An agent will be in touch shortly.",
      Text: "You may now close this browser window.",
    },
  },
  KnockoutQuestions: {
    TobacooUse: {
      Title:
        "Other than the occasional pipe or cigar, have you smoked tobacco, in the last 12 months?",
      Text: "",
    },
    Cancer: {
      Title:
        "Have you ever had more than one occurence of cancer in your lifetime?",
      Text: "",
      QuestionNumber: 5
    },
    CancerTimeline: {
      Title: "How long has it been since your last occurence of cancer?",
      Text: "",
    },
    ChronicIllness: {
      Title: "Have you ever had any of the following chronic diseases?",
      Text: "Congestive Heart Failure | ALS | Dementia | Liver Disease | HIV/ AIDS",
      QuestionNumber: 4
    },
    HospiceCare: {
      Title: "Are you currently receiving hospice care or home health care?",
      Text: "",
      QuestionNumber: 2
    },
    LivePast12Months: {
      Title:
        "Has your doctor advised that you have less than 12 months to live?",
      Text: "",
      QuestionNumber: 9
    },
    MultipleCancer: {
      Title: "Have you had more than one occurence of cancer in your lifetime?",
      Text: "",
      QuestionNumber: 5
    },
    Hospitilized: {
      Title:
        "Are you currently hospitalized, bedridden, in a nursing home or a wheelchair due to chronic illness or disease?",
      Text: "",
      QuestionNumber: 1
    },
    NotEligible: {
      Title: "Unfortunately, you're not eligible for coverage.",
      Text: "But you still have options available. From savings accounts to easy investments, we cover everything you need to know.",
    },
    OrganDialysisDisease: {
      Title:
        "Have you ever had an organ transplant, kidney dialysis, or an amputation due to disease?",
      Text: "",
      QuestionNumber: 7
    },
    Oxygen: {
      Title: "Have you ever needed oxygen to assist with breathing?",
      Text: "",
      QuestionNumber: 6
    },
    OxygenTimeline: {
      Title: "How long ago did you need oxygen to assist with breathing?",
      Text: "",
    },
    SelfReliant: {
      Title:
        "Do you need help with activities of daily living such as bathing, dressing, eating or toileting?",
      Text: "",
      QuestionNumber: 3
    },
  },
  HealthQuestions: {
    HealthLanding: {
      Title: "Let's see if you're eligible!",
      Text: "In this section, we'll ask some questions about your health to see which plan you're eligible for. This should only take about 5 minutes",
    },
    HeartHealth: {
      Title:
        "Have you ever suffered a heart attack, angina (chest pain), stroke or TIA?",
      Text: "",
      QuestionNumber: 10
    },
    HeartTimeline: {
      Title: "How long ago was your heart attack, angina, stroke or TIA?",
      Text: "",
    },
    CirrhosisDiagnosis: {
      Title:
        "Have you ever been diagnosed or treated for Hepatitis C or cirrhosis?",
      Text: "",
      QuestionNumber: 11
    },
    CirrhosisTimeline: {
      Title: "How long ago were you diagnosed with cirhossis or Hepatits C?",
      Text: "",
    },
    KidneyDisease: {
      Title:
        "Have you ever had chronic kidney failure or disease, or been diagnosed with  renal insufficiency?",
      Text: "",
      QuestionNumber: 12
    },
    COPD: {
      Title:
        "Have you ever been diagnosed or treated for COPD, emphysema or chronic bronchitis?",
      Text: "",
      QuestionNumber: 13
    },
    COPDTimeline: {
      Title:
        "How long ago were you diagnosed with COPD, emphysema or chronic bronchitis?",
      Text: "",
    },
    HeartOrBrainProcedure: {
      Title:
        "Have you ever had or been advised to have any heart or brain procedure to improve circulation?",
      Text: "This includes pacemaker insertion or defibrillator placement.",
      QuestionNumber: 14
    },
    HeartOrBrainProcedureTimeline: {
      Title: "How long ago was this procedure advised or performed?",
      Text: "",
    },
    OutstandingTesting: {
      Title:
        "Do you have any outstanding diagnostic testing, surgery or hospitalization:",
      Text: "Only count those that have been advised by a doctor within the last 2 years which have not been completed or for which the results are not yet known?",
      QuestionNumber: 15
    },
    SeriousComplications: {
      Title: "Have you ever been diagnosed with diabetes?",
      Text: "",
      QuestionNumber: 16
    },
    DrugsOrAlcohol: {
      Title:
        "Within the past 2 years, have you used illegal drugs or abused alcohol?",
      Text: "",
      QuestionNumber: 17
    },
    Cardiomyopathy: {
      Title:
        "Have you ever been diagnosed or treated for cardiomyopathy, systemic lupus, chronic hepatits or chronic pancreatitis?",
      Text: "",
      QuestionNumber: 18
    },
    CardiomyopathyTimeline: {
      Title: "How long ago was this procedure advised or performed?",
      Text: "",
    },
    LiverDisease: {
      Title:
        "Within the past 3 years, have you been diagnosed or treated for cerebral palsy, multiple sclerosis, Parkinson's or muscular dystrophy?",
      Text: "",
      QuestionNumber: 19
    },
    CerebralPalsy: {
      Title:
        "Within the last 3 years, have you been diagnosed or treated for cerebral palsy, multiple sclerosis, Parkinson's or muscular dystrophy?",
      Text: "",
      QuestionNumber: 20
    },
    Covid: {
      Title: "Have your ever been diagnosed with or treated for COVID?",
      Text: "",
      QuestionNumber: 8
    },
    CovidTimeline: {
      Title: "How long ago did you experience your last COVID- 19 symptoms?",
      Text: "",
    },
    CovidResidual: {
      Title:
        "Has COVID-19 caused any residual or permanent effects on your health? ",
      Text: "",
    },
    Covid30Days: {
      Title:
        "Within the past 30 days, have you been advised by a medical professional to get specified medical care (such as any diagnostic testing or hospitalization) which was not completed; as result of fever, cough, shortness of breath, fatigue(excluding HIV/ AIDS)?",
      Text: "",
    },
    Paralysis: {
      Title:
        "In the last 3 years, have you been diagnosed or treated for paralysis of two or more extremeties?",
      Text: "",
      QuestionNumber: 21
    },
  },
  BeneficiaryQuestions: {
    BeneficiaryLanding: {
      Title:
        "You're doing great! That's all the health info we need. Now let's take care of your beneficiaries!",
      Text: "",
    },
    BeneficiaryForm: {
      Title: "Let's add your beneficiaries.",
      Text: "These are the people we care about most, who we want to look out for and are the ones you leave money to so they can carry out your final wishes.",
    },
    ContingentBeneficiaryForm: {
      Title: "Would you like to add any contingent beneficiaries?",
      Text: "",
    },
    BeneficiaryReview: {
      Title: "Perfect, does this look correct?",
      Text: "",
    },
  },
  PolicyQuestions: {
    PolicyBirthday: {
      Title: `What's your date of birth?`,
      Text: "Again, this should match what's on your state issued ID to make sure the check goes to the right person.",
    },
    PolicyState: {
      Title: `Where were you born?`,
      Text: `This is required for underwriting purposes. If you were born outside of the U.S., let us know which country.`,
    },
    PolicyFullname: {
      Title: "",
      FunctionTitle: (firstName: string) => {
        return `${firstName}, what's your full name?`;
      },
      Text: "It's important this matches your name as it appears on your states issued ID to make sure your check goes to you and no one else when the time comes. ",
    },
    PolicySocial: {
      Title: "Last, we'll need your social security number:",
      SubText: `We will never share this number. Remember all of your information is protected by the latest online security and is guaranteed safe.`,
    },
    PolicySeparateOwner: {
      Title: `Who will be financially responsible for
            your insurance policy?`,
      Text: "",
      SubText: "What is an owner?",
    },
    PolicyOwnerName: {
      Title: "Tell us about the policy owner:",
      Text: "",
    },
    PolicyOwnerRelationship: {
      Title: "Tell us about the policy owner:",
      Text: "",
      FunctionText: (name) => {
        return `What is ${name}'s relationship to you?`;
      },
    },
    PolicyOwnerAddress: {
      Title: "Tell us about the policy owner:",
      Text: "",
      FunctionText: (name) => {
        return `What is ${name}'s address?`;
      },
    },
    PolicyOwnerSocial: {
      Title: "Tell us about the policy owner:",
      Text: "Please enter the policy owner's Social Security Number:",
    },
    PolicyExistingInsurance: {
      Title:
        "And then, do you have existing life insurance or an annuity contract?",
      Text: "",
    },
    PolicyReplacement: {
      Title:
        "Will you replace an existing life insurance policy or an annuity?",
      Text: "",
    },
    PolicyExistingInfo: {
      Title:
        "Great, let's get that policy info so we can get that transition handled for you:",
      Text: "",
    },
    PolicyDesignee: {
      Title:
        "Would you like to designate an designee, in case you are unable to pay for your policy?",
      Text: "",
    },
    PolicyDesigneeForm: {
      Title: "Please Enter all of your designee Information:",
      Text: "",
    },
  },
  PaymentQuestions: {
    PaymentLanding: {
      Title: "Perfect! Now let's add your payment info:",
      SubText: `Nothing will be charged today and you have full control over this payment. Our site is protected by the latest online security so rest assured your information is guaranteed safe. `,
    },
    PaymentCheckingOrSavings: {
      Title: "Perfect! And is this a checking or savings account?",
      Text: "",
    },
    PaymentDate: {
      Title: "Now, select a payment date.",
      Text: "Nothing will be charged today. Select the best date of the month for us to collect payment and start your policy.  ",
    },
    PaymentSocialSecurityDate: {
      Title: "Great! When do you receive your deposit?",
      Text: "",
    },
    PaymentSelectDate: {
      Title: "Great! Pick the date that's best for you:",
      Text: "",
    },
  },
  ReviewQuestions: {
    ReviewLanding: {
      Title:
        "This is it! You've come this far and all that's left is to review and submit your application.",
      Text: "",
    },
    ReviewApp: {
      Title: `That's all the info we need.  All that's left is to review and submit your application`,
    },
    ReviewUpdateMenu: {
      Title: "No problem! What do you need to update:",
      Text: "",
    },
    ReviewUpdateMenuOther: {
      Title: `Were there any other changes you needed to make?`,
      Text: "",
    },
  },
  SubmitQuestions: {
    Submit: {
      Title: "Hooray! We've submitted your application!",
      FunctionText: (email: string) => {
        return `Details about your application will be sent to ${email} within the next 24 hours. Please Download your application below`;
      },
    },
  },
};
