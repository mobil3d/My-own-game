var soldier


function setup() {
	createCanvas(1600, 900);

	 soldier = createSprite(800,450);

  
}


function draw() {
  background(0);
  
	if(keyDown(RIGHT_ARROW)){
		soldier.rotation = soldier.rotation+10;
	}

	if(keyDown(LEFT_ARROW)){
		soldier.rotation = soldier.rotation-10;
	}


	spawnZombies();
  drawSprites();
 
}

function spawnZombies(){
	if(frameCount%100 === 0 ){
		var spawnEdge = Math.round(random(1,4));
			if(spawnEdge ===1){
				var	zombie = createSprite(random(50,1500), 0, 50,50 );
				zombie.velocityY = 5;
			}

	}




}

