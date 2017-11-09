# Tetris clone [UNDER CONSTRUCTION]
Written in JavaScript, Vue.js and HTML 5 canvas. 

## Source code clarifications
Here I address and explain some "weird" decisions I have made when coding this game up. It can be useful for later references for others or myself.

### In game.js
* It might look very counter intuitive to do `Grid.moveTetromino(direction)` instead of something like `Tetromino.move(direction)`. However, we do this because
when we move the tetromino we need to check and update THE COORDINATES OF THE GRID. Because of this reason it's better to encapsulate all this code directly in the grid class.
