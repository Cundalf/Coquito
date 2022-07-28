import { _decorator, Component, Node, game, director } from 'cc';
import { LanguageManager } from './LanguageManager';
const { ccclass, property } = _decorator;

export enum LANGUAGES {
    ENGLISH,
    SPANISH
}


@ccclass('GameManager')
export class GameManager extends Component {
    
    private language: LANGUAGES;

    start() {
        game.addPersistRootNode(this.node);
        console.log(LanguageManager.ENGLISH);
    }

    setEnglishDefaultLang() {
        this.language = LANGUAGES.ENGLISH;
        this.goToMainMenu();
    }

    setSpanishDefaultLang() {
        this.language = LANGUAGES.SPANISH;
        this.goToMainMenu();
    }

    goToMainMenu() {
        director.loadScene("Menu");
    }

    getCurrentLanguage(): LANGUAGES {
        return this.language;
    }
}
