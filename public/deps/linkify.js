;(function () {
"use strict";
// Output from the Closure Compiler
var module$$linkify$core$state = {}, _inherits$$module$$linkify$core$state = function(b, a) {
  if ("function" !== typeof a && null !== a) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof a);
  }
  b.prototype = Object.create(a && a.prototype, {constructor:{value:b, enumerable:!1, writable:!0, configurable:!0}});
  a && (b.__proto__ = a);
}, _prototypeProperties$$module$$linkify$core$state = function(b, a, c) {
  a && Object.defineProperties(b, a);
  c && Object.defineProperties(b.prototype, c);
}, BaseState$$module$$linkify$core$state = function() {
  function b(a) {
    this.j = [];
    this.T = a || null;
  }
  _prototypeProperties$$module$$linkify$core$state(b, null, {on:{value:function(a, b) {
    if (a instanceof Array) {
      for (var f = 0;f < a.length;f++) {
        this.j.push([a[f], b]);
      }
    } else {
      this.j.push([a, b]);
    }
  }, writable:!0, enumerable:!0, configurable:!0}, next:{value:function(a) {
    for (var b = 0;b < this.j.length;b++) {
      var f = this.j[b], e = f[1];
      if (this.test(a, f[0])) {
        return e;
      }
    }
    return!1;
  }, writable:!0, enumerable:!0, configurable:!0}, accepts:{value:function() {
    return!!this.T;
  }, writable:!0, enumerable:!0, configurable:!0}, test:{value:function(a, b) {
    return a === b;
  }, writable:!0, enumerable:!0, configurable:!0}, emit:{value:function() {
    return this.T;
  }, writable:!0, enumerable:!0, configurable:!0}});
  return b;
}(), CharacterState$$module$$linkify$core$state = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$state(a, b);
  _prototypeProperties$$module$$linkify$core$state(a, null, {test:{value:function(a, b) {
    return a === b || b instanceof RegExp && b.test(a);
  }, writable:!0, enumerable:!0, configurable:!0}});
  return a;
}(BaseState$$module$$linkify$core$state), TokenState$$module$$linkify$core$state = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$state(a, b);
  _prototypeProperties$$module$$linkify$core$state(a, null, {test:{value:function(a, b) {
    return b.test(a);
  }, writable:!0, enumerable:!0, configurable:!0}});
  return a;
}(BaseState$$module$$linkify$core$state);
function stateify$$module$$linkify$core$state(b, a, c, f) {
  for (var e = 0, g = b.length, h = [], d = void 0;e < g && (d = a.next(b[e]));) {
    a = d, e++;
  }
  if (e >= g) {
    return[];
  }
  for (;e < g - 1;) {
    d = new CharacterState$$module$$linkify$core$state(f), h.push(d), a.on(b[e], d), a = d, e++;
  }
  d = new CharacterState$$module$$linkify$core$state(c);
  h.push(d);
  a.on(b[g - 1], d);
  return h;
}
module$$linkify$core$state.CharacterState = CharacterState$$module$$linkify$core$state;
module$$linkify$core$state.TokenState = TokenState$$module$$linkify$core$state;
module$$linkify$core$state.stateify = stateify$$module$$linkify$core$state;
var module$$linkify$core$tlds = "abogado ac academy accountants active actor ad adult ae aero af ag agency ai airforce al allfinanz alsace am an android ao aq aquarelle ar archi army arpa as asia associates at attorney au auction audio autos aw ax axa az ba band bar bargains bayern bb bd be beer berlin best bf bg bh bi bid bike bio biz bj black blackfriday bloomberg blue bm bmw bn bnpparibas bo boo boutique br brussels bs bt budapest build builders business buzz bv bw by bz bzh ca cab cal camera camp cancerresearch capetown capital caravan cards care career careers casa cash cat catering cc cd center ceo cern cf cg ch channel cheap christmas chrome church ci citic city ck cl claims cleaning click clinic clothing club cm cn co coach codes coffee college cologne com community company computer condos construction consulting contractors cooking cool coop country cr credit creditcard cricket crs cruises cu cuisinella cv cw cx cy cymru cz dad dance dating day de deals degree delivery democrat dental dentist desi diamonds diet digital direct directory discount dj dk dm dnp do domains durban dvag dz eat ec edu education ee eg email emerck energy engineer engineering enterprises equipment er es esq estate et eu eurovision eus events everbank exchange expert exposed fail farm fashion feedback fi finance financial firmdale fish fishing fitness fj fk flights florist flsmidth fly fm fo foo forsale foundation fr frl frogans fund furniture futbol ga gal gallery gb gbiz gd ge gent gf gg gh gi gift gifts gives gl glass gle global globo gm gmail gmo gmx gn google gop gov gp gq gr graphics gratis green gripe gs gt gu guide guitars guru gw gy hamburg haus healthcare help here hiphop hiv hk hm hn holdings holiday homes horse host hosting house how hr ht hu ibm id ie il im immo immobilien in industries info ing ink institute insure int international investments io iq ir irish is it je jetzt jm jo jobs joburg jp juegos kaufen ke kg kh ki kim kitchen kiwi km kn koeln kp kr krd kred kw ky kz la lacaixa land latrobe lawyer lb lc lds lease legal lgbt li life lighting limited limo link lk loans london lotto lr ls lt ltda lu luxe luxury lv ly ma madrid maison management mango market marketing mc md me media meet melbourne meme memorial menu mg mh miami mil mini mk ml mm mn mo mobi moda moe monash money mormon mortgage moscow motorcycles mov mp mq mr ms mt mu museum mv mw mx my mz na nagoya name navy nc ne net network neustar new nexus nf ng ngo nhk ni ninja nl no np nr nra nrw nu nyc nz okinawa om ong onl ooo org organic otsuka ovh pa paris partners parts party pe pf pg ph pharmacy photo photography photos physio pics pictures pink pizza pk pl place plumbing pm pn pohl poker porn post pr praxi press pro prod productions prof properties property ps pt pub pw py qa qpon quebec re realtor recipes red rehab reise reisen reit ren rentals repair report republican rest restaurant reviews rich rio rip ro rocks rodeo rs rsvp ru ruhr rw ryukyu sa saarland sarl sb sc sca scb schmidt schule science scot sd se services sexy sg sh shiksha shoes si singles sj sk sl sm sn so social software sohu solar solutions soy space spiegel sr st su supplies supply support surf surgery suzuki sv sx sy sydney systems sz taipei tatar tattoo tax tc td technology tel tf tg th tienda tips tirol tj tk tl tm tn to today tokyo tools top town toys tp tr trade training travel trust tt tui tv tw tz ua ug uk university uno uol us uy uz va vacations vc ve vegas ventures versicherung vet vg vi viajes villas vision vlaanderen vn vodka vote voting voto voyage vu wales wang watch webcam website wed wedding wf whoswho wien wiki williamhill wme work works world ws wtc wtf xxx xyz yachts yandex ye yoga yokohama youtube yt za zip zm zone zw".split(" ");
var module$$linkify$core$tokens = {}, _get$$module$$linkify$core$tokens = function get(a, c, f) {
  var e = Object.getOwnPropertyDescriptor(a, c);
  if (void 0 === e) {
    return a = Object.getPrototypeOf(a), null === a ? void 0 : get(a, c, f);
  }
  if ("value" in e && e.writable) {
    return e.value;
  }
  c = e.get;
  return void 0 === c ? void 0 : c.call(f);
}, _inherits$$module$$linkify$core$tokens = function(b, a) {
  if ("function" !== typeof a && null !== a) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof a);
  }
  b.prototype = Object.create(a && a.prototype, {constructor:{value:b, enumerable:!1, writable:!0, configurable:!0}});
  a && (b.__proto__ = a);
}, _prototypeProperties$$module$$linkify$core$tokens = function(b, a, c) {
  a && Object.defineProperties(b, a);
  c && Object.defineProperties(b.prototype, c);
}, TextToken$$module$$linkify$core$tokens = function() {
  function b(a) {
    this.v = a;
  }
  _prototypeProperties$$module$$linkify$core$tokens(b, {test:{value:function(a) {
    return a instanceof this;
  }, writable:!0, enumerable:!0, configurable:!0}}, {toString:{value:function() {
    return this.v + "";
  }, writable:!0, enumerable:!0, configurable:!0}});
  return b;
}(), DOMAIN$$module$$linkify$core$tokens = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), AT$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, "@");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), COLON$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, ":");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), DOT$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, ".");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), LOCALHOST$$module$$linkify$core$tokens = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), NL$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, "\n");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), NUM$$module$$linkify$core$tokens = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), PLUS$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, "+");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), POUND$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, "#");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), PROTOCOL$$module$$linkify$core$tokens = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), QUERY$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, "?");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), SLASH$$module$$linkify$core$tokens = function(b) {
  function a() {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, "/");
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), SYM$$module$$linkify$core$tokens = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), TLD$$module$$linkify$core$tokens = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), WS$$module$$linkify$core$tokens = function(b) {
  function a() {
    null !== Object.getPrototypeOf(a) && Object.getPrototypeOf(a).apply(this, arguments);
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(TextToken$$module$$linkify$core$tokens), text$$module$$linkify$core$tokens = {Base:TextToken$$module$$linkify$core$tokens, DOMAIN:DOMAIN$$module$$linkify$core$tokens, AT:AT$$module$$linkify$core$tokens, COLON:COLON$$module$$linkify$core$tokens, DOT:DOT$$module$$linkify$core$tokens, LOCALHOST:LOCALHOST$$module$$linkify$core$tokens, NL:NL$$module$$linkify$core$tokens, NUM:NUM$$module$$linkify$core$tokens, PLUS:PLUS$$module$$linkify$core$tokens, POUND:POUND$$module$$linkify$core$tokens, QUERY:QUERY$$module$$linkify$core$tokens, 
PROTOCOL:PROTOCOL$$module$$linkify$core$tokens, SLASH:SLASH$$module$$linkify$core$tokens, SYM:SYM$$module$$linkify$core$tokens, TLD:TLD$$module$$linkify$core$tokens, WS:WS$$module$$linkify$core$tokens};
function isDomainToken$$module$$linkify$core$tokens(b) {
  return DOMAIN$$module$$linkify$core$tokens.test(b) || TLD$$module$$linkify$core$tokens.test(b);
}
var MultiToken$$module$$linkify$core$tokens = function() {
  function b(a) {
    this.v = a;
    this.type = "token";
    this.isLink = !1;
  }
  _prototypeProperties$$module$$linkify$core$tokens(b, {test:{value:function(a) {
    return a instanceof this;
  }, writable:!0, enumerable:!0, configurable:!0}}, {toString:{value:function() {
    for (var a = [], b = 0;b < this.v.length;b++) {
      a.push(this.v[b].toString());
    }
    return a.join("");
  }, writable:!0, enumerable:!0, configurable:!0}, toHref:{value:function() {
    return this.toString();
  }, writable:!0, enumerable:!0, configurable:!0}, toObject:{value:function(a) {
    return{type:this.type, value:this.toString(), href:this.toHref(void 0 === a ? "http" : a)};
  }, writable:!0, enumerable:!0, configurable:!0}});
  return b;
}(), EMAIL$$module$$linkify$core$tokens = function(b) {
  function a(b) {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, b);
    this.type = "email";
    this.isLink = !0;
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  _prototypeProperties$$module$$linkify$core$tokens(a, null, {toHref:{value:function() {
    return "mailto:" + this.toString();
  }, writable:!0, enumerable:!0, configurable:!0}});
  return a;
}(MultiToken$$module$$linkify$core$tokens), TEXT$$module$$linkify$core$tokens = function(b) {
  function a(b) {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, b);
    this.type = "text";
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(MultiToken$$module$$linkify$core$tokens), NL$$module$$linkify$core$tokens = function(b) {
  function a(b) {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, b);
    this.type = "nl";
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  return a;
}(MultiToken$$module$$linkify$core$tokens), URL$$module$$linkify$core$tokens = function(b) {
  function a(b) {
    _get$$module$$linkify$core$tokens(Object.getPrototypeOf(a.prototype), "constructor", this).call(this, b);
    this.type = "url";
    this.isLink = !0;
  }
  _inherits$$module$$linkify$core$tokens(a, b);
  _prototypeProperties$$module$$linkify$core$tokens(a, null, {toHref:{value:function(a) {
    a = void 0 === a ? "http" : a;
    for (var b = !1, e = !1, g = this.v, h = [], d = 0;PROTOCOL$$module$$linkify$core$tokens.test(g[d]);) {
      b = !0, h.push(g[d].toString().toLowerCase()), d++;
    }
    for (;SLASH$$module$$linkify$core$tokens.test(g[d]);) {
      e = !0, h.push(g[d].toString()), d++;
    }
    for (;isDomainToken$$module$$linkify$core$tokens(g[d]);) {
      h.push(g[d].toString().toLowerCase()), d++;
    }
    for (;d < g.length;d++) {
      h.push(g[d].toString());
    }
    h = h.join("");
    b || e || (h = a + "://" + h);
    return h;
  }, writable:!0, enumerable:!0, configurable:!0}, hasProtocol:{value:function() {
    return this.v[0] instanceof PROTOCOL$$module$$linkify$core$tokens;
  }, writable:!0, enumerable:!0, configurable:!0}});
  return a;
}(MultiToken$$module$$linkify$core$tokens), multi$$module$$linkify$core$tokens = {Base:MultiToken$$module$$linkify$core$tokens, EMAIL:EMAIL$$module$$linkify$core$tokens, NL:NL$$module$$linkify$core$tokens, TEXT:TEXT$$module$$linkify$core$tokens, URL:URL$$module$$linkify$core$tokens};
module$$linkify$core$tokens.text = text$$module$$linkify$core$tokens;
module$$linkify$core$tokens.multi = multi$$module$$linkify$core$tokens;
var TEXT_TOKENS$$module$$linkify$core$parser = module$$linkify$core$tokens.text, MULTI_TOKENS$$module$$linkify$core$parser = module$$linkify$core$tokens.multi, State$$module$$linkify$core$parser = module$$linkify$core$state.TokenState, makeState$$module$$linkify$core$parser = function(b) {
  return new State$$module$$linkify$core$parser(b);
}, TT_DOMAIN$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.DOMAIN, TT_AT$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.AT, TT_COLON$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.COLON, TT_DOT$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.DOT, TT_LOCALHOST$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.LOCALHOST, TT_NL$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.NL, 
TT_NUM$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.NUM, TT_PLUS$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.PLUS, TT_POUND$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.POUND, TT_PROTOCOL$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.PROTOCOL, TT_QUERY$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.QUERY, TT_SLASH$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.SLASH, 
TT_SYM$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.SYM, TT_TLD$$module$$linkify$core$parser = TEXT_TOKENS$$module$$linkify$core$parser.TLD, T_EMAIL$$module$$linkify$core$parser = MULTI_TOKENS$$module$$linkify$core$parser.EMAIL, T_NL$$module$$linkify$core$parser = MULTI_TOKENS$$module$$linkify$core$parser.NL, T_TEXT$$module$$linkify$core$parser = MULTI_TOKENS$$module$$linkify$core$parser.TEXT, T_URL$$module$$linkify$core$parser = MULTI_TOKENS$$module$$linkify$core$parser.URL, 
S_START$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_PROTOCOL$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_PROTOCOL_SLASH$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_PROTOCOL_SLASH_SLASH$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_DOMAIN$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_DOMAIN_DOT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), 
S_TLD$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(T_URL$$module$$linkify$core$parser), S_TLD_COLON$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_TLD_PORT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(T_URL$$module$$linkify$core$parser), S_PSS_DOMAIN$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_PSS_DOMAIN_DOT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_PSS_TLD$$module$$linkify$core$parser = 
makeState$$module$$linkify$core$parser(T_URL$$module$$linkify$core$parser), S_PSS_TLD_COLON$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_PSS_TLD_PORT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(T_URL$$module$$linkify$core$parser), S_URL$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(T_URL$$module$$linkify$core$parser), S_URL_SYMS$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_EMAIL_DOMAIN$$module$$linkify$core$parser = 
makeState$$module$$linkify$core$parser(), S_EMAIL_DOMAIN_DOT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_EMAIL$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(T_EMAIL$$module$$linkify$core$parser), S_EMAIL_COLON$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_EMAIL_PORT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(T_EMAIL$$module$$linkify$core$parser), S_LOCALPART$$module$$linkify$core$parser = 
makeState$$module$$linkify$core$parser(), S_LOCALPART_AT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_LOCALPART_DOT$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(), S_NL$$module$$linkify$core$parser = makeState$$module$$linkify$core$parser(T_NL$$module$$linkify$core$parser);
S_START$$module$$linkify$core$parser.on(TT_NL$$module$$linkify$core$parser, S_NL$$module$$linkify$core$parser);
S_START$$module$$linkify$core$parser.on(TT_PROTOCOL$$module$$linkify$core$parser, S_PROTOCOL$$module$$linkify$core$parser);
S_START$$module$$linkify$core$parser.on(TT_SLASH$$module$$linkify$core$parser, S_PROTOCOL_SLASH$$module$$linkify$core$parser);
S_PROTOCOL$$module$$linkify$core$parser.on(TT_SLASH$$module$$linkify$core$parser, S_PROTOCOL_SLASH$$module$$linkify$core$parser);
S_PROTOCOL_SLASH$$module$$linkify$core$parser.on(TT_SLASH$$module$$linkify$core$parser, S_PROTOCOL_SLASH_SLASH$$module$$linkify$core$parser);
S_START$$module$$linkify$core$parser.on(TT_TLD$$module$$linkify$core$parser, S_DOMAIN$$module$$linkify$core$parser);
S_START$$module$$linkify$core$parser.on(TT_DOMAIN$$module$$linkify$core$parser, S_DOMAIN$$module$$linkify$core$parser);
S_START$$module$$linkify$core$parser.on(TT_LOCALHOST$$module$$linkify$core$parser, S_TLD$$module$$linkify$core$parser);
S_START$$module$$linkify$core$parser.on(TT_NUM$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_PROTOCOL_SLASH_SLASH$$module$$linkify$core$parser.on(TT_TLD$$module$$linkify$core$parser, S_PSS_DOMAIN$$module$$linkify$core$parser);
S_PROTOCOL_SLASH_SLASH$$module$$linkify$core$parser.on(TT_DOMAIN$$module$$linkify$core$parser, S_PSS_DOMAIN$$module$$linkify$core$parser);
S_PROTOCOL_SLASH_SLASH$$module$$linkify$core$parser.on(TT_LOCALHOST$$module$$linkify$core$parser, S_PSS_TLD$$module$$linkify$core$parser);
S_DOMAIN$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_DOMAIN_DOT$$module$$linkify$core$parser);
S_PSS_DOMAIN$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_PSS_DOMAIN_DOT$$module$$linkify$core$parser);
S_EMAIL_DOMAIN$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_EMAIL_DOMAIN_DOT$$module$$linkify$core$parser);
S_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_TLD$$module$$linkify$core$parser, S_TLD$$module$$linkify$core$parser);
S_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_DOMAIN$$module$$linkify$core$parser, S_DOMAIN$$module$$linkify$core$parser);
S_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_LOCALHOST$$module$$linkify$core$parser, S_DOMAIN$$module$$linkify$core$parser);
S_PSS_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_TLD$$module$$linkify$core$parser, S_PSS_TLD$$module$$linkify$core$parser);
S_PSS_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_DOMAIN$$module$$linkify$core$parser, S_PSS_DOMAIN$$module$$linkify$core$parser);
S_PSS_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_LOCALHOST$$module$$linkify$core$parser, S_PSS_DOMAIN$$module$$linkify$core$parser);
S_EMAIL_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_TLD$$module$$linkify$core$parser, S_EMAIL$$module$$linkify$core$parser);
S_EMAIL_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_DOMAIN$$module$$linkify$core$parser, S_EMAIL_DOMAIN$$module$$linkify$core$parser);
S_EMAIL_DOMAIN_DOT$$module$$linkify$core$parser.on(TT_LOCALHOST$$module$$linkify$core$parser, S_EMAIL_DOMAIN$$module$$linkify$core$parser);
S_TLD$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_DOMAIN_DOT$$module$$linkify$core$parser);
S_PSS_TLD$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_PSS_DOMAIN_DOT$$module$$linkify$core$parser);
S_EMAIL$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_EMAIL_DOMAIN_DOT$$module$$linkify$core$parser);
S_TLD$$module$$linkify$core$parser.on(TT_COLON$$module$$linkify$core$parser, S_TLD_COLON$$module$$linkify$core$parser);
S_TLD$$module$$linkify$core$parser.on(TT_SLASH$$module$$linkify$core$parser, S_URL$$module$$linkify$core$parser);
S_TLD_COLON$$module$$linkify$core$parser.on(TT_NUM$$module$$linkify$core$parser, S_TLD_PORT$$module$$linkify$core$parser);
S_TLD_PORT$$module$$linkify$core$parser.on(TT_SLASH$$module$$linkify$core$parser, S_URL$$module$$linkify$core$parser);
S_PSS_TLD$$module$$linkify$core$parser.on(TT_COLON$$module$$linkify$core$parser, S_PSS_TLD_COLON$$module$$linkify$core$parser);
S_PSS_TLD$$module$$linkify$core$parser.on(TT_SLASH$$module$$linkify$core$parser, S_URL$$module$$linkify$core$parser);
S_PSS_TLD_COLON$$module$$linkify$core$parser.on(TT_NUM$$module$$linkify$core$parser, S_PSS_TLD_PORT$$module$$linkify$core$parser);
S_PSS_TLD_PORT$$module$$linkify$core$parser.on(TT_SLASH$$module$$linkify$core$parser, S_URL$$module$$linkify$core$parser);
S_EMAIL$$module$$linkify$core$parser.on(TT_COLON$$module$$linkify$core$parser, S_EMAIL_COLON$$module$$linkify$core$parser);
S_EMAIL_COLON$$module$$linkify$core$parser.on(TT_NUM$$module$$linkify$core$parser, S_EMAIL_PORT$$module$$linkify$core$parser);
var qsAccepting$$module$$linkify$core$parser = [TT_DOMAIN$$module$$linkify$core$parser, TT_AT$$module$$linkify$core$parser, TT_LOCALHOST$$module$$linkify$core$parser, TT_NUM$$module$$linkify$core$parser, TT_PLUS$$module$$linkify$core$parser, TT_POUND$$module$$linkify$core$parser, TT_PROTOCOL$$module$$linkify$core$parser, TT_SLASH$$module$$linkify$core$parser, TT_TLD$$module$$linkify$core$parser], qsNonAccepting$$module$$linkify$core$parser = [TT_COLON$$module$$linkify$core$parser, TT_DOT$$module$$linkify$core$parser, 
TT_QUERY$$module$$linkify$core$parser, TT_SYM$$module$$linkify$core$parser];
S_URL$$module$$linkify$core$parser.on(qsAccepting$$module$$linkify$core$parser, S_URL$$module$$linkify$core$parser);
S_URL_SYMS$$module$$linkify$core$parser.on(qsAccepting$$module$$linkify$core$parser, S_URL$$module$$linkify$core$parser);
S_URL$$module$$linkify$core$parser.on(qsNonAccepting$$module$$linkify$core$parser, S_URL_SYMS$$module$$linkify$core$parser);
S_URL_SYMS$$module$$linkify$core$parser.on(qsNonAccepting$$module$$linkify$core$parser, S_URL_SYMS$$module$$linkify$core$parser);
var localpartAccepting$$module$$linkify$core$parser = [TT_DOMAIN$$module$$linkify$core$parser, TT_COLON$$module$$linkify$core$parser, TT_NUM$$module$$linkify$core$parser, TT_PLUS$$module$$linkify$core$parser, TT_POUND$$module$$linkify$core$parser, TT_QUERY$$module$$linkify$core$parser, TT_SYM$$module$$linkify$core$parser, TT_TLD$$module$$linkify$core$parser];
S_DOMAIN$$module$$linkify$core$parser.on(localpartAccepting$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_DOMAIN$$module$$linkify$core$parser.on(TT_AT$$module$$linkify$core$parser, S_LOCALPART_AT$$module$$linkify$core$parser);
S_DOMAIN_DOT$$module$$linkify$core$parser.on(localpartAccepting$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_TLD$$module$$linkify$core$parser.on(localpartAccepting$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_TLD$$module$$linkify$core$parser.on(TT_AT$$module$$linkify$core$parser, S_LOCALPART_AT$$module$$linkify$core$parser);
S_TLD_COLON$$module$$linkify$core$parser.on(localpartAccepting$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_TLD_COLON$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_TLD_COLON$$module$$linkify$core$parser.on(TT_AT$$module$$linkify$core$parser, S_LOCALPART_AT$$module$$linkify$core$parser);
S_TLD_PORT$$module$$linkify$core$parser.on(localpartAccepting$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_TLD_PORT$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_LOCALPART_DOT$$module$$linkify$core$parser);
S_TLD_PORT$$module$$linkify$core$parser.on(TT_AT$$module$$linkify$core$parser, S_LOCALPART_AT$$module$$linkify$core$parser);
S_LOCALPART$$module$$linkify$core$parser.on(localpartAccepting$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_LOCALPART$$module$$linkify$core$parser.on(TT_AT$$module$$linkify$core$parser, S_LOCALPART_AT$$module$$linkify$core$parser);
S_LOCALPART$$module$$linkify$core$parser.on(TT_DOT$$module$$linkify$core$parser, S_LOCALPART_DOT$$module$$linkify$core$parser);
S_LOCALPART_DOT$$module$$linkify$core$parser.on(localpartAccepting$$module$$linkify$core$parser, S_LOCALPART$$module$$linkify$core$parser);
S_LOCALPART_AT$$module$$linkify$core$parser.on(TT_TLD$$module$$linkify$core$parser, S_EMAIL_DOMAIN$$module$$linkify$core$parser);
S_LOCALPART_AT$$module$$linkify$core$parser.on(TT_DOMAIN$$module$$linkify$core$parser, S_EMAIL_DOMAIN$$module$$linkify$core$parser);
S_LOCALPART_AT$$module$$linkify$core$parser.on(TT_LOCALHOST$$module$$linkify$core$parser, S_EMAIL$$module$$linkify$core$parser);
var run$$module$$linkify$core$parser = function(b) {
  for (var a = b.length, c = 0, f = [], e = [];c < a;) {
    for (var g = S_START$$module$$linkify$core$parser, h = null, d = null, k = 0, l = null, m = -1;c < a && !(h = g.next(b[c]));) {
      e.push(b[c++]);
    }
    for (;c < a && (d = h || g.next(b[c]));) {
      h = null, g = d, g.accepts() ? (m = 0, l = g) : 0 <= m && m++, c++, k++;
    }
    if (0 > m) {
      for (k = c - k;k < c;k++) {
        e.push(b[k]);
      }
    } else {
      0 < e.length && (f.push(new T_TEXT$$module$$linkify$core$parser(e)), e = []), c -= m, k -= m, g = l.emit(), f.push(new g(b.slice(c - k, c)));
    }
  }
  0 < e.length && f.push(new T_TEXT$$module$$linkify$core$parser(e));
  return f;
}, module$$linkify$core$parser = {State:State$$module$$linkify$core$parser, TOKENS:MULTI_TOKENS$$module$$linkify$core$parser, run:run$$module$$linkify$core$parser, start:S_START$$module$$linkify$core$parser};
var module$$linkify$core$scanner = {}, _interopRequire$$module$$linkify$core$scanner = function(b) {
  return b && (b["default"] || b);
}, TOKENS$$module$$linkify$core$scanner = module$$linkify$core$tokens.text, State$$module$$linkify$core$scanner = module$$linkify$core$state.CharacterState, stateify$$module$$linkify$core$scanner = module$$linkify$core$state.stateify, tlds$$module$$linkify$core$scanner = _interopRequire$$module$$linkify$core$scanner(module$$linkify$core$tlds), REGEXP_NUM$$module$$linkify$core$scanner = /[0-9]/, REGEXP_ALPHANUM$$module$$linkify$core$scanner = /[a-z0-9]/, COLON$$module$$linkify$core$scanner = ":", 
domainStates$$module$$linkify$core$scanner = [], makeState$$module$$linkify$core$scanner = function(b) {
  return new State$$module$$linkify$core$scanner(b);
}, T_DOMAIN$$module$$linkify$core$scanner = TOKENS$$module$$linkify$core$scanner.DOMAIN, T_LOCALHOST$$module$$linkify$core$scanner = TOKENS$$module$$linkify$core$scanner.LOCALHOST, T_NUM$$module$$linkify$core$scanner = TOKENS$$module$$linkify$core$scanner.NUM, T_PROTOCOL$$module$$linkify$core$scanner = TOKENS$$module$$linkify$core$scanner.PROTOCOL, T_TLD$$module$$linkify$core$scanner = TOKENS$$module$$linkify$core$scanner.TLD, T_WS$$module$$linkify$core$scanner = TOKENS$$module$$linkify$core$scanner.WS, 
S_START$$module$$linkify$core$scanner = makeState$$module$$linkify$core$scanner(), S_NUM$$module$$linkify$core$scanner = makeState$$module$$linkify$core$scanner(T_NUM$$module$$linkify$core$scanner), S_DOMAIN$$module$$linkify$core$scanner = makeState$$module$$linkify$core$scanner(T_DOMAIN$$module$$linkify$core$scanner), S_DOMAIN_HYPHEN$$module$$linkify$core$scanner = makeState$$module$$linkify$core$scanner(), S_WS$$module$$linkify$core$scanner = makeState$$module$$linkify$core$scanner(T_WS$$module$$linkify$core$scanner);
S_START$$module$$linkify$core$scanner.on("@", makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.AT));
S_START$$module$$linkify$core$scanner.on(".", makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.DOT));
S_START$$module$$linkify$core$scanner.on("+", makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.PLUS));
S_START$$module$$linkify$core$scanner.on("#", makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.POUND));
S_START$$module$$linkify$core$scanner.on("?", makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.QUERY));
S_START$$module$$linkify$core$scanner.on("/", makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.SLASH));
S_START$$module$$linkify$core$scanner.on(COLON$$module$$linkify$core$scanner, makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.COLON));
S_START$$module$$linkify$core$scanner.on(/\n/, makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.NL));
S_START$$module$$linkify$core$scanner.on(/\s/, S_WS$$module$$linkify$core$scanner);
S_WS$$module$$linkify$core$scanner.on(/[^\S\n]/, S_WS$$module$$linkify$core$scanner);
for (var i$$module$$linkify$core$scanner = 0;i$$module$$linkify$core$scanner < tlds$$module$$linkify$core$scanner.length;i$$module$$linkify$core$scanner++) {
  var newStates$$module$$linkify$core$scanner = stateify$$module$$linkify$core$scanner(tlds$$module$$linkify$core$scanner[i$$module$$linkify$core$scanner], S_START$$module$$linkify$core$scanner, T_TLD$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner);
  domainStates$$module$$linkify$core$scanner.push.apply(domainStates$$module$$linkify$core$scanner, newStates$$module$$linkify$core$scanner);
}
var partialProtocolFileStates$$module$$linkify$core$scanner = stateify$$module$$linkify$core$scanner("file", S_START$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner), partialProtocolFtpStates$$module$$linkify$core$scanner = stateify$$module$$linkify$core$scanner("ftp", S_START$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner), partialProtocolHttpStates$$module$$linkify$core$scanner = 
stateify$$module$$linkify$core$scanner("http", S_START$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner);
domainStates$$module$$linkify$core$scanner.push.apply(domainStates$$module$$linkify$core$scanner, partialProtocolFileStates$$module$$linkify$core$scanner);
domainStates$$module$$linkify$core$scanner.push.apply(domainStates$$module$$linkify$core$scanner, partialProtocolFtpStates$$module$$linkify$core$scanner);
domainStates$$module$$linkify$core$scanner.push.apply(domainStates$$module$$linkify$core$scanner, partialProtocolHttpStates$$module$$linkify$core$scanner);
var S_PROTOCOL_FILE$$module$$linkify$core$scanner = partialProtocolFileStates$$module$$linkify$core$scanner.pop(), S_PROTOCOL_FTP$$module$$linkify$core$scanner = partialProtocolFtpStates$$module$$linkify$core$scanner.pop(), S_PROTOCOL_HTTP$$module$$linkify$core$scanner = partialProtocolHttpStates$$module$$linkify$core$scanner.pop(), S_PROTOCOL_SECURE$$module$$linkify$core$scanner = makeState$$module$$linkify$core$scanner(T_DOMAIN$$module$$linkify$core$scanner), S_FULL_PROTOCOL$$module$$linkify$core$scanner = 
makeState$$module$$linkify$core$scanner(T_PROTOCOL$$module$$linkify$core$scanner);
S_PROTOCOL_FTP$$module$$linkify$core$scanner.on("s", S_PROTOCOL_SECURE$$module$$linkify$core$scanner);
S_PROTOCOL_HTTP$$module$$linkify$core$scanner.on("s", S_PROTOCOL_SECURE$$module$$linkify$core$scanner);
domainStates$$module$$linkify$core$scanner.push(S_PROTOCOL_SECURE$$module$$linkify$core$scanner);
S_PROTOCOL_FILE$$module$$linkify$core$scanner.on(COLON$$module$$linkify$core$scanner, S_FULL_PROTOCOL$$module$$linkify$core$scanner);
S_PROTOCOL_FTP$$module$$linkify$core$scanner.on(COLON$$module$$linkify$core$scanner, S_FULL_PROTOCOL$$module$$linkify$core$scanner);
S_PROTOCOL_HTTP$$module$$linkify$core$scanner.on(COLON$$module$$linkify$core$scanner, S_FULL_PROTOCOL$$module$$linkify$core$scanner);
S_PROTOCOL_SECURE$$module$$linkify$core$scanner.on(COLON$$module$$linkify$core$scanner, S_FULL_PROTOCOL$$module$$linkify$core$scanner);
var partialLocalhostStates$$module$$linkify$core$scanner = stateify$$module$$linkify$core$scanner("localhost", S_START$$module$$linkify$core$scanner, T_LOCALHOST$$module$$linkify$core$scanner, T_DOMAIN$$module$$linkify$core$scanner);
domainStates$$module$$linkify$core$scanner.push.apply(domainStates$$module$$linkify$core$scanner, partialLocalhostStates$$module$$linkify$core$scanner);
S_START$$module$$linkify$core$scanner.on(REGEXP_NUM$$module$$linkify$core$scanner, S_NUM$$module$$linkify$core$scanner);
S_NUM$$module$$linkify$core$scanner.on("-", S_DOMAIN_HYPHEN$$module$$linkify$core$scanner);
S_NUM$$module$$linkify$core$scanner.on(REGEXP_NUM$$module$$linkify$core$scanner, S_NUM$$module$$linkify$core$scanner);
S_NUM$$module$$linkify$core$scanner.on(REGEXP_ALPHANUM$$module$$linkify$core$scanner, S_DOMAIN$$module$$linkify$core$scanner);
S_DOMAIN$$module$$linkify$core$scanner.on("-", S_DOMAIN_HYPHEN$$module$$linkify$core$scanner);
S_DOMAIN$$module$$linkify$core$scanner.on(REGEXP_ALPHANUM$$module$$linkify$core$scanner, S_DOMAIN$$module$$linkify$core$scanner);
for (i$$module$$linkify$core$scanner = 0;i$$module$$linkify$core$scanner < domainStates$$module$$linkify$core$scanner.length;i$$module$$linkify$core$scanner++) {
  domainStates$$module$$linkify$core$scanner[i$$module$$linkify$core$scanner].on("-", S_DOMAIN_HYPHEN$$module$$linkify$core$scanner), domainStates$$module$$linkify$core$scanner[i$$module$$linkify$core$scanner].on(REGEXP_ALPHANUM$$module$$linkify$core$scanner, S_DOMAIN$$module$$linkify$core$scanner);
}
S_DOMAIN_HYPHEN$$module$$linkify$core$scanner.on("-", S_DOMAIN_HYPHEN$$module$$linkify$core$scanner);
S_DOMAIN_HYPHEN$$module$$linkify$core$scanner.on(REGEXP_NUM$$module$$linkify$core$scanner, S_DOMAIN$$module$$linkify$core$scanner);
S_DOMAIN_HYPHEN$$module$$linkify$core$scanner.on(REGEXP_ALPHANUM$$module$$linkify$core$scanner, S_DOMAIN$$module$$linkify$core$scanner);
S_START$$module$$linkify$core$scanner.on(/./, makeState$$module$$linkify$core$scanner(TOKENS$$module$$linkify$core$scanner.SYM));
var run$$module$$linkify$core$scanner = function(b) {
  for (var a = b.toLowerCase(), c = b.length, f = 0, e = [];f < c;) {
    for (var g = S_START$$module$$linkify$core$scanner, h = null, d = 0, k = null, l = -1;f < c && (h = g.next(a[f]));) {
      g = h, g.accepts() ? (l = 0, k = g) : 0 <= l && l++, d++, f++;
    }
    0 > l || (f -= l, d -= l, g = k.emit(), e.push(new g(b.substr(f - d, d))));
  }
  return e;
}, start$$module$$linkify$core$scanner = S_START$$module$$linkify$core$scanner;
module$$linkify$core$scanner.State = State$$module$$linkify$core$scanner;
module$$linkify$core$scanner.TOKENS = TOKENS$$module$$linkify$core$scanner;
module$$linkify$core$scanner.run = run$$module$$linkify$core$scanner;
module$$linkify$core$scanner.start = start$$module$$linkify$core$scanner;
var module$$linkify = {}, _interopRequireWildcard$$module$$linkify = function(b) {
  return b && b.constructor === Object ? b : {"default":b};
}, scanner$$module$$linkify = _interopRequireWildcard$$module$$linkify(module$$linkify$core$scanner), parser$$module$$linkify = _interopRequireWildcard$$module$$linkify(module$$linkify$core$parser), tokenize$$module$$linkify = function(b) {
  return parser$$module$$linkify.run(scanner$$module$$linkify.run(b));
}, find$$module$$linkify = function(b) {
  b = tokenize$$module$$linkify(b);
  for (var a = [], c = 0;c < b.length;c++) {
    b[c].isLink && a.push(b[c].toObject());
  }
  return a;
}, test$$module$$linkify = function(b, a) {
  var c = void 0 === a ? null : a, f = tokenize$$module$$linkify(b);
  return 1 === f.length && f[0].isLink && (!c || f[0].type === c);
};
module$$linkify.find = find$$module$$linkify;
module$$linkify.parser = parser$$module$$linkify;
module$$linkify.scanner = scanner$$module$$linkify;
module$$linkify.test = test$$module$$linkify;
module$$linkify.tokenize = tokenize$$module$$linkify;


window.linkify = module$$linkify;
})();
