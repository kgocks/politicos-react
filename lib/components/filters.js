"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _es6PromiseDebounce = require("es6-promise-debounce");

var _es6PromiseDebounce2 = _interopRequireDefault(_es6PromiseDebounce);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Multiselect = require("./Multiselect");

var _Multiselect2 = _interopRequireDefault(_Multiselect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Marcelo Jorge Vieira <metal@alucinados.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This program is free software: you can redistribute it and/or modify
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * it under the terms of the GNU Affero General Public License as
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * published by the Free Software Foundation, either version 3 of the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License, or (at your option) any later version.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This program is distributed in the hope that it will be useful,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GNU Affero General Public License for more details.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You should have received a copy of the GNU Affero General Public License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * along with this program. If not, see <http://www.gnu.org/licenses/>.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Filters = function (_Component) {
  _inherits(Filters, _Component);

  function Filters(props) {
    _classCallCheck(this, Filters);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Filters).call(this, props));
  }

  _createClass(Filters, [{
    key: "getOptions",
    value: function getOptions(url, func) {
      return _axios2.default.get(this.props.url + url).then(function (response) {
        return response.data;
      }).then(function (json) {
        var options = json.objects.map(func);
        return { options: options };
      });
    }
  }, {
    key: "getOptionsCallback",
    value: function getOptionsCallback(input, callback, opts) {
      setTimeout(function () {
        callback(null, { options: opts, complete: true });
      }, 500);
    }
  }, {
    key: "getPoliticalParties",

    // Political Parties
    value: function getPoliticalParties() {
      var func = function func(item) {
        return { "label": item.siglum + " (" + item.name + ")", "value": item.siglum };
      };
      return this.getOptions("/political-parties/", func);
    }
  }, {
    key: "getPoliticalOffices",

    // Political Offices
    value: function getPoliticalOffices() {
      var func = function func(item) {
        return { "label": item.name, "value": item.slug };
      };
      return this.getOptions("/political-offices/", func);
    }
  }, {
    key: "getEducations",

    // Educations
    value: function getEducations() {
      var func = function func(item) {
        return { "label": item.name, "value": item.name };
      };
      return this.getOptions("/educations/", func);
    }
  }, {
    key: "getElections",

    // Elections
    value: function getElections() {
      var func = function func(item) {
        return { "label": item.year, "value": item.year };
      };
      return this.getOptions("/elections/", func);
    }
  }, {
    key: "getPoliticians",

    // Politicians
    value: function getPoliticians(term) {
      var func = function func(item) {
        return { "label": item.name, "value": item.name };
      };
      var filter = term != "" ? "?q=" + term : "";
      return this.getOptions("/politicians/search/" + filter, func);
    }
  }, {
    key: "getCities",

    // Cities
    value: function getCities(term) {
      var func = function func(item) {
        return { "label": item.name, "value": item.name };
      };
      var filter = term != "" ? "?q=" + term : "";
      return this.getOptions("/cities/search/" + filter, func);
    }
  }, {
    key: "getStates",

    // States
    value: function getStates() {
      var func = function func(item) {
        return { "label": item.name, "value": item.slug };
      };
      return this.getOptions("/states/", func);
    }
  }, {
    key: "getElected",

    // Elected
    value: function getElected(input, callback) {
      var options = [{ "label": "Eleito", "value": 1 }, { "label": "Não Eleito", "value": 0 }];
      return this.getOptionsCallback(input, callback, options);
    }
  }, {
    key: "getGender",

    // Gender
    value: function getGender(input, callback) {
      var options = [{ "label": "Masculino", "value": "M" }, { "label": "Feminino", "value": "F" }, { "label": "Não informado", "value": "N" }];
      return this.getOptionsCallback(input, callback, options);
    }
  }, {
    key: "getOccupations",

    // Occupations
    value: function getOccupations(term) {
      var func = function func(item) {
        return { "label": item.name, "value": item.slug };
      };
      var filter = term != "" ? "?q=" + term : "";
      return this.getOptions("/occupations/search/" + filter, func);
    }

    // MaritalStatus

  }, {
    key: "getMaritalStatus",
    value: function getMaritalStatus() {
      var func = function func(item) {
        return { "label": item.name, "value": item.slug };
      };
      return this.getOptions("/marital-status/", func);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "filter-row row" },
          _react2.default.createElement(
            "div",
            { className: "col-md-12" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Políticos",
              placeholder: "Escolha uma ou vários políticos...",
              loadOptions: (0, _es6PromiseDebounce2.default)(this.getPoliticians.bind(this), 500),
              onChange: function onChange(selectedPoliticians) {
                return _this2.props.onChange({ selectedPoliticians: selectedPoliticians });
              },
              value: this.props.selectedPoliticians })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "filter-row row" },
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Partidos",
              placeholder: "Escolha um ou vários partidos...",
              loadOptions: this.getPoliticalParties.bind(this),
              onChange: function onChange(selectedPoliticalParties) {
                return _this2.props.onChange({ selectedPoliticalParties: selectedPoliticalParties });
              },
              value: this.props.selectedPoliticalParties })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Cargos",
              placeholder: "Escolha um ou vários cargos...",
              loadOptions: this.getPoliticalOffices.bind(this),
              onChange: function onChange(selectedPoliticalOffices) {
                return _this2.props.onChange({ selectedPoliticalOffices: selectedPoliticalOffices });
              },
              value: this.props.selectedPoliticalOffices })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "filter-row row" },
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Escolaridades",
              placeholder: "Escolha uma ou várias escolaridades...",
              loadOptions: this.getEducations.bind(this),
              onChange: function onChange(selectedEducations) {
                return _this2.props.onChange({ selectedEducations: selectedEducations });
              },
              value: this.props.selectedEducations })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Eleições",
              placeholder: "Escolha uma ou várias eleições...",
              loadOptions: this.getElections.bind(this),
              onChange: function onChange(selectedElections) {
                return _this2.props.onChange({ selectedElections: selectedElections });
              },
              value: this.props.selectedElections })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "filter-row row" },
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Estados",
              placeholder: "Escolha um ou vários estados...",
              loadOptions: this.getStates.bind(this),
              onChange: function onChange(selectedStates) {
                return _this2.props.onChange({ selectedStates: selectedStates });
              },
              value: this.props.selectedStates })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Cidades",
              placeholder: "Escolha uma ou várias cidades...",
              loadOptions: (0, _es6PromiseDebounce2.default)(this.getCities.bind(this), 500),
              onChange: function onChange(selectedCities) {
                return _this2.props.onChange({ selectedCities: selectedCities });
              },
              value: this.props.selectedCities })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "filter-row row" },
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Eleito",
              placeholder: "Filtre quem foi eleito ou não...",
              loadOptions: this.getElected.bind(this),
              onChange: function onChange(selectedElected) {
                return _this2.props.onChange({ selectedElected: selectedElected });
              },
              value: this.props.selectedElected })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Sexo",
              placeholder: "Escolha o sexo...",
              loadOptions: this.getGender.bind(this),
              onChange: function onChange(selectedGender) {
                return _this2.props.onChange({ selectedGender: selectedGender });
              },
              value: this.props.selectedGender })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "filter-row row" },
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Profissões",
              placeholder: "Escolha uma ou mais profissões...",
              loadOptions: (0, _es6PromiseDebounce2.default)(this.getOccupations.bind(this), 500),
              onChange: function onChange(selectedOccupations) {
                return _this2.props.onChange({ selectedOccupations: selectedOccupations });
              },
              value: this.props.selectedOccupations })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-lg-6" },
            _react2.default.createElement(_Multiselect2.default, {
              label: "Estado Civil",
              placeholder: "Escolha um estado civil...",
              loadOptions: this.getMaritalStatus.bind(this),
              onChange: function onChange(selectedMaritalStatus) {
                return _this2.props.onChange({ selectedMaritalStatus: selectedMaritalStatus });
              },
              value: this.props.selectedMaritalStatus })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "filter-row row" },
          _react2.default.createElement(
            "div",
            { className: "col-md-6" },
            _react2.default.createElement(
              "button",
              { className: "btn btn-primary", onClick: this.props.onChangeQuery },
              "Filtrar"
            )
          )
        )
      );
    }
  }]);

  return Filters;
}(_react.Component);

exports.default = Filters;