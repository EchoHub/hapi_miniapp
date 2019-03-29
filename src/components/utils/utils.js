import Type from "./type"
import EventTarget from "./event"
import * as _My from "./_my"

function classNames(cn1, cn2) {
    if(!cn2 || !cn1) return (cn1 || cn2)
    return (cn1.concat(" " + cn2.replace(new RegExp(cn1, "g"), ""))).replace(/\s+/g, " ")
};
export default {
    Type,
    EventTarget: EventTarget,
    _My: _My,
    classNames: classNames
}