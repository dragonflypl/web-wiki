## Flexbox spec

With the ability to reorder children, wrap elements and divide up space on a collection of dynamic children, Flexbox is an essential layout tool for responsive applications and websites.

Flexbox works in two directions : X or Y asix.

Flexbox has `container` and `children` . Some props are applied to container, other to children

### Container props

- `display: flex` or `display: flex-inline` creates flex container
- `flex-wrap: wrap`: creates grid like behaviour: if there's not enough space, it will wrap the content (e.g. list of items). Used together with `align-content` (`align-content` works only with multiline content, don't confuse with `justify-content` or `align-items`). Powerful, you don't need media queries e.g. to wrap content in lists when size of viewport changes.
- `flex-direction: <row>|<column>` specify layout direction (there are `reversed` options as well). Combined with media queries this can be powerful and change e.g. from row direction on wide screen to column direction on mobile e.g.

```css
@media (min-width: 820px)
.site-header__nav ul {
    flex-direction: row;
}
```
- `order: <number>` Using the order property we alter the order in which flexbox children appear on the page, without making changes to the dom. Children with greater value appear at the end.
- `justify-content` - this is property that affects layout in the current direction and how a space that is left in the axis is distributed
- `align-items` - this is property that affects layout in the perpendicular direction to flex direction. `align-self` is exactly the same, but applied on flex container's child and it modifies single child alignment.

```css
body {
  display: flex; // creates flex container
  flex-direction: column; // sets direction
  justify-content: center; // affects Y axis
}
// or 
body {
  display: flex;
  flex-direction: row;
  align-items: center; // also affects Y asix because now it is perpendicular to X asis set by row direction
}
```

### Flex children props

- `align-self` - described above
- `flex-basis: <px>` - **for sizing**. specifies ideal size of the child (height or width) in containers direction. For row it will be width, for column it will be height. If there's an extra space (or lack of space), specify `flex-grow` / `flex-shrink` to indicate how children should grow/shring. `flex-grow` / `flex-shrink` take values from range `0..1` and it means proportion of space.
  - `flex-shrink` default is `1` which means that all children should shrink the same way if there's not enough space
  - `flex-grow` default is `0` which means that all children do not grow automatically

E.g.

```css
/* Means that all children have 300px and if there's not enough space they will not shrink - (they will overflow showing scrollbar) */
h1 {
  flex-basis: 300px;
  flex-shrink: 0;
}

/* Means that if there's more space then children take, they will grow equally : 100px + equal part of extra space */
h1 {
  flex-basis: 100px;
  flex-grow: 1;
}
```

- `flex: 1` is shorthand for (results in all children being the same size - height or width depending on direction) :

```css
.child {
  flex: 1;
    /* flex-grow: 1;
       flex-shrink: 1;
       flex-basis: 0;
    */
}

/* Another useful shorthand */
.child {
  flex: 0 80px;
    /* flex-grow: 0;
       flex-shrink: 1;
       flex-basis: 80px;
    */
}    
```


## Links

- [Style an Application from Start to Finish](https://egghead.io/lessons/css-inform-the-user-of-interactions-with-css-transitions) making TODO React tutorial app look awesome with flexbox and others.
- [Flexbox Fundamentals on egghead.io](https://egghead.io/lessons/flexbox-using-flexbox-in-websites-and-applications)
- https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
- http://bl.ocks.org/jfsiii/5380802 - full screen layout
- https://philipwalton.github.io/solved-by-flexbox/ - some challanges fixed by flexbox (sticky footer & full page layout)
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://css-tricks.com/snippets/css/complete-guide-grid/
