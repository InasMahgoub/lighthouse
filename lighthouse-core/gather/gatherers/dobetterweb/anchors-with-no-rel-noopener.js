/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Gatherer = require('../gatherer');
const DOMHelpers = require('../../../lib/dom-helpers.js');

class AnchorsWithNoRelNoopener extends Gatherer {
  /**
   * @param {!Object} options
   * @return {!Promise<!Array<{href: string, rel: string, target: string}>>}
   */
  afterPass(options) {
    const expression = `(function() {
      ${DOMHelpers.getElementsInDocumentFnString}; // define function on page
      const selector = 'a[target="_blank"]:not([rel~="noopener"])';
      const elements = getElementsInDocument(selector);
      return elements.map(node => ({
        href: node.href,
        rel: node.getAttribute('rel'),
        target: node.getAttribute('target')
      }));
    })()`;

    return options.driver.evaluateAsync(expression);
  }
}

module.exports = AnchorsWithNoRelNoopener;
