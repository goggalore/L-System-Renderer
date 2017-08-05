generateDomElements();
addEventListeners();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var center = {x: canvas.width/2, y: canvas.height/2};
var maxDimension = {width: canvas.width * 0.5, height: canvas.height * 0.85};

window.onresize = function () {
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  center = {x: canvas.width/2, y: canvas.height/2};
  maxDimension = {width: canvas.width * 0.5, height: canvas.height * 0.85};
  
  drawSystem();
}

function drawSystem(event) {
  
  context.restore();
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  var model = getModel();
  var lString = lSystem(model, model.iterations);
  
  if (lString === 'ERROR' && model.axiom != false) {
    sweetAlert({title: 'Image too complex to compute!',
                text: 'Try lowering the number of iterations'});
    return false;
  }
  
  var path = computePath(lString, model.angle, model.orientation);
  var bounds = getBounds(path);
  var scale = computeScale(bounds, maxDimension);
  
  context.save();
  context.beginPath();
  
  context.scale(scale, scale);
  context.translate(center['x']/scale - bounds.center['x'],
                   center['y']/scale - bounds.center['y']);
  context.lineWidth = 1/scale;
  context.strokeStyle = "black"
  
  for (var i = 0; i < path.length; i++) {
    if (path[i]['action'] === 'draw') {
      context.lineTo(path[i].x, path[i].y);
    }
    else {
      context.moveTo(path[i].x, path[i].y);
    }
  }
  context.stroke();
  
}

function lSystem(model, iterations) {
  
  var result = model.axiom.split('');
  var MAXLENGTH = 1000000; // to disallow this string from getting too huge

  for(var i = 0; i < iterations; i++) {
    result = result.map(function(char) {
      if(model.rules[char] === undefined) {
        return char;
      }
      else {
        char = model.rules[char];
        return char;
      }
    }).join('').split('');
    
    if (result.length > MAXLENGTH) {
      result = 'ERROR';
      return result;
    }
  }
  
  return result.join('');
}


function computePath(string, angle, orientation) {
  
  const RADIUS = 1;  
  var position = {
    x: 0, 
    y: 0,
    action: 'move'
  };
  var positionStack = []; 
  var path = [{x: position.x, y: position.y}];
  var char = '';
  
  angle *= Math.PI / 180
  orientation = orientation * Math.PI / 180; 
  
  for (var i in string) {
    char = string[i];
    
    if (isLowerAlpha(char)) {
      path.push({x: position.x, y: position.y, action: 'draw'});
    }
    
    else {
      switch(char) {
      case '+':
        orientation += angle;
        break;
      case '-': 
      case '−':
        orientation -= angle;
        break;
      case '[':
        positionStack.push({x: position.x, y: position.y, orientation: orientation});
        break;
      case ']':
        var temp = positionStack.pop();
        position.x = temp.x;
        position.y = temp.y;
        orientation = temp.orientation;
        path.push({x: position.x, y: position.y, action: 'move'});
        break;
      default:
        position.x += RADIUS * Math.cos(orientation); 
        position.y -= RADIUS * Math.sin(orientation);
        path.push({x: position.x, y: position.y, action: 'draw'});
        break;
      }
    }
  }
  
  return path;
}

function isLowerAlpha(char) {
  
  var charIndex = char.charCodeAt();
  
  if (charIndex >= 'a'.charCodeAt() && charIndex <= 'z'.charCodeAt()) {
    return true;
  }
  
  return false;
}

function getBounds(path) {
  
  var xPos = [];
  var yPos = [];
  
  for (var i = 0; i < path.length; i++) {
    xPos.push(path[i].x);
    yPos.push(path[i].y);
  }
  
  var xMax = xPos.reduce(function(a, b) {
    return Math.max(a, b);
  });
  
  var yMax = yPos.reduce(function(a, b) {
    return Math.max(a, b);
  });
  
  var xMin = xPos.reduce(function(a, b) {
    return Math.min(a, b);
  });
  
  var yMin = yPos.reduce(function(a, b) {
    return Math.min(a, b);
  });
  
  var bounds = {
    xMin: xMin,
    xMax: xMax,
    yMin: yMin,
    yMax: yMax
  };
  
  var center = {
    x: (xMin + xMax)/2,
    y: (yMin + yMax)/2
  };
  
  bounds['center'] = center;
  
  return bounds;
                         
}

function computeScale(bounds, maxDimension) {
  
  var scale = 1;
  var dimension = {
    width: bounds.xMax - bounds.xMin,
    height: bounds.yMax - bounds.yMin
  };

  if (maxDimension.width/dimension.width <=
      maxDimension.height/dimension.height) {
    scale = maxDimension.width / dimension.width;
  }
  else {
    scale = maxDimension.height / dimension.height;
  }
  
  return scale;
}