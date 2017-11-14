# Tetris clone [UNDER CONSTRUCTION]
Written in JavaScript, Vue.js and HTML 5 canvas. 

Note that from a productivity standpoint one should never built its own core implementation of a game loop, game engine, phsyics engine,... but rather use well-tested software for these purposes. The only reason I have built it this way is because of learning purposes (since the game is rather small).

## The Game loop
The game loop I have implemented seperates the frame rate and the (game logic) update rate. This means that all the data behind what we visually see (=game logic) update at a different speed in comparision to what we actually see (=graphics, animations, ...). 

At first, this may sound as a bad idea since you want your game data to represent what we actually see. However, both updating and rendering *each frame* takes time and effort. Now, this might be very little time and effort on a good pc playing a very simple game. But even that will be a problem because your frame rate will be through the roof, reaching way more than 60, 100 or 200 FPS. For rendering purposes this is good, but since your game *also updates its game logic at that rate*, in 1 second you will have gone from one side of the playing field to the other due to those many updates in a small amount of time. The opposite is true for a slow pc. That's why people sometimes slowed down their pc's to gain a competitive advantage (since they now had more time to think because everything is moving slower).

That's why it's a good idea to decouple the frame rate and the game logic update rate. The way I did it is with a simple *fixed timestep* (Read about it [here](https://gafferongames.com/post/fix_your_timestep/). This way, for every player, each of our games will be updated x amount of times according to how long the previous frame took to execute. This way, people with a lower frame rate will catch up (by possibly doing more game logic updates per frame) to people with a higher frame rates. The effect will be that all players in all circumstances will all be more or less in the same game state regardless of what they see on screen.

(To be complete, the rendering will still just happen at the rate of the frames which is good since we usually want to render as much as possible.)

One last thing. Since sometimes you will not update the game logic in your loop  (due to high FPS or the amount of caught up time not amounting to 0) you still have some time that has been unused. For example if your game logic updates every 0.2s but you're only behind 0.1s on the actual game, the game will not update. However, there is still this 0.1s you're actually visually behind. Worse, when the next frame comes and suddenly your game updates the game logic you might see a small stutter from point A to B. To make that transition better from A to B we can use a visual effect called *interpolation* on that unused 0.1s. We can make it look like the game has updated its game logic, however it's only a visual effect. (Note that since it's only a visual effect there might be no collision detection and other things even if it visually looks like that. However, usually this is a very small and forgetable error to the point it's worth it for smoother animations.)




