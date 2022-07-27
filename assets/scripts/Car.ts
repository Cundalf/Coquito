import { _decorator, Component, Node, BoxCollider, ICollisionEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {

    private carCollider: BoxCollider;

    start() {
        // Componentes
        this.carCollider = this.getComponent(BoxCollider);

        // Colisiones
        this.carCollider.on('onCollisionEnter', this.collisionEnter, this);
    }

    collisionEnter(event: ICollisionEvent): void {
        console.log("Car colisiono con: " + event.otherCollider.node.name);
    }
}

