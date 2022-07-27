import { _decorator, Component, Animation, EventKeyboard, SkeletalAnimation, Input, input, CylinderCollider, ICollisionEvent, EventMouse, Camera, AudioSource, director } from 'cc';
import { Enemy } from './Enemy';
import { HubManager } from './HubManager';
import { MovingDirection, DIRECTIONS } from './MovingDirection';
const { ccclass, property } = _decorator;

enum ASTRONAUT_ANIMS {
    IDLE,
    WALK,
    JUMP,
    RUN,
    ATTACK,
    CROUCH,
    LIEDOWN
}

@ccclass('Astronaut')
export class Astronaut extends Component {

    private readonly KEYCODE_W = 87;
    private readonly KEYCODE_A = 65;
    private readonly KEYCODE_S = 83;
    private readonly KEYCODE_D = 68;
    private readonly KEYCODE_SPACEBAR = 32;
    private readonly KEYCODE_SHIFT = 16;
    private readonly KEYCODE_CTRL = 17;
    private readonly KEYCODE_Z = 90;
    private readonly KEYCODE_Q = 81;

    private readonly LINEAL_VELOCITY_WALK = 0.1; // 0.05
    private readonly DIAGONAL_VELOCITY_WALK = 0.1414; // 0.0707
    //private readonly LINEAL_VELOCITY_RUN = 0.15; // 0.075
    private readonly LINEAL_VELOCITY_RUN = 0.15;
    private readonly DIAGONAL_VELOCITY_RUN = 0.1590; // 0.10605
    private readonly RUN_MULTIPLIER = 3;

    private linealVelocity: number = 0;
    private diagonalVelocity: number = 0;

    private isRunning: boolean;
    private enemyInAttackRange: boolean;
    private isAttacking: boolean;
    private movingDirection: MovingDirection;
    private animationComponent: Animation;
    private astronautCollider: CylinderCollider;
    private audioComponent: AudioSource;
    private currentDirection: DIRECTIONS = DIRECTIONS.IDLE;
    private currentAnimation: ASTRONAUT_ANIMS = ASTRONAUT_ANIMS.IDLE;
    private enemyComponent: Enemy = null;
    private currentHealth: number;
    private currentItems: number = 0;

    @property(Camera)
    private camara: Camera;

    @property(Number)
    private cameraDistance: number = 15;

    @property(Number)
    private health: number = 4;

    @property(Number)
    private itemsInGame: number = 8;

    @property(AudioSource)
    private itemAudioSource: AudioSource;

    @property(AudioSource)
    private damageAudioSource: AudioSource;

    @property(HubManager)
    private hubManager: HubManager;


