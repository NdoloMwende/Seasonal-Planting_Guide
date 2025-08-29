export function calculateHarvestDate(plantingDate, maturityDays) {
  const date = new Date(plantingDate);
  date.setDate(date.getDate() + maturityDays);
  return date.toISOString().split('T')[0];
}

export function isReadyToHarvest(expectedHarvestDate) {
  const today = new Date().toISOString().split('T')[0];
  return new Date(today) >= new Date(expectedHarvestDate);
}
