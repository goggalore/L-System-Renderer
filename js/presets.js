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
  axiom: 'Fx',
  variables: ['x', 'y'],
  rules: {
    'x': 'x+yF+',
    'y': '−Fx−y'
  },
  orientation: 0  
};

var fPlant = {
  iterations: 7,
    angle: 25,
    axiom: 'x',
    variables: ['x', 'F'],
    rules: {
      'x': 'F[−x][x]F[−x]+Fx',
      'F': 'FF'
    },
    orientation: 90 
};

var hCircle = {
  iterations: 9,
    angle: 109,
    axiom: 'x',
    variables: ['x'],
    rules: {
      'x': 'x+A+x',
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
      'F': 'xFF-[y-F+F+F]+[y+F-F-F]',
    },
    orientation: 90
};

var lSystemDescription = 'An L-System is a type of formal grammar that consists of a set of symbols and rules that are used to make \'strings\'. \n Initially, the system is given an intitial axiom (i.e. a string) of symbols and a rule set of the symbols\' initial states and final states -- what each symbol should map to each iteration. Each iteration, the string is replaced with the mappings which results in a final string\n\nUltimately, we can give meaning to these symbols, like "A" means draw forward, and "+" means rotate by an angle, to draw the computed strings to produce mesmerizing self similar images, as in this web app.\n\nClick the "commands" button to see how symbols are denoted in this L-System renderer. \n\nRead more at https://en.wikipedia.org/wiki/L-system'

var commandDescription = '+ means rotate counterclockwise by angle\n\n- means rotate clockwise by angle\n\n[ means save current position and angle\n\n] means return to the most recently saved position and angle\n\nLower case letters do not correlate to any specific command and are used to control the evolution of a path\n\nAny other characters (i.e. F) denote draw forward\n\nNote that "angle" refers to the angle of which + and - rotate by and "orientation" refers to the orientation of the overall image'

// objects for generating HTML DOM
var input = {
  iterations: {
    placeholder: 'Iterations',
    type: 'number',
    min: '0',
    createDiv: true
  },
  angle: {
    placeholder: 'Angle (in degrees)',
    type: 'number',
    createDiv: true
  },
  axiom: {
    placeholder: 'Axiom',
    type: 'text',
    createDiv: true
  }};
var initialState = {
  initialState: {
    placeholder: 'Initial State',
    type: 'text',
    maxLength: '1',
    createDiv: true
  }};
var finalState = {
  finalState: {
    placeholder: 'Final State',
    type: 'text',
    createDiv: false
  }};
var orientation = {
  orientation: {
    placeholder: 'Orientation (in degrees)',
    type: 'number',
    createDiv: true
  }};

var info = {
    lSystem: {
      innerHTML: 'What\'s an L-System?',
      createDiv: true
    },
    commands: {
      innerHTML: 'Commands',
      createDiv: false
    }};

var presets = {
    sTriangle: {
      innerHTML: 'Sierpinski Triangle',
      createDiv: true,
    },
    dragon: {
      innerHTML: 'Dragon Curve',
      createDiv: false
    },
    fPlant: {
      innerHTML: 'Fractal Plant',
      createDiv: false
    },
    fBush: {
      innerHTML: 'Fractal Bush',
      createDiv: false
    },
    hCircle: {
      innerHTML: 'Hypnotic Circle',
      createDiv: false
    },
    kCurve: {
      innerHTML: 'Kock Curve',
      createDiv: false
    }};