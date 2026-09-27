# spookify

a spooky synth with a playalong piano!

![screenshot](screenshot.png)

### description
spookify is a web based synth that plays spooky tunes, allows you to adjust their settings, and play different tunes using a falling blocks player. it has a bunch of modes for playing preset spooky patterns...
* autoplay, where the program plays the tune on its own
* interactive play where the program stops for you to play along
* normal play where you can look at the notes and play
* normal synth where you can play anything you want!

### how to try?

just head over to [this page](https://shlokdee.github.io/spookify) to try it out! mess around with the synth types and values, and play whatever you want.
if you want to play preset patterns, select the pattern from the dropdown, and check the boxes if you want it to auto-play or play with you interactively, where it pauses if you dont press the right key. the default is where the blocks keep falling regardless. then click on start to begin the animation and start playing!

#### downloading:
just clone the repo and open the html file/ host using a python server or a similar static server

### how its built
built using vanilla html css and js. uses webaudio for the synth and note sounds, a canvas with animation for the falling blocks. the patterns are stored in the javascript object itself, which you can edit. 

### inspiration
i always wanted to make one of my own tools that played like those falling block piano videos we see on youtube, where you have to press the key at the exact type the neon block hits your keyboard. and looking at the 3am spooky theme, i added a spooky synth to it!



