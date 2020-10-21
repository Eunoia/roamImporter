// <meta name="citation_doi" content="10.1111/wvn.12123">
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@metascraper/helpers");
const REGEX_STRICT = /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
const toDoi = helpers_1.toRule(helpers_1.doi);
/**
 * Enforce stricter matching for a `rule`.
 *
 * @param {Function} rule
 * @return {Function} stricter
 */
const strict = rule => $ => {
    const value = rule($);
    return REGEX_STRICT.test(value) && value;
};
function getData() {
    return () => {
        console.log(toDoi($ => $('meta[name="citation_doi"]').attr('content')));
        return { doi: [toDoi($ => $('meta[name="citation_doi"]').attr('content'))] };
    };
}
;
exports.default = getData;
//# sourceMappingURL=metascraper-doi.js.map