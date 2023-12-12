import {
  defineComponent,
  h,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  watch
} from "./chunk-RY4PZZFY.js";
import "./chunk-76J2PTFD.js";

// node_modules/vue-timeago3/dist/vue-timeago.es.js
function _(e) {
  "@babel/helpers - typeof";
  return _ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _(e);
}
function ne(e) {
  if (e === null || e === true || e === false)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function h2(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function m(e) {
  h2(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || _(e) === "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
}
var re = {};
function $() {
  return re;
}
function P(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
function T(e, t) {
  h2(2, arguments);
  var a = m(e), n = m(t), r = a.getTime() - n.getTime();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
var j = 6e4;
var q = 36e5;
function ie(e, t) {
  h2(2, arguments);
  var a = m(e), n = m(t), r = a.getFullYear() - n.getFullYear(), o = a.getMonth() - n.getMonth();
  return r * 12 + o;
}
function oe(e, t) {
  return h2(2, arguments), m(e).getTime() - m(t).getTime();
}
var R = {
  ceil: Math.ceil,
  round: Math.round,
  floor: Math.floor,
  trunc: function(t) {
    return t < 0 ? Math.ceil(t) : Math.floor(t);
  }
  // Math.trunc is not supported by IE
};
var ue = "trunc";
function le(e) {
  return e ? R[e] : R[ue];
}
function se(e) {
  h2(1, arguments);
  var t = m(e);
  return t.setHours(23, 59, 59, 999), t;
}
function fe(e) {
  h2(1, arguments);
  var t = m(e), a = t.getMonth();
  return t.setFullYear(t.getFullYear(), a + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function de(e) {
  h2(1, arguments);
  var t = m(e);
  return se(t).getTime() === fe(t).getTime();
}
function me(e, t) {
  h2(2, arguments);
  var a = m(e), n = m(t), r = T(a, n), o = Math.abs(ie(a, n)), i;
  if (o < 1)
    i = 0;
  else {
    a.getMonth() === 1 && a.getDate() > 27 && a.setDate(30), a.setMonth(a.getMonth() - r * o);
    var s = T(a, n) === -r;
    de(m(e)) && o === 1 && T(e, n) === 1 && (s = false), i = r * (o - Number(s));
  }
  return i === 0 ? 0 : i;
}
function ce(e, t, a) {
  h2(2, arguments);
  var n = oe(e, t) / 1e3;
  return le(a == null ? void 0 : a.roundingMethod)(n);
}
var ve = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var he = function(t, a, n) {
  var r, o = ve[t];
  return typeof o == "string" ? r = o : a === 1 ? r = o.one : r = o.other.replace("{{count}}", a.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
var ge = he;
function C(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = t.width ? String(t.width) : e.defaultWidth, n = e.formats[a] || e.formats[e.defaultWidth];
    return n;
  };
}
var Me = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var be = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var we = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var ye = {
  date: C({
    formats: Me,
    defaultWidth: "full"
  }),
  time: C({
    formats: be,
    defaultWidth: "full"
  }),
  dateTime: C({
    formats: we,
    defaultWidth: "full"
  })
};
var De = ye;
var pe = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var Se = function(t, a, n, r) {
  return pe[t];
};
var Te = Se;
function D(e) {
  return function(t, a) {
    var n = a != null && a.context ? String(a.context) : "standalone", r;
    if (n === "formatting" && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth, i = a != null && a.width ? String(a.width) : o;
      r = e.formattingValues[i] || e.formattingValues[o];
    } else {
      var s = e.defaultWidth, u = a != null && a.width ? String(a.width) : e.defaultWidth;
      r = e.values[u] || e.values[s];
    }
    var l = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[l];
  };
}
var Ne = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var Pe = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var xe = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var Ie = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var We = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var Ce = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var Oe = function(t, a) {
  var n = Number(t), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
};
var Ue = {
  ordinalNumber: Oe,
  era: D({
    values: Ne,
    defaultWidth: "wide"
  }),
  quarter: D({
    values: Pe,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: D({
    values: xe,
    defaultWidth: "wide"
  }),
  day: D({
    values: Ie,
    defaultWidth: "wide"
  }),
  dayPeriod: D({
    values: We,
    defaultWidth: "wide",
    formattingValues: Ce,
    defaultFormattingWidth: "wide"
  })
};
var _e = Ue;
function p(e) {
  return function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = a.width, r = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], o = t.match(r);
    if (!o)
      return null;
    var i = o[0], s = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], u = Array.isArray(s) ? Ee(s, function(c) {
      return c.test(i);
    }) : Fe(s, function(c) {
      return c.test(i);
    }), l;
    l = e.valueCallback ? e.valueCallback(u) : u, l = a.valueCallback ? a.valueCallback(l) : l;
    var d = t.slice(i.length);
    return {
      value: l,
      rest: d
    };
  };
}
function Fe(e, t) {
  for (var a in e)
    if (e.hasOwnProperty(a) && t(e[a]))
      return a;
}
function Ee(e, t) {
  for (var a = 0; a < e.length; a++)
    if (t(e[a]))
      return a;
}
function ke(e) {
  return function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.match(e.matchPattern);
    if (!n)
      return null;
    var r = n[0], o = t.match(e.parsePattern);
    if (!o)
      return null;
    var i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    i = a.valueCallback ? a.valueCallback(i) : i;
    var s = t.slice(r.length);
    return {
      value: i,
      rest: s
    };
  };
}
var Re = /^(\d+)(th|st|nd|rd)?/i;
var Ye = /\d+/i;
var Ae = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var ze = {
  any: [/^b/i, /^(a|c)/i]
};
var Xe = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var $e = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var je = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var qe = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var Le = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var He = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var Ve = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var Je = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var Qe = {
  ordinalNumber: ke({
    matchPattern: Re,
    parsePattern: Ye,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: p({
    matchPatterns: Ae,
    defaultMatchWidth: "wide",
    parsePatterns: ze,
    defaultParseWidth: "any"
  }),
  quarter: p({
    matchPatterns: Xe,
    defaultMatchWidth: "wide",
    parsePatterns: $e,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: p({
    matchPatterns: je,
    defaultMatchWidth: "wide",
    parsePatterns: qe,
    defaultParseWidth: "any"
  }),
  day: p({
    matchPatterns: Le,
    defaultMatchWidth: "wide",
    parsePatterns: He,
    defaultParseWidth: "any"
  }),
  dayPeriod: p({
    matchPatterns: Ve,
    defaultMatchWidth: "any",
    parsePatterns: Je,
    defaultParseWidth: "any"
  })
};
var Ze = Qe;
var Be = {
  code: "en-US",
  formatDistance: ge,
  formatLong: De,
  formatRelative: Te,
  localize: _e,
  match: Ze,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var L = Be;
function F(e, t) {
  if (e == null)
    throw new TypeError("assign requires that input parameter not be null or undefined");
  for (var a in t)
    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
  return e;
}
function H(e) {
  return F({}, e);
}
var Y = 1440;
var Ge = 2520;
var O = 43200;
var Ke = 86400;
function et(e, t, a) {
  var n, r;
  h2(2, arguments);
  var o = $(), i = (n = (r = a == null ? void 0 : a.locale) !== null && r !== void 0 ? r : o.locale) !== null && n !== void 0 ? n : L;
  if (!i.formatDistance)
    throw new RangeError("locale must contain formatDistance property");
  var s = T(e, t);
  if (isNaN(s))
    throw new RangeError("Invalid time value");
  var u = F(H(a), {
    addSuffix: !!(a != null && a.addSuffix),
    comparison: s
  }), l, d;
  s > 0 ? (l = m(t), d = m(e)) : (l = m(e), d = m(t));
  var c = ce(d, l), y = (P(d) - P(l)) / 1e3, f = Math.round((c - y) / 60), g;
  if (f < 2)
    return a != null && a.includeSeconds ? c < 5 ? i.formatDistance("lessThanXSeconds", 5, u) : c < 10 ? i.formatDistance("lessThanXSeconds", 10, u) : c < 20 ? i.formatDistance("lessThanXSeconds", 20, u) : c < 40 ? i.formatDistance("halfAMinute", 0, u) : c < 60 ? i.formatDistance("lessThanXMinutes", 1, u) : i.formatDistance("xMinutes", 1, u) : f === 0 ? i.formatDistance("lessThanXMinutes", 1, u) : i.formatDistance("xMinutes", f, u);
  if (f < 45)
    return i.formatDistance("xMinutes", f, u);
  if (f < 90)
    return i.formatDistance("aboutXHours", 1, u);
  if (f < Y) {
    var M = Math.round(f / 60);
    return i.formatDistance("aboutXHours", M, u);
  } else {
    if (f < Ge)
      return i.formatDistance("xDays", 1, u);
    if (f < O) {
      var I = Math.round(f / Y);
      return i.formatDistance("xDays", I, u);
    } else if (f < Ke)
      return g = Math.round(f / O), i.formatDistance("aboutXMonths", g, u);
  }
  if (g = me(d, l), g < 12) {
    var b = Math.round(f / O);
    return i.formatDistance("xMonths", b, u);
  } else {
    var w = g % 12, v = Math.floor(g / 12);
    return w < 3 ? i.formatDistance("aboutXYears", v, u) : w < 9 ? i.formatDistance("overXYears", v, u) : i.formatDistance("almostXYears", v + 1, u);
  }
}
var A = 1e3 * 60;
var x = 60 * 24;
var z = x * 30;
var X = x * 365;
function tt(e, t, a) {
  var n, r, o;
  h2(2, arguments);
  var i = $(), s = (n = (r = a == null ? void 0 : a.locale) !== null && r !== void 0 ? r : i.locale) !== null && n !== void 0 ? n : L;
  if (!s.formatDistance)
    throw new RangeError("locale must contain localize.formatDistance property");
  var u = T(e, t);
  if (isNaN(u))
    throw new RangeError("Invalid time value");
  var l = F(H(a), {
    addSuffix: !!(a != null && a.addSuffix),
    comparison: u
  }), d, c;
  u > 0 ? (d = m(t), c = m(e)) : (d = m(e), c = m(t));
  var y = String((o = a == null ? void 0 : a.roundingMethod) !== null && o !== void 0 ? o : "round"), f;
  if (y === "floor")
    f = Math.floor;
  else if (y === "ceil")
    f = Math.ceil;
  else if (y === "round")
    f = Math.round;
  else
    throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
  var g = c.getTime() - d.getTime(), M = g / A, I = P(c) - P(d), b = (g - I) / A, w = a == null ? void 0 : a.unit, v;
  if (w ? v = String(w) : M < 1 ? v = "second" : M < 60 ? v = "minute" : M < x ? v = "hour" : b < z ? v = "day" : b < X ? v = "month" : v = "year", v === "second") {
    var J = f(g / 1e3);
    return s.formatDistance("xSeconds", J, l);
  } else if (v === "minute") {
    var Q = f(M);
    return s.formatDistance("xMinutes", Q, l);
  } else if (v === "hour") {
    var Z = f(M / 60);
    return s.formatDistance("xHours", Z, l);
  } else if (v === "day") {
    var B = f(b / x);
    return s.formatDistance("xDays", B, l);
  } else if (v === "month") {
    var E = f(b / z);
    return E === 12 && w !== "month" ? s.formatDistance("xYears", 1, l) : s.formatDistance("xMonths", E, l);
  } else if (v === "year") {
    var G = f(b / X);
    return s.formatDistance("xYears", G, l);
  }
  throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
}
function at(e, t) {
  return h2(1, arguments), et(e, Date.now(), t);
}
function nt(e, t) {
  return h2(1, arguments), tt(e, Date.now(), t);
}
function rt(e, t) {
  var a;
  h2(1, arguments);
  var n = ne((a = t == null ? void 0 : t.additionalDigits) !== null && a !== void 0 ? a : 2);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var r = lt(e), o;
  if (r.date) {
    var i = st(r.date, n);
    o = ft(i.restDateString, i.year);
  }
  if (!o || isNaN(o.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  var s = o.getTime(), u = 0, l;
  if (r.time && (u = dt(r.time), isNaN(u)))
    return /* @__PURE__ */ new Date(NaN);
  if (r.timezone) {
    if (l = mt(r.timezone), isNaN(l))
      return /* @__PURE__ */ new Date(NaN);
  } else {
    var d = new Date(s + u), c = /* @__PURE__ */ new Date(0);
    return c.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()), c.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()), c;
  }
  return new Date(s + u + l);
}
var N = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var it = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var ot = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var ut = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function lt(e) {
  var t = {}, a = e.split(N.dateTimeDelimiter), n;
  if (a.length > 2)
    return t;
  if (/:/.test(a[0]) ? n = a[0] : (t.date = a[0], n = a[1], N.timeZoneDelimiter.test(t.date) && (t.date = e.split(N.timeZoneDelimiter)[0], n = e.substr(t.date.length, e.length))), n) {
    var r = N.timezone.exec(n);
    r ? (t.time = n.replace(r[1], ""), t.timezone = r[1]) : t.time = n;
  }
  return t;
}
function st(e, t) {
  var a = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"), n = e.match(a);
  if (!n)
    return {
      year: NaN,
      restDateString: ""
    };
  var r = n[1] ? parseInt(n[1]) : null, o = n[2] ? parseInt(n[2]) : null;
  return {
    year: o === null ? r : o * 100,
    restDateString: e.slice((n[1] || n[2]).length)
  };
}
function ft(e, t) {
  if (t === null)
    return /* @__PURE__ */ new Date(NaN);
  var a = e.match(it);
  if (!a)
    return /* @__PURE__ */ new Date(NaN);
  var n = !!a[4], r = S(a[1]), o = S(a[2]) - 1, i = S(a[3]), s = S(a[4]), u = S(a[5]) - 1;
  if (n)
    return Mt(t, s, u) ? ct(t, s, u) : /* @__PURE__ */ new Date(NaN);
  var l = /* @__PURE__ */ new Date(0);
  return !ht(t, o, i) || !gt(t, r) ? /* @__PURE__ */ new Date(NaN) : (l.setUTCFullYear(t, o, Math.max(r, i)), l);
}
function S(e) {
  return e ? parseInt(e) : 1;
}
function dt(e) {
  var t = e.match(ot);
  if (!t)
    return NaN;
  var a = U(t[1]), n = U(t[2]), r = U(t[3]);
  return bt(a, n, r) ? a * q + n * j + r * 1e3 : NaN;
}
function U(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function mt(e) {
  if (e === "Z")
    return 0;
  var t = e.match(ut);
  if (!t)
    return 0;
  var a = t[1] === "+" ? -1 : 1, n = parseInt(t[2]), r = t[3] && parseInt(t[3]) || 0;
  return wt(n, r) ? a * (n * q + r * j) : NaN;
}
function ct(e, t, a) {
  var n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(e, 0, 4);
  var r = n.getUTCDay() || 7, o = (t - 1) * 7 + a + 1 - r;
  return n.setUTCDate(n.getUTCDate() + o), n;
}
var vt = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function V(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function ht(e, t, a) {
  return t >= 0 && t <= 11 && a >= 1 && a <= (vt[t] || (V(e) ? 29 : 28));
}
function gt(e, t) {
  return t >= 1 && t <= (V(e) ? 366 : 365);
}
function Mt(e, t, a) {
  return t >= 1 && t <= 53 && a >= 0 && a <= 6;
}
function bt(e, t, a) {
  return e === 24 ? t === 0 && a === 0 : a >= 0 && a < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function wt(e, t) {
  return t >= 0 && t <= 59;
}
var yt = (e, t = {}, a) => (typeof e == "string" && (e = rt(e)), t.useStrict ? nt(e, {
  addSuffix: t.addSuffix ?? true,
  locale: a,
  unit: t.unit,
  roundingMethod: t.roundingMethod
}) : at(e, {
  includeSeconds: t.includeSeconds,
  addSuffix: t.addSuffix ?? true,
  locale: a
}));
var Dt = (e = {}) => {
  const t = e.name || "Timeago";
  return defineComponent({
    name: t,
    props: {
      datetime: {
        type: [String, Number, Date],
        required: true
      },
      title: {
        type: [String, Boolean],
        required: false,
        default: null
      },
      autoUpdate: {
        type: [Number, Boolean],
        required: false,
        default: null
      },
      converter: {
        type: Function,
        required: false,
        default: null
      },
      converterOptions: {
        type: Object,
        required: false,
        default: null
      },
      locale: {
        type: Object,
        required: false,
        default: null
      }
    },
    setup(a) {
      const n = ref();
      onBeforeMount(() => {
        s();
      }), onBeforeUnmount(() => {
        u();
      });
      const r = (l) => (a.converter || yt)(
        l || a.datetime,
        a.converterOptions || e.converterOptions,
        a.locale || e.locale
      ), o = ref(r()), i = (l) => {
        o.value = r(l);
      }, s = () => {
        if (a.autoUpdate) {
          const l = a.autoUpdate === true ? 60 : a.autoUpdate;
          n.value = setInterval(() => {
            i(a.datetime);
          }, l * 1e3);
        }
      }, u = () => {
        n.value && (clearInterval(n.value), n.value = void 0);
      };
      return watch(
        () => a.autoUpdate,
        (l) => {
          u(), l && s();
        }
      ), watch(
        () => [a.datetime, a.converter],
        () => {
          i();
        }
      ), watch(
        () => a.converterOptions,
        () => {
          i();
        },
        {
          deep: true
        }
      ), { timeago: o, updateTimer: n };
    },
    render() {
      return h(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "timeago",
        {
          attrs: {
            datetime: new Date(this.datetime).toISOString(),
            title: typeof this.title == "string" ? this.title : this.title === false ? null : this.timeago
          }
        },
        [this.timeago]
      );
    }
  });
};
var St = (e, t) => {
  if (e.config.globalProperties.$timeago)
    return;
  Number(e.version.split(".")[0]) < 3 && console.warn(
    "[vue-timeago3] This plugin requires at least Vue version 3.0"
  );
  const n = Dt(t);
  e.component(n.name, n);
};
export {
  St as default
};
//# sourceMappingURL=vue-timeago3.js.map
