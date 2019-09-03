import {
  NUM_TILES_X,
  NUM_TILES_Y,
  PLAYER_MOVEMENT_TIMEOUT
} from "@/constants";

export default class PlayerMovement {
  constructor (options = {}) {
    this.currentPosition = options.currentPosition;
    this.currentDirection = options.currentDirection;
    this.direction = options.direction;
    this.consecutiveStepsInDirection = options.consecutiveStepsInDirection;
    this.lastPlayerMovementUpdate = options.lastPlayerMovementUpdate;
    this._anticipatedPlayerPosition = this._getAnticipatedPlayerPosition();
    this._playerMovable = this._playerCanMove();
  }

  nextPosition () {
    this._updateConsecutiveStepsInDirection();

    return new Promise((resolve, reject) => {
      if(this.consecutiveStepsInDirection === 0){
        resolve({
          nextPosition: this.currentPosition,
          consecutiveStepsInDirection: this.consecutiveStepsInDirection,
        });
      }
      else if(this._playerMovable)
        setTimeout(() => {
          resolve({
            nextPosition: this._anticipatedPlayerPosition,
            consecutiveStepsInDirection: this.consecutiveStepsInDirection,
          });
        }, PLAYER_MOVEMENT_TIMEOUT);
      else
        reject();
    })
  }

  _updateConsecutiveStepsInDirection () {
    if(this.currentDirection === this.direction)
      this.consecutiveStepsInDirection++;
    else
      this.consecutiveStepsInDirection = 0;
  }

  _getAnticipatedPlayerPosition () {
    switch(this.direction) {
      case 'up':
        return [ this.currentPosition[0], this.currentPosition[1] - 1 ];
      case 'down':
        return [ this.currentPosition[0], this.currentPosition[1] + 1 ];
      case 'left':
        return [ this.currentPosition[0] - 1, this.currentPosition[1] ];
      case 'right':
        return [ this.currentPosition[0] + 1, this.currentPosition[1] ];
      default:
        throw new Error(`Player movement in unknown direction ${this.direction}.`);
    }
  }

  _playerCanMove () {
    return this._playerMovementTimeoutMet() && this._nextSpaceWalkable();
  }

  _playerMovementTimeoutMet () {
    return (new Date() - this.lastPlayerMovementUpdate) > PLAYER_MOVEMENT_TIMEOUT;
  }

  _nextSpaceWalkable () {
    return(
      this._anticipatedPlayerPosition[0] >= 0 &&
      this._anticipatedPlayerPosition[0] <= NUM_TILES_X - 1 &&
      this._anticipatedPlayerPosition[1] >= 0 &&
      this._anticipatedPlayerPosition[1] <= NUM_TILES_Y - 1
    );
  }
}