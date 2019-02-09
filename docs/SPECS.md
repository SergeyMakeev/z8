## Z8 Hardware specifications

CPU: Z8 8-bit cpu
Frequency: 0.0512 MHz (51200 Hz)

Monitor:
Resolution: 256 x 192 pixels or 16 x 12 characters
Regresh rate: 25 Hz
Colors: 16

## Z8 instruction reference

| Mnemonic | Description | Cycles count
--- | --- | ---
mov | move | 1
ld | load from memory | 2
st | store to memory | 2
add | add |1
ads | add saturated | 1
sub | subtract | 1
sbs | subtract saturated | 1
mul | multiply saturated | 2
div | divide | 2
mod | modulo | 2
sl | shift left | 1
sr | shift right | 1
and | bitwise and | 1
or | bitwise or | 1
xor | bitwise xor | 1
cmp | unsigned comparison | 1
cps | signed comparison | 1
tst | test (bitwise comparison) | 1
jmp | jump | 1
jg | jump if greater | 1
jge | jump if greater or equal | 1
jl | jump if less | 1
jle | jump if less or equal | 1
je | jump if equal | 1
jne | jump if not equal | 1
nop | no operation | 1
out | io port out | 3
in | io port in | 3
push | push to stack | 2
pop | pop from stack | 2
call | function call | 3
ret | return from function | 3
hlt | wait for interrupt (vsync) | -

## Z8 IDE useful extensions

`//` single line comment

`#def` preprocessor definition

`print` debug print command


## Z8 I/O ports reference

| Port number | Type | Device | Description
--- | --- | --- | ---
0 | read-only | Keyboard | Keyboard row #0 (1 2 3 4 5 6)
1 | read-only | Keyboard | Keyboard row #1 (7 8 9 0 - =)
2 | read-only | Keyboard | Keyboard row #2 (Q W E R T Y)
3 | read-only | Keyboard | Keyboard row #3 (U I O P [ ])
4 | read-only | Keyboard | Keyboard row #4 (A S D F G H)
5 | read-only | Keyboard | Keyboard row #5 (J K L ; ' \)
6 | read-only | Keyboard | Keyboard row #6 (LSHIFT Z X C V B)
7 | read-only | Keyboard | Keyboard row #7 (N M , . / RSHIFT)
8 | read-only | Keyboard | Keyboard row #8 (LCTRL RCTRL LALT RALT SPACE ENTER)
9 | read-only | Keyboard | Keyboard row #9 (LEFT RIGHT UP DOWN ESC ~)
10 | read-only | Gamepad | Gamepad (LEFT RIGHT UP DOWN BT_A, BT_B, BT_X, BT_Y)
11 | write-only | GPU | Border and background color index (4 + 4 bits)
12 |  | None | Reserved
13 | write-only | GPU | Line 0 and Line 1 foreground color index
14 | write-only | GPU | Line 2 and Line 3 foreground color index
15 | write-only | GPU | Line 4 and Line 5 foreground color index
16 | write-only | GPU | Line 6 and Line 7 foreground color index
17 | write-only | GPU | Line 8 and Line 9 foreground color index
18 | write-only | GPU | Line 10 and Line 11 foreground color index
19 | write-only | GPU | Sprite #0, position X
20 | write-only | GPU | Sprite #0, position Y
21 | write-only | GPU | Sprite #0, sprite index
22 | write-only | GPU | Sprite #1, position X
23 | write-only | GPU | Sprite #1, position Y
24 | write-only | GPU | Sprite #1, sprite index
15 | write-only | GPU | Sprite #2, position X
26 | write-only | GPU | Sprite #2, position Y
27 | write-only | GPU | Sprite #2, sprite index
28 | write-only | GPU | Sprite #3, position X
29 | write-only | GPU | Sprite #3, position Y
30 | write-only | GPU | Sprite #3, sprite index
31 |  | None | Reserved

## Z8 Color table (Palette)

| Index | Color | Name
--- | --- | --- 
0 | ![#800000](https://placehold.it/15/800000/000000?text=+) `#800000` | Red
1 | ![#008000](https://placehold.it/15/008000/000000?text=+) `#008000` | Green
2 | ![#000080](https://placehold.it/15/000080/000000?text=+) `#000080` | Blue
3 | ![#800080](https://placehold.it/15/800080/000000?text=+) `#800080` | Magenta
4 | ![#808000](https://placehold.it/15/808000/000000?text=+) `#808000` | Yellow
5 | ![#008080](https://placehold.it/15/008080/000000?text=+) `#008080` | Cyan
6 | ![#808080](https://placehold.it/15/808080/000000?text=+) `#808080` | White
7 | ![#000000](https://placehold.it/15/000000/000000?text=+) `#000000` | Black
8 | ![#ff0000](https://placehold.it/15/ff0000/000000?text=+) `#ff0000` | Bright Red
9 | ![#00ff00](https://placehold.it/15/00ff00/000000?text=+) `#00ff00` | Bright Green
10 | ![#0000ff](https://placehold.it/15/0000ff/000000?text=+) `#0000ff` | Bright BLue
11 | ![#ff00ff](https://placehold.it/15/ff00ff/000000?text=+) `#ff00ff` | Bright Magenta
12 | ![#ffff00](https://placehold.it/15/ffff00/000000?text=+) `#ffff00` | Bright Yellow
13 | ![#00ffff](https://placehold.it/15/00ffff/000000?text=+) `#00ffff` | Bright Cyan
14 | ![#ffffff](https://placehold.it/15/ffffff/000000?text=+) `#ffffff` | Bright White
15 | ![#202020](https://placehold.it/15/202020/000000?text=+) `#202020` | Bright Black

## Z8 Character Set


## Z8 Sprite Set
