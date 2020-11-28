//global
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
;