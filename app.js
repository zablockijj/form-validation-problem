var EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

angular.module('validationApp', [])
.directive('emailaddress', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      ctrl.$validators.emailaddress = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }

        if (EMAIL_REGEX.test(viewValue)) {
          return true;
        }

        return false;
      };
    }
  };
})
.directive('istigertype', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      ctrl.$validators.twoanimals = function(modelValue, viewValue) {
        var hasTiger = scope.formCtrl.data.animals.tiger;

        return (hasTiger) ? (modelValue) : true;
      };
    }
  };
})
.controller('FormController', function() {
  var form = this;

  form.data = {
    email: "",
    password: "",
    colour: "",
    tigerType: "",
    animals: {
      bear: false,
      tiger: false,
      snake: false,
      donkey: false
    }
  };

  form.errors = {
    animals: null
  };

  function countAnimals() {
    var count = 0;

    for (var i in form.data.animals) {
      if (form.data.animals[i]) {
        count++;
      }
    }

    return count;
  }

  function setErrors() {
    // set the animals checkbox errors
    if (countAnimals() < 2) {
      form.errors.animals = "Please select at least two animals";
    } else {
      form.errors.animals = null;
    }
  }

  function hasErrors() {
    for (var i in form.errors) {
      if (form.errors[i]) {
        return true;
      }
    }

    return false;
  }

  form.isSubmitted = false;

  form.submitForm = function(event) {
    if (event) {
      event.preventDefault();
    }

    form.isSubmitted = true;
    setErrors();
    
    return !(hasErrors());
  };
});