    start(): void {

        // Components
        this.animationComponent = this.getComponent(SkeletalAnimation);
        this.astronautCollider = this.getComponent(CylinderCollider);
        this.audioComponent = this.getComponent(AudioSource);

        // Events
        input.on(Input.EventType.KEY_DOWN, this.keyPressDown, this);
        input.on(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
        input.on(Input.EventType.KEY_UP, this.keyUp, this);

        // Collisions
        this.astronautCollider.on('onCollisionEnter', this.collisionEnter, this);
        this.astronautCollider.on('onCollisionExit', this.collisionExit, this);
        this.astronautCollider.on('onCollisionStay', this.collisionStay, this);
        this.astronautCollider.on('onTriggerEnter', this.triggerEnter, this);

        this.movingDirection = new MovingDirection();
        this.currentHealth = this.health;
    }

    update() {
        if (!this.isAttacking) {
            this.astronautAndCameraMovement();
        }
    }

    private astronautAndCameraMovement() {
        let currentPosition = this.node.position;
        this.configAnimationsAndVelocity();

        switch (this.currentDirection) {
            case DIRECTIONS.TOP:
                this.node.setPosition(currentPosition.x + this.linealVelocity, currentPosition.y, currentPosition.z - this.linealVelocity);
                this.node.setRotationFromEuler(0, 135, 0);
                break;
            case DIRECTIONS.DOWN:
                this.node.setPosition(currentPosition.x - this.linealVelocity, currentPosition.y, currentPosition.z + this.linealVelocity);
                this.node.setRotationFromEuler(0, 315, 0);
                break;
            case DIRECTIONS.RIGHT:
                this.node.setPosition(currentPosition.x + this.linealVelocity, currentPosition.y, currentPosition.z + this.linealVelocity);
                this.node.setRotationFromEuler(0, 45, 0);
                break;
            case DIRECTIONS.LEFT:
                this.node.setPosition(currentPosition.x - this.linealVelocity, currentPosition.y, currentPosition.z - this.linealVelocity);
                this.node.setRotationFromEuler(0, 225, 0);
                break;
            case DIRECTIONS.TOPRIG:
                this.node.setPosition(currentPosition.x + this.diagonalVelocity, currentPosition.y, currentPosition.z);
                this.node.setRotationFromEuler(0, 90, 0);
                break;
            case DIRECTIONS.TOPLEF:
                this.node.setPosition(currentPosition.x, currentPosition.y, currentPosition.z - this.diagonalVelocity);
                this.node.setRotationFromEuler(0, 180, 0);
                break;
            case DIRECTIONS.DOWRIG:
                this.node.setPosition(currentPosition.x, currentPosition.y, currentPosition.z + this.diagonalVelocity);
                this.node.setRotationFromEuler(0, 0, 0);
                break;
            case DIRECTIONS.DOWLEF:
                this.node.setPosition(currentPosition.x - this.diagonalVelocity, currentPosition.y, currentPosition.z);
                this.node.setRotationFromEuler(0, 270, 0);
                break;
        }

        this.camara.node.setPosition(currentPosition.x - this.cameraDistance, currentPosition.y + this.cameraDistance, currentPosition.z + this.cameraDistance);
    }

    private configAnimationsAndVelocity() {
        if (this.currentDirection != DIRECTIONS.IDLE) {
            if (this.currentAnimation == ASTRONAUT_ANIMS.IDLE || (this.currentAnimation == ASTRONAUT_ANIMS.RUN && !this.isRunning)) {
                this.animationComponent.play("cocos_anim_walk");
                this.currentAnimation = ASTRONAUT_ANIMS.WALK;
                this.linealVelocity = this.LINEAL_VELOCITY_WALK;
                this.diagonalVelocity = this.DIAGONAL_VELOCITY_WALK;
            } else if (this.currentAnimation == ASTRONAUT_ANIMS.WALK && this.isRunning) {
                this.animationComponent.play("cocos_anim_run");
                this.currentAnimation = ASTRONAUT_ANIMS.RUN;
                this.linealVelocity = this.LINEAL_VELOCITY_RUN * this.RUN_MULTIPLIER;
                this.diagonalVelocity = this.DIAGONAL_VELOCITY_RUN * this.RUN_MULTIPLIER;
            }
        }
        else if (this.currentDirection == DIRECTIONS.IDLE) {
            if (this.currentAnimation == ASTRONAUT_ANIMS.WALK || this.currentAnimation == ASTRONAUT_ANIMS.RUN) {
                this.animationComponent.play("cocos_anim_idle");
                this.currentAnimation = ASTRONAUT_ANIMS.IDLE;
            }
        }
    }

    private collisionEnter(event: ICollisionEvent): void {
        if (event.otherCollider.node.name == "AstronautEnemy") {
            this.enemyInAttackRange = true;
            this.enemyComponent = event.otherCollider.getComponent(Enemy);
        }

        if (event.otherCollider.node.name == "Limit") {
            this.resetDirection();
        }
    }

    private triggerEnter(event: ICollisionEvent): void {
        if (event.otherCollider.node.name == "Item") {
            this.itemAudioSource.play();
            event.otherCollider.node.destroy();
            this.currentItems += 1;
            this.hubManager.setItem(this.currentItems);

            if (this.currentItems >= this.itemsInGame) {
                director.loadScene("Win");
            }
            
        }
    }

    private collisionExit(event: ICollisionEvent): void {
        if (event.otherCollider.node.name == "AstronautEnemy") {
            this.enemyComponent = null;
            this.enemyInAttackRange = false;
        }
    }

    private collisionStay(event: ICollisionEvent) {
        if (event.otherCollider.node.name == "Limit") {
            this.isRunning = false;
        }
    }

    private mouseDown(event: EventMouse): void {
        this.attack();
    }

    private keyPressDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case this.KEYCODE_W:
                this.movingDirection.top = this.movingDirection.left == 2 ? 1 : 2;
                break;
            case this.KEYCODE_A:
                this.movingDirection.left = this.movingDirection.right == 2 ? 1 : 2;
                break;
            case this.KEYCODE_S:
                this.movingDirection.down = this.movingDirection.top == 2 ? 1 : 2;
                break;
            case this.KEYCODE_D:
                this.movingDirection.right = this.movingDirection.left == 2 ? 1 : 2;
                break;
            case this.KEYCODE_SPACEBAR:
                this.jump();
                break;
            case this.KEYCODE_SHIFT:
                this.isRunning = true;
                break;
            case this.KEYCODE_CTRL:
                this.crouch();
                break;
            case this.KEYCODE_Z:
                this.lieDown();
                break;
            case this.KEYCODE_Q:
                this.attack();
                break;
        }

