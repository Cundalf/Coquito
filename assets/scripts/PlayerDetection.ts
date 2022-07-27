import { _decorator, Component, Node, SphereCollider, ICollisionEvent } from 'cc';
import { Astronaut } from './Astronaut';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('PlayerDetection')
export class PlayerDetection extends Component {

    private playerDetectionCollider: SphereCollider;

    @property(Enemy)
    private enemy: Enemy;

    start() {
        this.playerDetectionCollider = this.getComponent(SphereCollider);
        this.playerDetectionCollider.on('onTriggerEnter', this.collisionEnter, this);
    }

    collisionEnter(event: ICollisionEvent) {
        if (event.otherCollider.node.name == "Astronaut") {
            this.enemy.attack();
            event.otherCollider.node.getComponent(Astronaut).hit();
        }
    }
}

