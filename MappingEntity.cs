using AutoMapper;
using ForSureLife.Models.DTO;
using ForSureLife.repo;
using ForSureLife.repo.Models.Quote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForSureLife
{
    public class MappingEntity:Profile
    {
        public MappingEntity()
        {
            CreateMap<LeadDTO, Lead>().ReverseMap();
            CreateMap<ApplicationDto, Application>().ReverseMap();
            CreateMap<ApplicationInfoDto, ApplicationInfo>().ReverseMap();
            CreateMap<PaymentInfoDto, PaymentInfo>().ReverseMap();
            CreateMap<HealthQuestion, LeadHealthQuestionDto>().ReverseMap();
            CreateMap<HealthQuestion, ApplicationHealthQuestionDto>().ReverseMap();
            CreateMap<FamilyOrBeneficiary, BeneficiaryDto>().ReverseMap();
            CreateMap<FamilyMember, FamilyMemberDto>().ReverseMap();
            CreateMap<QuoteDto, Lead>().ReverseMap();
            CreateMap<BeneficiaryDto, SeparatePolicyOwner>();
            CreateMap<DesigneeDto, Designee>().ReverseMap();

            CreateMap<FamilyOrBeneficiary, BeneficiaryDto>()
              .ForMember(dest => dest.BeneficiaryId, opts => opts.MapFrom(src => src.FamilyOrBeneficiaryId))
              .ForMember(dest => dest.PrimaryRelationship, opts => opts.MapFrom(s => s.PrimaryRelationship))
              .ForMember(dest => dest.Relationship, opts => opts.MapFrom(src => src.Relationships))
              .ForMember(dest => dest.Percentage, opts => opts.MapFrom(src => src.Percentage))
               .ForMember(dest => dest.PersonalInfo, opts => opts.MapFrom(src => new FamilyMemberDto
               {
                   FamilyMemberId = src.PersonalInfo.FamilyMemberId,
                   FirstName = src.PersonalInfo.FirstName,
                   MiddleName = src.PersonalInfo.MiddleName,
                   LastName = src.PersonalInfo.LastName,
                   Address1 = src.PersonalInfo.Address1,
                   Address2 = src.PersonalInfo.Address2,
                   City = src.PersonalInfo.City,
                   DateOfBirth = src.PersonalInfo.DateOfBirth,
                   State = src.PersonalInfo.State,
                   StateOfBirth = src.PersonalInfo.StateOfBirth,
                   SSN = src.PersonalInfo.SSN,
                   HeightFt = src.PersonalInfo.HeightFt,
                   HeightIn = src.PersonalInfo.HeightIn,
                   Weight = src.PersonalInfo.Weight
               })).ReverseMap();
            //  {
            // .ForMember(dest => dest.PersonalInfo.FamilyMemberId, opts => opts.MapFrom(src => src.PersonalInfo.FamilyMemberId))
            //.ForMember(dest => dest.PersonalInfo.FirstName, opts => opts.MapFrom(src => src.PersonalInfo.FirstName))
            //.ForMember(dest => dest.PersonalInfo.MiddleName, opts => opts.MapFrom(src => src.PersonalInfo.MiddleName))
            //.ForMember(dest => dest.PersonalInfo.LastName, opts => opts.MapFrom(src => src.PersonalInfo.LastName))
            //.ForMember(dest => dest.PersonalInfo.Address1, opts => opts.MapFrom(src => src.PersonalInfo.Address1))
            //.ForMember(dest => dest.PersonalInfo.Address2, opts => opts.MapFrom(src => src.PersonalInfo.Address2))
            //.ForMember(dest => dest.PersonalInfo.City, opts => opts.MapFrom    (src => src.PersonalInfo.City))
            //.ForMember(dest => dest.PersonalInfo.DateOfBirth, opts => opts.MapFrom(src => src.PersonalInfo.DateOfBirth))
            //.ForMember(dest => dest.PersonalInfo.State, opts => opts.MapFrom(src => src.PersonalInfo.State))
            //.ForMember(dest => dest.PersonalInfo.StateOfBirth, opts => opts.MapFrom(src => src.PersonalInfo.StateOfBirth))
            //.ForMember(dest => dest.PersonalInfo.SSN,          opts => opts.MapFrom(src => src.PersonalInfo.SSN))
            //.ForMember(dest => dest.PersonalInfo.HeightFt,   opts => opts.MapFrom(src => src.PersonalInfo.HeightFt))
            //.ForMember(dest => dest.PersonalInfo.HeightIn,   opts => opts.MapFrom(src => src.PersonalInfo.HeightIn))
            //.ForMember(dest => dest.PersonalInfo.Weight,     opts => opts.MapFrom(src => src.PersonalInfo.Weight));


            CreateMap<BeneficiaryDto, SeparatePolicyOwner>()
                 .ForMember(dest => dest.SeparatePolicyOwnerId, opts => opts.MapFrom(src => src.BeneficiaryId))
                 .ForMember(dest => dest.Relationship, opts => opts.MapFrom(src => src.Relationship))
                 .ForMember(dest => dest.BeneficiaryId, opts => opts.MapFrom(src => src.PersonalInfo.FamilyMemberId))
                 .ForMember(dest => dest.FirstName, opts => opts.MapFrom(src => src.PersonalInfo.FirstName))
                 .ForMember(dest => dest.MiddleName, opts => opts.MapFrom(src => src.PersonalInfo.MiddleName))
                 .ForMember(dest => dest.LastName, opts => opts.MapFrom(src => src.PersonalInfo.LastName))
                 .ForMember(dest => dest.Address1, opts => opts.MapFrom(src => src.PersonalInfo.Address1))
                 .ForMember(dest => dest.Address2, opts => opts.MapFrom(src => src.PersonalInfo.Address2))
                 .ForMember(dest => dest.City, opts => opts.MapFrom(src => src.PersonalInfo.City))
                 .ForMember(dest => dest.State, opts => opts.MapFrom(src => src.PersonalInfo.State))
                 .ForMember(dest => dest.SSN, opts => opts.MapFrom(src => src.PersonalInfo.SSN));

            CreateMap<SeparatePolicyOwner, FamilyOrBeneficiary>()
               .ForMember(dest => dest.FamilyOrBeneficiaryId, opts => opts.MapFrom(src => src.SeparatePolicyOwnerId))
               .ForMember(dest => dest.Relationships, opts=> opts.MapFrom(src => src.Relationship))
               .ForMember(dest => dest.PrimaryRelationship, opts => opts.MapFrom(s => Convert.ToInt32(8)))
               .ForMember(dest => dest.PersonalInfo, opts => opts.MapFrom(src => new FamilyMember
               {
                       FamilyMemberId= src.BeneficiaryId,
                       FirstName = src.FirstName,
                       MiddleName = src.MiddleName,
                       LastName = src.LastName,
                       Address1 = src.Address1,
                       Address2 = src.Address2,
                       City = src.City,
                       State = src.State,
                       SSN = src.SSN 
                 })).ReverseMap();


            CreateMap<FamilyOrBeneficiary, SeparatePolicyOwner>()
                 .ForMember(dest => dest.SeparatePolicyOwnerId, opts => opts.MapFrom(src => src.FamilyOrBeneficiaryId))
                 .ForMember(dest => dest.Relationship, opts => opts.MapFrom(src => src.Relationships))
                 .ForMember(dest => dest.BeneficiaryId, opts => opts.MapFrom(src => src.PersonalInfo.FamilyMemberId))
                 .ForMember(dest => dest.FirstName, opts => opts.MapFrom(src => src.PersonalInfo.FirstName))
                 .ForMember(dest => dest.MiddleName, opts => opts.MapFrom(src => src.PersonalInfo.MiddleName))
                 .ForMember(dest => dest.LastName, opts => opts.MapFrom(src => src.PersonalInfo.LastName))
                 .ForMember(dest => dest.Address1, opts => opts.MapFrom(src => src.PersonalInfo.Address1))
                 .ForMember(dest => dest.Address2, opts => opts.MapFrom(src => src.PersonalInfo.Address2))
                 .ForMember(dest => dest.City, opts => opts.MapFrom(src => src.PersonalInfo.City))
                 .ForMember(dest => dest.State, opts => opts.MapFrom(src => src.PersonalInfo.State))
                 .ForMember(dest => dest.SSN, opts => opts.MapFrom(src => src.PersonalInfo.SSN));



               //.ForMember(dest => dest.PersonalInfo, opts => opts.MapFrom(src => new FamilyMember
               //{
               //    FamilyMemberId = src.BeneficiaryId,
               //    FirstName = src.FirstName,
               //    MiddleName = src.MiddleName,
               //    LastName = src.LastName,
               //    Address1 = src.Address1,
               //    Address2 = src.Address2,
               //    City = src.City,
               //    State = src.State,
               //    SSN = src.SSN
               //})).ReverseMap();
        }
    }
}
