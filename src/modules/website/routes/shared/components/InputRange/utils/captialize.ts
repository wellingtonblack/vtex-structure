/**
 * Captialize a string
 * @ignore
 * @param {string} string
 * @return {string}
 */
export default function captialize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}