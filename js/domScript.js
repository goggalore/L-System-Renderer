function generateDomElements() {
  
  const STATE_COUNT = 5;
  generateInput('input', input)
  
  for(var i = 0; i < STATE_COUNT; i++) {
    generateInput('input', initialState);
    generateInput('input', finalState);
  } 
  
  generateInput('input', orientation);
  
  generateButton('info', info);
  generateButton('presets', presets)
}

function generateInput(formId, formStruct) {
  
  var form = document.getElementById(formId);
     
  Object.getOwnPropertyNames(formStruct).forEach(
    function(propName, index) {
      
      var div = document.createElement('div'),
          input = document.createElement('input');

      div.className = 'form-group';

      input.className = 'form-control input-sm';  
      input.name = propName;
      input.placeholder = formStruct[propName].placeholder;
      input.type = formStruct[propName].type;
      
      if (formStruct[propName].maxLength != null) {
        input.maxLength = formStruct[propName].maxLength;
      }
      
      if (formStruct[propName].min != null) {
        input.min = formStruct[propName].min;
      }

      if (formStruct[propName].createDiv === true) {
        form.appendChild(div);
        form.lastChild.appendChild(input);
      } 

      else {
        form.lastChild.appendChild(input);
      }
  })
}

function generateButton(formId, formStruct) {
  
  var form = document.getElementById(formId)
  
  Object.getOwnPropertyNames(formStruct).forEach(
  function(propName, index) {
    
    var div = document.createElement('div');
    var button = document.createElement('button');
    
    div.className = 'btn-group pull-left';
    
    button.value = 'input'
    button.className = 'btn btn-default';
    button.name = propName;
    button.innerHTML = formStruct[propName].innerHTML;
    
    if (formStruct[propName].createDiv === true) {
      form.appendChild(div);
      form.lastChild.appendChild(button);
    }
    
    else {
      form.lastChild.appendChild(button);
    }
  });
}

function addEventListeners() {
  
  var inputs = document.querySelector('#input');
  var infoButtons = document.querySelector('#info');
  var presetButtons = document.querySelector('#presets');
  
  inputs.setAttribute('autocomplete', 'off');
  
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input',function () {
      drawSystem();
    });
  }
    
  infoButtons['lSystem'].addEventListener('click', function (event) {
    swal ({
      title: 'What\'s an L-system?',
      text: lSystemDescription});
    event.preventDefault();
  });
    
  infoButtons['commands'].addEventListener('click', function (event) {
    swal({
      title: 'Commands',
      text: commandDescription});
    event.preventDefault();
    }); 
  
  for (var j = 0; j < presetButtons.length; j++) {
    presetButtons[j].addEventListener('click', function (event) {
      setPreset(window[this.name]);
      drawSystem();
      event.preventDefault();
    })
  }
}

function setPreset(model) {
  
  var input = document.querySelector('#input');
  var counter = 0;
  
  input['iterations'].value = model.iterations;
  input['angle'].value = model.angle;
  input['axiom'].value = model.axiom;
  input['orientation'].value = model.orientation;
  
  for (var i = 0; i < input.length; i++) {
    if (input[i].name === 'initialState') {
      input[i].value = model.variables[counter];
    }
    
    else if (input[i].name === 'finalState') {
      input[i].value = model.rules[model.variables[counter]];
      counter++
    }
    
    // don't show that these are undefined on UI if undefined
    if (input[i].value === 'undefined') {
      input[i].value = '';
    }
  }
}

function getModel() {
  
  var input = document.querySelector('#input');
  var model = {axiom: '',
              rules: {}};
  
  model['iterations'] = input['iterations'].value;
  model['angle'] = input['angle'].value;
  model['axiom'] = input['axiom'].value;
  model['orientation'] = input['orientation'].value;
  
  for (var i = 0; i < input.length; i++) {
    if (input[i].name === 'initialState') {
      model.rules[input[i].value] = input[i + 1].value;
    }
  }
  
  return model;
}