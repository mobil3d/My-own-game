//add human to zombie when it touches vaccine 
//sounds feedback(vaccine shot, music, soldier health decrease)
//background picture


var soldier_img
var soldier
var edges
var human_img
var vaccine,vaccine_img,vaccineGroup
var zombie_img1,zombie_img2,zombie, zombieBackG,zombieGroup
var health = 5;
var score = 0;
var backGroundSprite


function preload(){
human_img = loadImage("images/Human.png");
soldier_img = loadImage("images/Soldier.png");
vaccine_img = loadImage("images/Vaccine.png");
zombie_img1 = loadImage("images/Zombie suit.png");
zombie_img2 = loadImage("images/Zombie2.png");
zombieBackG = loadImage("images/ZombieBackground.png");
}

function setup() {
	createCanvas(1600, 900);

	//backGroundSprite = createSprite(50,50,1600,900);
	//backGroundSprite.addImage(zombieBackG);

	 soldier = createSprite(800,450);
	 soldier.addImage(soldier_img);
	 soldier.scale = 0.6;
	 vaccineGroup = new Group();

	 zombieGroup = new Group();
}


function draw() {
  background(0);
  textSize(30);
  text("Health :"+health, 50,100);

  text("Score :"+ score,50,150);
	if(keyDown(RIGHT_ARROW)){
		soldier.rotation = soldier.rotation+10;
	}

	if(keyDown(LEFT_ARROW)){
		soldier.rotation = soldier.rotation-10;
	}



	edges = createEdgeSprites();
	spawnZombies();
	shooting();
	collision();
  	drawSprites();
 
}



function spawnZombies(){
	if(frameCount%100 === 0 ){
		var spawnEdge = Math.round(random(1,4));
		// 1 = top, 2 = bottom, 3 = left, 4 = right 
			if(spawnEdge ===1){
				zombie = createSprite(random(50,1500), 50, 50,50 );
				zombie.addImage(zombie_img1);
				zombie.scale = 0.5;
				if(zombie.x <700){
					zombie.velocityX = 5 + score/10;
				}
				if (zombie.x >900){
					zombie.velocityX = -(5 + score/10);
				}				
				zombie.velocityY = random(2,5);
				zombie.lifetime = 1100/zombie.velocityY;
				zombieGroup.add(zombie);
			}else if(spawnEdge ===2){
				zombie = createSprite(random(50,1500), 900, 50,50 );
				zombie.addImage(zombie_img2);
				zombie.scale = 0.5;
				if(zombie.x <700){
					zombie.velocityX = 5 + score/10;
				}
				if (zombie.x >900){
					zombie.velocityX = -(5 + score/10);
				}				
				zombie.velocityY = random(-2,-5);
				zombie.lifetime = -1100/zombie.velocityY;
				zombieGroup.add(zombie);
			}else if(spawnEdge ===3){
				zombie = createSprite (50, random(50,900), 50,50 );
				zombie.addImage(zombie_img2);
				zombie.scale = 0.5;
				if(zombie.y <400){
					zombie.velocityY = 3 + score/10;
				}
				if (zombie.y >500){
				zombie.velocityY =  -(3 + score/10);
				}				
				zombie.velocityX = random(4,5);
				zombie.lifetime = 1800/zombie.velocityX;
				zombieGroup.add(zombie);
			}else if(spawnEdge ===4){
				zombie = createSprite (1600, random(50,900), 50,50 );
				zombie.addImage(zombie_img1);
				zombie.scale = 0.5;
				if(zombie.y <400){
				zombie.velocityY = 3+score/10;
				}
				if (zombie.y >500){
				zombie.velocityY =  -(3 + score/10);
				}				
				zombie.velocityX = random(-4,-5);
				zombie.lifetime = -1800/zombie.velocityX;
				zombieGroup.add(zombie);
			}
	}
}


function shooting(){
	if(keyWentDown("space")){
		vaccine = createSprite(soldier.x, soldier.y);
		vaccine.addImage(vaccine_img);
		vaccine.scale = 0.3;
		vaccine.rotation = soldier.rotation-90;
		vaccine.addSpeed(5,vaccine.rotation);
		vaccine.depth = 0;
		vaccine.lifetime = 1000/5;
		vaccineGroup.add(vaccine);
	}		
}


function collision(){
	if (zombieGroup.isTouching(soldier)) {
		health = health-1;
	}
	for (var i = 0; i<vaccineGroup.length; i++){		
		for (var e = 0; e<zombieGroup.length;e++){
			if(vaccineGroup.get(i).isTouching(zombieGroup.get(e))){
				vaccineGroup.get(i).destroy();
				zombieGroup.get(e).destroy();
				score = score+1;
			}

		}

	} 




}