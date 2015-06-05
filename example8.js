function initGame()
{
}

function renderScene(delta)
{
	//ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i=0;i<game.things.length;i++)
    { 
    	if(game.things[i].sprite){
        	drawSprite(game.things[i].sprite, game.things[i].xPos, game.things[i].yPos, game.things[i].spriteRotation, 1);
    	}else if(game.things[i].drawPath){

    		drawPath(game.things[i].drawPath);

    	}
    }

}

// [imageName] image file name
function loadSprite(imageName)
{
	// create new image object
	var image = new Image();
	// load image
	image.src = imageName;
	// return image object
	return image;
}

// [imageObject] this is image object which is returned loadImage
// [x] screen x coordinate
// [y] screen y coordinate
// [rotation] rotation angle in radians (normal value 0.0)
// [scale] sprite scale (normal value 1.0)
function drawSprite(imageObject, x, y, rotation, scale)
{
	var w = imageObject.width;
	var h = imageObject.height;

	// save state
	ctx.save();
	// set screen position
	ctx.translate(x, y);
	// set rotation
	ctx.rotate(-rotation);
	// set scale value
	ctx.scale(scale, scale);
	// draw image to screen drawImage(imageObject, sourceX, sourceY, sourceWidth, sourceHeight,
	// destinationX, destinationY, destinationWidth, destinationHeight)
	ctx.drawImage(imageObject, 0, 0, w, h, -w/2, -h/2, w, h);
	// restore state
	ctx.restore();
}

function drawPath(path){


	ctx.beginPath();
	ctx.moveTo(path[0].x, path[0].y);
	for (var coords of path){

		ctx.lineTo(coords.x, coords.y);
		ctx.lineWidth = 4;
		//ctx.strokeStyle = color;
		ctx.stroke();

	}


}