function Bullet(canvas, helicopterPosX, helicopterPosY, helicopterGunPosX, helicopterGunPosY) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.posX = helicopterPosX + helicopterGunPosX;
	this.posY = helicopterPosY + helicopterGunPosY;

	this.BULLET_SPEED = 15; 

}


Bullet.prototype = {
	draw: function(x, y) {
		this.canvasCtx.fillStyle = "#000";
		this.canvasCtx.fillRect(x, y, 4, 4);
	},


	update: function() {
		this.posX += this.BULLET_SPEED;
		this.draw(this.posX, this.posY);
	}
}


export default Bullet;