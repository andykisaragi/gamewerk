function Controller(name){
    this.name = name;
    this.things = [];
	this.hooks = new Array('before','after');
}

Controller.prototype.send = function(functionName,args){
    
    //console.log("send " + functionName);
	
    for (var i=0; i < this.hooks.length; i++) {
	
	}
	
          
    for (var i=0; i < this.things.length; i++) {
		var fName = functionName + "_before";
        if (typeof(this.things[i][fName]) === "function"){
			//console.log("function  " + fName + " found");
            this.things[i][fName](args);
        }else{
			//console.log("function  " + fName + " not found");
		
		}
        if (typeof(this.things[i][functionName]) === "function"){
            this.things[i][functionName](args);
        }
    }
};

Controller.prototype.updateScene = function(delta)
{
	this.send("updateScene",{delta: delta});
};
Controller.prototype.keyDown = function(key)
{
	this.send("keyDown",{key: key});
};
Controller.prototype.keyUp = function(key)
{
	this.send("keyUp",{key: key});
};

