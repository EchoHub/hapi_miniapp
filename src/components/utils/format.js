/**
 * @desc 类名拼接
 */
export function classNames(cn1, cn2, cn3) {
    let className = ""
    className += objToString(cn1)
    className += objToString(cn2)
    className += objToString(cn3)
    return className.replace(/\s{1,}$/, "")
}
function objToString(obj) {
    let str = ""
    const toString = Object.prototype.toString;
    if(obj === undefined || obj === null) return ""
    else if (toString.call(obj) === "[object Object]") {
        for (const key in obj) {
            str += obj[key] ? (key + " ") : ""
        }
    } else {
        str = obj + " "
    }
    return str
}