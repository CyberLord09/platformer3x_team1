import GameEnv from './GameEnv.js';
import Character from './Character.js';
import GameControl from './GameControl.js';
import Enemy from './Enemy.js';


export class Boss extends Enemy {
    // instantiation: constructor sets up player object 
    constructor(canvas, image, data, xPercentage, yPercentage, name, minPosition) {
        super(canvas, image, data, 0.0, 0.2);

        this.playerData = data;
        //Unused but must be Defined
        this.name = name;
        this.y = yPercentage;

        this.isIdle = false;
        //Initial Position of Goomba
        this.x = xPercentage * GameEnv.innerWidth;



        //Access in which a Goomba can travel    
        this.minPosition = minPosition * GameEnv.innerWidth;
        this.maxPosition = this.x + xPercentage * GameEnv.innerWidth;

        this.immune = 0;

        this.storeSpeed = this.speed;

        this.direction = "d"; // initially facing right\
        //Define Speed of Enemy
        if (["easy", "normal"].includes(GameEnv.difficulty)) {
            this.speed = this.speed * Math.floor(Math.random() * 1.5 + 2);
        } else if (GameEnv.difficulty === "hard") {
            this.speed = this.speed * Math.floor(Math.random() * 3 + 3);
        } else {
            this.speed = this.speed * 5
        }

    }

    update() {
        super.update();

        if (GameControl.randomEventId === 1 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "idleL"; 
            GameControl.endRandomEvent();
        }
        else if (GameControl.randomEventId === 2 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "idleR"; 
            GameControl.endRandomEvent();
        }
        else if (GameControl.randomEventId === 3 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "a"; 
            GameControl.endRandomEvent();
        }
        else if (GameControl.randomEventId === 4 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "d"; 
            GameControl.endRandomEvent();
        }

        if (this.direction === "idleL") {
            this.speed = 0
        }
        else if (this.direction === "idleR") {
            this.speed = 0
        }
    }

    collisionAction() {
        super.collisionAction();


        if (this.collisionData.touchPoints.other.id === "player") {
            if (this.collisionData.touchPoints.other.right && !this.collisionData.touchPoints.other.bottom) {
                this.direction = "attackL"; 
                this.speed = 0;
            }
            else if(this.collisionData.touchPoints.other.left && !this.collisionData.touchPoints.other.bottom){
                this.direction = "attackR"; 
                this.speed = 0;
            }
            else if(this.collisionData.touchPoints.other.bottom && this.immune == 0){
                GameEnv.invincible = true;
                GameEnv.goombaBounce = true;
                GameEnv.playSound("goombaDeath");
                this.animationSpeed = 55;
                this.direction = "death";
            }
            
        }
    }

}

export default Boss;