// first ever project in JS

// executes when the DOM is fully loaded
window.onload = function() {
  
  form.setAttribute('autocomplete', 'off');
  
  // intialize canvas
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');  
  
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  
  var center = {x: canvas.width/2, y: canvas.height/2};
  var maxDimension = {width: canvas.width * 0.5, height: canvas.height * 0.85};
  
  var userSystem = document.querySelector('#form');
  var infoButtons = document.querySelector('#info');
  var presetButtons = document.querySelector('#presets');
  
  function drawSystem(event) {
    
    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var model = getModel();    
    var lString = lSystem(model, model.iterations);   
    
    if (lString == 'ERROR' && model.axiom != false) {
      sweetAlert({title: 'Image too complex to compute!',
           text: 'Try lowering the number of iterations'});
      return false;
    }
    
    var path = computePath(lString, model.angle, model.orientation);
    var bounds = getBounds(path);   
    var scale = computeScale(bounds, maxDimension);
    
    ctx.save();
    ctx.beginPath();
    
    ctx.scale(scale, scale);
    ctx.translate(center['x']/scale - bounds.center['x'], center['y']/scale - bounds.center['y']);
    ctx.lineWidth = 1/scale;
    
    for (var k = 0; k < path.length; k++) {
      if (path[k]['action'] == 'draw') {
        ctx.lineTo(path[k].x, path[k].y); 
      }
      else {
        ctx.moveTo(path[k].x, path[k].y);
      }
    }
    ctx.stroke();
    
  }
  
  for (var i = 0; i < userSystem.length; i++) {
    userSystem[i].addEventListener('input', drawSystem);
  }
  
  infoButtons['lsystem'].addEventListener('click', function(event) { 
    swal({
    title: 'What\'s an L-System?',
    text: lSystemDescription});
    event.preventDefault(); 
  });
  
  infoButtons['commands'].addEventListener('click', function(event) { 
    swal({
    title: 'Commands',
    text: commandDescription});
    event.preventDefault(); 
  });
  
  for (var l = 0; l < presetButtons.length; l++) {
    presetButtons[l].addEventListener('click', function(event) {
      setPreset(window[this.name]);
      drawSystem(); 
      event.preventDefault();
    });
}
 
  window.onresize = function() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    center = {x: canvas.width/2, y: canvas.height/2};
    maxDimension = {width: canvas.width * 0.5, height: canvas.height * 0.85};
    drawSystem();
  }
}

function lSystem(model, iterations) {
  
  var result = model.axiom.split('');
  var MAXLENGTH = 1000000; // to disallow this string from getting too huge

  for(var l = 0; l < iterations; l++) {
    result = result.map(function(char) {
      if(model.rules[char] == undefined) {
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
  angle *= Math.PI / 180;
  
  var position = {
    x: 0, 
    y: 0,
    action: 'move'
  };
  
  orientation = orientation * Math.PI / 180; 
  
  var positionStack = []; 
  var path = [{x: position.x, y: position.y}];
  
  for(var i = 0; i < string.length; i++) {
    switch(string[i]) {
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
      case 'C':
      case 'W':
      case 'X':
      case 'Y':
      case 'Z':
        path.push({x: position.x, y: position.y, action: 'draw'});
        break;
      default:
        position.x += RADIUS * Math.cos(orientation); 
        position.y -= RADIUS * Math.sin(orientation);
        path.push({x: position.x, y: position.y, action: 'draw'});
        break;
    }
  }
  
  return path;
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

function getModel() { 
  
  var form = document.querySelector('#form');
  var model = {axiom: '',
               rules: {}};
  
  model['iterations'] = form['iterations'].value;
  model['axiom'] = form['axiom'].value;
  model['angle'] = form['angle'].value;
  model['orientation'] = form['orientation'].value;
  
  for (var i = 0; i < form.length; i++) {
    if (form[i].name == 'initialState') {
      model.rules[form[i].value] = form[i + 1].value;
    }
  }
  
  return model;
}

function setPreset(model) {
  
  var form = document.querySelector('#form');
  var counter = 0;
  
  form['iterations'].value = model.iterations;
  form['angle'].value = model.angle;
  form['axiom'].value = model.axiom;
  form['orientation'].value = model.orientation;
    
  for (var i = 0; i < form.length; i++) {
    if (form[i].name == 'initialState') {
      form[i].value = model.variables[counter];
    }
    
    else if (form[i].name == 'finalState') {
      form[i].value = model.rules[model.variables[counter]];
      counter++;
    }
    
    // don't show that these are undefined on UI if undefined
    if (form[i].value == 'undefined') {
      form[i].value = '';
    }
  }
}