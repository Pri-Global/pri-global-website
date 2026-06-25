import {
  createEmployeeSessionToken,
  isEmailDomainAllowed,
} from "../../_employee-auth.js";
import { findRipplingEmployeeByEmail, isRipplingConnected } from "../../_rippling-api.js";
import { readJsonBody, sendJson, handleApiError, methodNotAllowed } from "../../_http.js";
import { getServerEnv } from "../../_runtime-env.js";

/** POST /api/employee/auth/rippling — sign in with Rippling work email (after admin connected Rippling). */
export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const env = getServerEnv();
  if (!isRipplingConnected(env)) {
    sendJson(res, 503, {
      error: "Rippling is not connected yet. An admin must connect Rippling first.",
      connectUrl: "/api/employee/rippling/connect",
    });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    if (!email) {
      sendJson(res, 400, { error: "Work email is required." });
      return;
    }

    if (!isEmailDomainAllowed(email, env)) {
      sendJson(res, 403, { error: "This email domain is not allowed for the employee portal." });
      return;
    }

    const employee = await findRipplingEmployeeByEmail(email, env);
    if (!employee) {
      sendJson(res, 401, {
        error: "This work email was not found in Rippling. Use the email listed in your Rippling profile.",
      });
      return;
    }

    const sessionToken = createEmployeeSessionToken(
      {
        email: employee.email,
        name: employee.name,
        ripplingEmployeeId: employee.id,
        jobTitle: employee.jobTitle,
        authProvider: "rippling",
      },
      env
    );

    sendJson(res, 200, {
      sessionToken,
      email: employee.email,
      name: employee.name,
      jobTitle: employee.jobTitle || "",
      department: employee.department || "",
      authProvider: "rippling",
    });
  } catch (err) {
    handleApiError(res, err, "Unable to sign in with Rippling.");
  }
}
