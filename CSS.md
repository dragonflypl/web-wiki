## SCSS

- What is partial ? : This is file that starts with `_` and will be not compiled on its own. Instead it will be available for importins in other `scss` files.
- Order matters in `SCSS` : if you use variable that was not yet declared, it will throw an error.
- nesting is possible and `&` refers to parent selector in nesting hierarchy
- variables start with `$` e.g. `$primary-color: blue`, 
  - can be block scoped
  - can be overriden (order matters)
  - can be interpolated e.g. `#{$primary-color}`
  - scss has functions e.g. for color manipulation (`lighten`, `darken`, `scale_color`, `complement`, `transparentize`, `mix`). Just call them e.g.
  
 ```scss
p {
  font-size: 1.5rem;
  padding-bottom: 1rem;
  color: mix($base-color, black, 5%);
}
```

- `@function` directive allows for creating custom functions
- `@for` enables making loops. This is powerful with interpolation and mixins e.g.

```scss
@mixin light-color-class($color, $color-name, $i) {
  $color-value: if($i == 1, $color, lighten($color, 3% * $i));

  .#{$color-name}#{$i} {
    color: $color-value;
  }
}

@for $i from 1 through 10 {
  @include light-color-class(#BA0000, passion, $i);  
}
```

- `@each` directive enables iteration over lists and maps (yes, scss supports maps and lists):

```scss
$superheroes: wonder-woman, spiderman, batman, superman;

$hero-media:  (1 375px 768px crimson),
              (2 768px 1000px darkred),
              (3 1200px 1400px grey),
              (4 768px 1200px blue);

@each $i, $bp-start, $bp-end, $color in $hero-media {
  @media only screen and (min-width: $bp-start) and (max-width: $bp-end) {
    .#{nth($superheroes, $i)} { background-color: $color; }
  }
}
```

- mixins are powerful: they have default arguments, named arguments, `@content;`, variable number of arguments with `...`. To create mixin, use `@mixin` , and to use it, use `@include` e.g.

```scss
@mixin media($min-width) {
  @media screen and (min-width: $min-width) { @content; }
}

@mixin make-transitions($transitions...) { 
  transition: $transitions; 
}

.some-selector {
  @include media(800px) { content: url("../images/bamf.jpg"); }
  @include make-transitions(margin 1s, border-radius 1s, border 1s, transform 1s);
}
```

- `@extend <selector|placeholder>` allows something like inheritance in OOP. One selector can extend another.
- placeholder selector starts with `%` e.g. `%some-base` and it won't get compiled into the output. It can be referenced in other places e.g. via `@extend` e.g. 


```scss
%some-base { color: red }

.one {  
  @extend %some-base;
}

.two {  
  @extend %some-base;
}
```

Placeholders can be interpolated e.g. `@extend %#{to-be-interpolated}`

## SMACSS

### Categorization

- Base: regular tag selectors, no classes etc.
- Layout: sidebar, header, footer, main content + grid system
- Module: contain content, are majority of the site, each module is interface to learn (e.g. button, navbar list)
  - Module variations (sub-modules): displayed in slightly different ways e.g. buttons in navbar / in table / in sidebar
  - Module child elements (Sub-components) e.g. modal header / footer / content. And this componenst can concain other modules (check example).
- State: hovered / visited / default / active / disabled
- Theme

Every style we write should go to one of the categories.

### Naming conventions

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
 

#### Modules separation example

- given we have a `megadropdown` module

```html
<div class="megadropdown">...</div>
```

- given we have a `nav` module

```html
<ul class="nav">
... 
    <div class="nav_dropdown"> <!-- This is how we define subcomponent -->
      <div class="megadropdown">...</div> <!-- this is how we embed module. We have nice separation! --> 
    </div>
...
</ul>
```

### Decoupling CSS from HTML
 
#### What is base? 
 
 Ask yourself a question whenever you write a general rule with tag name only. Think about it wisely, because some day web site might change and something that was true for all elements (e.g. buttons) might change. So do not add fancy styles with `button` selector, instead create a module `.my-buton`.
 
#### Depth of aplicability

Don't nest too deep in selectors (max 2-3 long selectors). Also use child selectors e.g. `#someId a` might hide the relationship between element with id an anchor (they might be many many other elements/modules in between)

If nesting is deeper, maybe modules are to complex.

So:

- use fewer selectors (possibly one)
- use child selectors to limit depth

### State-based design

How state can be expressed / queries:

- classes `.is-active` etc.
- pseudo:classes
- attribute selectors
- media queries - keep them with modules / components , not in completely separate file


### Preprocessors is SMACSS

... Preprocessors make it easy to do heavy nesting - don't use this power!

### Summary

Best practices:

- use different files for different modukes
- avoid show/hide from jquery (basially everything that toggles inline styles). Use state classes ('is-active` etc.)
- give css code reviews

## Tools

Analyze performance / good practices:

- https://github.com/macbre/analyze-css
- csscss
- parker

## Resources

- [Learn the Best and Most Useful SCSS](https://egghead.io/courses/learn-the-best-and-most-useful-scss)
