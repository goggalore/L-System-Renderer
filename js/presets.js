var sTriangle = {
  iterations: 7,
  angle: 120,
  axiom: 'F−G−G',
  variables: ['F', 'G'],
  rules: {
    'F': 'F-G+F+G-F',
    'G': 'GG'
  },
  orientation: 96
};

var dragon = {
  iterations: 14,
  angle: 90,
  axiom: 'FX',
  variables: ['X', 'Y'],
  rules: {
    'X': 'X+YF+',
    'Y': '−FX−Y'
  },
  orientation: 0  
};

var fPlant = {
  iterations: 7,
    angle: 25,
    axiom: 'X',
    variables: ['X', 'F'],
    rules: {
      'X': 'F[−X][X]F[−X]+FX',
      'F': 'FF'
    },
    orientation: 90 
};

var hCircle = {
  iterations: 9,
    angle: 109,
    axiom: 'X',
    variables: ['X'],
    rules: {
      'X': 'X+A+X',
    },
    orientation: 0 
};

var kCurve = {
  iterations: 5,
    angle: 90,
    axiom: 'F',
    variables: ['F'],
    rules: {
      'F': 'F+F−F−F+F',
    },
    orientation: 0
};

var fBush = {
  iterations: 5,
    angle: 22,
    axiom: 'F',
    variables: ['F'],
    rules: {
      'F': 'XFF-[Y-F+F+F]+[Y+F-F-F]',
    },
    orientation: 90
};

var lSystemDescription = 'An L-System is a type of formal grammar that consists of a set of symbols and rules that are used to make \'strings\' \n Initially, the system is given an intitial axiom (i.e. a string) of symbols and a rule set of the symbols\' initial states and final states -- what each symbol should map to each iteration.\n\nUltimately, we can give meaning to these symbols, like "A" means draw forward, and "+" means rotate by an angle, to draw the computed strings to produce mesmerizing self similar images, as in this web app.\n\nClick the "commands" button to see how symbols are denoted in this L-System renderer. \n\nRead more at https://en.wikipedia.org/wiki/L-system'

var commandDescription = '+ means rotate counterclockwise by angle\n\n- means Rotate clockwise by angle\n\n[ means save current position and angle\n\n] means return to the most recently saved position and angle\n\nC, W, X, Y, Z do not correlate to any specific command and are used to control the evolution of a path\n\nAny other lower or uppercase character (i.e. F) denote draw forward\n\nNote that "angle" refers to the angle of which + and - rotate by and "orientation" refers to the orientation of the overall image'