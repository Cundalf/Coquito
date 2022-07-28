import { _decorator, Component, Node, ProgressBar, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HubManagerExtraGame')
export class HubManagerExtraGame extends Component {
    private health = 0;
    private counter: number = 0;

    @property(Number)
    private maxHealth: number = 30;

    @property(Number)
    private targetTime: number = 90;

    @property(ProgressBar)
    private healthPB: ProgressBar;

    @property(ProgressBar)
    private timePB: ProgressBar;

    @property(Node)
    private healthBorder: Node;

    @property(Node)
    private timeBorder: Node;


    start() {
        this.timePB.progress = 0;
        this.health = this.maxHealth;
        this.timeBorder.active = false;

        this.updateHealthPB();
    }

    update(deltaTime: number) {
        if (this.timePB.progress <= 1) {
            this.updateTime(deltaTime);
        }


        if (this.healthPB.progress >= 0) {
            this.updateHealth(deltaTime);
        }
    }

    private updateHealth(deltaTime: number) {
        this.health -= deltaTime;

        this.updateHealthPB();

        if (this.healthPB.progress >= 1) {
            director.loadScene("GameOver");
        }
    }

    private updateTime(deltaTime: number) {
        this.counter += deltaTime;

        this.timePB.progress = this.counter / this.targetTime;

        if (this.timePB.progress >= 1) {
            this.timeBorder.active = true;
            director.loadScene("Win");
        }
    }

    addHealth(points: number) {
        let newHealth = this.health + points;

        if (newHealth > this.maxHealth) {
            newHealth = this.maxHealth;
        }

        this.health = newHealth;
        this.updateHealthPB();
    }

    private updateHealthPB() {
        this.healthPB.progress = this.health / this.maxHealth;

        if (this.healthPB.progress < 1) {
            this.healthBorder.active = false;
        }
    }
}

