//global
const GAME_STATE = {START: 1, PLAY: 2, OVER: 3, END: 4};
let c = document.createElement("canvas")
  , ctx = c.getContext("2d")
  , keys = {}
  , all = []
  , bgObj = []
  , p = {}
  , i
  , fx = []
  , t = (new Date()).getTime()
  , data = { "score": 0, }
  , frame
  , duration
  , timeForAnimation
  , gameLoop
  , state = GAME_STATE.START
;
