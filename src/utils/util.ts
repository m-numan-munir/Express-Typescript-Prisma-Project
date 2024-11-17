import { throwValidationException } from "../exceptions/http-exceptions";
import { SignupSchema } from "../zod-models/user.z-model";

export const userSchemaValidation = async (requestBody: any) => {
  try {
    SignupSchema.parse(requestBody);
  } catch (error: any) {
    for (let issue of error?.issues) {
      if (issue.path[0] === "email") {
        if (issue.message === "Invalid email") {
          throwValidationException(issue.message.toLowerCase());
        }
        throwValidationException(
          issue.path + " " + issue.message.toLowerCase()
        );
      }
      if (issue.path[0] === "password") {
        throwValidationException(
          issue.path + " " + issue.message.toLowerCase()
        );
      }
      if (issue.path[0] === "name") {
        throwValidationException(
          issue.path + " " + issue.message.toLowerCase()
        );
      } else {
        throwValidationException(issue.message);
      }
    }
  }
};
