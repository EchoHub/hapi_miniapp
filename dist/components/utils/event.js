"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EventTarget;

function EventTarget() {
  this.handlers = {};
}

EventTarget.prototype = {
  constructor: EventTarget,
  on: function on(type, handler) {
    if (typeof this.handlers[type] == 'undefined') {
      this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
  },
  emit: function emit(event) {
    if (!event.target) {
      event.target = this;
    }

    if (this.handlers[event.type] instanceof Array) {
      var handlers = this.handlers[event.type];

      for (var i = 0; i < handlers.length; i++) {
        handlers[i](event);
      }
    }
  },
  off: function off(type, handler) {
    if (this.handlers[type] instanceof Array) {
      var handlers = this.handlers[type];

      for (var i = 0; i < handlers.length; i++) {
        if (handlers[i] == handler) {
          break;
        }
      }

      handlers.splice(i, 1);
    }
  }
};