var player;

var gravity = "nothing";

var edges

var house

var gamestate = "play"

var score = 0
var highscore = 0

var peng1,pengImage
var peng2

//and here

let playerPositions = [];
const MAX_POS = 50;

//too

function preload() {
house = loadImage("house.jpg")
pengImage = loadImage("penguin.png")
}

function setup() {
        createCanvas(windowWidth,windowHeight);
        edges = createEdgeSprites();
        player = createSprite(windowWidth - windowWidth/2,windowHeight - windowHeight/2,20,20);
        player.shapeColor = 150;

        peng1 = createSprite(windowWidth - windowWidth/5,windowHeight - windowHeight/3,30,30);
        peng2 = createSprite(windowWidth - 2*windowWidth/3,windowHeight - windowHeight/5,30,30);

        peng1.addImage(pengImage);
        peng2.addImage(pengImage);
        peng1.scale = 0.3;
        peng2.scale = 0.6;

        
        
        
        

}

function draw() {

        
        background(house);
    //here to    
    
    if(frameCount % 50 === 0) {
        var rand = Math.round(random(1,4));
        switch(rand) {
        case 1: peng1.velocityX = Math.round(random(10,14));
                peng1.velocityY = Math.round(random(10,14));
                    break;
        case 2: peng1.velocityX = Math.round(random(-10,-14));
                peng1.velocityY = Math.round(random(-10,-14));
                    break;
        case 3: peng1.velocityX = Math.round(random(10,14));
                peng1.velocityY = Math.round(random(-10,-14));
                    break;
        case 4: peng1.velocityX = Math.round(random(-10,-14));
                peng1.velocityY = Math.round(random(10,14));
                    break;
             default: break;
        }
        var rand2 = Math.round(random(1,4));
        switch(rand2) {
                case 1: peng2.velocityX = Math.round(random(10,14));
                        peng2.velocityY = Math.round(random(10,14));
                            break;
                case 2: peng2.velocityX = Math.round(random(-10,-14));
                        peng2.velocityY = Math.round(random(-10,-14));
                            break;
                case 3: peng2.velocityX = Math.round(random(10,14));
                        peng2.velocityY = Math.round(random(-10,-14));
                            break;
                case 4: peng2.velocityX = Math.round(random(-10,-14));
                        peng2.velocityY = Math.round(random(10,14));
                            break;
                     default: break;
                }
       
                if (gamestate === "play"){
                score += 50;
                }

    }




        ellipse(player.x, player.y, 50, 50);
        playerPositions.push({x: player.x, y: player.y});
        if (playerPositions.length > MAX_POS) {
                playerPositions.splice(0,1);
       }
       for (let i = 0; i < playerPositions.length; i++) {
        strokeWeight(0);
        fill(150);
              ellipse(playerPositions[i].x, playerPositions[i].y,i+1,i+1);
        }


        fill(0);
        textSize(30);
        text("Score: " + score + "              Highscore: " + highscore,50,50);


        player.bounceOff(edges);
        peng1.bounceOff(edges);
        peng2.bounceOff(edges);
        if (player.isTouching(peng1) || player.isTouching(peng2)) {
                gamestate = "ded"
        }


        if (gamestate === "ded") {
                gravity = "nothing";
                player.velocityX = 0;
                player.velocityY = 0;
                player.x = windowWidth - windowWidth/2;
                player.y = windowHeight - windowHeight/2;
                
                if (score > highscore) {
                        highscore = score;
                }
                

        peng1.x = windowWidth - windowWidth/5;
        peng1.y = windowHeight - windowHeight/3;

        peng2.x = windowWidth - 2*windowWidth/3;
        peng2.y = windowHeight - windowHeight/5;



                fill("black")
                textSize(22);
                text("ur ded press r", -50 + windowWidth - windowWidth/2,-100 + windowHeight - windowHeight/2);
        }

        if (gamestate === "ded" && keyDown("r")) {
                gamestate = "play";
                score = 0;
        }


       


        if (gamestate === "play") {

                if (keyDown("up")) {
                      gravity = "up";
                }

                if (keyDown("down")) {
                      gravity = "down";
                }

                if (gravity === "down") {
                      //constant velocityY +
                      player.velocityY += 1;
                }

                if (gravity === "up") {
                       //constant velocityY -
                       player.velocityY -= 1;
                }
        
                //limit the gravity so if the velcityY < (number) then velocity Y goes to (number)
                if (player.velocityY < -12)  {
                        player.velocityY = -12;
                }

                //limit the gravity so if the velcityY > (number) then velocity Y goes to (number)
                if (player.velocityY > 12)  {
                        player.velocityY = 12;
                }




                //player.debug = true;
                //peng1.debug = true;
                //peng2.debug = true;




                if (keyDown("left")) {
                    gravity = "left";
                }

                if (keyDown("right")) {
                      gravity = "right";
                }

                if (gravity === "right") {
                   //constant velocityX +
                    player.velocityX += 1;
                }



                 if (gravity === "left") {
                        //constant velocityX -
                     player.velocityX -= 1;
                }
        
                if (player.velocityX < -12)  {
                   player.velocityX = -12;
                }

                if (player.velocityX > 12)  {
                        player.velocityX = 12;
                }
        }

        drawSprites();
}