export function parseMetric(metric) {
  const match = String(metric).match(/^(\d+(?:\.\d+)?)(%?)$/);
  if (match) {
    return {
      isNumeric: true,
      value: parseFloat(match[1]),
      suffix: match[2] || "",
      display: metric,
    };
  }
  return { isNumeric: false, display: metric };
}
