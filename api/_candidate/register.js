import { registerCandidate } from "../_candidate-service.js";
import { readJsonBody, sendJson, handleApiError, methodNotAllowed } from "../_http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
  try {
    const body = await readJsonBody(req);
    const result = await registerCandidate(body);
    sendJson(res, 201, result);
  } catch (err) {
    handleApiError(res, err, "Registration failed.");
  }
}
