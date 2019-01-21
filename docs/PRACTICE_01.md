## Practical suite 01



Our first instruction will be instruction called `mov` which means move. `mov` instruction copies data between two registers or copies data from constant into a register.

### Move (mov)

Syntax:

```
mov op1, op2
```

Where `op1` should be a general purpouse register and `op2` can be a general purpouse register or constant.
For example: instruction `mov r0, 0` copies constant 0 into register r0


Another useful instruction called `add` which means addition. `add` instruction can sum two general purpose registers or register and constant and put the result back into a register.

### Integer Addition (add)

Syntax:

```
add op1, op2
```

Where `op1` should be a general purpouse register and `op2` can be a general purpouse register or constant.
For example: instruction `add r0, 1` add the value stored in the register `r0` and the constant `1` and put the result back into register `r0`


### Practical work:
 * Put number 10 into the register r0 ([practice_001.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_001&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_001.z8))
 * Put number 5 into the register r1 ([practice_002.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_002&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_002.z8))
 * Add register r0 and r1 ([practice_003.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_003&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/practice_003.z8))
