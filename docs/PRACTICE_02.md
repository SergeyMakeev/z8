## Practical suite 02

Z8 CPU has several instructions to work with the memory. `ld` instruction which is means load from memory and `st` instruction which is means store to memory.

### Load from Memory (ld)

Syntax:

```
ld op1, op2
```

`op1` should be a general purpose register which will contain value read from memory. `op2` can be a constant value or CPU register which will be used to determine memory location to read from. 

---

### Store to Memory (st)

Syntax:

```
st op1, op2
```

`op1` can be a constant value or CPU register which will be used to determine memory location to write. `op2` can be a constant or register; this value will be written into memory.

---

### Practical work:

* Write the value 13 to the memory byte with the address 200 ([practice_004.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_004&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_004.z8))
* Load value from memory with address 200; Add 5 to this value and write the result back to the memory. ([practice_005.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_005&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_005.z8))
