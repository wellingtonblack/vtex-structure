/**
 * Check if a value is an object
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
export default function isObject(value: any) {
    return value !== null && typeof value === "object";
}