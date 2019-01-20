# Z8 : fantasy 8-bit system

## What is Z8
Z8 is a fantasy 8-bit system similar to the following fantasy computers:

**Pico-8**
https://www.lexaloffle.com/pico-8.php

**nano JAMMER**
https://morgan3d.github.io/nano/doc/specification.md.html

**SHENZHEN I/O**
https://store.steampowered.com/app/504210/SHENZHEN_IO/

The main difference from systems above is that Z8 was designed to teach my kids how to program and not as a puzzle/game.

Z8 was made using the following principles:
- As few abstractions as possible (kids should know how the real hardware works)
- To be as simple as possible (everything should fit into one screen. Including IDE, Debugger, Screen, Memory dump, etc.) 
- To be as much close to real hardware as possible. Most of the principles and knowledge you will get while working with Z8 must be applied in real life. Of course, I cut some corners to simplify the learning process, but the main principles the same as for real hardware.


## How the computer works

Computers are made up of many different parts, such as a CPU, GPU, RAM, and peripheral devices like keyboard, gamepad, monitor and printer.

Let's take a closer look at the main parts of the computer:

### Central Processing Unit (CPU)
The CPU is the primary component of a computer. CPU can execute a program which is written by a software engineer. A computer program is a series of commands to CPU where each command called instruction. CPU executes a program in order one instruction after another. Each CPU step called cycle. The number of cycles per second which CPU can executes determine how fast our CPU is. Z8 CPU speed is 51,200 cycles per second. Modern CPUs much faster and usually executes several billion cycles per second (Gigahertz or GHz).

*Questions:*
* What is CPU?
* What is a program?
* What is instruction?
* What is CPU cycle?


CPU understands only binary number system which makes use of only two numbers ( 0 and 1 ). Each of these digits is called bit (from binary digit). However, the computer cannot access these bits directly, only in groups of eight. These groups are called bytes.

Numbers in the binary number system look like this:

Binary number | Decimal number
--- | ---
00000000b | 0
00000001b | 1
00000010b | 2
00000011b | 3
00000100b | 4
00000101b | 5
00000110b | 6
00000111b | 7
00011000b | 24
11111111b | 255

As we can be seen from the table above we can represent any decimal number from 0 to 255 using a single byte (8 bits)

*Questions:*
* What are bit and byte?
* How many bits in a single byte?
* Which decimal numbers can be represented by a single byte?


CPU instructions can do different things with bytes such as addition, multiplication, subtraction, division, etc. The bytes with which instructions operate are stored in special storage inside the CPU, which is called registers. Each register has a unique name, and the number of available registers is usually a small number. Z8 CPU has a five general purpose registers called r0, r1, r2, r3, r4. Modern CPU usually have 16-32 general purpose registers where each register contains 32 bits, 64 bits or even 128 bits per one register.

Questions:
 * What are CPU register is?
 * How many registers in Z8 CPU?



Let's try to do something practical. Our first instruction will be instruction called `mov` which means move. `mov` instruction copies data between two registers or copies data from constant into a register.

Syntax:

```
mov dst, src
```

Where `dst` should be a general purpouse register and `src` can be a general purpouse register or constant.
For example: instruction `mov r0, 0` copies 0 into register r0


Another useful instruction called `add` which means addition. `add` instruction can sum two general purpose registers or register and constant and put results back into a register.

Syntax:

```
add op1, op2
```

Where `op1` should be a general purpouse register and `op2` can be a general purpouse register or constant.
For example: instruction `add r0, 1` add the value stored in the register `r0` and the constant `1` and put the result back into register `r0`



Practical work:
 * Put number 10 into the register r0 ([practice_001.z8](https://sergeymakeev.github.io/z8/index.html?ls=z8_001&code=practice/practice_001.z8))
 * Put number 5 into the register r1 (practice_002.z8)
 * Add register r0 and r1  (practice_003.z8)

Five registers are definitely not enough to create something serious that why each computer equipped with RAM module.


### Random-access memory (RAM)

RAM is a form of computer data storage which can store bits organized into bytes. Each byte stored in RAM associated with a memory address which CPU can use to put bytes into RAM or get bytes from RAM. CPU has special instructions to read bytes from RAM into a CPU registers or to write bytes from CPU registers into a RAM.

Z8 system is equipped by 256 bytes of memory. Modern computers usually have several billion bytes of memory (GigaBytes or GB)




to be continued ...
