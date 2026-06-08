const AVG_HOURLY_RATE = 85;
const PRISM_ANNUAL_COST = 28000;

export function calcROI(employees, hoursPerWeek, systems, existingToolSpend) {
  const weeklyTimeCost = employees * hoursPerWeek * AVG_HOURLY_RATE;
  const annualTimeCost = weeklyTimeCost * 50;
  const toolConsolidationSavings = existingToolSpend * 0.4;
  const totalAnnualCost = annualTimeCost + existingToolSpend;
  const prismSavings = annualTimeCost * 0.75 + toolConsolidationSavings;
  const hoursSaved = employees * hoursPerWeek * 50 * 0.75;
  const roiMultiple = prismSavings / PRISM_ANNUAL_COST;

  return {
    employees,
    hoursPerWeek,
    systems,
    existingToolSpend,
    annualTimeCost,
    totalAnnualCost,
    prismSavings,
    hoursSaved,
    toolConsolidationSavings,
    roiMultiple,
    weeklyHoursSaved: (employees * hoursPerWeek * 0.75).toFixed(1),
  };
}

export function formatCurrency(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return Math.round(n).toLocaleString();
  return Math.round(n).toString();
}
