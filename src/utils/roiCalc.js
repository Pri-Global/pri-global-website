const AVG_HOURLY_RATE = 65; // blended fully-loaded hourly cost for reporting/admin work
const TIME_SAVINGS_RATE = 0.4; // realistic reduction in manual reporting time
const TOOL_CONSOLIDATION_RATE = 0.25; // realistic reduction in redundant BI/analytics spend

// PR1SM.AI implementation cost scales with company size, with a sensible floor/ceiling
function estimatePrismCost(employees) {
  const scaled = employees * 6000;
  return Math.min(Math.max(scaled, 50000), 400000);
}

export function calcROI(employees, hoursPerWeek, systems, existingToolSpend) {
  const weeklyTimeCost = employees * hoursPerWeek * AVG_HOURLY_RATE;
  const annualTimeCost = weeklyTimeCost * 50;
  const toolConsolidationSavings = existingToolSpend * TOOL_CONSOLIDATION_RATE;
  const timeSavings = annualTimeCost * TIME_SAVINGS_RATE;
  const prismSavings = timeSavings + toolConsolidationSavings;
  const hoursSaved = employees * hoursPerWeek * 50 * TIME_SAVINGS_RATE;
  const prismCost = estimatePrismCost(employees);
  const roiMultiple = prismSavings / prismCost;
  const netAnnualBenefit = prismSavings - prismCost;

  return {
    employees,
    hoursPerWeek,
    systems,
    existingToolSpend,
    annualTimeCost,
    prismCost,
    prismSavings,
    netAnnualBenefit,
    hoursSaved,
    toolConsolidationSavings,
    roiMultiple,
    weeklyHoursSaved: (employees * hoursPerWeek * TIME_SAVINGS_RATE).toFixed(1),
  };
}

export function formatCurrency(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return Math.round(n).toLocaleString();
  return Math.round(n).toString();
}
