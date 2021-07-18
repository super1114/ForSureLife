import { createAction } from "redux-actions"
import { PaymentInfoDto } from "../clients/api.generated.clients"


export const UpdatePayment = createAction<PaymentInfoDto>("UPDATE_PAYMENT_INFO")