export function formatNumber(number: number): string {
    const absNumber = Math.abs(number);
  
    if (absNumber >= 1.0e12) {
      return (number / 1.0e12).toFixed(2) + 'T';
    }
    if (absNumber >= 1.0e9) {
      return (number / 1.0e9).toFixed(2) + 'B';
    }
    if (absNumber >= 1.0e6) {
      return (number / 1.0e6).toFixed(2) + 'M';
    }
    if (absNumber >= 1.0e3) {
      return (number / 1.0e3).toFixed(2) + 'K';
    }
  
    return number.toString();
  }
  