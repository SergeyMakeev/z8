## Practical suite 03

Z8 CPU has several instructions to work with the I/O ports. `out` instruction which is means send a value to port and `in` instruction which is means receive value from a port.

Syntax:

```
out op1, op2
```

`op1` can be a constant value or CPU register which will be used to determine port number to write. `op2` can be a constant or register; this value will be written into port.



Syntax:

```
in op1, op2
```

`op1` should be a general purpose register which will contain value read from memory. `op2` can be a constant value or CPU register which will be used to determine port number to read from. 



`hlt` instruction means halt. The CPU will stop executing commands until peripheral devices read the new values from writable I/O ports and update readable I/O port values.

Syntax:

```
hlt
```


Practical work:

I/O port #11 controls which color be used as a border and background color on screen.

* Write the value 240 to the I/O port #11 and wait until it is applied. ([practice_006.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_006&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_006.z8))
* Flashing screen border. ([practice_007.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_007&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_007.z8))
