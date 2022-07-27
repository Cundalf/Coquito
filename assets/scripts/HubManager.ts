import { _decorator, Component, Node, ProgressBar, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HubManager')
export class HubManager extends Component {

    private items = 0;
    private health = 0;
    private counter: number = 0;

    @property(Number)
    private targetItems: number = 8;

    @property(Number)
    private maxHealth: number = 4;

    @property(Number)
    private targetTime: number = 180;

    @property(ProgressBar)
    private healthPB: ProgressBar;

    @property(ProgressBar)
    private itemPB: ProgressBar;

    @property(ProgressBar)
    private timePB: ProgressBar;

    @property(Node)
    private healthBorder: Node;

    @property(Node)
    private itemBorder: Node;

    @property(Node)
    private timeBorder: Node;


    start() {
        this.timePB.progress = 0;
        this.health = this.maxHealth;
        this.timeBorder.active = false;

        this.updateHealthPB();
        this.updateItemPB();
    }

    update(deltaTime: number) {
        if (this.timePB.progress <= 1) {
            this.counter += deltaTime;

            this.timePB.progress = this.counter / this.targetTime;

            if (this.timePB.progress >= 1) {
                this.timeBorder.active = true;
                director.loadScene("GameOver");
            }
        }
    }

    setHealth(newHealth: number) {
        this.health = newHealth;
        this.updateHealthPB();
    }

    setItem(newItem: number) {
        this.items = newItem;
        this.updateItemPB();
    }

    private updateHealthPB() {
        this.healthPB.progress = this.health / this.maxHealth;

        if (this.healthPB.progress < 1) {
            this.healthBorder.active = false;
        }
    }

    private updateItemPB() {
        this.itemPB.progress = this.items / this.targetItems;

        if (this.itemPB.progress < 1) {
            this.itemBorder.active = false;
        }
    }

}

