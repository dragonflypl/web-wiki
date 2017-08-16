## Categorization

- Base: regular tag selectors, no classes etc.
- Layout: sidebar, header, footer, main content + grid system
- Module: contain content, are majority of the site, each module is interface to learn (e.g. button, navbar list)
  - Module variations (sub-modules): displayed in slightly different ways e.g. buttons in navbar / in table / in sidebar
  - Module child elements (Sub-components) e.g. modal header / footer / content
- State: hovered / visited / default / active / disabled
- Theme

Every style we write should go to one of the categories.

## Naming conventions

> Use class over id

- Base styles
  - tags / pseudo selectors
- Layout
  - add `layout-` prefix to class name e.g. `.layout-header`
- Module
  - no prefix (95% of code will be modules) e.g. `.tab` / `.btn`
- Module variations (sub-modules)
  - e.g. `.btn-large`
  both base module & subm-odule must be present on element e.g. `class="btn btn-small"`
  - why not `class="btn large"` ? Harder to grep + harder to grasp when looking at different loading classes in source, easier to grasp when looking at pull requests.
- Module child elements (sub-components)
  - e.g. `modal-header` / `modal-body` / `modal-footer` are `modal` module's sub-component
- State
  - use `-is-` in  class name e.g. `btn-is-active` , 'nav-item-is-active`
- Theme
  - classes with `theme-` prefix e.g. `.theme-header` and put themeable rules there
  
  
  Alternatives:
  
 - `module-name` + `module-name--submodule` + `module-name__sub-component`
 - `moduleName` + `moduleName-subModule` + `moduleName--subComponent`