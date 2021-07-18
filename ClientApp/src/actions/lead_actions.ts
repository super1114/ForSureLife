import { createAction } from "redux-actions"
import { LeadDTO } from "../clients/api.generated.clients"


export const UpdateLeadInfo = createAction<LeadDTO>("UPDATE_LEAD");