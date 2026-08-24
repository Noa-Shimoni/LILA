export function isFormSubmitAccepted(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const data = payload as { success?: unknown; message?: unknown };
  if (data.success === true || data.success === "true") {
    return true;
  }

  const message = String(data.message ?? "").toLowerCase();
  return message.includes("activation") || message.includes("activate");
}
