import { _decorator, Component, Node, SkeletalAnimation, Animation, CylinderCollider, ICollisionEvent } from 'cc';
import { DIRECTIONS } from './MovingDirection';
const { ccclass, property } = _decorator;

enum ENEMY_ANIMS {
    IDLE,
    WALK,
    ATTACK,
    LIEDOWN,
}

@ccclass('Enemy')
export class Enemy extends Component {

    private readonly WAITING_TIME = 3;
    private readonly KNOCKOUT_TIME = 4;
    private readonly LINEAL_VELOCITY_WALK = 0.1; // 0.05
    private readonly DIAGONAL_VELOCITY_WALK = 0.1414; // 0.0707

    private timeCounter: number = 0;
    private enemyDirecction: DIRECTIONS = DIRECTIONS.IDLE;
    private enemyAnimation: ENEMY_ANIMS = ENEMY_ANIMS.IDLE;
    private enemyAnimationComponent: Animation;
    private reset: boolean;
    private astronautCollider: CylinderCollider;

    start(): void {
        this.enemyAnimationComponent = this.getComponent(SkeletalAnimation);
        this.astronautCollider = this.getComponent(CylinderCollider);

        this.astronautCollider.on('onCollisionEnter', this.collisionEnter, this);

        this.timeCounter = Math.floor(Math.random() * this.WAITING_TIME);
    }

    onDestroy(): void {
        this.astronautCollider.off('onCollisionEnter', this.collisionEnter, this);
    }

    update(deltaTime: number): void {

        if (this.enemyAnimation != ENEMY_ANIMS.ATTACK) {
            this.timeCounter += deltaTime;
        }

        if (this.enemyAnimation == ENEMY_ANIMS.LIEDOWN && this.timeCounter >= this.KNOCKOUT_TIME) {
            this.enemyAnimation = ENEMY_ANIMS.IDLE;
            this.reset = true;
        }

        if (this.enemyAnimation != ENEMY_ANIMS.LIEDOWN && (this.timeCounter >= this.WAITING_TIME || this.reset)) {
            this.reset = false;
            this.timeCounter = 0;
            this.enemyDirecction = this.getNewDirection();
            this.enemyAnimationControl();
        }

        if (this.enemyAnimation == ENEMY_ANIMS.WALK) {

            let currentPosition = this.node.position;

            switch (this.enemyDirecction) {
                case DIRECTIONS.TOP:
                    this.node.setPosition(currentPosition.x + this.LINEAL_VELOCITY_WALK, currentPosition.y, currentPosition.z - this.LINEAL_VELOCITY_WALK);
                    this.node.setRotationFromEuler(0, 135, 0);
                    break;
                case DIRECTIONS.DOWN:
                    this.node.setPosition(currentPosition.x - this.LINEAL_VELOCITY_WALK, currentPosition.y, currentPosition.z + this.LINEAL_VELOCITY_WALK);
                    this.node.setRotationFromEuler(0, 315, 0);
                    break;
                case DIRECTIONS.RIGHT:
                    this.node.setPosition(currentPosition.x + this.LINEAL_VELOCITY_WALK, currentPosition.y, currentPosition.z + this.LINEAL_VELOCITY_WALK);
                    this.node.setRotationFromEuler(0, 45, 0);
                    break;
                case DIRECTIONS.LEFT:
                    this.node.setPosition(currentPosition.x - this.LINEAL_VELOCITY_WALK, currentPosition.y, currentPosition.z - this.LINEAL_VELOCITY_WALK);
                    this.node.setRotationFromEuler(0, 225, 0);
                    break;
                case DIRECTIONS.TOPRIG:
                    this.node.setPosition(currentPosition.x + this.DIAGONAL_VELOCITY_WALK, currentPosition.y, currentPosition.z);
                    this.node.setRotationFromEuler(0, 90, 0);
                    break;
                case DIRECTIONS.TOPLEF:
                    this.node.setPosition(currentPosition.x, currentPosition.y, currentPosition.z - this.DIAGONAL_VELOCITY_WALK);
                    this.node.setRotationFromEuler(0, 180, 0);
                    break;
                case DIRECTIONS.DOWRIG:
                    this.node.setPosition(currentPosition.x, currentPosition.y, currentPosition.z + this.DIAGONAL_VELOCITY_WALK);
                    this.node.setRotationFromEuler(0, 0, 0);
                    break;
                case DIRECTIONS.DOWLEF:
                    this.node.setPosition(currentPosition.x - this.DIAGONAL_VELOCITY_WALK, currentPosition.y, currentPosition.z);
                    this.node.setRotationFromEuler(0, 270, 0);
                    break;
            }
        }
    }

    private collisionEnter(event: ICollisionEvent) {
        if (event.otherCollider.node.name.toLowerCase() == "limit") {
            this.reset = true;
        }
    }

    private getNewDirection(): number {
        return Math.floor(Math.random() * 8) + 1;
    }

    private enemyAnimationControl(): void {
        let random = Math.floor(Math.random() * 100) + 1;
        let newAnimation: ENEMY_ANIMS = ENEMY_ANIMS.IDLE;

        if (random > 25) {
            newAnimation = ENEMY_ANIMS.WALK;
        }

        if (this.enemyAnimation != newAnimation) {
            this.enemyAnimation = newAnimation;

            if (this.enemyAnimation == ENEMY_ANIMS.IDLE) {
                this.enemyAnimationComponent.play("cocos_anim_idle");
            }
            else if (this.enemyAnimation == ENEMY_ANIMS.WALK) {
                this.enemyAnimationComponent.play("cocos_anim_walk");
            }
        }
    }

    private endAttack(): void {
        this.reset = true;
    }


    public attack() {
        this.enemyAnimation = ENEMY_ANIMS.ATTACK;
        this.enemyAnimationComponent.play("cocos_anim_attack");
        this.enemyAnimationComponent.once(Animation.EventType.LASTFRAME, this.endAttack, this);
    }

    public knockout() {
        this.enemyAnimation = ENEMY_ANIMS.LIEDOWN;
        this.enemyAnimationComponent.play("cocos_anim_down");
        this.enemyAnimationComponent.once(Animation.EventType.LASTFRAME, this.endKnockoutAnim, this);
        this.timeCounter = 0;
    }

    private endKnockoutAnim() {
        this.enemyAnimationComponent.play("cocos_anim_idle");
    }
}

