import { _decorator, Component, Node, CylinderCollider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component {

    private readonly MIN_TIME_RELOAD: number = 30;
    private readonly MAX_TIME_RELOAD: number = 40;

    private cylinderCollider: CylinderCollider;

    @property(Node)
    private itemNodeChild: Node;
    private timeToReload: Number;

    private timeCounter: number = 0;
    private isItemActive: boolean;

    start() {
        this.cylinderCollider = this.getComponent(CylinderCollider);
        this.newTimeToReload();
        this.isItemActive = true;
    }

    update(deltaTime: number) {

        if (this.isItemActive) {
            return;
        }

        this.timeCounter += deltaTime;

        if (this.timeCounter >= this.timeToReload) {
            this.cylinderCollider.enabled = true;
            this.itemNodeChild.active = true;
            this.timeCounter = 0;
            this.isItemActive = true;
            this.newTimeToReload();
        }
    }

    public disableItem() {
        this.cylinderCollider.enabled = false;
        this.itemNodeChild.active = false;
        this.isItemActive = false;
    }

    private newTimeToReload() {
        this.timeToReload = Math.floor(Math.random() * (this.MAX_TIME_RELOAD - this.MIN_TIME_RELOAD)) + this.MIN_TIME_RELOAD;
    }
}
