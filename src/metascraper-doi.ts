  // <meta name="citation_doi" content="10.1111/wvn.12123">
'use strict';

import { toRule, doi } from '@metascraper/helpers';
import metascraper, { Rule } from 'metascraper';

const REGEX_STRICT = /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i


const toDoi = toRule(doi);

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

function getData(): Rule {
  return () => {
    console.log(toDoi($ => $('meta[name="citation_doi"]').attr('content')));
    return { doi: [toDoi($ => $('meta[name="citation_doi"]').attr('content'))] }
  }
};

export default getData;
