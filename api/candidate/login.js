import { loginCandidate } from "../_candidate-service.js";
import { readJsonBody, sendJson, handleApiError, methodNotAllowed } from "../_http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
  try {
    const body = await readJsonBody(req);
    const result = await loginCandidate(body);
    sendJson(res, 200, result);
  } catch (err) {
    handleApiError(res, err, "Sign in failed.");
  }
}
