// Validate the changed click callbacks in isolation; this is not a browser test.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '../elifhandeyilmaz-tam-site-paketi/assets');
const cases = [
  ['project-covers.js', 'trigger.addEventListener("click", (event) => {', 'openLightbox', 3],
  ['event-projects.js', "featuredTrigger.addEventListener('click', (event) => {", 'open', 'summit'],
  ['motion-projects.js', 'featuredTrigger.addEventListener("click", (event) => {', 'openModal', 'video'],
  ['web-projects.js', 'trigger.addEventListener("click",event=>{', 'openModal', 'web']
];
let checks = 0;
for (const [file, marker, openFunction, expected] of cases) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const start = source.indexOf(marker);
  assert.ok(start >= 0, file);
  const end = source.indexOf('});', start) + 3;
  const snippet = source.slice(start, end);
  for (const anchor of [true, false]) {
    for (const modifier of [null, 'ctrlKey', 'metaKey', 'shiftKey', 'altKey']) {
      let callback, prevented = 0;
      const opened = [];
      const trigger = {
        dataset: { featuredEventProject: 'summit', featuredMotionProject: 'video', webProject: 'web' },
        matches(selector) { assert.equal(selector, 'a[href]'); return anchor; },
        addEventListener(event, fn) { assert.equal(event, 'click'); callback = fn; }
      };
      const context = { trigger, featuredTrigger: trigger, projectIndex: 3 };
      context[openFunction] = value => opened.push(value);
      vm.runInNewContext(snippet, context);
      const event = { preventDefault() { prevented++; } };
      if (modifier) event[modifier] = true;
      callback(event);
      assert.deepEqual(opened, modifier ? [] : [expected], `${file}/${anchor}/${modifier}`);
      assert.equal(prevented, !modifier && anchor ? 1 : 0);
      checks++;
    }
  }
}
let directCallback;
vm.runInNewContext(fs.readFileSync(path.join(root, 'portfolio-links.js'), 'utf8'), {
  document: { addEventListener(type, callback, capture) { assert.equal(type, 'click'); assert.equal(capture, true); directCallback = callback; } }
});
for (const direct of [true, false]) {
  let stopped = 0;
  directCallback({ target: { closest(selector) { assert.equal(selector, 'a[data-portfolio-route]'); return direct ? {} : null; } }, stopPropagation() { stopped++; } });
  assert.equal(stopped, direct ? 1 : 0);
  checks++;
}
console.log(`PASS: ${checks} callback cases; normal clicks retain galleries, modified anchor clicks retain native navigation. Mock event tests only.`);
