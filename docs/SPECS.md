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
12 | write-only | GPU | Special palette color index
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
31 | read-only | RND | Random number generator port
253 | write-only | SND | Virtual SND FX#1 port
254 | write-only | SND | Virtual SND FX#2 port
255 | write-only | SND | Virtual Music port


**Note:**
In case the MSB of character is not zero, the terminal will use a special palette from port 12 instead of the current line palette.
In this case, character LSB controls which color (hight or low) from the special palette to use.

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
| Index | Character
--- | ---
32 | ![32](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/32.png)
33 | ![33](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/33.png)
34 | ![34](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/34.png)
35 | ![35](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/35.png)
36 | ![36](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/36.png)
37 | ![37](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/37.png)
38 | ![38](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/38.png)
39 | ![39](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/39.png)
40 | ![40](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/40.png)
41 | ![41](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/41.png)
42 | ![42](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/42.png)
43 | ![43](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/43.png)
44 | ![44](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/44.png)
45 | ![45](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/45.png)
46 | ![46](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/46.png)
47 | ![47](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/47.png)
48 | ![48](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/48.png)
49 | ![49](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/49.png)
50 | ![50](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/50.png)
51 | ![51](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/51.png)
52 | ![52](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/52.png)
53 | ![53](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/53.png)
54 | ![54](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/54.png)
55 | ![55](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/55.png)
56 | ![56](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/56.png)
57 | ![57](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/57.png)
58 | ![58](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/58.png)
59 | ![59](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/59.png)
60 | ![60](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/60.png)
61 | ![61](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/61.png)
62 | ![62](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/62.png)
63 | ![63](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/63.png)
64 | ![64](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/64.png)
65 | ![65](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/65.png)
66 | ![66](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/66.png)
67 | ![67](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/67.png)
68 | ![68](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/68.png)
69 | ![69](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/69.png)
70 | ![70](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/70.png)
71 | ![71](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/71.png)
72 | ![72](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/72.png)
73 | ![73](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/73.png)
74 | ![74](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/74.png)
75 | ![75](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/75.png)
76 | ![76](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/76.png)
77 | ![77](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/77.png)
78 | ![78](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/78.png)
79 | ![79](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/79.png)
80 | ![80](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/80.png)
81 | ![81](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/81.png)
82 | ![82](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/82.png)
83 | ![83](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/83.png)
84 | ![84](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/84.png)
85 | ![85](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/85.png)
86 | ![86](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/86.png)
87 | ![87](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/87.png)
88 | ![88](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/88.png)
89 | ![89](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/89.png)
90 | ![90](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/90.png)
91 | ![91](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/91.png)
92 | ![92](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/92.png)
93 | ![93](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/93.png)
94 | ![94](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/94.png)
95 | ![95](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/95.png)
96 | ![96](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/96.png)
97 | ![97](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/97.png)
98 | ![98](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/98.png)
99 | ![99](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/99.png)
100 | ![100](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/100.png)
101 | ![101](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/101.png)
102 | ![102](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/102.png)
103 | ![103](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/103.png)
104 | ![104](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/104.png)
105 | ![105](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/105.png)
106 | ![106](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/106.png)
107 | ![107](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/107.png)
108 | ![108](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/108.png)
109 | ![109](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/109.png)
110 | ![110](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/110.png)
111 | ![111](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/111.png)
112 | ![112](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/112.png)
113 | ![113](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/113.png)
114 | ![114](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/114.png)
115 | ![115](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/115.png)
116 | ![116](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/116.png)
117 | ![117](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/117.png)
118 | ![118](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/118.png)
119 | ![119](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/119.png)
120 | ![120](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/120.png)
121 | ![121](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/121.png)
122 | ![122](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/charset/122.png)


## Z8 Sprite Set

Made by [Pipoya](https://pipoya.itch.io/)

![TODO](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/sprites/sprites.png)

## Z8 Screen layout paper sheet

![TODO](https://raw.githubusercontent.com/SergeyMakeev/z8/master/docs/screen_layout_letter_150dpi.png)

## Sound / Music

https://opengameart.org/content/10-8bit-coin-sounds
https://opengameart.org/content/8-bit-sound-fx
https://opengameart.org/content/8bit-sfx

https://opengameart.org/content/8-bit-theme-moving-right-along
https://opengameart.org/content/8-bit-the-hero
https://opengameart.org/content/8-bit-theme-on-the-offensive
https://opengameart.org/content/bonus-round-8bit



## Demo game

[Demo Game](https://sergeymakeev.github.io/z8/index.html?ls=z8_001&code=https://raw.githubusercontent.com/SergeyMakeev/z8/master/practice/game.z8)