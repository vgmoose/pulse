window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
    window.setTimeout(a, 1E3 / 60)
  }
}();
(function() {
  var a = false, c = /xyz/.test(function() {
  }) ? /\b_super\b/ : /.*/;
  this.PClass = function() {
  };
  PClass.extend = function(g) {
    function f() {
      !a && this.init && this.init.apply(this, arguments)
    }
    var h = this.prototype;
    a = true;
    var i = new this;
    a = false;
    for(var l in g) {
      i[l] = typeof g[l] == "function" && typeof h[l] == "function" && c.test(g[l]) ? function(a, c) {
        return function() {
          var g = this._super;
          this._super = h[a];
          var f = c.apply(this, arguments);
          this._super = g;
          return f
        }
      }(l, g[l]) : g[l]
    }
    f.prototype = i;
    f.prototype.constructor = f;
    f.extend = arguments.callee;
    return f
  }
})();
typeof pulse == "undefined" && (pulse = {events:{mousedown:"mouse", mouseup:"mouse", click:"mouse", mousemove:"mouse", mousewheel:"mouse", keyup:"keyboard", keydown:"keyboard", keypress:"keyboard"}, customevents:{dragstart:"drag", dragdrop:"drag", dragenter:"drag", dragover:"drag", dragexit:"drag", complete:"action", finished:"audio"}});
pulse.readyCallbacks = [];
pulse.isReady = false;
pulse.ready = function(a) {
  pulse.isReady && setTimeout(a, 1);
  pulse.readyCallbacks.push(a)
};
pulse.DOMContentLoaded = function() {
  if(!pulse.isReady) {
    pulse.isReady = true;
    for(var a in pulse.readyCallbacks) {
      pulse.readyCallbacks[a]()
    }
  }
};
document.addEventListener ? (document.addEventListener("DOMContentLoaded", pulse.DOMContentLoaded, false), window.addEventListener("load", pulse.DOMContentLoaded, false)) : document.attachEvent && (document.attachEvent("onreadystatechange", DOMContentLoaded), window.attachEvent("onload", pulse.DOMContentLoaded));
pulse.DEBUG = false;
/*


 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20111030
*/
(function(a) {
  a.SoundManager = function(c, g) {
    function f(a) {
      return function(b) {
        return!this._t || !this._t._a ? null : a.call(this, b)
      }
    }
    this.flashVersion = 8;
    this.debugFlash = this.debugMode = false;
    this.useConsole = true;
    this.waitForWindowLoad = this.consoleOnly = false;
    this.bgColor = "#ffffff";
    this.useHighPerformance = false;
    this.flashPollingInterval = null;
    this.flashLoadTimeout = 1E3;
    this.wmode = null;
    this.allowScriptAccess = "always";
    this.useFlashBlock = false;
    this.useHTML5Audio = true;
    this.html5Test = /^(probably|maybe)$/i;
    this.preferFlash = true;
    this.noSWFCache = false;
    this.audioFormats = {mp3:{type:['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"], required:true}, mp4:{related:["aac", "m4a"], type:['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"], required:false}, ogg:{type:["audio/ogg; codecs=vorbis"], required:false}, wav:{type:['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"], required:false}};
    this.defaultOptions = {autoLoad:false, stream:true, autoPlay:false, loops:1, onid3:null, onload:null, whileloading:null, onplay:null, onpause:null, onresume:null, whileplaying:null, onstop:null, onfailure:null, onfinish:null, multiShot:true, multiShotEvents:false, position:null, pan:0, type:null, usePolicyFile:false, volume:100};
    this.flash9Options = {isMovieStar:null, usePeakData:false, useWaveformData:false, useEQData:false, onbufferchange:null, ondataerror:null};
    this.movieStarOptions = {bufferTime:3, serverURL:null, onconnect:null, duration:null};
    this.movieID = "sm2-container";
    this.id = g || "sm2movie";
    this.swfCSS = {swfBox:"sm2-object-box", swfDefault:"movieContainer", swfError:"swf_error", swfTimedout:"swf_timedout", swfLoaded:"swf_loaded", swfUnblocked:"swf_unblocked", sm2Debug:"sm2_debug", highPerf:"high_performance", flashDebug:"flash_debug"};
    this.debugID = "soundmanager-debug";
    this.debugURLParam = /([#?&])debug=1/i;
    this.versionNumber = "V2.97a.20111030";
    this.movieURL = this.version = null;
    this.url = c || null;
    this.altURL = null;
    this.enabled = this.swfLoaded = false;
    this.oMC = this.o = null;
    this.sounds = {};
    this.soundIDs = [];
    this.didFlashBlock = this.specialWmodeCase = this.muted = false;
    this.filePattern = null;
    this.filePatterns = {flash8:/\.mp3(\?.*)?$/i, flash9:/\.mp3(\?.*)?$/i};
    this.features = {buffering:false, peakData:false, waveformData:false, eqData:false, movieStar:false};
    this.sandbox = {};
    var h;
    try {
      h = typeof Audio !== "undefined" && typeof(new Audio).canPlayType !== "undefined"
    }catch(i) {
      h = false
    }
    this.hasHTML5 = h;
    this.html5 = {usingFlash:null};
    this.flash = {};
    this.ignoreFlash = this.html5Only = false;
    var l, d = this, n, q = navigator.userAgent, k = a, $ = k.location.href.toString(), o = document, aa, Q, m, x = [], J = false, K = false, s = false, y = false, qa = false, L, t, ba, D, E, R, ra, ca, B, S, F, da, ea, T, G, sa, fa, ta, U, ua, M = null, ga = null, C, ha, H, V, W, ia, p, X = false, ja = false, va, wa, v = null, xa, Y, N, z, ka, la, ya, r, Ha = Array.prototype.slice, O = false, u, Z, Aa, w, Ba, ma = q.match(/(ipad|iphone|ipod)/i), Ia = q.match(/firefox/i), Ja = q.match(/droid/i), 
    A = q.match(/msie/i), Ka = q.match(/webkit/i), P = q.match(/safari/i) && !q.match(/chrome/i), La = q.match(/opera/i);
    h = q.match(/(mobile|pre\/|xoom)/i) || ma;
    var na = !$.match(/usehtml5audio/i) && !$.match(/sm2\-ignorebadua/i) && P && q.match(/OS X 10_6_([3-7])/i), oa = typeof o.hasFocus !== "undefined" ? o.hasFocus() : null, I = P && typeof o.hasFocus === "undefined", Ca = !I, Da = /(mp3|mp4|mpa)/i, pa = o.location ? o.location.protocol.match(/http/i) : null, Ea = !pa ? "http://" : "", Fa = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|mp4v|3gp|3g2)\s*(?:$|;)/i, Ga = "mpeg4,aac,flv,mov,mp4,m4v,f4v,m4a,mp4v,3gp,3g2".split(","), Ma = RegExp("\\.(" + 
    Ga.join("|") + ")(\\?.*)?$", "i");
    this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
    this.useAltURL = !pa;
    this._global_a = null;
    if(h && (d.useHTML5Audio = true, d.preferFlash = false, ma)) {
      O = d.ignoreFlash = true
    }
    this.supported = this.ok = function() {
      return v ? s && !y : d.useHTML5Audio && d.hasHTML5
    };
    this.getMovie = function(a) {
      return n(a) || o[a] || k[a]
    };
    this.createSound = function(a) {
      function b() {
        c = V(c);
        d.sounds[f.id] = new l(f);
        d.soundIDs.push(f.id);
        return d.sounds[f.id]
      }
      var c = null, g = null, f = null;
      if(!s || !d.ok()) {
        return ia("soundManager.createSound(): " + C(!s ? "notReady" : "notOK")), false
      }
      arguments.length === 2 && (a = {id:arguments[0], url:arguments[1]});
      f = c = t(a);
      if(p(f.id, true)) {
        return d.sounds[f.id]
      }
      if(Y(f)) {
        g = b(), g._setup_html5(f)
      }else {
        if(m > 8) {
          if(f.isMovieStar === null) {
            f.isMovieStar = f.serverURL || (f.type ? f.type.match(Fa) : false) || f.url.match(Ma)
          }
          if(f.isMovieStar && f.usePeakData) {
            f.usePeakData = false
          }
        }
        f = W(f, "soundManager.createSound(): ");
        g = b();
        if(m === 8) {
          d.o._createSound(f.id, f.loops || 1, f.usePolicyFile)
        }else {
          if(d.o._createSound(f.id, f.url, f.usePeakData, f.useWaveformData, f.useEQData, f.isMovieStar, f.isMovieStar ? f.bufferTime : false, f.loops || 1, f.serverURL, f.duration || null, f.autoPlay, true, f.autoLoad, f.usePolicyFile), !f.serverURL) {
            g.connected = true, f.onconnect && f.onconnect.apply(g)
          }
        }
        !f.serverURL && (f.autoLoad || f.autoPlay) && g.load(f)
      }
      !f.serverURL && f.autoPlay && g.play();
      return g
    };
    this.destroySound = function(a, b) {
      if(!p(a)) {
        return false
      }
      var c = d.sounds[a], f;
      c._iO = {};
      c.stop();
      c.unload();
      for(f = 0;f < d.soundIDs.length;f++) {
        if(d.soundIDs[f] === a) {
          d.soundIDs.splice(f, 1);
          break
        }
      }
      b || c.destruct(true);
      delete d.sounds[a];
      return true
    };
    this.load = function(a, b) {
      return!p(a) ? false : d.sounds[a].load(b)
    };
    this.unload = function(a) {
      return!p(a) ? false : d.sounds[a].unload()
    };
    this.onposition = function(a, b, c, f) {
      return!p(a) ? false : d.sounds[a].onposition(b, c, f)
    };
    this.start = this.play = function(a, b) {
      return!s || !d.ok() ? (ia("soundManager.play(): " + C(!s ? "notReady" : "notOK")), false) : !p(a) ? (b instanceof Object || (b = {url:b}), b && b.url ? (b.id = a, d.createSound(b).play()) : false) : d.sounds[a].play(b)
    };
    this.setPosition = function(a, b) {
      return!p(a) ? false : d.sounds[a].setPosition(b)
    };
    this.stop = function(a) {
      return!p(a) ? false : d.sounds[a].stop()
    };
    this.stopAll = function() {
      for(var a in d.sounds) {
        d.sounds.hasOwnProperty(a) && d.sounds[a].stop()
      }
    };
    this.pause = function(a) {
      return!p(a) ? false : d.sounds[a].pause()
    };
    this.pauseAll = function() {
      var a;
      for(a = d.soundIDs.length;a--;) {
        d.sounds[d.soundIDs[a]].pause()
      }
    };
    this.resume = function(a) {
      return!p(a) ? false : d.sounds[a].resume()
    };
    this.resumeAll = function() {
      var a;
      for(a = d.soundIDs.length;a--;) {
        d.sounds[d.soundIDs[a]].resume()
      }
    };
    this.togglePause = function(a) {
      return!p(a) ? false : d.sounds[a].togglePause()
    };
    this.setPan = function(a, b) {
      return!p(a) ? false : d.sounds[a].setPan(b)
    };
    this.setVolume = function(a, b) {
      return!p(a) ? false : d.sounds[a].setVolume(b)
    };
    this.mute = function(a) {
      var b = 0;
      typeof a !== "string" && (a = null);
      if(a) {
        return!p(a) ? false : d.sounds[a].mute()
      }else {
        for(b = d.soundIDs.length;b--;) {
          d.sounds[d.soundIDs[b]].mute()
        }
        d.muted = true
      }
      return true
    };
    this.muteAll = function() {
      d.mute()
    };
    this.unmute = function(a) {
      typeof a !== "string" && (a = null);
      if(a) {
        return!p(a) ? false : d.sounds[a].unmute()
      }else {
        for(a = d.soundIDs.length;a--;) {
          d.sounds[d.soundIDs[a]].unmute()
        }
        d.muted = false
      }
      return true
    };
    this.unmuteAll = function() {
      d.unmute()
    };
    this.toggleMute = function(a) {
      return!p(a) ? false : d.sounds[a].toggleMute()
    };
    this.getMemoryUse = function() {
      var a = 0;
      d.o && m !== 8 && (a = parseInt(d.o._getMemoryUse(), 10));
      return a
    };
    this.disable = function(a) {
      var b;
      typeof a === "undefined" && (a = false);
      if(y) {
        return false
      }
      y = true;
      for(b = d.soundIDs.length;b--;) {
        ta(d.sounds[d.soundIDs[b]])
      }
      L(a);
      r.remove(k, "load", E);
      return true
    };
    this.canPlayMIME = function(a) {
      var b;
      d.hasHTML5 && (b = N({type:a}));
      return!v || b ? b : a ? !!(m > 8 && a.match(Fa) || a.match(d.mimePattern)) : null
    };
    this.canPlayURL = function(a) {
      var b;
      d.hasHTML5 && (b = N({url:a}));
      return!v || b ? b : a ? !!a.match(d.filePattern) : null
    };
    this.canPlayLink = function(a) {
      return typeof a.type !== "undefined" && a.type && d.canPlayMIME(a.type) ? true : d.canPlayURL(a.href)
    };
    this.getSoundById = function(a) {
      if(!a) {
        throw Error("soundManager.getSoundById(): sID is null/undefined");
      }
      return d.sounds[a]
    };
    this.onready = function(a, b) {
      if(a && a instanceof Function) {
        return b || (b = k), ba("onready", a, b), D(), true
      }else {
        throw C("needFunction", "onready");
      }
    };
    this.ontimeout = function(a, b) {
      if(a && a instanceof Function) {
        return b || (b = k), ba("ontimeout", a, b), D({type:"ontimeout"}), true
      }else {
        throw C("needFunction", "ontimeout");
      }
    };
    this._wD = this._writeDebug = function() {
      return true
    };
    this._debug = function() {
    };
    this.reboot = function() {
      var a, b;
      for(a = d.soundIDs.length;a--;) {
        d.sounds[d.soundIDs[a]].destruct()
      }
      try {
        if(A) {
          ga = d.o.innerHTML
        }
        M = d.o.parentNode.removeChild(d.o)
      }catch(c) {
      }
      ga = M = v = null;
      d.enabled = da = s = X = ja = J = K = y = d.swfLoaded = false;
      d.soundIDs = d.sounds = [];
      d.o = null;
      for(a in x) {
        if(x.hasOwnProperty(a)) {
          for(b = x[a].length;b--;) {
            x[a][b].fired = false
          }
        }
      }
      k.setTimeout(d.beginDelayedInit, 20)
    };
    this.getMoviePercent = function() {
      return d.o && typeof d.o.PercentLoaded !== "undefined" ? d.o.PercentLoaded() : null
    };
    this.beginDelayedInit = function() {
      qa = true;
      F();
      setTimeout(function() {
        if(ja) {
          return false
        }
        T();
        S();
        return ja = true
      }, 20);
      R()
    };
    this.destruct = function() {
      d.disable(true)
    };
    l = function(a) {
      var b = this, c, f, g;
      this.sID = a.id;
      this.url = a.url;
      this._iO = this.instanceOptions = this.options = t(a);
      this.pan = this.options.pan;
      this.volume = this.options.volume;
      this._lastURL = null;
      this.isHTML5 = false;
      this._a = null;
      this.id3 = {};
      this._debug = function() {
      };
      this.load = function(a) {
        var c = null;
        if(typeof a !== "undefined") {
          b._iO = t(a, b.options), b.instanceOptions = b._iO
        }else {
          if(a = b.options, b._iO = a, b.instanceOptions = b._iO, b._lastURL && b._lastURL !== b.url) {
            b._iO.url = b.url, b.url = null
          }
        }
        if(!b._iO.url) {
          b._iO.url = b.url
        }
        if(b._iO.url === b.url && b.readyState !== 0 && b.readyState !== 2) {
          return b
        }
        b._lastURL = b.url;
        b.loaded = false;
        b.readyState = 1;
        b.playState = 0;
        if(Y(b._iO)) {
          if(c = b._setup_html5(b._iO), !c._called_load) {
            b._html5_canplay = false, c.load(), c._called_load = true, b._iO.autoPlay && b.play()
          }
        }else {
          try {
            b.isHTML5 = false, b._iO = W(V(b._iO)), m === 8 ? d.o._load(b.sID, b._iO.url, b._iO.stream, b._iO.autoPlay, b._iO.whileloading ? 1 : 0, b._iO.loops || 1, b._iO.usePolicyFile) : d.o._load(b.sID, b._iO.url, !!b._iO.stream, !!b._iO.autoPlay, b._iO.loops || 1, !!b._iO.autoLoad, b._iO.usePolicyFile)
          }catch(j) {
            G({type:"SMSOUND_LOAD_JS_EXCEPTION", fatal:true})
          }
        }
        return b
      };
      this.unload = function() {
        b.readyState !== 0 && (b.isHTML5 ? (f(), b._a && (b._a.pause(), ka(b._a))) : m === 8 ? d.o._unload(b.sID, "about:blank") : d.o._unload(b.sID), c());
        return b
      };
      this.destruct = function(a) {
        if(b.isHTML5) {
          if(f(), b._a) {
            b._a.pause(), ka(b._a), O || b._remove_html5_events(), b._a._t = null, b._a = null
          }
        }else {
          b._iO.onfailure = null, d.o._destroySound(b.sID)
        }
        a || d.destroySound(b.sID, true)
      };
      this.start = this.play = function(a, c) {
        var j, c = c === void 0 ? true : c;
        a || (a = {});
        b._iO = t(a, b._iO);
        b._iO = t(b._iO, b.options);
        b.instanceOptions = b._iO;
        if(b._iO.serverURL && !b.connected) {
          return b.getAutoPlay() || b.setAutoPlay(true), b
        }
        Y(b._iO) && (b._setup_html5(b._iO), g());
        if(b.playState === 1 && !b.paused && (j = b._iO.multiShot, !j)) {
          return b
        }
        if(!b.loaded) {
          if(b.readyState === 0) {
            if(!b.isHTML5) {
              b._iO.autoPlay = true
            }
            b.load(b._iO)
          }else {
            if(b.readyState === 2) {
              return b
            }
          }
        }
        if(!b.isHTML5 && m === 9 && b.position > 0 && b.position === b.duration) {
          b._iO.position = 0
        }
        if(b.paused && b.position && b.position > 0) {
          b.resume()
        }else {
          b.playState = 1;
          b.paused = false;
          (!b.instanceCount || b._iO.multiShotEvents || !b.isHTML5 && m > 8 && !b.getAutoPlay()) && b.instanceCount++;
          b.position = typeof b._iO.position !== "undefined" && !isNaN(b._iO.position) ? b._iO.position : 0;
          if(!b.isHTML5) {
            b._iO = W(V(b._iO))
          }
          if(b._iO.onplay && c) {
            b._iO.onplay.apply(b), b._onplay_called = true
          }
          b.setVolume(b._iO.volume, true);
          b.setPan(b._iO.pan, true);
          b.isHTML5 ? (g(), j = b._setup_html5(), b.setPosition(b._iO.position), j.play()) : d.o._start(b.sID, b._iO.loops || 1, m === 9 ? b._iO.position : b._iO.position / 1E3)
        }
        return b
      };
      this.stop = function(a) {
        if(b.playState === 1) {
          b._onbufferchange(0);
          b.resetOnPosition(0);
          b.paused = false;
          if(!b.isHTML5) {
            b.playState = 0
          }
          b._iO.onstop && b._iO.onstop.apply(b);
          if(b.isHTML5) {
            if(b._a) {
              b.setPosition(0), b._a.pause(), b.playState = 0, b._onTimer(), f()
            }
          }else {
            d.o._stop(b.sID, a), b._iO.serverURL && b.unload()
          }
          b.instanceCount = 0;
          b._iO = {}
        }
        return b
      };
      this.setAutoPlay = function(a) {
        b._iO.autoPlay = a;
        b.isHTML5 || (d.o._setAutoPlay(b.sID, a), a && !b.instanceCount && b.readyState === 1 && b.instanceCount++)
      };
      this.getAutoPlay = function() {
        return b._iO.autoPlay
      };
      this.setPosition = function(a) {
        a === void 0 && (a = 0);
        var c = b.isHTML5 ? Math.max(a, 0) : Math.min(b.duration || b._iO.duration, Math.max(a, 0));
        b.position = c;
        a = b.position / 1E3;
        b.resetOnPosition(b.position);
        b._iO.position = c;
        if(b.isHTML5) {
          if(b._a && b._html5_canplay && b._a.currentTime !== a) {
            try {
              b._a.currentTime = a, (b.playState === 0 || b.paused) && b._a.pause()
            }catch(j) {
            }
          }
        }else {
          a = m === 9 ? b.position : a, b.readyState && b.readyState !== 2 && d.o._setPosition(b.sID, a, b.paused || !b.playState)
        }
        b.isHTML5 && b.paused && b._onTimer(true);
        return b
      };
      this.pause = function(a) {
        if(b.paused || b.playState === 0 && b.readyState !== 1) {
          return b
        }
        b.paused = true;
        b.isHTML5 ? (b._setup_html5().pause(), f()) : (a || a === void 0) && d.o._pause(b.sID);
        b._iO.onpause && b._iO.onpause.apply(b);
        return b
      };
      this.resume = function() {
        if(!b.paused) {
          return b
        }
        b.paused = false;
        b.playState = 1;
        b.isHTML5 ? (b._setup_html5().play(), g()) : (b._iO.isMovieStar && b.setPosition(b.position), d.o._pause(b.sID));
        !b._onplay_called && b._iO.onplay ? (b._iO.onplay.apply(b), b._onplay_called = true) : b._iO.onresume && b._iO.onresume.apply(b);
        return b
      };
      this.togglePause = function() {
        if(b.playState === 0) {
          return b.play({position:m === 9 && !b.isHTML5 ? b.position : b.position / 1E3}), b
        }
        b.paused ? b.resume() : b.pause();
        return b
      };
      this.setPan = function(a, c) {
        typeof a === "undefined" && (a = 0);
        typeof c === "undefined" && (c = false);
        b.isHTML5 || d.o._setPan(b.sID, a);
        b._iO.pan = a;
        if(!c) {
          b.pan = a, b.options.pan = a
        }
        return b
      };
      this.setVolume = function(a, c) {
        typeof a === "undefined" && (a = 100);
        typeof c === "undefined" && (c = false);
        if(b.isHTML5) {
          if(b._a) {
            b._a.volume = Math.max(0, Math.min(1, a / 100))
          }
        }else {
          d.o._setVolume(b.sID, d.muted && !b.muted || b.muted ? 0 : a)
        }
        b._iO.volume = a;
        if(!c) {
          b.volume = a, b.options.volume = a
        }
        return b
      };
      this.mute = function() {
        b.muted = true;
        if(b.isHTML5) {
          if(b._a) {
            b._a.muted = true
          }
        }else {
          d.o._setVolume(b.sID, 0)
        }
        return b
      };
      this.unmute = function() {
        b.muted = false;
        var a = typeof b._iO.volume !== "undefined";
        if(b.isHTML5) {
          if(b._a) {
            b._a.muted = false
          }
        }else {
          d.o._setVolume(b.sID, a ? b._iO.volume : b.options.volume)
        }
        return b
      };
      this.toggleMute = function() {
        return b.muted ? b.unmute() : b.mute()
      };
      this.onposition = function(a, c, d) {
        b._onPositionItems.push({position:a, method:c, scope:typeof d !== "undefined" ? d : b, fired:false});
        return b
      };
      this.processOnPosition = function() {
        var a, c;
        a = b._onPositionItems.length;
        if(!a || !b.playState || b._onPositionFired >= a) {
          return false
        }
        for(;a--;) {
          if(c = b._onPositionItems[a], !c.fired && b.position >= c.position) {
            c.fired = true, d._onPositionFired++, c.method.apply(c.scope, [c.position])
          }
        }
        return true
      };
      this.resetOnPosition = function(a) {
        var c, j;
        c = b._onPositionItems.length;
        if(!c) {
          return false
        }
        for(;c--;) {
          if(j = b._onPositionItems[c], j.fired && a <= j.position) {
            j.fired = false, d._onPositionFired--
          }
        }
        return true
      };
      g = function() {
        b.isHTML5 && va(b)
      };
      f = function() {
        b.isHTML5 && wa(b)
      };
      c = function() {
        b._onPositionItems = [];
        b._onPositionFired = 0;
        b._hasTimer = null;
        b._onplay_called = false;
        b._a = null;
        b._html5_canplay = false;
        b.bytesLoaded = null;
        b.bytesTotal = null;
        b.position = null;
        b.duration = b._iO && b._iO.duration ? b._iO.duration : null;
        b.durationEstimate = null;
        b.failures = 0;
        b.loaded = false;
        b.playState = 0;
        b.paused = false;
        b.readyState = 0;
        b.muted = false;
        b.isBuffering = false;
        b.instanceOptions = {};
        b.instanceCount = 0;
        b.peakData = {left:0, right:0};
        b.waveformData = {left:[], right:[]};
        b.eqData = [];
        b.eqData.left = [];
        b.eqData.right = []
      };
      c();
      this._onTimer = function(a) {
        var c = {};
        if(b._hasTimer || a) {
          return b._a && (a || (b.playState > 0 || b.readyState === 1) && !b.paused) ? (b.duration = b._get_html5_duration(), b.durationEstimate = b.duration, a = b._a.currentTime ? b._a.currentTime * 1E3 : 0, b._whileplaying(a, c, c, c, c), true) : false
        }
      };
      this._get_html5_duration = function() {
        var a = b._a ? b._a.duration * 1E3 : b._iO ? b._iO.duration : void 0;
        return a && !isNaN(a) && a !== Infinity ? a : b._iO ? b._iO.duration : null
      };
      this._setup_html5 = function(a) {
        var a = t(b._iO, a), j = O ? d._global_a : b._a;
        decodeURI(a.url);
        var f = j && j._t ? j._t.instanceOptions : null;
        if(j) {
          if(j._t && f.url === a.url && (!b._lastURL || b._lastURL === f.url)) {
            return j
          }
          O && j._t && j._t.playState && a.url !== f.url && j._t.stop();
          c();
          j.src = a.url;
          b.url = a.url;
          b._lastURL = a.url;
          j._called_load = false
        }else {
          j = new Audio(a.url);
          j._called_load = false;
          if(Ja) {
            j._called_load = true
          }
          if(O) {
            d._global_a = j
          }
        }
        b.isHTML5 = true;
        b._a = j;
        j._t = b;
        b._add_html5_events();
        j.loop = a.loops > 1 ? "loop" : "";
        a.autoLoad || a.autoPlay ? (j.autobuffer = "auto", j.preload = "auto", b.load(), j._called_load = true) : (j.autobuffer = false, j.preload = "none");
        j.loop = a.loops > 1 ? "loop" : "";
        return j
      };
      this._add_html5_events = function() {
        if(b._a._added_events) {
          return false
        }
        var a;
        b._a._added_events = true;
        for(a in w) {
          w.hasOwnProperty(a) && b._a && b._a.addEventListener(a, w[a], false)
        }
        return true
      };
      this._remove_html5_events = function() {
        var a;
        b._a._added_events = false;
        for(a in w) {
          w.hasOwnProperty(a) && b._a && b._a.removeEventListener(a, w[a], false)
        }
      };
      this._onload = function(a) {
        a = !!a;
        b.loaded = a;
        b.readyState = a ? 3 : 2;
        b._onbufferchange(0);
        b._iO.onload && b._iO.onload.apply(b, [a]);
        return true
      };
      this._onbufferchange = function(a) {
        if(b.playState === 0) {
          return false
        }
        if(a && b.isBuffering || !a && !b.isBuffering) {
          return false
        }
        b.isBuffering = a === 1;
        b._iO.onbufferchange && b._iO.onbufferchange.apply(b);
        return true
      };
      this._onsuspend = function() {
        b._iO.onsuspend && b._iO.onsuspend.apply(b);
        return true
      };
      this._onfailure = function(a, c, d) {
        b.failures++;
        if(b._iO.onfailure && b.failures === 1) {
          b._iO.onfailure(b, a, c, d)
        }
      };
      this._onfinish = function() {
        var a = b._iO.onfinish;
        b._onbufferchange(0);
        b.resetOnPosition(0);
        if(b.instanceCount) {
          b.instanceCount--;
          if(!b.instanceCount) {
            b.playState = 0, b.paused = false, b.instanceCount = 0, b.instanceOptions = {}, b._iO = {}, f()
          }
          (!b.instanceCount || b._iO.multiShotEvents) && a && a.apply(b)
        }
      };
      this._whileloading = function(a, c, d, j) {
        b.bytesLoaded = a;
        b.bytesTotal = c;
        b.duration = Math.floor(d);
        b.bufferLength = j;
        if(b._iO.isMovieStar) {
          b.durationEstimate = b.duration
        }else {
          if(b.durationEstimate = b._iO.duration ? b.duration > b._iO.duration ? b.duration : b._iO.duration : parseInt(b.bytesTotal / b.bytesLoaded * b.duration, 10), b.durationEstimate === void 0) {
            b.durationEstimate = b.duration
          }
        }
        b.readyState !== 3 && b._iO.whileloading && b._iO.whileloading.apply(b)
      };
      this._whileplaying = function(a, c, d, j, f) {
        if(isNaN(a) || a === null) {
          return false
        }
        b.position = a;
        b.processOnPosition();
        if(!b.isHTML5 && m > 8) {
          if(b._iO.usePeakData && typeof c !== "undefined" && c) {
            b.peakData = {left:c.leftPeak, right:c.rightPeak}
          }
          if(b._iO.useWaveformData && typeof d !== "undefined" && d) {
            b.waveformData = {left:d.split(","), right:j.split(",")}
          }
          if(b._iO.useEQData && typeof f !== "undefined" && f && f.leftEQ && (a = f.leftEQ.split(","), b.eqData = a, b.eqData.left = a, typeof f.rightEQ !== "undefined" && f.rightEQ)) {
            b.eqData.right = f.rightEQ.split(",")
          }
        }
        b.playState === 1 && (!b.isHTML5 && m === 8 && !b.position && b.isBuffering && b._onbufferchange(0), b._iO.whileplaying && b._iO.whileplaying.apply(b));
        return true
      };
      this._onid3 = function(a, c) {
        var d = [], j, f;
        for(j = 0, f = a.length;j < f;j++) {
          d[a[j]] = c[j]
        }
        b.id3 = t(b.id3, d);
        b._iO.onid3 && b._iO.onid3.apply(b)
      };
      this._onconnect = function(a) {
        a = a === 1;
        if(b.connected = a) {
          b.failures = 0, p(b.sID) && (b.getAutoPlay() ? b.play(void 0, b.getAutoPlay()) : b._iO.autoLoad && b.load()), b._iO.onconnect && b._iO.onconnect.apply(b, [a])
        }
      };
      this._ondataerror = function() {
        b.playState > 0 && b._iO.ondataerror && b._iO.ondataerror.apply(b)
      }
    };
    ea = function() {
      return o.body || o._docElement || o.getElementsByTagName("div")[0]
    };
    n = function(a) {
      return o.getElementById(a)
    };
    t = function(a, b) {
      var c = {}, f, g;
      for(f in a) {
        a.hasOwnProperty(f) && (c[f] = a[f])
      }
      f = typeof b === "undefined" ? d.defaultOptions : b;
      for(g in f) {
        f.hasOwnProperty(g) && typeof c[g] === "undefined" && (c[g] = f[g])
      }
      return c
    };
    r = function() {
      function a(b) {
        var b = Ha.call(b), d = b.length;
        c ? (b[1] = "on" + b[1], d > 3 && b.pop()) : d === 3 && b.push(false);
        return b
      }
      function b(a, b) {
        var j = a.shift(), f = [d[b]];
        if(c) {
          j[f](a[0], a[1])
        }else {
          j[f].apply(j, a)
        }
      }
      var c = k.attachEvent, d = {add:c ? "attachEvent" : "addEventListener", remove:c ? "detachEvent" : "removeEventListener"};
      return{add:function() {
        b(a(arguments), "add")
      }, remove:function() {
        b(a(arguments), "remove")
      }}
    }();
    w = {abort:f(function() {
    }), canplay:f(function() {
      if(this._t._html5_canplay) {
        return true
      }
      this._t._html5_canplay = true;
      this._t._onbufferchange(0);
      var a = !isNaN(this._t.position) ? this._t.position / 1E3 : null;
      if(this._t.position && this.currentTime !== a) {
        try {
          this.currentTime = a
        }catch(b) {
        }
      }
    }), load:f(function() {
      this._t.loaded || (this._t._onbufferchange(0), this._t._whileloading(this._t.bytesTotal, this._t.bytesTotal, this._t._get_html5_duration()), this._t._onload(true))
    }), emptied:f(function() {
    }), ended:f(function() {
      this._t._onfinish()
    }), error:f(function() {
      this._t._onload(false)
    }), loadeddata:f(function() {
      var a = this._t, b = a.bytesTotal || 1;
      if(!a._loaded && !P) {
        a.duration = a._get_html5_duration(), a._whileloading(b, b, a._get_html5_duration()), a._onload(true)
      }
    }), loadedmetadata:f(function() {
    }), loadstart:f(function() {
      this._t._onbufferchange(1)
    }), play:f(function() {
      this._t._onbufferchange(0)
    }), playing:f(function() {
      this._t._onbufferchange(0)
    }), progress:f(function(a) {
      if(this._t.loaded) {
        return false
      }
      var b, c = 0, d = a.target.buffered;
      b = a.loaded || 0;
      var f = a.total || 1;
      if(d && d.length) {
        for(b = d.length;b--;) {
          c = d.end(b) - d.start(b)
        }
        b = c / a.target.duration
      }
      isNaN(b) || (this._t._onbufferchange(0), this._t._whileloading(b, f, this._t._get_html5_duration()), b && f && b === f && w.load.call(this, a))
    }), ratechange:f(function() {
    }), suspend:f(function(a) {
      w.progress.call(this, a);
      this._t._onsuspend()
    }), stalled:f(function() {
    }), timeupdate:f(function() {
      this._t._onTimer()
    }), waiting:f(function() {
      this._t._onbufferchange(1)
    })};
    Y = function(a) {
      return!a.serverURL && (a.type ? N({type:a.type}) : N({url:a.url}) || d.html5Only)
    };
    ka = function(a) {
      if(a) {
        a.src = Ia ? "" : "about:blank"
      }
    };
    N = function(a) {
      function b(a) {
        return d.preferFlash && u && !d.ignoreFlash && typeof d.flash[a] !== "undefined" && d.flash[a]
      }
      if(!d.useHTML5Audio || !d.hasHTML5) {
        return false
      }
      var c = a.url || null, a = a.type || null, f = d.audioFormats, g;
      if(a && d.html5[a] !== "undefined") {
        return d.html5[a] && !b(a)
      }
      if(!z) {
        z = [];
        for(g in f) {
          f.hasOwnProperty(g) && (z.push(g), f[g].related && (z = z.concat(f[g].related)))
        }
        z = RegExp("\\.(" + z.join("|") + ")(\\?.*)?$", "i")
      }
      g = c ? c.toLowerCase().match(z) : null;
      if(!g || !g.length) {
        if(a) {
          c = a.indexOf(";"), g = (c !== -1 ? a.substr(0, c) : a).substr(6)
        }else {
          return false
        }
      }else {
        g = g[1]
      }
      return g && typeof d.html5[g] !== "undefined" ? d.html5[g] && !b(g) : (a = "audio/" + g, c = d.html5.canPlayType({type:a}), (d.html5[g] = c) && d.html5[a] && !b(a))
    };
    ya = function() {
      function a(c) {
        var f, g, j = false;
        if(!b || typeof b.canPlayType !== "function") {
          return false
        }
        if(c instanceof Array) {
          for(f = 0, g = c.length;f < g && !j;f++) {
            if(d.html5[c[f]] || b.canPlayType(c[f]).match(d.html5Test)) {
              j = true, d.html5[c[f]] = true, d.flash[c[f]] = !(!d.preferFlash || !u || !c[f].match(Da))
            }
          }
          return j
        }else {
          return c = b && typeof b.canPlayType === "function" ? b.canPlayType(c) : false, !(!c || !c.match(d.html5Test))
        }
      }
      if(!d.useHTML5Audio || typeof Audio === "undefined") {
        return false
      }
      var b = typeof Audio !== "undefined" ? La ? new Audio(null) : new Audio : null, c, f = {}, g, h;
      g = d.audioFormats;
      for(c in g) {
        if(g.hasOwnProperty(c) && (f[c] = a(g[c].type), f["audio/" + c] = f[c], d.flash[c] = d.preferFlash && !d.ignoreFlash && c.match(Da) ? true : false, g[c] && g[c].related)) {
          for(h = g[c].related.length;h--;) {
            f["audio/" + g[c].related[h]] = f[c], d.html5[g[c].related[h]] = f[c], d.flash[g[c].related[h]] = f[c]
          }
        }
      }
      f.canPlayType = b ? a : null;
      d.html5 = t(d.html5, f);
      return true
    };
    C = function() {
    };
    V = function(a) {
      if(m === 8 && a.loops > 1 && a.stream) {
        a.stream = false
      }
      return a
    };
    W = function(a) {
      if(a && !a.usePolicyFile && (a.onid3 || a.usePeakData || a.useWaveformData || a.useEQData)) {
        a.usePolicyFile = true
      }
      return a
    };
    ia = function() {
    };
    aa = function() {
      return false
    };
    ta = function(a) {
      for(var b in a) {
        a.hasOwnProperty(b) && typeof a[b] === "function" && (a[b] = aa)
      }
    };
    U = function(a) {
      typeof a === "undefined" && (a = false);
      (y || a) && d.disable(a)
    };
    ua = function(a) {
      if(a) {
        if(a.match(/\.swf(\?.*)?$/i)) {
          if(a.substr(a.toLowerCase().lastIndexOf(".swf?") + 4)) {
            return a
          }
        }else {
          a.lastIndexOf("/") !== a.length - 1 && (a += "/")
        }
      }
      a = (a && a.lastIndexOf("/") !== -1 ? a.substr(0, a.lastIndexOf("/") + 1) : "./") + d.movieURL;
      d.noSWFCache && (a += "?ts=" + (new Date).getTime());
      return a
    };
    ca = function() {
      m = parseInt(d.flashVersion, 10);
      if(m !== 8 && m !== 9) {
        d.flashVersion = m = 8
      }
      var a = d.debugMode || d.debugFlash ? "_debug.swf" : ".swf";
      if(d.useHTML5Audio && !d.html5Only && d.audioFormats.mp4.required && m < 9) {
        d.flashVersion = m = 9
      }
      d.version = d.versionNumber + (d.html5Only ? " (HTML5-only mode)" : m === 9 ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
      m > 8 ? (d.defaultOptions = t(d.defaultOptions, d.flash9Options), d.features.buffering = true, d.defaultOptions = t(d.defaultOptions, d.movieStarOptions), d.filePatterns.flash9 = RegExp("\\.(mp3|" + Ga.join("|") + ")(\\?.*)?$", "i"), d.features.movieStar = true) : d.features.movieStar = false;
      d.filePattern = d.filePatterns[m !== 8 ? "flash9" : "flash8"];
      d.movieURL = (m === 8 ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", a);
      d.features.peakData = d.features.waveformData = d.features.eqData = m > 8
    };
    sa = function(a, b) {
      if(!d.o) {
        return false
      }
      d.o._setPolling(a, b)
    };
    fa = function() {
      if(d.debugURLParam.test($)) {
        d.debugMode = true
      }
    };
    p = this.getSoundById;
    H = function() {
      var a = [];
      d.debugMode && a.push(d.swfCSS.sm2Debug);
      d.debugFlash && a.push(d.swfCSS.flashDebug);
      d.useHighPerformance && a.push(d.swfCSS.highPerf);
      return a.join(" ")
    };
    ha = function() {
      C("fbHandler");
      var a = d.getMoviePercent(), b = d.swfCSS, c = {type:"FLASHBLOCK"};
      if(d.html5Only) {
        return false
      }
      if(d.ok()) {
        if(d.oMC) {
          d.oMC.className = [H(), b.swfDefault, b.swfLoaded + (d.didFlashBlock ? " " + b.swfUnblocked : "")].join(" ")
        }
      }else {
        if(v) {
          d.oMC.className = H() + " " + b.swfDefault + " " + (a === null ? b.swfTimedout : b.swfError)
        }
        d.didFlashBlock = true;
        D({type:"ontimeout", ignoreInit:true, error:c});
        G(c)
      }
    };
    ba = function(a, b, c) {
      typeof x[a] === "undefined" && (x[a] = []);
      x[a].push({method:b, scope:c || null, fired:false})
    };
    D = function(a) {
      a || (a = {type:"onready"});
      if(!s && a && !a.ignoreInit) {
        return false
      }
      if(a.type === "ontimeout" && d.ok()) {
        return false
      }
      var b = {success:a && a.ignoreInit ? d.ok() : !y}, c = a && a.type ? x[a.type] || [] : [], f = [], g, b = [b], h = v && d.useFlashBlock && !d.ok();
      if(a.error) {
        b[0].error = a.error
      }
      for(a = 0, g = c.length;a < g;a++) {
        c[a].fired !== true && f.push(c[a])
      }
      if(f.length) {
        for(a = 0, g = f.length;a < g;a++) {
          if(f[a].scope ? f[a].method.apply(f[a].scope, b) : f[a].method.apply(this, b), !h) {
            f[a].fired = true
          }
        }
      }
      return true
    };
    E = function() {
      k.setTimeout(function() {
        d.useFlashBlock && ha();
        D();
        d.onload instanceof Function && d.onload.apply(k);
        d.waitForWindowLoad && r.add(k, "load", E)
      }, 1)
    };
    Z = function() {
      if(u !== void 0) {
        return u
      }
      var a = false, b = navigator, c = b.plugins, d, f = k.ActiveXObject;
      if(c && c.length) {
        (b = b.mimeTypes) && b["application/x-shockwave-flash"] && b["application/x-shockwave-flash"].enabledPlugin && b["application/x-shockwave-flash"].enabledPlugin.description && (a = true)
      }else {
        if(typeof f !== "undefined") {
          try {
            d = new f("ShockwaveFlash.ShockwaveFlash")
          }catch(g) {
          }
          a = !!d
        }
      }
      return u = a
    };
    xa = function() {
      var a, b;
      if(ma && q.match(/os (1|2|3_0|3_1)/i)) {
        d.hasHTML5 = false;
        d.html5Only = true;
        if(d.oMC) {
          d.oMC.style.display = "none"
        }
        return false
      }
      if(d.useHTML5Audio) {
        if(!d.html5 || !d.html5.canPlayType) {
          return d.hasHTML5 = false, true
        }else {
          d.hasHTML5 = true
        }
        if(na && Z()) {
          return true
        }
      }else {
        return true
      }
      for(b in d.audioFormats) {
        if(d.audioFormats.hasOwnProperty(b) && (d.audioFormats[b].required && !d.html5.canPlayType(d.audioFormats[b].type) || d.flash[b] || d.flash[d.audioFormats[b].type])) {
          a = true
        }
      }
      d.ignoreFlash && (a = false);
      d.html5Only = d.hasHTML5 && d.useHTML5Audio && !a;
      return!d.html5Only
    };
    va = function(a) {
      if(!a._hasTimer) {
        a._hasTimer = true
      }
    };
    wa = function(a) {
      if(a._hasTimer) {
        a._hasTimer = false
      }
    };
    G = function(a) {
      a = typeof a !== "undefined" ? a : {};
      d.onerror instanceof Function && d.onerror.apply(k, [{type:typeof a.type !== "undefined" ? a.type : null}]);
      typeof a.fatal !== "undefined" && a.fatal && d.disable()
    };
    Aa = function() {
      if(!na || !Z()) {
        return false
      }
      var a = d.audioFormats, b, c;
      for(c in a) {
        if(a.hasOwnProperty(c) && (c === "mp3" || c === "mp4")) {
          if(d.html5[c] = false, a[c] && a[c].related) {
            for(b = a[c].related.length;b--;) {
              d.html5[a[c].related[b]] = false
            }
          }
        }
      }
    };
    this._setSandboxType = function() {
    };
    this._externalInterfaceOK = function() {
      if(d.swfLoaded) {
        return false
      }
      (new Date).getTime();
      d.swfLoaded = true;
      I = false;
      na && Aa();
      A ? setTimeout(Q, 100) : Q()
    };
    T = function(a, b) {
      function c(a, b) {
        return'<param name="' + a + '" value="' + b + '" />'
      }
      if(J && K) {
        return false
      }
      if(d.html5Only) {
        return ca(), d.oMC = n(d.movieID), Q(), K = J = true, false
      }
      var f = b || d.url, g = d.altURL || f, h;
      h = ea();
      var i, l, k = H(), m, p = null, p = (p = o.getElementsByTagName("html")[0]) && p.dir && p.dir.match(/rtl/i), a = typeof a === "undefined" ? d.id : a;
      ca();
      d.url = ua(pa ? f : g);
      b = d.url;
      d.wmode = !d.wmode && d.useHighPerformance ? "transparent" : d.wmode;
      if(d.wmode !== null && (q.match(/msie 8/i) || !A && !d.useHighPerformance) && navigator.platform.match(/win32|win64/i)) {
        d.specialWmodeCase = true, d.wmode = null
      }
      h = {name:a, id:a, src:b, width:"auto", height:"auto", quality:"high", allowScriptAccess:d.allowScriptAccess, bgcolor:d.bgColor, pluginspage:Ea + "www.macromedia.com/go/getflashplayer", title:"JS/Flash audio component (SoundManager 2)", type:"application/x-shockwave-flash", wmode:d.wmode, hasPriority:"true"};
      if(d.debugFlash) {
        h.FlashVars = "debug=1"
      }
      d.wmode || delete h.wmode;
      if(A) {
        f = o.createElement("div"), l = ['<object id="' + a + '" data="' + b + '" type="' + h.type + '" title="' + h.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + Ea + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="' + h.width + '" height="' + h.height + '">', c("movie", b), c("AllowScriptAccess", d.allowScriptAccess), c("quality", h.quality), d.wmode ? c("wmode", d.wmode) : "", c("bgcolor", d.bgColor), c("hasPriority", "true"), 
        d.debugFlash ? c("FlashVars", h.FlashVars) : "", "</object>"].join("")
      }else {
        for(i in f = o.createElement("embed"), h) {
          h.hasOwnProperty(i) && f.setAttribute(i, h[i])
        }
      }
      fa();
      k = H();
      if(h = ea()) {
        if(d.oMC = n(d.movieID) || o.createElement("div"), d.oMC.id) {
          m = d.oMC.className;
          d.oMC.className = (m ? m + " " : d.swfCSS.swfDefault) + (k ? " " + k : "");
          d.oMC.appendChild(f);
          if(A) {
            i = d.oMC.appendChild(o.createElement("div")), i.className = d.swfCSS.swfBox, i.innerHTML = l
          }
          K = true
        }else {
          d.oMC.id = d.movieID;
          d.oMC.className = d.swfCSS.swfDefault + " " + k;
          i = k = null;
          if(!d.useFlashBlock) {
            if(d.useHighPerformance) {
              k = {position:"fixed", width:"8px", height:"8px", bottom:"0px", left:"0px", overflow:"hidden"}
            }else {
              if(k = {position:"absolute", width:"6px", height:"6px", top:"-9999px", left:"-9999px"}, p) {
                k.left = Math.abs(parseInt(k.left, 10)) + "px"
              }
            }
          }
          if(Ka) {
            d.oMC.style.zIndex = 1E4
          }
          if(!d.debugFlash) {
            for(m in k) {
              k.hasOwnProperty(m) && (d.oMC.style[m] = k[m])
            }
          }
          try {
            A || d.oMC.appendChild(f);
            h.appendChild(d.oMC);
            if(A) {
              i = d.oMC.appendChild(o.createElement("div")), i.className = d.swfCSS.swfBox, i.innerHTML = l
            }
            K = true
          }catch(r) {
            throw Error(C("domError") + " \n" + r.toString());
          }
        }
      }
      return J = true
    };
    S = function() {
      if(d.html5Only) {
        return T(), false
      }
      if(d.o) {
        return false
      }
      d.o = d.getMovie(d.id);
      if(!d.o) {
        M ? (A ? d.oMC.innerHTML = ga : d.oMC.appendChild(M), M = null, J = true) : T(d.id, d.url), d.o = d.getMovie(d.id)
      }
      d.oninitmovie instanceof Function && setTimeout(d.oninitmovie, 1);
      return true
    };
    R = function() {
      setTimeout(ra, 1E3)
    };
    ra = function() {
      if(X) {
        return false
      }
      X = true;
      r.remove(k, "load", R);
      if(I && !oa) {
        return false
      }
      var a;
      s || (a = d.getMoviePercent());
      setTimeout(function() {
        a = d.getMoviePercent();
        !s && Ca && (a === null ? d.useFlashBlock || d.flashLoadTimeout === 0 ? d.useFlashBlock && ha() : U(true) : d.flashLoadTimeout !== 0 && U(true))
      }, d.flashLoadTimeout)
    };
    B = function() {
      function a() {
        r.remove(k, "focus", B);
        r.remove(k, "load", B)
      }
      if(oa || !I) {
        return a(), true
      }
      oa = Ca = true;
      P && I && r.remove(k, "mousemove", B);
      X = false;
      a();
      return true
    };
    Ba = function() {
      var a, b = [];
      if(d.useHTML5Audio && d.hasHTML5) {
        for(a in d.audioFormats) {
          d.audioFormats.hasOwnProperty(a) && b.push(a + ": " + d.html5[a] + (!d.html5[a] && u && d.flash[a] ? " (using flash)" : d.preferFlash && d.flash[a] && u ? " (preferring flash)" : !d.html5[a] ? " (" + (d.audioFormats[a].required ? "required, " : "") + "and no flash support)" : ""))
        }
      }
    };
    L = function(a) {
      if(s) {
        return false
      }
      if(d.html5Only) {
        return s = true, E(), true
      }
      var b;
      if(!d.useFlashBlock || !d.flashLoadTimeout || d.getMoviePercent()) {
        s = true, y && (b = {type:!u && v ? "NO_FLASH" : "INIT_TIMEOUT"})
      }
      if(y || a) {
        if(d.useFlashBlock && d.oMC) {
          d.oMC.className = H() + " " + (d.getMoviePercent() === null ? d.swfCSS.swfTimedout : d.swfCSS.swfError)
        }
        D({type:"ontimeout", error:b});
        G(b);
        return false
      }
      if(d.waitForWindowLoad && !qa) {
        return r.add(k, "load", E), false
      }else {
        E()
      }
      return true
    };
    Q = function() {
      if(s) {
        return false
      }
      if(d.html5Only) {
        if(!s) {
          r.remove(k, "load", d.beginDelayedInit), d.enabled = true, L()
        }
        return true
      }
      S();
      try {
        d.o._externalInterfaceTest(false), sa(true, d.flashPollingInterval || (d.useHighPerformance ? 10 : 50)), d.debugMode || d.o._disableDebug(), d.enabled = true, d.html5Only || r.add(k, "unload", aa)
      }catch(a) {
        return G({type:"JS_TO_FLASH_EXCEPTION", fatal:true}), U(true), L(), false
      }
      L();
      r.remove(k, "load", d.beginDelayedInit);
      return true
    };
    F = function() {
      if(da) {
        return false
      }
      da = true;
      fa();
      if(!u && d.hasHTML5) {
        d.useHTML5Audio = true, d.preferFlash = false
      }
      ya();
      d.html5.usingFlash = xa();
      v = d.html5.usingFlash;
      Ba();
      if(!u && v) {
        d.flashLoadTimeout = 1
      }
      o.removeEventListener && o.removeEventListener("DOMContentLoaded", F, false);
      S();
      return true
    };
    la = function() {
      o.readyState === "complete" && (F(), o.detachEvent("onreadystatechange", la));
      return true
    };
    Z();
    r.add(k, "focus", B);
    r.add(k, "load", B);
    r.add(k, "load", R);
    P && I && r.add(k, "mousemove", B);
    o.addEventListener ? o.addEventListener("DOMContentLoaded", F, false) : o.attachEvent ? o.attachEvent("onreadystatechange", la) : G({type:"NO_DOM2_EVENTS", fatal:true});
    o.readyState === "complete" && setTimeout(F, 100)
  };
  a.soundManager = null
})(window);
pulse.error = {DuplicateName:function(a) {
  throw"There is already an object with the name " + a + " on this layer.";
}};
pulse.util = {find:function(a, c) {
  var g = [];
  if(a instanceof Array) {
    for(var f = 0;f < a.length;f++) {
      typeof a[f] == "function" && typeof a[f].name == "function" && a[f].name == c && g.push(a[f])
    }
  }else {
    if(typeof a == "object") {
      for(f in a) {
        f == c && g.push(a[f])
      }
    }
  }
  return g
}, intersects:function(a, c) {
  for(var g = [{x:a.x, y:a.y}, {x:a.x, y:a.y + a.height}, {x:a.x + a.width, y:a.y}, {x:a.x + a.width, y:a.y + a.height}], f = 0;f < 4;f++) {
    var h = g[f];
    if(h.x < c.width && h.x > c.x && h.y < c.height && h.y > c.y) {
      return true
    }
  }
  return false
}, compare:function(a, c) {
  if(a instanceof Point && c instanceof Point) {
    return a.x == c.x && a.y == c.y ? true : false
  }
}, checkValue:function(a, c) {
  a === null && (a = c);
  return a
}, checkProperty:function(a, c, g) {
  typeof a == "undefined" && (a = {});
  if(!a.hasOwnProperty(c) || a[c] === null) {
    a[c] = g
  }
  return a
}, checkParams:function(a, c) {
  if(typeof a == "undefined" || a === null || typeof a != "object") {
    a = {}
  }
  for(var g in c) {
    if(!a.hasOwnProperty(g) || a[g] === null) {
      a[g] = c[g]
    }
  }
  return a
}, getLength:function(a) {
  var c = 0, g;
  for(g in a) {
    a.hasOwnProperty(g) && c++
  }
  return c
}, compareZIndexes:function(a, c) {
  za = 0;
  if(a.hasOwnProperty("zindex")) {
    za = a.zindex
  }
  zb = 0;
  if(c.hasOwnProperty("zindex")) {
    zb = c.zindex
  }
  return za < zb ? -1 : za > zb ? 1 : 0
}, getOrderedKeys:function(a) {
  var c = [], g;
  for(g in a) {
    a[g].hasOwnProperty("name") && c.push(a[g])
  }
  c.sort(pulse.util.compareZIndexes);
  a = [];
  for(g = 0;g < c.length;g++) {
    a.push(c[g].name)
  }
  return a
}, getIFrame:function(a) {
  var c = document.createElement("iframe");
  if(a === null) {
    a = document.body
  }
  a.appendChild(c);
  c.doc = null;
  if(c.contentDocument) {
    c.doc = c.contentDocument
  }else {
    if(c.contentWindow) {
      c.doc = c.contentWindow.document
    }else {
      if(c.document) {
        c.doc = c.document
      }
    }
  }
  if(c.doc === null) {
    throw"Document not found, append the parent element to the DOM before creating the IFrame";
  }
  c.doc.open();
  c.doc.close();
  return c
}};
pulse.Event = PClass.extend({init:function() {
  this.sender = null
}});
pulse.MouseEvent = pulse.Event.extend({init:function() {
  this._super();
  this.window = {x:0, y:0};
  this.world = {x:0, y:0};
  this.parent = {x:0, y:0};
  this.position = {x:0, y:0};
  this.scrollDelta = 0
}});
pulse.EventManager = PClass.extend({init:function(a) {
  a = pulse.util.checkParams(a, {owner:null, masterCallback:null});
  this.owner = a.owner;
  this.masterCallback = a.masterCallback;
  this._private = {};
  this._private.events = {}
}, bind:function(a, c) {
  this._private.events.hasOwnProperty(a) || (this._private.events[a] = []);
  this._private.events[a].push(c)
}, unbind:function(a) {
  this._private.events.hasOwnProperty(a) && delete this._private.events[a]
}, hasEvent:function(a) {
  return this._private.events.hasOwnProperty(a) ? true : false
}, raiseEvent:function(a, c) {
  if(this.hasEvent(a)) {
    for(var g = 0;g < this._private.events[a].length;g++) {
      this._private.events[a][g](c)
    }
  }
  typeof this.masterCallback == "function" && (this.owner ? this.masterCallback.call(this.owner, a, c) : this.masterCallback(a, c))
}});
pulse.EventManager.DraggedItems = {};
pulse.Node = PClass.extend({init:function(a) {
  a = pulse.util.checkParams(a, {name:"Node" + pulse.Node.nodeIdx++});
  this.name = a.name;
  this._private = {}
}, update:function() {
  pulse.DEBUG && console.log("node update")
}});
pulse.Node.nodeIdx = 0;
pulse.Asset = pulse.Node.extend({init:function(a) {
  this._super(a);
  a = pulse.util.checkParams(a, {filename:"", autoLoad:true});
  this.filename = a.filename;
  this.autoLoad = a.autoLoad;
  this.percentLoaded = 0;
  this.events = new pulse.EventManager;
  this.error = false;
  this._private = {}
}, load:function() {
}, complete:function() {
  this.events.raiseEvent("complete", {asset:this})
}});
pulse.Texture = pulse.Asset.extend({init:function(a) {
  this._super(a);
  if(a.filename == "") {
    throw"Invalid source for pulse image.";
  }
  this._private.image = new Image;
  this._private.imgCanvas = document.createElement("canvas");
  if(this.autoLoad == true) {
    this._private.image.src = this.filename
  }
  this.scaleY = this.scaleX = 1;
  this.rotation = 0;
  this.alpha = 100;
  var c = this;
  this._private.image.onload = function() {
    c.percentLoaded = 100;
    c.events.raiseEvent("load", {asset:c.name});
    c.complete();
    c._private.lastSlice = {x:-1, y:-1, width:c._private.image.width * c.scaleX, height:c._private.image.height * c.scaleY, rotation:c.rotation, alpha:c.alpha}
  };
  this._private.image.onerror = function() {
    c.error = true
  }
}, load:function() {
  if(this.autoLoad != true) {
    this._private.image.src = this.filename
  }
}, width:function() {
  return this._private.image.width * this.scaleX
}, height:function() {
  return this._private.image.height * this.scaleY
}, slice:function(a, c, g, f) {
  if(this.percentLoaded != 100) {
    return null
  }
  if(a == this._private.lastSlice.x && c == this._private.lastSlice.y && g == this._private.lastSlice.width && f == this._private.lastSlice.height && this.rotation == this._private.lastSlice.rotation && this.alpha == this._private.lastSlice.alpha) {
    return this._private.imgCanvas
  }
  this._private.lastSlice = {x:a, y:c, width:g * this.scaleX, height:f * this.scaleY, rotation:this.rotation, alpha:this.alpha};
  if(a == null || a < 0) {
    a = 0
  }
  if(a > this._private.image.width) {
    a = this._private.image.width
  }
  if(c == null || c < 0) {
    c = 0
  }
  c > this._private.image.height && (c = f);
  if(g == null || g > this._private.image.width) {
    g = this._private.image.width
  }
  a + g > this._private.image.width && (g = this._private.image.width - a);
  if(f == null || f > this._private.image.height) {
    f = this._private.image.height
  }
  c + f > this._private.image.height && (f = this._private.image.height - c);
  var h = g * this.scaleX, i = f * this.scaleY, l = h, d = i;
  this.rotation % 360 != 0 && (l = h * Math.abs(Math.cos(Math.PI * this.rotation / 180)) + i * Math.abs(Math.sin(Math.PI * this.rotation / 180)), d = i * Math.abs(Math.cos(Math.PI * this.rotation / 180)) + h * Math.abs(Math.sin(Math.PI * this.rotation / 180)));
  this._private.imgCanvas.width = l;
  this._private.imgCanvas.height = d;
  var n = this._private.imgCanvas.getContext("2d");
  n.save();
  var q = 0, k = 0;
  this.rotation % 360 != 0 && (q = (l - h) / 2, k = (d - i) / 2, l /= 2, d /= 2, n.translate(l, d), n.rotate(Math.PI * (this.rotation % 360) / 180), n.translate(-l, -d));
  n.globalAlpha = this.alpha / 100;
  n.drawImage(this._private.image, a, c, g, f, q, k, h, i);
  if(pulse.DEBUG) {
    n.save(), n.fillStyle = "#42CCDE", n.beginPath(), n.arc(this._private.imgCanvas.width / 2, this._private.imgCanvas.height / 2, 3, 0, Math.PI * 2, true), n.closePath(), n.fill(), n.restore()
  }
  if(pulse.DEBUG) {
    n.strokeStyle = "#FF2200", n.strokeRect(q, k, h, i)
  }
  n.restore();
  return this._private.imgCanvas
}});
pulse.BitmapChar = PClass.extend({init:function() {
  this.position = {x:0, y:0};
  this.size = {width:0, height:0};
  this.offset = {x:0, y:0};
  this.page = this.xAdvance = 0
}});
pulse.BitmapFont = pulse.Asset.extend({init:function(a) {
  this._super(a);
  this.fileDirectory = this.imageFilename = "";
  this.image = null;
  this.base = this.lineHeight = 0;
  this.size = {width:0, height:0};
  this.characters = {};
  var a = window.location.href.split("/"), c = this.filename.split("/");
  a.pop();
  c.pop();
  this.fileDirectory = a.join("/");
  c.length > 0 && (this.fileDirectory += "/" + c.join("/"));
  this.autoLoad && this.load()
}, load:function() {
  var a = this, c = new XMLHttpRequest;
  c.open("GET", this.filename, true);
  c.onreadystatechange = function() {
    if(c.readyState === 4 && c.status === 200) {
      var g = c.responseText.split("\n");
      a.percentLoaded = 50;
      a.parse(g)
    }
  };
  c.send(null)
}, parse:function(a) {
  for(var c, g = 0;g < a.length;g++) {
    if(c = a[g], c.indexOf("common") == 0) {
      c = c.split(" ");
      for(var f = 0;f < c.length;f++) {
        var h = c[f].split("=");
        if(h.length > 1) {
          switch(h[0]) {
            case "lineHeight":
              this.lineHeight = parseInt(h[1]);
              break;
            case "base":
              this.base = parseInt(h[1]);
              break;
            case "scaleW":
              this.size.width = parseInt(h[1]);
              break;
            case "scaleH":
              this.size.height = parseInt(h[1])
          }
        }
      }
    }else {
      if(c.indexOf("page") == 0) {
        c = c.split(" ");
        for(f = 0;f < c.length;f++) {
          if(h = c[f].split("="), h.length > 1 && h[0] == "file") {
            this.imageFilename = h[1].replace(/"/gi, "")
          }
        }
      }else {
        if(c.indexOf("char") == 0) {
          var i = new pulse.BitmapChar;
          c = c.split(" ");
          for(f = 0;f < c.length;f++) {
            if(h = c[f].split("="), h.length > 1) {
              switch(h[0]) {
                case "id":
                  this.characters[h[1]] = i;
                  break;
                case "x":
                  i.position.x = parseInt(h[1]);
                  break;
                case "y":
                  i.position.y = parseInt(h[1]);
                  break;
                case "width":
                  i.size.width = parseInt(h[1]);
                  break;
                case "height":
                  i.size.height = parseInt(h[1]);
                  break;
                case "xoffset":
                  i.offset.x = parseInt(h[1]);
                  break;
                case "yoffset":
                  i.offset.y = parseInt(h[1]);
                  break;
                case "xadvance":
                  i.xAdvance = parseInt(h[1]);
                  break;
                case "page":
                  i.page = parseInt(h[1])
              }
            }
          }
        }
      }
    }
  }
  var l = this;
  this.image = new Image;
  this.image.src = this.fileDirectory + "/" + this.imageFilename;
  this.image.onload = function() {
    l.percentLoaded = 100;
    l.complete()
  }
}, getStringBitmapChars:function(a) {
  for(var c = [], g = 0, f = 0;f < a.length;f++) {
    g = a.charCodeAt(f), c.push(this.characters[g])
  }
  return c
}, getStringWidth:function(a) {
  for(var c = 0, g = 0, g = null, f = 0;f < a.length;f++) {
    g = a.charCodeAt(f), g = this.characters[g], c += g.xAdvance
  }
  return c
}});
pulse.Sound = pulse.Asset.extend({init:function(a) {
  this._super(a);
  a = pulse.util.checkParams(a, {type:"flash", loop:false});
  this._private.type = a.type;
  this._private.type == "flash" && this.initFlashPlayer();
  this._private.audio = null;
  this.loop = a.loop;
  this.paused = this.playing = false;
  this.autoLoad && (this._private.type == "html5" || this._private.type == "flash" && pulse.Sound.FlashReady) && this.load()
}, load:function() {
  var a = this;
  switch(this._private.type) {
    case "flash":
      this._private.audio = soundManager.createSound({id:"mySound", url:this.filename, autoLoad:true, autoPlay:false, whileloading:function() {
        a.percentLoaded = this.bytesLoaded / this.bytesTotal * 100
      }, onload:function() {
        a.percentLoaded = 100;
        a.complete()
      }, onfinish:function() {
        a.finished()
      }});
      break;
    case "html5":
      audio = document.createElement("audio"), audio.canPlayType ? (audio.setAttribute("preload", "auto"), audio.canPlayType && "" != audio.canPlayType("audio/mpeg") ? audio.setAttribute("src", this.filename + ".mp3") : audio.canPlayType && "" != audio.canPlayType('audio/ogg; codecs="vorbis"') && audio.setAttribute("src", this.filename + ".ogg"), audio.addEventListener("progress", function() {
        a.percentLoaded = audio.buffered.end(0) / audio.duration * 100;
        console.log(a.percentLoaded);
        a.percentLoaded >= 100 && a.complete()
      }), audio.addEventListener("ended", function() {
        a.finished()
      })) : audio = null, this._private.audio = audio
  }
}, play:function() {
  if(this._private.audio) {
    switch(this._private.type) {
      case "flash":
        this.paused ? this._private.audio.resume() : this._private.audio.play();
        break;
      case "html5":
        this.loop && this._private.audio.setAttribute("loop", "loop"), this._private.audio.play()
    }
    this.playing = true;
    this.paused = false
  }
}, pause:function() {
  if(this._private.audio) {
    switch(this._private.type) {
      case "flash":
      ;
      case "html5":
        this._private.audio.pause()
    }
    this.playing = false;
    this.paused = true
  }
}, stop:function() {
  if(this._private.audio) {
    switch(this.paused = this.playing = false, this._private.type) {
      case "flash":
        this._private.audio.stop();
        break;
      case "html5":
        this._private.audio.pause(), this._private.audio.currentTime = 0
    }
  }
}, finished:function() {
  switch(this._private.type) {
    case "flash":
      this.loop && this.start()
  }
  this.events.raiseEvent("finished", {sound:this})
}, initFlashPlayer:function() {
  if(pulse.Sound.FlashInitialized == false) {
    pulse.Sound.FlashInitialized = true, window.soundManager = new SoundManager(pulse.libsrc + "/other/"), soundManager.beginDelayedInit(), soundManager.flashVersion = 8, soundManager.useFlashBlock = false, soundManager.onready(function() {
      pulse.Sound.FlashReady = true;
      this.autoLoad && this.load()
    }, this), soundManager.ontimeout(function() {
      console.log(e)
    })
  }else {
    if(pulse.Sound.FlashReady == false) {
      soundManager.onready(function() {
        this.autoLoad && this.load()
      }, this)
    }
  }
}});
pulse.Sound.FlashInitialized = false;
pulse.Sound.FlashReady = false;
pulse.AssetBundle = PClass.extend({init:function() {
  this.assets = [];
  this.events = new pulse.EventManager;
  this._private = {};
  this.percentLoaded = this._private.numberLoaded = 0
}, addAsset:function(a) {
  if(a instanceof pulse.Asset) {
    var c = this;
    a.events.bind("load", function() {
      c._private.numberLoaded++;
      c.updatePercent();
      c.percentLoaded == 100 && c.events.raiseEvent("complete", {})
    });
    this.assets.push(a)
  }
}, getAsset:function(a) {
  for(var c = 0;c < this.assets.length;c++) {
    if(this.assets[c].name == a) {
      return this.assets[c]
    }
  }
  return null
}, load:function() {
  for(var a = 0;a < this.assets.length;a++) {
    this.assets[a].load()
  }
}, updatePercent:function() {
  this.percentLoaded = this._private.numberLoaded / this.assets.length * 100;
  this.percentLoaded = parseFloat(this.percentLoaded.toFixed(2))
}});
pulse.AssetManager = PClass.extend({init:function() {
  this.bundles = {};
  this.addBundle(new pulse.AssetBundle, "global");
  this.bundles.global.percentLoaded = 100;
  this._private = {};
  this._private.bundlesLoaded = 1;
  this.percentLoaded = 0;
  this.events = new pulse.EventManager
}, addBundle:function(a, c) {
  if(a instanceof pulse.AssetBundle && !this.bundles.hasOwnProperty(c)) {
    var g = this;
    a.events.bind("complete", function() {
      g._private.bundlesLoaded++;
      g.updatePercent();
      g.percentLoaded == 100 && g.events.raiseEvent("complete", {})
    });
    this.bundles[c] = a
  }
}, addAsset:function(a, c) {
  a instanceof pulse.Asset && (typeof c == "string" ? (this.bundles.hasOwnProperty(c) || this.addBundle(new pulse.AssetBundle, c), this.bundles[c].addAsset(a), this.bundles[c].percentLoaded == 100 && this.loadedBundles--) : (this.bundles.global.addAsset(a), this.bundles.global.percentLoaded == 100 && (this.bundles.global.updatePercent(), this.loadedBundles--)))
}, getAsset:function(a, c) {
  if(c) {
    if(this.bundles.hasOwnProperty(c)) {
      return this.bundles[c].getAsset(a)
    }
  }else {
    return this.bundles.global.getAsset(a)
  }
}, load:function() {
  for(var a in this.bundles) {
    this.bundles[a].load()
  }
}, updatePercent:function() {
  var a = pulse.util.getLength(this.bundles) * 100, c = 0, g;
  for(g in this.bundles) {
    c += this.bundles[g].percentLoaded
  }
  this.percentLoaded = c / a * 100;
  this.percentLoaded = parseFloat(this.percentLoaded.toFixed(2))
}});
pulse.Visual = pulse.Node.extend({init:function(a) {
  this._super(a);
  this.canvas = document.createElement("canvas");
  this._private.context = this.canvas.getContext("2d");
  this._private.firstUpdate = true;
  this.position = {x:0, y:0};
  this.positionPrevious = {x:0, y:0};
  this.size = {width:0, height:0};
  this.sizePrevious = {width:0, height:0};
  this.bounds = {x:0, y:0, width:0, height:0};
  this.boundsPrevious = {x:0, y:0, width:0, height:0};
  this.anchor = {x:0.5, y:0.5};
  this.anchorPrevious = {x:0.5, y:0.5};
  this.anchorAngle = this.anchorRadius = 0;
  this.scale = {x:1, y:1};
  this.scalePrevious = {x:1, y:1};
  this.rotationPrevious = this.rotation = 0;
  this.positionTopLeft = {x:0, y:0};
  this.positionTopLeftPrevious = {x:0, y:0};
  this.invalidProperties = true;
  this.zindexPrevious = this.zindex = 0;
  this.shuffled = false;
  this.alphaPrevious = this.alpha = 100;
  this.updated = this.visiblePrevious = this.visible = true
}, move:function(a, c) {
  this.position = {x:this.position.x + a, y:this.position.y + c}
}, update:function(a) {
  this._super(a);
  if(this._private.firstUpdate) {
    this._private.firstUpdate = false, this.invalidProperties = true
  }
  if(this.position.x != this.positionPrevious.x || this.position.y != this.positionPrevious.y) {
    this.positionPrevious.x = this.position.x, this.positionPrevious.y = this.position.y, this.invalidProperties = true
  }
  if(this.size.width != this.sizePrevious.width || this.size.height != this.sizePrevious.height) {
    this.sizePrevious.width = this.size.width, this.sizePrevious.height = this.size.height, this.invalidProperties = true
  }
  if(this.anchor.x != this.anchorPrevious.x || this.anchor.y != this.anchorPrevious.y) {
    this.anchorPrevious.x = this.anchor.x, this.anchorPrevious.y = this.anchor.y, this.invalidProperties = true
  }
  if(this.scale.x != this.scalePrevious.x || this.scale.y != this.scalePrevious.y) {
    this.scalePrevious.x = this.scale.x, this.scalePrevious.y = this.scale.y, this.invalidProperties = true
  }
  if(this.rotation != this.rotationPrevious) {
    this.rotationPrevious = this.rotation, this.invalidProperties = true
  }
  if(this.zindex != this.zindexPrevious) {
    this.zindexPrevious = this.zindex, this.updated = this.shuffled = true
  }
  if(this.alpha != this.alphaPrevious) {
    this.alphaPrevious = this.alpha, this.updated = true
  }
  if(this.visible != this.visiblePrevious) {
    this.visiblePrevious = this.visible, this.updated = true
  }
  if(this.invalidProperties) {
    this.calculateProperties(), this.updated = true
  }
}, draw:function(a) {
  pulse.DEBUG && console.log("visual node draw");
  if(!(this.canvas.width == 0 || this.canvas.height == 0)) {
    a.save();
    if(pulse.DEBUG) {
      a.save(), a.fillStyle = "#CCDE42", a.beginPath(), a.arc(this.positionTopLeft.x + this.canvas.width / 2, this.positionTopLeft.y + this.canvas.height / 2, 3, 0, Math.PI * 2, true), a.closePath(), a.fill(), a.restore()
    }
    if(pulse.DEBUG) {
      a.strokeStyle = "#0022FF", a.strokeRect(this.positionTopLeft.x, this.positionTopLeft.y, this.size.width, this.size.height)
    }
    a.globalAlpha = this.alpha / 100;
    if(this.rotation > 0) {
      var c = this.positionTopLeft.x + this.size.width * Math.abs(this.scale.x) / 2, g = this.positionTopLeft.y + this.size.height * Math.abs(this.scale.y) / 2;
      a.translate(c, g);
      a.rotate(Math.PI * (this.rotation % 360) / 180);
      a.translate(-c, -g)
    }
    a.scale(this.scale.x, this.scale.y);
    c = this.positionTopLeft.x / this.scale.x;
    this.scale.x < 1 && (c -= this.size.width);
    g = this.positionTopLeft.y / this.scale.y;
    this.scale.y < 1 && (g -= this.size.height);
    a.drawImage(this.canvas, c, g);
    if(pulse.DEBUG) {
      a.strokeStyle = "#22FF33", a.strokeRect(this.positionTopLeft.x / Math.abs(this.scale.x), this.positionTopLeft.y / Math.abs(this.scale.y), this.size.width, this.size.height)
    }
    a.restore();
    if(pulse.DEBUG) {
      a.save(), a.fillStyle = "#FF3300", a.beginPath(), a.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2, true), a.closePath(), a.fill(), a.restore()
    }
    this.updated = false
  }
}, calculateProperties:function() {
  var a = this.size.width, c = this.size.height, a = this.anchor.x * a - a / 2, c = this.anchor.y * c - c / 2;
  this.anchorRadius = Math.sqrt(a * a + c * c);
  this.anchorAngle = Math.atan2(c, a) * 180 / Math.PI - 90;
  if(isNaN(this.anchorAngle)) {
    this.anchorAngle = 0
  }
  this.positionTopLeftPrevious = this.positionTopLeft;
  a = this.size.width * Math.abs(this.scale.x) / 2;
  c = this.size.height * Math.abs(this.scale.y) / 2;
  a = this.position.x - Math.sin(Math.PI * -(this.rotation + this.anchorAngle) / 180) * this.anchorRadius - a;
  c = this.position.y - Math.cos(Math.PI * -(this.rotation + this.anchorAngle) / 180) * this.anchorRadius - c;
  this.positionTopLeft = {x:a, y:c};
  if(this.canvas.width != this.size.width) {
    this.canvas.width = this.size.width
  }
  if(this.canvas.height != this.size.height) {
    this.canvas.height = this.size.height
  }
  this.boundsPrevious = this.bounds;
  this.bounds = {x:this.positionTopLeft.x, y:this.positionTopLeft.y, width:this.size.width * Math.abs(this.scale.x), height:this.size.height * Math.abs(this.scale.y)};
  this.invalidProperties = false
}});
pulse.Action = pulse.Node.extend({init:function(a) {
  this._super(a);
  if(a.target == "") {
    throw"Target must be included for action.";
  }
  this.target = a.target;
  this.isComplete = this.isRunning = false;
  this.events = new pulse.EventManager
}, start:function() {
  pulse.DEBUG && console.log("action started");
  this.target.runningActions && (this.target.runningActions[this.name] = this);
  this.isComplete = false;
  this.isRunning = true
}, pause:function() {
  pulse.DEBUG && console.log("action paused");
  this.isRunning = false
}, stop:function() {
  pulse.DEBUG && console.log("action stopped");
  this.target.runningActions && delete this.target.runningActions[this.name];
  this.isRunning = false
}, complete:function() {
  pulse.DEBUG && console.log("action complete");
  this.target.runningActions && delete this.target.runningActions[this.name];
  this.isRunning = false;
  this.isComplete = true;
  this.events.raiseEvent("complete", {action:this})
}});
pulse.AnimateAction = pulse.Action.extend({init:function(a) {
  this._super(a);
  a = pulse.util.checkParams(a, {name:this.name, size:{width:0, height:0}, frames:0, frameRate:0, offset:{x:0, y:0}, bounds:{width:1, height:1}, plays:-1});
  this.size = a.size;
  this._private.frameOriginal = {x:0, y:0, width:0, height:0};
  this._private.bounds = a.bounds;
  this._private.frames = a.frames;
  this._private.frameRate = a.frameRate;
  this._private.offset = a.offset;
  this._private.plays = a.plays;
  this._private.currentPlay = 1;
  this._private.currentFrame = 0;
  this._private.start = 0;
  this._private.playTime = 0
}, bounds:function(a) {
  if(a == void 0 || a == null) {
    return this._private.bounds
  }
  if(a.x <= 0) {
    a.x = 1
  }
  if(a.y <= 0) {
    a.y = 1
  }
  this._private.bounds = a
}, getFrame:function(a) {
  a = pulse.util.checkValue(a, this._private.currentFrame);
  this._private.frames instanceof Array && (a = this._private.frames[this._private.currentFrame]);
  for(var a = (a + this._private.offset.x) * this.size.width, c = this._private.offset.y;a >= this._private.bounds.x;) {
    a -= this._private.bounds.x, c++
  }
  c *= this.size.height;
  c >= this._private.bounds.y && (c = this._private.bounds.y - this.size.height);
  return{x:a, y:c, width:this.size.width, height:this.size.height}
}, start:function(a) {
  this._super();
  this._private.currentPlay = 1;
  this._private.playTime = 1 / this._private.frameRate * 1E3;
  this._private.frameOriginal = a ? a : null
}, pause:function() {
  this._super()
}, stop:function() {
  this._super();
  this._private.currentFrame = 0;
  this._private.playTime = 0;
  if(this._private.frameOriginal) {
    this.target.textureFrame = this._private.frameOriginal, this.target.updated = true
  }
}, complete:function() {
  this._super();
  if(this._private.frameOriginal) {
    this.target.textureFrame = this._private.frameOriginal, this.target.updated = true
  }
}, update:function(a) {
  this._super();
  if(this.running != false) {
    var c = false;
    this._private.playTime += a;
    if(this._private.playTime >= 1 / this._private.frameRate * 1E3) {
      this._private.currentFrame++;
      if(this._private.currentFrame >= (this._private.frames.length || this._private.frames)) {
        if(this._private.currentFrame = 0, this._private.currentPlay++, this._private.plays > 0 && this._private.currentPlay > this._private.plays) {
          this.stop();
          this.complete();
          return
        }
      }
      this._private.playTime = 0;
      c = true
    }
    if(c) {
      this.target.textureFrame = this.getFrame(), this.target.updated = true
    }
  }
}});
pulse.Sprite = pulse.Visual.extend({init:function(a) {
  this._super(a);
  this.actions = {};
  this.runningActions = {};
  this.texturePrevious = this.texture = null;
  this.textureFrame = {x:0, y:0, width:0, height:0};
  this.textureFramePrevious = {x:0, y:0, width:0, height:0};
  this.textureUpdated = true;
  a = pulse.util.checkParams(a, {src:"", size:{}});
  this.size = a.size;
  this.texture = typeof a.src == "object" ? a.src : new pulse.Texture({filename:a.src});
  this._private.isDragging = false;
  this.dropAcceptEnabled = this.dragMoveEnabled = this.dragDropEnabled = this._private.dragPos = false;
  this.draggedOverItems = {};
  this.handleAllEvents = false;
  this.events = new pulse.EventManager({owner:this, masterCallback:this.eventsCallback})
}, loaded:function() {
  return this.texture.loaded()
}, getAction:function(a) {
  return this.actions[a]
}, runAction:function(a, c) {
  var c = c || null, g = this.getAction(a);
  g.target = this;
  g.start(c);
  return g
}, addAction:function(a) {
  a instanceof pulse.Action ? a.target = this : a = new pulse.AnimateAction({target:this, name:a.name, size:a.size, frames:a.frames, frameRate:a.frameRate, offset:a.offset});
  a.bounds({x:this.texture.width(), y:this.texture.height()});
  this.actions[a.name] = a
}, inCurrentBounds:function(a, c) {
  return a > this.bounds.x && a < this.bounds.x + this.bounds.width && c > this.bounds.y && c < this.bounds.y + this.bounds.height ? true : false
}, rectInCurrentBounds:function(a) {
  return a.x > this.bounds.x && a.x + a.width < this.bounds.x + this.bounds.width && a.y > this.bounds.y && a.y + a.height < this.bounds.y + this.bounds.height ? true : false
}, getCurrentFrame:function() {
  if(!(this.texture.percentLoaded < 100)) {
    var a = this.texture.width();
    if(this.textureFrame.width != 0) {
      a = this.textureFrame.width
    }
    var c = this.texture.height();
    if(this.textureFrame.height != 0) {
      c = this.textureFrame.height
    }
    return this.texture.slice(this.textureFrame.x, this.textureFrame.y, a, c)
  }
}, update:function(a) {
  if(this.texture != this.texturePrevious) {
    this.texturePrevious = this.texture, this.updated = this.textureUpdated = true
  }
  if(this.texture.percentLoaded == 100) {
    if(this.size == null) {
      this.size = {}
    }
    if(!this.size.width) {
      this.size.width = this.texture.width()
    }
    if(!this.size.height) {
      this.size.height = this.texture.height()
    }
  }
  if(this.textureFrame.x != this.textureFramePrevious.x || this.textureFrame.y != this.textureFramePrevious.y || this.textureFrame.width != this.textureFramePrevious.width || this.textureFrame.height != this.textureFramePrevious.height) {
    this.textureFramePrevious.x = this.textureFrame.x, this.textureFramePrevious.y = this.textureFrame.y, this.textureFramePrevious.width = this.textureFrame.width, this.textureFramePrevious.height = this.textureFrame.height, this.updated = this.textureUpdated = true
  }
  for(var c in this.runningActions) {
    this.runningActions[c].update(a)
  }
  this._super(a)
}, draw:function(a) {
  if(!(this.texture.percentLoaded < 100 || this.size.width == 0 || this.size.height == 0)) {
    if(this.textureUpdated) {
      this._private.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this._private.context.drawImage(this.getCurrentFrame(), 0, 0, this.size.width, this.size.height), this.textureUpdated = false
    }
    this._super(a)
  }
}, calculateProperties:function() {
  this._super()
}, killDrag:function(a) {
  if(this._private.isDragging) {
    this.handleAllEvents = this._private.isDragging = false, a.sender = this, this.events.raiseEvent("dragdrop", a), delete pulse.EventManager.DraggedItems["sprite:" + this.name]
  }
}, eventsCallback:function(a, c) {
  if(a == "mousedown" && this.dragDropEnabled) {
    this._private.isDragging = true, this._private.dragPos = {x:c.world.x, y:c.world.y}, this.handleAllEvents = true, c.sender = this, this.events.raiseEvent("dragstart", c), pulse.EventManager.DraggedItems["sprite:" + this.name] = this
  }
  if((a == "mousemove" || a == "mouseup") && this._private.isDragging) {
    var g = c.world.x - this._private.dragPos.x, f = c.world.y - this._private.dragPos.y;
    if(this.dragMoveEnabled) {
      this.position = {x:this.position.x + g, y:this.position.y + f}
    }
    this._private.dragPos = {x:c.world.x, y:c.world.y}
  }
  a == "mouseup" && this.killDrag(c)
}});
pulse.BitmapLabel = pulse.Visual.extend({init:function(a) {
  this._super(a);
  a = pulse.util.checkParams(a, {font:"", text:""});
  this.fontPrevious = this.font = null;
  this.text = a.text;
  this.textPrevious = "";
  this._private.verts = [];
  this.font = typeof a.font == "object" ? a.font : new pulse.BitmapFont({filename:a.font})
}, loaded:function() {
  return this.font.percentLoaded == 100
}, update:function(a) {
  if(this.text != this.textPrevious && this.loaded()) {
    this.textPrevious = this.text, this.size.height = this.font.lineHeight, this.size.width = this.font.getStringWidth(this.text), this._private.verts = this.font.getStringBitmapChars(this.text), this.updated = true
  }
  if(this.loaded() && this.font != this.fontPrevious) {
    this.updated = true
  }
  this._super(a)
}, draw:function(a) {
  if(this.loaded() && !(this.size.width == 0 || this.size.height == 0)) {
    this._private.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(var c = null, g = 0, f = 0;f < this._private.verts.length;f++) {
      c = this._private.verts[f], c.size.width != 0 && c.size.height != 0 && this._private.context.drawImage(this.font.image, c.position.x, c.position.y, c.size.width, c.size.height, g, 0, c.size.width, c.size.height), g += c.xAdvance
    }
    this._super(a)
  }
}});
pulse.CanvasLabel = pulse.Visual.extend({init:function(a) {
  this._super(a);
  a = pulse.util.checkParams(a, {font:"sans-serif", fontSize:20, text:""});
  this.fontPrevious = this.font = a.font;
  this.fontSizePrevious = this.fontSize = a.fontSize;
  this.text = a.text;
  this.textPrevious = "";
  this.strokeColorPrevious = this.strokeColor = this.fillColorPrevious = this.fillColor = "#000000";
  this.strokeWidthPrevious = this.strokeWidth = 0;
  this.italicPrevious = this.italic = this.boldPrevious = this.bold = false;
  this.textBaselinePrevious = this.textBaseline = "middle"
}, loaded:function() {
  return this.font.percentLoaded == 100
}, update:function(a) {
  var c = false;
  if(this.font != this.fontPrevious) {
    this.fontPrevious = this.font, c = true
  }
  if(this.fontSize != this.fontSizePrevious) {
    this.fontSizePrevious = this.fontSize, c = true
  }
  if(this.text != this.textPrevious) {
    this.textPrevious = this.text, c = true
  }
  if(this.fillColor != this.fillColorPrevious) {
    this.fillColorPrevious = this.fillColor, c = true
  }
  if(this.strokeColor != this.strokeColorPrevious) {
    this.strokeColorPrevious = this.strokeColor, c = true
  }
  if(this.strokeWidth != this.strokeWidthPrevious) {
    this.strokeWidthPrevious = this.strokeWidth, c = true
  }
  if(this.bold != this.boldPrevious) {
    this.boldPrevious = this.bold, c = true
  }
  if(this.italic != this.italicPrevious) {
    this.italicPrevious = this.italic, c = true
  }
  if(this.textBaseline != this.textBaselinePrevious) {
    this.textBaselinePrevious = this.textBaseline, c = true
  }
  if(c) {
    c = document.createElement("canvas").getContext("2d");
    c.textBaseline = this.textBaseline;
    var g = this.fontSize + "px " + this.font;
    this.bold && (g = "bold " + g);
    this.italic && (g = "italic " + g);
    c.font = g;
    if(this.fillColor != "transparent") {
      c.fillStyle = this.fillColor, c.fillText(this.text, 0, 0)
    }
    if(this.strokeColor != "transparent" && this.strokeWidth != 0) {
      c.lineWidth = this.strokeWidth, c.strokeStyle = this.strokeColor, c.strokeText(this.text, 0, 0)
    }
    c = c.measureText(this.text);
    this.size.height = this.fontSize + 2;
    this.size.width = Math.ceil(c.width) + 2;
    this.updated = true
  }
  this._super(a)
}, draw:function(a) {
  if(!(this.size.width == 0 || this.size.height == 0)) {
    this._private.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._private.context.textBaseline = this.textBaseline;
    var c = this.fontSize + "px " + this.font;
    this.bold && (c = "bold " + c);
    this.italic && (c = "italic " + c);
    this._private.context.font = c;
    if(this.fillColor != "transparent") {
      this._private.context.fillStyle = this.fillColor, this._private.context.fillText(this.text, 0, this.size.height / 2)
    }
    if(this.strokeColor != "transparent" && this.strokeWidth != 0) {
      this._private.context.lineWidth = this.strokeWidth, this._private.context.strokeStyle = this.strokeColor, this._private.context.strokeText(this.text, 0, this.size.height / 2)
    }
    this._super(a)
  }
}});
pulse.Layer = pulse.Visual.extend({init:function(a) {
  this._super(a);
  a = pulse.util.checkParams(a, {x:0, y:0, width:0, height:0});
  this.position.x = a.x;
  this.position.y = a.y;
  this.size.width = a.width;
  this.size.height = a.height;
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;
  this.canvas.style.position = "absolute";
  this.objects = {};
  this._private.orderedKeys = [];
  this.events = new pulse.EventManager({owner:this, masterCallback:this.eventsCallback})
}, addNode:function(a) {
  if(a instanceof pulse.Visual) {
    this.objects.hasOwnProperty(a.name) ? pulse.error.DuplicateName(a.name) : (this.objects[a.name] = a, this._private.orderedKeys = pulse.util.getOrderedKeys(this.objects))
  }
}, removeObject:function(a) {
  if(this.objects.hasOwnProperty(a)) {
    if(this.objects[a] instanceof pulse.Sprite) {
      var c = this.objects[a].boundsPrevious;
      this._private.context.clearRect(c.x, c.y, c.width, c.height)
    }
    delete this.objects[a]
  }
}, getObject:function(a) {
  return this.objects[a]
}, getObjectsByType:function(a) {
  var c = {}, g;
  for(g in this.objects) {
    this.objects[g] instanceof a && (c[g] = this.objects[g])
  }
  return c
}, update:function(a) {
  var c = false, g;
  for(g in this.objects) {
    if(this.objects[g] instanceof pulse.Visual && (this.objects[g].shuffled == true && (c = true), this.objects[g].update(a), this.objects[g].updated)) {
      this.updated = true
    }
  }
  if(c) {
    this._private.orderedKeys = pulse.util.getOrderedKeys(this.objects)
  }
  this._super(a)
}, draw:function(a) {
  var c = false, g;
  for(g in this.objects) {
    if(this.objects[g].updated) {
      c = true;
      break
    }
  }
  if(c) {
    this._private.context.clearRect(0, 0, this.size.width, this.size.height);
    for(g = 0;g < this._private.orderedKeys.length;g++) {
      c = this.objects[this._private.orderedKeys[g]], c instanceof pulse.Visual && c.visible && c.draw(this._private.context)
    }
  }
  this._super(a)
}, pointInBounds:function(a) {
  return a.x > this.bounds.x && a.x < this.bounds.x + this.bounds.width && a.y > this.bounds.y && a.y < this.bounds.y + this.bounds.height
}, eventsCallback:function(a, c) {
  c.parent.x = c.position.x;
  c.parent.y = c.position.y;
  var g = this.getObjectsByType(pulse.Sprite), f, h;
  for(h in g) {
    if(f = g[h], pulse.events[a] == "mouse") {
      var i = f.bounds;
      c.position.x = c.parent.x - i.x;
      c.position.y = c.parent.y - i.y;
      c.sender = f;
      (f.handleAllEvents || f.inCurrentBounds(c.parent.x, c.parent.y)) && f.events.raiseEvent(a, c);
      if(f.dropAcceptEnabled) {
        for(var l in pulse.EventManager.DraggedItems) {
          if(i = pulse.EventManager.DraggedItems[l], f.inCurrentBounds(c.parent.x, c.parent.y)) {
            c.target = i, f.draggedOverItems[l] ? (c.sender = f, f.events.raiseEvent("dragover", c)) : (f.draggedOverItems[l] = i, f.events.raiseEvent("dragenter", c))
          }else {
            if(f.draggedOverItems[l]) {
              delete f.draggedOverItems[l], c.target = i, f.events.raiseEvent("dragexit", c)
            }
          }
        }
      }
    }else {
      c.sender = f, f.events.raiseEvent(a, c)
    }
  }
}});
pulse.Scene = pulse.Node.extend({init:function(a) {
  this._super(a);
  this.layers = {};
  this._private.liveLayers = {};
  this._private.orderedKeys = [];
  this._private.defaultSize = {width:0, height:0};
  this.active = false;
  this.events = new pulse.EventManager({owner:this, masterCallback:this.eventsCallback})
}, setDefaultSize:function(a, c) {
  for(var g in this.layers) {
    if(this.layers[g].size.width < 1) {
      this.layers[g].size.width = a
    }
    if(this.layers[g].size.height < 1) {
      this.layers[g].size.height = c
    }
  }
  this._private.defaultSize = {width:a, height:c}
}, addLayer:function(a, c) {
  if(a instanceof pulse.Layer && !this.layers.hasOwnProperty(a.name)) {
    if(typeof c == "number") {
      a.zindex = c
    }
    if(a.size.width < 1) {
      a.size.width = this._private.defaultSize.width
    }
    if(a.size.height < 1) {
      a.size.height = this._private.defaultSize.height
    }
    this.layers[a.name] = a;
    this._private.orderedKeys = pulse.util.getOrderedKeys(this.layers)
  }
}, removeLayer:function(a) {
  typeof a == "string" && this.layers.hasOwnProperty(a) && delete _layers[a]
}, getLayer:function(a) {
  return this.layers.hasOwnProperty(a) ? this.layers[a] : null
}, getLiveLayer:function(a) {
  return this.layers.hasOwnProperty(a) ? this._private.liveLayers[a] : null
}, getSceneContainer:function() {
  var a = document.createElement("div");
  a.style.position = "absolute";
  a.id = this.name;
  for(var c = 0;c < this._private.orderedKeys.length;c++) {
    if(this.layers[this._private.orderedKeys[c]]) {
      var g = this.layers[this._private.orderedKeys[c]], f = document.createElement("canvas");
      f.width = this._private.defaultSize.width;
      f.height = this._private.defaultSize.height;
      f.style.position = "absolute";
      f.id = "live:" + g.name;
      var h = f.getContext("2d");
      this._private.liveLayers[g.name] = {canvas:f, context:h};
      a.appendChild(f)
    }
  }
  return a
}, update:function(a) {
  this._super(a);
  var c = false, g;
  for(g in this.layers) {
    this.layers[g].shuffled == true && (c = true)
  }
  if(c == true) {
    this._private.orderedKeys = pulse.util.getOrderedKeys(this.layers)
  }
  for(g in this.layers) {
    this.layers[g].update(a)
  }
  for(a = 0;a < this._private.orderedKeys.length;a++) {
    if(c = this.layers[this._private.orderedKeys[a]], c.updated) {
      g = this._private.liveLayers[c.name].canvas;
      var f = this._private.liveLayers[c.name].context;
      f.clearRect(0, 0, g.width, g.height);
      c.draw(f)
    }
  }
}, eventsCallback:function(a, c) {
  for(var g in this.layers) {
    if(pulse.events[a] == "mouse") {
      var f = this.layers[g].bounds;
      if(this.layers[g].pointInBounds(c.world)) {
        c.parent.x = c.position.x, c.parent.y = c.position.y, c.position.x = c.world.x - f.x, c.position.y = c.world.y - f.y, c.sender = this.layers[g], this.layers[g].events.raiseEvent(a, c)
      }
    }else {
      c.sender = this.layers[g], this.layers[g].events.raiseEvent(a, c)
    }
  }
}});
pulse.SceneManager = PClass.extend({init:function(a) {
  a = pulse.util.checkParams(a, {gameWindow:document.getElementsByTagName("body")[0]});
  this.scenes = {};
  this.gameWindow = a.gameWindow
}, addScene:function(a) {
  a instanceof pulse.Scene && !this.scenes.hasOwnProperty(a.name) && (a.setDefaultSize(this.gameWindow.clientWidth, this.gameWindow.clientHeight), this.scenes[a.name] = a)
}, removeScene:function(a) {
  this.scenes.hasOwnProperty(a) && delete this.scenes[a]
}, activateScene:function(a) {
  if(a instanceof pulse.Scene) {
    a = a.name
  }
  if(this.scenes.hasOwnProperty(a)) {
    this.scenes[a].active = true, this.gameWindow.appendChild(this.scenes[a].getSceneContainer())
  }
}, deactivateScene:function(a) {
  if(a instanceof pulse.Scene) {
    a = a.name
  }
  if(this.scenes.hasOwnProperty(a) && this.scenes[a].active) {
    this.scenes[a].active = false, this.gameWindow.removeChild(this.scenes[a].getSceneContainer())
  }
}, getScene:function(a) {
  return this.scenes[a]
}, getScenes:function(a) {
  var c = [], g;
  for(g in this.scenes) {
    a == true ? this.scenes[g].active == true && c.push(this.scenes[g]) : c.push(this.scenes[g])
  }
  return c
}});
pulse.Engine = PClass.extend({init:function(a) {
  a = pulse.util.checkParams(a, {gameWindow:"gameWindow", width:0, height:0, iframe:false});
  this.gameWindow = null;
  this.focused = false;
  this.gameWindow = typeof a.gameWindow == "object" ? a.gameWindow : document.getElementById(a.gameWindow);
  this.size = {};
  this.size.width = a.width;
  this.size.height = a.height;
  if((this.width == 0 || this.height == 0) && this.gameWindow) {
    var c = parseInt(this.gameWindow.style.width), g = parseInt(this.gameWindow.style.height);
    if(c) {
      this.size.width = c
    }
    if(g) {
      this.size.width = g
    }
  }
  if(this.size.width == 0) {
    this.size.width = 640
  }
  if(this.size.height == 0) {
    this.size.height = 480
  }
  this._private = {};
  this._private.mainDiv = document.createElement("div");
  this._private.mainDiv.style.position = "absolute";
  this._private.mainDiv.style.width = this.size.width + "px";
  this._private.mainDiv.style.height = this.size.height + "px";
  this._private.mainDiv.style.overflow = "hidden";
  c = this._private.mainDiv;
  this._private.useIFrame = a.iframe;
  if(this._private.useIFrame) {
    this._private.innerFrame = pulse.util.getIFrame(this.gameWindow), this._private.innerFrame.style.overflow = "hidden", this._private.innerFrame.style.border = "0", this._private.innerFrame.style.width = this._private.mainDiv.style.width, this._private.innerFrame.style.height = this._private.mainDiv.style.height, this._private.innerFrame.doc.body.appendChild(this._private.mainDiv), this._private.innerFrame.doc.body.style.overflow = "hidden", c = this._private.innerFrame
  }
  this.gameWindow.appendChild(c);
  this.scenes = new pulse.SceneManager({gameWindow:this._private.mainDiv});
  this.masterTime = 0;
  this.tick = 100;
  this.loopLogic = null;
  this._private.currentTime = (new Date).getTime();
  this._private.lastTime = this._private.currentTime
}, getWindowOffset:function() {
  var a = this._private.mainDiv.offsetLeft, c = this._private.mainDiv.offsetTop;
  if(this._private.mainDiv.offsetParent) {
    var g = this._private.mainDiv.offsetParent;
    do {
      a += g.offsetLeft, c += g.offsetTop
    }while(g = g.offsetParent)
  }
  return{x:a, y:c}
}, bindEvents:function() {
  var a = this, c;
  for(c in pulse.events) {
    var g = this._private.useIFrame ? this._private.innerFrame.doc.defaultView : window;
    g.addEventListener(c, function(c) {
      a.windowEvent.call(a, c)
    }, false);
    c == "mousewheel" && g.addEventListener("DOMMouseScroll", function(c) {
      a.windowEvent.call(a, c)
    }, false)
  }
}, go:function(a, c) {
  this.tick = a;
  var g = this;
  this.bindEvents();
  if(c) {
    this.loopLogic = c
  }
  requestAnimFrame(function() {
    g.loop.call(g)
  }, this._private.mainDiv)
}, loop:function() {
  var a = this;
  requestAnimFrame(function() {
    a.loop.call(a)
  }, this._private.mainDiv);
  this._private.currentTime = (new Date).getTime();
  var c = this._private.currentTime - this._private.lastTime;
  if(!(c < this.tick)) {
    this.loopLogic && this.loopLogic(this.scenes, c);
    for(var g = this.scenes.getScenes(true), f = 0;f < g.length;f++) {
      g[f].update(c)
    }
    this._private.lastTime = this._private.currentTime;
    this.masterTime += c
  }
}, windowEvent:function(a) {
  if(!a) {
    a = window.event
  }
  var c = a.type, g = this.scenes.getScenes(true), f = this.getWindowOffset(), h = 0, i = 0;
  window.pageXOffset != void 0 && window.pageYOffset != void 0 ? (h = window.pageXOffset, i = window.pageYOffset) : (h = document.body.scrollLeft, i = document.body.scrollTop);
  h = a.clientX - f.x + h;
  f = a.clientY - f.y + i;
  i = new pulse.MouseEvent;
  i.window.x = a.clientX;
  i.window.y = a.clientY;
  i.world.x = h;
  i.world.y = f;
  var l = false;
  h > 0 && h < parseInt(this._private.mainDiv.style.width) && f > 0 && f < parseInt(this._private.mainDiv.style.height) && (l = true);
  for(var d = 0;d < g.length;d++) {
    i.parent.x = i.window.x;
    i.parent.y = i.window.y;
    i.position.x = h;
    i.position.y = f;
    if(l) {
      if(a.preventDefault && a.preventDefault(), a.type.toLowerCase() == "mousedown") {
        this.focused = true
      }
    }else {
      if(a.type.toLowerCase() == "mousedown") {
        this.focused = false
      }
    }
    if(a.type.toLowerCase() == "mousewheel" || a.type.toLowerCase() == "dommousescroll") {
      c = 0, a.wheelDelta ? c = a.wheelDelta / 120 : a.detail && (c = -a.detail / 3), i.scrollDelta = c, c = "mousewheel"
    }
    if(pulse.events[a.type] == "keyboard") {
      var n;
      if(a.charCode) {
        n = a.charCode
      }else {
        if(a.keyCode) {
          n = a.keyCode
        }else {
          if(a.which) {
            n = a.which
          }
        }
      }
      i.keyCode = n;
      i.key = String.fromCharCode(n)
    }
    if(this.focused) {
      i.sender = g[d], g[d].events.raiseEvent(c, i)
    }
  }
  if(a.type.toLowerCase() == "mouseup" && !l) {
    for(var q in pulse.EventManager.DraggedItems) {
      q.indexOf("sprite") == 0 && pulse.EventManager.DraggedItems[q].killDrag(i)
    }
  }
}});

