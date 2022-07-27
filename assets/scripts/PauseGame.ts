import { _decorator, Component, game } from 'cc';
const { ccclass } = _decorator;

@ccclass('PauseGame')
export class PauseGame extends Component {

    pause() {
        if (game.isPaused()) {
            game.resume();
        } else {
            game.pause();
        }
    }
}

