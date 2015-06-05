var frameRate = 0;
var canvas;
var lastTime;
var stageWidth = 600;
var stageHeight = 400;

var stageHyp = hyp(stageWidth,stageHeight);

var game = new Controller("game");

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function hyp(x,y){
	var hyp = Math.sqrt((x*x)+(y*y));
	return hyp;
}

function init(fps) {
    // Get the canvas element using the DOM
    canvas = document.getElementById('mycanvas');

    canvas.width = stageWidth;
    canvas.height = stageHeight;

    // Make sure we don't execute when canvas isn't supported
    if (canvas.getContext){
		// Use getContext to use the canvas for drawing
		ctx = canvas.getContext('2d');
		
		frameRate = fps;
				
		// Initialize game, before game start to call updates
		// This is function which you need to make every game!
		initGame();
		
		// We need to initialize lastTime, so we don't get false delta value on first update
		lastTime = new Date().getTime();
		
		if (fps > 0) {
			timeInterval = 1000 / fps;
			// timer calls fw_update function as often we want
			setInterval(fw_update, timeInterval);
		} else {
			// if we don't have timer, we update once our framework
			fw_update();
		}
		
		// Setup events
		canvas.onmousemove = fw_mouseMove;
		canvas.onmousedown = fw_mouseDown;
		canvas.onmouseup = fw_mouseUp;	
		
        window.onkeydown = keyDown;
        window.onkeyup = keyUp;

        //game.things[0] = new Car(300,300);
        //game.things[1] = new Chaser(400,200);
		
		/*for(var i = 0; i < 150; i++){
			var swarmer = new Swarmer(Math.random() * 900,Math.random() * 600);
		    game.things.push(swarmer);
		}*/

		var paddledraw = new Paddledraw();
		game.things.push(paddledraw);
			
        console.log("game.things " + game.things);
        
    } else {
		alert('You need HTML5 compatible browser to see this demo!');
    }
}

function keyDown(e){
    var evt = e ? e:event;
    var key = evt.keyCode;
	game.keyDown(key);
    // 1 -> 49
    //console.log(key);


}
function keyUp(e){
    var evt = e ? e:event;
    var key = evt.keyCode;
	game.keyUp(key);
}

function fw_update()
{
	// we update time 
	var currTime = new Date().getTime();
	// and calculate time of between two frames
	var delta = (currTime - lastTime) / 1000.0;
	// we need to remember previous time
	lastTime = currTime;
	// we don't accept too big delta values
	if (delta > 1.0) delta = 1.0;
	
    game.updateScene(delta);
	
	renderScene(delta);
}





function touchDown() {
    game.things[0].accelerating = true;
}

function touchUp() {
    game.things[0].accelerating = false;
}


window.ondeviceorientation = function(event) {
    			
    //alert("!");
                
	/*if (event.alpha < 180)
	{
		xacc = -event.alpha;
	}else{
		xacc = 360 -event.alpha;
	}

	xacc /= 75;*/

	//game.things[0].rotationSpeed = event.gamma * 3;
	//yacc = event.beta / 30;

	//yscroll = -event.beta / 10;

	// event.alpha

	// event.beta
	// event.gamma
}

var mouseMovedX;
var mouseMovedY;
var mouseButton;

function fw_mouseMove(evt)
{
	// We calculate mouse canvas position
	mouseMovedX = evt.clientX - canvas.offsetLeft;
	mouseMovedY = evt.clientY - canvas.offsetTop;

	game.send('mouseMove',{x: mouseMovedX, y:mouseMovedY});

	// If we don't use timer, we need to update canvas everytime when user do something
	if (frameRate == 0) fw_update();	
}

function fw_mouseDown(evt)
{
	// We calculate mouse canvas position
	mouseMovedX = evt.clientX - canvas.offsetLeft;
	mouseMovedY = evt.clientY - canvas.offsetTop;


	game.send('mouseDown',{x: mouseMovedX, y:mouseMovedY});

	// Button is pressed down
	switch(evt.which) {
		case 1 : mouseButton |= 0x01;	// left
			break;
		case 2 : mouseButton |= 0x02;	// middle
			break;
		case 3 : mouseButton |= 0x04;	// right
			break;
	}

	// If we don't use timer, we need to update canvas everytime when user do something
	if (frameRate == 0) fw_update();	
}

function fw_mouseUp(evt)
{
	// We calculate mouse canvas position
	mouseMovedX = evt.clientX - canvas.offsetLeft;
	mouseMovedY = evt.clientY - canvas.offsetTop;

	game.send('mouseUp',{x: mouseMovedX, y:mouseMovedY});

	// Button released
	switch(evt.which) {
		case 1 : mouseButton &= 0x06;
			break;
		case 2 : mouseButton &= 0x05;
			break;
		case 3 : mouseButton &= 0x03;
			break;
	}

	// If we don't use timer, we need to update canvas everytime when user do something
	if (frameRate == 0) fw_update();	
}