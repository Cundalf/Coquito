import { _decorator, Component, Node, game, director } from 'cc';
const { ccclass } = _decorator;

export enum LANGUAGES {
    ENGLISH,
    SPANISH
}

export enum GAME_MODE {
    SURVIVAL,
    TIME_TRIAL
}

@ccclass('GameManager')
export class GameManager extends Component {
    
    private language: LANGUAGES;
    private _currentGameMode: GAME_MODE;

    start() {
        game.addPersistRootNode(this.node);
    }

    setEnglishDefaultLang() {
        this.language = LANGUAGES.ENGLISH;
        this.goToMainMenu();
    }

    setSpanishDefaultLang() {
        this.language = LANGUAGES.SPANISH;
        this.goToMainMenu();
    }

    private goToMainMenu() {
        director.loadScene("Menu");
    }

    getCurrentLanguage(): LANGUAGES {
        return this.language;
    }

    get currentGameMode() {
        return this._currentGameMode;
    }

    set currentGameMode(newGameMode: GAME_MODE) {
        this._currentGameMode = newGameMode;
    }
}
