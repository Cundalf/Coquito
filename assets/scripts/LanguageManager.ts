abstract class lang {
    _synopsis_title: string;
    _synopsis_text: string;
    _controls_title: string;
    _controls_text: string;
    _play: string;
    _extra: string;
    _win_normal_game: string;
    _win_extra_game: string;
    _gameover_normal_game: string;
    _gameover_extra_game: string;
}

export class LanguageManager extends lang {

    static readonly ENGLISH  = new LanguageManager()
        .synopsis_title('Synopsis')
        .synopsis_text("Coquito broke his helmet in the invasion of Earth. Assisted by some humble earthlings, he realized that he had to return the favor. He decided as a first step, to delay the invasion by taking the supplies that his colleagues brought. Without the helmet he won't be able to survive long... He has to act fast!")
        .controls_title("Controls")
        .controls_text("Move Coquito with the keys W, A, S and D. You can run by pressing the SHIFT key. At this time of day your colleagues can't see well with their helmet. But if you get too close, they might want to stop you. If they get too annoying, with the letter Q or with Click you can temporarily knock them out. Collect all the objects before it's too late.")
        .play("Play")
        .extra("Extra")
        .win_normal_game("Now Coquito has more serious problems waiting for him... But his new friends will be safe for a while... To be continue...")
        .win_extra_game("You did it, Coquito could continue telling his story...")
        .gameover_normal_game("You did not fulfill your purpose. Many terrestrials are now to their own fate...")
        .gameover_extra_game("This was the end of Coquito");

    static readonly SPANISH = new LanguageManager()
        .synopsis_title('Sinopsis')
        .synopsis_text('A Coquito se le rompio su casco en la invasion a la tierra. Asistido por unos humildes terrestres, se dio cuenta que debia devolverles el favor. Decidio retrasar la invasion llevandose las provisiones que trajeron sus colegas como un primer paso. Sin el casco no podra sobrevivir mucho tiempo... Tiene que actuar rapido!')
        .controls_title("Controles")
        .controls_text("Mueve a Coquito con las teclas W, A, S y D. Puede correr presionando la tecla SHIFT. A estas horas del dia tus colegas no pueden ver bien con su casco. Pero si te acercas demasiado puede ser que te quieran detener. Si se vuelven muy molestos, con la letra Q o con Clic puedes noquearlos temporalmente. Recolecta todos los objetos antes que sea demasiado tarde.")
        .play("Jugar")
        .extra("Extra")
        .win_normal_game("Ahora a Coquito le esperan problemas mas graves... Pero sus nuevos amigos estaran a salvo un tiempo... Continuara...")
        .win_extra_game("Lo lograste, Coquito podra continuar contando su historia...")
        .gameover_normal_game("No cumpliste tu proposito. Muchos terrestres estan ahora a su propia suerte...")
        .gameover_extra_game("Este fue el fin de Coquito");

    newLang(): LanguageManager {
        return new LanguageManager();
    }
    
    synopsis_title(text: string): LanguageManager {
        super._synopsis_title = text;
        return this;
    }

    synopsis_text(text: string): LanguageManager {
        super._synopsis_text = text;
        return this;
    }

    controls_title(text: string): LanguageManager {
        super._controls_title = text;
        return this;
    }

    controls_text(text: string): LanguageManager {
        super._controls_text = text;
        return this;
    }

    play(text: string): LanguageManager {
        super._play = text;
        return this;
    }

    extra(text: string): LanguageManager {
        super._extra = text;
        return this;
    }

    win_normal_game(text: string): LanguageManager {
        super._win_normal_game = text;
        return this;
    }

    win_extra_game(text: string): LanguageManager {
        super._win_extra_game = text;
        return this;
    }

    gameover_normal_game(text: string): LanguageManager {
        super._gameover_normal_game = text;
        return this;
    }

    gameover_extra_game(text: string): LanguageManager {
        super._gameover_extra_game = text;
        return this;
    }
}

