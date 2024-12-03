import { validationResult } from "express-validator";
import { Request } from "express";

export const validateReqData = async (req: Request) => {
  const validatorRes = await validationResult(req);
  if (validatorRes.isEmpty()) {
    return { message: "valid", validatorRes };
  } else {
    return { message: "not valid", validatorRes };
  }
};
