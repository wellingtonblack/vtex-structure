/**
 * Clamp a value between a min and max value
 * @ignore
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export default function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}