A Prettier[1] plugin attempt for CSS property ordering via behavior grouping. Credit to Jacob and Lochie[2] for the idea.

1: https://prettier.io/
2: https://nitter.poast.org/jcb/status/1798094424775242203#m

`npm run format`

----------------------------
Before:
----------------------------

```css
button {
  display: inline-block;
  padding: 12px 16px;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 2px;
  font-size: 12px;
  text-align: center;
}
```

----------------------------
After:
----------------------------

```css
button {
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;

  padding: 12px 16px;
  border-radius: 2px;

  font-size: 12px;
  font-weight: bold;
  text-align: center;
}
```