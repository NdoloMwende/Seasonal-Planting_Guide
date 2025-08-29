export function calculateHarvestDate(plantingDate, maturityDays) {
  const date = new Date(plantingDate);
  date.setDate(date.getDate() + maturityDays);
  return date.toISOString().split('T')[0];
}