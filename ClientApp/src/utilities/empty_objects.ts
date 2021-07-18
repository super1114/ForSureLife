import { AAFinalExpense, Application, ApplicationDto, ApplicationHealthQuestionDto, ApplicationHealthQuestions, ApplicationHealthQuestionsDto, ApplicationInfoDto, BeneficiariesDto, BeneficiaryDto, DesigneeDto, FamilyMemberDto, Gender, InsuranceCompany, LeadDTO, LeadHealthQuestionDto, LeadHealthQuestions, MailPolicy, Occurence, PaymentInfoDto, PaymentType, QuoteDto, Relationship, SeniorChoicePremiumType, SeparatePolicyOwner, States } from "../clients/api.generated.clients";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";

export class EmptyObjects {

    public InitializeNewBeneficiary(): BeneficiaryDto {
        const beneficiaryId = uuidv4();
        const familyMemberId = uuidv4();

        let newBeneficiary: BeneficiaryDto = { ..._.cloneDeep(EmptyObjects.EmptyBeneficiaryDto) };
        newBeneficiary.beneficiaryId = beneficiaryId;
        newBeneficiary.personalInfo.familyMemberId = familyMemberId;
        return newBeneficiary;
    }

    static EmptyQuoteState: QuoteDto = {
        selectedBenefitAmount: 0,
        selectedMonthlyRate: 0,
        planInfo: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        state: "",
        zipCode: "",
        city: "",
        age: 0,
        premiumType: 0,
        rates: [],
        susaRates: [],
        foresterRates: [],
        eagleRates: []
    }

    static EmptyFamilyMemberDto: FamilyMemberDto = {
        familyMemberId: uuidv4(),
        firstName: "",
        middleName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        dateOfBirth: new Date().toJSON(),
        state: "",
        stateOfBirth: "",
        ssn: "",
        heightFt: 0,
        heightIn: 0,
        weight: 0
    }

    static EmptyBeneficiaryDto: BeneficiaryDto = {
        beneficiaryId: uuidv4(),
        primaryRelationship: 1,
        personalInfo: EmptyObjects.EmptyFamilyMemberDto,
        relationship: "",
        percentage: 100
    }


    static EmptySeparatePolicyOwner: SeparatePolicyOwner = {
        separatePolicyOwnerId: uuidv4(),
        policyOwnerRelationship: Relationship.SeparatePolicyOwnerOther,
        beneficiaryId: uuidv4(),
        firstName: "",
        middleName: "",
        lastName: "",
        relationship: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        ssn: ""
    }



    static EmptyKnockoutQuestions: LeadHealthQuestionDto[] = [{
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.TobaccoUse,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.ChronicIllness,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.HospiceCare,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.SelfReliant,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.OtherDisease,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.MultipleCancer,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.Oxygen,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.OrganDialysisDisease,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.LivePast12Months,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.Hospitilized,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }, {
        healthQuestionId: uuidv4(),
        leadHealthQuestion: LeadHealthQuestions.TobaccoUse,
        healthQuestionName: "",
        healthAnswer: false,
        occurence: Occurence.NullValue
    }];

    static EmptyLeadDto: LeadDTO = {
        leadId: uuidv4(),
        leadSource: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        state: "",
        zipCode: "",
        city: "",
        county: "",
        dob: new Date().toJSON(),
        currentCoverage: false,
        desiredCoverageAmount: 0,
        originalDesiredCoverageAmount: 0,
        desiredBeneficiary: 0,
        hobby: "",
        gender: Gender.Male,
        isEligible: false,
        healthQuestionsAnswered: false,
        clickedApplied: false,
        clickedEnrolled: false,
        contactAgent: false,
        knockedOut: false,
        beneficiarySet: false,
        leadCompleted: false,
        quoteReceived: false,
        paymentDateSet: false,
        paymentAccountSet: false,
        socialSet: false,
        reviewPageSeen: false,
        reviewPageSubmit: false,
        secondQuoteReceived: false,
        selectedBenefitAmount: 0,
        selectedMonthlyRate: 0,
        healthQuestions: EmptyObjects.EmptyKnockoutQuestions,
        premiumType: SeniorChoicePremiumType.Immediate,
        externalLeadId: ""
    }

    static EmptyDesigneeDto: DesigneeDto = {
        designeeId: uuidv4(),
        firstName: "",
        lastName: "",
        address1: "",
        city: "",
        state: "",
        zipCode: "",
        emailAddress: "",
        telephone: "",
        signed: false
    }

    static EmptyApplicationInfoDto: ApplicationInfoDto = {
        applicationInfoId: uuidv4(),
        dob: new Date().toJSON(),
        stateOfBirth: "",
        firstName: "",
        middleName: "",
        lastName: "",
        ssn: "",
        doctorName: "",
        doctorCity: "",
        doctorPhone: "",
        doctorState: States.AK,
        separateOwner: false,
        lifePolicy: false,
        lifePolicyInsuranceCompany: "",
        lifePolicyNumber: "",
        lifeCoverageAmount: 0,
        heightFt: null,
        validApplyStates: [],
        heightIn: null,
        weight: 0,
        separatePolicyOwner: EmptyObjects.EmptySeparatePolicyOwner,
        acceptAnyPlan: false
    }

    static EmptyPaymentInfoDto: PaymentInfoDto = {
        paymentId: uuidv4(),
        bankingInsitution: "",
        paymentType: PaymentType.BankDraft,
        creditCardRef: "",
        bankAddress: "",
        accountNumber: "",
        routingNumber: "",
        bankType: 0,
        paymentWithdrawlDate: 0,
        socialSecurityWithdrawDate: 0
    }


    static EmptyHealthQuestions: ApplicationHealthQuestionDto[] = [
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.HeartAttack,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.HepatitisC,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.RenalInsufficiencey,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.COPD,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.Circulation,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.OutstandingResults,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.DiabetesComplications,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.AbusedSubstances,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.Cardiomyopathy,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.LiverDisease,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.Parkinsons,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        },
        {
            healthQuestionId: uuidv4(),
            applicationQuestion: ApplicationHealthQuestions.Paralysis,
            healthQuestionName: "",
            healthAnswer: false,
            occurence: Occurence.NullValue
        }
    ];

    static EmptyApplication: ApplicationDto = {
        applicationId: uuidv4(),
        leadInfo: EmptyObjects.EmptyLeadDto,
        healthQuestions: EmptyObjects.EmptyHealthQuestions,
        applicationInfo: EmptyObjects.EmptyApplicationInfoDto,
        designee: EmptyObjects.EmptyDesigneeDto,
        beneficiaries: [],
        contingentBeneficiaries: [],
        paymentInfo: EmptyObjects.EmptyPaymentInfoDto,
        signed: false,
        signedDate: new Date().toJSON(),
        omniSendContactId: ""
    }

    static EmptyAAFinalExpense: AAFinalExpense = {
        aaFinalExpenseId: uuidv4(),
        applicationState: States.AK,
        selectedBenefitAmount: 0,
        selectedMonthlyRate: 0,
        premiumType: SeniorChoicePremiumType.Graded,
        mailPolicyTo: MailPolicy.Insured,
        effectiveDate: "",
        insuranceCompanyName: InsuranceCompany.AmericanAmicable,
        licenseNumber: "",
        signed: false,
        signedDate: "",
        signatureLocationCity: "",
        signatureLocationState: "",
        clientIPAddress: "",
        fileNumber: 0,
        testChange: 0,
        submitted: false,
        applicationAnswers: [],
        application: undefined
    }
}

