function Thing(thingName){
    this.name = thingName;
    this.spriteActive = true;

    this.spriteRotation = 0;
    this.turnSpeed = 180;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.totalSpeed = 0;
    this.xPos = 0;
    this.yPos = 0;
	this.maxSpeed = 20;
	this.deceleration = 0.99;
	this.rotationSpeed = 0;
	this.rotationDeceleration = 0.98;
	this.vectorX = 0;
	this.vectorY = 0;
    
}

Thing.prototype.do = function(args){
	//@todo - this, but better.
	// array of hooks with weights..?
	var functionName = args.function;
	var before = functionName + '_before';
	var after = functionName + '_after';
	if (typeof(this[before]) === "function"){
		this[before](args);
	}	
	if (typeof(this[functionName]) === "function"){
		this[functionName](args);
	}	
	if (typeof(this[after]) === "function"){
		this[after](args);
	}	
}

Thing.prototype.updateScene = function(args)
{
	var delta = args.delta;
   
   //@todo - array of updateScene actions
	this.do({function: 'evaluate'});
	this.do({function: 'accelerate'});
    this.decelerate();
	this.checkSpeed();
	this.do({function: 'rotate', delta: delta});
    this.correctRotation();  
	this.updatePosition();
	this.wrapStage();  
    //console.log("X: " + vectorX + " Y: " + vectorY);
};
/*
 * Decide what to do this frame
 */
Thing.prototype.evaluate = function(){

	this.vectorY = Math.cos(this.spriteRotation);
    this.vectorX = Math.sin(this.spriteRotation);
	
	this.vectorDir = (Math.atan2(-this.vectorY,-this.vectorX)*(180/Math.PI));

			//console.log(this.vectorDir);
}
Thing.prototype.accelerate = function(){

}

Thing.prototype.emit = function(args){
	var type = args.type;
    var x = this.xPos;
    var y = this.yPos;       
    var xSp = this.vectorX * 5 + this.xSpeed;
    var ySp = this.vectorY * 5 + this.ySpeed;
    console.log(this.name + " emit " + type);    
    var emission = new window[type](x,y);
    //this.parent instead of game?    
    game.things.push(emission);
}

Thing.prototype.checkSpeed = function(){
    this.totalSpeed = Math.sqrt((this.xSpeed * this.xSpeed) + (this.ySpeed * this.ySpeed));
    if (this.totalSpeed > this.maxSpeed){
        this.xSpeed *= (this.maxSpeed/this.totalSpeed);
        this.ySpeed *= (this.maxSpeed/this.totalSpeed);
    }
}

Thing.prototype.updatePosition = function(){
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
}

Thing.prototype.rotate = function(args){
	var delta = args.delta;
	this.spriteRotation += this.rotationSpeed * delta;
}

Thing.prototype.correctRotation = function(){
    // should do modulus or something here
    //console.log(spriteRotation);
    if (this.spriteRotation > Math.PI * 2){
        this.spriteRotation -= Math.PI * 2;    
    }
    if (this.spriteRotation < 0){
        this.spriteRotation += Math.PI * 2;    
    }
}
Thing.prototype.wrapStage = function(){
    if (this.xPos < 0) this.xPos += stageWidth;
    if (this.yPos < 0) this.yPos += stageHeight;
    if (this.xPos > stageWidth) this.xPos -= stageWidth;
    if (this.yPos > stageHeight) this.yPos -= stageHeight;
}
Thing.prototype.decelerate = function(){
    this.xSpeed *= this.deceleration;
    this.ySpeed *= this.deceleration;
	this.rotationSpeed *= this.rotationDeceleration;
}



Thing.prototype.keyDown = function(args)
{
};
Thing.prototype.keyUp = function(args)
{
};

