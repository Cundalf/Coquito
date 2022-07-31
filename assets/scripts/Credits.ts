import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Credits')
export class Credits extends Component {
    
    @property(Node)
    private credits: Node;

    openCredits() {
        this.credits.active = true;
    }

    closeCredits() {
        this.credits.active = false;
    }

}

