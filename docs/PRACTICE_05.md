## Practical suite 05

Here are new instructions you can use to create advanced logic and execution flow control.

### Compare (cmp)

Syntax:

```
cmp op1, op2
```

`op1` can be a constant value or CPU register. `op2` can be a constant or register.
`cmp` will compare op1 and op2 and put comparison result into special `state` register.

---

### Unconditional Jump (jmp)

Syntax:

```
jmp label
```

This instruction always transfers program control to a point determined by the label.

---

### Jump if Greater (jg)

Syntax:

```
jg label
```

This instruction transfers program control to a point determined by the label if the comparison result is greater.

---

### Jump if Greater or Equal (jge)

Syntax:

```
jge label
```

This instruction transfers program control to a point determined by the label if the comparison result is greater or equal.


---

### Jump if Less (jl)

Syntax:

```
jl label
```

This instruction transfers program control to a point determined by the label if the comparison result is less.

---

### Jump if Less or Equal (jle)

Syntax:

```
jle label
```

This instruction transfers program control to a point determined by the label if the comparison result is less or equal.

---

### Jump if Equal (je)

Syntax:

```
je label
```

This instruction transfers program control to a point determined by the label if the comparison result is equal.

---

### Jump if Not Equal (jne)

Syntax:

```
jne label
```

This instruction transfers program control to a point determined by the label if the comparison result is not equal.

---


### Practical work:

* Cherries ([practice_010.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_010&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_010.z8))
* Bouncing ghost ([practice_011.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_011&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_011.z8))
