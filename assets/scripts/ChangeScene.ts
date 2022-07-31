import { _decorator, Component, Node, director, find } from 'cc';
import { GameManager, GAME_MODE } from './GameManager';
const { ccclass } = _decorator;

@ccclass('ChangeScene')
export class ChangeScene extends Component {

    private gameManager: GameManager;

    start() {
        const gameManagerNode = find("GameManager");

        if (gameManagerNode == null) {
            console.error('I dont have a GameManager');
        } else {
            this.gameManager = gameManagerNode.getComponent(GameManager);
        }
    }

    returnToMenu() {
        director.loadScene("Menu");
    }

    startGame() {
        this.gameManager.currentGameMode = GAME_MODE.SURVIVAL;
        director.loadScene("Game");
    }

    startExtraGame() {
        director.loadScene("GameExtra");
    }

    goToExtraTutorial() {
        this.gameManager.currentGameMode = GAME_MODE.TIME_TRIAL;
        director.loadScene("ExtraTutorial");
    }
}

