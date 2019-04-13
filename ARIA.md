- `aria-label` - contains label for the element
- `aria-hidden` - if element should be ignored by device
- `visuallyhidden` - class that styles element so that it is hidden in visual browser but visible to aria device e.g. `class=visuallyhidden`
- `role` - role of the element, e.g. `div` can be confidered as `button` : `role=button`. Other roles can be `navigation`, `search` - these can group items by role and make them accessible by cycling through / route group items (e.g. only navigation links)
- `aria-labelledby` - points to an element that has a label for the element
- `tabindex` - specified is element can be focused and participates in `tab` navigation. Two values have special meaning: `0` means that element should be focusable (e.g. div which by default will not receive focus) and `-1` means that element is not focusable/reachable with keyboard navigation but can receive focus programmatically (e.g. clicking on other anhor via skip links technique)
- native `button` works with keyboard events (enter,space) like with clicking and fire `onclick` event. However e.g. `div` not - so you need to add onkeydown handler to the element and fire the same code as in `onclick`
- accessible form labeling: link labels with inputs . There're many techniques e.g. `<label for` or wrapping input inside label, or `aria-label` or `aria-labelledby`. Here're all <https://kentcdodds.com/blog/please-stop-building-inaccessible-forms-and-how-to-fix-them> . Also wrap groups of related inputs into fieldset with legend to make group name announced by screen reader.
- styling the focus: `outline` is css style that is used to indicate that element has focus. doing `[tabindex="-1"] { outline: 0 }` disables it.
- ARIA states - attributes like `aria-disabled` bear the state for the device that e.g. element is disabled. Native elements like button with attribute has the same meaning (it is native so you don't have to do anything else). With custom elements like div based button, you need to implement more stuff on your own like `aria-disabled`, toggling `tabindex`, style element based on `aria-disabled="true"` etc... So  the bottom line is: prefer native elements!
- Accessible name calculation - this is a process of figuring out the accessible name for accesible element. E.g. first it will take text content, but for e.g. close button with text 'X' it won't be handy, so we add `aria-label` or `aria-describedby` to give move meaning or additional element with `visuallyhidden` class and more text.

## Tools 

- View Document Outline from Developer Tools Extension
- aXe Developer Tools and CLI

## Articles / Resources

- [Start Building Accessible Web Applications Today](https://egghead.io/lessons/chrome-devtools-what-is-accessible-name-calculation)
- [Please stop building inaccessible forms (and how to fix them)](https://kentcdodds.com/blog/please-stop-building-inaccessible-forms-and-how-to-fix-them)
