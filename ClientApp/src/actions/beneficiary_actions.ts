import { createAction } from "redux-actions"
import { BeneficiaryDto } from "../clients/api.generated.clients"


export const UpdateBeneficiaries = createAction<BeneficiaryDto[]>("UPDATE_BENEFICIARIES");
export const UpdateContingentBeneficiaries = createAction<BeneficiaryDto[]>("UPDATE_CONTINGENT_BENEFICIARIES");