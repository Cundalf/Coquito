export class LanguageManager {

    private _synopsis_title: string;
    private _synopsis_text: string;
    private _controls_title: string;
    private _controls_text: string;
    private _play: string;
    private _extra: string;
    private _win_normal_game: string;
    private _win_extra_game: string;
    private _gameover_normal_game: string;
    private _gameover_extra_game: string;
    private _extra_tutorial: string;
    private _win_title: string;
    private _back_to_menu: string;
    private _extra_play: string;
    private _credits: string;

    static readonly ENGLISH  = new LanguageManager()
        .synopsisTitle('Synopsis')
        .synopsisText("Coquito broke his helmet in the invasion of Earth. Assisted by some humble earthlings, he realized that he had to return the favor. He decided as a first step, to delay the invasion by taking the supplies that his colleagues brought. Without the helmet he won't be able to survive long... He has to act fast!")
        .controlsTitle("Controls")
        .controlsText("Move Coquito with the keys W, A, S and D. You can run by pressing the SHIFT key. At this time of day your colleagues can't see well with their helmet. But if you get too close, they might want to stop you. If they get too annoying, with the letter Q or with Click you can temporarily knock them out. Collect all the objects before it's too late.")
        .play("Play")
        .extra("Extra")
        .winNormalGame("Now Coquito has more serious problems waiting for him... But his new friends will be safe for a while... To be continue...")
        .winExtraGame("You did it, Coquito could continue telling his story...")
        .gameoverNormalGame("You did not fulfill your purpose. Many terrestrials are now to their own fate...")
        .gameoverExtraGame("This was the end of Coquito")
        .extraTutorial("Things are complicated. Coquito must put up with them coming to save him, he must put up with it no matter what...")
        .winTitle("You Did")
        .backToTheMenu("Back to menu")
        .extraPlay("Play")
        .credits("Credits");

    static readonly SPANISH = new LanguageManager()
        .synopsisTitle('Sinopsis')
        .synopsisText('A Coquito se le rompio su casco en la invasion a la tierra. Asistido por unos humildes terrestres, se dio cuenta que debia devolverles el favor. Decidio retrasar la invasion llevandose las provisiones que trajeron sus colegas como un primer paso. Sin el casco no podra sobrevivir mucho tiempo... Tiene que actuar rapido!')
        .controlsTitle("Controles")
        .controlsText("Mueve a Coquito con las teclas W, A, S y D. Puede correr presionando la tecla SHIFT. A estas horas del dia tus colegas no pueden ver bien con su casco. Pero si te acercas demasiado puede ser que te quieran detener. Si se vuelven muy molestos, con la letra Q o con Clic puedes noquearlos temporalmente. Recolecta todos los objetos antes que sea demasiado tarde.")
        .play("Jugar")
        .extra("Extra")
        .winNormalGame("Ahora a Coquito le esperan problemas mas graves... Pero sus nuevos amigos estaran a salvo un tiempo... Continuara...")
        .winExtraGame("Lo lograste, Coquito podra continuar contando su historia...")
        .gameoverNormalGame("No cumpliste tu proposito. Muchos terrestres estan ahora a su propia suerte...")
        .gameoverExtraGame("Este fue el fin de Coquito")
        .extraTutorial("Las cosas estan complicadas. Coquito debe aguantar a que vengan a salvarlo, debe aguantar como sea...")
        .winTitle("Lo has logrado")
        .backToTheMenu("Volver al menu")
        .extraPlay("Jugar")
        .credits("Creditos");

    newLang(): LanguageManager {
        return new LanguageManager();
    }
    
    synopsisTitle(text: string): LanguageManager {
        this._synopsis_title = text;
        return this;
    }
    
    getSynopsisTitle(): string {
        return this._synopsis_title;
    }

    synopsisText(text: string): LanguageManager {
        this._synopsis_text = text;
        return this;
    }

    getSynopsisText(): string {
        return this._synopsis_text;
    }

    controlsTitle(text: string): LanguageManager {
        this._controls_title = text;
        return this;
    }

    getControlsTitle(): string {
        return this._controls_title;
    }

    controlsText(text: string): LanguageManager {
        this._controls_text = text;
        return this;
    }

    getControlsText(): string {
        return this._controls_text;
    }

    play(text: string): LanguageManager {
        this._play = text;
        return this;
    }

    getPlay(): string {
        return this._play;
    }

    extra(text: string): LanguageManager {
        this._extra = text;
        return this;
    }

    getExtra(): string {
        return this._extra;
    }

    winNormalGame(text: string): LanguageManager {
        this._win_normal_game = text;
        return this;
    }

    getWinNormalGame(): string {
        return this._win_normal_game;
    }

    winExtraGame(text: string): LanguageManager {
        this._win_extra_game = text;
        return this;
    }

    getWinExtraGame(): string {
        return this._win_extra_game;
    }

    gameoverNormalGame(text: string): LanguageManager {
        this._gameover_normal_game = text;
        return this;
    }

    getGameoverNormalGame(): string {
        return this._gameover_normal_game;
    }

    gameoverExtraGame(text: string): LanguageManager {
        this._gameover_extra_game = text;
        return this;
    }

    getGameoverExtraGame(): string {
        return this._gameover_extra_game;
    }

    extraTutorial(text: string): LanguageManager {
        this._extra_tutorial = text;
        return this;
    }

    getExtraTutorial(): string {
        return this._extra_tutorial;
    }

    winTitle(text: string): LanguageManager {
        this._win_title = text;
        return this;
    }

    getWinTitle(): string {
        return this._win_title;
    }

    backToTheMenu(text: string): LanguageManager {
        this._back_to_menu = text;
        return this;
    }

    getBackToTheMenu(): string {
        return this._back_to_menu;
    }

    extraPlay(text: string): LanguageManager {
        this._extra_play = text;
        return this;
    }

    getExtraPlay(): string {
        return this._extra_play;
    }

    credits(text: string): LanguageManager {
        this._credits = text;
        return this;
    }

    getCredits(): string {
        return this._credits;
    }
}

