export enum DIRECTIONS {
    IDLE,
    TOP,
    DOWN,
    RIGHT,
    LEFT,
    TOPRIG,
    TOPLEF,
    DOWRIG,
    DOWLEF
}

export class MovingDirection {
    private _top: number = 0;
    private _left: number = 0;
    private _right: number = 0;
    private _down: number = 0;

    public get top() {
        return this._top;
    }

    public set top(top: number) {
        this._top = top;
    }

    public get left() {
        return this._left;
    }

    public set left(left: number) {
        this._left = left;
    }

    public get rigth() {
        return this._right;
    }

    public set right(right: number) {
        this._right = right;
    }

    public get down() {
        return this._down;
    }

    public set down(down: number) {
        this._down = down;
    }

    public calculateDirection(): DIRECTIONS {

        let total = this._top + this._left + this._down + this._right;

        if (total == 0) {
            return DIRECTIONS.IDLE;
        }

        if (total >= 4) {
            if (this._top == 2) {
                if (this._left == 2) {
                    return DIRECTIONS.TOPLEF;
                }
                else if (this._right == 2) {
                    return DIRECTIONS.TOPRIG;
                }
            }
            
            if (this._down == 2) {
                if (this._left == 2) {
                    return DIRECTIONS.DOWLEF;
                }
                else if (this._right == 2) {
                    return DIRECTIONS.DOWRIG;
                }
            }
        }
        else {
            
            if (this._top == 2) {
                return DIRECTIONS.TOP;
            }

            if (this._down == 2) {
                return DIRECTIONS.DOWN;
            }

            if (this._left == 2) {
                return DIRECTIONS.LEFT;
            }

            if (this._right == 2) {
                return DIRECTIONS.RIGHT;
            }
        }
    
    }
}

