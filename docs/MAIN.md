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


## Graphics Processing Unit (GPU) 

A Graphics Processor Unit is a computer inside a computer. The specialized unit that is designed to work with 2D or 3D graphics and display the result on the monitor. May have its own dedicated memory (Video RAM or VRAM) or may use same memory as the CPU (shared memory).

Z8 GPU uses memory shared with the main CPU. Our GPU can display memory in the form of characters on the screen, where each character represented by memory byte. The number of characters that the GPU is capable of displaying on the screen 16 in width and 12 in height. The bytes from memory address 0..192 will be displayed on the screen as a characters in order from left to right and from top to bottom.

The computer monitor can't immediately display changes which you made in memory.  Usually, the monitor can update image only a few dozen times per second. This is called monitor refresh rate. Z8 monitor refresh rate is 25 frames per second. Modern monitors refresh rate is 60-144 times per second or even 240 times per second!


We already know that there is a special instruction `hlt` which allows CPU to wait until all peripheral devices (including the monitor) update their status.

So if we want to see our changes which we made in memory, we have to execute `hlt` instruction.

Let's do something practical with GPU.
[Press here to goto to the fourth practical work suite.](https://github.com/SergeyMakeev/z8/blob/master/docs/PRACTICE_04.md)

## More advanced CPU instructions

Most of the programs do not simply consist of a series of instructions that are consecutively executed, but there are many places where you need to decide which way to take. For this purpose, there are CPU instructions for checking the value (comparison) and instructions for jumping to another part of the program depending on the result of the comparison (conditional jump). 

```
// Initial value
mov r0, 0

// This is the label which is not an actual instruction.

// The label purpose is to determine the jump target location in our program.
my_label:

  // Letter 96 look like Cherry!
  st r0, 96
  
  add r0, 1
  
  // Compare value in register r0 and number 31 and put comparison
  // result into a special CPU 'state' register.
  cmp r0, 31
  
// Jump to label if comparison result is less or equal
jle my_label

hlt
```

Let's play with this a little bit more.
[Press here to goto to the fifth practical work suite.](https://github.com/SergeyMakeev/z8/blob/master/docs/PRACTICE_05.md)

to be continued ...

## Keyboard

Ports / rows. Movable sprite.

## Gamepad

Gamepad ports. Movable sprite for gamepad.

## Advanced GPU usage

Colors. Sprites.

## Z8 games

Movable sprite with collisions
...

## Z8 Sandbox

[Sandbox](https://sergeymakeev.github.io/z8/index.html?ls=sandbox)

# System specs
[Z8 System Specs](https://github.com/SergeyMakeev/z8/blob/master/docs/SPECS.md)