        this.currentDirection = this.movingDirection.calculateDirection();
    }

    private keyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case this.KEYCODE_W:
                this.movingDirection.top = 0;

                if (this.movingDirection.down == 1) {
                    this.movingDirection.down = 2;
                }
                break;
            case this.KEYCODE_A:
                this.movingDirection.left = 0;

                if (this.movingDirection.right == 1) {
                    this.movingDirection.right = 2;
                }
                break;
            case this.KEYCODE_S:
                this.movingDirection.down = 0;

                if (this.movingDirection.top == 1) {
                    this.movingDirection.top = 2;
                }
                break;
            case this.KEYCODE_D:
                this.movingDirection.right = 0;

                if (this.movingDirection.left == 1) {
                    this.movingDirection.left = 2;
                }
                break;
            case this.KEYCODE_SHIFT:
                this.isRunning = false;
                break;
        }

        this.currentDirection = this.movingDirection.calculateDirection();
    }

    private resetDirection() {
        this.movingDirection.top = 0;
        this.movingDirection.left = 0;
        this.movingDirection.down = 0;
        this.movingDirection.right = 0;

        this.currentDirection = this.movingDirection.calculateDirection();
    }

    private attack() {
        if (this.currentAnimation != ASTRONAUT_ANIMS.ATTACK) {
            this.currentAnimation = ASTRONAUT_ANIMS.ATTACK;
            this.animationComponent.play("cocos_anim_attack");
            this.animationComponent.once(Animation.EventType.LASTFRAME, this.endAttack, this);
            this.isAttacking = true;

            if (this.enemyInAttackRange) {
                this.enemyComponent.knockout();
                this.audioComponent.play();
            }
        }
    }

    private endAttack() {
        this.isAttacking = false;
        this.returnToIdle();
    }

    private jump() {
        if (this.currentAnimation != ASTRONAUT_ANIMS.JUMP) {
            this.currentAnimation = ASTRONAUT_ANIMS.JUMP;
            this.animationComponent.play("cocos_anim_jump");
            this.animationComponent.once(Animation.EventType.LASTFRAME, this.returnToIdle, this);
        }
    }

    private returnToIdle() {
        this.currentAnimation = ASTRONAUT_ANIMS.IDLE;
        this.animationComponent.play("cocos_anim_idle");
    }

    private lieDown() {
        if (this.currentAnimation == ASTRONAUT_ANIMS.IDLE || this.currentAnimation == ASTRONAUT_ANIMS.CROUCH) {
            this.currentAnimation = ASTRONAUT_ANIMS.LIEDOWN;
            this.animationComponent.play("cocos_anim_down");
            this.animationComponent.once(Animation.EventType.LASTFRAME, this.returnToIdle, this);
        }
    }

    private crouch() {
        if (this.currentAnimation == ASTRONAUT_ANIMS.IDLE || this.currentAnimation == ASTRONAUT_ANIMS.LIEDOWN) {
            this.currentAnimation = ASTRONAUT_ANIMS.CROUCH;
            this.animationComponent.play("cocos_anim_squat");
            this.animationComponent.once(Animation.EventType.LASTFRAME, this.returnToIdle, this);
        }
    }

    public hit() {
        this.damageAudioSource.play();
        this.currentHealth -= 1;
        this.hubManager.setHealth(this.currentHealth);

        if (this.currentHealth <= 0) {
            director.loadScene("GameOver");
        }
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.keyPressDown, this);
        input.off(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
        input.off(Input.EventType.KEY_UP, this.keyUp, this);

        this.astronautCollider.off('onCollisionEnter', this.collisionEnter, this);
        this.astronautCollider.off('onCollisionExit', this.collisionExit, this);
        this.astronautCollider.off('onCollisionStay', this.collisionStay, this);
        this.astronautCollider.off('onTriggerEnter', this.triggerEnter, this);
    }
}
