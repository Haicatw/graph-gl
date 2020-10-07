"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-unused-vars */
var Settings = function () {
  function Settings(settings) {
    _classCallCheck(this, Settings);

    this.runtimeSettings = settings;
  }

  _createClass(Settings, [{
    key: "setOneSetting",
    value: function setOneSetting(_ref) {
      var key = _ref.key,
          value = _ref.value;

      this.runtimeSettings[key] = value;
    }
  }, {
    key: "resetSettings",
    value: function resetSettings(settings) {
      this.runtimeSettings = settings;
    }
  }, {
    key: "settings",
    get: function get() {
      return this.runtimeSettings;
    }
  }]);

  return Settings;
}();

var runtimeSettings = {};
exports.default = runtimeSettings = new Settings({});
/* eslint-enable no-unused-vars */