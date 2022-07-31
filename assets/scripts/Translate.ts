import { _decorator, Component, Node, Enum, Label, find } from 'cc';
import { GameManager, GAME_MODE, LANGUAGES } from './GameManager';
import { LanguageManager } from './LanguageManager';
const { ccclass, property } = _decorator;

enum SCENES {
    NONE,
    MENU,
    WIN,
    GAMEOVER,
    EXTRA_TUTORIAL
}
Enum(SCENES);

@ccclass('Translate')
export class Translate extends Component {

    private gameManager: GameManager;

    @property({ type: SCENES })
    private scene: SCENES = SCENES.NONE;

    @property(Label)
    private menuSynopsisTitle: Label;

    @property(Label)
    private menuSynopsisText: Label;
    
    @property(Label)
    private menuControlsTitle: Label;

    @property(Label)
    private menuControlsText: Label;

    @property(Label)
    private playButtonText: Label;

    @property(Label)
    private extraButtonText: Label;

    @property(Label)
    private winGameText: Label;

    @property(Label)
    private winGameTitle: Label;

    @property(Label)
    private gameOverGameText: Label;

    @property(Label)
    private extraTutorial: Label;

    @property(Label)
    private extraTutorialPlay: Label;

    @property(Label)
    private goToMainMenuLabel: Label;


    onLoad() {

        let gameManagerNode: Node = find("GameManager");

        if (gameManagerNode == null) {
            console.error('I dont have a GameManager');
        } else {
            this.gameManager = gameManagerNode.getComponent(GameManager);
            
            if(this.gameManager.getCurrentLanguage() == LANGUAGES.ENGLISH) {
                this.applyTranslate(LanguageManager.ENGLISH);
            } else {
                this.applyTranslate(LanguageManager.SPANISH);
            }
        }
        
    }

    private applyTranslate(language: LanguageManager): void {
        switch(this.scene) {
            case SCENES.NONE:
                console.error('No scene selected');
                break;
            case SCENES.MENU:
                this.menuSynopsisTitle.string = language.getSynopsisTitle();
                this.menuSynopsisText.string = language.getSynopsisText();
                this.menuControlsTitle.string = language.getControlsTitle();
                this.menuControlsText.string = language.getControlsText();
                this.playButtonText.string = language.getPlay().toUpperCase();
                this.extraButtonText.string = language.getExtra().toUpperCase();
                break;
            case SCENES.WIN:
                if (this.gameManager.currentGameMode == GAME_MODE.SURVIVAL) {
                    this.winGameText.string = language.getWinNormalGame();
                } else {
                    this.winGameText.string = language.getWinExtraGame();
                }

                this.winGameTitle.string = language.getWinTitle();
                this.goToMainMenuLabel.string = language.getBackToTheMenu();

                break;
            case SCENES.GAMEOVER:
                if (this.gameManager.currentGameMode == GAME_MODE.SURVIVAL) {
                    this.gameOverGameText.string = language.getGameoverNormalGame();
                } else {
                    this.gameOverGameText.string = language.getGameoverExtraGame();
                }

                this.goToMainMenuLabel.string = language.getBackToTheMenu();
                break;
            case SCENES.EXTRA_TUTORIAL:
                this.extraTutorial.string = language.getExtraTutorial();
                this.extraTutorialPlay.string = language.getExtraPlay();
                break;
        }
    }
}

