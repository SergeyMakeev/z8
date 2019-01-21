# How the computer works

Computers are made up of many different parts, such as a CPU, GPU, RAM, and peripheral devices like keyboard, gamepad, monitor and printer.

Let's take a closer look at the main parts of the computer:

## Central Processing Unit (CPU)
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



But enough theory, let's do something practical.
[Press here to goto to the first practical work suite.](https://github.com/SergeyMakeev/z8/blob/master/docs/PRACTICE_01.md)

Five registers are definitely not enough to create something serious that why each computer equipped with RAM module (see bellow).


## Random-access memory (RAM)

RAM is a form of computer data storage which can store bits organized into bytes. Each byte stored in RAM associated with a memory address which CPU can use to put bytes into RAM or get bytes from RAM. CPU has special instructions to read bytes from RAM into a CPU registers or to write bytes from CPU registers into a RAM.

Z8 system is equipped by 256 bytes of memory. Modern computers usually have several billion bytes of memory (GigaBytes or GB)


Let's do something practical with memory. 
[Press here to goto to the second practical work suite.](https://github.com/SergeyMakeev/z8/blob/master/docs/PRACTICE_02.md)


## Input and output ports (I/O ports)

Input and output ports (I/O ports)

I/O ports are a method of performing communications between CPU and other peripheral devices such as Keyboard, Gamepad, etc. I/O ports are another type of data storage. Unlike RAM and CPU registers I/O port values can be changed by peripheral devices even without CPU. Each peripheral device associated with one or more I/O ports.

Peripheral devices usually run slower than the CPU, so a certain number of processor cycles must pass before the peripheral device sees the port changes.

There is a special instruction `hlt` which allows CPU to wait until all peripheral devices are able to see the I/O port changes

Z8 CPU has 32 I/O ports used by different devices.

Let's do something practical with I/O ports. 
[Press here to goto to the third practical work suite.](https://github.com/SergeyMakeev/z8/blob/master/docs/PRACTICE_03.md)

to be continued ...



# System specs
[Z8 System Specs](https://github.com/SergeyMakeev/z8/blob/master/docs/SPECS.md)
