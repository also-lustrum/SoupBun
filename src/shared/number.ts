/**
 * 小数点后面保留第 n 位
 *
 * @param x 做近似处理的数
 * @param n 小数点后第 n 位
 * @returns 近似处理后的数 
 */
export function roundFractional(x: number, n: number): number {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}