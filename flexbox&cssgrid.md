## Grid spec

### `fr` unit and sizing

This is unit that refers to available space (for rows: height, for columns: width). E.g.

```css
#container {
  grid-gap: 20px;
  height: 100vh;
  display: grid;
  grid-template-columns: 
    [col-1] 1fr 
    [col-2] 2fr 
    [col-3] 1fr;
  grid-template-rows: 
    [col-1] 1fr 
    [col-2] 10fr 
    [col-3] 1fr;    
}
```

There's a `minmax` function that takes min and max value e.g. `minmax(100px, 3fr)` that grid item take. This is awesome! Some special "units" are `min-content` / `max-content` that are useful if we have text that can overflow the area of the item. With `minmax(min-content, ...)` we specify that item will be never smaller then it's content minimal size. E.g.

```css
#container {
  grid-template-rows: 
    [col-1] minmax(min-content, 1fr) 
    [col-2] 5fr 
    [col-3] minmax(min-content, 1fr) 
}
```

or 

```css
#container {
  grid-template-rows: 
    [col-1] minmax(min-content, auto) 
    [col-2] auto
    [col-3] minmax(min-content, auto) 
}
```

### Container props

- `display:grid` - created block grid, other grids are `inline-grid` and `subgrid`
- `grid-auto-rows` / `grid-auto-columns` Defines the size of grid rows/cols that were created implicitly: it means that grid-auto-rows/columns targets the rows that were not defined with grid-template-rows/columns or grid-template-areas. (if there are more rows/cols then specified in `grid-template-rows` / `grid-template-columns`). E.g. `grid-auto-rows: 1fr` - each extra row will have `1fr`
- `grid-auto-flow` - by default, grid places items from let to right, top to bottom (`row` is default). This can be changed to `column`, not it will go top to bottom , left to right. By adding `dense`, grid will try to fill the holes in grid by rearranging items. E.g.

```
#container {
  grid-gap: 1px;
  height: 90vh;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 
     repeat(4, 100px);
  grid-template-rows: 
     repeat(4, 100px);
}

header {
  background-color: red;  
}

section {
  background-color: green;
  grid-column: span 2;
}

footer {
  background-color: blue;
}
```

- `grid-gap` - creates gutter in grid between elements. It is shorthand to `grid-row-gap` + `grid-column-gap`.
- `grid-template-areas` - The grid-template-areas CSS property specifies named grid areas. Contains items that should be visible in the grid. `grid-template-areas` combined with media queries are insane powerful when it comes to creating responsive layouts.

```css
grid-template-areas:
    "header"
    "section"
    "aside-1"
    "aside-2"
    "footer";
```

- `grid-template-columns` - defines columns of the grid. Specifies widths of columns. numbers and `auto` units are possible.
 
 `grid-template-columns: 100px auto 100px;`
 
 or 
 
 `grid-template-columns: 40px 1fr 2fr;`
 
 `grid-template-columns` /  `grid-template-rows ` columns/rows can be named (named grid lines)
 
 Now, these names can be used e.g. in `grid-row` / `grid-column` to specify where item starts / ends. E.g.
 
 ```css
 #container {
  grid-gap: 20px;
  height: 100vh;
  display: grid;
  grid-template-columns: 
    [col-1] 1fr 
    [col-2] 2fr 
    [col-3] 1fr;
}

 footer {
  grid-column: col-1 / span 3;
}
 ```
 
 There can be multiple names for the same line e.g. 
 
 ```css
  #container {
  grid-template-columns: 
    [col-1-start] 1fr 
    [col-1-end col-2-start] 2fr 
    [col-2-end col-3-start] 1fr;
    [col-3-end];
}
 ```
 
 - `grid-template-rows` are the same as `grid-template-columns`. 
 
 - `repeat` function can be used on `grid-template-rows/columns` to avoid repetition. Any expression `grid-template-rows/columns` can be wrapped in `repeat`
 
 ```css
 /* it defines 6 rows and 20 columns /*
 #container {
  grid-template-columns: 
    repeat(20, 
      minmax(min-content, 1fr) 
    );
  grid-template-rows: 
    repeat(2, 
      [col-1] minmax(min-content, auto) 
      [col-2] minmax(min-content, auto)
      [col-3] minmax(min-content, auto) 
    );
}
```

  - `auto-fill` and `auto-fit` can be used with `repeat` to specify an arbitrary number of rows/cols. That means that css grid will create automatically maximum number of cols/rows that can fill available space. Here, each column will have at least 100px and will grow automatically if there is more space (use `auto-fit` to streatch columns/rows if there are not enough items to cover cols/rows). For 500px available space, grid will create 5 columns:
  
```css
#container {
  grid-gap: 1px;
  height: 90vh;
  display: grid;
  grid-template-columns: 
    repeat(auto-fill, minmax(100px, auto));
}
```
### Children props

- `grid-area` - assigns a name to the element. Name that can be used in `grid-template-areas`
- `order`: specifies and order, by default it is `0` , greater value puts towards the end. Affects both cols/rows. Similar to `grid-column/row`
- `grid-column` / `grid-row` (shorthands for `grid-column-start` + `grid-column-end` / `grid-row-start` + `grid-row-end`) - enable rearranging grid items or make them span across many cells. E.g.

```css
grid-column: 1 / span 3;
grid-row-start: 1;
grid-row-end: 3;
```

If the value for `*-end` is `-1` then it means : till the end of column / row. E.g.

```css
grid-column: 1 / -1
```

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
