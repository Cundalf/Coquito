import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeScene')
export class ChangeScene extends Component {
    returnToMenu() {
        director.loadScene("Menu");
    }

    startGame() {
        director.loadScene("Game");
    }
}

