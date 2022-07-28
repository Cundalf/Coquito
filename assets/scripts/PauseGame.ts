import { _decorator, game } from 'cc';

export default abstract class PauseGame {

    static pause() {
        if (game.isPaused()) {
            game.resume();
        } else {
            game.pause();
        }
    }
}

