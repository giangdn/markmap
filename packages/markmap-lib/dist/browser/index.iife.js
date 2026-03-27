(function(exports, require$$0) {
  "use strict";
  const T = "npm2url/dist/index.cjs", k$1 = {
    jsdelivr: (t) => `https://cdn.jsdelivr.net/npm/${t}`,
    unpkg: (t) => `https://unpkg.com/${t}`
  };
  async function A$1(t, e) {
    const n = await fetch(t, {
      signal: e
    });
    if (!n.ok)
      throw n;
    await n.text();
  }
  class C {
    constructor() {
      this.providers = { ...k$1 }, this.provider = "jsdelivr";
    }
    /**
     * Get the fastest provider name.
     * If none of the providers returns a valid response within `timeout`, an error will be thrown.
     */
    async getFastestProvider(e = 5e3, n = T) {
      const r = new AbortController();
      let s = 0;
      try {
        return await new Promise((o, i) => {
          Promise.all(
            Object.entries(this.providers).map(async ([c, j2]) => {
              try {
                await A$1(j2(n), r.signal), o(c);
              } catch {
              }
            })
          ).then(() => i(new Error("All providers failed"))), s = setTimeout(i, e, new Error("Timed out"));
        });
      } finally {
        r.abort(), clearTimeout(s);
      }
    }
    /**
     * Set the current provider to the fastest provider found by `getFastestProvider`.
     */
    async findFastestProvider(e, n) {
      return this.provider = await this.getFastestProvider(e, n), this.provider;
    }
    setProvider(e, n) {
      n ? this.providers[e] = n : delete this.providers[e];
    }
    getFullUrl(e, n = this.provider) {
      if (e.includes("://"))
        return e;
      const r = this.providers[n];
      if (!r)
        throw new Error(`Provider ${n} not found`);
      return r(e);
    }
  }
  let X$1 = class X {
    constructor() {
      this.listeners = [];
    }
    tap(e) {
      return this.listeners.push(e), () => this.revoke(e);
    }
    revoke(e) {
      const n = this.listeners.indexOf(e);
      n >= 0 && this.listeners.splice(n, 1);
    }
    revokeAll() {
      this.listeners.splice(0);
    }
    call(...e) {
      for (const n of this.listeners)
        n(...e);
    }
  };
  Math.random().toString(36).slice(2, 8);
  function et$1() {
  }
  function st$1(t, e) {
    return (...n) => e(t, ...n);
  }
  function g$1() {
    const t = {};
    return t.promise = new Promise((e, n) => {
      t.resolve = e, t.reject = n;
    }), t;
  }
  function O$1(t) {
    const e = {};
    return function(...r) {
      const s = `${r[0]}`;
      let o = e[s];
      return o || (o = {
        value: t(...r)
      }, e[s] = o), o.value;
    };
  }
  /*! @gera2ld/jsx-dom v2.2.2 | ISC License */
  const v$1 = 1, b = 2, P$1 = "http://www.w3.org/2000/svg", a = "http://www.w3.org/1999/xlink", F$1 = {
    show: a,
    actuate: a,
    href: a
  }, L$1 = (t) => typeof t == "string" || typeof t == "number", M = (t) => (t == null ? void 0 : t.vtype) === v$1, _$1 = (t) => (t == null ? void 0 : t.vtype) === b;
  function V$1(t, e, ...n) {
    return e = Object.assign({}, e, {
      children: n.length === 1 ? n[0] : n
    }), B$1(t, e);
  }
  function B$1(t, e) {
    let n;
    if (typeof t == "string") n = v$1;
    else if (typeof t == "function") n = b;
    else throw new Error("Invalid VNode type");
    return {
      vtype: n,
      type: t,
      props: e
    };
  }
  function H$1(t) {
    return t.children;
  }
  const J$1 = {
    isSvg: false
  };
  function w(t, e) {
    Array.isArray(e) || (e = [e]), e = e.filter(Boolean), e.length && t.append(...e);
  }
  function D$1(t, e, n) {
    for (const r in e)
      if (!(r === "key" || r === "children" || r === "ref"))
        if (r === "dangerouslySetInnerHTML")
          t.innerHTML = e[r].__html;
        else if (r === "innerHTML" || r === "textContent" || r === "innerText" || r === "value" && ["textarea", "select"].includes(t.tagName)) {
          const s = e[r];
          s != null && (t[r] = s);
        } else r.startsWith("on") ? t[r.toLowerCase()] = e[r] : z$1(t, r, e[r], n.isSvg);
  }
  const U$1 = {
    className: "class",
    labelFor: "for"
  };
  function z$1(t, e, n, r) {
    if (e = U$1[e] || e, n === true)
      t.setAttribute(e, "");
    else if (n === false)
      t.removeAttribute(e);
    else {
      const s = r ? F$1[e] : void 0;
      s !== void 0 ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
    }
  }
  function q$1(t) {
    return t.reduce((e, n) => e.concat(n), []);
  }
  function f(t, e) {
    return Array.isArray(t) ? q$1(t.map((n) => f(n, e))) : d$1(t, e);
  }
  function d$1(t, e = J$1) {
    if (t == null || typeof t == "boolean")
      return null;
    if (t instanceof Node)
      return t;
    if (_$1(t)) {
      const {
        type: n,
        props: r
      } = t;
      if (n === H$1) {
        const o = document.createDocumentFragment();
        if (r.children) {
          const i = f(r.children, e);
          w(o, i);
        }
        return o;
      }
      const s = n(r);
      return d$1(s, e);
    }
    if (L$1(t))
      return document.createTextNode(`${t}`);
    if (M(t)) {
      let n;
      const {
        type: r,
        props: s
      } = t;
      if (!e.isSvg && r === "svg" && (e = Object.assign({}, e, {
        isSvg: true
      })), e.isSvg ? n = document.createElementNS(P$1, r) : n = document.createElement(r), D$1(n, s, e), s.children) {
        let i = e;
        e.isSvg && r === "foreignObject" && (i = Object.assign({}, i, {
          isSvg: false
        }));
        const c = f(s.children, i);
        c != null && w(n, c);
      }
      const {
        ref: o
      } = s;
      return typeof o == "function" && o(n), n;
    }
    throw new Error("mount: Invalid Vnode!");
  }
  function R(t) {
    return d$1(t);
  }
  function u(...t) {
    return R(V$1(...t));
  }
  const Y$1 = O$1((t) => {
    document.head.append(
      u("link", {
        rel: "preload",
        as: "script",
        href: t
      })
    );
  }), S$1 = {}, m$1 = {};
  async function G$1(t, e) {
    var r;
    const n = t.type === "script" && ((r = t.data) == null ? void 0 : r.src) || "";
    if (t.loaded || (t.loaded = S$1[n]), !t.loaded) {
      const s = g$1();
      if (t.loaded = s.promise, t.type === "script" && (document.head.append(
        u("script", {
          ...t.data,
          onLoad: () => s.resolve(),
          onError: s.reject
        })
      ), n ? S$1[n] = t.loaded : s.resolve()), t.type === "iife") {
        const { fn: o, getParams: i } = t.data;
        o(...(i == null ? void 0 : i(e)) || []), s.resolve();
      }
    }
    await t.loaded;
  }
  async function K$1(t) {
    const e = t.type === "stylesheet" && t.data.href || "";
    if (t.loaded || (t.loaded = m$1[e]), !t.loaded) {
      const n = g$1();
      t.loaded = n.promise, e && (m$1[e] = t.loaded), t.type === "style" ? (document.head.append(
        u("style", {
          textContent: t.data
        })
      ), n.resolve()) : e && (document.head.append(
        u("link", {
          rel: "stylesheet",
          ...t.data
        })
      ), fetch(e).then((r) => {
        if (r.ok) return r.text();
        throw r;
      }).then(() => n.resolve(), n.reject));
    }
    await t.loaded;
  }
  async function it$1(t, e) {
    t.forEach((n) => {
      var r;
      n.type === "script" && ((r = n.data) != null && r.src) && Y$1(n.data.src);
    }), e = {
      getMarkmap: () => window.markmap,
      ...e
    };
    for (const n of t)
      await G$1(n, e);
  }
  async function ct$1(t) {
    await Promise.all(t.map((e) => K$1(e)));
  }
  function lt$1(t) {
    return {
      type: "script",
      data: {
        src: t
      }
    };
  }
  function ut$1(t) {
    return {
      type: "stylesheet",
      data: {
        href: t
      }
    };
  }
  const qe = {
    _useHtmlParser2: false
  };
  function $u(u2, t) {
    if (!u2)
      return t ?? qe;
    const e = {
      _useHtmlParser2: !!u2.xmlMode,
      ...t,
      ...u2
    };
    return u2.xml ? (e._useHtmlParser2 = true, e.xmlMode = true, u2.xml !== true && Object.assign(e, u2.xml)) : u2.xmlMode && (e._useHtmlParser2 = true), e;
  }
  var S;
  (function(u2) {
    u2.Root = "root", u2.Text = "text", u2.Directive = "directive", u2.Comment = "comment", u2.Script = "script", u2.Style = "style", u2.Tag = "tag", u2.CDATA = "cdata", u2.Doctype = "doctype";
  })(S || (S = {}));
  function Ie(u2) {
    return u2.type === S.Tag || u2.type === S.Script || u2.type === S.Style;
  }
  const Ce = S.Root, De = S.Text, Le = S.Directive, Oe = S.Comment, Me = S.Script, Pe = S.Style, Be = S.Tag, Fe = S.CDATA, Re = S.Doctype;
  class Rt {
    constructor() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    // Read-write aliases for properties
    /**
     * Same as {@link parent}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get parentNode() {
      return this.parent;
    }
    set parentNode(t) {
      this.parent = t;
    }
    /**
     * Same as {@link prev}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get previousSibling() {
      return this.prev;
    }
    set previousSibling(t) {
      this.prev = t;
    }
    /**
     * Same as {@link next}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get nextSibling() {
      return this.next;
    }
    set nextSibling(t) {
      this.next = t;
    }
    /**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */
    cloneNode(t = false) {
      return au(this, t);
    }
  }
  class Ju extends Rt {
    /**
     * @param data The content of the data node
     */
    constructor(t) {
      super(), this.data = t;
    }
    /**
     * Same as {@link data}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get nodeValue() {
      return this.data;
    }
    set nodeValue(t) {
      this.data = t;
    }
  }
  class mu extends Ju {
    constructor() {
      super(...arguments), this.type = S.Text;
    }
    get nodeType() {
      return 3;
    }
  }
  class jt extends Ju {
    constructor() {
      super(...arguments), this.type = S.Comment;
    }
    get nodeType() {
      return 8;
    }
  }
  class Ut extends Ju {
    constructor(t, e) {
      super(e), this.name = t, this.type = S.Directive;
    }
    get nodeType() {
      return 1;
    }
  }
  class Ku extends Rt {
    /**
     * @param children Children of the node. Only certain node types can have children.
     */
    constructor(t) {
      super(), this.children = t;
    }
    // Aliases
    /** First child of the node. */
    get firstChild() {
      var t;
      return (t = this.children[0]) !== null && t !== void 0 ? t : null;
    }
    /** Last child of the node. */
    get lastChild() {
      return this.children.length > 0 ? this.children[this.children.length - 1] : null;
    }
    /**
     * Same as {@link children}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get childNodes() {
      return this.children;
    }
    set childNodes(t) {
      this.children = t;
    }
  }
  class Vt extends Ku {
    constructor() {
      super(...arguments), this.type = S.CDATA;
    }
    get nodeType() {
      return 4;
    }
  }
  class ru extends Ku {
    constructor() {
      super(...arguments), this.type = S.Root;
    }
    get nodeType() {
      return 9;
    }
  }
  class $t extends Ku {
    /**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */
    constructor(t, e, n = [], i = t === "script" ? S.Script : t === "style" ? S.Style : S.Tag) {
      super(n), this.name = t, this.attribs = e, this.type = i;
    }
    get nodeType() {
      return 1;
    }
    // DOM Level 1 aliases
    /**
     * Same as {@link name}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get tagName() {
      return this.name;
    }
    set tagName(t) {
      this.name = t;
    }
    get attributes() {
      return Object.keys(this.attribs).map((t) => {
        var e, n;
        return {
          name: t,
          value: this.attribs[t],
          namespace: (e = this["x-attribsNamespace"]) === null || e === void 0 ? void 0 : e[t],
          prefix: (n = this["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[t]
        };
      });
    }
  }
  function m(u2) {
    return Ie(u2);
  }
  function _u(u2) {
    return u2.type === S.CDATA;
  }
  function W(u2) {
    return u2.type === S.Text;
  }
  function ut(u2) {
    return u2.type === S.Comment;
  }
  function je(u2) {
    return u2.type === S.Directive;
  }
  function Q(u2) {
    return u2.type === S.Root;
  }
  function N(u2) {
    return Object.prototype.hasOwnProperty.call(u2, "children");
  }
  function au(u2, t = false) {
    let e;
    if (W(u2))
      e = new mu(u2.data);
    else if (ut(u2))
      e = new jt(u2.data);
    else if (m(u2)) {
      const n = t ? Ou(u2.children) : [], i = new $t(u2.name, { ...u2.attribs }, n);
      n.forEach((r) => r.parent = i), u2.namespace != null && (i.namespace = u2.namespace), u2["x-attribsNamespace"] && (i["x-attribsNamespace"] = { ...u2["x-attribsNamespace"] }), u2["x-attribsPrefix"] && (i["x-attribsPrefix"] = { ...u2["x-attribsPrefix"] }), e = i;
    } else if (_u(u2)) {
      const n = t ? Ou(u2.children) : [], i = new Vt(n);
      n.forEach((r) => r.parent = i), e = i;
    } else if (Q(u2)) {
      const n = t ? Ou(u2.children) : [], i = new ru(n);
      n.forEach((r) => r.parent = i), u2["x-mode"] && (i["x-mode"] = u2["x-mode"]), e = i;
    } else if (je(u2)) {
      const n = new Ut(u2.name, u2.data);
      u2["x-name"] != null && (n["x-name"] = u2["x-name"], n["x-publicId"] = u2["x-publicId"], n["x-systemId"] = u2["x-systemId"]), e = n;
    } else
      throw new Error(`Not implemented yet: ${u2.type}`);
    return e.startIndex = u2.startIndex, e.endIndex = u2.endIndex, u2.sourceCodeLocation != null && (e.sourceCodeLocation = u2.sourceCodeLocation), e;
  }
  function Ou(u2) {
    const t = u2.map((e) => au(e, true));
    for (let e = 1; e < t.length; e++)
      t[e].prev = t[e - 1], t[e - 1].next = t[e];
    return t;
  }
  const mt = {
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false
  };
  class Ue {
    /**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
    constructor(t, e, n) {
      this.dom = [], this.root = new ru(this.dom), this.done = false, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof e == "function" && (n = e, e = mt), typeof t == "object" && (e = t, t = void 0), this.callback = t ?? null, this.options = e ?? mt, this.elementCB = n ?? null;
    }
    onparserinit(t) {
      this.parser = t;
    }
    // Resets the handler back to starting state
    onreset() {
      this.dom = [], this.root = new ru(this.dom), this.done = false, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
    }
    // Signals the handler that parsing is done
    onend() {
      this.done || (this.done = true, this.parser = null, this.handleCallback(null));
    }
    onerror(t) {
      this.handleCallback(t);
    }
    onclosetag() {
      this.lastNode = null;
      const t = this.tagStack.pop();
      this.options.withEndIndices && (t.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(t);
    }
    onopentag(t, e) {
      const n = this.options.xmlMode ? S.Tag : void 0, i = new $t(t, e, void 0, n);
      this.addNode(i), this.tagStack.push(i);
    }
    ontext(t) {
      const { lastNode: e } = this;
      if (e && e.type === S.Text)
        e.data += t, this.options.withEndIndices && (e.endIndex = this.parser.endIndex);
      else {
        const n = new mu(t);
        this.addNode(n), this.lastNode = n;
      }
    }
    oncomment(t) {
      if (this.lastNode && this.lastNode.type === S.Comment) {
        this.lastNode.data += t;
        return;
      }
      const e = new jt(t);
      this.addNode(e), this.lastNode = e;
    }
    oncommentend() {
      this.lastNode = null;
    }
    oncdatastart() {
      const t = new mu(""), e = new Vt([t]);
      this.addNode(e), t.parent = e, this.lastNode = t;
    }
    oncdataend() {
      this.lastNode = null;
    }
    onprocessinginstruction(t, e) {
      const n = new Ut(t, e);
      this.addNode(n);
    }
    handleCallback(t) {
      if (typeof this.callback == "function")
        this.callback(t, this.dom);
      else if (t)
        throw t;
    }
    addNode(t) {
      const e = this.tagStack[this.tagStack.length - 1], n = e.children[e.children.length - 1];
      this.options.withStartIndices && (t.startIndex = this.parser.startIndex), this.options.withEndIndices && (t.endIndex = this.parser.endIndex), e.children.push(t), n && (t.prev = n, n.next = t), t.parent = e, this.lastNode = null;
    }
  }
  const Ht = new Uint16Array(
    // prettier-ignore
    'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((u2) => u2.charCodeAt(0))
  ), Gt = new Uint16Array(
    // prettier-ignore
    "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((u2) => u2.charCodeAt(0))
  );
  var Mu;
  const Ve = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]), Hu = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    (Mu = String.fromCodePoint) !== null && Mu !== void 0 ? Mu : function(u2) {
      let t = "";
      return u2 > 65535 && (u2 -= 65536, t += String.fromCharCode(u2 >>> 10 & 1023 | 55296), u2 = 56320 | u2 & 1023), t += String.fromCharCode(u2), t;
    }
  );
  function $e(u2) {
    var t;
    return u2 >= 55296 && u2 <= 57343 || u2 > 1114111 ? 65533 : (t = Ve.get(u2)) !== null && t !== void 0 ? t : u2;
  }
  var q;
  (function(u2) {
    u2[u2.NUM = 35] = "NUM", u2[u2.SEMI = 59] = "SEMI", u2[u2.EQUALS = 61] = "EQUALS", u2[u2.ZERO = 48] = "ZERO", u2[u2.NINE = 57] = "NINE", u2[u2.LOWER_A = 97] = "LOWER_A", u2[u2.LOWER_F = 102] = "LOWER_F", u2[u2.LOWER_X = 120] = "LOWER_X", u2[u2.LOWER_Z = 122] = "LOWER_Z", u2[u2.UPPER_A = 65] = "UPPER_A", u2[u2.UPPER_F = 70] = "UPPER_F", u2[u2.UPPER_Z = 90] = "UPPER_Z";
  })(q || (q = {}));
  const He = 32;
  var V;
  (function(u2) {
    u2[u2.VALUE_LENGTH = 49152] = "VALUE_LENGTH", u2[u2.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", u2[u2.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(V || (V = {}));
  function Gu(u2) {
    return u2 >= q.ZERO && u2 <= q.NINE;
  }
  function Ge(u2) {
    return u2 >= q.UPPER_A && u2 <= q.UPPER_F || u2 >= q.LOWER_A && u2 <= q.LOWER_F;
  }
  function ze(u2) {
    return u2 >= q.UPPER_A && u2 <= q.UPPER_Z || u2 >= q.LOWER_A && u2 <= q.LOWER_Z || Gu(u2);
  }
  function We(u2) {
    return u2 === q.EQUALS || ze(u2);
  }
  var k;
  (function(u2) {
    u2[u2.EntityStart = 0] = "EntityStart", u2[u2.NumericStart = 1] = "NumericStart", u2[u2.NumericDecimal = 2] = "NumericDecimal", u2[u2.NumericHex = 3] = "NumericHex", u2[u2.NamedEntity = 4] = "NamedEntity";
  })(k || (k = {}));
  var B;
  (function(u2) {
    u2[u2.Legacy = 0] = "Legacy", u2[u2.Strict = 1] = "Strict", u2[u2.Attribute = 2] = "Attribute";
  })(B || (B = {}));
  class zt {
    constructor(t, e, n) {
      this.decodeTree = t, this.emitCodePoint = e, this.errors = n, this.state = k.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = B.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(t) {
      this.decodeMode = t, this.state = k.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(t, e) {
      switch (this.state) {
        case k.EntityStart:
          return t.charCodeAt(e) === q.NUM ? (this.state = k.NumericStart, this.consumed += 1, this.stateNumericStart(t, e + 1)) : (this.state = k.NamedEntity, this.stateNamedEntity(t, e));
        case k.NumericStart:
          return this.stateNumericStart(t, e);
        case k.NumericDecimal:
          return this.stateNumericDecimal(t, e);
        case k.NumericHex:
          return this.stateNumericHex(t, e);
        case k.NamedEntity:
          return this.stateNamedEntity(t, e);
      }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(t, e) {
      return e >= t.length ? -1 : (t.charCodeAt(e) | He) === q.LOWER_X ? (this.state = k.NumericHex, this.consumed += 1, this.stateNumericHex(t, e + 1)) : (this.state = k.NumericDecimal, this.stateNumericDecimal(t, e));
    }
    addToNumericResult(t, e, n, i) {
      if (e !== n) {
        const r = n - e;
        this.result = this.result * Math.pow(i, r) + parseInt(t.substr(e, r), i), this.consumed += r;
      }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(t, e) {
      const n = e;
      for (; e < t.length; ) {
        const i = t.charCodeAt(e);
        if (Gu(i) || Ge(i))
          e += 1;
        else
          return this.addToNumericResult(t, n, e, 16), this.emitNumericEntity(i, 3);
      }
      return this.addToNumericResult(t, n, e, 16), -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(t, e) {
      const n = e;
      for (; e < t.length; ) {
        const i = t.charCodeAt(e);
        if (Gu(i))
          e += 1;
        else
          return this.addToNumericResult(t, n, e, 10), this.emitNumericEntity(i, 2);
      }
      return this.addToNumericResult(t, n, e, 10), -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(t, e) {
      var n;
      if (this.consumed <= e)
        return (n = this.errors) === null || n === void 0 || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      if (t === q.SEMI)
        this.consumed += 1;
      else if (this.decodeMode === B.Strict)
        return 0;
      return this.emitCodePoint($e(this.result), this.consumed), this.errors && (t !== q.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(t, e) {
      const { decodeTree: n } = this;
      let i = n[this.treeIndex], r = (i & V.VALUE_LENGTH) >> 14;
      for (; e < t.length; e++, this.excess++) {
        const a2 = t.charCodeAt(e);
        if (this.treeIndex = Ze(n, i, this.treeIndex + Math.max(1, r), a2), this.treeIndex < 0)
          return this.result === 0 || // If we are parsing an attribute
          this.decodeMode === B.Attribute && // We shouldn't have consumed any characters after the entity,
          (r === 0 || // And there should be no invalid characters.
          We(a2)) ? 0 : this.emitNotTerminatedNamedEntity();
        if (i = n[this.treeIndex], r = (i & V.VALUE_LENGTH) >> 14, r !== 0) {
          if (a2 === q.SEMI)
            return this.emitNamedEntityData(this.treeIndex, r, this.consumed + this.excess);
          this.decodeMode !== B.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
        }
      }
      return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
      var t;
      const { result: e, decodeTree: n } = this, i = (n[e] & V.VALUE_LENGTH) >> 14;
      return this.emitNamedEntityData(e, i, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(t, e, n) {
      const { decodeTree: i } = this;
      return this.emitCodePoint(e === 1 ? i[t] & ~V.VALUE_LENGTH : i[t + 1], n), e === 3 && this.emitCodePoint(i[t + 2], n), n;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
      var t;
      switch (this.state) {
        case k.NamedEntity:
          return this.result !== 0 && (this.decodeMode !== B.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        // Otherwise, emit a numeric entity if we have one.
        case k.NumericDecimal:
          return this.emitNumericEntity(0, 2);
        case k.NumericHex:
          return this.emitNumericEntity(0, 3);
        case k.NumericStart:
          return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        case k.EntityStart:
          return 0;
      }
    }
  }
  function Wt(u2) {
    let t = "";
    const e = new zt(u2, (n) => t += Hu(n));
    return function(i, r) {
      let a2 = 0, s = 0;
      for (; (s = i.indexOf("&", s)) >= 0; ) {
        t += i.slice(a2, s), e.startEntity(r);
        const o = e.write(
          i,
          // Skip the "&"
          s + 1
        );
        if (o < 0) {
          a2 = s + e.end();
          break;
        }
        a2 = s + o, s = o === 0 ? a2 + 1 : a2;
      }
      const c = t + i.slice(a2);
      return t = "", c;
    };
  }
  function Ze(u2, t, e, n) {
    const i = (t & V.BRANCH_LENGTH) >> 7, r = t & V.JUMP_TABLE;
    if (i === 0)
      return r !== 0 && n === r ? e : -1;
    if (r) {
      const c = n - r;
      return c < 0 || c >= i ? -1 : u2[e + c] - 1;
    }
    let a2 = e, s = a2 + i - 1;
    for (; a2 <= s; ) {
      const c = a2 + s >>> 1, o = u2[c];
      if (o < n)
        a2 = c + 1;
      else if (o > n)
        s = c - 1;
      else
        return u2[c + i];
    }
    return -1;
  }
  Wt(Ht);
  Wt(Gt);
  const yt = /["&'<>$\x80-\uFFFF]/g, Qe = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]), Xe = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (u2, t) => u2.codePointAt(t) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      ((u2, t) => (u2.charCodeAt(t) & 64512) === 55296 ? (u2.charCodeAt(t) - 55296) * 1024 + u2.charCodeAt(t + 1) - 56320 + 65536 : u2.charCodeAt(t))
    )
  );
  function Zt(u2) {
    let t = "", e = 0, n;
    for (; (n = yt.exec(u2)) !== null; ) {
      const i = n.index, r = u2.charCodeAt(i), a2 = Qe.get(r);
      a2 !== void 0 ? (t += u2.substring(e, i) + a2, e = i + 1) : (t += `${u2.substring(e, i)}&#x${Xe(u2, i).toString(16)};`, e = yt.lastIndex += +((r & 64512) === 55296));
    }
    return t + u2.substr(e);
  }
  function Qt(u2, t) {
    return function(n) {
      let i, r = 0, a2 = "";
      for (; i = u2.exec(n); )
        r !== i.index && (a2 += n.substring(r, i.index)), a2 += t.get(i[0].charCodeAt(0)), r = i.index + 1;
      return a2 + n.substring(r);
    };
  }
  const Ye = Qt(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), Je = Qt(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ])), Ke = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath"
  ].map((u2) => [u2.toLowerCase(), u2])), u0 = new Map([
    "definitionURL",
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map((u2) => [u2.toLowerCase(), u2])), t0 = /* @__PURE__ */ new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
  ]);
  function e0(u2) {
    return u2.replace(/"/g, "&quot;");
  }
  function n0(u2, t) {
    var e;
    if (!u2)
      return;
    const n = ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) === false ? e0 : t.xmlMode || t.encodeEntities !== "utf8" ? Zt : Ye;
    return Object.keys(u2).map((i) => {
      var r, a2;
      const s = (r = u2[i]) !== null && r !== void 0 ? r : "";
      return t.xmlMode === "foreign" && (i = (a2 = u0.get(i)) !== null && a2 !== void 0 ? a2 : i), !t.emptyAttrs && !t.xmlMode && s === "" ? i : `${i}="${n(s)}"`;
    }).join(" ");
  }
  const At = /* @__PURE__ */ new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  function ku(u2, t = {}) {
    const e = "length" in u2 ? u2 : [u2];
    let n = "";
    for (let i = 0; i < e.length; i++)
      n += i0(e[i], t);
    return n;
  }
  function i0(u2, t) {
    switch (u2.type) {
      case Ce:
        return ku(u2.children, t);
      // @ts-expect-error We don't use `Doctype` yet
      case Re:
      case Le:
        return c0(u2);
      case Oe:
        return d0(u2);
      case Fe:
        return f0(u2);
      case Me:
      case Pe:
      case Be:
        return s0(u2, t);
      case De:
        return o0(u2, t);
    }
  }
  const r0 = /* @__PURE__ */ new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
  ]), a0 = /* @__PURE__ */ new Set(["svg", "math"]);
  function s0(u2, t) {
    var e;
    t.xmlMode === "foreign" && (u2.name = (e = Ke.get(u2.name)) !== null && e !== void 0 ? e : u2.name, u2.parent && r0.has(u2.parent.name) && (t = { ...t, xmlMode: false })), !t.xmlMode && a0.has(u2.name) && (t = { ...t, xmlMode: "foreign" });
    let n = `<${u2.name}`;
    const i = n0(u2.attribs, t);
    return i && (n += ` ${i}`), u2.children.length === 0 && (t.xmlMode ? (
      // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
      t.selfClosingTags !== false
    ) : (
      // User explicitly asked for self-closing tags, even in HTML mode
      t.selfClosingTags && At.has(u2.name)
    )) ? (t.xmlMode || (n += " "), n += "/>") : (n += ">", u2.children.length > 0 && (n += ku(u2.children, t)), (t.xmlMode || !At.has(u2.name)) && (n += `</${u2.name}>`)), n;
  }
  function c0(u2) {
    return `<${u2.data}>`;
  }
  function o0(u2, t) {
    var e;
    let n = u2.data || "";
    return ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) !== false && !(!t.xmlMode && u2.parent && t0.has(u2.parent.name)) && (n = t.xmlMode || t.encodeEntities !== "utf8" ? Zt(n) : Je(n)), n;
  }
  function f0(u2) {
    return `<![CDATA[${u2.children[0].data}]]>`;
  }
  function d0(u2) {
    return `<!--${u2.data}-->`;
  }
  function Xt(u2, t) {
    return ku(u2, t);
  }
  function l0(u2, t) {
    return N(u2) ? u2.children.map((e) => Xt(e, t)).join("") : "";
  }
  function xu(u2) {
    return Array.isArray(u2) ? u2.map(xu).join("") : m(u2) ? u2.name === "br" ? `
` : xu(u2.children) : _u(u2) ? xu(u2.children) : W(u2) ? u2.data : "";
  }
  function K(u2) {
    return Array.isArray(u2) ? u2.map(K).join("") : N(u2) && !ut(u2) ? K(u2.children) : W(u2) ? u2.data : "";
  }
  function yu(u2) {
    return Array.isArray(u2) ? u2.map(yu).join("") : N(u2) && (u2.type === S.Tag || _u(u2)) ? yu(u2.children) : W(u2) ? u2.data : "";
  }
  function qu(u2) {
    return N(u2) ? u2.children : [];
  }
  function Yt(u2) {
    return u2.parent || null;
  }
  function Jt(u2) {
    const t = Yt(u2);
    if (t != null)
      return qu(t);
    const e = [u2];
    let { prev: n, next: i } = u2;
    for (; n != null; )
      e.unshift(n), { prev: n } = n;
    for (; i != null; )
      e.push(i), { next: i } = i;
    return e;
  }
  function h0(u2, t) {
    var e;
    return (e = u2.attribs) === null || e === void 0 ? void 0 : e[t];
  }
  function b0(u2, t) {
    return u2.attribs != null && Object.prototype.hasOwnProperty.call(u2.attribs, t) && u2.attribs[t] != null;
  }
  function p0(u2) {
    return u2.name;
  }
  function tt(u2) {
    let { next: t } = u2;
    for (; t !== null && !m(t); )
      ({ next: t } = t);
    return t;
  }
  function et(u2) {
    let { prev: t } = u2;
    for (; t !== null && !m(t); )
      ({ prev: t } = t);
    return t;
  }
  function X(u2) {
    if (u2.prev && (u2.prev.next = u2.next), u2.next && (u2.next.prev = u2.prev), u2.parent) {
      const t = u2.parent.children, e = t.lastIndexOf(u2);
      e >= 0 && t.splice(e, 1);
    }
    u2.next = null, u2.prev = null, u2.parent = null;
  }
  function g0(u2, t) {
    const e = t.prev = u2.prev;
    e && (e.next = t);
    const n = t.next = u2.next;
    n && (n.prev = t);
    const i = t.parent = u2.parent;
    if (i) {
      const r = i.children;
      r[r.lastIndexOf(u2)] = t, u2.parent = null;
    }
  }
  function x0(u2, t) {
    if (X(t), t.next = null, t.parent = u2, u2.children.push(t) > 1) {
      const e = u2.children[u2.children.length - 2];
      e.next = t, t.prev = e;
    } else
      t.prev = null;
  }
  function m0(u2, t) {
    X(t);
    const { parent: e } = u2, n = u2.next;
    if (t.next = n, t.prev = u2, u2.next = t, t.parent = e, n) {
      if (n.prev = t, e) {
        const i = e.children;
        i.splice(i.lastIndexOf(n), 0, t);
      }
    } else e && e.children.push(t);
  }
  function y0(u2, t) {
    if (X(t), t.parent = u2, t.prev = null, u2.children.unshift(t) !== 1) {
      const e = u2.children[1];
      e.prev = t, t.next = e;
    } else
      t.next = null;
  }
  function A0(u2, t) {
    X(t);
    const { parent: e } = u2;
    if (e) {
      const n = e.children;
      n.splice(n.indexOf(u2), 0, t);
    }
    u2.prev && (u2.prev.next = t), t.parent = e, t.prev = u2.prev, t.next = u2, u2.prev = t;
  }
  function fu(u2, t, e = true, n = 1 / 0) {
    return nt(u2, Array.isArray(t) ? t : [t], e, n);
  }
  function nt(u2, t, e, n) {
    const i = [], r = [Array.isArray(t) ? t : [t]], a2 = [0];
    for (; ; ) {
      if (a2[0] >= r[0].length) {
        if (a2.length === 1)
          return i;
        r.shift(), a2.shift();
        continue;
      }
      const s = r[0][a2[0]++];
      if (u2(s) && (i.push(s), --n <= 0))
        return i;
      e && N(s) && s.children.length > 0 && (a2.unshift(0), r.unshift(s.children));
    }
  }
  function S0(u2, t) {
    return t.find(u2);
  }
  function it(u2, t, e = true) {
    const n = Array.isArray(t) ? t : [t];
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      if (m(r) && u2(r))
        return r;
      if (e && N(r) && r.children.length > 0) {
        const a2 = it(u2, r.children, true);
        if (a2)
          return a2;
      }
    }
    return null;
  }
  function Kt(u2, t) {
    return (Array.isArray(t) ? t : [t]).some((e) => m(e) && u2(e) || N(e) && Kt(u2, e.children));
  }
  function v0(u2, t) {
    const e = [], n = [Array.isArray(t) ? t : [t]], i = [0];
    for (; ; ) {
      if (i[0] >= n[0].length) {
        if (n.length === 1)
          return e;
        n.shift(), i.shift();
        continue;
      }
      const r = n[0][i[0]++];
      m(r) && u2(r) && e.push(r), N(r) && r.children.length > 0 && (i.unshift(0), n.unshift(r.children));
    }
  }
  const Au = {
    tag_name(u2) {
      return typeof u2 == "function" ? (t) => m(t) && u2(t.name) : u2 === "*" ? m : (t) => m(t) && t.name === u2;
    },
    tag_type(u2) {
      return typeof u2 == "function" ? (t) => u2(t.type) : (t) => t.type === u2;
    },
    tag_contains(u2) {
      return typeof u2 == "function" ? (t) => W(t) && u2(t.data) : (t) => W(t) && t.data === u2;
    }
  };
  function rt(u2, t) {
    return typeof t == "function" ? (e) => m(e) && t(e.attribs[u2]) : (e) => m(e) && e.attribs[u2] === t;
  }
  function w0(u2, t) {
    return (e) => u2(e) || t(e);
  }
  function ue(u2) {
    const t = Object.keys(u2).map((e) => {
      const n = u2[e];
      return Object.prototype.hasOwnProperty.call(Au, e) ? Au[e](n) : rt(e, n);
    });
    return t.length === 0 ? null : t.reduce(w0);
  }
  function E0(u2, t) {
    const e = ue(u2);
    return e ? e(t) : true;
  }
  function N0(u2, t, e, n = 1 / 0) {
    const i = ue(u2);
    return i ? fu(i, t, e, n) : [];
  }
  function T0(u2, t, e = true) {
    return Array.isArray(t) || (t = [t]), it(rt("id", u2), t, e);
  }
  function uu(u2, t, e = true, n = 1 / 0) {
    return fu(Au.tag_name(u2), t, e, n);
  }
  function _0(u2, t, e = true, n = 1 / 0) {
    return fu(rt("class", u2), t, e, n);
  }
  function k0(u2, t, e = true, n = 1 / 0) {
    return fu(Au.tag_type(u2), t, e, n);
  }
  function q0(u2) {
    let t = u2.length;
    for (; --t >= 0; ) {
      const e = u2[t];
      if (t > 0 && u2.lastIndexOf(e, t - 1) >= 0) {
        u2.splice(t, 1);
        continue;
      }
      for (let n = e.parent; n; n = n.parent)
        if (u2.includes(n)) {
          u2.splice(t, 1);
          break;
        }
    }
    return u2;
  }
  var O;
  (function(u2) {
    u2[u2.DISCONNECTED = 1] = "DISCONNECTED", u2[u2.PRECEDING = 2] = "PRECEDING", u2[u2.FOLLOWING = 4] = "FOLLOWING", u2[u2.CONTAINS = 8] = "CONTAINS", u2[u2.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(O || (O = {}));
  function te(u2, t) {
    const e = [], n = [];
    if (u2 === t)
      return 0;
    let i = N(u2) ? u2 : u2.parent;
    for (; i; )
      e.unshift(i), i = i.parent;
    for (i = N(t) ? t : t.parent; i; )
      n.unshift(i), i = i.parent;
    const r = Math.min(e.length, n.length);
    let a2 = 0;
    for (; a2 < r && e[a2] === n[a2]; )
      a2++;
    if (a2 === 0)
      return O.DISCONNECTED;
    const s = e[a2 - 1], c = s.children, o = e[a2], f2 = n[a2];
    return c.indexOf(o) > c.indexOf(f2) ? s === t ? O.FOLLOWING | O.CONTAINED_BY : O.FOLLOWING : s === u2 ? O.PRECEDING | O.CONTAINS : O.PRECEDING;
  }
  function tu(u2) {
    return u2 = u2.filter((t, e, n) => !n.includes(t, e + 1)), u2.sort((t, e) => {
      const n = te(t, e);
      return n & O.PRECEDING ? -1 : n & O.FOLLOWING ? 1 : 0;
    }), u2;
  }
  function I0(u2) {
    const t = Su(M0, u2);
    return t ? t.name === "feed" ? C0(t) : D0(t) : null;
  }
  function C0(u2) {
    var t;
    const e = u2.children, n = {
      type: "atom",
      items: uu("entry", e).map((a2) => {
        var s;
        const { children: c } = a2, o = { media: ee(c) };
        L(o, "id", "id", c), L(o, "title", "title", c);
        const f2 = (s = Su("link", c)) === null || s === void 0 ? void 0 : s.attribs.href;
        f2 && (o.link = f2);
        const h = $("summary", c) || $("content", c);
        h && (o.description = h);
        const b2 = $("updated", c);
        return b2 && (o.pubDate = new Date(b2)), o;
      })
    };
    L(n, "id", "id", e), L(n, "title", "title", e);
    const i = (t = Su("link", e)) === null || t === void 0 ? void 0 : t.attribs.href;
    i && (n.link = i), L(n, "description", "subtitle", e);
    const r = $("updated", e);
    return r && (n.updated = new Date(r)), L(n, "author", "email", e, true), n;
  }
  function D0(u2) {
    var t, e;
    const n = (e = (t = Su("channel", u2.children)) === null || t === void 0 ? void 0 : t.children) !== null && e !== void 0 ? e : [], i = {
      type: u2.name.substr(0, 3),
      id: "",
      items: uu("item", u2.children).map((a2) => {
        const { children: s } = a2, c = { media: ee(s) };
        L(c, "id", "guid", s), L(c, "title", "title", s), L(c, "link", "link", s), L(c, "description", "description", s);
        const o = $("pubDate", s) || $("dc:date", s);
        return o && (c.pubDate = new Date(o)), c;
      })
    };
    L(i, "title", "title", n), L(i, "link", "link", n), L(i, "description", "description", n);
    const r = $("lastBuildDate", n);
    return r && (i.updated = new Date(r)), L(i, "author", "managingEditor", n, true), i;
  }
  const L0 = ["url", "type", "lang"], O0 = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width"
  ];
  function ee(u2) {
    return uu("media:content", u2).map((t) => {
      const { attribs: e } = t, n = {
        medium: e.medium,
        isDefault: !!e.isDefault
      };
      for (const i of L0)
        e[i] && (n[i] = e[i]);
      for (const i of O0)
        e[i] && (n[i] = parseInt(e[i], 10));
      return e.expression && (n.expression = e.expression), n;
    });
  }
  function Su(u2, t) {
    return uu(u2, t, true, 1)[0];
  }
  function $(u2, t, e = false) {
    return K(uu(u2, t, e, 1)).trim();
  }
  function L(u2, t, e, n, i = false) {
    const r = $(e, n, i);
    r && (u2[t] = r);
  }
  function M0(u2) {
    return u2 === "rss" || u2 === "feed" || u2 === "rdf:RDF";
  }
  const Iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get DocumentPosition() {
      return O;
    },
    append: m0,
    appendChild: x0,
    compareDocumentPosition: te,
    existsOne: Kt,
    filter: fu,
    find: nt,
    findAll: v0,
    findOne: it,
    findOneChild: S0,
    getAttributeValue: h0,
    getChildren: qu,
    getElementById: T0,
    getElements: N0,
    getElementsByClassName: _0,
    getElementsByTagName: uu,
    getElementsByTagType: k0,
    getFeed: I0,
    getInnerHTML: l0,
    getName: p0,
    getOuterHTML: Xt,
    getParent: Yt,
    getSiblings: Jt,
    getText: xu,
    hasAttrib: b0,
    hasChildren: N,
    innerText: yu,
    isCDATA: _u,
    isComment: ut,
    isDocument: Q,
    isTag: m,
    isText: W,
    nextElementSibling: tt,
    prepend: A0,
    prependChild: y0,
    prevElementSibling: et,
    removeElement: X,
    removeSubsets: q0,
    replaceElement: g0,
    testElement: E0,
    textContent: K,
    uniqueSort: tu
  }, Symbol.toStringTag, { value: "Module" }));
  function ne(u2, t, e) {
    return u2 ? u2(t ?? u2._root.children, null, void 0, e).toString() : "";
  }
  function P0(u2, t) {
    return typeof u2 == "object" && u2 != null && !("length" in u2) && !("type" in u2);
  }
  function B0(u2, t) {
    const e = P0(u2) ? (t = u2, void 0) : u2, n = {
      ...this === null || this === void 0 ? void 0 : this._options,
      ...$u(t)
    };
    return ne(this, e, n);
  }
  function F0(u2) {
    const t = { ...this._options, xmlMode: true };
    return ne(this, u2, t);
  }
  function su(u2) {
    const t = u2 ?? (this ? this.root() : []);
    let e = "";
    for (let n = 0; n < t.length; n++)
      e += K(t[n]);
    return e;
  }
  function R0(u2, t, e = typeof t == "boolean" ? t : false) {
    if (!u2 || typeof u2 != "string")
      return null;
    typeof t == "boolean" && (e = t);
    const n = this.load(u2, this._options, false);
    return e || n("script").remove(), [...n.root()[0].children];
  }
  function j0() {
    return this(this._root);
  }
  function ie(u2, t) {
    if (t === u2)
      return false;
    let e = t;
    for (; e && e !== e.parent; )
      if (e = e.parent, e === u2)
        return true;
    return false;
  }
  function U0(u2) {
    return this.root().extract(u2);
  }
  function V0(u2, t) {
    if (!St(u2) || !St(t))
      return;
    let e = u2.length;
    const n = +t.length;
    for (let i = 0; i < n; i++)
      u2[e++] = t[i];
    return u2.length = e, u2;
  }
  function St(u2) {
    if (Array.isArray(u2))
      return true;
    if (typeof u2 != "object" || u2 === null || !("length" in u2) || typeof u2.length != "number" || u2.length < 0)
      return false;
    for (let t = 0; t < u2.length; t++)
      if (!(t in u2))
        return false;
    return true;
  }
  const $0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    contains: ie,
    extract: U0,
    html: B0,
    merge: V0,
    parseHTML: R0,
    root: j0,
    text: su,
    xml: F0
  }, Symbol.toStringTag, { value: "Module" }));
  function U(u2) {
    return u2.cheerio != null;
  }
  function H0(u2) {
    return u2.replace(/[._-](\w|$)/g, (t, e) => e.toUpperCase());
  }
  function G0(u2) {
    return u2.replace(/[A-Z]/g, "-$&").toLowerCase();
  }
  function E(u2, t) {
    const e = u2.length;
    for (let n = 0; n < e; n++)
      t(u2[n], n);
    return u2;
  }
  var z;
  (function(u2) {
    u2[u2.LowerA = 97] = "LowerA", u2[u2.LowerZ = 122] = "LowerZ", u2[u2.UpperA = 65] = "UpperA", u2[u2.UpperZ = 90] = "UpperZ", u2[u2.Exclamation = 33] = "Exclamation";
  })(z || (z = {}));
  function zu(u2) {
    const t = u2.indexOf("<");
    if (t < 0 || t > u2.length - 3)
      return false;
    const e = u2.charCodeAt(t + 1);
    return (e >= z.LowerA && e <= z.LowerZ || e >= z.UpperA && e <= z.UpperZ || e === z.Exclamation) && u2.includes(">", t + 2);
  }
  const cu = Object.prototype.hasOwnProperty, ou = /\s+/, Wu = "data-", at = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, z0 = /^{[^]*}$|^\[[^]*]$/;
  function vu(u2, t, e) {
    var n;
    if (!(!u2 || !m(u2))) {
      if ((n = u2.attribs) !== null && n !== void 0 || (u2.attribs = {}), !t)
        return u2.attribs;
      if (cu.call(u2.attribs, t))
        return !e && at.test(t) ? t : u2.attribs[t];
      if (u2.name === "option" && t === "value")
        return su(u2.children);
      if (u2.name === "input" && (u2.attribs.type === "radio" || u2.attribs.type === "checkbox") && t === "value")
        return "on";
    }
  }
  function J(u2, t, e) {
    e === null ? ae(u2, t) : u2.attribs[t] = `${e}`;
  }
  function W0(u2, t) {
    if (typeof u2 == "object" || t !== void 0) {
      if (typeof t == "function") {
        if (typeof u2 != "string")
          throw new Error("Bad combination of arguments.");
        return E(this, (e, n) => {
          m(e) && J(e, u2, t.call(e, n, e.attribs[u2]));
        });
      }
      return E(this, (e) => {
        if (m(e))
          if (typeof u2 == "object")
            for (const n of Object.keys(u2)) {
              const i = u2[n];
              J(e, n, i);
            }
          else
            J(e, u2, t);
      });
    }
    return arguments.length > 1 ? this : vu(this[0], u2, this.options.xmlMode);
  }
  function vt(u2, t, e) {
    return t in u2 ? (
      // @ts-expect-error TS doesn't like us accessing the value directly here.
      u2[t]
    ) : !e && at.test(t) ? vu(u2, t, false) !== void 0 : vu(u2, t, e);
  }
  function Pu(u2, t, e, n) {
    t in u2 ? u2[t] = e : J(u2, t, !n && at.test(t) ? e ? "" : null : `${e}`);
  }
  function Z0(u2, t) {
    var e;
    if (typeof u2 == "string" && t === void 0) {
      const n = this[0];
      if (!n || !m(n))
        return;
      switch (u2) {
        case "style": {
          const i = this.css(), r = Object.keys(i);
          for (let a2 = 0; a2 < r.length; a2++)
            i[a2] = r[a2];
          return i.length = r.length, i;
        }
        case "tagName":
        case "nodeName":
          return n.name.toUpperCase();
        case "href":
        case "src": {
          const i = (e = n.attribs) === null || e === void 0 ? void 0 : e[u2];
          return typeof URL < "u" && (u2 === "href" && (n.tagName === "a" || n.tagName === "link") || u2 === "src" && (n.tagName === "img" || n.tagName === "iframe" || n.tagName === "audio" || n.tagName === "video" || n.tagName === "source")) && i !== void 0 && this.options.baseURI ? new URL(i, this.options.baseURI).href : i;
        }
        case "innerText":
          return yu(n);
        case "textContent":
          return K(n);
        case "outerHTML":
          return this.clone().wrap("<container />").parent().html();
        case "innerHTML":
          return this.html();
        default:
          return vt(n, u2, this.options.xmlMode);
      }
    }
    if (typeof u2 == "object" || t !== void 0) {
      if (typeof t == "function") {
        if (typeof u2 == "object")
          throw new TypeError("Bad combination of arguments.");
        return E(this, (n, i) => {
          m(n) && Pu(n, u2, t.call(n, i, vt(n, u2, this.options.xmlMode)), this.options.xmlMode);
        });
      }
      return E(this, (n) => {
        if (m(n))
          if (typeof u2 == "object")
            for (const i of Object.keys(u2)) {
              const r = u2[i];
              Pu(n, i, r, this.options.xmlMode);
            }
          else
            Pu(n, u2, t, this.options.xmlMode);
      });
    }
  }
  function wt(u2, t, e) {
    var n;
    (n = u2.data) !== null && n !== void 0 || (u2.data = {}), typeof t == "object" ? Object.assign(u2.data, t) : typeof t == "string" && e !== void 0 && (u2.data[t] = e);
  }
  function Q0(u2) {
    for (const t of Object.keys(u2.attribs)) {
      if (!t.startsWith(Wu))
        continue;
      const e = H0(t.slice(Wu.length));
      cu.call(u2.data, e) || (u2.data[e] = re(u2.attribs[t]));
    }
    return u2.data;
  }
  function X0(u2, t) {
    const e = Wu + G0(t), n = u2.data;
    if (cu.call(n, t))
      return n[t];
    if (cu.call(u2.attribs, e))
      return n[t] = re(u2.attribs[e]);
  }
  function re(u2) {
    if (u2 === "null")
      return null;
    if (u2 === "true")
      return true;
    if (u2 === "false")
      return false;
    const t = Number(u2);
    if (u2 === String(t))
      return t;
    if (z0.test(u2))
      try {
        return JSON.parse(u2);
      } catch {
      }
    return u2;
  }
  function Y0(u2, t) {
    var e;
    const n = this[0];
    if (!n || !m(n))
      return;
    const i = n;
    return (e = i.data) !== null && e !== void 0 || (i.data = {}), u2 == null ? Q0(i) : typeof u2 == "object" || t !== void 0 ? (E(this, (r) => {
      m(r) && (typeof u2 == "object" ? wt(r, u2) : wt(r, u2, t));
    }), this) : X0(i, u2);
  }
  function J0(u2) {
    const t = arguments.length === 0, e = this[0];
    if (!e || !m(e))
      return t ? void 0 : this;
    switch (e.name) {
      case "textarea":
        return this.text(u2);
      case "select": {
        const n = this.find("option:selected");
        if (!t) {
          if (this.attr("multiple") == null && typeof u2 == "object")
            return this;
          this.find("option").removeAttr("selected");
          const i = typeof u2 == "object" ? u2 : [u2];
          for (const r of i)
            this.find(`option[value="${r}"]`).attr("selected", "");
          return this;
        }
        return this.attr("multiple") ? n.toArray().map((i) => su(i.children)) : n.attr("value");
      }
      case "input":
      case "option":
        return t ? this.attr("value") : this.attr("value", u2);
    }
  }
  function ae(u2, t) {
    !u2.attribs || !cu.call(u2.attribs, t) || delete u2.attribs[t];
  }
  function wu(u2) {
    return u2 ? u2.trim().split(ou) : [];
  }
  function K0(u2) {
    const t = wu(u2);
    for (const e of t)
      E(this, (n) => {
        m(n) && ae(n, e);
      });
    return this;
  }
  function un(u2) {
    return this.toArray().some((t) => {
      const e = m(t) && t.attribs.class;
      let n = -1;
      if (e && u2.length > 0)
        for (; (n = e.indexOf(u2, n + 1)) > -1; ) {
          const i = n + u2.length;
          if ((n === 0 || ou.test(e[n - 1])) && (i === e.length || ou.test(e[i])))
            return true;
        }
      return false;
    });
  }
  function se(u2) {
    if (typeof u2 == "function")
      return E(this, (n, i) => {
        if (m(n)) {
          const r = n.attribs.class || "";
          se.call([n], u2.call(n, i, r));
        }
      });
    if (!u2 || typeof u2 != "string")
      return this;
    const t = u2.split(ou), e = this.length;
    for (let n = 0; n < e; n++) {
      const i = this[n];
      if (!m(i))
        continue;
      const r = vu(i, "class", false);
      if (r) {
        let a2 = ` ${r} `;
        for (const s of t) {
          const c = `${s} `;
          a2.includes(` ${c}`) || (a2 += c);
        }
        J(i, "class", a2.trim());
      } else
        J(i, "class", t.join(" ").trim());
    }
    return this;
  }
  function ce(u2) {
    if (typeof u2 == "function")
      return E(this, (i, r) => {
        m(i) && ce.call([i], u2.call(i, r, i.attribs.class || ""));
      });
    const t = wu(u2), e = t.length, n = arguments.length === 0;
    return E(this, (i) => {
      if (m(i))
        if (n)
          i.attribs.class = "";
        else {
          const r = wu(i.attribs.class);
          let a2 = false;
          for (let s = 0; s < e; s++) {
            const c = r.indexOf(t[s]);
            c >= 0 && (r.splice(c, 1), a2 = true, s--);
          }
          a2 && (i.attribs.class = r.join(" "));
        }
    });
  }
  function oe(u2, t) {
    if (typeof u2 == "function")
      return E(this, (a2, s) => {
        m(a2) && oe.call([a2], u2.call(a2, s, a2.attribs.class || "", t), t);
      });
    if (!u2 || typeof u2 != "string")
      return this;
    const e = u2.split(ou), n = e.length, i = typeof t == "boolean" ? t ? 1 : -1 : 0, r = this.length;
    for (let a2 = 0; a2 < r; a2++) {
      const s = this[a2];
      if (!m(s))
        continue;
      const c = wu(s.attribs.class);
      for (let o = 0; o < n; o++) {
        const f2 = c.indexOf(e[o]);
        i >= 0 && f2 < 0 ? c.push(e[o]) : i <= 0 && f2 >= 0 && c.splice(f2, 1);
      }
      s.attribs.class = c.join(" ");
    }
    return this;
  }
  const tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    addClass: se,
    attr: W0,
    data: Y0,
    hasClass: un,
    prop: Z0,
    removeAttr: K0,
    removeClass: ce,
    toggleClass: oe,
    val: J0
  }, Symbol.toStringTag, { value: "Module" }));
  var g;
  (function(u2) {
    u2.Attribute = "attribute", u2.Pseudo = "pseudo", u2.PseudoElement = "pseudo-element", u2.Tag = "tag", u2.Universal = "universal", u2.Adjacent = "adjacent", u2.Child = "child", u2.Descendant = "descendant", u2.Parent = "parent", u2.Sibling = "sibling", u2.ColumnCombinator = "column-combinator";
  })(g || (g = {}));
  var _;
  (function(u2) {
    u2.Any = "any", u2.Element = "element", u2.End = "end", u2.Equals = "equals", u2.Exists = "exists", u2.Hyphen = "hyphen", u2.Not = "not", u2.Start = "start";
  })(_ || (_ = {}));
  const Et = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, en = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, nn = /* @__PURE__ */ new Map([
    [126, _.Element],
    [94, _.Start],
    [36, _.End],
    [42, _.Any],
    [33, _.Not],
    [124, _.Hyphen]
  ]), rn = /* @__PURE__ */ new Set([
    "has",
    "not",
    "matches",
    "is",
    "where",
    "host",
    "host-context"
  ]);
  function iu(u2) {
    switch (u2.type) {
      case g.Adjacent:
      case g.Child:
      case g.Descendant:
      case g.Parent:
      case g.Sibling:
      case g.ColumnCombinator:
        return true;
      default:
        return false;
    }
  }
  const an = /* @__PURE__ */ new Set(["contains", "icontains"]);
  function sn(u2, t, e) {
    const n = parseInt(t, 16) - 65536;
    return n !== n || e ? t : n < 0 ? (
      // BMP codepoint
      String.fromCharCode(n + 65536)
    ) : (
      // Supplemental Plane codepoint (surrogate pair)
      String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
    );
  }
  function nu(u2) {
    return u2.replace(en, sn);
  }
  function Bu(u2) {
    return u2 === 39 || u2 === 34;
  }
  function Nt(u2) {
    return u2 === 32 || u2 === 9 || u2 === 10 || u2 === 12 || u2 === 13;
  }
  function Cu(u2) {
    const t = [], e = fe(t, `${u2}`, 0);
    if (e < u2.length)
      throw new Error(`Unmatched selector: ${u2.slice(e)}`);
    return t;
  }
  function fe(u2, t, e) {
    let n = [];
    function i(b2) {
      const p = t.slice(e + b2).match(Et);
      if (!p)
        throw new Error(`Expected name, found ${t.slice(e)}`);
      const [l] = p;
      return e += b2 + l.length, nu(l);
    }
    function r(b2) {
      for (e += b2; e < t.length && Nt(t.charCodeAt(e)); )
        e++;
    }
    function a2() {
      e += 1;
      const b2 = e;
      let p = 1;
      for (; p > 0 && e < t.length; e++)
        t.charCodeAt(e) === 40 && !s(e) ? p++ : t.charCodeAt(e) === 41 && !s(e) && p--;
      if (p)
        throw new Error("Parenthesis not matched");
      return nu(t.slice(b2, e - 1));
    }
    function s(b2) {
      let p = 0;
      for (; t.charCodeAt(--b2) === 92; )
        p++;
      return (p & 1) === 1;
    }
    function c() {
      if (n.length > 0 && iu(n[n.length - 1]))
        throw new Error("Did not expect successive traversals.");
    }
    function o(b2) {
      if (n.length > 0 && n[n.length - 1].type === g.Descendant) {
        n[n.length - 1].type = b2;
        return;
      }
      c(), n.push({ type: b2 });
    }
    function f2(b2, p) {
      n.push({
        type: g.Attribute,
        name: b2,
        action: p,
        value: i(1),
        namespace: null,
        ignoreCase: "quirks"
      });
    }
    function h() {
      if (n.length && n[n.length - 1].type === g.Descendant && n.pop(), n.length === 0)
        throw new Error("Empty sub-selector");
      u2.push(n);
    }
    if (r(0), t.length === e)
      return e;
    u: for (; e < t.length; ) {
      const b2 = t.charCodeAt(e);
      switch (b2) {
        // Whitespace
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (n.length === 0 || n[0].type !== g.Descendant) && (c(), n.push({ type: g.Descendant })), r(1);
          break;
        }
        // Traversals
        case 62: {
          o(g.Child), r(1);
          break;
        }
        case 60: {
          o(g.Parent), r(1);
          break;
        }
        case 126: {
          o(g.Sibling), r(1);
          break;
        }
        case 43: {
          o(g.Adjacent), r(1);
          break;
        }
        // Special attribute selectors: .class, #id
        case 46: {
          f2("class", _.Element);
          break;
        }
        case 35: {
          f2("id", _.Equals);
          break;
        }
        case 91: {
          r(1);
          let p, l = null;
          t.charCodeAt(e) === 124 ? p = i(1) : t.startsWith("*|", e) ? (l = "*", p = i(2)) : (p = i(0), t.charCodeAt(e) === 124 && t.charCodeAt(e + 1) !== 61 && (l = p, p = i(1))), r(0);
          let y = _.Exists;
          const w2 = nn.get(t.charCodeAt(e));
          if (w2) {
            if (y = w2, t.charCodeAt(e + 1) !== 61)
              throw new Error("Expected `=`");
            r(2);
          } else t.charCodeAt(e) === 61 && (y = _.Equals, r(1));
          let T2 = "", I = null;
          if (y !== "exists") {
            if (Bu(t.charCodeAt(e))) {
              const M2 = t.charCodeAt(e);
              let P2 = e + 1;
              for (; P2 < t.length && (t.charCodeAt(P2) !== M2 || s(P2)); )
                P2 += 1;
              if (t.charCodeAt(P2) !== M2)
                throw new Error("Attribute value didn't end");
              T2 = nu(t.slice(e + 1, P2)), e = P2 + 1;
            } else {
              const M2 = e;
              for (; e < t.length && (!Nt(t.charCodeAt(e)) && t.charCodeAt(e) !== 93 || s(e)); )
                e += 1;
              T2 = nu(t.slice(M2, e));
            }
            r(0);
            const C2 = t.charCodeAt(e) | 32;
            C2 === 115 ? (I = false, r(1)) : C2 === 105 && (I = true, r(1));
          }
          if (t.charCodeAt(e) !== 93)
            throw new Error("Attribute selector didn't terminate");
          e += 1;
          const R2 = {
            type: g.Attribute,
            name: p,
            action: y,
            value: T2,
            namespace: l,
            ignoreCase: I
          };
          n.push(R2);
          break;
        }
        case 58: {
          if (t.charCodeAt(e + 1) === 58) {
            n.push({
              type: g.PseudoElement,
              name: i(2).toLowerCase(),
              data: t.charCodeAt(e) === 40 ? a2() : null
            });
            continue;
          }
          const p = i(1).toLowerCase();
          let l = null;
          if (t.charCodeAt(e) === 40)
            if (rn.has(p)) {
              if (Bu(t.charCodeAt(e + 1)))
                throw new Error(`Pseudo-selector ${p} cannot be quoted`);
              if (l = [], e = fe(l, t, e + 1), t.charCodeAt(e) !== 41)
                throw new Error(`Missing closing parenthesis in :${p} (${t})`);
              e += 1;
            } else {
              if (l = a2(), an.has(p)) {
                const y = l.charCodeAt(0);
                y === l.charCodeAt(l.length - 1) && Bu(y) && (l = l.slice(1, -1));
              }
              l = nu(l);
            }
          n.push({ type: g.Pseudo, name: p, data: l });
          break;
        }
        case 44: {
          h(), n = [], r(1);
          break;
        }
        default: {
          if (t.startsWith("/*", e)) {
            const y = t.indexOf("*/", e + 2);
            if (y < 0)
              throw new Error("Comment was not terminated");
            e = y + 2, n.length === 0 && r(0);
            break;
          }
          let p = null, l;
          if (b2 === 42)
            e += 1, l = "*";
          else if (b2 === 124) {
            if (l = "", t.charCodeAt(e + 1) === 124) {
              o(g.ColumnCombinator), r(2);
              break;
            }
          } else if (Et.test(t.slice(e)))
            l = i(0);
          else
            break u;
          t.charCodeAt(e) === 124 && t.charCodeAt(e + 1) !== 124 && (p = l, t.charCodeAt(e + 1) === 42 ? (l = "*", e += 2) : l = i(1)), n.push(l === "*" ? { type: g.Universal, namespace: p } : { type: g.Tag, name: l, namespace: p });
        }
      }
    }
    return h(), e;
  }
  function cn(u2) {
    return u2 && u2.__esModule && Object.prototype.hasOwnProperty.call(u2, "default") ? u2.default : u2;
  }
  var Fu, Tt;
  function on() {
    return Tt || (Tt = 1, Fu = {
      trueFunc: function() {
        return true;
      },
      falseFunc: function() {
        return false;
      }
    }), Fu;
  }
  var Eu = on();
  const A = /* @__PURE__ */ cn(Eu), de = /* @__PURE__ */ new Map([
    [g.Universal, 50],
    [g.Tag, 30],
    [g.Attribute, 1],
    [g.Pseudo, 0]
  ]);
  function st(u2) {
    return !de.has(u2.type);
  }
  const fn = /* @__PURE__ */ new Map([
    [_.Exists, 10],
    [_.Equals, 8],
    [_.Not, 7],
    [_.Start, 6],
    [_.End, 6],
    [_.Any, 5]
  ]);
  function dn(u2) {
    const t = u2.map(le);
    for (let e = 1; e < u2.length; e++) {
      const n = t[e];
      if (!(n < 0))
        for (let i = e - 1; i >= 0 && n < t[i]; i--) {
          const r = u2[i + 1];
          u2[i + 1] = u2[i], u2[i] = r, t[i + 1] = t[i], t[i] = n;
        }
    }
  }
  function le(u2) {
    var t, e;
    let n = (t = de.get(u2.type)) !== null && t !== void 0 ? t : -1;
    return u2.type === g.Attribute ? (n = (e = fn.get(u2.action)) !== null && e !== void 0 ? e : 4, u2.action === _.Equals && u2.name === "id" && (n = 9), u2.ignoreCase && (n >>= 1)) : u2.type === g.Pseudo && (u2.data ? u2.name === "has" || u2.name === "contains" ? n = 0 : Array.isArray(u2.data) ? (n = Math.min(...u2.data.map((i) => Math.min(...i.map(le)))), n < 0 && (n = 0)) : n = 2 : n = 3), n;
  }
  const ln = /[-[\]{}()*+?.,\\^$|#\s]/g;
  function _t(u2) {
    return u2.replace(ln, "\\$&");
  }
  const hn = /* @__PURE__ */ new Set([
    "accept",
    "accept-charset",
    "align",
    "alink",
    "axis",
    "bgcolor",
    "charset",
    "checked",
    "clear",
    "codetype",
    "color",
    "compact",
    "declare",
    "defer",
    "dir",
    "direction",
    "disabled",
    "enctype",
    "face",
    "frame",
    "hreflang",
    "http-equiv",
    "lang",
    "language",
    "link",
    "media",
    "method",
    "multiple",
    "nohref",
    "noresize",
    "noshade",
    "nowrap",
    "readonly",
    "rel",
    "rev",
    "rules",
    "scope",
    "scrolling",
    "selected",
    "shape",
    "target",
    "text",
    "type",
    "valign",
    "valuetype",
    "vlink"
  ]);
  function G(u2, t) {
    return typeof u2.ignoreCase == "boolean" ? u2.ignoreCase : u2.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && hn.has(u2.name);
  }
  const bn = {
    equals(u2, t, e) {
      const { adapter: n } = e, { name: i } = t;
      let { value: r } = t;
      return G(t, e) ? (r = r.toLowerCase(), (a2) => {
        const s = n.getAttributeValue(a2, i);
        return s != null && s.length === r.length && s.toLowerCase() === r && u2(a2);
      }) : (a2) => n.getAttributeValue(a2, i) === r && u2(a2);
    },
    hyphen(u2, t, e) {
      const { adapter: n } = e, { name: i } = t;
      let { value: r } = t;
      const a2 = r.length;
      return G(t, e) ? (r = r.toLowerCase(), function(c) {
        const o = n.getAttributeValue(c, i);
        return o != null && (o.length === a2 || o.charAt(a2) === "-") && o.substr(0, a2).toLowerCase() === r && u2(c);
      }) : function(c) {
        const o = n.getAttributeValue(c, i);
        return o != null && (o.length === a2 || o.charAt(a2) === "-") && o.substr(0, a2) === r && u2(c);
      };
    },
    element(u2, t, e) {
      const { adapter: n } = e, { name: i, value: r } = t;
      if (/\s/.test(r))
        return A.falseFunc;
      const a2 = new RegExp(`(?:^|\\s)${_t(r)}(?:$|\\s)`, G(t, e) ? "i" : "");
      return function(c) {
        const o = n.getAttributeValue(c, i);
        return o != null && o.length >= r.length && a2.test(o) && u2(c);
      };
    },
    exists(u2, { name: t }, { adapter: e }) {
      return (n) => e.hasAttrib(n, t) && u2(n);
    },
    start(u2, t, e) {
      const { adapter: n } = e, { name: i } = t;
      let { value: r } = t;
      const a2 = r.length;
      return a2 === 0 ? A.falseFunc : G(t, e) ? (r = r.toLowerCase(), (s) => {
        const c = n.getAttributeValue(s, i);
        return c != null && c.length >= a2 && c.substr(0, a2).toLowerCase() === r && u2(s);
      }) : (s) => {
        var c;
        return !!(!((c = n.getAttributeValue(s, i)) === null || c === void 0) && c.startsWith(r)) && u2(s);
      };
    },
    end(u2, t, e) {
      const { adapter: n } = e, { name: i } = t;
      let { value: r } = t;
      const a2 = -r.length;
      return a2 === 0 ? A.falseFunc : G(t, e) ? (r = r.toLowerCase(), (s) => {
        var c;
        return ((c = n.getAttributeValue(s, i)) === null || c === void 0 ? void 0 : c.substr(a2).toLowerCase()) === r && u2(s);
      }) : (s) => {
        var c;
        return !!(!((c = n.getAttributeValue(s, i)) === null || c === void 0) && c.endsWith(r)) && u2(s);
      };
    },
    any(u2, t, e) {
      const { adapter: n } = e, { name: i, value: r } = t;
      if (r === "")
        return A.falseFunc;
      if (G(t, e)) {
        const a2 = new RegExp(_t(r), "i");
        return function(c) {
          const o = n.getAttributeValue(c, i);
          return o != null && o.length >= r.length && a2.test(o) && u2(c);
        };
      }
      return (a2) => {
        var s;
        return !!(!((s = n.getAttributeValue(a2, i)) === null || s === void 0) && s.includes(r)) && u2(a2);
      };
    },
    not(u2, t, e) {
      const { adapter: n } = e, { name: i } = t;
      let { value: r } = t;
      return r === "" ? (a2) => !!n.getAttributeValue(a2, i) && u2(a2) : G(t, e) ? (r = r.toLowerCase(), (a2) => {
        const s = n.getAttributeValue(a2, i);
        return (s == null || s.length !== r.length || s.toLowerCase() !== r) && u2(a2);
      }) : (a2) => n.getAttributeValue(a2, i) !== r && u2(a2);
    }
  }, pn = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), kt = 48, gn = 57;
  function xn(u2) {
    if (u2 = u2.trim().toLowerCase(), u2 === "even")
      return [2, 0];
    if (u2 === "odd")
      return [2, 1];
    let t = 0, e = 0, n = r(), i = a2();
    if (t < u2.length && u2.charAt(t) === "n" && (t++, e = n * (i ?? 1), s(), t < u2.length ? (n = r(), s(), i = a2()) : n = i = 0), i === null || t < u2.length)
      throw new Error(`n-th rule couldn't be parsed ('${u2}')`);
    return [e, n * i];
    function r() {
      return u2.charAt(t) === "-" ? (t++, -1) : (u2.charAt(t) === "+" && t++, 1);
    }
    function a2() {
      const c = t;
      let o = 0;
      for (; t < u2.length && u2.charCodeAt(t) >= kt && u2.charCodeAt(t) <= gn; )
        o = o * 10 + (u2.charCodeAt(t) - kt), t++;
      return t === c ? null : o;
    }
    function s() {
      for (; t < u2.length && pn.has(u2.charCodeAt(t)); )
        t++;
    }
  }
  function mn(u2) {
    const t = u2[0], e = u2[1] - 1;
    if (e < 0 && t <= 0)
      return A.falseFunc;
    if (t === -1)
      return (r) => r <= e;
    if (t === 0)
      return (r) => r === e;
    if (t === 1)
      return e < 0 ? A.trueFunc : (r) => r >= e;
    const n = Math.abs(t), i = (e % n + n) % n;
    return t > 1 ? (r) => r >= e && r % n === i : (r) => r <= e && r % n === i;
  }
  function bu(u2) {
    return mn(xn(u2));
  }
  function pu(u2, t) {
    return (e) => {
      const n = t.getParent(e);
      return n != null && t.isTag(n) && u2(e);
    };
  }
  const Zu = {
    contains(u2, t, { adapter: e }) {
      return function(i) {
        return u2(i) && e.getText(i).includes(t);
      };
    },
    icontains(u2, t, { adapter: e }) {
      const n = t.toLowerCase();
      return function(r) {
        return u2(r) && e.getText(r).toLowerCase().includes(n);
      };
    },
    // Location specific methods
    "nth-child"(u2, t, { adapter: e, equals: n }) {
      const i = bu(t);
      return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u2, e) : function(a2) {
        const s = e.getSiblings(a2);
        let c = 0;
        for (let o = 0; o < s.length && !n(a2, s[o]); o++)
          e.isTag(s[o]) && c++;
        return i(c) && u2(a2);
      };
    },
    "nth-last-child"(u2, t, { adapter: e, equals: n }) {
      const i = bu(t);
      return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u2, e) : function(a2) {
        const s = e.getSiblings(a2);
        let c = 0;
        for (let o = s.length - 1; o >= 0 && !n(a2, s[o]); o--)
          e.isTag(s[o]) && c++;
        return i(c) && u2(a2);
      };
    },
    "nth-of-type"(u2, t, { adapter: e, equals: n }) {
      const i = bu(t);
      return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u2, e) : function(a2) {
        const s = e.getSiblings(a2);
        let c = 0;
        for (let o = 0; o < s.length; o++) {
          const f2 = s[o];
          if (n(a2, f2))
            break;
          e.isTag(f2) && e.getName(f2) === e.getName(a2) && c++;
        }
        return i(c) && u2(a2);
      };
    },
    "nth-last-of-type"(u2, t, { adapter: e, equals: n }) {
      const i = bu(t);
      return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u2, e) : function(a2) {
        const s = e.getSiblings(a2);
        let c = 0;
        for (let o = s.length - 1; o >= 0; o--) {
          const f2 = s[o];
          if (n(a2, f2))
            break;
          e.isTag(f2) && e.getName(f2) === e.getName(a2) && c++;
        }
        return i(c) && u2(a2);
      };
    },
    // TODO determine the actual root element
    root(u2, t, { adapter: e }) {
      return (n) => {
        const i = e.getParent(n);
        return (i == null || !e.isTag(i)) && u2(n);
      };
    },
    scope(u2, t, e, n) {
      const { equals: i } = e;
      return !n || n.length === 0 ? Zu.root(u2, t, e) : n.length === 1 ? (r) => i(n[0], r) && u2(r) : (r) => n.includes(r) && u2(r);
    },
    hover: Ru("isHovered"),
    visited: Ru("isVisited"),
    active: Ru("isActive")
  };
  function Ru(u2) {
    return function(e, n, { adapter: i }) {
      const r = i[u2];
      return typeof r != "function" ? A.falseFunc : function(s) {
        return r(s) && e(s);
      };
    };
  }
  const qt = {
    empty(u2, { adapter: t }) {
      return !t.getChildren(u2).some((e) => (
        // FIXME: `getText` call is potentially expensive.
        t.isTag(e) || t.getText(e) !== ""
      ));
    },
    "first-child"(u2, { adapter: t, equals: e }) {
      if (t.prevElementSibling)
        return t.prevElementSibling(u2) == null;
      const n = t.getSiblings(u2).find((i) => t.isTag(i));
      return n != null && e(u2, n);
    },
    "last-child"(u2, { adapter: t, equals: e }) {
      const n = t.getSiblings(u2);
      for (let i = n.length - 1; i >= 0; i--) {
        if (e(u2, n[i]))
          return true;
        if (t.isTag(n[i]))
          break;
      }
      return false;
    },
    "first-of-type"(u2, { adapter: t, equals: e }) {
      const n = t.getSiblings(u2), i = t.getName(u2);
      for (let r = 0; r < n.length; r++) {
        const a2 = n[r];
        if (e(u2, a2))
          return true;
        if (t.isTag(a2) && t.getName(a2) === i)
          break;
      }
      return false;
    },
    "last-of-type"(u2, { adapter: t, equals: e }) {
      const n = t.getSiblings(u2), i = t.getName(u2);
      for (let r = n.length - 1; r >= 0; r--) {
        const a2 = n[r];
        if (e(u2, a2))
          return true;
        if (t.isTag(a2) && t.getName(a2) === i)
          break;
      }
      return false;
    },
    "only-of-type"(u2, { adapter: t, equals: e }) {
      const n = t.getName(u2);
      return t.getSiblings(u2).every((i) => e(u2, i) || !t.isTag(i) || t.getName(i) !== n);
    },
    "only-child"(u2, { adapter: t, equals: e }) {
      return t.getSiblings(u2).every((n) => e(u2, n) || !t.isTag(n));
    }
  };
  function It(u2, t, e, n) {
    if (e === null) {
      if (u2.length > n)
        throw new Error(`Pseudo-class :${t} requires an argument`);
    } else if (u2.length === n)
      throw new Error(`Pseudo-class :${t} doesn't have any arguments`);
  }
  const yn = {
    // Links
    "any-link": ":is(a, area, link)[href]",
    link: ":any-link:not(:visited)",
    // Forms
    // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
    disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
    enabled: ":not(:disabled)",
    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
    required: ":is(input, select, textarea)[required]",
    optional: ":is(input, select, textarea):not([required])",
    // JQuery extensions
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
    checkbox: "[type=checkbox]",
    file: "[type=file]",
    password: "[type=password]",
    radio: "[type=radio]",
    reset: "[type=reset]",
    image: "[type=image]",
    submit: "[type=submit]",
    parent: ":not(:empty)",
    header: ":is(h1, h2, h3, h4, h5, h6)",
    button: ":is(button, input[type=button])",
    input: ":is(input, textarea, select, button)",
    text: "input:is(:not([type!='']), [type=text])"
  }, he = {};
  function An(u2, t) {
    return u2 === A.falseFunc ? A.falseFunc : (e) => t.isTag(e) && u2(e);
  }
  function be(u2, t) {
    const e = t.getSiblings(u2);
    if (e.length <= 1)
      return [];
    const n = e.indexOf(u2);
    return n < 0 || n === e.length - 1 ? [] : e.slice(n + 1).filter(t.isTag);
  }
  function Qu(u2) {
    return {
      xmlMode: !!u2.xmlMode,
      lowerCaseAttributeNames: !!u2.lowerCaseAttributeNames,
      lowerCaseTags: !!u2.lowerCaseTags,
      quirksMode: !!u2.quirksMode,
      cacheResults: !!u2.cacheResults,
      pseudos: u2.pseudos,
      adapter: u2.adapter,
      equals: u2.equals
    };
  }
  const ju = (u2, t, e, n, i) => {
    const r = i(t, Qu(e), n);
    return r === A.trueFunc ? u2 : r === A.falseFunc ? A.falseFunc : (a2) => r(a2) && u2(a2);
  }, Uu = {
    is: ju,
    /**
     * `:matches` and `:where` are aliases for `:is`.
     */
    matches: ju,
    where: ju,
    not(u2, t, e, n, i) {
      const r = i(t, Qu(e), n);
      return r === A.falseFunc ? u2 : r === A.trueFunc ? A.falseFunc : (a2) => !r(a2) && u2(a2);
    },
    has(u2, t, e, n, i) {
      const { adapter: r } = e, a2 = Qu(e);
      a2.relativeSelector = true;
      const s = t.some((f2) => f2.some(st)) ? (
        // Used as a placeholder. Will be replaced with the actual element.
        [he]
      ) : void 0, c = i(t, a2, s);
      if (c === A.falseFunc)
        return A.falseFunc;
      const o = An(c, r);
      if (s && c !== A.trueFunc) {
        const { shouldTestNextSiblings: f2 = false } = c;
        return (h) => {
          if (!u2(h))
            return false;
          s[0] = h;
          const b2 = r.getChildren(h), p = f2 ? [...b2, ...be(h, r)] : b2;
          return r.existsOne(o, p);
        };
      }
      return (f2) => u2(f2) && r.existsOne(o, r.getChildren(f2));
    }
  };
  function Sn(u2, t, e, n, i) {
    var r;
    const { name: a2, data: s } = t;
    if (Array.isArray(s)) {
      if (!(a2 in Uu))
        throw new Error(`Unknown pseudo-class :${a2}(${s})`);
      return Uu[a2](u2, s, e, n, i);
    }
    const c = (r = e.pseudos) === null || r === void 0 ? void 0 : r[a2], o = typeof c == "string" ? c : yn[a2];
    if (typeof o == "string") {
      if (s != null)
        throw new Error(`Pseudo ${a2} doesn't have any arguments`);
      const f2 = Cu(o);
      return Uu.is(u2, f2, e, n, i);
    }
    if (typeof c == "function")
      return It(c, a2, s, 1), (f2) => c(f2, s) && u2(f2);
    if (a2 in Zu)
      return Zu[a2](u2, s, e, n);
    if (a2 in qt) {
      const f2 = qt[a2];
      return It(f2, a2, s, 2), (h) => f2(h, e, s) && u2(h);
    }
    throw new Error(`Unknown pseudo-class :${a2}`);
  }
  function Vu(u2, t) {
    const e = t.getParent(u2);
    return e && t.isTag(e) ? e : null;
  }
  function vn(u2, t, e, n, i) {
    const { adapter: r, equals: a2 } = e;
    switch (t.type) {
      case g.PseudoElement:
        throw new Error("Pseudo-elements are not supported by css-select");
      case g.ColumnCombinator:
        throw new Error("Column combinators are not yet supported by css-select");
      case g.Attribute: {
        if (t.namespace != null)
          throw new Error("Namespaced attributes are not yet supported by css-select");
        return (!e.xmlMode || e.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), bn[t.action](u2, t, e);
      }
      case g.Pseudo:
        return Sn(u2, t, e, n, i);
      // Tags
      case g.Tag: {
        if (t.namespace != null)
          throw new Error("Namespaced tag names are not yet supported by css-select");
        let { name: s } = t;
        return (!e.xmlMode || e.lowerCaseTags) && (s = s.toLowerCase()), function(o) {
          return r.getName(o) === s && u2(o);
        };
      }
      // Traversal
      case g.Descendant: {
        if (e.cacheResults === false || typeof WeakSet > "u")
          return function(o) {
            let f2 = o;
            for (; f2 = Vu(f2, r); )
              if (u2(f2))
                return true;
            return false;
          };
        const s = /* @__PURE__ */ new WeakSet();
        return function(o) {
          let f2 = o;
          for (; f2 = Vu(f2, r); )
            if (!s.has(f2)) {
              if (r.isTag(f2) && u2(f2))
                return true;
              s.add(f2);
            }
          return false;
        };
      }
      case "_flexibleDescendant":
        return function(c) {
          let o = c;
          do
            if (u2(o))
              return true;
          while (o = Vu(o, r));
          return false;
        };
      case g.Parent:
        return function(c) {
          return r.getChildren(c).some((o) => r.isTag(o) && u2(o));
        };
      case g.Child:
        return function(c) {
          const o = r.getParent(c);
          return o != null && r.isTag(o) && u2(o);
        };
      case g.Sibling:
        return function(c) {
          const o = r.getSiblings(c);
          for (let f2 = 0; f2 < o.length; f2++) {
            const h = o[f2];
            if (a2(c, h))
              break;
            if (r.isTag(h) && u2(h))
              return true;
          }
          return false;
        };
      case g.Adjacent:
        return r.prevElementSibling ? function(c) {
          const o = r.prevElementSibling(c);
          return o != null && u2(o);
        } : function(c) {
          const o = r.getSiblings(c);
          let f2;
          for (let h = 0; h < o.length; h++) {
            const b2 = o[h];
            if (a2(c, b2))
              break;
            r.isTag(b2) && (f2 = b2);
          }
          return !!f2 && u2(f2);
        };
      case g.Universal: {
        if (t.namespace != null && t.namespace !== "*")
          throw new Error("Namespaced universal selectors are not yet supported by css-select");
        return u2;
      }
    }
  }
  function pe(u2) {
    return u2.type === g.Pseudo && (u2.name === "scope" || Array.isArray(u2.data) && u2.data.some((t) => t.some(pe)));
  }
  const wn = { type: g.Descendant }, En = {
    type: "_flexibleDescendant"
  }, Nn = {
    type: g.Pseudo,
    name: "scope",
    data: null
  };
  function Tn(u2, { adapter: t }, e) {
    const n = !!(e != null && e.every((i) => {
      const r = t.isTag(i) && t.getParent(i);
      return i === he || r && t.isTag(r);
    }));
    for (const i of u2) {
      if (!(i.length > 0 && st(i[0]) && i[0].type !== g.Descendant)) if (n && !i.some(pe))
        i.unshift(wn);
      else
        continue;
      i.unshift(Nn);
    }
  }
  function ge(u2, t, e) {
    var n;
    u2.forEach(dn), e = (n = t.context) !== null && n !== void 0 ? n : e;
    const i = Array.isArray(e), r = e && (Array.isArray(e) ? e : [e]);
    if (t.relativeSelector !== false)
      Tn(u2, t, r);
    else if (u2.some((c) => c.length > 0 && st(c[0])))
      throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
    let a2 = false;
    const s = u2.map((c) => {
      if (c.length >= 2) {
        const [o, f2] = c;
        o.type !== g.Pseudo || o.name !== "scope" || (i && f2.type === g.Descendant ? c[1] = En : (f2.type === g.Adjacent || f2.type === g.Sibling) && (a2 = true));
      }
      return _n(c, t, r);
    }).reduce(kn, A.falseFunc);
    return s.shouldTestNextSiblings = a2, s;
  }
  function _n(u2, t, e) {
    var n;
    return u2.reduce((i, r) => i === A.falseFunc ? A.falseFunc : vn(i, r, t, e, ge), (n = t.rootFunc) !== null && n !== void 0 ? n : A.trueFunc);
  }
  function kn(u2, t) {
    return t === A.falseFunc || u2 === A.trueFunc ? u2 : u2 === A.falseFunc || t === A.trueFunc ? t : function(n) {
      return u2(n) || t(n);
    };
  }
  const xe = (u2, t) => u2 === t, qn = {
    adapter: Iu,
    equals: xe
  };
  function In(u2) {
    var t, e, n, i;
    const r = u2 ?? qn;
    return (t = r.adapter) !== null && t !== void 0 || (r.adapter = Iu), (e = r.equals) !== null && e !== void 0 || (r.equals = (i = (n = r.adapter) === null || n === void 0 ? void 0 : n.equals) !== null && i !== void 0 ? i : xe), r;
  }
  function Cn(u2) {
    return function(e, n, i) {
      const r = In(n);
      return u2(e, r, i);
    };
  }
  const ct = Cn(ge);
  function me(u2, t, e = false) {
    return e && (u2 = Dn(u2, t)), Array.isArray(u2) ? t.removeSubsets(u2) : t.getChildren(u2);
  }
  function Dn(u2, t) {
    const e = Array.isArray(u2) ? u2.slice(0) : [u2], n = e.length;
    for (let i = 0; i < n; i++) {
      const r = be(e[i], t);
      e.push(...r);
    }
    return e;
  }
  const Ln = /* @__PURE__ */ new Set([
    "first",
    "last",
    "eq",
    "gt",
    "nth",
    "lt",
    "even",
    "odd"
  ]);
  function Nu(u2) {
    return u2.type !== "pseudo" ? false : Ln.has(u2.name) ? true : u2.name === "not" && Array.isArray(u2.data) ? u2.data.some((t) => t.some(Nu)) : false;
  }
  function On(u2, t, e) {
    const n = t != null ? parseInt(t, 10) : NaN;
    switch (u2) {
      case "first":
        return 1;
      case "nth":
      case "eq":
        return isFinite(n) ? n >= 0 ? n + 1 : 1 / 0 : 0;
      case "lt":
        return isFinite(n) ? n >= 0 ? Math.min(n, e) : 1 / 0 : 0;
      case "gt":
        return isFinite(n) ? 1 / 0 : 0;
      case "odd":
        return 2 * e;
      case "even":
        return 2 * e - 1;
      case "last":
      case "not":
        return 1 / 0;
    }
  }
  function Mn(u2) {
    for (; u2.parent; )
      u2 = u2.parent;
    return u2;
  }
  function ot(u2) {
    const t = [], e = [];
    for (const n of u2)
      n.some(Nu) ? t.push(n) : e.push(n);
    return [e, t];
  }
  const Pn = {
    type: g.Universal,
    namespace: null
  }, Bn = {
    type: g.Pseudo,
    name: "scope",
    data: null
  };
  function ye(u2, t, e = {}) {
    return Ae([u2], t, e);
  }
  function Ae(u2, t, e = {}) {
    if (typeof t == "function")
      return u2.some(t);
    const [n, i] = ot(Cu(t));
    return n.length > 0 && u2.some(ct(n, e)) || i.some((r) => we(r, u2, e).length > 0);
  }
  function Fn(u2, t, e, n) {
    const i = typeof e == "string" ? parseInt(e, 10) : NaN;
    switch (u2) {
      case "first":
      case "lt":
        return t;
      case "last":
        return t.length > 0 ? [t[t.length - 1]] : t;
      case "nth":
      case "eq":
        return isFinite(i) && Math.abs(i) < t.length ? [i < 0 ? t[t.length + i] : t[i]] : [];
      case "gt":
        return isFinite(i) ? t.slice(i + 1) : [];
      case "even":
        return t.filter((r, a2) => a2 % 2 === 0);
      case "odd":
        return t.filter((r, a2) => a2 % 2 === 1);
      case "not": {
        const r = new Set(ve(e, t, n));
        return t.filter((a2) => !r.has(a2));
      }
    }
  }
  function Se(u2, t, e = {}) {
    return ve(Cu(u2), t, e);
  }
  function ve(u2, t, e) {
    if (t.length === 0)
      return [];
    const [n, i] = ot(u2);
    let r;
    if (n.length) {
      const a2 = Yu(t, n, e);
      if (i.length === 0)
        return a2;
      a2.length && (r = new Set(a2));
    }
    for (let a2 = 0; a2 < i.length && (r == null ? void 0 : r.size) !== t.length; a2++) {
      const s = i[a2];
      if ((r ? t.filter((f2) => m(f2) && !r.has(f2)) : t).length === 0)
        break;
      const o = we(s, t, e);
      if (o.length)
        if (r)
          o.forEach((f2) => r.add(f2));
        else {
          if (a2 === i.length - 1)
            return o;
          r = new Set(o);
        }
    }
    return typeof r < "u" ? r.size === t.length ? t : (
      // Filter elements to preserve order
      t.filter((a2) => r.has(a2))
    ) : [];
  }
  function we(u2, t, e) {
    var n;
    if (u2.some(iu)) {
      const i = (n = e.root) !== null && n !== void 0 ? n : Mn(t[0]), r = { ...e, context: t, relativeSelector: false };
      return u2.push(Bn), Tu(i, u2, r, true, t.length);
    }
    return Tu(t, u2, e, false, t.length);
  }
  function Rn(u2, t, e = {}, n = 1 / 0) {
    if (typeof u2 == "function")
      return Ee(t, u2);
    const [i, r] = ot(Cu(u2)), a2 = r.map((s) => Tu(t, s, e, true, n));
    return i.length && a2.push(Xu(t, i, e, n)), a2.length === 0 ? [] : a2.length === 1 ? a2[0] : tu(a2.reduce((s, c) => [...s, ...c]));
  }
  function Tu(u2, t, e, n, i) {
    const r = t.findIndex(Nu), a2 = t.slice(0, r), s = t[r], c = t.length - 1 === r ? i : 1 / 0, o = On(s.name, s.data, c);
    if (o === 0)
      return [];
    const h = (a2.length === 0 && !Array.isArray(u2) ? qu(u2).filter(m) : a2.length === 0 ? (Array.isArray(u2) ? u2 : [u2]).filter(m) : n || a2.some(iu) ? Xu(u2, [a2], e, o) : Yu(u2, [a2], e)).slice(0, o);
    let b2 = Fn(s.name, h, s.data, e);
    if (b2.length === 0 || t.length === r + 1)
      return b2;
    const p = t.slice(r + 1), l = p.some(iu);
    if (l) {
      if (iu(p[0])) {
        const { type: y } = p[0];
        (y === g.Sibling || y === g.Adjacent) && (b2 = me(b2, Iu, true)), p.unshift(Pn);
      }
      e = {
        ...e,
        // Avoid absolutizing the selector
        relativeSelector: false,
        /*
         * Add a custom root func, to make sure traversals don't match elements
         * that aren't a part of the considered tree.
         */
        rootFunc: (y) => b2.includes(y)
      };
    } else e.rootFunc && e.rootFunc !== Eu.trueFunc && (e = { ...e, rootFunc: Eu.trueFunc });
    return p.some(Nu) ? Tu(b2, p, e, false, i) : l ? (
      // Query existing elements to resolve traversal.
      Xu(b2, [p], e, i)
    ) : (
      // If we don't have any more traversals, simply filter elements.
      Yu(b2, [p], e)
    );
  }
  function Xu(u2, t, e, n) {
    const i = ct(t, e, u2);
    return Ee(u2, i, n);
  }
  function Ee(u2, t, e = 1 / 0) {
    const n = me(u2, Iu, t.shouldTestNextSiblings);
    return nt((i) => m(i) && t(i), n, true, e);
  }
  function Yu(u2, t, e) {
    const n = (Array.isArray(u2) ? u2 : [u2]).filter(m);
    if (n.length === 0)
      return n;
    const i = ct(t, e);
    return i === Eu.trueFunc ? n : n.filter(i);
  }
  const jn = /^\s*[+~]/;
  function Un(u2) {
    if (!u2)
      return this._make([]);
    if (typeof u2 != "string") {
      const t = U(u2) ? u2.toArray() : [u2], e = this.toArray();
      return this._make(t.filter((n) => e.some((i) => ie(i, n))));
    }
    return this._findBySelector(u2, Number.POSITIVE_INFINITY);
  }
  function Vn(u2, t) {
    var e;
    const n = this.toArray(), i = jn.test(u2) ? n : this.children().toArray(), r = {
      context: n,
      root: (e = this._root) === null || e === void 0 ? void 0 : e[0],
      // Pass options that are recognized by `cheerio-select`
      xmlMode: this.options.xmlMode,
      lowerCaseTags: this.options.lowerCaseTags,
      lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
      pseudos: this.options.pseudos,
      quirksMode: this.options.quirksMode
    };
    return this._make(Rn(u2, i, r, t));
  }
  function ft(u2) {
    return function(t, ...e) {
      return function(n) {
        var i;
        let r = u2(t, this);
        return n && (r = ht(r, n, this.options.xmlMode, (i = this._root) === null || i === void 0 ? void 0 : i[0])), this._make(
          // Post processing is only necessary if there is more than one element.
          this.length > 1 && r.length > 1 ? e.reduce((a2, s) => s(a2), r) : r
        );
      };
    };
  }
  const du = ft((u2, t) => {
    let e = [];
    for (let n = 0; n < t.length; n++) {
      const i = u2(t[n]);
      i.length > 0 && (e = e.concat(i));
    }
    return e;
  }), dt = ft((u2, t) => {
    const e = [];
    for (let n = 0; n < t.length; n++) {
      const i = u2(t[n]);
      i !== null && e.push(i);
    }
    return e;
  });
  function lt(u2, ...t) {
    let e = null;
    const n = ft((i, r) => {
      const a2 = [];
      return E(r, (s) => {
        for (let c; (c = i(s)) && !(e != null && e(c, a2.length)); s = c)
          a2.push(c);
      }), a2;
    })(u2, ...t);
    return function(i, r) {
      e = typeof i == "string" ? (s) => ye(s, i, this.options) : i ? lu(i) : null;
      const a2 = n.call(this, r);
      return e = null, a2;
    };
  }
  function eu(u2) {
    return u2.length > 1 ? Array.from(new Set(u2)) : u2;
  }
  const $n = dt(({ parent: u2 }) => u2 && !Q(u2) ? u2 : null, eu), Hn = du((u2) => {
    const t = [];
    for (; u2.parent && !Q(u2.parent); )
      t.push(u2.parent), u2 = u2.parent;
    return t;
  }, tu, (u2) => u2.reverse()), Gn = lt(({ parent: u2 }) => u2 && !Q(u2) ? u2 : null, tu, (u2) => u2.reverse());
  function zn(u2) {
    var t;
    const e = [];
    if (!u2)
      return this._make(e);
    const n = {
      xmlMode: this.options.xmlMode,
      root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
    }, i = typeof u2 == "string" ? (r) => ye(r, u2, n) : lu(u2);
    return E(this, (r) => {
      for (r && !Q(r) && !m(r) && (r = r.parent); r && m(r); ) {
        if (i(r, 0)) {
          e.includes(r) || e.push(r);
          break;
        }
        r = r.parent;
      }
    }), this._make(e);
  }
  const Wn = dt((u2) => tt(u2)), Zn = du((u2) => {
    const t = [];
    for (; u2.next; )
      u2 = u2.next, m(u2) && t.push(u2);
    return t;
  }, eu), Qn = lt((u2) => tt(u2), eu), Xn = dt((u2) => et(u2)), Yn = du((u2) => {
    const t = [];
    for (; u2.prev; )
      u2 = u2.prev, m(u2) && t.push(u2);
    return t;
  }, eu), Jn = lt((u2) => et(u2), eu), Kn = du((u2) => Jt(u2).filter((t) => m(t) && t !== u2), tu), ui = du((u2) => qu(u2).filter(m), eu);
  function ti() {
    const u2 = this.toArray().reduce((t, e) => N(e) ? t.concat(e.children) : t, []);
    return this._make(u2);
  }
  function ei(u2) {
    let t = 0;
    const e = this.length;
    for (; t < e && u2.call(this[t], t, this[t]) !== false; )
      ++t;
    return this;
  }
  function ni(u2) {
    let t = [];
    for (let e = 0; e < this.length; e++) {
      const n = this[e], i = u2.call(n, e, n);
      i != null && (t = t.concat(i));
    }
    return this._make(t);
  }
  function lu(u2) {
    return typeof u2 == "function" ? (t, e) => u2.call(t, e, t) : U(u2) ? (t) => Array.prototype.includes.call(u2, t) : function(t) {
      return u2 === t;
    };
  }
  function ii(u2) {
    var t;
    return this._make(ht(this.toArray(), u2, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
  }
  function ht(u2, t, e, n) {
    return typeof t == "string" ? Se(t, u2, { xmlMode: e, root: n }) : u2.filter(lu(t));
  }
  function ri(u2) {
    const t = this.toArray();
    return typeof u2 == "string" ? Ae(t.filter(m), u2, this.options) : u2 ? t.some(lu(u2)) : false;
  }
  function ai(u2) {
    let t = this.toArray();
    if (typeof u2 == "string") {
      const e = new Set(Se(u2, t, this.options));
      t = t.filter((n) => !e.has(n));
    } else {
      const e = lu(u2);
      t = t.filter((n, i) => !e(n, i));
    }
    return this._make(t);
  }
  function si(u2) {
    return this.filter(typeof u2 == "string" ? (
      // Using the `:has` selector here short-circuits searches.
      `:has(${u2})`
    ) : (t, e) => this._make(e).find(u2).length > 0);
  }
  function ci() {
    return this.length > 1 ? this._make(this[0]) : this;
  }
  function oi() {
    return this.length > 0 ? this._make(this[this.length - 1]) : this;
  }
  function fi(u2) {
    var t;
    return u2 = +u2, u2 === 0 && this.length <= 1 ? this : (u2 < 0 && (u2 = this.length + u2), this._make((t = this[u2]) !== null && t !== void 0 ? t : []));
  }
  function di(u2) {
    return u2 == null ? this.toArray() : this[u2 < 0 ? this.length + u2 : u2];
  }
  function li() {
    return Array.prototype.slice.call(this);
  }
  function hi(u2) {
    let t, e;
    return u2 == null ? (t = this.parent().children(), e = this[0]) : typeof u2 == "string" ? (t = this._make(u2), e = this[0]) : (t = this, e = U(u2) ? u2[0] : u2), Array.prototype.indexOf.call(t, e);
  }
  function bi(u2, t) {
    return this._make(Array.prototype.slice.call(this, u2, t));
  }
  function pi() {
    var u2;
    return (u2 = this.prevObject) !== null && u2 !== void 0 ? u2 : this._make([]);
  }
  function gi(u2, t) {
    const e = this._make(u2, t), n = tu([...this.get(), ...e.get()]);
    return this._make(n);
  }
  function xi(u2) {
    return this.prevObject ? this.add(u2 ? this.prevObject.filter(u2) : this.prevObject) : this;
  }
  const mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    _findBySelector: Vn,
    add: gi,
    addBack: xi,
    children: ui,
    closest: zn,
    contents: ti,
    each: ei,
    end: pi,
    eq: fi,
    filter: ii,
    filterArray: ht,
    find: Un,
    first: ci,
    get: di,
    has: si,
    index: hi,
    is: ri,
    last: oi,
    map: ni,
    next: Wn,
    nextAll: Zn,
    nextUntil: Qn,
    not: ai,
    parent: $n,
    parents: Hn,
    parentsUntil: Gn,
    prev: Xn,
    prevAll: Yn,
    prevUntil: Jn,
    siblings: Kn,
    slice: bi,
    toArray: li
  }, Symbol.toStringTag, { value: "Module" }));
  function yi(u2) {
    return function(e, n, i, r) {
      if (typeof Buffer < "u" && Buffer.isBuffer(e) && (e = e.toString()), typeof e == "string")
        return u2(e, n, i, r);
      const a2 = e;
      if (!Array.isArray(a2) && Q(a2))
        return a2;
      const s = new ru([]);
      return Z$1(a2, s), s;
    };
  }
  function Z$1(u2, t) {
    const e = Array.isArray(u2) ? u2 : [u2];
    t ? t.children = e : t = null;
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      i.parent && i.parent.children !== e && X(i), t ? (i.prev = e[n - 1] || null, i.next = e[n + 1] || null) : i.prev = i.next = null, i.parent = t;
    }
    return t;
  }
  function Ai(u2, t) {
    if (u2 == null)
      return [];
    if (typeof u2 == "string")
      return this._parse(u2, this.options, false, null).children.slice(0);
    if ("length" in u2) {
      if (u2.length === 1)
        return this._makeDomArray(u2[0], t);
      const e = [];
      for (let n = 0; n < u2.length; n++) {
        const i = u2[n];
        if (typeof i == "object") {
          if (i == null)
            continue;
          if (!("length" in i)) {
            e.push(t ? au(i, true) : i);
            continue;
          }
        }
        e.push(...this._makeDomArray(i, t));
      }
      return e;
    }
    return [t ? au(u2, true) : u2];
  }
  function Ne(u2) {
    return function(...t) {
      const e = this.length - 1;
      return E(this, (n, i) => {
        if (!N(n))
          return;
        const r = typeof t[0] == "function" ? t[0].call(n, i, this._render(n.children)) : t, a2 = this._makeDomArray(r, i < e);
        u2(a2, n.children, n);
      });
    };
  }
  function H(u2, t, e, n, i) {
    var r, a2;
    const s = [
      t,
      e,
      ...n
    ], c = t === 0 ? null : u2[t - 1], o = t + e >= u2.length ? null : u2[t + e];
    for (let f2 = 0; f2 < n.length; ++f2) {
      const h = n[f2], b2 = h.parent;
      if (b2) {
        const l = b2.children.indexOf(h);
        l > -1 && (b2.children.splice(l, 1), i === b2 && t > l && s[0]--);
      }
      h.parent = i, h.prev && (h.prev.next = (r = h.next) !== null && r !== void 0 ? r : null), h.next && (h.next.prev = (a2 = h.prev) !== null && a2 !== void 0 ? a2 : null), h.prev = f2 === 0 ? c : n[f2 - 1], h.next = f2 === n.length - 1 ? o : n[f2 + 1];
    }
    return c && (c.next = n[0]), o && (o.prev = n[n.length - 1]), u2.splice(...s);
  }
  function Si(u2) {
    return (U(u2) ? u2 : this._make(u2)).append(this), this;
  }
  function vi(u2) {
    return (U(u2) ? u2 : this._make(u2)).prepend(this), this;
  }
  const wi = Ne((u2, t, e) => {
    H(t, t.length, 0, u2, e);
  }), Ei = Ne((u2, t, e) => {
    H(t, 0, 0, u2, e);
  });
  function Te(u2) {
    return function(t) {
      const e = this.length - 1, n = this.parents().last();
      for (let i = 0; i < this.length; i++) {
        const r = this[i], a2 = typeof t == "function" ? t.call(r, i, r) : typeof t == "string" && !zu(t) ? n.find(t).clone() : t, [s] = this._makeDomArray(a2, i < e);
        if (!s || !N(s))
          continue;
        let c = s, o = 0;
        for (; o < c.children.length; ) {
          const f2 = c.children[o];
          m(f2) ? (c = f2, o = 0) : o++;
        }
        u2(r, c, [s]);
      }
      return this;
    };
  }
  const Ni = Te((u2, t, e) => {
    const { parent: n } = u2;
    if (!n)
      return;
    const i = n.children, r = i.indexOf(u2);
    Z$1([u2], t), H(i, r, 0, e, n);
  }), Ti = Te((u2, t, e) => {
    N(u2) && (Z$1(u2.children, t), Z$1(e, u2));
  });
  function _i(u2) {
    return this.parent(u2).not("body").each((t, e) => {
      this._make(e).replaceWith(e.children);
    }), this;
  }
  function ki(u2) {
    const t = this[0];
    if (t) {
      const e = this._make(typeof u2 == "function" ? u2.call(t, 0, t) : u2).insertBefore(t);
      let n;
      for (let r = 0; r < e.length; r++)
        e[r].type === "tag" && (n = e[r]);
      let i = 0;
      for (; n && i < n.children.length; ) {
        const r = n.children[i];
        r.type === "tag" ? (n = r, i = 0) : i++;
      }
      n && this._make(n).append(this);
    }
    return this;
  }
  function qi(...u2) {
    const t = this.length - 1;
    return E(this, (e, n) => {
      if (!N(e) || !e.parent)
        return;
      const i = e.parent.children, r = i.indexOf(e);
      if (r < 0)
        return;
      const a2 = typeof u2[0] == "function" ? u2[0].call(e, n, this._render(e.children)) : u2, s = this._makeDomArray(a2, n < t);
      H(i, r + 1, 0, s, e.parent);
    });
  }
  function Ii(u2) {
    typeof u2 == "string" && (u2 = this._make(u2)), this.remove();
    const t = [];
    for (const e of this._makeDomArray(u2)) {
      const n = this.clone().toArray(), { parent: i } = e;
      if (!i)
        continue;
      const r = i.children, a2 = r.indexOf(e);
      a2 < 0 || (H(r, a2 + 1, 0, n, i), t.push(...n));
    }
    return this._make(t);
  }
  function Ci(...u2) {
    const t = this.length - 1;
    return E(this, (e, n) => {
      if (!N(e) || !e.parent)
        return;
      const i = e.parent.children, r = i.indexOf(e);
      if (r < 0)
        return;
      const a2 = typeof u2[0] == "function" ? u2[0].call(e, n, this._render(e.children)) : u2, s = this._makeDomArray(a2, n < t);
      H(i, r, 0, s, e.parent);
    });
  }
  function Di(u2) {
    const t = this._make(u2);
    this.remove();
    const e = [];
    return E(t, (n) => {
      const i = this.clone().toArray(), { parent: r } = n;
      if (!r)
        return;
      const a2 = r.children, s = a2.indexOf(n);
      s < 0 || (H(a2, s, 0, i, r), e.push(...i));
    }), this._make(e);
  }
  function Li(u2) {
    const t = u2 ? this.filter(u2) : this;
    return E(t, (e) => {
      X(e), e.prev = e.next = e.parent = null;
    }), this;
  }
  function Oi(u2) {
    return E(this, (t, e) => {
      const { parent: n } = t;
      if (!n)
        return;
      const i = n.children, r = typeof u2 == "function" ? u2.call(t, e, t) : u2, a2 = this._makeDomArray(r);
      Z$1(a2, null);
      const s = i.indexOf(t);
      H(i, s, 1, a2, n), a2.includes(t) || (t.parent = t.prev = t.next = null);
    });
  }
  function Mi() {
    return E(this, (u2) => {
      if (N(u2)) {
        for (const t of u2.children)
          t.next = t.prev = t.parent = null;
        u2.children.length = 0;
      }
    });
  }
  function Pi(u2) {
    if (u2 === void 0) {
      const t = this[0];
      return !t || !N(t) ? null : this._render(t.children);
    }
    return E(this, (t) => {
      if (!N(t))
        return;
      for (const n of t.children)
        n.next = n.prev = n.parent = null;
      const e = U(u2) ? u2.toArray() : this._parse(`${u2}`, this.options, false, t).children;
      Z$1(e, t);
    });
  }
  function Bi() {
    return this._render(this);
  }
  function Fi(u2) {
    return u2 === void 0 ? su(this) : typeof u2 == "function" ? E(this, (t, e) => this._make(t).text(u2.call(t, e, su([t])))) : E(this, (t) => {
      if (!N(t))
        return;
      for (const n of t.children)
        n.next = n.prev = n.parent = null;
      const e = new mu(`${u2}`);
      Z$1(e, t);
    });
  }
  function Ri() {
    const u2 = Array.prototype.map.call(this.get(), (e) => au(e, true)), t = new ru(u2);
    for (const e of u2)
      e.parent = t;
    return this._make(u2);
  }
  const ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    _makeDomArray: Ai,
    after: qi,
    append: wi,
    appendTo: Si,
    before: Ci,
    clone: Ri,
    empty: Mi,
    html: Pi,
    insertAfter: Ii,
    insertBefore: Di,
    prepend: Ei,
    prependTo: vi,
    remove: Li,
    replaceWith: Oi,
    text: Fi,
    toString: Bi,
    unwrap: _i,
    wrap: Ni,
    wrapAll: ki,
    wrapInner: Ti
  }, Symbol.toStringTag, { value: "Module" }));
  function Ui(u2, t) {
    if (u2 != null && t != null || // When `prop` is a "plain" object
    typeof u2 == "object" && !Array.isArray(u2))
      return E(this, (e, n) => {
        m(e) && _e(e, u2, t, n);
      });
    if (this.length !== 0)
      return ke(this[0], u2);
  }
  function _e(u2, t, e, n) {
    if (typeof t == "string") {
      const i = ke(u2), r = typeof e == "function" ? e.call(u2, n, i[t]) : e;
      r === "" ? delete i[t] : r != null && (i[t] = r), u2.attribs.style = Vi(i);
    } else if (typeof t == "object") {
      const i = Object.keys(t);
      for (let r = 0; r < i.length; r++) {
        const a2 = i[r];
        _e(u2, a2, t[a2], r);
      }
    }
  }
  function ke(u2, t) {
    if (!u2 || !m(u2))
      return;
    const e = $i(u2.attribs.style);
    if (typeof t == "string")
      return e[t];
    if (Array.isArray(t)) {
      const n = {};
      for (const i of t)
        e[i] != null && (n[i] = e[i]);
      return n;
    }
    return e;
  }
  function Vi(u2) {
    return Object.keys(u2).reduce((t, e) => `${t}${t ? " " : ""}${e}: ${u2[e]};`, "");
  }
  function $i(u2) {
    if (u2 = (u2 || "").trim(), !u2)
      return {};
    const t = {};
    let e;
    for (const n of u2.split(";")) {
      const i = n.indexOf(":");
      if (i < 1 || i === n.length - 1) {
        const r = n.trimEnd();
        r.length > 0 && e !== void 0 && (t[e] += `;${r}`);
      } else
        e = n.slice(0, i).trim(), t[e] = n.slice(i + 1).trim();
    }
    return t;
  }
  const Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    css: Ui
  }, Symbol.toStringTag, { value: "Module" })), Ct = "input,select,textarea,keygen", Gi = /%20/g, Dt = /\r?\n/g;
  function zi() {
    return this.serializeArray().map((e) => `${encodeURIComponent(e.name)}=${encodeURIComponent(e.value)}`).join("&").replace(Gi, "+");
  }
  function Wi() {
    return this.map((u2, t) => {
      const e = this._make(t);
      return m(t) && t.name === "form" ? e.find(Ct).toArray() : e.filter(Ct).toArray();
    }).filter(
      // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
      '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    ).map((u2, t) => {
      var e;
      const n = this._make(t), i = n.attr("name"), r = (e = n.val()) !== null && e !== void 0 ? e : "";
      return Array.isArray(r) ? r.map((a2) => (
        /*
         * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
         * These can occur inside of `<textarea>'s`
         */
        { name: i, value: a2.replace(Dt, `\r
`) }
      )) : { name: i, value: r.replace(Dt, `\r
`) };
    }).toArray();
  }
  const Zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    serialize: zi,
    serializeArray: Wi
  }, Symbol.toStringTag, { value: "Module" }));
  function Qi(u2) {
    var t;
    return typeof u2 == "string" ? { selector: u2, value: "textContent" } : {
      selector: u2.selector,
      value: (t = u2.value) !== null && t !== void 0 ? t : "textContent"
    };
  }
  function Xi(u2) {
    const t = {};
    for (const e in u2) {
      const n = u2[e], i = Array.isArray(n), { selector: r, value: a2 } = Qi(i ? n[0] : n), s = typeof a2 == "function" ? a2 : typeof a2 == "string" ? (c) => this._make(c).prop(a2) : (c) => this._make(c).extract(a2);
      if (i)
        t[e] = this._findBySelector(r, Number.POSITIVE_INFINITY).map((c, o) => s(o, e, t)).get();
      else {
        const c = this._findBySelector(r, 1);
        t[e] = c.length > 0 ? s(c[0], e, t) : void 0;
      }
    }
    return t;
  }
  const Yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    extract: Xi
  }, Symbol.toStringTag, { value: "Module" }));
  class hu {
    /**
     * Instance of cheerio. Methods are specified in the modules. Usage of this
     * constructor is not recommended. Please use `$.load` instead.
     *
     * @private
     * @param elements - The new selection.
     * @param root - Sets the root node.
     * @param options - Options for the instance.
     */
    constructor(t, e, n) {
      if (this.length = 0, this.options = n, this._root = e, t) {
        for (let i = 0; i < t.length; i++)
          this[i] = t[i];
        this.length = t.length;
      }
    }
  }
  hu.prototype.cheerio = "[cheerio object]";
  hu.prototype.splice = Array.prototype.splice;
  hu.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  Object.assign(hu.prototype, tn, mi, ji, Hi, Zi, Yi);
  function Ji(u2, t) {
    return function e(n, i, r = true) {
      if (n == null)
        throw new Error("cheerio.load() expects a string");
      const a2 = $u(i), s = u2(n, a2, r, null);
      class c extends hu {
        _make(h, b2) {
          const p = o(h, b2);
          return p.prevObject = this, p;
        }
        _parse(h, b2, p, l) {
          return u2(h, b2, p, l);
        }
        _render(h) {
          return t(h, this.options);
        }
      }
      function o(f2, h, b2 = s, p) {
        if (f2 && U(f2))
          return f2;
        const l = $u(p, a2), y = typeof b2 == "string" ? [u2(b2, l, false, null)] : "length" in b2 ? b2 : [b2], w2 = U(y) ? y : new c(y, null, l);
        if (w2._root = w2, !f2)
          return new c(void 0, w2, l);
        const T2 = typeof f2 == "string" && zu(f2) ? (
          // $(<html>)
          u2(f2, l, false, null).children
        ) : Ki(f2) ? (
          // $(dom)
          [f2]
        ) : Array.isArray(f2) ? (
          // $([dom])
          f2
        ) : void 0, I = new c(T2, w2, l);
        if (T2)
          return I;
        if (typeof f2 != "string")
          throw new TypeError("Unexpected type of selector");
        let R2 = f2;
        const C2 = h ? (
          // If we don't have a context, maybe we have a root, from loading
          typeof h == "string" ? zu(h) ? (
            // $('li', '<ul>...</ul>')
            new c([u2(h, l, false, null)], w2, l)
          ) : (
            // $('li', 'ul')
            (R2 = `${h} ${R2}`, w2)
          ) : U(h) ? (
            // $('li', $)
            h
          ) : (
            // $('li', node), $('li', [nodes])
            new c(Array.isArray(h) ? h : [h], w2, l)
          )
        ) : w2;
        return C2 ? C2.find(R2) : I;
      }
      return Object.assign(o, $0, {
        load: e,
        // `_root` and `_options` are used in static methods.
        _root: s,
        _options: a2,
        // Add `fn` for plugins
        fn: c.prototype,
        // Add the prototype here to maintain `instanceof` behavior.
        prototype: c.prototype
      }), o;
    };
  }
  function Ki(u2) {
    return !!u2.name || u2.type === "root" || u2.type === "text" || u2.type === "comment";
  }
  var x;
  (function(u2) {
    u2[u2.Tab = 9] = "Tab", u2[u2.NewLine = 10] = "NewLine", u2[u2.FormFeed = 12] = "FormFeed", u2[u2.CarriageReturn = 13] = "CarriageReturn", u2[u2.Space = 32] = "Space", u2[u2.ExclamationMark = 33] = "ExclamationMark", u2[u2.Number = 35] = "Number", u2[u2.Amp = 38] = "Amp", u2[u2.SingleQuote = 39] = "SingleQuote", u2[u2.DoubleQuote = 34] = "DoubleQuote", u2[u2.Dash = 45] = "Dash", u2[u2.Slash = 47] = "Slash", u2[u2.Zero = 48] = "Zero", u2[u2.Nine = 57] = "Nine", u2[u2.Semi = 59] = "Semi", u2[u2.Lt = 60] = "Lt", u2[u2.Eq = 61] = "Eq", u2[u2.Gt = 62] = "Gt", u2[u2.Questionmark = 63] = "Questionmark", u2[u2.UpperA = 65] = "UpperA", u2[u2.LowerA = 97] = "LowerA", u2[u2.UpperF = 70] = "UpperF", u2[u2.LowerF = 102] = "LowerF", u2[u2.UpperZ = 90] = "UpperZ", u2[u2.LowerZ = 122] = "LowerZ", u2[u2.LowerX = 120] = "LowerX", u2[u2.OpeningSquareBracket = 91] = "OpeningSquareBracket";
  })(x || (x = {}));
  var d;
  (function(u2) {
    u2[u2.Text = 1] = "Text", u2[u2.BeforeTagName = 2] = "BeforeTagName", u2[u2.InTagName = 3] = "InTagName", u2[u2.InSelfClosingTag = 4] = "InSelfClosingTag", u2[u2.BeforeClosingTagName = 5] = "BeforeClosingTagName", u2[u2.InClosingTagName = 6] = "InClosingTagName", u2[u2.AfterClosingTagName = 7] = "AfterClosingTagName", u2[u2.BeforeAttributeName = 8] = "BeforeAttributeName", u2[u2.InAttributeName = 9] = "InAttributeName", u2[u2.AfterAttributeName = 10] = "AfterAttributeName", u2[u2.BeforeAttributeValue = 11] = "BeforeAttributeValue", u2[u2.InAttributeValueDq = 12] = "InAttributeValueDq", u2[u2.InAttributeValueSq = 13] = "InAttributeValueSq", u2[u2.InAttributeValueNq = 14] = "InAttributeValueNq", u2[u2.BeforeDeclaration = 15] = "BeforeDeclaration", u2[u2.InDeclaration = 16] = "InDeclaration", u2[u2.InProcessingInstruction = 17] = "InProcessingInstruction", u2[u2.BeforeComment = 18] = "BeforeComment", u2[u2.CDATASequence = 19] = "CDATASequence", u2[u2.InSpecialComment = 20] = "InSpecialComment", u2[u2.InCommentLike = 21] = "InCommentLike", u2[u2.BeforeSpecialS = 22] = "BeforeSpecialS", u2[u2.BeforeSpecialT = 23] = "BeforeSpecialT", u2[u2.SpecialStartSequence = 24] = "SpecialStartSequence", u2[u2.InSpecialTag = 25] = "InSpecialTag", u2[u2.InEntity = 26] = "InEntity";
  })(d || (d = {}));
  function j(u2) {
    return u2 === x.Space || u2 === x.NewLine || u2 === x.Tab || u2 === x.FormFeed || u2 === x.CarriageReturn;
  }
  function gu(u2) {
    return u2 === x.Slash || u2 === x.Gt || j(u2);
  }
  function ur(u2) {
    return u2 >= x.LowerA && u2 <= x.LowerZ || u2 >= x.UpperA && u2 <= x.UpperZ;
  }
  var F;
  (function(u2) {
    u2[u2.NoValue = 0] = "NoValue", u2[u2.Unquoted = 1] = "Unquoted", u2[u2.Single = 2] = "Single", u2[u2.Double = 3] = "Double";
  })(F || (F = {}));
  const D = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    // CDATA[
    CdataEnd: new Uint8Array([93, 93, 62]),
    // ]]>
    CommentEnd: new Uint8Array([45, 45, 62]),
    // `-->`
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    // `<\/script`
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    // `</style`
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
    // `</title`
    TextareaEnd: new Uint8Array([
      60,
      47,
      116,
      101,
      120,
      116,
      97,
      114,
      101,
      97
    ])
    // `</textarea`
  };
  class tr {
    constructor({ xmlMode: t = false, decodeEntities: e = true }, n) {
      this.cbs = n, this.state = d.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = d.Text, this.isSpecial = false, this.running = true, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.xmlMode = t, this.decodeEntities = e, this.entityDecoder = new zt(t ? Gt : Ht, (i, r) => this.emitCodePoint(i, r));
    }
    reset() {
      this.state = d.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = d.Text, this.currentSequence = void 0, this.running = true, this.offset = 0;
    }
    write(t) {
      this.offset += this.buffer.length, this.buffer = t, this.parse();
    }
    end() {
      this.running && this.finish();
    }
    pause() {
      this.running = false;
    }
    resume() {
      this.running = true, this.index < this.buffer.length + this.offset && this.parse();
    }
    stateText(t) {
      t === x.Lt || !this.decodeEntities && this.fastForwardTo(x.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = d.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === x.Amp && this.startEntity();
    }
    stateSpecialStartSequence(t) {
      const e = this.sequenceIndex === this.currentSequence.length;
      if (!(e ? (
        // If we are at the end of the sequence, make sure the tag name has ended
        gu(t)
      ) : (
        // Otherwise, do a case-insensitive comparison
        (t | 32) === this.currentSequence[this.sequenceIndex]
      )))
        this.isSpecial = false;
      else if (!e) {
        this.sequenceIndex++;
        return;
      }
      this.sequenceIndex = 0, this.state = d.InTagName, this.stateInTagName(t);
    }
    /** Look for an end tag. For <title> tags, also decode entities. */
    stateInSpecialTag(t) {
      if (this.sequenceIndex === this.currentSequence.length) {
        if (t === x.Gt || j(t)) {
          const e = this.index - this.currentSequence.length;
          if (this.sectionStart < e) {
            const n = this.index;
            this.index = e, this.cbs.ontext(this.sectionStart, e), this.index = n;
          }
          this.isSpecial = false, this.sectionStart = e + 2, this.stateInClosingTagName(t);
          return;
        }
        this.sequenceIndex = 0;
      }
      (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === D.TitleEnd ? this.decodeEntities && t === x.Amp && this.startEntity() : this.fastForwardTo(x.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === x.Lt);
    }
    stateCDATASequence(t) {
      t === D.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === D.Cdata.length && (this.state = d.InCommentLike, this.currentSequence = D.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = d.InDeclaration, this.stateInDeclaration(t));
    }
    /**
     * When we wait for one specific character, we can speed things up
     * by skipping through the buffer until we find it.
     *
     * @returns Whether the character was found.
     */
    fastForwardTo(t) {
      for (; ++this.index < this.buffer.length + this.offset; )
        if (this.buffer.charCodeAt(this.index - this.offset) === t)
          return true;
      return this.index = this.buffer.length + this.offset - 1, false;
    }
    /**
     * Comments and CDATA end with `-->` and `]]>`.
     *
     * Their common qualities are:
     * - Their end sequences have a distinct character they start with.
     * - That character is then repeated, so we have to check multiple repeats.
     * - All characters but the start character of the sequence can be skipped.
     */
    stateInCommentLike(t) {
      t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === D.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = d.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
    }
    /**
     * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
     *
     * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
     * We allow anything that wouldn't end the tag.
     */
    isTagStartChar(t) {
      return this.xmlMode ? !gu(t) : ur(t);
    }
    startSpecial(t, e) {
      this.isSpecial = true, this.currentSequence = t, this.sequenceIndex = e, this.state = d.SpecialStartSequence;
    }
    stateBeforeTagName(t) {
      if (t === x.ExclamationMark)
        this.state = d.BeforeDeclaration, this.sectionStart = this.index + 1;
      else if (t === x.Questionmark)
        this.state = d.InProcessingInstruction, this.sectionStart = this.index + 1;
      else if (this.isTagStartChar(t)) {
        const e = t | 32;
        this.sectionStart = this.index, this.xmlMode ? this.state = d.InTagName : e === D.ScriptEnd[2] ? this.state = d.BeforeSpecialS : e === D.TitleEnd[2] ? this.state = d.BeforeSpecialT : this.state = d.InTagName;
      } else t === x.Slash ? this.state = d.BeforeClosingTagName : (this.state = d.Text, this.stateText(t));
    }
    stateInTagName(t) {
      gu(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t));
    }
    stateBeforeClosingTagName(t) {
      j(t) || (t === x.Gt ? this.state = d.Text : (this.state = this.isTagStartChar(t) ? d.InClosingTagName : d.InSpecialComment, this.sectionStart = this.index));
    }
    stateInClosingTagName(t) {
      (t === x.Gt || j(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = d.AfterClosingTagName, this.stateAfterClosingTagName(t));
    }
    stateAfterClosingTagName(t) {
      (t === x.Gt || this.fastForwardTo(x.Gt)) && (this.state = d.Text, this.sectionStart = this.index + 1);
    }
    stateBeforeAttributeName(t) {
      t === x.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = d.InSpecialTag, this.sequenceIndex = 0) : this.state = d.Text, this.sectionStart = this.index + 1) : t === x.Slash ? this.state = d.InSelfClosingTag : j(t) || (this.state = d.InAttributeName, this.sectionStart = this.index);
    }
    stateInSelfClosingTag(t) {
      t === x.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = d.Text, this.sectionStart = this.index + 1, this.isSpecial = false) : j(t) || (this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t));
    }
    stateInAttributeName(t) {
      (t === x.Eq || gu(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = this.index, this.state = d.AfterAttributeName, this.stateAfterAttributeName(t));
    }
    stateAfterAttributeName(t) {
      t === x.Eq ? this.state = d.BeforeAttributeValue : t === x.Slash || t === x.Gt ? (this.cbs.onattribend(F.NoValue, this.sectionStart), this.sectionStart = -1, this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t)) : j(t) || (this.cbs.onattribend(F.NoValue, this.sectionStart), this.state = d.InAttributeName, this.sectionStart = this.index);
    }
    stateBeforeAttributeValue(t) {
      t === x.DoubleQuote ? (this.state = d.InAttributeValueDq, this.sectionStart = this.index + 1) : t === x.SingleQuote ? (this.state = d.InAttributeValueSq, this.sectionStart = this.index + 1) : j(t) || (this.sectionStart = this.index, this.state = d.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
    }
    handleInAttributeValue(t, e) {
      t === e || !this.decodeEntities && this.fastForwardTo(e) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(e === x.DoubleQuote ? F.Double : F.Single, this.index + 1), this.state = d.BeforeAttributeName) : this.decodeEntities && t === x.Amp && this.startEntity();
    }
    stateInAttributeValueDoubleQuotes(t) {
      this.handleInAttributeValue(t, x.DoubleQuote);
    }
    stateInAttributeValueSingleQuotes(t) {
      this.handleInAttributeValue(t, x.SingleQuote);
    }
    stateInAttributeValueNoQuotes(t) {
      j(t) || t === x.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(F.Unquoted, this.index), this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === x.Amp && this.startEntity();
    }
    stateBeforeDeclaration(t) {
      t === x.OpeningSquareBracket ? (this.state = d.CDATASequence, this.sequenceIndex = 0) : this.state = t === x.Dash ? d.BeforeComment : d.InDeclaration;
    }
    stateInDeclaration(t) {
      (t === x.Gt || this.fastForwardTo(x.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = d.Text, this.sectionStart = this.index + 1);
    }
    stateInProcessingInstruction(t) {
      (t === x.Gt || this.fastForwardTo(x.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = d.Text, this.sectionStart = this.index + 1);
    }
    stateBeforeComment(t) {
      t === x.Dash ? (this.state = d.InCommentLike, this.currentSequence = D.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = d.InDeclaration;
    }
    stateInSpecialComment(t) {
      (t === x.Gt || this.fastForwardTo(x.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = d.Text, this.sectionStart = this.index + 1);
    }
    stateBeforeSpecialS(t) {
      const e = t | 32;
      e === D.ScriptEnd[3] ? this.startSpecial(D.ScriptEnd, 4) : e === D.StyleEnd[3] ? this.startSpecial(D.StyleEnd, 4) : (this.state = d.InTagName, this.stateInTagName(t));
    }
    stateBeforeSpecialT(t) {
      const e = t | 32;
      e === D.TitleEnd[3] ? this.startSpecial(D.TitleEnd, 4) : e === D.TextareaEnd[3] ? this.startSpecial(D.TextareaEnd, 4) : (this.state = d.InTagName, this.stateInTagName(t));
    }
    startEntity() {
      this.baseState = this.state, this.state = d.InEntity, this.entityStart = this.index, this.entityDecoder.startEntity(this.xmlMode ? B.Strict : this.baseState === d.Text || this.baseState === d.InSpecialTag ? B.Legacy : B.Attribute);
    }
    stateInEntity() {
      const t = this.entityDecoder.write(this.buffer, this.index - this.offset);
      t >= 0 ? (this.state = this.baseState, t === 0 && (this.index = this.entityStart)) : this.index = this.offset + this.buffer.length - 1;
    }
    /**
     * Remove data that has already been consumed from the buffer.
     */
    cleanup() {
      this.running && this.sectionStart !== this.index && (this.state === d.Text || this.state === d.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === d.InAttributeValueDq || this.state === d.InAttributeValueSq || this.state === d.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
    }
    shouldContinue() {
      return this.index < this.buffer.length + this.offset && this.running;
    }
    /**
     * Iterates through the buffer, calling the function corresponding to the current state.
     *
     * States that are more likely to be hit are higher up, as a performance improvement.
     */
    parse() {
      for (; this.shouldContinue(); ) {
        const t = this.buffer.charCodeAt(this.index - this.offset);
        switch (this.state) {
          case d.Text: {
            this.stateText(t);
            break;
          }
          case d.SpecialStartSequence: {
            this.stateSpecialStartSequence(t);
            break;
          }
          case d.InSpecialTag: {
            this.stateInSpecialTag(t);
            break;
          }
          case d.CDATASequence: {
            this.stateCDATASequence(t);
            break;
          }
          case d.InAttributeValueDq: {
            this.stateInAttributeValueDoubleQuotes(t);
            break;
          }
          case d.InAttributeName: {
            this.stateInAttributeName(t);
            break;
          }
          case d.InCommentLike: {
            this.stateInCommentLike(t);
            break;
          }
          case d.InSpecialComment: {
            this.stateInSpecialComment(t);
            break;
          }
          case d.BeforeAttributeName: {
            this.stateBeforeAttributeName(t);
            break;
          }
          case d.InTagName: {
            this.stateInTagName(t);
            break;
          }
          case d.InClosingTagName: {
            this.stateInClosingTagName(t);
            break;
          }
          case d.BeforeTagName: {
            this.stateBeforeTagName(t);
            break;
          }
          case d.AfterAttributeName: {
            this.stateAfterAttributeName(t);
            break;
          }
          case d.InAttributeValueSq: {
            this.stateInAttributeValueSingleQuotes(t);
            break;
          }
          case d.BeforeAttributeValue: {
            this.stateBeforeAttributeValue(t);
            break;
          }
          case d.BeforeClosingTagName: {
            this.stateBeforeClosingTagName(t);
            break;
          }
          case d.AfterClosingTagName: {
            this.stateAfterClosingTagName(t);
            break;
          }
          case d.BeforeSpecialS: {
            this.stateBeforeSpecialS(t);
            break;
          }
          case d.BeforeSpecialT: {
            this.stateBeforeSpecialT(t);
            break;
          }
          case d.InAttributeValueNq: {
            this.stateInAttributeValueNoQuotes(t);
            break;
          }
          case d.InSelfClosingTag: {
            this.stateInSelfClosingTag(t);
            break;
          }
          case d.InDeclaration: {
            this.stateInDeclaration(t);
            break;
          }
          case d.BeforeDeclaration: {
            this.stateBeforeDeclaration(t);
            break;
          }
          case d.BeforeComment: {
            this.stateBeforeComment(t);
            break;
          }
          case d.InProcessingInstruction: {
            this.stateInProcessingInstruction(t);
            break;
          }
          case d.InEntity: {
            this.stateInEntity();
            break;
          }
        }
        this.index++;
      }
      this.cleanup();
    }
    finish() {
      this.state === d.InEntity && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
    }
    /** Handle any trailing data. */
    handleTrailingData() {
      const t = this.buffer.length + this.offset;
      this.sectionStart >= t || (this.state === d.InCommentLike ? this.currentSequence === D.CdataEnd ? this.cbs.oncdata(this.sectionStart, t, 0) : this.cbs.oncomment(this.sectionStart, t, 0) : this.state === d.InTagName || this.state === d.BeforeAttributeName || this.state === d.BeforeAttributeValue || this.state === d.AfterAttributeName || this.state === d.InAttributeName || this.state === d.InAttributeValueSq || this.state === d.InAttributeValueDq || this.state === d.InAttributeValueNq || this.state === d.InClosingTagName || this.cbs.ontext(this.sectionStart, t));
    }
    emitCodePoint(t, e) {
      this.baseState !== d.Text && this.baseState !== d.InSpecialTag ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + e, this.index = this.sectionStart - 1, this.cbs.onattribentity(t)) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + e, this.index = this.sectionStart - 1, this.cbs.ontextentity(t, this.sectionStart));
    }
  }
  const Y = /* @__PURE__ */ new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea"
  ]), v = /* @__PURE__ */ new Set(["p"]), Lt = /* @__PURE__ */ new Set(["thead", "tbody"]), Ot = /* @__PURE__ */ new Set(["dd", "dt"]), Mt = /* @__PURE__ */ new Set(["rt", "rp"]), er = /* @__PURE__ */ new Map([
    ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
    ["th", /* @__PURE__ */ new Set(["th"])],
    ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
    ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
    ["li", /* @__PURE__ */ new Set(["li"])],
    ["p", v],
    ["h1", v],
    ["h2", v],
    ["h3", v],
    ["h4", v],
    ["h5", v],
    ["h6", v],
    ["select", Y],
    ["input", Y],
    ["output", Y],
    ["button", Y],
    ["datalist", Y],
    ["textarea", Y],
    ["option", /* @__PURE__ */ new Set(["option"])],
    ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
    ["dd", Ot],
    ["dt", Ot],
    ["address", v],
    ["article", v],
    ["aside", v],
    ["blockquote", v],
    ["details", v],
    ["div", v],
    ["dl", v],
    ["fieldset", v],
    ["figcaption", v],
    ["figure", v],
    ["footer", v],
    ["form", v],
    ["header", v],
    ["hr", v],
    ["main", v],
    ["nav", v],
    ["ol", v],
    ["pre", v],
    ["section", v],
    ["table", v],
    ["ul", v],
    ["rt", Mt],
    ["rp", Mt],
    ["tbody", Lt],
    ["tfoot", Lt]
  ]), nr = /* @__PURE__ */ new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]), Pt = /* @__PURE__ */ new Set(["math", "svg"]), Bt = /* @__PURE__ */ new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignobject",
    "desc",
    "title"
  ]), ir = /\s|\//;
  class rr {
    constructor(t, e = {}) {
      var n, i, r, a2, s, c;
      this.options = e, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = false, this.cbs = t ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = (n = e.lowerCaseTags) !== null && n !== void 0 ? n : this.htmlMode, this.lowerCaseAttributeNames = (i = e.lowerCaseAttributeNames) !== null && i !== void 0 ? i : this.htmlMode, this.recognizeSelfClosing = (r = e.recognizeSelfClosing) !== null && r !== void 0 ? r : !this.htmlMode, this.tokenizer = new ((a2 = e.Tokenizer) !== null && a2 !== void 0 ? a2 : tr)(this.options, this), this.foreignContext = [!this.htmlMode], (c = (s = this.cbs).onparserinit) === null || c === void 0 || c.call(s, this);
    }
    // Tokenizer event handlers
    /** @internal */
    ontext(t, e) {
      var n, i;
      const r = this.getSlice(t, e);
      this.endIndex = e - 1, (i = (n = this.cbs).ontext) === null || i === void 0 || i.call(n, r), this.startIndex = e;
    }
    /** @internal */
    ontextentity(t, e) {
      var n, i;
      this.endIndex = e - 1, (i = (n = this.cbs).ontext) === null || i === void 0 || i.call(n, Hu(t)), this.startIndex = e;
    }
    /**
     * Checks if the current tag is a void element. Override this if you want
     * to specify your own additional void elements.
     */
    isVoidElement(t) {
      return this.htmlMode && nr.has(t);
    }
    /** @internal */
    onopentagname(t, e) {
      this.endIndex = e;
      let n = this.getSlice(t, e);
      this.lowerCaseTagNames && (n = n.toLowerCase()), this.emitOpenTag(n);
    }
    emitOpenTag(t) {
      var e, n, i, r;
      this.openTagStart = this.startIndex, this.tagname = t;
      const a2 = this.htmlMode && er.get(t);
      if (a2)
        for (; this.stack.length > 0 && a2.has(this.stack[0]); ) {
          const s = this.stack.shift();
          (n = (e = this.cbs).onclosetag) === null || n === void 0 || n.call(e, s, true);
        }
      this.isVoidElement(t) || (this.stack.unshift(t), this.htmlMode && (Pt.has(t) ? this.foreignContext.unshift(true) : Bt.has(t) && this.foreignContext.unshift(false))), (r = (i = this.cbs).onopentagname) === null || r === void 0 || r.call(i, t), this.cbs.onopentag && (this.attribs = {});
    }
    endOpenTag(t) {
      var e, n;
      this.startIndex = this.openTagStart, this.attribs && ((n = (e = this.cbs).onopentag) === null || n === void 0 || n.call(e, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, true), this.tagname = "";
    }
    /** @internal */
    onopentagend(t) {
      this.endIndex = t, this.endOpenTag(false), this.startIndex = t + 1;
    }
    /** @internal */
    onclosetag(t, e) {
      var n, i, r, a2, s, c, o, f2;
      this.endIndex = e;
      let h = this.getSlice(t, e);
      if (this.lowerCaseTagNames && (h = h.toLowerCase()), this.htmlMode && (Pt.has(h) || Bt.has(h)) && this.foreignContext.shift(), this.isVoidElement(h))
        this.htmlMode && h === "br" && ((a2 = (r = this.cbs).onopentagname) === null || a2 === void 0 || a2.call(r, "br"), (c = (s = this.cbs).onopentag) === null || c === void 0 || c.call(s, "br", {}, true), (f2 = (o = this.cbs).onclosetag) === null || f2 === void 0 || f2.call(o, "br", false));
      else {
        const b2 = this.stack.indexOf(h);
        if (b2 !== -1)
          for (let p = 0; p <= b2; p++) {
            const l = this.stack.shift();
            (i = (n = this.cbs).onclosetag) === null || i === void 0 || i.call(n, l, p !== b2);
          }
        else this.htmlMode && h === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(true));
      }
      this.startIndex = e + 1;
    }
    /** @internal */
    onselfclosingtag(t) {
      this.endIndex = t, this.recognizeSelfClosing || this.foreignContext[0] ? (this.closeCurrentTag(false), this.startIndex = t + 1) : this.onopentagend(t);
    }
    closeCurrentTag(t) {
      var e, n;
      const i = this.tagname;
      this.endOpenTag(t), this.stack[0] === i && ((n = (e = this.cbs).onclosetag) === null || n === void 0 || n.call(e, i, !t), this.stack.shift());
    }
    /** @internal */
    onattribname(t, e) {
      this.startIndex = t;
      const n = this.getSlice(t, e);
      this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n;
    }
    /** @internal */
    onattribdata(t, e) {
      this.attribvalue += this.getSlice(t, e);
    }
    /** @internal */
    onattribentity(t) {
      this.attribvalue += Hu(t);
    }
    /** @internal */
    onattribend(t, e) {
      var n, i;
      this.endIndex = e, (i = (n = this.cbs).onattribute) === null || i === void 0 || i.call(n, this.attribname, this.attribvalue, t === F.Double ? '"' : t === F.Single ? "'" : t === F.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
    }
    getInstructionName(t) {
      const e = t.search(ir);
      let n = e < 0 ? t : t.substr(0, e);
      return this.lowerCaseTagNames && (n = n.toLowerCase()), n;
    }
    /** @internal */
    ondeclaration(t, e) {
      this.endIndex = e;
      const n = this.getSlice(t, e);
      if (this.cbs.onprocessinginstruction) {
        const i = this.getInstructionName(n);
        this.cbs.onprocessinginstruction(`!${i}`, `!${n}`);
      }
      this.startIndex = e + 1;
    }
    /** @internal */
    onprocessinginstruction(t, e) {
      this.endIndex = e;
      const n = this.getSlice(t, e);
      if (this.cbs.onprocessinginstruction) {
        const i = this.getInstructionName(n);
        this.cbs.onprocessinginstruction(`?${i}`, `?${n}`);
      }
      this.startIndex = e + 1;
    }
    /** @internal */
    oncomment(t, e, n) {
      var i, r, a2, s;
      this.endIndex = e, (r = (i = this.cbs).oncomment) === null || r === void 0 || r.call(i, this.getSlice(t, e - n)), (s = (a2 = this.cbs).oncommentend) === null || s === void 0 || s.call(a2), this.startIndex = e + 1;
    }
    /** @internal */
    oncdata(t, e, n) {
      var i, r, a2, s, c, o, f2, h, b2, p;
      this.endIndex = e;
      const l = this.getSlice(t, e - n);
      !this.htmlMode || this.options.recognizeCDATA ? ((r = (i = this.cbs).oncdatastart) === null || r === void 0 || r.call(i), (s = (a2 = this.cbs).ontext) === null || s === void 0 || s.call(a2, l), (o = (c = this.cbs).oncdataend) === null || o === void 0 || o.call(c)) : ((h = (f2 = this.cbs).oncomment) === null || h === void 0 || h.call(f2, `[CDATA[${l}]]`), (p = (b2 = this.cbs).oncommentend) === null || p === void 0 || p.call(b2)), this.startIndex = e + 1;
    }
    /** @internal */
    onend() {
      var t, e;
      if (this.cbs.onclosetag) {
        this.endIndex = this.startIndex;
        for (let n = 0; n < this.stack.length; n++)
          this.cbs.onclosetag(this.stack[n], true);
      }
      (e = (t = this.cbs).onend) === null || e === void 0 || e.call(t);
    }
    /**
     * Resets the parser to a blank state, ready to parse a new HTML document
     */
    reset() {
      var t, e, n, i;
      (e = (t = this.cbs).onreset) === null || e === void 0 || e.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (i = (n = this.cbs).onparserinit) === null || i === void 0 || i.call(n, this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(!this.htmlMode), this.bufferOffset = 0, this.writeIndex = 0, this.ended = false;
    }
    /**
     * Resets the parser, then parses a complete document and
     * pushes it to the handler.
     *
     * @param data Document to parse.
     */
    parseComplete(t) {
      this.reset(), this.end(t);
    }
    getSlice(t, e) {
      for (; t - this.bufferOffset >= this.buffers[0].length; )
        this.shiftBuffer();
      let n = this.buffers[0].slice(t - this.bufferOffset, e - this.bufferOffset);
      for (; e - this.bufferOffset > this.buffers[0].length; )
        this.shiftBuffer(), n += this.buffers[0].slice(0, e - this.bufferOffset);
      return n;
    }
    shiftBuffer() {
      this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
    }
    /**
     * Parses a chunk of data and calls the corresponding callbacks.
     *
     * @param chunk Chunk to parse.
     */
    write(t) {
      var e, n;
      if (this.ended) {
        (n = (e = this.cbs).onerror) === null || n === void 0 || n.call(e, new Error(".write() after done!"));
        return;
      }
      this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
    }
    /**
     * Parses the end of the buffer and clears the stack, calls onend.
     *
     * @param chunk Optional final chunk to parse.
     */
    end(t) {
      var e, n;
      if (this.ended) {
        (n = (e = this.cbs).onerror) === null || n === void 0 || n.call(e, new Error(".end() after done!"));
        return;
      }
      t && this.write(t), this.ended = true, this.tokenizer.end();
    }
    /**
     * Pauses parsing. The parser won't emit events until `resume` is called.
     */
    pause() {
      this.tokenizer.pause();
    }
    /**
     * Resumes parsing after `pause` was called.
     */
    resume() {
      for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
        this.tokenizer.write(this.buffers[this.writeIndex++]);
      this.ended && this.tokenizer.end();
    }
    /**
     * Alias of `write`, for backwards compatibility.
     *
     * @param chunk Chunk to parse.
     * @deprecated
     */
    parseChunk(t) {
      this.write(t);
    }
    /**
     * Alias of `end`, for backwards compatibility.
     *
     * @param chunk Optional final chunk to parse.
     * @deprecated
     */
    done(t) {
      this.end(t);
    }
  }
  function ar(u2, t) {
    const e = new Ue(void 0, t);
    return new rr(e, t).end(u2), e.root;
  }
  const sr = Ji(yi(ar), ku);
  Math.random().toString(36).slice(2, 8);
  function cr(u2, t) {
    const e = (n, i) => t(
      n,
      () => {
        var r;
        return (r = n.children) == null ? void 0 : r.map((a2) => e(a2, n));
      },
      i
    );
    return e(u2);
  }
  const fr = {
    "div,p": ({ $node: u2 }) => ({
      queue: u2.children()
    }),
    "h1,h2,h3,h4,h5,h6": ({ $node: u2, getContent: t }) => ({
      ...t(u2.contents())
    }),
    "ul,ol": ({ $node: u2 }) => ({
      queue: u2.children(),
      nesting: true
    }),
    li: ({ $node: u2, getContent: t }) => {
      const e = u2.children().filter("ul,ol");
      let n;
      if (u2.contents().first().is("div,p"))
        n = t(u2.children().first());
      else {
        let i = u2.contents();
        const r = i.index(e);
        r >= 0 && (i = i.slice(0, r)), n = t(i);
      }
      return {
        queue: e,
        nesting: true,
        ...n
      };
    },
    "table,pre,p>img:only-child": ({ $node: u2, getContent: t }) => ({
      ...t(u2)
    })
  }, dr = {
    selector: "h1,h2,h3,h4,h5,h6,ul,ol,li,table,pre,p>img:only-child",
    selectorRules: fr
  }, Ft = "markmap: ", lr = /^h[1-6]$/, hr$1 = /^[uo]l$/, br = /^li$/;
  function pr(u2) {
    return lr.test(u2) ? +u2[1] : hr$1.test(u2) ? 8 : br.test(u2) ? 9 : 7;
  }
  function gr(u2, t) {
    const e = {
      ...dr,
      ...t
    }, n = sr(u2);
    let i = n("body");
    i.length || (i = n.root());
    let r = 0;
    const a2 = {
      id: r,
      tag: "",
      html: "",
      level: 0,
      parent: 0,
      childrenLevel: 0,
      children: []
    }, s = [];
    let c = 0;
    return p(i.children()), a2;
    function o(l) {
      var T2;
      const { parent: y } = l, w2 = {
        id: ++r,
        tag: l.tagName,
        level: l.level,
        html: l.html,
        childrenLevel: 0,
        children: l.nesting ? [] : void 0,
        parent: y.id
      };
      return (T2 = l.comments) != null && T2.length && (w2.comments = l.comments), Object.keys(l.data || {}).length && (w2.data = l.data), y.children && ((y.childrenLevel === 0 || y.childrenLevel > w2.level) && (y.children = [], y.childrenLevel = w2.level), y.childrenLevel === w2.level && y.children.push(w2)), w2;
    }
    function f2(l) {
      let y;
      for (; (y = s[s.length - 1]) && y.level >= l; )
        s.pop();
      return y || a2;
    }
    function h(l) {
      var T2;
      const y = b2(l), w2 = (T2 = n.html(y.$node)) == null ? void 0 : T2.trimEnd();
      return { comments: y.comments, html: w2 };
    }
    function b2(l) {
      const y = [];
      return l = l.filter((w2, T2) => {
        if (T2.type === "comment") {
          const I = T2.data.trim();
          if (I.startsWith(Ft))
            return y.push(I.slice(Ft.length).trim()), false;
        }
        return true;
      }), { $node: l, comments: y };
    }
    function p(l, y) {
      l.each((w2, T2) => {
        var pt;
        const I = n(T2), R2 = (pt = Object.entries(e.selectorRules).find(
          ([gt]) => I.is(gt)
        )) == null ? void 0 : pt[1], C2 = R2 == null ? void 0 : R2({ $node: I, $: n, getContent: h });
        if (C2 != null && C2.queue && !C2.nesting) {
          p(C2.queue, y);
          return;
        }
        const M2 = pr(T2.tagName);
        if (!C2) {
          M2 <= 6 && (c = M2);
          return;
        }
        if (c > 0 && M2 > c || !I.is(e.selector)) return;
        c = 0;
        const P2 = M2 <= 6;
        let Du = {
          // If the child is an inline element and expected to be a separate node,
          // data from the closest `<p>` should be included, e.g. `<p data-lines><img /></p>`
          ...I.closest("p").data(),
          ...I.data()
        }, Lu = C2.html || "";
        if (I.is("ol>li") && (y != null && y.children)) {
          const xt = +(I.parent().attr("start") || 1) + y.children.length;
          Lu = `${xt}. ${Lu}`, Du = {
            ...Du,
            listIndex: xt
          };
        }
        const bt = o({
          parent: y || f2(M2),
          nesting: !!C2.queue || P2,
          tagName: T2.tagName,
          level: M2,
          html: Lu,
          comments: C2.comments,
          data: Du
        });
        P2 && s.push(bt), C2.queue && p(C2.queue, bt);
      });
    }
  }
  function xr(u2) {
    return cr(u2, (t, e) => {
      const n = {
        content: t.html,
        children: e() || []
      };
      return t.data && (n.payload = {
        tag: t.tag,
        ...t.data
      }), t.comments && (t.comments.includes("foldAll") ? n.payload = { ...n.payload, fold: 2 } : t.comments.includes("fold") && (n.payload = { ...n.payload, fold: 1 })), n;
    });
  }
  function mr(u2, t) {
    const e = gr(u2, t);
    return xr(e);
  }
  const decodeCache = {};
  function getDecodeCache(exclude) {
    let cache = decodeCache[exclude];
    if (cache) {
      return cache;
    }
    cache = decodeCache[exclude] = [];
    for (let i = 0; i < 128; i++) {
      const ch = String.fromCharCode(i);
      cache.push(ch);
    }
    for (let i = 0; i < exclude.length; i++) {
      const ch = exclude.charCodeAt(i);
      cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
    }
    return cache;
  }
  function decode$1(string2, exclude) {
    if (typeof exclude !== "string") {
      exclude = decode$1.defaultChars;
    }
    const cache = getDecodeCache(exclude);
    return string2.replace(/(%[a-f0-9]{2})+/gi, function(seq2) {
      let result = "";
      for (let i = 0, l = seq2.length; i < l; i += 3) {
        const b1 = parseInt(seq2.slice(i + 1, i + 3), 16);
        if (b1 < 128) {
          result += cache[b1];
          continue;
        }
        if ((b1 & 224) === 192 && i + 3 < l) {
          const b2 = parseInt(seq2.slice(i + 4, i + 6), 16);
          if ((b2 & 192) === 128) {
            const chr = b1 << 6 & 1984 | b2 & 63;
            if (chr < 128) {
              result += "��";
            } else {
              result += String.fromCharCode(chr);
            }
            i += 3;
            continue;
          }
        }
        if ((b1 & 240) === 224 && i + 6 < l) {
          const b2 = parseInt(seq2.slice(i + 4, i + 6), 16);
          const b3 = parseInt(seq2.slice(i + 7, i + 9), 16);
          if ((b2 & 192) === 128 && (b3 & 192) === 128) {
            const chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
            if (chr < 2048 || chr >= 55296 && chr <= 57343) {
              result += "���";
            } else {
              result += String.fromCharCode(chr);
            }
            i += 6;
            continue;
          }
        }
        if ((b1 & 248) === 240 && i + 9 < l) {
          const b2 = parseInt(seq2.slice(i + 4, i + 6), 16);
          const b3 = parseInt(seq2.slice(i + 7, i + 9), 16);
          const b4 = parseInt(seq2.slice(i + 10, i + 12), 16);
          if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
            let chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
            if (chr < 65536 || chr > 1114111) {
              result += "����";
            } else {
              chr -= 65536;
              result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
            }
            i += 9;
            continue;
          }
        }
        result += "�";
      }
      return result;
    });
  }
  decode$1.defaultChars = ";/?:@&=+$,#";
  decode$1.componentChars = "";
  const encodeCache = {};
  function getEncodeCache(exclude) {
    let cache = encodeCache[exclude];
    if (cache) {
      return cache;
    }
    cache = encodeCache[exclude] = [];
    for (let i = 0; i < 128; i++) {
      const ch = String.fromCharCode(i);
      if (/^[0-9a-z]$/i.test(ch)) {
        cache.push(ch);
      } else {
        cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
      }
    }
    for (let i = 0; i < exclude.length; i++) {
      cache[exclude.charCodeAt(i)] = exclude[i];
    }
    return cache;
  }
  function encode$1(string2, exclude, keepEscaped) {
    if (typeof exclude !== "string") {
      keepEscaped = exclude;
      exclude = encode$1.defaultChars;
    }
    if (typeof keepEscaped === "undefined") {
      keepEscaped = true;
    }
    const cache = getEncodeCache(exclude);
    let result = "";
    for (let i = 0, l = string2.length; i < l; i++) {
      const code2 = string2.charCodeAt(i);
      if (keepEscaped && code2 === 37 && i + 2 < l) {
        if (/^[0-9a-f]{2}$/i.test(string2.slice(i + 1, i + 3))) {
          result += string2.slice(i, i + 3);
          i += 2;
          continue;
        }
      }
      if (code2 < 128) {
        result += cache[code2];
        continue;
      }
      if (code2 >= 55296 && code2 <= 57343) {
        if (code2 >= 55296 && code2 <= 56319 && i + 1 < l) {
          const nextCode = string2.charCodeAt(i + 1);
          if (nextCode >= 56320 && nextCode <= 57343) {
            result += encodeURIComponent(string2[i] + string2[i + 1]);
            i++;
            continue;
          }
        }
        result += "%EF%BF%BD";
        continue;
      }
      result += encodeURIComponent(string2[i]);
    }
    return result;
  }
  encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
  encode$1.componentChars = "-_.!~*'()";
  function format(url) {
    let result = "";
    result += url.protocol || "";
    result += url.slashes ? "//" : "";
    result += url.auth ? url.auth + "@" : "";
    if (url.hostname && url.hostname.indexOf(":") !== -1) {
      result += "[" + url.hostname + "]";
    } else {
      result += url.hostname || "";
    }
    result += url.port ? ":" + url.port : "";
    result += url.pathname || "";
    result += url.search || "";
    result += url.hash || "";
    return result;
  }
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.pathname = null;
  }
  const protocolPattern = /^([a-z0-9.+-]+:)/i;
  const portPattern = /:[0-9]*$/;
  const simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
  const delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
  const unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
  const autoEscape = ["'"].concat(unwise);
  const nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
  const hostEndingChars = ["/", "?", "#"];
  const hostnameMaxLen = 255;
  const hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
  const hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
  const hostlessProtocol = {
    javascript: true,
    "javascript:": true
  };
  const slashedProtocol = {
    http: true,
    https: true,
    ftp: true,
    gopher: true,
    file: true,
    "http:": true,
    "https:": true,
    "ftp:": true,
    "gopher:": true,
    "file:": true
  };
  function urlParse(url, slashesDenoteHost) {
    if (url && url instanceof Url) return url;
    const u2 = new Url();
    u2.parse(url, slashesDenoteHost);
    return u2;
  }
  Url.prototype.parse = function(url, slashesDenoteHost) {
    let lowerProto, hec, slashes;
    let rest = url;
    rest = rest.trim();
    if (!slashesDenoteHost && url.split("#").length === 1) {
      const simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
        }
        return this;
      }
    }
    let proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      lowerProto = proto.toLowerCase();
      this.protocol = proto;
      rest = rest.substr(proto.length);
    }
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      slashes = rest.substr(0, 2) === "//";
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }
    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
      let hostEnd = -1;
      for (let i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
          hostEnd = hec;
        }
      }
      let auth, atSign;
      if (hostEnd === -1) {
        atSign = rest.lastIndexOf("@");
      } else {
        atSign = rest.lastIndexOf("@", hostEnd);
      }
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = auth;
      }
      hostEnd = -1;
      for (let i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
          hostEnd = hec;
        }
      }
      if (hostEnd === -1) {
        hostEnd = rest.length;
      }
      if (rest[hostEnd - 1] === ":") {
        hostEnd--;
      }
      const host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);
      this.parseHost(host);
      this.hostname = this.hostname || "";
      const ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!ipv6Hostname) {
        const hostparts = this.hostname.split(/\./);
        for (let i = 0, l = hostparts.length; i < l; i++) {
          const part = hostparts[i];
          if (!part) {
            continue;
          }
          if (!part.match(hostnamePartPattern)) {
            let newpart = "";
            for (let j2 = 0, k2 = part.length; j2 < k2; j2++) {
              if (part.charCodeAt(j2) > 127) {
                newpart += "x";
              } else {
                newpart += part[j2];
              }
            }
            if (!newpart.match(hostnamePartPattern)) {
              const validParts = hostparts.slice(0, i);
              const notHost = hostparts.slice(i + 1);
              const bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = notHost.join(".") + rest;
              }
              this.hostname = validParts.join(".");
              break;
            }
          }
        }
      }
      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = "";
      }
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      }
    }
    const hash = rest.indexOf("#");
    if (hash !== -1) {
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    const qm = rest.indexOf("?");
    if (qm !== -1) {
      this.search = rest.substr(qm);
      rest = rest.slice(0, qm);
    }
    if (rest) {
      this.pathname = rest;
    }
    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
      this.pathname = "";
    }
    return this;
  };
  Url.prototype.parseHost = function(host) {
    let port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ":") {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) {
      this.hostname = host;
    }
  };
  const mdurl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    decode: decode$1,
    encode: encode$1,
    format,
    parse: urlParse
  }, Symbol.toStringTag, { value: "Module" }));
  const Any = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  const Cc = /[\0-\x1F\x7F-\x9F]/;
  const regex$1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
  const P = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
  const regex = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;
  const Z = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
  const ucmicro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Any,
    Cc,
    Cf: regex$1,
    P,
    S: regex,
    Z
  }, Symbol.toStringTag, { value: "Module" }));
  const htmlDecodeTree = new Uint16Array(
    // prettier-ignore
    'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0))
  );
  const xmlDecodeTree = new Uint16Array(
    // prettier-ignore
    "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0))
  );
  var _a;
  const decodeMap = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  const fromCodePoint$1 = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
      let output = "";
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += String.fromCharCode(codePoint);
      return output;
    }
  );
  function replaceCodePoint(codePoint) {
    var _a2;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return 65533;
    }
    return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
  }
  var CharCodes;
  (function(CharCodes2) {
    CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
    CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
    CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
    CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
    CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
    CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
    CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
    CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
    CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
    CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
    CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
  })(CharCodes || (CharCodes = {}));
  const TO_LOWER_BIT = 32;
  var BinTrieFlags;
  (function(BinTrieFlags2) {
    BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  })(BinTrieFlags || (BinTrieFlags = {}));
  function isNumber(code2) {
    return code2 >= CharCodes.ZERO && code2 <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code2) {
    return code2 >= CharCodes.UPPER_A && code2 <= CharCodes.UPPER_F || code2 >= CharCodes.LOWER_A && code2 <= CharCodes.LOWER_F;
  }
  function isAsciiAlphaNumeric(code2) {
    return code2 >= CharCodes.UPPER_A && code2 <= CharCodes.UPPER_Z || code2 >= CharCodes.LOWER_A && code2 <= CharCodes.LOWER_Z || isNumber(code2);
  }
  function isEntityInAttributeInvalidEnd(code2) {
    return code2 === CharCodes.EQUALS || isAsciiAlphaNumeric(code2);
  }
  var EntityDecoderState;
  (function(EntityDecoderState2) {
    EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  var DecodingMode;
  (function(DecodingMode2) {
    DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
    DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
    DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
  })(DecodingMode || (DecodingMode = {}));
  class EntityDecoder {
    constructor(decodeTree, emitCodePoint, errors2) {
      this.decodeTree = decodeTree;
      this.emitCodePoint = emitCodePoint;
      this.errors = errors2;
      this.state = EntityDecoderState.EntityStart;
      this.consumed = 1;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
      this.decodeMode = decodeMode;
      this.state = EntityDecoderState.EntityStart;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
      switch (this.state) {
        case EntityDecoderState.EntityStart: {
          if (str.charCodeAt(offset) === CharCodes.NUM) {
            this.state = EntityDecoderState.NumericStart;
            this.consumed += 1;
            return this.stateNumericStart(str, offset + 1);
          }
          this.state = EntityDecoderState.NamedEntity;
          return this.stateNamedEntity(str, offset);
        }
        case EntityDecoderState.NumericStart: {
          return this.stateNumericStart(str, offset);
        }
        case EntityDecoderState.NumericDecimal: {
          return this.stateNumericDecimal(str, offset);
        }
        case EntityDecoderState.NumericHex: {
          return this.stateNumericHex(str, offset);
        }
        case EntityDecoderState.NamedEntity: {
          return this.stateNamedEntity(str, offset);
        }
      }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
      if (offset >= str.length) {
        return -1;
      }
      if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
        this.state = EntityDecoderState.NumericHex;
        this.consumed += 1;
        return this.stateNumericHex(str, offset + 1);
      }
      this.state = EntityDecoderState.NumericDecimal;
      return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end, base2) {
      if (start !== end) {
        const digitCount = end - start;
        this.result = this.result * Math.pow(base2, digitCount) + parseInt(str.substr(start, digitCount), base2);
        this.consumed += digitCount;
      }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char) || isHexadecimalCharacter(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 16);
          return this.emitNumericEntity(char, 3);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 16);
      return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 10);
          return this.emitNumericEntity(char, 2);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 10);
      return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
      var _a2;
      if (this.consumed <= expectedLength) {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      if (lastCp === CharCodes.SEMI) {
        this.consumed += 1;
      } else if (this.decodeMode === DecodingMode.Strict) {
        return 0;
      }
      this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
      if (this.errors) {
        if (lastCp !== CharCodes.SEMI) {
          this.errors.missingSemicolonAfterCharacterReference();
        }
        this.errors.validateNumericCharacterReference(this.result);
      }
      return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
      const { decodeTree } = this;
      let current = decodeTree[this.treeIndex];
      let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      for (; offset < str.length; offset++, this.excess++) {
        const char = str.charCodeAt(offset);
        this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
        if (this.treeIndex < 0) {
          return this.result === 0 || // If we are parsing an attribute
          this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
          (valueLength === 0 || // And there should be no invalid characters.
          isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
        }
        current = decodeTree[this.treeIndex];
        valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        if (valueLength !== 0) {
          if (char === CharCodes.SEMI) {
            return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
          }
          if (this.decodeMode !== DecodingMode.Strict) {
            this.result = this.treeIndex;
            this.consumed += this.excess;
            this.excess = 0;
          }
        }
      }
      return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
      var _a2;
      const { result, decodeTree } = this;
      const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
      this.emitNamedEntityData(result, valueLength, this.consumed);
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
      return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
      const { decodeTree } = this;
      this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
      if (valueLength === 3) {
        this.emitCodePoint(decodeTree[result + 2], consumed);
      }
      return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
      var _a2;
      switch (this.state) {
        case EntityDecoderState.NamedEntity: {
          return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        }
        // Otherwise, emit a numeric entity if we have one.
        case EntityDecoderState.NumericDecimal: {
          return this.emitNumericEntity(0, 2);
        }
        case EntityDecoderState.NumericHex: {
          return this.emitNumericEntity(0, 3);
        }
        case EntityDecoderState.NumericStart: {
          (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
          return 0;
        }
        case EntityDecoderState.EntityStart: {
          return 0;
        }
      }
    }
  }
  function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint$1(str));
    return function decodeWithTrie(str, decodeMode) {
      let lastIndex = 0;
      let offset = 0;
      while ((offset = str.indexOf("&", offset)) >= 0) {
        ret += str.slice(lastIndex, offset);
        decoder.startEntity(decodeMode);
        const len = decoder.write(
          str,
          // Skip the "&"
          offset + 1
        );
        if (len < 0) {
          lastIndex = offset + decoder.end();
          break;
        }
        lastIndex = offset + len;
        offset = len === 0 ? lastIndex + 1 : lastIndex;
      }
      const result = ret + str.slice(lastIndex);
      ret = "";
      return result;
    };
  }
  function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    if (branchCount === 0) {
      return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    if (jumpOffset) {
      const value = char - jumpOffset;
      return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
    }
    let lo = nodeIdx;
    let hi2 = lo + branchCount - 1;
    while (lo <= hi2) {
      const mid = lo + hi2 >>> 1;
      const midVal = decodeTree[mid];
      if (midVal < char) {
        lo = mid + 1;
      } else if (midVal > char) {
        hi2 = mid - 1;
      } else {
        return decodeTree[mid + branchCount];
      }
    }
    return -1;
  }
  const htmlDecoder = getDecoder(htmlDecodeTree);
  getDecoder(xmlDecodeTree);
  function decodeHTML(str, mode = DecodingMode.Legacy) {
    return htmlDecoder(str, mode);
  }
  function _class$1(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isString$1(obj) {
    return _class$1(obj) === "[object String]";
  }
  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  function has(object, key) {
    return _hasOwnProperty.call(object, key);
  }
  function assign$1(obj) {
    const sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function(source) {
      if (!source) {
        return;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be object");
      }
      Object.keys(source).forEach(function(key) {
        obj[key] = source[key];
      });
    });
    return obj;
  }
  function arrayReplaceAt(src, pos, newElements) {
    return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
  }
  function isValidEntityCode(c) {
    if (c >= 55296 && c <= 57343) {
      return false;
    }
    if (c >= 64976 && c <= 65007) {
      return false;
    }
    if ((c & 65535) === 65535 || (c & 65535) === 65534) {
      return false;
    }
    if (c >= 0 && c <= 8) {
      return false;
    }
    if (c === 11) {
      return false;
    }
    if (c >= 14 && c <= 31) {
      return false;
    }
    if (c >= 127 && c <= 159) {
      return false;
    }
    if (c > 1114111) {
      return false;
    }
    return true;
  }
  function fromCodePoint(c) {
    if (c > 65535) {
      c -= 65536;
      const surrogate1 = 55296 + (c >> 10);
      const surrogate2 = 56320 + (c & 1023);
      return String.fromCharCode(surrogate1, surrogate2);
    }
    return String.fromCharCode(c);
  }
  const UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
  const ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
  const UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
  const DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
  function replaceEntityPattern(match, name2) {
    if (name2.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name2)) {
      const code2 = name2[1].toLowerCase() === "x" ? parseInt(name2.slice(2), 16) : parseInt(name2.slice(1), 10);
      if (isValidEntityCode(code2)) {
        return fromCodePoint(code2);
      }
      return match;
    }
    const decoded = decodeHTML(match);
    if (decoded !== match) {
      return decoded;
    }
    return match;
  }
  function unescapeMd(str) {
    if (str.indexOf("\\") < 0) {
      return str;
    }
    return str.replace(UNESCAPE_MD_RE, "$1");
  }
  function unescapeAll(str) {
    if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
      return str;
    }
    return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity2) {
      if (escaped) {
        return escaped;
      }
      return replaceEntityPattern(match, entity2);
    });
  }
  const HTML_ESCAPE_TEST_RE = /[&<>"]/;
  const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
  const HTML_REPLACEMENTS = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  function replaceUnsafeChar(ch) {
    return HTML_REPLACEMENTS[ch];
  }
  function escapeHtml(str) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
      return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    }
    return str;
  }
  const REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
  function escapeRE$1(str) {
    return str.replace(REGEXP_ESCAPE_RE, "\\$&");
  }
  function isSpace(code2) {
    switch (code2) {
      case 9:
      case 32:
        return true;
    }
    return false;
  }
  function isWhiteSpace(code2) {
    if (code2 >= 8192 && code2 <= 8202) {
      return true;
    }
    switch (code2) {
      case 9:
      // \t
      case 10:
      // \n
      case 11:
      // \v
      case 12:
      // \f
      case 13:
      // \r
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return true;
    }
    return false;
  }
  function isPunctChar(ch) {
    return P.test(ch) || regex.test(ch);
  }
  function isMdAsciiPunct(ch) {
    switch (ch) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return true;
      default:
        return false;
    }
  }
  function normalizeReference(str) {
    str = str.trim().replace(/\s+/g, " ");
    if ("ẞ".toLowerCase() === "Ṿ") {
      str = str.replace(/ẞ/g, "ß");
    }
    return str.toLowerCase().toUpperCase();
  }
  const lib = { mdurl, ucmicro };
  const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    arrayReplaceAt,
    assign: assign$1,
    escapeHtml,
    escapeRE: escapeRE$1,
    fromCodePoint,
    has,
    isMdAsciiPunct,
    isPunctChar,
    isSpace,
    isString: isString$1,
    isValidEntityCode,
    isWhiteSpace,
    lib,
    normalizeReference,
    unescapeAll,
    unescapeMd
  }, Symbol.toStringTag, { value: "Module" }));
  function parseLinkLabel(state, start, disableNested) {
    let level, found, marker, prevPos;
    const max = state.posMax;
    const oldPos = state.pos;
    state.pos = start + 1;
    level = 1;
    while (state.pos < max) {
      marker = state.src.charCodeAt(state.pos);
      if (marker === 93) {
        level--;
        if (level === 0) {
          found = true;
          break;
        }
      }
      prevPos = state.pos;
      state.md.inline.skipToken(state);
      if (marker === 91) {
        if (prevPos === state.pos - 1) {
          level++;
        } else if (disableNested) {
          state.pos = oldPos;
          return -1;
        }
      }
    }
    let labelEnd = -1;
    if (found) {
      labelEnd = state.pos;
    }
    state.pos = oldPos;
    return labelEnd;
  }
  function parseLinkDestination(str, start, max) {
    let code2;
    let pos = start;
    const result = {
      ok: false,
      pos: 0,
      str: ""
    };
    if (str.charCodeAt(pos) === 60) {
      pos++;
      while (pos < max) {
        code2 = str.charCodeAt(pos);
        if (code2 === 10) {
          return result;
        }
        if (code2 === 60) {
          return result;
        }
        if (code2 === 62) {
          result.pos = pos + 1;
          result.str = unescapeAll(str.slice(start + 1, pos));
          result.ok = true;
          return result;
        }
        if (code2 === 92 && pos + 1 < max) {
          pos += 2;
          continue;
        }
        pos++;
      }
      return result;
    }
    let level = 0;
    while (pos < max) {
      code2 = str.charCodeAt(pos);
      if (code2 === 32) {
        break;
      }
      if (code2 < 32 || code2 === 127) {
        break;
      }
      if (code2 === 92 && pos + 1 < max) {
        if (str.charCodeAt(pos + 1) === 32) {
          break;
        }
        pos += 2;
        continue;
      }
      if (code2 === 40) {
        level++;
        if (level > 32) {
          return result;
        }
      }
      if (code2 === 41) {
        if (level === 0) {
          break;
        }
        level--;
      }
      pos++;
    }
    if (start === pos) {
      return result;
    }
    if (level !== 0) {
      return result;
    }
    result.str = unescapeAll(str.slice(start, pos));
    result.pos = pos;
    result.ok = true;
    return result;
  }
  function parseLinkTitle(str, start, max, prev_state) {
    let code2;
    let pos = start;
    const state = {
      // if `true`, this is a valid link title
      ok: false,
      // if `true`, this link can be continued on the next line
      can_continue: false,
      // if `ok`, it's the position of the first character after the closing marker
      pos: 0,
      // if `ok`, it's the unescaped title
      str: "",
      // expected closing marker character code
      marker: 0
    };
    if (prev_state) {
      state.str = prev_state.str;
      state.marker = prev_state.marker;
    } else {
      if (pos >= max) {
        return state;
      }
      let marker = str.charCodeAt(pos);
      if (marker !== 34 && marker !== 39 && marker !== 40) {
        return state;
      }
      start++;
      pos++;
      if (marker === 40) {
        marker = 41;
      }
      state.marker = marker;
    }
    while (pos < max) {
      code2 = str.charCodeAt(pos);
      if (code2 === state.marker) {
        state.pos = pos + 1;
        state.str += unescapeAll(str.slice(start, pos));
        state.ok = true;
        return state;
      } else if (code2 === 40 && state.marker === 41) {
        return state;
      } else if (code2 === 92 && pos + 1 < max) {
        pos++;
      }
      pos++;
    }
    state.can_continue = true;
    state.str += unescapeAll(str.slice(start, pos));
    return state;
  }
  const helpers = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    parseLinkDestination,
    parseLinkLabel,
    parseLinkTitle
  }, Symbol.toStringTag, { value: "Module" }));
  const default_rules = {};
  default_rules.code_inline = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(token.content) + "</code>";
  };
  default_rules.code_block = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
  };
  default_rules.fence = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    const info = token.info ? unescapeAll(token.info).trim() : "";
    let langName = "";
    let langAttrs = "";
    if (info) {
      const arr = info.split(/(\s+)/g);
      langName = arr[0];
      langAttrs = arr.slice(2).join("");
    }
    let highlighted;
    if (options.highlight) {
      highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
    } else {
      highlighted = escapeHtml(token.content);
    }
    if (highlighted.indexOf("<pre") === 0) {
      return highlighted + "\n";
    }
    if (info) {
      const i = token.attrIndex("class");
      const tmpAttrs = token.attrs ? token.attrs.slice() : [];
      if (i < 0) {
        tmpAttrs.push(["class", options.langPrefix + langName]);
      } else {
        tmpAttrs[i] = tmpAttrs[i].slice();
        tmpAttrs[i][1] += " " + options.langPrefix + langName;
      }
      const tmpToken = {
        attrs: tmpAttrs
      };
      return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>
`;
    }
    return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>
`;
  };
  default_rules.image = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
    return slf.renderToken(tokens, idx, options);
  };
  default_rules.hardbreak = function(tokens, idx, options) {
    return options.xhtmlOut ? "<br />\n" : "<br>\n";
  };
  default_rules.softbreak = function(tokens, idx, options) {
    return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
  };
  default_rules.text = function(tokens, idx) {
    return escapeHtml(tokens[idx].content);
  };
  default_rules.html_block = function(tokens, idx) {
    return tokens[idx].content;
  };
  default_rules.html_inline = function(tokens, idx) {
    return tokens[idx].content;
  };
  function Renderer() {
    this.rules = assign$1({}, default_rules);
  }
  Renderer.prototype.renderAttrs = function renderAttrs(token) {
    let i, l, result;
    if (!token.attrs) {
      return "";
    }
    result = "";
    for (i = 0, l = token.attrs.length; i < l; i++) {
      result += " " + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
    }
    return result;
  };
  Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
    const token = tokens[idx];
    let result = "";
    if (token.hidden) {
      return "";
    }
    if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
      result += "\n";
    }
    result += (token.nesting === -1 ? "</" : "<") + token.tag;
    result += this.renderAttrs(token);
    if (token.nesting === 0 && options.xhtmlOut) {
      result += " /";
    }
    let needLf = false;
    if (token.block) {
      needLf = true;
      if (token.nesting === 1) {
        if (idx + 1 < tokens.length) {
          const nextToken = tokens[idx + 1];
          if (nextToken.type === "inline" || nextToken.hidden) {
            needLf = false;
          } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
            needLf = false;
          }
        }
      }
    }
    result += needLf ? ">\n" : ">";
    return result;
  };
  Renderer.prototype.renderInline = function(tokens, options, env) {
    let result = "";
    const rules = this.rules;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const type = tokens[i].type;
      if (typeof rules[type] !== "undefined") {
        result += rules[type](tokens, i, options, env, this);
      } else {
        result += this.renderToken(tokens, i, options);
      }
    }
    return result;
  };
  Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
    let result = "";
    for (let i = 0, len = tokens.length; i < len; i++) {
      switch (tokens[i].type) {
        case "text":
          result += tokens[i].content;
          break;
        case "image":
          result += this.renderInlineAsText(tokens[i].children, options, env);
          break;
        case "html_inline":
        case "html_block":
          result += tokens[i].content;
          break;
        case "softbreak":
        case "hardbreak":
          result += "\n";
          break;
      }
    }
    return result;
  };
  Renderer.prototype.render = function(tokens, options, env) {
    let result = "";
    const rules = this.rules;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const type = tokens[i].type;
      if (type === "inline") {
        result += this.renderInline(tokens[i].children, options, env);
      } else if (typeof rules[type] !== "undefined") {
        result += rules[type](tokens, i, options, env, this);
      } else {
        result += this.renderToken(tokens, i, options, env);
      }
    }
    return result;
  };
  function Ruler() {
    this.__rules__ = [];
    this.__cache__ = null;
  }
  Ruler.prototype.__find__ = function(name2) {
    for (let i = 0; i < this.__rules__.length; i++) {
      if (this.__rules__[i].name === name2) {
        return i;
      }
    }
    return -1;
  };
  Ruler.prototype.__compile__ = function() {
    const self = this;
    const chains = [""];
    self.__rules__.forEach(function(rule) {
      if (!rule.enabled) {
        return;
      }
      rule.alt.forEach(function(altName) {
        if (chains.indexOf(altName) < 0) {
          chains.push(altName);
        }
      });
    });
    self.__cache__ = {};
    chains.forEach(function(chain) {
      self.__cache__[chain] = [];
      self.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        if (chain && rule.alt.indexOf(chain) < 0) {
          return;
        }
        self.__cache__[chain].push(rule.fn);
      });
    });
  };
  Ruler.prototype.at = function(name2, fn2, options) {
    const index = this.__find__(name2);
    const opt = options || {};
    if (index === -1) {
      throw new Error("Parser rule not found: " + name2);
    }
    this.__rules__[index].fn = fn2;
    this.__rules__[index].alt = opt.alt || [];
    this.__cache__ = null;
  };
  Ruler.prototype.before = function(beforeName, ruleName, fn2, options) {
    const index = this.__find__(beforeName);
    const opt = options || {};
    if (index === -1) {
      throw new Error("Parser rule not found: " + beforeName);
    }
    this.__rules__.splice(index, 0, {
      name: ruleName,
      enabled: true,
      fn: fn2,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.after = function(afterName, ruleName, fn2, options) {
    const index = this.__find__(afterName);
    const opt = options || {};
    if (index === -1) {
      throw new Error("Parser rule not found: " + afterName);
    }
    this.__rules__.splice(index + 1, 0, {
      name: ruleName,
      enabled: true,
      fn: fn2,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.push = function(ruleName, fn2, options) {
    const opt = options || {};
    this.__rules__.push({
      name: ruleName,
      enabled: true,
      fn: fn2,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.enable = function(list2, ignoreInvalid) {
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    const result = [];
    list2.forEach(function(name2) {
      const idx = this.__find__(name2);
      if (idx < 0) {
        if (ignoreInvalid) {
          return;
        }
        throw new Error("Rules manager: invalid rule name " + name2);
      }
      this.__rules__[idx].enabled = true;
      result.push(name2);
    }, this);
    this.__cache__ = null;
    return result;
  };
  Ruler.prototype.enableOnly = function(list2, ignoreInvalid) {
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    this.__rules__.forEach(function(rule) {
      rule.enabled = false;
    });
    this.enable(list2, ignoreInvalid);
  };
  Ruler.prototype.disable = function(list2, ignoreInvalid) {
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    const result = [];
    list2.forEach(function(name2) {
      const idx = this.__find__(name2);
      if (idx < 0) {
        if (ignoreInvalid) {
          return;
        }
        throw new Error("Rules manager: invalid rule name " + name2);
      }
      this.__rules__[idx].enabled = false;
      result.push(name2);
    }, this);
    this.__cache__ = null;
    return result;
  };
  Ruler.prototype.getRules = function(chainName) {
    if (this.__cache__ === null) {
      this.__compile__();
    }
    return this.__cache__[chainName] || [];
  };
  function Token(type, tag, nesting) {
    this.type = type;
    this.tag = tag;
    this.attrs = null;
    this.map = null;
    this.nesting = nesting;
    this.level = 0;
    this.children = null;
    this.content = "";
    this.markup = "";
    this.info = "";
    this.meta = null;
    this.block = false;
    this.hidden = false;
  }
  Token.prototype.attrIndex = function attrIndex(name2) {
    if (!this.attrs) {
      return -1;
    }
    const attrs = this.attrs;
    for (let i = 0, len = attrs.length; i < len; i++) {
      if (attrs[i][0] === name2) {
        return i;
      }
    }
    return -1;
  };
  Token.prototype.attrPush = function attrPush(attrData) {
    if (this.attrs) {
      this.attrs.push(attrData);
    } else {
      this.attrs = [attrData];
    }
  };
  Token.prototype.attrSet = function attrSet(name2, value) {
    const idx = this.attrIndex(name2);
    const attrData = [name2, value];
    if (idx < 0) {
      this.attrPush(attrData);
    } else {
      this.attrs[idx] = attrData;
    }
  };
  Token.prototype.attrGet = function attrGet(name2) {
    const idx = this.attrIndex(name2);
    let value = null;
    if (idx >= 0) {
      value = this.attrs[idx][1];
    }
    return value;
  };
  Token.prototype.attrJoin = function attrJoin(name2, value) {
    const idx = this.attrIndex(name2);
    if (idx < 0) {
      this.attrPush([name2, value]);
    } else {
      this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
    }
  };
  function StateCore(src, md, env) {
    this.src = src;
    this.env = env;
    this.tokens = [];
    this.inlineMode = false;
    this.md = md;
  }
  StateCore.prototype.Token = Token;
  const NEWLINES_RE = /\r\n?|\n/g;
  const NULL_RE = /\0/g;
  function normalize(state) {
    let str;
    str = state.src.replace(NEWLINES_RE, "\n");
    str = str.replace(NULL_RE, "�");
    state.src = str;
  }
  function block(state) {
    let token;
    if (state.inlineMode) {
      token = new state.Token("inline", "", 0);
      token.content = state.src;
      token.map = [0, 1];
      token.children = [];
      state.tokens.push(token);
    } else {
      state.md.block.parse(state.src, state.md, state.env, state.tokens);
    }
  }
  function inline(state) {
    const tokens = state.tokens;
    for (let i = 0, l = tokens.length; i < l; i++) {
      const tok = tokens[i];
      if (tok.type === "inline") {
        state.md.inline.parse(tok.content, state.md, state.env, tok.children);
      }
    }
  }
  function isLinkOpen$1(str) {
    return /^<a[>\s]/i.test(str);
  }
  function isLinkClose$1(str) {
    return /^<\/a\s*>/i.test(str);
  }
  function linkify$1(state) {
    const blockTokens = state.tokens;
    if (!state.md.options.linkify) {
      return;
    }
    for (let j2 = 0, l = blockTokens.length; j2 < l; j2++) {
      if (blockTokens[j2].type !== "inline" || !state.md.linkify.pretest(blockTokens[j2].content)) {
        continue;
      }
      let tokens = blockTokens[j2].children;
      let htmlLinkLevel = 0;
      for (let i = tokens.length - 1; i >= 0; i--) {
        const currentToken = tokens[i];
        if (currentToken.type === "link_close") {
          i--;
          while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") {
            i--;
          }
          continue;
        }
        if (currentToken.type === "html_inline") {
          if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) {
            htmlLinkLevel--;
          }
          if (isLinkClose$1(currentToken.content)) {
            htmlLinkLevel++;
          }
        }
        if (htmlLinkLevel > 0) {
          continue;
        }
        if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
          const text2 = currentToken.content;
          let links = state.md.linkify.match(text2);
          const nodes = [];
          let level = currentToken.level;
          let lastPos = 0;
          if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === "text_special") {
            links = links.slice(1);
          }
          for (let ln2 = 0; ln2 < links.length; ln2++) {
            const url = links[ln2].url;
            const fullUrl = state.md.normalizeLink(url);
            if (!state.md.validateLink(fullUrl)) {
              continue;
            }
            let urlText = links[ln2].text;
            if (!links[ln2].schema) {
              urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
            } else if (links[ln2].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
              urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
            } else {
              urlText = state.md.normalizeLinkText(urlText);
            }
            const pos = links[ln2].index;
            if (pos > lastPos) {
              const token = new state.Token("text", "", 0);
              token.content = text2.slice(lastPos, pos);
              token.level = level;
              nodes.push(token);
            }
            const token_o = new state.Token("link_open", "a", 1);
            token_o.attrs = [["href", fullUrl]];
            token_o.level = level++;
            token_o.markup = "linkify";
            token_o.info = "auto";
            nodes.push(token_o);
            const token_t = new state.Token("text", "", 0);
            token_t.content = urlText;
            token_t.level = level;
            nodes.push(token_t);
            const token_c = new state.Token("link_close", "a", -1);
            token_c.level = --level;
            token_c.markup = "linkify";
            token_c.info = "auto";
            nodes.push(token_c);
            lastPos = links[ln2].lastIndex;
          }
          if (lastPos < text2.length) {
            const token = new state.Token("text", "", 0);
            token.content = text2.slice(lastPos);
            token.level = level;
            nodes.push(token);
          }
          blockTokens[j2].children = tokens = arrayReplaceAt(tokens, i, nodes);
        }
      }
    }
  }
  const RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
  const SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
  const SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
  const SCOPED_ABBR = {
    c: "©",
    r: "®",
    tm: "™"
  };
  function replaceFn(match, name2) {
    return SCOPED_ABBR[name2.toLowerCase()];
  }
  function replace_scoped(inlineTokens) {
    let inside_autolink = 0;
    for (let i = inlineTokens.length - 1; i >= 0; i--) {
      const token = inlineTokens[i];
      if (token.type === "text" && !inside_autolink) {
        token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
      }
      if (token.type === "link_open" && token.info === "auto") {
        inside_autolink--;
      }
      if (token.type === "link_close" && token.info === "auto") {
        inside_autolink++;
      }
    }
  }
  function replace_rare(inlineTokens) {
    let inside_autolink = 0;
    for (let i = inlineTokens.length - 1; i >= 0; i--) {
      const token = inlineTokens[i];
      if (token.type === "text" && !inside_autolink) {
        if (RARE_RE.test(token.content)) {
          token.content = token.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–");
        }
      }
      if (token.type === "link_open" && token.info === "auto") {
        inside_autolink--;
      }
      if (token.type === "link_close" && token.info === "auto") {
        inside_autolink++;
      }
    }
  }
  function replace(state) {
    let blkIdx;
    if (!state.md.options.typographer) {
      return;
    }
    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== "inline") {
        continue;
      }
      if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
        replace_scoped(state.tokens[blkIdx].children);
      }
      if (RARE_RE.test(state.tokens[blkIdx].content)) {
        replace_rare(state.tokens[blkIdx].children);
      }
    }
  }
  const QUOTE_TEST_RE = /['"]/;
  const QUOTE_RE = /['"]/g;
  const APOSTROPHE = "’";
  function replaceAt(str, index, ch) {
    return str.slice(0, index) + ch + str.slice(index + 1);
  }
  function process_inlines(tokens, state) {
    let j2;
    const stack = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const thisLevel = tokens[i].level;
      for (j2 = stack.length - 1; j2 >= 0; j2--) {
        if (stack[j2].level <= thisLevel) {
          break;
        }
      }
      stack.length = j2 + 1;
      if (token.type !== "text") {
        continue;
      }
      let text2 = token.content;
      let pos = 0;
      let max = text2.length;
      OUTER:
        while (pos < max) {
          QUOTE_RE.lastIndex = pos;
          const t = QUOTE_RE.exec(text2);
          if (!t) {
            break;
          }
          let canOpen = true;
          let canClose = true;
          pos = t.index + 1;
          const isSingle = t[0] === "'";
          let lastChar = 32;
          if (t.index - 1 >= 0) {
            lastChar = text2.charCodeAt(t.index - 1);
          } else {
            for (j2 = i - 1; j2 >= 0; j2--) {
              if (tokens[j2].type === "softbreak" || tokens[j2].type === "hardbreak") break;
              if (!tokens[j2].content) continue;
              lastChar = tokens[j2].content.charCodeAt(tokens[j2].content.length - 1);
              break;
            }
          }
          let nextChar = 32;
          if (pos < max) {
            nextChar = text2.charCodeAt(pos);
          } else {
            for (j2 = i + 1; j2 < tokens.length; j2++) {
              if (tokens[j2].type === "softbreak" || tokens[j2].type === "hardbreak") break;
              if (!tokens[j2].content) continue;
              nextChar = tokens[j2].content.charCodeAt(0);
              break;
            }
          }
          const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
          const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
          const isLastWhiteSpace = isWhiteSpace(lastChar);
          const isNextWhiteSpace = isWhiteSpace(nextChar);
          if (isNextWhiteSpace) {
            canOpen = false;
          } else if (isNextPunctChar) {
            if (!(isLastWhiteSpace || isLastPunctChar)) {
              canOpen = false;
            }
          }
          if (isLastWhiteSpace) {
            canClose = false;
          } else if (isLastPunctChar) {
            if (!(isNextWhiteSpace || isNextPunctChar)) {
              canClose = false;
            }
          }
          if (nextChar === 34 && t[0] === '"') {
            if (lastChar >= 48 && lastChar <= 57) {
              canClose = canOpen = false;
            }
          }
          if (canOpen && canClose) {
            canOpen = isLastPunctChar;
            canClose = isNextPunctChar;
          }
          if (!canOpen && !canClose) {
            if (isSingle) {
              token.content = replaceAt(token.content, t.index, APOSTROPHE);
            }
            continue;
          }
          if (canClose) {
            for (j2 = stack.length - 1; j2 >= 0; j2--) {
              let item = stack[j2];
              if (stack[j2].level < thisLevel) {
                break;
              }
              if (item.single === isSingle && stack[j2].level === thisLevel) {
                item = stack[j2];
                let openQuote;
                let closeQuote;
                if (isSingle) {
                  openQuote = state.md.options.quotes[2];
                  closeQuote = state.md.options.quotes[3];
                } else {
                  openQuote = state.md.options.quotes[0];
                  closeQuote = state.md.options.quotes[1];
                }
                token.content = replaceAt(token.content, t.index, closeQuote);
                tokens[item.token].content = replaceAt(
                  tokens[item.token].content,
                  item.pos,
                  openQuote
                );
                pos += closeQuote.length - 1;
                if (item.token === i) {
                  pos += openQuote.length - 1;
                }
                text2 = token.content;
                max = text2.length;
                stack.length = j2;
                continue OUTER;
              }
            }
          }
          if (canOpen) {
            stack.push({
              token: i,
              pos: t.index,
              single: isSingle,
              level: thisLevel
            });
          } else if (canClose && isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
        }
    }
  }
  function smartquotes(state) {
    if (!state.md.options.typographer) {
      return;
    }
    for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
        continue;
      }
      process_inlines(state.tokens[blkIdx].children, state);
    }
  }
  function text_join(state) {
    let curr, last;
    const blockTokens = state.tokens;
    const l = blockTokens.length;
    for (let j2 = 0; j2 < l; j2++) {
      if (blockTokens[j2].type !== "inline") continue;
      const tokens = blockTokens[j2].children;
      const max = tokens.length;
      for (curr = 0; curr < max; curr++) {
        if (tokens[curr].type === "text_special") {
          tokens[curr].type = "text";
        }
      }
      for (curr = last = 0; curr < max; curr++) {
        if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
          tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
        } else {
          if (curr !== last) {
            tokens[last] = tokens[curr];
          }
          last++;
        }
      }
      if (curr !== last) {
        tokens.length = last;
      }
    }
  }
  const _rules$2 = [
    ["normalize", normalize],
    ["block", block],
    ["inline", inline],
    ["linkify", linkify$1],
    ["replacements", replace],
    ["smartquotes", smartquotes],
    // `text_join` finds `text_special` tokens (for escape sequences)
    // and joins them with the rest of the text
    ["text_join", text_join]
  ];
  function Core() {
    this.ruler = new Ruler();
    for (let i = 0; i < _rules$2.length; i++) {
      this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
    }
  }
  Core.prototype.process = function(state) {
    const rules = this.ruler.getRules("");
    for (let i = 0, l = rules.length; i < l; i++) {
      rules[i](state);
    }
  };
  Core.prototype.State = StateCore;
  function StateBlock(src, md, env, tokens) {
    this.src = src;
    this.md = md;
    this.env = env;
    this.tokens = tokens;
    this.bMarks = [];
    this.eMarks = [];
    this.tShift = [];
    this.sCount = [];
    this.bsCount = [];
    this.blkIndent = 0;
    this.line = 0;
    this.lineMax = 0;
    this.tight = false;
    this.ddIndent = -1;
    this.listIndent = -1;
    this.parentType = "root";
    this.level = 0;
    const s = this.src;
    for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
      const ch = s.charCodeAt(pos);
      if (!indent_found) {
        if (isSpace(ch)) {
          indent++;
          if (ch === 9) {
            offset += 4 - offset % 4;
          } else {
            offset++;
          }
          continue;
        } else {
          indent_found = true;
        }
      }
      if (ch === 10 || pos === len - 1) {
        if (ch !== 10) {
          pos++;
        }
        this.bMarks.push(start);
        this.eMarks.push(pos);
        this.tShift.push(indent);
        this.sCount.push(offset);
        this.bsCount.push(0);
        indent_found = false;
        indent = 0;
        offset = 0;
        start = pos + 1;
      }
    }
    this.bMarks.push(s.length);
    this.eMarks.push(s.length);
    this.tShift.push(0);
    this.sCount.push(0);
    this.bsCount.push(0);
    this.lineMax = this.bMarks.length - 1;
  }
  StateBlock.prototype.push = function(type, tag, nesting) {
    const token = new Token(type, tag, nesting);
    token.block = true;
    if (nesting < 0) this.level--;
    token.level = this.level;
    if (nesting > 0) this.level++;
    this.tokens.push(token);
    return token;
  };
  StateBlock.prototype.isEmpty = function isEmpty2(line) {
    return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
  };
  StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
    for (let max = this.lineMax; from < max; from++) {
      if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
        break;
      }
    }
    return from;
  };
  StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
    for (let max = this.src.length; pos < max; pos++) {
      const ch = this.src.charCodeAt(pos);
      if (!isSpace(ch)) {
        break;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
    if (pos <= min) {
      return pos;
    }
    while (pos > min) {
      if (!isSpace(this.src.charCodeAt(--pos))) {
        return pos + 1;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipChars = function skipChars(pos, code2) {
    for (let max = this.src.length; pos < max; pos++) {
      if (this.src.charCodeAt(pos) !== code2) {
        break;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code2, min) {
    if (pos <= min) {
      return pos;
    }
    while (pos > min) {
      if (code2 !== this.src.charCodeAt(--pos)) {
        return pos + 1;
      }
    }
    return pos;
  };
  StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
    if (begin >= end) {
      return "";
    }
    const queue = new Array(end - begin);
    for (let i = 0, line = begin; line < end; line++, i++) {
      let lineIndent = 0;
      const lineStart = this.bMarks[line];
      let first = lineStart;
      let last;
      if (line + 1 < end || keepLastLF) {
        last = this.eMarks[line] + 1;
      } else {
        last = this.eMarks[line];
      }
      while (first < last && lineIndent < indent) {
        const ch = this.src.charCodeAt(first);
        if (isSpace(ch)) {
          if (ch === 9) {
            lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
          } else {
            lineIndent++;
          }
        } else if (first - lineStart < this.tShift[line]) {
          lineIndent++;
        } else {
          break;
        }
        first++;
      }
      if (lineIndent > indent) {
        queue[i] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
      } else {
        queue[i] = this.src.slice(first, last);
      }
    }
    return queue.join("");
  };
  StateBlock.prototype.Token = Token;
  const MAX_AUTOCOMPLETED_CELLS = 65536;
  function getLine(state, line) {
    const pos = state.bMarks[line] + state.tShift[line];
    const max = state.eMarks[line];
    return state.src.slice(pos, max);
  }
  function escapedSplit(str) {
    const result = [];
    const max = str.length;
    let pos = 0;
    let ch = str.charCodeAt(pos);
    let isEscaped = false;
    let lastPos = 0;
    let current = "";
    while (pos < max) {
      if (ch === 124) {
        if (!isEscaped) {
          result.push(current + str.substring(lastPos, pos));
          current = "";
          lastPos = pos + 1;
        } else {
          current += str.substring(lastPos, pos - 1);
          lastPos = pos;
        }
      }
      isEscaped = ch === 92;
      pos++;
      ch = str.charCodeAt(pos);
    }
    result.push(current + str.substring(lastPos));
    return result;
  }
  function table(state, startLine, endLine, silent) {
    if (startLine + 2 > endLine) {
      return false;
    }
    let nextLine = startLine + 1;
    if (state.sCount[nextLine] < state.blkIndent) {
      return false;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      return false;
    }
    let pos = state.bMarks[nextLine] + state.tShift[nextLine];
    if (pos >= state.eMarks[nextLine]) {
      return false;
    }
    const firstCh = state.src.charCodeAt(pos++);
    if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
      return false;
    }
    if (pos >= state.eMarks[nextLine]) {
      return false;
    }
    const secondCh = state.src.charCodeAt(pos++);
    if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) {
      return false;
    }
    if (firstCh === 45 && isSpace(secondCh)) {
      return false;
    }
    while (pos < state.eMarks[nextLine]) {
      const ch = state.src.charCodeAt(pos);
      if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
        return false;
      }
      pos++;
    }
    let lineText = getLine(state, startLine + 1);
    let columns = lineText.split("|");
    const aligns = [];
    for (let i = 0; i < columns.length; i++) {
      const t = columns[i].trim();
      if (!t) {
        if (i === 0 || i === columns.length - 1) {
          continue;
        } else {
          return false;
        }
      }
      if (!/^:?-+:?$/.test(t)) {
        return false;
      }
      if (t.charCodeAt(t.length - 1) === 58) {
        aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
      } else if (t.charCodeAt(0) === 58) {
        aligns.push("left");
      } else {
        aligns.push("");
      }
    }
    lineText = getLine(state, startLine).trim();
    if (lineText.indexOf("|") === -1) {
      return false;
    }
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === "") columns.shift();
    if (columns.length && columns[columns.length - 1] === "") columns.pop();
    const columnCount = columns.length;
    if (columnCount === 0 || columnCount !== aligns.length) {
      return false;
    }
    if (silent) {
      return true;
    }
    const oldParentType = state.parentType;
    state.parentType = "table";
    const terminatorRules = state.md.block.ruler.getRules("blockquote");
    const token_to = state.push("table_open", "table", 1);
    const tableLines = [startLine, 0];
    token_to.map = tableLines;
    const token_tho = state.push("thead_open", "thead", 1);
    token_tho.map = [startLine, startLine + 1];
    const token_htro = state.push("tr_open", "tr", 1);
    token_htro.map = [startLine, startLine + 1];
    for (let i = 0; i < columns.length; i++) {
      const token_ho = state.push("th_open", "th", 1);
      if (aligns[i]) {
        token_ho.attrs = [["style", "text-align:" + aligns[i]]];
      }
      const token_il = state.push("inline", "", 0);
      token_il.content = columns[i].trim();
      token_il.children = [];
      state.push("th_close", "th", -1);
    }
    state.push("tr_close", "tr", -1);
    state.push("thead_close", "thead", -1);
    let tbodyLines;
    let autocompletedCells = 0;
    for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
      lineText = getLine(state, nextLine).trim();
      if (!lineText) {
        break;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        break;
      }
      columns = escapedSplit(lineText);
      if (columns.length && columns[0] === "") columns.shift();
      if (columns.length && columns[columns.length - 1] === "") columns.pop();
      autocompletedCells += columnCount - columns.length;
      if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) {
        break;
      }
      if (nextLine === startLine + 2) {
        const token_tbo = state.push("tbody_open", "tbody", 1);
        token_tbo.map = tbodyLines = [startLine + 2, 0];
      }
      const token_tro = state.push("tr_open", "tr", 1);
      token_tro.map = [nextLine, nextLine + 1];
      for (let i = 0; i < columnCount; i++) {
        const token_tdo = state.push("td_open", "td", 1);
        if (aligns[i]) {
          token_tdo.attrs = [["style", "text-align:" + aligns[i]]];
        }
        const token_il = state.push("inline", "", 0);
        token_il.content = columns[i] ? columns[i].trim() : "";
        token_il.children = [];
        state.push("td_close", "td", -1);
      }
      state.push("tr_close", "tr", -1);
    }
    if (tbodyLines) {
      state.push("tbody_close", "tbody", -1);
      tbodyLines[1] = nextLine;
    }
    state.push("table_close", "table", -1);
    tableLines[1] = nextLine;
    state.parentType = oldParentType;
    state.line = nextLine;
    return true;
  }
  function code(state, startLine, endLine) {
    if (state.sCount[startLine] - state.blkIndent < 4) {
      return false;
    }
    let nextLine = startLine + 1;
    let last = nextLine;
    while (nextLine < endLine) {
      if (state.isEmpty(nextLine)) {
        nextLine++;
        continue;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        nextLine++;
        last = nextLine;
        continue;
      }
      break;
    }
    state.line = last;
    const token = state.push("code_block", "code", 0);
    token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
    token.map = [startLine, state.line];
    return true;
  }
  function fence(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (pos + 3 > max) {
      return false;
    }
    const marker = state.src.charCodeAt(pos);
    if (marker !== 126 && marker !== 96) {
      return false;
    }
    let mem = pos;
    pos = state.skipChars(pos, marker);
    let len = pos - mem;
    if (len < 3) {
      return false;
    }
    const markup = state.src.slice(mem, pos);
    const params = state.src.slice(pos, max);
    if (marker === 96) {
      if (params.indexOf(String.fromCharCode(marker)) >= 0) {
        return false;
      }
    }
    if (silent) {
      return true;
    }
    let nextLine = startLine;
    let haveEndMarker = false;
    for (; ; ) {
      nextLine++;
      if (nextLine >= endLine) {
        break;
      }
      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (pos < max && state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      if (state.src.charCodeAt(pos) !== marker) {
        continue;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        continue;
      }
      pos = state.skipChars(pos, marker);
      if (pos - mem < len) {
        continue;
      }
      pos = state.skipSpaces(pos);
      if (pos < max) {
        continue;
      }
      haveEndMarker = true;
      break;
    }
    len = state.sCount[startLine];
    state.line = nextLine + (haveEndMarker ? 1 : 0);
    const token = state.push("fence", "code", 0);
    token.info = params;
    token.content = state.getLines(startLine + 1, nextLine, len, true);
    token.markup = markup;
    token.map = [startLine, state.line];
    return true;
  }
  function blockquote(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    const oldLineMax = state.lineMax;
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 62) {
      return false;
    }
    if (silent) {
      return true;
    }
    const oldBMarks = [];
    const oldBSCount = [];
    const oldSCount = [];
    const oldTShift = [];
    const terminatorRules = state.md.block.ruler.getRules("blockquote");
    const oldParentType = state.parentType;
    state.parentType = "blockquote";
    let lastLineEmpty = false;
    let nextLine;
    for (nextLine = startLine; nextLine < endLine; nextLine++) {
      const isOutdented = state.sCount[nextLine] < state.blkIndent;
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (pos >= max) {
        break;
      }
      if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
        let initial = state.sCount[nextLine] + 1;
        let spaceAfterMarker;
        let adjustTab;
        if (state.src.charCodeAt(pos) === 32) {
          pos++;
          initial++;
          adjustTab = false;
          spaceAfterMarker = true;
        } else if (state.src.charCodeAt(pos) === 9) {
          spaceAfterMarker = true;
          if ((state.bsCount[nextLine] + initial) % 4 === 3) {
            pos++;
            initial++;
            adjustTab = false;
          } else {
            adjustTab = true;
          }
        } else {
          spaceAfterMarker = false;
        }
        let offset = initial;
        oldBMarks.push(state.bMarks[nextLine]);
        state.bMarks[nextLine] = pos;
        while (pos < max) {
          const ch = state.src.charCodeAt(pos);
          if (isSpace(ch)) {
            if (ch === 9) {
              offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
            } else {
              offset++;
            }
          } else {
            break;
          }
          pos++;
        }
        lastLineEmpty = pos >= max;
        oldBSCount.push(state.bsCount[nextLine]);
        state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = offset - initial;
        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = pos - state.bMarks[nextLine];
        continue;
      }
      if (lastLineEmpty) {
        break;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        state.lineMax = nextLine;
        if (state.blkIndent !== 0) {
          oldBMarks.push(state.bMarks[nextLine]);
          oldBSCount.push(state.bsCount[nextLine]);
          oldTShift.push(state.tShift[nextLine]);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] -= state.blkIndent;
        }
        break;
      }
      oldBMarks.push(state.bMarks[nextLine]);
      oldBSCount.push(state.bsCount[nextLine]);
      oldTShift.push(state.tShift[nextLine]);
      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = -1;
    }
    const oldIndent = state.blkIndent;
    state.blkIndent = 0;
    const token_o = state.push("blockquote_open", "blockquote", 1);
    token_o.markup = ">";
    const lines = [startLine, 0];
    token_o.map = lines;
    state.md.block.tokenize(state, startLine, nextLine);
    const token_c = state.push("blockquote_close", "blockquote", -1);
    token_c.markup = ">";
    state.lineMax = oldLineMax;
    state.parentType = oldParentType;
    lines[1] = state.line;
    for (let i = 0; i < oldTShift.length; i++) {
      state.bMarks[i + startLine] = oldBMarks[i];
      state.tShift[i + startLine] = oldTShift[i];
      state.sCount[i + startLine] = oldSCount[i];
      state.bsCount[i + startLine] = oldBSCount[i];
    }
    state.blkIndent = oldIndent;
    return true;
  }
  function hr(state, startLine, endLine, silent) {
    const max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    const marker = state.src.charCodeAt(pos++);
    if (marker !== 42 && marker !== 45 && marker !== 95) {
      return false;
    }
    let cnt = 1;
    while (pos < max) {
      const ch = state.src.charCodeAt(pos++);
      if (ch !== marker && !isSpace(ch)) {
        return false;
      }
      if (ch === marker) {
        cnt++;
      }
    }
    if (cnt < 3) {
      return false;
    }
    if (silent) {
      return true;
    }
    state.line = startLine + 1;
    const token = state.push("hr", "hr", 0);
    token.map = [startLine, state.line];
    token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
    return true;
  }
  function skipBulletListMarker(state, startLine) {
    const max = state.eMarks[startLine];
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    const marker = state.src.charCodeAt(pos++);
    if (marker !== 42 && marker !== 45 && marker !== 43) {
      return -1;
    }
    if (pos < max) {
      const ch = state.src.charCodeAt(pos);
      if (!isSpace(ch)) {
        return -1;
      }
    }
    return pos;
  }
  function skipOrderedListMarker(state, startLine) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    let pos = start;
    if (pos + 1 >= max) {
      return -1;
    }
    let ch = state.src.charCodeAt(pos++);
    if (ch < 48 || ch > 57) {
      return -1;
    }
    for (; ; ) {
      if (pos >= max) {
        return -1;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch >= 48 && ch <= 57) {
        if (pos - start >= 10) {
          return -1;
        }
        continue;
      }
      if (ch === 41 || ch === 46) {
        break;
      }
      return -1;
    }
    if (pos < max) {
      ch = state.src.charCodeAt(pos);
      if (!isSpace(ch)) {
        return -1;
      }
    }
    return pos;
  }
  function markTightParagraphs(state, idx) {
    const level = state.level + 2;
    for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
        state.tokens[i + 2].hidden = true;
        state.tokens[i].hidden = true;
        i += 2;
      }
    }
  }
  function list(state, startLine, endLine, silent) {
    let max, pos, start, token;
    let nextLine = startLine;
    let tight = true;
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      return false;
    }
    if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
      return false;
    }
    let isTerminatingParagraph = false;
    if (silent && state.parentType === "paragraph") {
      if (state.sCount[nextLine] >= state.blkIndent) {
        isTerminatingParagraph = true;
      }
    }
    let isOrdered;
    let markerValue;
    let posAfterMarker;
    if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
      isOrdered = true;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      markerValue = Number(state.src.slice(start, posAfterMarker - 1));
      if (isTerminatingParagraph && markerValue !== 1) return false;
    } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
      isOrdered = false;
    } else {
      return false;
    }
    if (isTerminatingParagraph) {
      if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
    }
    if (silent) {
      return true;
    }
    const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
    const listTokIdx = state.tokens.length;
    if (isOrdered) {
      token = state.push("ordered_list_open", "ol", 1);
      if (markerValue !== 1) {
        token.attrs = [["start", markerValue]];
      }
    } else {
      token = state.push("bullet_list_open", "ul", 1);
    }
    const listLines = [nextLine, 0];
    token.map = listLines;
    token.markup = String.fromCharCode(markerCharCode);
    let prevEmptyEnd = false;
    const terminatorRules = state.md.block.ruler.getRules("list");
    const oldParentType = state.parentType;
    state.parentType = "list";
    while (nextLine < endLine) {
      pos = posAfterMarker;
      max = state.eMarks[nextLine];
      const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
      let offset = initial;
      while (pos < max) {
        const ch = state.src.charCodeAt(pos);
        if (ch === 9) {
          offset += 4 - (offset + state.bsCount[nextLine]) % 4;
        } else if (ch === 32) {
          offset++;
        } else {
          break;
        }
        pos++;
      }
      const contentStart = pos;
      let indentAfterMarker;
      if (contentStart >= max) {
        indentAfterMarker = 1;
      } else {
        indentAfterMarker = offset - initial;
      }
      if (indentAfterMarker > 4) {
        indentAfterMarker = 1;
      }
      const indent = initial + indentAfterMarker;
      token = state.push("list_item_open", "li", 1);
      token.markup = String.fromCharCode(markerCharCode);
      const itemLines = [nextLine, 0];
      token.map = itemLines;
      if (isOrdered) {
        token.info = state.src.slice(start, posAfterMarker - 1);
      }
      const oldTight = state.tight;
      const oldTShift = state.tShift[nextLine];
      const oldSCount = state.sCount[nextLine];
      const oldListIndent = state.listIndent;
      state.listIndent = state.blkIndent;
      state.blkIndent = indent;
      state.tight = true;
      state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
      state.sCount[nextLine] = offset;
      if (contentStart >= max && state.isEmpty(nextLine + 1)) {
        state.line = Math.min(state.line + 2, endLine);
      } else {
        state.md.block.tokenize(state, nextLine, endLine, true);
      }
      if (!state.tight || prevEmptyEnd) {
        tight = false;
      }
      prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
      state.blkIndent = state.listIndent;
      state.listIndent = oldListIndent;
      state.tShift[nextLine] = oldTShift;
      state.sCount[nextLine] = oldSCount;
      state.tight = oldTight;
      token = state.push("list_item_close", "li", -1);
      token.markup = String.fromCharCode(markerCharCode);
      nextLine = state.line;
      itemLines[1] = nextLine;
      if (nextLine >= endLine) {
        break;
      }
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        break;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
      if (isOrdered) {
        posAfterMarker = skipOrderedListMarker(state, nextLine);
        if (posAfterMarker < 0) {
          break;
        }
        start = state.bMarks[nextLine] + state.tShift[nextLine];
      } else {
        posAfterMarker = skipBulletListMarker(state, nextLine);
        if (posAfterMarker < 0) {
          break;
        }
      }
      if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
        break;
      }
    }
    if (isOrdered) {
      token = state.push("ordered_list_close", "ol", -1);
    } else {
      token = state.push("bullet_list_close", "ul", -1);
    }
    token.markup = String.fromCharCode(markerCharCode);
    listLines[1] = nextLine;
    state.line = nextLine;
    state.parentType = oldParentType;
    if (tight) {
      markTightParagraphs(state, listTokIdx);
    }
    return true;
  }
  function reference(state, startLine, _endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    let nextLine = startLine + 1;
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 91) {
      return false;
    }
    function getNextLine(nextLine2) {
      const endLine = state.lineMax;
      if (nextLine2 >= endLine || state.isEmpty(nextLine2)) {
        return null;
      }
      let isContinuation = false;
      if (state.sCount[nextLine2] - state.blkIndent > 3) {
        isContinuation = true;
      }
      if (state.sCount[nextLine2] < 0) {
        isContinuation = true;
      }
      if (!isContinuation) {
        const terminatorRules = state.md.block.ruler.getRules("reference");
        const oldParentType = state.parentType;
        state.parentType = "reference";
        let terminate = false;
        for (let i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine2, endLine, true)) {
            terminate = true;
            break;
          }
        }
        state.parentType = oldParentType;
        if (terminate) {
          return null;
        }
      }
      const pos2 = state.bMarks[nextLine2] + state.tShift[nextLine2];
      const max2 = state.eMarks[nextLine2];
      return state.src.slice(pos2, max2 + 1);
    }
    let str = state.src.slice(pos, max + 1);
    max = str.length;
    let labelEnd = -1;
    for (pos = 1; pos < max; pos++) {
      const ch = str.charCodeAt(pos);
      if (ch === 91) {
        return false;
      } else if (ch === 93) {
        labelEnd = pos;
        break;
      } else if (ch === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      } else if (ch === 92) {
        pos++;
        if (pos < max && str.charCodeAt(pos) === 10) {
          const lineContent = getNextLine(nextLine);
          if (lineContent !== null) {
            str += lineContent;
            max = str.length;
            nextLine++;
          }
        }
      }
    }
    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
      return false;
    }
    for (pos = labelEnd + 2; pos < max; pos++) {
      const ch = str.charCodeAt(pos);
      if (ch === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      } else if (isSpace(ch)) ;
      else {
        break;
      }
    }
    const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
    if (!destRes.ok) {
      return false;
    }
    const href = state.md.normalizeLink(destRes.str);
    if (!state.md.validateLink(href)) {
      return false;
    }
    pos = destRes.pos;
    const destEndPos = pos;
    const destEndLineNo = nextLine;
    const start = pos;
    for (; pos < max; pos++) {
      const ch = str.charCodeAt(pos);
      if (ch === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      } else if (isSpace(ch)) ;
      else {
        break;
      }
    }
    let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
    while (titleRes.can_continue) {
      const lineContent = getNextLine(nextLine);
      if (lineContent === null) break;
      str += lineContent;
      pos = max;
      max = str.length;
      nextLine++;
      titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
    }
    let title;
    if (pos < max && start !== pos && titleRes.ok) {
      title = titleRes.str;
      pos = titleRes.pos;
    } else {
      title = "";
      pos = destEndPos;
      nextLine = destEndLineNo;
    }
    while (pos < max) {
      const ch = str.charCodeAt(pos);
      if (!isSpace(ch)) {
        break;
      }
      pos++;
    }
    if (pos < max && str.charCodeAt(pos) !== 10) {
      if (title) {
        title = "";
        pos = destEndPos;
        nextLine = destEndLineNo;
        while (pos < max) {
          const ch = str.charCodeAt(pos);
          if (!isSpace(ch)) {
            break;
          }
          pos++;
        }
      }
    }
    if (pos < max && str.charCodeAt(pos) !== 10) {
      return false;
    }
    const label = normalizeReference(str.slice(1, labelEnd));
    if (!label) {
      return false;
    }
    if (silent) {
      return true;
    }
    if (typeof state.env.references === "undefined") {
      state.env.references = {};
    }
    if (typeof state.env.references[label] === "undefined") {
      state.env.references[label] = { title, href };
    }
    state.line = nextLine;
    return true;
  }
  const block_names = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ];
  const attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
  const unquoted = "[^\"'=<>`\\x00-\\x20]+";
  const single_quoted = "'[^']*'";
  const double_quoted = '"[^"]*"';
  const attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
  const attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
  const open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
  const close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
  const comment = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->";
  const processing = "<[?][\\s\\S]*?[?]>";
  const declaration = "<![A-Za-z][^>]*>";
  const cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
  const HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
  const HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");
  const HTML_SEQUENCES = [
    [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
    [/^<!--/, /-->/, true],
    [/^<\?/, /\?>/, true],
    [/^<![A-Z]/, />/, true],
    [/^<!\[CDATA\[/, /\]\]>/, true],
    [new RegExp("^</?(" + block_names.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
    [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
  ];
  function html_block(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (!state.md.options.html) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 60) {
      return false;
    }
    let lineText = state.src.slice(pos, max);
    let i = 0;
    for (; i < HTML_SEQUENCES.length; i++) {
      if (HTML_SEQUENCES[i][0].test(lineText)) {
        break;
      }
    }
    if (i === HTML_SEQUENCES.length) {
      return false;
    }
    if (silent) {
      return HTML_SEQUENCES[i][2];
    }
    let nextLine = startLine + 1;
    if (!HTML_SEQUENCES[i][1].test(lineText)) {
      for (; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        lineText = state.src.slice(pos, max);
        if (HTML_SEQUENCES[i][1].test(lineText)) {
          if (lineText.length !== 0) {
            nextLine++;
          }
          break;
        }
      }
    }
    state.line = nextLine;
    const token = state.push("html_block", "", 0);
    token.map = [startLine, nextLine];
    token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
    return true;
  }
  function heading(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    let ch = state.src.charCodeAt(pos);
    if (ch !== 35 || pos >= max) {
      return false;
    }
    let level = 1;
    ch = state.src.charCodeAt(++pos);
    while (ch === 35 && pos < max && level <= 6) {
      level++;
      ch = state.src.charCodeAt(++pos);
    }
    if (level > 6 || pos < max && !isSpace(ch)) {
      return false;
    }
    if (silent) {
      return true;
    }
    max = state.skipSpacesBack(max, pos);
    const tmp = state.skipCharsBack(max, 35, pos);
    if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
      max = tmp;
    }
    state.line = startLine + 1;
    const token_o = state.push("heading_open", "h" + String(level), 1);
    token_o.markup = "########".slice(0, level);
    token_o.map = [startLine, state.line];
    const token_i = state.push("inline", "", 0);
    token_i.content = state.src.slice(pos, max).trim();
    token_i.map = [startLine, state.line];
    token_i.children = [];
    const token_c = state.push("heading_close", "h" + String(level), -1);
    token_c.markup = "########".slice(0, level);
    return true;
  }
  function lheading(state, startLine, endLine) {
    const terminatorRules = state.md.block.ruler.getRules("paragraph");
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    const oldParentType = state.parentType;
    state.parentType = "paragraph";
    let level = 0;
    let marker;
    let nextLine = startLine + 1;
    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      if (state.sCount[nextLine] - state.blkIndent > 3) {
        continue;
      }
      if (state.sCount[nextLine] >= state.blkIndent) {
        let pos = state.bMarks[nextLine] + state.tShift[nextLine];
        const max = state.eMarks[nextLine];
        if (pos < max) {
          marker = state.src.charCodeAt(pos);
          if (marker === 45 || marker === 61) {
            pos = state.skipChars(pos, marker);
            pos = state.skipSpaces(pos);
            if (pos >= max) {
              level = marker === 61 ? 1 : 2;
              break;
            }
          }
        }
      }
      if (state.sCount[nextLine] < 0) {
        continue;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
    }
    if (!level) {
      return false;
    }
    const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
    state.line = nextLine + 1;
    const token_o = state.push("heading_open", "h" + String(level), 1);
    token_o.markup = String.fromCharCode(marker);
    token_o.map = [startLine, state.line];
    const token_i = state.push("inline", "", 0);
    token_i.content = content;
    token_i.map = [startLine, state.line - 1];
    token_i.children = [];
    const token_c = state.push("heading_close", "h" + String(level), -1);
    token_c.markup = String.fromCharCode(marker);
    state.parentType = oldParentType;
    return true;
  }
  function paragraph(state, startLine, endLine) {
    const terminatorRules = state.md.block.ruler.getRules("paragraph");
    const oldParentType = state.parentType;
    let nextLine = startLine + 1;
    state.parentType = "paragraph";
    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      if (state.sCount[nextLine] - state.blkIndent > 3) {
        continue;
      }
      if (state.sCount[nextLine] < 0) {
        continue;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
    }
    const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
    state.line = nextLine;
    const token_o = state.push("paragraph_open", "p", 1);
    token_o.map = [startLine, state.line];
    const token_i = state.push("inline", "", 0);
    token_i.content = content;
    token_i.map = [startLine, state.line];
    token_i.children = [];
    state.push("paragraph_close", "p", -1);
    state.parentType = oldParentType;
    return true;
  }
  const _rules$1 = [
    // First 2 params - rule name & source. Secondary array - list of rules,
    // which can be terminated by this one.
    ["table", table, ["paragraph", "reference"]],
    ["code", code],
    ["fence", fence, ["paragraph", "reference", "blockquote", "list"]],
    ["blockquote", blockquote, ["paragraph", "reference", "blockquote", "list"]],
    ["hr", hr, ["paragraph", "reference", "blockquote", "list"]],
    ["list", list, ["paragraph", "reference", "blockquote"]],
    ["reference", reference],
    ["html_block", html_block, ["paragraph", "reference", "blockquote"]],
    ["heading", heading, ["paragraph", "reference", "blockquote"]],
    ["lheading", lheading],
    ["paragraph", paragraph]
  ];
  function ParserBlock() {
    this.ruler = new Ruler();
    for (let i = 0; i < _rules$1.length; i++) {
      this.ruler.push(_rules$1[i][0], _rules$1[i][1], { alt: (_rules$1[i][2] || []).slice() });
    }
  }
  ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
    const rules = this.ruler.getRules("");
    const len = rules.length;
    const maxNesting = state.md.options.maxNesting;
    let line = startLine;
    let hasEmptyLines = false;
    while (line < endLine) {
      state.line = line = state.skipEmptyLines(line);
      if (line >= endLine) {
        break;
      }
      if (state.sCount[line] < state.blkIndent) {
        break;
      }
      if (state.level >= maxNesting) {
        state.line = endLine;
        break;
      }
      const prevLine = state.line;
      let ok = false;
      for (let i = 0; i < len; i++) {
        ok = rules[i](state, line, endLine, false);
        if (ok) {
          if (prevLine >= state.line) {
            throw new Error("block rule didn't increment state.line");
          }
          break;
        }
      }
      if (!ok) throw new Error("none of the block rules matched");
      state.tight = !hasEmptyLines;
      if (state.isEmpty(state.line - 1)) {
        hasEmptyLines = true;
      }
      line = state.line;
      if (line < endLine && state.isEmpty(line)) {
        hasEmptyLines = true;
        line++;
        state.line = line;
      }
    }
  };
  ParserBlock.prototype.parse = function(src, md, env, outTokens) {
    if (!src) {
      return;
    }
    const state = new this.State(src, md, env, outTokens);
    this.tokenize(state, state.line, state.lineMax);
  };
  ParserBlock.prototype.State = StateBlock;
  function StateInline(src, md, env, outTokens) {
    this.src = src;
    this.env = env;
    this.md = md;
    this.tokens = outTokens;
    this.tokens_meta = Array(outTokens.length);
    this.pos = 0;
    this.posMax = this.src.length;
    this.level = 0;
    this.pending = "";
    this.pendingLevel = 0;
    this.cache = {};
    this.delimiters = [];
    this._prev_delimiters = [];
    this.backticks = {};
    this.backticksScanned = false;
    this.linkLevel = 0;
  }
  StateInline.prototype.pushPending = function() {
    const token = new Token("text", "", 0);
    token.content = this.pending;
    token.level = this.pendingLevel;
    this.tokens.push(token);
    this.pending = "";
    return token;
  };
  StateInline.prototype.push = function(type, tag, nesting) {
    if (this.pending) {
      this.pushPending();
    }
    const token = new Token(type, tag, nesting);
    let token_meta = null;
    if (nesting < 0) {
      this.level--;
      this.delimiters = this._prev_delimiters.pop();
    }
    token.level = this.level;
    if (nesting > 0) {
      this.level++;
      this._prev_delimiters.push(this.delimiters);
      this.delimiters = [];
      token_meta = { delimiters: this.delimiters };
    }
    this.pendingLevel = this.level;
    this.tokens.push(token);
    this.tokens_meta.push(token_meta);
    return token;
  };
  StateInline.prototype.scanDelims = function(start, canSplitWord) {
    const max = this.posMax;
    const marker = this.src.charCodeAt(start);
    const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
    let pos = start;
    while (pos < max && this.src.charCodeAt(pos) === marker) {
      pos++;
    }
    const count = pos - start;
    const nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
    const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
    const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
    const isLastWhiteSpace = isWhiteSpace(lastChar);
    const isNextWhiteSpace = isWhiteSpace(nextChar);
    const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
    const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
    const can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
    const can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);
    return { can_open, can_close, length: count };
  };
  StateInline.prototype.Token = Token;
  function isTerminatorChar(ch) {
    switch (ch) {
      case 10:
      case 33:
      case 35:
      case 36:
      case 37:
      case 38:
      case 42:
      case 43:
      case 45:
      case 58:
      case 60:
      case 61:
      case 62:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 125:
      case 126:
        return true;
      default:
        return false;
    }
  }
  function text(state, silent) {
    let pos = state.pos;
    while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
      pos++;
    }
    if (pos === state.pos) {
      return false;
    }
    if (!silent) {
      state.pending += state.src.slice(state.pos, pos);
    }
    state.pos = pos;
    return true;
  }
  const SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
  function linkify(state, silent) {
    if (!state.md.options.linkify) return false;
    if (state.linkLevel > 0) return false;
    const pos = state.pos;
    const max = state.posMax;
    if (pos + 3 > max) return false;
    if (state.src.charCodeAt(pos) !== 58) return false;
    if (state.src.charCodeAt(pos + 1) !== 47) return false;
    if (state.src.charCodeAt(pos + 2) !== 47) return false;
    const match = state.pending.match(SCHEME_RE);
    if (!match) return false;
    const proto = match[1];
    const link2 = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
    if (!link2) return false;
    let url = link2.url;
    if (url.length <= proto.length) return false;
    let urlEnd = url.length;
    while (urlEnd > 0 && url.charCodeAt(urlEnd - 1) === 42) {
      urlEnd--;
    }
    if (urlEnd !== url.length) {
      url = url.slice(0, urlEnd);
    }
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) return false;
    if (!silent) {
      state.pending = state.pending.slice(0, -proto.length);
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "linkify";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "linkify";
      token_c.info = "auto";
    }
    state.pos += url.length - proto.length;
    return true;
  }
  function newline(state, silent) {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) !== 10) {
      return false;
    }
    const pmax = state.pending.length - 1;
    const max = state.posMax;
    if (!silent) {
      if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
        if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
          let ws = pmax - 1;
          while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32) ws--;
          state.pending = state.pending.slice(0, ws);
          state.push("hardbreak", "br", 0);
        } else {
          state.pending = state.pending.slice(0, -1);
          state.push("softbreak", "br", 0);
        }
      } else {
        state.push("softbreak", "br", 0);
      }
    }
    pos++;
    while (pos < max && isSpace(state.src.charCodeAt(pos))) {
      pos++;
    }
    state.pos = pos;
    return true;
  }
  const ESCAPED = [];
  for (let i = 0; i < 256; i++) {
    ESCAPED.push(0);
  }
  "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
    ESCAPED[ch.charCodeAt(0)] = 1;
  });
  function escape(state, silent) {
    let pos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(pos) !== 92) return false;
    pos++;
    if (pos >= max) return false;
    let ch1 = state.src.charCodeAt(pos);
    if (ch1 === 10) {
      if (!silent) {
        state.push("hardbreak", "br", 0);
      }
      pos++;
      while (pos < max) {
        ch1 = state.src.charCodeAt(pos);
        if (!isSpace(ch1)) break;
        pos++;
      }
      state.pos = pos;
      return true;
    }
    let escapedStr = state.src[pos];
    if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
      const ch2 = state.src.charCodeAt(pos + 1);
      if (ch2 >= 56320 && ch2 <= 57343) {
        escapedStr += state.src[pos + 1];
        pos++;
      }
    }
    const origStr = "\\" + escapedStr;
    if (!silent) {
      const token = state.push("text_special", "", 0);
      if (ch1 < 256 && ESCAPED[ch1] !== 0) {
        token.content = escapedStr;
      } else {
        token.content = origStr;
      }
      token.markup = origStr;
      token.info = "escape";
    }
    state.pos = pos + 1;
    return true;
  }
  function backtick(state, silent) {
    let pos = state.pos;
    const ch = state.src.charCodeAt(pos);
    if (ch !== 96) {
      return false;
    }
    const start = pos;
    pos++;
    const max = state.posMax;
    while (pos < max && state.src.charCodeAt(pos) === 96) {
      pos++;
    }
    const marker = state.src.slice(start, pos);
    const openerLength = marker.length;
    if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
      if (!silent) state.pending += marker;
      state.pos += openerLength;
      return true;
    }
    let matchEnd = pos;
    let matchStart;
    while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
      matchEnd = matchStart + 1;
      while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
        matchEnd++;
      }
      const closerLength = matchEnd - matchStart;
      if (closerLength === openerLength) {
        if (!silent) {
          const token = state.push("code_inline", "code", 0);
          token.markup = marker;
          token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
        }
        state.pos = matchEnd;
        return true;
      }
      state.backticks[closerLength] = matchStart;
    }
    state.backticksScanned = true;
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true;
  }
  function strikethrough_tokenize(state, silent) {
    const start = state.pos;
    const marker = state.src.charCodeAt(start);
    if (silent) {
      return false;
    }
    if (marker !== 126) {
      return false;
    }
    const scanned = state.scanDelims(state.pos, true);
    let len = scanned.length;
    const ch = String.fromCharCode(marker);
    if (len < 2) {
      return false;
    }
    let token;
    if (len % 2) {
      token = state.push("text", "", 0);
      token.content = ch;
      len--;
    }
    for (let i = 0; i < len; i += 2) {
      token = state.push("text", "", 0);
      token.content = ch + ch;
      state.delimiters.push({
        marker,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close
      });
    }
    state.pos += scanned.length;
    return true;
  }
  function postProcess$1(state, delimiters) {
    let token;
    const loneMarkers = [];
    const max = delimiters.length;
    for (let i = 0; i < max; i++) {
      const startDelim = delimiters[i];
      if (startDelim.marker !== 126) {
        continue;
      }
      if (startDelim.end === -1) {
        continue;
      }
      const endDelim = delimiters[startDelim.end];
      token = state.tokens[startDelim.token];
      token.type = "s_open";
      token.tag = "s";
      token.nesting = 1;
      token.markup = "~~";
      token.content = "";
      token = state.tokens[endDelim.token];
      token.type = "s_close";
      token.tag = "s";
      token.nesting = -1;
      token.markup = "~~";
      token.content = "";
      if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
        loneMarkers.push(endDelim.token - 1);
      }
    }
    while (loneMarkers.length) {
      const i = loneMarkers.pop();
      let j2 = i + 1;
      while (j2 < state.tokens.length && state.tokens[j2].type === "s_close") {
        j2++;
      }
      j2--;
      if (i !== j2) {
        token = state.tokens[j2];
        state.tokens[j2] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
  }
  function strikethrough_postProcess(state) {
    const tokens_meta = state.tokens_meta;
    const max = state.tokens_meta.length;
    postProcess$1(state, state.delimiters);
    for (let curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        postProcess$1(state, tokens_meta[curr].delimiters);
      }
    }
  }
  const r_strikethrough = {
    tokenize: strikethrough_tokenize,
    postProcess: strikethrough_postProcess
  };
  function emphasis_tokenize(state, silent) {
    const start = state.pos;
    const marker = state.src.charCodeAt(start);
    if (silent) {
      return false;
    }
    if (marker !== 95 && marker !== 42) {
      return false;
    }
    const scanned = state.scanDelims(state.pos, marker === 42);
    for (let i = 0; i < scanned.length; i++) {
      const token = state.push("text", "", 0);
      token.content = String.fromCharCode(marker);
      state.delimiters.push({
        // Char code of the starting marker (number).
        //
        marker,
        // Total length of these series of delimiters.
        //
        length: scanned.length,
        // A position of the token this delimiter corresponds to.
        //
        token: state.tokens.length - 1,
        // If this delimiter is matched as a valid opener, `end` will be
        // equal to its position, otherwise it's `-1`.
        //
        end: -1,
        // Boolean flags that determine if this delimiter could open or close
        // an emphasis.
        //
        open: scanned.can_open,
        close: scanned.can_close
      });
    }
    state.pos += scanned.length;
    return true;
  }
  function postProcess(state, delimiters) {
    const max = delimiters.length;
    for (let i = max - 1; i >= 0; i--) {
      const startDelim = delimiters[i];
      if (startDelim.marker !== 95 && startDelim.marker !== 42) {
        continue;
      }
      if (startDelim.end === -1) {
        continue;
      }
      const endDelim = delimiters[startDelim.end];
      const isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
      delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
      delimiters[startDelim.end + 1].token === endDelim.token + 1;
      const ch = String.fromCharCode(startDelim.marker);
      const token_o = state.tokens[startDelim.token];
      token_o.type = isStrong ? "strong_open" : "em_open";
      token_o.tag = isStrong ? "strong" : "em";
      token_o.nesting = 1;
      token_o.markup = isStrong ? ch + ch : ch;
      token_o.content = "";
      const token_c = state.tokens[endDelim.token];
      token_c.type = isStrong ? "strong_close" : "em_close";
      token_c.tag = isStrong ? "strong" : "em";
      token_c.nesting = -1;
      token_c.markup = isStrong ? ch + ch : ch;
      token_c.content = "";
      if (isStrong) {
        state.tokens[delimiters[i - 1].token].content = "";
        state.tokens[delimiters[startDelim.end + 1].token].content = "";
        i--;
      }
    }
  }
  function emphasis_post_process(state) {
    const tokens_meta = state.tokens_meta;
    const max = state.tokens_meta.length;
    postProcess(state, state.delimiters);
    for (let curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        postProcess(state, tokens_meta[curr].delimiters);
      }
    }
  }
  const r_emphasis = {
    tokenize: emphasis_tokenize,
    postProcess: emphasis_post_process
  };
  function link(state, silent) {
    let code2, label, res, ref;
    let href = "";
    let title = "";
    let start = state.pos;
    let parseReference = true;
    if (state.src.charCodeAt(state.pos) !== 91) {
      return false;
    }
    const oldPos = state.pos;
    const max = state.posMax;
    const labelStart = state.pos + 1;
    const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
    if (labelEnd < 0) {
      return false;
    }
    let pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 40) {
      parseReference = false;
      pos++;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (!isSpace(code2) && code2 !== 10) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }
      start = pos;
      res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = "";
        }
        start = pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;
          for (; pos < max; pos++) {
            code2 = state.src.charCodeAt(pos);
            if (!isSpace(code2) && code2 !== 10) {
              break;
            }
          }
        }
      }
      if (pos >= max || state.src.charCodeAt(pos) !== 41) {
        parseReference = true;
      }
      pos++;
    }
    if (parseReference) {
      if (typeof state.env.references === "undefined") {
        return false;
      }
      if (pos < max && state.src.charCodeAt(pos) === 91) {
        start = pos + 1;
        pos = state.md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }
      if (!label) {
        label = state.src.slice(labelStart, labelEnd);
      }
      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }
    if (!silent) {
      state.pos = labelStart;
      state.posMax = labelEnd;
      const token_o = state.push("link_open", "a", 1);
      const attrs = [["href", href]];
      token_o.attrs = attrs;
      if (title) {
        attrs.push(["title", title]);
      }
      state.linkLevel++;
      state.md.inline.tokenize(state);
      state.linkLevel--;
      state.push("link_close", "a", -1);
    }
    state.pos = pos;
    state.posMax = max;
    return true;
  }
  function image(state, silent) {
    let code2, content, label, pos, ref, res, title, start;
    let href = "";
    const oldPos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(state.pos) !== 33) {
      return false;
    }
    if (state.src.charCodeAt(state.pos + 1) !== 91) {
      return false;
    }
    const labelStart = state.pos + 2;
    const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
    if (labelEnd < 0) {
      return false;
    }
    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 40) {
      pos++;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (!isSpace(code2) && code2 !== 10) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }
      start = pos;
      res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = "";
        }
      }
      start = pos;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (!isSpace(code2) && code2 !== 10) {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
      } else {
        title = "";
      }
      if (pos >= max || state.src.charCodeAt(pos) !== 41) {
        state.pos = oldPos;
        return false;
      }
      pos++;
    } else {
      if (typeof state.env.references === "undefined") {
        return false;
      }
      if (pos < max && state.src.charCodeAt(pos) === 91) {
        start = pos + 1;
        pos = state.md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }
      if (!label) {
        label = state.src.slice(labelStart, labelEnd);
      }
      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }
    if (!silent) {
      content = state.src.slice(labelStart, labelEnd);
      const tokens = [];
      state.md.inline.parse(
        content,
        state.md,
        state.env,
        tokens
      );
      const token = state.push("image", "img", 0);
      const attrs = [["src", href], ["alt", ""]];
      token.attrs = attrs;
      token.children = tokens;
      token.content = content;
      if (title) {
        attrs.push(["title", title]);
      }
    }
    state.pos = pos;
    state.posMax = max;
    return true;
  }
  const EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
  const AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
  function autolink(state, silent) {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) !== 60) {
      return false;
    }
    const start = state.pos;
    const max = state.posMax;
    for (; ; ) {
      if (++pos >= max) return false;
      const ch = state.src.charCodeAt(pos);
      if (ch === 60) return false;
      if (ch === 62) break;
    }
    const url = state.src.slice(start + 1, pos);
    if (AUTOLINK_RE.test(url)) {
      const fullUrl = state.md.normalizeLink(url);
      if (!state.md.validateLink(fullUrl)) {
        return false;
      }
      if (!silent) {
        const token_o = state.push("link_open", "a", 1);
        token_o.attrs = [["href", fullUrl]];
        token_o.markup = "autolink";
        token_o.info = "auto";
        const token_t = state.push("text", "", 0);
        token_t.content = state.md.normalizeLinkText(url);
        const token_c = state.push("link_close", "a", -1);
        token_c.markup = "autolink";
        token_c.info = "auto";
      }
      state.pos += url.length + 2;
      return true;
    }
    if (EMAIL_RE.test(url)) {
      const fullUrl = state.md.normalizeLink("mailto:" + url);
      if (!state.md.validateLink(fullUrl)) {
        return false;
      }
      if (!silent) {
        const token_o = state.push("link_open", "a", 1);
        token_o.attrs = [["href", fullUrl]];
        token_o.markup = "autolink";
        token_o.info = "auto";
        const token_t = state.push("text", "", 0);
        token_t.content = state.md.normalizeLinkText(url);
        const token_c = state.push("link_close", "a", -1);
        token_c.markup = "autolink";
        token_c.info = "auto";
      }
      state.pos += url.length + 2;
      return true;
    }
    return false;
  }
  function isLinkOpen(str) {
    return /^<a[>\s]/i.test(str);
  }
  function isLinkClose(str) {
    return /^<\/a\s*>/i.test(str);
  }
  function isLetter(ch) {
    const lc = ch | 32;
    return lc >= 97 && lc <= 122;
  }
  function html_inline(state, silent) {
    if (!state.md.options.html) {
      return false;
    }
    const max = state.posMax;
    const pos = state.pos;
    if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
      return false;
    }
    const ch = state.src.charCodeAt(pos + 1);
    if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
      return false;
    }
    const match = state.src.slice(pos).match(HTML_TAG_RE);
    if (!match) {
      return false;
    }
    if (!silent) {
      const token = state.push("html_inline", "", 0);
      token.content = match[0];
      if (isLinkOpen(token.content)) state.linkLevel++;
      if (isLinkClose(token.content)) state.linkLevel--;
    }
    state.pos += match[0].length;
    return true;
  }
  const DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
  const NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
  function entity(state, silent) {
    const pos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(pos) !== 38) return false;
    if (pos + 1 >= max) return false;
    const ch = state.src.charCodeAt(pos + 1);
    if (ch === 35) {
      const match = state.src.slice(pos).match(DIGITAL_RE);
      if (match) {
        if (!silent) {
          const code2 = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
          const token = state.push("text_special", "", 0);
          token.content = isValidEntityCode(code2) ? fromCodePoint(code2) : fromCodePoint(65533);
          token.markup = match[0];
          token.info = "entity";
        }
        state.pos += match[0].length;
        return true;
      }
    } else {
      const match = state.src.slice(pos).match(NAMED_RE);
      if (match) {
        const decoded = decodeHTML(match[0]);
        if (decoded !== match[0]) {
          if (!silent) {
            const token = state.push("text_special", "", 0);
            token.content = decoded;
            token.markup = match[0];
            token.info = "entity";
          }
          state.pos += match[0].length;
          return true;
        }
      }
    }
    return false;
  }
  function processDelimiters(delimiters) {
    const openersBottom = {};
    const max = delimiters.length;
    if (!max) return;
    let headerIdx = 0;
    let lastTokenIdx = -2;
    const jumps = [];
    for (let closerIdx = 0; closerIdx < max; closerIdx++) {
      const closer = delimiters[closerIdx];
      jumps.push(0);
      if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
        headerIdx = closerIdx;
      }
      lastTokenIdx = closer.token;
      closer.length = closer.length || 0;
      if (!closer.close) continue;
      if (!openersBottom.hasOwnProperty(closer.marker)) {
        openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
      }
      const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
      let openerIdx = headerIdx - jumps[headerIdx] - 1;
      let newMinOpenerIdx = openerIdx;
      for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
        const opener = delimiters[openerIdx];
        if (opener.marker !== closer.marker) continue;
        if (opener.open && opener.end < 0) {
          let isOddMatch = false;
          if (opener.close || closer.open) {
            if ((opener.length + closer.length) % 3 === 0) {
              if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
                isOddMatch = true;
              }
            }
          }
          if (!isOddMatch) {
            const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
            jumps[closerIdx] = closerIdx - openerIdx + lastJump;
            jumps[openerIdx] = lastJump;
            closer.open = false;
            opener.end = closerIdx;
            opener.close = false;
            newMinOpenerIdx = -1;
            lastTokenIdx = -2;
            break;
          }
        }
      }
      if (newMinOpenerIdx !== -1) {
        openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
      }
    }
  }
  function link_pairs(state) {
    const tokens_meta = state.tokens_meta;
    const max = state.tokens_meta.length;
    processDelimiters(state.delimiters);
    for (let curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        processDelimiters(tokens_meta[curr].delimiters);
      }
    }
  }
  function fragments_join(state) {
    let curr, last;
    let level = 0;
    const tokens = state.tokens;
    const max = state.tokens.length;
    for (curr = last = 0; curr < max; curr++) {
      if (tokens[curr].nesting < 0) level--;
      tokens[curr].level = level;
      if (tokens[curr].nesting > 0) level++;
      if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) {
          tokens[last] = tokens[curr];
        }
        last++;
      }
    }
    if (curr !== last) {
      tokens.length = last;
    }
  }
  const _rules = [
    ["text", text],
    ["linkify", linkify],
    ["newline", newline],
    ["escape", escape],
    ["backticks", backtick],
    ["strikethrough", r_strikethrough.tokenize],
    ["emphasis", r_emphasis.tokenize],
    ["link", link],
    ["image", image],
    ["autolink", autolink],
    ["html_inline", html_inline],
    ["entity", entity]
  ];
  const _rules2 = [
    ["balance_pairs", link_pairs],
    ["strikethrough", r_strikethrough.postProcess],
    ["emphasis", r_emphasis.postProcess],
    // rules for pairs separate '**' into its own text tokens, which may be left unused,
    // rule below merges unused segments back with the rest of the text
    ["fragments_join", fragments_join]
  ];
  function ParserInline() {
    this.ruler = new Ruler();
    for (let i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }
    this.ruler2 = new Ruler();
    for (let i = 0; i < _rules2.length; i++) {
      this.ruler2.push(_rules2[i][0], _rules2[i][1]);
    }
  }
  ParserInline.prototype.skipToken = function(state) {
    const pos = state.pos;
    const rules = this.ruler.getRules("");
    const len = rules.length;
    const maxNesting = state.md.options.maxNesting;
    const cache = state.cache;
    if (typeof cache[pos] !== "undefined") {
      state.pos = cache[pos];
      return;
    }
    let ok = false;
    if (state.level < maxNesting) {
      for (let i = 0; i < len; i++) {
        state.level++;
        ok = rules[i](state, true);
        state.level--;
        if (ok) {
          if (pos >= state.pos) {
            throw new Error("inline rule didn't increment state.pos");
          }
          break;
        }
      }
    } else {
      state.pos = state.posMax;
    }
    if (!ok) {
      state.pos++;
    }
    cache[pos] = state.pos;
  };
  ParserInline.prototype.tokenize = function(state) {
    const rules = this.ruler.getRules("");
    const len = rules.length;
    const end = state.posMax;
    const maxNesting = state.md.options.maxNesting;
    while (state.pos < end) {
      const prevPos = state.pos;
      let ok = false;
      if (state.level < maxNesting) {
        for (let i = 0; i < len; i++) {
          ok = rules[i](state, false);
          if (ok) {
            if (prevPos >= state.pos) {
              throw new Error("inline rule didn't increment state.pos");
            }
            break;
          }
        }
      }
      if (ok) {
        if (state.pos >= end) {
          break;
        }
        continue;
      }
      state.pending += state.src[state.pos++];
    }
    if (state.pending) {
      state.pushPending();
    }
  };
  ParserInline.prototype.parse = function(str, md, env, outTokens) {
    const state = new this.State(str, md, env, outTokens);
    this.tokenize(state);
    const rules = this.ruler2.getRules("");
    const len = rules.length;
    for (let i = 0; i < len; i++) {
      rules[i](state);
    }
  };
  ParserInline.prototype.State = StateInline;
  function reFactory(opts) {
    const re2 = {};
    opts = opts || {};
    re2.src_Any = Any.source;
    re2.src_Cc = Cc.source;
    re2.src_Z = Z.source;
    re2.src_P = P.source;
    re2.src_ZPCc = [re2.src_Z, re2.src_P, re2.src_Cc].join("|");
    re2.src_ZCc = [re2.src_Z, re2.src_Cc].join("|");
    const text_separators = "[><｜]";
    re2.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re2.src_ZPCc + ")" + re2.src_Any + ")";
    re2.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    re2.src_auth = "(?:(?:(?!" + re2.src_ZCc + "|[@/\\[\\]()]).)+@)?";
    re2.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
    re2.src_host_terminator = "(?=$|" + text_separators + "|" + re2.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re2.src_ZPCc + "))";
    re2.src_path = "(?:[/?#](?:(?!" + re2.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + re2.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re2.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re2.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re2.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re2.src_ZCc + "|[']).)+\\'|\\'(?=" + re2.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re2.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
    ",(?!" + re2.src_ZCc + "|$)|;(?!" + re2.src_ZCc + "|$)|\\!+(?!" + re2.src_ZCc + "|[!]|$)|\\?(?!" + re2.src_ZCc + "|[?]|$))+|\\/)?";
    re2.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
    re2.src_xn = "xn--[a-z0-9\\-]{1,59}";
    re2.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + re2.src_xn + "|" + re2.src_pseudo_letter + "{1,63})";
    re2.src_domain = "(?:" + re2.src_xn + "|(?:" + re2.src_pseudo_letter + ")|(?:" + re2.src_pseudo_letter + "(?:-|" + re2.src_pseudo_letter + "){0,61}" + re2.src_pseudo_letter + "))";
    re2.src_host = "(?:(?:(?:(?:" + re2.src_domain + ")\\.)*" + re2.src_domain + "))";
    re2.tpl_host_fuzzy = "(?:" + re2.src_ip4 + "|(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%)))";
    re2.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%))";
    re2.src_host_strict = re2.src_host + re2.src_host_terminator;
    re2.tpl_host_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_host_terminator;
    re2.src_host_port_strict = re2.src_host + re2.src_port + re2.src_host_terminator;
    re2.tpl_host_port_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_port + re2.src_host_terminator;
    re2.tpl_host_port_no_ip_fuzzy_strict = re2.tpl_host_no_ip_fuzzy + re2.src_port + re2.src_host_terminator;
    re2.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re2.src_ZPCc + "|>|$))";
    re2.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re2.src_ZCc + ")(" + re2.src_email_name + "@" + re2.tpl_host_fuzzy_strict + ")";
    re2.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_fuzzy_strict + re2.src_path + ")";
    re2.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_no_ip_fuzzy_strict + re2.src_path + ")";
    return re2;
  }
  function assign(obj) {
    const sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function(source) {
      if (!source) {
        return;
      }
      Object.keys(source).forEach(function(key) {
        obj[key] = source[key];
      });
    });
    return obj;
  }
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isString(obj) {
    return _class(obj) === "[object String]";
  }
  function isObject(obj) {
    return _class(obj) === "[object Object]";
  }
  function isRegExp(obj) {
    return _class(obj) === "[object RegExp]";
  }
  function isFunction(obj) {
    return _class(obj) === "[object Function]";
  }
  function escapeRE(str) {
    return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  const defaultOptions = {
    fuzzyLink: true,
    fuzzyEmail: true,
    fuzzyIP: false
  };
  function isOptionsObj(obj) {
    return Object.keys(obj || {}).reduce(function(acc, k2) {
      return acc || defaultOptions.hasOwnProperty(k2);
    }, false);
  }
  const defaultSchemas = {
    "http:": {
      validate: function(text2, pos, self) {
        const tail = text2.slice(pos);
        if (!self.re.http) {
          self.re.http = new RegExp(
            "^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path,
            "i"
          );
        }
        if (self.re.http.test(tail)) {
          return tail.match(self.re.http)[0].length;
        }
        return 0;
      }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function(text2, pos, self) {
        const tail = text2.slice(pos);
        if (!self.re.no_http) {
          self.re.no_http = new RegExp(
            "^" + self.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
            // with code comments
            "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path,
            "i"
          );
        }
        if (self.re.no_http.test(tail)) {
          if (pos >= 3 && text2[pos - 3] === ":") {
            return 0;
          }
          if (pos >= 3 && text2[pos - 3] === "/") {
            return 0;
          }
          return tail.match(self.re.no_http)[0].length;
        }
        return 0;
      }
    },
    "mailto:": {
      validate: function(text2, pos, self) {
        const tail = text2.slice(pos);
        if (!self.re.mailto) {
          self.re.mailto = new RegExp(
            "^" + self.re.src_email_name + "@" + self.re.src_host_strict,
            "i"
          );
        }
        if (self.re.mailto.test(tail)) {
          return tail.match(self.re.mailto)[0].length;
        }
        return 0;
      }
    }
  };
  const tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
  const tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
  function resetScanCache(self) {
    self.__index__ = -1;
    self.__text_cache__ = "";
  }
  function createValidator(re2) {
    return function(text2, pos) {
      const tail = text2.slice(pos);
      if (re2.test(tail)) {
        return tail.match(re2)[0].length;
      }
      return 0;
    };
  }
  function createNormalizer() {
    return function(match, self) {
      self.normalize(match);
    };
  }
  function compile(self) {
    const re2 = self.re = reFactory(self.__opts__);
    const tlds = self.__tlds__.slice();
    self.onCompile();
    if (!self.__tlds_replaced__) {
      tlds.push(tlds_2ch_src_re);
    }
    tlds.push(re2.src_xn);
    re2.src_tlds = tlds.join("|");
    function untpl(tpl) {
      return tpl.replace("%TLDS%", re2.src_tlds);
    }
    re2.email_fuzzy = RegExp(untpl(re2.tpl_email_fuzzy), "i");
    re2.link_fuzzy = RegExp(untpl(re2.tpl_link_fuzzy), "i");
    re2.link_no_ip_fuzzy = RegExp(untpl(re2.tpl_link_no_ip_fuzzy), "i");
    re2.host_fuzzy_test = RegExp(untpl(re2.tpl_host_fuzzy_test), "i");
    const aliases = [];
    self.__compiled__ = {};
    function schemaError(name2, val) {
      throw new Error('(LinkifyIt) Invalid schema "' + name2 + '": ' + val);
    }
    Object.keys(self.__schemas__).forEach(function(name2) {
      const val = self.__schemas__[name2];
      if (val === null) {
        return;
      }
      const compiled = { validate: null, link: null };
      self.__compiled__[name2] = compiled;
      if (isObject(val)) {
        if (isRegExp(val.validate)) {
          compiled.validate = createValidator(val.validate);
        } else if (isFunction(val.validate)) {
          compiled.validate = val.validate;
        } else {
          schemaError(name2, val);
        }
        if (isFunction(val.normalize)) {
          compiled.normalize = val.normalize;
        } else if (!val.normalize) {
          compiled.normalize = createNormalizer();
        } else {
          schemaError(name2, val);
        }
        return;
      }
      if (isString(val)) {
        aliases.push(name2);
        return;
      }
      schemaError(name2, val);
    });
    aliases.forEach(function(alias) {
      if (!self.__compiled__[self.__schemas__[alias]]) {
        return;
      }
      self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
      self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
    });
    self.__compiled__[""] = { validate: null, normalize: createNormalizer() };
    const slist = Object.keys(self.__compiled__).filter(function(name2) {
      return name2.length > 0 && self.__compiled__[name2];
    }).map(escapeRE).join("|");
    self.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "i");
    self.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "ig");
    self.re.schema_at_start = RegExp("^" + self.re.schema_search.source, "i");
    self.re.pretest = RegExp(
      "(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@",
      "i"
    );
    resetScanCache(self);
  }
  function Match(self, shift) {
    const start = self.__index__;
    const end = self.__last_index__;
    const text2 = self.__text_cache__.slice(start, end);
    this.schema = self.__schema__.toLowerCase();
    this.index = start + shift;
    this.lastIndex = end + shift;
    this.raw = text2;
    this.text = text2;
    this.url = text2;
  }
  function createMatch(self, shift) {
    const match = new Match(self, shift);
    self.__compiled__[match.schema].normalize(match, self);
    return match;
  }
  function LinkifyIt(schemas2, options) {
    if (!(this instanceof LinkifyIt)) {
      return new LinkifyIt(schemas2, options);
    }
    if (!options) {
      if (isOptionsObj(schemas2)) {
        options = schemas2;
        schemas2 = {};
      }
    }
    this.__opts__ = assign({}, defaultOptions, options);
    this.__index__ = -1;
    this.__last_index__ = -1;
    this.__schema__ = "";
    this.__text_cache__ = "";
    this.__schemas__ = assign({}, defaultSchemas, schemas2);
    this.__compiled__ = {};
    this.__tlds__ = tlds_default;
    this.__tlds_replaced__ = false;
    this.re = {};
    compile(this);
  }
  LinkifyIt.prototype.add = function add(schema2, definition) {
    this.__schemas__[schema2] = definition;
    compile(this);
    return this;
  };
  LinkifyIt.prototype.set = function set2(options) {
    this.__opts__ = assign(this.__opts__, options);
    return this;
  };
  LinkifyIt.prototype.test = function test(text2) {
    this.__text_cache__ = text2;
    this.__index__ = -1;
    if (!text2.length) {
      return false;
    }
    let m2, ml, me2, len, shift, next, re2, tld_pos, at_pos;
    if (this.re.schema_test.test(text2)) {
      re2 = this.re.schema_search;
      re2.lastIndex = 0;
      while ((m2 = re2.exec(text2)) !== null) {
        len = this.testSchemaAt(text2, m2[2], re2.lastIndex);
        if (len) {
          this.__schema__ = m2[2];
          this.__index__ = m2.index + m2[1].length;
          this.__last_index__ = m2.index + m2[0].length + len;
          break;
        }
      }
    }
    if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
      tld_pos = text2.search(this.re.host_fuzzy_test);
      if (tld_pos >= 0) {
        if (this.__index__ < 0 || tld_pos < this.__index__) {
          if ((ml = text2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
            shift = ml.index + ml[1].length;
            if (this.__index__ < 0 || shift < this.__index__) {
              this.__schema__ = "";
              this.__index__ = shift;
              this.__last_index__ = ml.index + ml[0].length;
            }
          }
        }
      }
    }
    if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
      at_pos = text2.indexOf("@");
      if (at_pos >= 0) {
        if ((me2 = text2.match(this.re.email_fuzzy)) !== null) {
          shift = me2.index + me2[1].length;
          next = me2.index + me2[0].length;
          if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
            this.__schema__ = "mailto:";
            this.__index__ = shift;
            this.__last_index__ = next;
          }
        }
      }
    }
    return this.__index__ >= 0;
  };
  LinkifyIt.prototype.pretest = function pretest(text2) {
    return this.re.pretest.test(text2);
  };
  LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text2, schema2, pos) {
    if (!this.__compiled__[schema2.toLowerCase()]) {
      return 0;
    }
    return this.__compiled__[schema2.toLowerCase()].validate(text2, pos, this);
  };
  LinkifyIt.prototype.match = function match(text2) {
    const result = [];
    let shift = 0;
    if (this.__index__ >= 0 && this.__text_cache__ === text2) {
      result.push(createMatch(this, shift));
      shift = this.__last_index__;
    }
    let tail = shift ? text2.slice(shift) : text2;
    while (this.test(tail)) {
      result.push(createMatch(this, shift));
      tail = tail.slice(this.__last_index__);
      shift += this.__last_index__;
    }
    if (result.length) {
      return result;
    }
    return null;
  };
  LinkifyIt.prototype.matchAtStart = function matchAtStart(text2) {
    this.__text_cache__ = text2;
    this.__index__ = -1;
    if (!text2.length) return null;
    const m2 = this.re.schema_at_start.exec(text2);
    if (!m2) return null;
    const len = this.testSchemaAt(text2, m2[2], m2[0].length);
    if (!len) return null;
    this.__schema__ = m2[2];
    this.__index__ = m2.index + m2[1].length;
    this.__last_index__ = m2.index + m2[0].length + len;
    return createMatch(this, 0);
  };
  LinkifyIt.prototype.tlds = function tlds(list2, keepOld) {
    list2 = Array.isArray(list2) ? list2 : [list2];
    if (!keepOld) {
      this.__tlds__ = list2.slice();
      this.__tlds_replaced__ = true;
      compile(this);
      return this;
    }
    this.__tlds__ = this.__tlds__.concat(list2).sort().filter(function(el, idx, arr) {
      return el !== arr[idx - 1];
    }).reverse();
    compile(this);
    return this;
  };
  LinkifyIt.prototype.normalize = function normalize2(match) {
    if (!match.schema) {
      match.url = "http://" + match.url;
    }
    if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) {
      match.url = "mailto:" + match.url;
    }
  };
  LinkifyIt.prototype.onCompile = function onCompile() {
  };
  const maxInt = 2147483647;
  const base = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;
  const delimiter = "-";
  const regexPunycode = /^xn--/;
  const regexNonASCII = /[^\0-\x7F]/;
  const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
  const errors = {
    "overflow": "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
  };
  const baseMinusTMin = base - tMin;
  const floor = Math.floor;
  const stringFromCharCode = String.fromCharCode;
  function error(type) {
    throw new RangeError(errors[type]);
  }
  function map$1(array, callback) {
    const result = [];
    let length = array.length;
    while (length--) {
      result[length] = callback(array[length]);
    }
    return result;
  }
  function mapDomain(domain, callback) {
    const parts = domain.split("@");
    let result = "";
    if (parts.length > 1) {
      result = parts[0] + "@";
      domain = parts[1];
    }
    domain = domain.replace(regexSeparators, ".");
    const labels = domain.split(".");
    const encoded = map$1(labels, callback).join(".");
    return result + encoded;
  }
  function ucs2decode(string2) {
    const output = [];
    let counter = 0;
    const length = string2.length;
    while (counter < length) {
      const value = string2.charCodeAt(counter++);
      if (value >= 55296 && value <= 56319 && counter < length) {
        const extra = string2.charCodeAt(counter++);
        if ((extra & 64512) == 56320) {
          output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  const ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
  const basicToDigit = function(codePoint) {
    if (codePoint >= 48 && codePoint < 58) {
      return 26 + (codePoint - 48);
    }
    if (codePoint >= 65 && codePoint < 91) {
      return codePoint - 65;
    }
    if (codePoint >= 97 && codePoint < 123) {
      return codePoint - 97;
    }
    return base;
  };
  const digitToBasic = function(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  };
  const adapt = function(delta, numPoints, firstTime) {
    let k2 = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (; delta > baseMinusTMin * tMax >> 1; k2 += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k2 + (baseMinusTMin + 1) * delta / (delta + skew));
  };
  const decode = function(input) {
    const output = [];
    const inputLength = input.length;
    let i = 0;
    let n = initialN;
    let bias = initialBias;
    let basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }
    for (let j2 = 0; j2 < basic; ++j2) {
      if (input.charCodeAt(j2) >= 128) {
        error("not-basic");
      }
      output.push(input.charCodeAt(j2));
    }
    for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
      const oldi = i;
      for (let w2 = 1, k2 = base; ; k2 += base) {
        if (index >= inputLength) {
          error("invalid-input");
        }
        const digit = basicToDigit(input.charCodeAt(index++));
        if (digit >= base) {
          error("invalid-input");
        }
        if (digit > floor((maxInt - i) / w2)) {
          error("overflow");
        }
        i += digit * w2;
        const t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
        if (digit < t) {
          break;
        }
        const baseMinusT = base - t;
        if (w2 > floor(maxInt / baseMinusT)) {
          error("overflow");
        }
        w2 *= baseMinusT;
      }
      const out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);
      if (floor(i / out) > maxInt - n) {
        error("overflow");
      }
      n += floor(i / out);
      i %= out;
      output.splice(i++, 0, n);
    }
    return String.fromCodePoint(...output);
  };
  const encode = function(input) {
    const output = [];
    input = ucs2decode(input);
    const inputLength = input.length;
    let n = initialN;
    let delta = 0;
    let bias = initialBias;
    for (const currentValue of input) {
      if (currentValue < 128) {
        output.push(stringFromCharCode(currentValue));
      }
    }
    const basicLength = output.length;
    let handledCPCount = basicLength;
    if (basicLength) {
      output.push(delimiter);
    }
    while (handledCPCount < inputLength) {
      let m2 = maxInt;
      for (const currentValue of input) {
        if (currentValue >= n && currentValue < m2) {
          m2 = currentValue;
        }
      }
      const handledCPCountPlusOne = handledCPCount + 1;
      if (m2 - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error("overflow");
      }
      delta += (m2 - n) * handledCPCountPlusOne;
      n = m2;
      for (const currentValue of input) {
        if (currentValue < n && ++delta > maxInt) {
          error("overflow");
        }
        if (currentValue === n) {
          let q2 = delta;
          for (let k2 = base; ; k2 += base) {
            const t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
            if (q2 < t) {
              break;
            }
            const qMinusT = q2 - t;
            const baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
            );
            q2 = floor(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q2, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n;
    }
    return output.join("");
  };
  const toUnicode = function(input) {
    return mapDomain(input, function(string2) {
      return regexPunycode.test(string2) ? decode(string2.slice(4).toLowerCase()) : string2;
    });
  };
  const toASCII = function(input) {
    return mapDomain(input, function(string2) {
      return regexNonASCII.test(string2) ? "xn--" + encode(string2) : string2;
    });
  };
  const punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    "version": "2.3.1",
    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    "ucs2": {
      "decode": ucs2decode,
      "encode": ucs2encode
    },
    "decode": decode,
    "encode": encode,
    "toASCII": toASCII,
    "toUnicode": toUnicode
  };
  const cfg_default = {
    options: {
      // Enable HTML tags in source
      html: false,
      // Use '/' to close single tags (<br />)
      xhtmlOut: false,
      // Convert '\n' in paragraphs into <br>
      breaks: false,
      // CSS language prefix for fenced blocks
      langPrefix: "language-",
      // autoconvert URL-like texts to links
      linkify: false,
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      // Internal protection, recursion limit
      maxNesting: 100
    },
    components: {
      core: {},
      block: {},
      inline: {}
    }
  };
  const cfg_zero = {
    options: {
      // Enable HTML tags in source
      html: false,
      // Use '/' to close single tags (<br />)
      xhtmlOut: false,
      // Convert '\n' in paragraphs into <br>
      breaks: false,
      // CSS language prefix for fenced blocks
      langPrefix: "language-",
      // autoconvert URL-like texts to links
      linkify: false,
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      // Internal protection, recursion limit
      maxNesting: 20
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "text"
        ],
        rules2: [
          "balance_pairs",
          "fragments_join"
        ]
      }
    }
  };
  const cfg_commonmark = {
    options: {
      // Enable HTML tags in source
      html: true,
      // Use '/' to close single tags (<br />)
      xhtmlOut: true,
      // Convert '\n' in paragraphs into <br>
      breaks: false,
      // CSS language prefix for fenced blocks
      langPrefix: "language-",
      // autoconvert URL-like texts to links
      linkify: false,
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      // Internal protection, recursion limit
      maxNesting: 20
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "blockquote",
          "code",
          "fence",
          "heading",
          "hr",
          "html_block",
          "lheading",
          "list",
          "reference",
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "html_inline",
          "image",
          "link",
          "newline",
          "text"
        ],
        rules2: [
          "balance_pairs",
          "emphasis",
          "fragments_join"
        ]
      }
    }
  };
  const config$2 = {
    default: cfg_default,
    zero: cfg_zero,
    commonmark: cfg_commonmark
  };
  const BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
  const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
  function validateLink(url) {
    const str = url.trim().toLowerCase();
    return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
  }
  const RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
  function normalizeLink(url) {
    const parsed = urlParse(url, true);
    if (parsed.hostname) {
      if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
        try {
          parsed.hostname = punycode.toASCII(parsed.hostname);
        } catch (er2) {
        }
      }
    }
    return encode$1(format(parsed));
  }
  function normalizeLinkText(url) {
    const parsed = urlParse(url, true);
    if (parsed.hostname) {
      if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
        try {
          parsed.hostname = punycode.toUnicode(parsed.hostname);
        } catch (er2) {
        }
      }
    }
    return decode$1(format(parsed), decode$1.defaultChars + "%");
  }
  function MarkdownIt(presetName, options) {
    if (!(this instanceof MarkdownIt)) {
      return new MarkdownIt(presetName, options);
    }
    if (!options) {
      if (!isString$1(presetName)) {
        options = presetName || {};
        presetName = "default";
      }
    }
    this.inline = new ParserInline();
    this.block = new ParserBlock();
    this.core = new Core();
    this.renderer = new Renderer();
    this.linkify = new LinkifyIt();
    this.validateLink = validateLink;
    this.normalizeLink = normalizeLink;
    this.normalizeLinkText = normalizeLinkText;
    this.utils = utils;
    this.helpers = assign$1({}, helpers);
    this.options = {};
    this.configure(presetName);
    if (options) {
      this.set(options);
    }
  }
  MarkdownIt.prototype.set = function(options) {
    assign$1(this.options, options);
    return this;
  };
  MarkdownIt.prototype.configure = function(presets) {
    const self = this;
    if (isString$1(presets)) {
      const presetName = presets;
      presets = config$2[presetName];
      if (!presets) {
        throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
      }
    }
    if (!presets) {
      throw new Error("Wrong `markdown-it` preset, can't be empty");
    }
    if (presets.options) {
      self.set(presets.options);
    }
    if (presets.components) {
      Object.keys(presets.components).forEach(function(name2) {
        if (presets.components[name2].rules) {
          self[name2].ruler.enableOnly(presets.components[name2].rules);
        }
        if (presets.components[name2].rules2) {
          self[name2].ruler2.enableOnly(presets.components[name2].rules2);
        }
      });
    }
    return this;
  };
  MarkdownIt.prototype.enable = function(list2, ignoreInvalid) {
    let result = [];
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    ["core", "block", "inline"].forEach(function(chain) {
      result = result.concat(this[chain].ruler.enable(list2, true));
    }, this);
    result = result.concat(this.inline.ruler2.enable(list2, true));
    const missed = list2.filter(function(name2) {
      return result.indexOf(name2) < 0;
    });
    if (missed.length && !ignoreInvalid) {
      throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
    }
    return this;
  };
  MarkdownIt.prototype.disable = function(list2, ignoreInvalid) {
    let result = [];
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    ["core", "block", "inline"].forEach(function(chain) {
      result = result.concat(this[chain].ruler.disable(list2, true));
    }, this);
    result = result.concat(this.inline.ruler2.disable(list2, true));
    const missed = list2.filter(function(name2) {
      return result.indexOf(name2) < 0;
    });
    if (missed.length && !ignoreInvalid) {
      throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
    }
    return this;
  };
  MarkdownIt.prototype.use = function(plugin2) {
    const args = [this].concat(Array.prototype.slice.call(arguments, 1));
    plugin2.apply(plugin2, args);
    return this;
  };
  MarkdownIt.prototype.parse = function(src, env) {
    if (typeof src !== "string") {
      throw new Error("Input data should be a String");
    }
    const state = new this.core.State(src, this, env);
    this.core.process(state);
    return state.tokens;
  };
  MarkdownIt.prototype.render = function(src, env) {
    env = env || {};
    return this.renderer.render(this.parse(src, env), this.options, env);
  };
  MarkdownIt.prototype.parseInline = function(src, env) {
    const state = new this.core.State(src, this, env);
    state.inlineMode = true;
    this.core.process(state);
    return state.tokens;
  };
  MarkdownIt.prototype.renderInline = function(src, env) {
    env = env || {};
    return this.renderer.render(this.parseInline(src, env), this.options, env);
  };
  function ins_plugin$1(md) {
    function tokenize(state, silent) {
      const start = state.pos;
      const marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 43) {
        return false;
      }
      const scanned = state.scanDelims(state.pos, true);
      let len = scanned.length;
      const ch = String.fromCharCode(marker);
      if (len < 2) {
        return false;
      }
      if (len % 2) {
        const token = state.push("text", "", 0);
        token.content = ch;
        len--;
      }
      for (let i = 0; i < len; i += 2) {
        const token = state.push("text", "", 0);
        token.content = ch + ch;
        if (!scanned.can_open && !scanned.can_close) {
          continue;
        }
        state.delimiters.push({
          marker,
          length: 0,
          // disable "rule of 3" length checks meant for emphasis
          jump: i / 2,
          // 1 delimiter = 2 characters
          token: state.tokens.length - 1,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    }
    function postProcess2(state, delimiters) {
      let token;
      const loneMarkers = [];
      const max = delimiters.length;
      for (let i = 0; i < max; i++) {
        const startDelim = delimiters[i];
        if (startDelim.marker !== 43) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        const endDelim = delimiters[startDelim.end];
        token = state.tokens[startDelim.token];
        token.type = "ins_open";
        token.tag = "ins";
        token.nesting = 1;
        token.markup = "++";
        token.content = "";
        token = state.tokens[endDelim.token];
        token.type = "ins_close";
        token.tag = "ins";
        token.nesting = -1;
        token.markup = "++";
        token.content = "";
        if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "+") {
          loneMarkers.push(endDelim.token - 1);
        }
      }
      while (loneMarkers.length) {
        const i = loneMarkers.pop();
        let j2 = i + 1;
        while (j2 < state.tokens.length && state.tokens[j2].type === "ins_close") {
          j2++;
        }
        j2--;
        if (i !== j2) {
          token = state.tokens[j2];
          state.tokens[j2] = state.tokens[i];
          state.tokens[i] = token;
        }
      }
    }
    md.inline.ruler.before("emphasis", "ins", tokenize);
    md.inline.ruler2.before("emphasis", "ins", function(state) {
      const tokens_meta = state.tokens_meta;
      const max = (state.tokens_meta || []).length;
      postProcess2(state, state.delimiters);
      for (let curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess2(state, tokens_meta[curr].delimiters);
        }
      }
    });
  }
  function ins_plugin(md) {
    function tokenize(state, silent) {
      const start = state.pos;
      const marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 61) {
        return false;
      }
      const scanned = state.scanDelims(state.pos, true);
      let len = scanned.length;
      const ch = String.fromCharCode(marker);
      if (len < 2) {
        return false;
      }
      if (len % 2) {
        const token = state.push("text", "", 0);
        token.content = ch;
        len--;
      }
      for (let i = 0; i < len; i += 2) {
        const token = state.push("text", "", 0);
        token.content = ch + ch;
        if (!scanned.can_open && !scanned.can_close) {
          continue;
        }
        state.delimiters.push({
          marker,
          length: 0,
          // disable "rule of 3" length checks meant for emphasis
          jump: i / 2,
          // 1 delimiter = 2 characters
          token: state.tokens.length - 1,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    }
    function postProcess2(state, delimiters) {
      const loneMarkers = [];
      const max = delimiters.length;
      for (let i = 0; i < max; i++) {
        const startDelim = delimiters[i];
        if (startDelim.marker !== 61) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        const endDelim = delimiters[startDelim.end];
        const token_o = state.tokens[startDelim.token];
        token_o.type = "mark_open";
        token_o.tag = "mark";
        token_o.nesting = 1;
        token_o.markup = "==";
        token_o.content = "";
        const token_c = state.tokens[endDelim.token];
        token_c.type = "mark_close";
        token_c.tag = "mark";
        token_c.nesting = -1;
        token_c.markup = "==";
        token_c.content = "";
        if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "=") {
          loneMarkers.push(endDelim.token - 1);
        }
      }
      while (loneMarkers.length) {
        const i = loneMarkers.pop();
        let j2 = i + 1;
        while (j2 < state.tokens.length && state.tokens[j2].type === "mark_close") {
          j2++;
        }
        j2--;
        if (i !== j2) {
          const token = state.tokens[j2];
          state.tokens[j2] = state.tokens[i];
          state.tokens[i] = token;
        }
      }
    }
    md.inline.ruler.before("emphasis", "mark", tokenize);
    md.inline.ruler2.before("emphasis", "mark", function(state) {
      let curr;
      const tokens_meta = state.tokens_meta;
      const max = (state.tokens_meta || []).length;
      postProcess2(state, state.delimiters);
      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess2(state, tokens_meta[curr].delimiters);
        }
      }
    });
  }
  const UNESCAPE_RE$1 = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
  function subscript(state, silent) {
    const max = state.posMax;
    const start = state.pos;
    if (state.src.charCodeAt(start) !== 126) {
      return false;
    }
    if (silent) {
      return false;
    }
    if (start + 2 >= max) {
      return false;
    }
    state.pos = start + 1;
    let found = false;
    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === 126) {
        found = true;
        break;
      }
      state.md.inline.skipToken(state);
    }
    if (!found || start + 1 === state.pos) {
      state.pos = start;
      return false;
    }
    const content = state.src.slice(start + 1, state.pos);
    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + 1;
    const token_so = state.push("sub_open", "sub", 1);
    token_so.markup = "~";
    const token_t = state.push("text", "", 0);
    token_t.content = content.replace(UNESCAPE_RE$1, "$1");
    const token_sc = state.push("sub_close", "sub", -1);
    token_sc.markup = "~";
    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
  }
  function sub_plugin(md) {
    md.inline.ruler.after("emphasis", "sub", subscript);
  }
  const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
  function superscript(state, silent) {
    const max = state.posMax;
    const start = state.pos;
    if (state.src.charCodeAt(start) !== 94) {
      return false;
    }
    if (silent) {
      return false;
    }
    if (start + 2 >= max) {
      return false;
    }
    state.pos = start + 1;
    let found = false;
    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === 94) {
        found = true;
        break;
      }
      state.md.inline.skipToken(state);
    }
    if (!found || start + 1 === state.pos) {
      state.pos = start;
      return false;
    }
    const content = state.src.slice(start + 1, state.pos);
    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + 1;
    const token_so = state.push("sup_open", "sup", 1);
    token_so.markup = "^";
    const token_t = state.push("text", "", 0);
    token_t.content = content.replace(UNESCAPE_RE, "$1");
    const token_sc = state.push("sup_close", "sup", -1);
    token_sc.markup = "^";
    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
  }
  function sup_plugin(md) {
    md.inline.ruler.after("emphasis", "sup", superscript);
  }
  function initializeMarkdownIt() {
    const md = MarkdownIt({
      html: true,
      breaks: true
    });
    md.use(ins_plugin$1).use(ins_plugin).use(sub_plugin).use(sup_plugin);
    return md;
  }
  function createTransformHooks(transformer) {
    return {
      transformer,
      parser: new X$1(),
      beforeParse: new X$1(),
      afterParse: new X$1(),
      retransform: new X$1()
    };
  }
  function definePlugin(plugin2) {
    return plugin2;
  }
  const svgMarked = '<svg width="16" height="16" viewBox="0 -3 24 24"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"/></svg>\n';
  const svgUnmarked = '<svg width="16" height="16" viewBox="0 -3 24 24"><path fill-rule="evenodd" d="M6 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5z" clip-rule="evenodd"/></svg>\n';
  const name$5 = "checkbox";
  const images = {
    " ": svgUnmarked.trim(),
    x: svgMarked.trim()
  };
  const plugin$3 = definePlugin({
    name: name$5,
    transform(transformHooks) {
      transformHooks.parser.tap((md) => {
        md.core.ruler.before("inline", "checkbox", (state) => {
          for (let i = 2; i < state.tokens.length; i += 1) {
            const token = state.tokens[i];
            if (token.type === "inline" && token.content) {
              const prevType = state.tokens[i - 1].type;
              const prevPrevType = state.tokens[i - 2].type;
              if (prevType === "heading_open" || prevType === "paragraph_open" && prevPrevType === "list_item_open") {
                token.content = token.content.replace(
                  /^\[(.)\] /,
                  (m2, g2) => images[g2] ? `${images[g2]} ` : m2
                );
              }
            }
          }
          return false;
        });
      });
      return {};
    }
  });
  const ALIAS = Symbol.for("yaml.alias");
  const DOC = Symbol.for("yaml.document");
  const MAP = Symbol.for("yaml.map");
  const PAIR = Symbol.for("yaml.pair");
  const SCALAR$1 = Symbol.for("yaml.scalar");
  const SEQ = Symbol.for("yaml.seq");
  const NODE_TYPE = Symbol.for("yaml.node.type");
  const isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
  const isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
  const isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
  const isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
  const isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR$1;
  const isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
  function isCollection(node) {
    if (node && typeof node === "object")
      switch (node[NODE_TYPE]) {
        case MAP:
        case SEQ:
          return true;
      }
    return false;
  }
  function isNode(node) {
    if (node && typeof node === "object")
      switch (node[NODE_TYPE]) {
        case ALIAS:
        case MAP:
        case SCALAR$1:
        case SEQ:
          return true;
      }
    return false;
  }
  const hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
  const BREAK = Symbol("break visit");
  const SKIP = Symbol("skip children");
  const REMOVE = Symbol("remove node");
  function visit(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (isDocument(node)) {
      const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
      if (cd === REMOVE)
        node.contents = null;
    } else
      visit_(null, node, visitor_, Object.freeze([]));
  }
  visit.BREAK = BREAK;
  visit.SKIP = SKIP;
  visit.REMOVE = REMOVE;
  function visit_(key, node, visitor, path) {
    const ctrl = callVisitor(key, node, visitor, path);
    if (isNode(ctrl) || isPair(ctrl)) {
      replaceNode(key, path, ctrl);
      return visit_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== "symbol") {
      if (isCollection(node)) {
        path = Object.freeze(path.concat(node));
        for (let i = 0; i < node.items.length; ++i) {
          const ci2 = visit_(i, node.items[i], visitor, path);
          if (typeof ci2 === "number")
            i = ci2 - 1;
          else if (ci2 === BREAK)
            return BREAK;
          else if (ci2 === REMOVE) {
            node.items.splice(i, 1);
            i -= 1;
          }
        }
      } else if (isPair(node)) {
        path = Object.freeze(path.concat(node));
        const ck = visit_("key", node.key, visitor, path);
        if (ck === BREAK)
          return BREAK;
        else if (ck === REMOVE)
          node.key = null;
        const cv = visit_("value", node.value, visitor, path);
        if (cv === BREAK)
          return BREAK;
        else if (cv === REMOVE)
          node.value = null;
      }
    }
    return ctrl;
  }
  function initVisitor(visitor) {
    if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
      return Object.assign({
        Alias: visitor.Node,
        Map: visitor.Node,
        Scalar: visitor.Node,
        Seq: visitor.Node
      }, visitor.Value && {
        Map: visitor.Value,
        Scalar: visitor.Value,
        Seq: visitor.Value
      }, visitor.Collection && {
        Map: visitor.Collection,
        Seq: visitor.Collection
      }, visitor);
    }
    return visitor;
  }
  function callVisitor(key, node, visitor, path) {
    var _a2, _b, _c, _d, _e2;
    if (typeof visitor === "function")
      return visitor(key, node, path);
    if (isMap(node))
      return (_a2 = visitor.Map) == null ? void 0 : _a2.call(visitor, key, node, path);
    if (isSeq(node))
      return (_b = visitor.Seq) == null ? void 0 : _b.call(visitor, key, node, path);
    if (isPair(node))
      return (_c = visitor.Pair) == null ? void 0 : _c.call(visitor, key, node, path);
    if (isScalar(node))
      return (_d = visitor.Scalar) == null ? void 0 : _d.call(visitor, key, node, path);
    if (isAlias(node))
      return (_e2 = visitor.Alias) == null ? void 0 : _e2.call(visitor, key, node, path);
    return void 0;
  }
  function replaceNode(key, path, node) {
    const parent = path[path.length - 1];
    if (isCollection(parent)) {
      parent.items[key] = node;
    } else if (isPair(parent)) {
      if (key === "key")
        parent.key = node;
      else
        parent.value = node;
    } else if (isDocument(parent)) {
      parent.contents = node;
    } else {
      const pt = isAlias(parent) ? "alias" : "scalar";
      throw new Error(`Cannot replace node with ${pt} parent`);
    }
  }
  const escapeChars = {
    "!": "%21",
    ",": "%2C",
    "[": "%5B",
    "]": "%5D",
    "{": "%7B",
    "}": "%7D"
  };
  const escapeTagName = (tn2) => tn2.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
  class Directives {
    constructor(yaml, tags) {
      this.docStart = null;
      this.docEnd = false;
      this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
      this.tags = Object.assign({}, Directives.defaultTags, tags);
    }
    clone() {
      const copy = new Directives(this.yaml, this.tags);
      copy.docStart = this.docStart;
      return copy;
    }
    /**
     * During parsing, get a Directives instance for the current document and
     * update the stream state according to the current version's spec.
     */
    atDocument() {
      const res = new Directives(this.yaml, this.tags);
      switch (this.yaml.version) {
        case "1.1":
          this.atNextDocument = true;
          break;
        case "1.2":
          this.atNextDocument = false;
          this.yaml = {
            explicit: Directives.defaultYaml.explicit,
            version: "1.2"
          };
          this.tags = Object.assign({}, Directives.defaultTags);
          break;
      }
      return res;
    }
    /**
     * @param onError - May be called even if the action was successful
     * @returns `true` on success
     */
    add(line, onError) {
      if (this.atNextDocument) {
        this.yaml = { explicit: Directives.defaultYaml.explicit, version: "1.1" };
        this.tags = Object.assign({}, Directives.defaultTags);
        this.atNextDocument = false;
      }
      const parts = line.trim().split(/[ \t]+/);
      const name2 = parts.shift();
      switch (name2) {
        case "%TAG": {
          if (parts.length !== 2) {
            onError(0, "%TAG directive should contain exactly two parts");
            if (parts.length < 2)
              return false;
          }
          const [handle, prefix] = parts;
          this.tags[handle] = prefix;
          return true;
        }
        case "%YAML": {
          this.yaml.explicit = true;
          if (parts.length !== 1) {
            onError(0, "%YAML directive should contain exactly one part");
            return false;
          }
          const [version] = parts;
          if (version === "1.1" || version === "1.2") {
            this.yaml.version = version;
            return true;
          } else {
            const isValid = /^\d+\.\d+$/.test(version);
            onError(6, `Unsupported YAML version ${version}`, isValid);
            return false;
          }
        }
        default:
          onError(0, `Unknown directive ${name2}`, true);
          return false;
      }
    }
    /**
     * Resolves a tag, matching handles to those defined in %TAG directives.
     *
     * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
     *   `'!local'` tag, or `null` if unresolvable.
     */
    tagName(source, onError) {
      if (source === "!")
        return "!";
      if (source[0] !== "!") {
        onError(`Not a valid tag: ${source}`);
        return null;
      }
      if (source[1] === "<") {
        const verbatim = source.slice(2, -1);
        if (verbatim === "!" || verbatim === "!!") {
          onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
          return null;
        }
        if (source[source.length - 1] !== ">")
          onError("Verbatim tags must end with a >");
        return verbatim;
      }
      const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
      if (!suffix)
        onError(`The ${source} tag has no suffix`);
      const prefix = this.tags[handle];
      if (prefix) {
        try {
          return prefix + decodeURIComponent(suffix);
        } catch (error2) {
          onError(String(error2));
          return null;
        }
      }
      if (handle === "!")
        return source;
      onError(`Could not resolve tag: ${source}`);
      return null;
    }
    /**
     * Given a fully resolved tag, returns its printable string form,
     * taking into account current tag prefixes and defaults.
     */
    tagString(tag) {
      for (const [handle, prefix] of Object.entries(this.tags)) {
        if (tag.startsWith(prefix))
          return handle + escapeTagName(tag.substring(prefix.length));
      }
      return tag[0] === "!" ? tag : `!<${tag}>`;
    }
    toString(doc) {
      const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
      const tagEntries = Object.entries(this.tags);
      let tagNames;
      if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
        const tags = {};
        visit(doc.contents, (_key, node) => {
          if (isNode(node) && node.tag)
            tags[node.tag] = true;
        });
        tagNames = Object.keys(tags);
      } else
        tagNames = [];
      for (const [handle, prefix] of tagEntries) {
        if (handle === "!!" && prefix === "tag:yaml.org,2002:")
          continue;
        if (!doc || tagNames.some((tn2) => tn2.startsWith(prefix)))
          lines.push(`%TAG ${handle} ${prefix}`);
      }
      return lines.join("\n");
    }
  }
  Directives.defaultYaml = { explicit: false, version: "1.2" };
  Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
  function anchorIsValid(anchor) {
    if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
      const sa = JSON.stringify(anchor);
      const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
      throw new Error(msg);
    }
    return true;
  }
  function anchorNames(root) {
    const anchors = /* @__PURE__ */ new Set();
    visit(root, {
      Value(_key, node) {
        if (node.anchor)
          anchors.add(node.anchor);
      }
    });
    return anchors;
  }
  function findNewAnchor(prefix, exclude) {
    for (let i = 1; true; ++i) {
      const name2 = `${prefix}${i}`;
      if (!exclude.has(name2))
        return name2;
    }
  }
  function createNodeAnchors(doc, prefix) {
    const aliasObjects = [];
    const sourceObjects = /* @__PURE__ */ new Map();
    let prevAnchors = null;
    return {
      onAnchor: (source) => {
        aliasObjects.push(source);
        prevAnchors ?? (prevAnchors = anchorNames(doc));
        const anchor = findNewAnchor(prefix, prevAnchors);
        prevAnchors.add(anchor);
        return anchor;
      },
      /**
       * With circular references, the source node is only resolved after all
       * of its child nodes are. This is why anchors are set only after all of
       * the nodes have been created.
       */
      setAnchors: () => {
        for (const source of aliasObjects) {
          const ref = sourceObjects.get(source);
          if (typeof ref === "object" && ref.anchor && (isScalar(ref.node) || isCollection(ref.node))) {
            ref.node.anchor = ref.anchor;
          } else {
            const error2 = new Error("Failed to resolve repeated object (this should not happen)");
            error2.source = source;
            throw error2;
          }
        }
      },
      sourceObjects
    };
  }
  function applyReviver(reviver, obj, key, val) {
    if (val && typeof val === "object") {
      if (Array.isArray(val)) {
        for (let i = 0, len = val.length; i < len; ++i) {
          const v02 = val[i];
          const v1 = applyReviver(reviver, val, String(i), v02);
          if (v1 === void 0)
            delete val[i];
          else if (v1 !== v02)
            val[i] = v1;
        }
      } else if (val instanceof Map) {
        for (const k2 of Array.from(val.keys())) {
          const v02 = val.get(k2);
          const v1 = applyReviver(reviver, val, k2, v02);
          if (v1 === void 0)
            val.delete(k2);
          else if (v1 !== v02)
            val.set(k2, v1);
        }
      } else if (val instanceof Set) {
        for (const v02 of Array.from(val)) {
          const v1 = applyReviver(reviver, val, v02, v02);
          if (v1 === void 0)
            val.delete(v02);
          else if (v1 !== v02) {
            val.delete(v02);
            val.add(v1);
          }
        }
      } else {
        for (const [k2, v02] of Object.entries(val)) {
          const v1 = applyReviver(reviver, val, k2, v02);
          if (v1 === void 0)
            delete val[k2];
          else if (v1 !== v02)
            val[k2] = v1;
        }
      }
    }
    return reviver.call(obj, key, val);
  }
  function toJS(value, arg, ctx) {
    if (Array.isArray(value))
      return value.map((v2, i) => toJS(v2, String(i), ctx));
    if (value && typeof value.toJSON === "function") {
      if (!ctx || !hasAnchor(value))
        return value.toJSON(arg, ctx);
      const data = { aliasCount: 0, count: 1, res: void 0 };
      ctx.anchors.set(value, data);
      ctx.onCreate = (res2) => {
        data.res = res2;
        delete ctx.onCreate;
      };
      const res = value.toJSON(arg, ctx);
      if (ctx.onCreate)
        ctx.onCreate(res);
      return res;
    }
    if (typeof value === "bigint" && !(ctx == null ? void 0 : ctx.keep))
      return Number(value);
    return value;
  }
  class NodeBase {
    constructor(type) {
      Object.defineProperty(this, NODE_TYPE, { value: type });
    }
    /** Create a copy of this node.  */
    clone() {
      const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
      if (this.range)
        copy.range = this.range.slice();
      return copy;
    }
    /** A plain JavaScript representation of this node. */
    toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
      if (!isDocument(doc))
        throw new TypeError("A document argument is required");
      const ctx = {
        anchors: /* @__PURE__ */ new Map(),
        doc,
        keep: true,
        mapAsMap: mapAsMap === true,
        mapKeyWarned: false,
        maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
      };
      const res = toJS(this, "", ctx);
      if (typeof onAnchor === "function")
        for (const { count, res: res2 } of ctx.anchors.values())
          onAnchor(res2, count);
      return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
    }
  }
  class Alias extends NodeBase {
    constructor(source) {
      super(ALIAS);
      this.source = source;
      Object.defineProperty(this, "tag", {
        set() {
          throw new Error("Alias nodes cannot have tags");
        }
      });
    }
    /**
     * Resolve the value of this alias within `doc`, finding the last
     * instance of the `source` anchor before this node.
     */
    resolve(doc, ctx) {
      let nodes;
      if (ctx == null ? void 0 : ctx.aliasResolveCache) {
        nodes = ctx.aliasResolveCache;
      } else {
        nodes = [];
        visit(doc, {
          Node: (_key, node) => {
            if (isAlias(node) || hasAnchor(node))
              nodes.push(node);
          }
        });
        if (ctx)
          ctx.aliasResolveCache = nodes;
      }
      let found = void 0;
      for (const node of nodes) {
        if (node === this)
          break;
        if (node.anchor === this.source)
          found = node;
      }
      return found;
    }
    toJSON(_arg, ctx) {
      if (!ctx)
        return { source: this.source };
      const { anchors, doc, maxAliasCount } = ctx;
      const source = this.resolve(doc, ctx);
      if (!source) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new ReferenceError(msg);
      }
      let data = anchors.get(source);
      if (!data) {
        toJS(source, null, ctx);
        data = anchors.get(source);
      }
      if ((data == null ? void 0 : data.res) === void 0) {
        const msg = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(msg);
      }
      if (maxAliasCount >= 0) {
        data.count += 1;
        if (data.aliasCount === 0)
          data.aliasCount = getAliasCount(doc, source, anchors);
        if (data.count * data.aliasCount > maxAliasCount) {
          const msg = "Excessive alias count indicates a resource exhaustion attack";
          throw new ReferenceError(msg);
        }
      }
      return data.res;
    }
    toString(ctx, _onComment, _onChompKeep) {
      const src = `*${this.source}`;
      if (ctx) {
        anchorIsValid(this.source);
        if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new Error(msg);
        }
        if (ctx.implicitKey)
          return `${src} `;
      }
      return src;
    }
  }
  function getAliasCount(doc, node, anchors) {
    if (isAlias(node)) {
      const source = node.resolve(doc);
      const anchor = anchors && source && anchors.get(source);
      return anchor ? anchor.count * anchor.aliasCount : 0;
    } else if (isCollection(node)) {
      let count = 0;
      for (const item of node.items) {
        const c = getAliasCount(doc, item, anchors);
        if (c > count)
          count = c;
      }
      return count;
    } else if (isPair(node)) {
      const kc = getAliasCount(doc, node.key, anchors);
      const vc = getAliasCount(doc, node.value, anchors);
      return Math.max(kc, vc);
    }
    return 1;
  }
  const isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
  class Scalar extends NodeBase {
    constructor(value) {
      super(SCALAR$1);
      this.value = value;
    }
    toJSON(arg, ctx) {
      return (ctx == null ? void 0 : ctx.keep) ? this.value : toJS(this.value, arg, ctx);
    }
    toString() {
      return String(this.value);
    }
  }
  Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
  Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
  Scalar.PLAIN = "PLAIN";
  Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
  Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
  const defaultTagPrefix = "tag:yaml.org,2002:";
  function findTagObject(value, tagName, tags) {
    if (tagName) {
      const match = tags.filter((t) => t.tag === tagName);
      const tagObj = match.find((t) => !t.format) ?? match[0];
      if (!tagObj)
        throw new Error(`Tag ${tagName} not found`);
      return tagObj;
    }
    return tags.find((t) => {
      var _a2;
      return ((_a2 = t.identify) == null ? void 0 : _a2.call(t, value)) && !t.format;
    });
  }
  function createNode(value, tagName, ctx) {
    var _a2, _b, _c;
    if (isDocument(value))
      value = value.contents;
    if (isNode(value))
      return value;
    if (isPair(value)) {
      const map2 = (_b = (_a2 = ctx.schema[MAP]).createNode) == null ? void 0 : _b.call(_a2, ctx.schema, null, ctx);
      map2.items.push(value);
      return map2;
    }
    if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
      value = value.valueOf();
    }
    const { aliasDuplicateObjects, onAnchor, onTagObj, schema: schema2, sourceObjects } = ctx;
    let ref = void 0;
    if (aliasDuplicateObjects && value && typeof value === "object") {
      ref = sourceObjects.get(value);
      if (ref) {
        ref.anchor ?? (ref.anchor = onAnchor(value));
        return new Alias(ref.anchor);
      } else {
        ref = { anchor: null, node: null };
        sourceObjects.set(value, ref);
      }
    }
    if (tagName == null ? void 0 : tagName.startsWith("!!"))
      tagName = defaultTagPrefix + tagName.slice(2);
    let tagObj = findTagObject(value, tagName, schema2.tags);
    if (!tagObj) {
      if (value && typeof value.toJSON === "function") {
        value = value.toJSON();
      }
      if (!value || typeof value !== "object") {
        const node2 = new Scalar(value);
        if (ref)
          ref.node = node2;
        return node2;
      }
      tagObj = value instanceof Map ? schema2[MAP] : Symbol.iterator in Object(value) ? schema2[SEQ] : schema2[MAP];
    }
    if (onTagObj) {
      onTagObj(tagObj);
      delete ctx.onTagObj;
    }
    const node = (tagObj == null ? void 0 : tagObj.createNode) ? tagObj.createNode(ctx.schema, value, ctx) : typeof ((_c = tagObj == null ? void 0 : tagObj.nodeClass) == null ? void 0 : _c.from) === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar(value);
    if (tagName)
      node.tag = tagName;
    else if (!tagObj.default)
      node.tag = tagObj.tag;
    if (ref)
      ref.node = node;
    return node;
  }
  function collectionFromPath(schema2, path, value) {
    let v2 = value;
    for (let i = path.length - 1; i >= 0; --i) {
      const k2 = path[i];
      if (typeof k2 === "number" && Number.isInteger(k2) && k2 >= 0) {
        const a2 = [];
        a2[k2] = v2;
        v2 = a2;
      } else {
        v2 = /* @__PURE__ */ new Map([[k2, v2]]);
      }
    }
    return createNode(v2, void 0, {
      aliasDuplicateObjects: false,
      keepUndefined: false,
      onAnchor: () => {
        throw new Error("This should not happen, please report a bug.");
      },
      schema: schema2,
      sourceObjects: /* @__PURE__ */ new Map()
    });
  }
  const isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
  class Collection extends NodeBase {
    constructor(type, schema2) {
      super(type);
      Object.defineProperty(this, "schema", {
        value: schema2,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
    /**
     * Create a copy of this collection.
     *
     * @param schema - If defined, overwrites the original's schema
     */
    clone(schema2) {
      const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
      if (schema2)
        copy.schema = schema2;
      copy.items = copy.items.map((it2) => isNode(it2) || isPair(it2) ? it2.clone(schema2) : it2);
      if (this.range)
        copy.range = this.range.slice();
      return copy;
    }
    /**
     * Adds a value to the collection. For `!!map` and `!!omap` the value must
     * be a Pair instance or a `{ key, value }` object, which may not have a key
     * that already exists in the map.
     */
    addIn(path, value) {
      if (isEmptyPath(path))
        this.add(value);
      else {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (isCollection(node))
          node.addIn(rest, value);
        else if (node === void 0 && this.schema)
          this.set(key, collectionFromPath(this.schema, rest, value));
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
    }
    /**
     * Removes a value from the collection.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
      const [key, ...rest] = path;
      if (rest.length === 0)
        return this.delete(key);
      const node = this.get(key, true);
      if (isCollection(node))
        return node.deleteIn(rest);
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
      const [key, ...rest] = path;
      const node = this.get(key, true);
      if (rest.length === 0)
        return !keepScalar && isScalar(node) ? node.value : node;
      else
        return isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
    }
    hasAllNullValues(allowScalar) {
      return this.items.every((node) => {
        if (!isPair(node))
          return false;
        const n = node.value;
        return n == null || allowScalar && isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
      });
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     */
    hasIn(path) {
      const [key, ...rest] = path;
      if (rest.length === 0)
        return this.has(key);
      const node = this.get(key, true);
      return isCollection(node) ? node.hasIn(rest) : false;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
      const [key, ...rest] = path;
      if (rest.length === 0) {
        this.set(key, value);
      } else {
        const node = this.get(key, true);
        if (isCollection(node))
          node.setIn(rest, value);
        else if (node === void 0 && this.schema)
          this.set(key, collectionFromPath(this.schema, rest, value));
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
    }
  }
  const stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
  function indentComment(comment2, indent) {
    if (/^\n+$/.test(comment2))
      return comment2.substring(1);
    return indent ? comment2.replace(/^(?! *$)/gm, indent) : comment2;
  }
  const lineComment = (str, indent, comment2) => str.endsWith("\n") ? indentComment(comment2, indent) : comment2.includes("\n") ? "\n" + indentComment(comment2, indent) : (str.endsWith(" ") ? "" : " ") + comment2;
  const FOLD_FLOW = "flow";
  const FOLD_BLOCK = "block";
  const FOLD_QUOTED = "quoted";
  function foldFlowLines(text2, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
    if (!lineWidth || lineWidth < 0)
      return text2;
    if (lineWidth < minContentWidth)
      minContentWidth = 0;
    const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
    if (text2.length <= endStep)
      return text2;
    const folds = [];
    const escapedFolds = {};
    let end = lineWidth - indent.length;
    if (typeof indentAtStart === "number") {
      if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
        folds.push(0);
      else
        end = lineWidth - indentAtStart;
    }
    let split = void 0;
    let prev = void 0;
    let overflow = false;
    let i = -1;
    let escStart = -1;
    let escEnd = -1;
    if (mode === FOLD_BLOCK) {
      i = consumeMoreIndentedLines(text2, i, indent.length);
      if (i !== -1)
        end = i + endStep;
    }
    for (let ch; ch = text2[i += 1]; ) {
      if (mode === FOLD_QUOTED && ch === "\\") {
        escStart = i;
        switch (text2[i + 1]) {
          case "x":
            i += 3;
            break;
          case "u":
            i += 5;
            break;
          case "U":
            i += 9;
            break;
          default:
            i += 1;
        }
        escEnd = i;
      }
      if (ch === "\n") {
        if (mode === FOLD_BLOCK)
          i = consumeMoreIndentedLines(text2, i, indent.length);
        end = i + indent.length + endStep;
        split = void 0;
      } else {
        if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
          const next = text2[i + 1];
          if (next && next !== " " && next !== "\n" && next !== "	")
            split = i;
        }
        if (i >= end) {
          if (split) {
            folds.push(split);
            end = split + endStep;
            split = void 0;
          } else if (mode === FOLD_QUOTED) {
            while (prev === " " || prev === "	") {
              prev = ch;
              ch = text2[i += 1];
              overflow = true;
            }
            const j2 = i > escEnd + 1 ? i - 2 : escStart - 1;
            if (escapedFolds[j2])
              return text2;
            folds.push(j2);
            escapedFolds[j2] = true;
            end = j2 + endStep;
            split = void 0;
          } else {
            overflow = true;
          }
        }
      }
      prev = ch;
    }
    if (overflow && onOverflow)
      onOverflow();
    if (folds.length === 0)
      return text2;
    if (onFold)
      onFold();
    let res = text2.slice(0, folds[0]);
    for (let i2 = 0; i2 < folds.length; ++i2) {
      const fold = folds[i2];
      const end2 = folds[i2 + 1] || text2.length;
      if (fold === 0)
        res = `
${indent}${text2.slice(0, end2)}`;
      else {
        if (mode === FOLD_QUOTED && escapedFolds[fold])
          res += `${text2[fold]}\\`;
        res += `
${indent}${text2.slice(fold + 1, end2)}`;
      }
    }
    return res;
  }
  function consumeMoreIndentedLines(text2, i, indent) {
    let end = i;
    let start = i + 1;
    let ch = text2[start];
    while (ch === " " || ch === "	") {
      if (i < start + indent) {
        ch = text2[++i];
      } else {
        do {
          ch = text2[++i];
        } while (ch && ch !== "\n");
        end = i;
        start = i + 1;
        ch = text2[start];
      }
    }
    return end;
  }
  const getFoldOptions = (ctx, isBlock2) => ({
    indentAtStart: isBlock2 ? ctx.indent.length : ctx.indentAtStart,
    lineWidth: ctx.options.lineWidth,
    minContentWidth: ctx.options.minContentWidth
  });
  const containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
  function lineLengthOverLimit(str, lineWidth, indentLength) {
    if (!lineWidth || lineWidth < 0)
      return false;
    const limit = lineWidth - indentLength;
    const strLen = str.length;
    if (strLen <= limit)
      return false;
    for (let i = 0, start = 0; i < strLen; ++i) {
      if (str[i] === "\n") {
        if (i - start > limit)
          return true;
        start = i + 1;
        if (strLen - start <= limit)
          return false;
      }
    }
    return true;
  }
  function doubleQuotedString(value, ctx) {
    const json = JSON.stringify(value);
    if (ctx.options.doubleQuotedAsJSON)
      return json;
    const { implicitKey } = ctx;
    const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
    const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
    let str = "";
    let start = 0;
    for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
      if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
        str += json.slice(start, i) + "\\ ";
        i += 1;
        start = i;
        ch = "\\";
      }
      if (ch === "\\")
        switch (json[i + 1]) {
          case "u":
            {
              str += json.slice(start, i);
              const code2 = json.substr(i + 2, 4);
              switch (code2) {
                case "0000":
                  str += "\\0";
                  break;
                case "0007":
                  str += "\\a";
                  break;
                case "000b":
                  str += "\\v";
                  break;
                case "001b":
                  str += "\\e";
                  break;
                case "0085":
                  str += "\\N";
                  break;
                case "00a0":
                  str += "\\_";
                  break;
                case "2028":
                  str += "\\L";
                  break;
                case "2029":
                  str += "\\P";
                  break;
                default:
                  if (code2.substr(0, 2) === "00")
                    str += "\\x" + code2.substr(2);
                  else
                    str += json.substr(i, 6);
              }
              i += 5;
              start = i + 1;
            }
            break;
          case "n":
            if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
              i += 1;
            } else {
              str += json.slice(start, i) + "\n\n";
              while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                str += "\n";
                i += 2;
              }
              str += indent;
              if (json[i + 2] === " ")
                str += "\\";
              i += 1;
              start = i + 1;
            }
            break;
          default:
            i += 1;
        }
    }
    str = start ? str + json.slice(start) : json;
    return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
  }
  function singleQuotedString(value, ctx) {
    if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
      return doubleQuotedString(value, ctx);
    const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
    const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
    return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
  }
  function quotedString(value, ctx) {
    const { singleQuote } = ctx.options;
    let qs;
    if (singleQuote === false)
      qs = doubleQuotedString;
    else {
      const hasDouble = value.includes('"');
      const hasSingle = value.includes("'");
      if (hasDouble && !hasSingle)
        qs = singleQuotedString;
      else if (hasSingle && !hasDouble)
        qs = doubleQuotedString;
      else
        qs = singleQuote ? singleQuotedString : doubleQuotedString;
    }
    return qs(value, ctx);
  }
  let blockEndNewlines;
  try {
    blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
  } catch {
    blockEndNewlines = /\n+(?!\n|$)/g;
  }
  function blockString({ comment: comment2, type, value }, ctx, onComment, onChompKeep) {
    const { blockQuote, commentString, lineWidth } = ctx.options;
    if (!blockQuote || /\n[\t ]+$/.test(value)) {
      return quotedString(value, ctx);
    }
    const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
    const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.BLOCK_FOLDED ? false : type === Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
    if (!value)
      return literal ? "|\n" : ">\n";
    let chomp;
    let endStart;
    for (endStart = value.length; endStart > 0; --endStart) {
      const ch = value[endStart - 1];
      if (ch !== "\n" && ch !== "	" && ch !== " ")
        break;
    }
    let end = value.substring(endStart);
    const endNlPos = end.indexOf("\n");
    if (endNlPos === -1) {
      chomp = "-";
    } else if (value === end || endNlPos !== end.length - 1) {
      chomp = "+";
      if (onChompKeep)
        onChompKeep();
    } else {
      chomp = "";
    }
    if (end) {
      value = value.slice(0, -end.length);
      if (end[end.length - 1] === "\n")
        end = end.slice(0, -1);
      end = end.replace(blockEndNewlines, `$&${indent}`);
    }
    let startWithSpace = false;
    let startEnd;
    let startNlPos = -1;
    for (startEnd = 0; startEnd < value.length; ++startEnd) {
      const ch = value[startEnd];
      if (ch === " ")
        startWithSpace = true;
      else if (ch === "\n")
        startNlPos = startEnd;
      else
        break;
    }
    let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
    if (start) {
      value = value.substring(start.length);
      start = start.replace(/\n+/g, `$&${indent}`);
    }
    const indentSize = indent ? "2" : "1";
    let header = (startWithSpace ? indentSize : "") + chomp;
    if (comment2) {
      header += " " + commentString(comment2.replace(/ ?[\r\n]+/g, " "));
      if (onComment)
        onComment();
    }
    if (!literal) {
      const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
      let literalFallback = false;
      const foldOptions = getFoldOptions(ctx, true);
      if (blockQuote !== "folded" && type !== Scalar.BLOCK_FOLDED) {
        foldOptions.onOverflow = () => {
          literalFallback = true;
        };
      }
      const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
      if (!literalFallback)
        return `>${header}
${indent}${body}`;
    }
    value = value.replace(/\n+/g, `$&${indent}`);
    return `|${header}
${indent}${start}${value}${end}`;
  }
  function plainString(item, ctx, onComment, onChompKeep) {
    const { type, value } = item;
    const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
    if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
      return quotedString(value, ctx);
    }
    if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
      return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
    }
    if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes("\n")) {
      return blockString(item, ctx, onComment, onChompKeep);
    }
    if (containsDocumentMarker(value)) {
      if (indent === "") {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
      } else if (implicitKey && indent === indentStep) {
        return quotedString(value, ctx);
      }
    }
    const str = value.replace(/\n+/g, `$&
${indent}`);
    if (actualString) {
      const test = (tag) => {
        var _a2;
        return tag.default && tag.tag !== "tag:yaml.org,2002:str" && ((_a2 = tag.test) == null ? void 0 : _a2.test(str));
      };
      const { compat, tags } = ctx.doc.schema;
      if (tags.some(test) || (compat == null ? void 0 : compat.some(test)))
        return quotedString(value, ctx);
    }
    return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
  }
  function stringifyString(item, ctx, onComment, onChompKeep) {
    const { implicitKey, inFlow } = ctx;
    const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
    let { type } = item;
    if (type !== Scalar.QUOTE_DOUBLE) {
      if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
        type = Scalar.QUOTE_DOUBLE;
    }
    const _stringify = (_type) => {
      switch (_type) {
        case Scalar.BLOCK_FOLDED:
        case Scalar.BLOCK_LITERAL:
          return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
        case Scalar.QUOTE_DOUBLE:
          return doubleQuotedString(ss.value, ctx);
        case Scalar.QUOTE_SINGLE:
          return singleQuotedString(ss.value, ctx);
        case Scalar.PLAIN:
          return plainString(ss, ctx, onComment, onChompKeep);
        default:
          return null;
      }
    };
    let res = _stringify(type);
    if (res === null) {
      const { defaultKeyType, defaultStringType } = ctx.options;
      const t = implicitKey && defaultKeyType || defaultStringType;
      res = _stringify(t);
      if (res === null)
        throw new Error(`Unsupported default string type ${t}`);
    }
    return res;
  }
  function createStringifyContext(doc, options) {
    const opt = Object.assign({
      blockQuote: true,
      commentString: stringifyComment,
      defaultKeyType: null,
      defaultStringType: "PLAIN",
      directives: null,
      doubleQuotedAsJSON: false,
      doubleQuotedMinMultiLineLength: 40,
      falseStr: "false",
      flowCollectionPadding: true,
      indentSeq: true,
      lineWidth: 80,
      minContentWidth: 20,
      nullStr: "null",
      simpleKeys: false,
      singleQuote: null,
      trailingComma: false,
      trueStr: "true",
      verifyAliasOrder: true
    }, doc.schema.toStringOptions, options);
    let inFlow;
    switch (opt.collectionStyle) {
      case "block":
        inFlow = false;
        break;
      case "flow":
        inFlow = true;
        break;
      default:
        inFlow = null;
    }
    return {
      anchors: /* @__PURE__ */ new Set(),
      doc,
      flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
      indent: "",
      indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
      inFlow,
      options: opt
    };
  }
  function getTagObject(tags, item) {
    var _a2;
    if (item.tag) {
      const match = tags.filter((t) => t.tag === item.tag);
      if (match.length > 0)
        return match.find((t) => t.format === item.format) ?? match[0];
    }
    let tagObj = void 0;
    let obj;
    if (isScalar(item)) {
      obj = item.value;
      let match = tags.filter((t) => {
        var _a3;
        return (_a3 = t.identify) == null ? void 0 : _a3.call(t, obj);
      });
      if (match.length > 1) {
        const testMatch = match.filter((t) => t.test);
        if (testMatch.length > 0)
          match = testMatch;
      }
      tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
    } else {
      obj = item;
      tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
    }
    if (!tagObj) {
      const name2 = ((_a2 = obj == null ? void 0 : obj.constructor) == null ? void 0 : _a2.name) ?? (obj === null ? "null" : typeof obj);
      throw new Error(`Tag not resolved for ${name2} value`);
    }
    return tagObj;
  }
  function stringifyProps(node, tagObj, { anchors, doc }) {
    if (!doc.directives)
      return "";
    const props = [];
    const anchor = (isScalar(node) || isCollection(node)) && node.anchor;
    if (anchor && anchorIsValid(anchor)) {
      anchors.add(anchor);
      props.push(`&${anchor}`);
    }
    const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
    if (tag)
      props.push(doc.directives.tagString(tag));
    return props.join(" ");
  }
  function stringify(item, ctx, onComment, onChompKeep) {
    var _a2;
    if (isPair(item))
      return item.toString(ctx, onComment, onChompKeep);
    if (isAlias(item)) {
      if (ctx.doc.directives)
        return item.toString(ctx);
      if ((_a2 = ctx.resolvedAliases) == null ? void 0 : _a2.has(item)) {
        throw new TypeError(`Cannot stringify circular structure without alias nodes`);
      } else {
        if (ctx.resolvedAliases)
          ctx.resolvedAliases.add(item);
        else
          ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
        item = item.resolve(ctx.doc);
      }
    }
    let tagObj = void 0;
    const node = isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
    tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
    const props = stringifyProps(node, tagObj, ctx);
    if (props.length > 0)
      ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
    const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : isScalar(node) ? stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
    if (!props)
      return str;
    return isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
  }
  function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
    const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
    let keyComment = isNode(key) && key.comment || null;
    if (simpleKeys) {
      if (keyComment) {
        throw new Error("With simple keys, key nodes cannot have comments");
      }
      if (isCollection(key) || !isNode(key) && typeof key === "object") {
        const msg = "With simple keys, collection cannot be used as a key value";
        throw new Error(msg);
      }
    }
    let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || isCollection(key) || (isScalar(key) ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL : typeof key === "object"));
    ctx = Object.assign({}, ctx, {
      allNullValues: false,
      implicitKey: !explicitKey && (simpleKeys || !allNullValues),
      indent: indent + indentStep
    });
    let keyCommentDone = false;
    let chompKeep = false;
    let str = stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
    if (!explicitKey && !ctx.inFlow && str.length > 1024) {
      if (simpleKeys)
        throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
      explicitKey = true;
    }
    if (ctx.inFlow) {
      if (allNullValues || value == null) {
        if (keyCommentDone && onComment)
          onComment();
        return str === "" ? "?" : explicitKey ? `? ${str}` : str;
      }
    } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
      str = `? ${str}`;
      if (keyComment && !keyCommentDone) {
        str += lineComment(str, ctx.indent, commentString(keyComment));
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    if (keyCommentDone)
      keyComment = null;
    if (explicitKey) {
      if (keyComment)
        str += lineComment(str, ctx.indent, commentString(keyComment));
      str = `? ${str}
${indent}:`;
    } else {
      str = `${str}:`;
      if (keyComment)
        str += lineComment(str, ctx.indent, commentString(keyComment));
    }
    let vsb, vcb, valueComment;
    if (isNode(value)) {
      vsb = !!value.spaceBefore;
      vcb = value.commentBefore;
      valueComment = value.comment;
    } else {
      vsb = false;
      vcb = null;
      valueComment = null;
      if (value && typeof value === "object")
        value = doc.createNode(value);
    }
    ctx.implicitKey = false;
    if (!explicitKey && !keyComment && isScalar(value))
      ctx.indentAtStart = str.length + 1;
    chompKeep = false;
    if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && isSeq(value) && !value.flow && !value.tag && !value.anchor) {
      ctx.indent = ctx.indent.substring(2);
    }
    let valueCommentDone = false;
    const valueStr = stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
    let ws = " ";
    if (keyComment || vsb || vcb) {
      ws = vsb ? "\n" : "";
      if (vcb) {
        const cs = commentString(vcb);
        ws += `
${indentComment(cs, ctx.indent)}`;
      }
      if (valueStr === "" && !ctx.inFlow) {
        if (ws === "\n" && valueComment)
          ws = "\n\n";
      } else {
        ws += `
${ctx.indent}`;
      }
    } else if (!explicitKey && isCollection(value)) {
      const vs0 = valueStr[0];
      const nl0 = valueStr.indexOf("\n");
      const hasNewline = nl0 !== -1;
      const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
      if (hasNewline || !flow) {
        let hasPropsLine = false;
        if (hasNewline && (vs0 === "&" || vs0 === "!")) {
          let sp0 = valueStr.indexOf(" ");
          if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
            sp0 = valueStr.indexOf(" ", sp0 + 1);
          }
          if (sp0 === -1 || nl0 < sp0)
            hasPropsLine = true;
        }
        if (!hasPropsLine)
          ws = `
${ctx.indent}`;
      }
    } else if (valueStr === "" || valueStr[0] === "\n") {
      ws = "";
    }
    str += ws + valueStr;
    if (ctx.inFlow) {
      if (valueCommentDone && onComment)
        onComment();
    } else if (valueComment && !valueCommentDone) {
      str += lineComment(str, ctx.indent, commentString(valueComment));
    } else if (chompKeep && onChompKeep) {
      onChompKeep();
    }
    return str;
  }
  function warn(logLevel, warning) {
    if (logLevel === "debug" || logLevel === "warn") {
      console.warn(warning);
    }
  }
  const MERGE_KEY = "<<";
  const merge = {
    identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
    default: "key",
    tag: "tag:yaml.org,2002:merge",
    test: /^<<$/,
    resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
      addToJSMap: addMergeToJSMap
    }),
    stringify: () => MERGE_KEY
  };
  const isMergeKey = (ctx, key) => (merge.identify(key) || isScalar(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value)) && (ctx == null ? void 0 : ctx.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default));
  function addMergeToJSMap(ctx, map2, value) {
    value = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
    if (isSeq(value))
      for (const it2 of value.items)
        mergeValue(ctx, map2, it2);
    else if (Array.isArray(value))
      for (const it2 of value)
        mergeValue(ctx, map2, it2);
    else
      mergeValue(ctx, map2, value);
  }
  function mergeValue(ctx, map2, value) {
    const source = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
    if (!isMap(source))
      throw new Error("Merge sources must be maps or map aliases");
    const srcMap = source.toJSON(null, ctx, Map);
    for (const [key, value2] of srcMap) {
      if (map2 instanceof Map) {
        if (!map2.has(key))
          map2.set(key, value2);
      } else if (map2 instanceof Set) {
        map2.add(key);
      } else if (!Object.prototype.hasOwnProperty.call(map2, key)) {
        Object.defineProperty(map2, key, {
          value: value2,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    }
    return map2;
  }
  function addPairToJSMap(ctx, map2, { key, value }) {
    if (isNode(key) && key.addToJSMap)
      key.addToJSMap(ctx, map2, value);
    else if (isMergeKey(ctx, key))
      addMergeToJSMap(ctx, map2, value);
    else {
      const jsKey = toJS(key, "", ctx);
      if (map2 instanceof Map) {
        map2.set(jsKey, toJS(value, jsKey, ctx));
      } else if (map2 instanceof Set) {
        map2.add(jsKey);
      } else {
        const stringKey = stringifyKey(key, jsKey, ctx);
        const jsValue = toJS(value, stringKey, ctx);
        if (stringKey in map2)
          Object.defineProperty(map2, stringKey, {
            value: jsValue,
            writable: true,
            enumerable: true,
            configurable: true
          });
        else
          map2[stringKey] = jsValue;
      }
    }
    return map2;
  }
  function stringifyKey(key, jsKey, ctx) {
    if (jsKey === null)
      return "";
    if (typeof jsKey !== "object")
      return String(jsKey);
    if (isNode(key) && (ctx == null ? void 0 : ctx.doc)) {
      const strCtx = createStringifyContext(ctx.doc, {});
      strCtx.anchors = /* @__PURE__ */ new Set();
      for (const node of ctx.anchors.keys())
        strCtx.anchors.add(node.anchor);
      strCtx.inFlow = true;
      strCtx.inStringifyKey = true;
      const strKey = key.toString(strCtx);
      if (!ctx.mapKeyWarned) {
        let jsonStr = JSON.stringify(strKey);
        if (jsonStr.length > 40)
          jsonStr = jsonStr.substring(0, 36) + '..."';
        warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
        ctx.mapKeyWarned = true;
      }
      return strKey;
    }
    return JSON.stringify(jsKey);
  }
  function createPair(key, value, ctx) {
    const k2 = createNode(key, void 0, ctx);
    const v2 = createNode(value, void 0, ctx);
    return new Pair(k2, v2);
  }
  class Pair {
    constructor(key, value = null) {
      Object.defineProperty(this, NODE_TYPE, { value: PAIR });
      this.key = key;
      this.value = value;
    }
    clone(schema2) {
      let { key, value } = this;
      if (isNode(key))
        key = key.clone(schema2);
      if (isNode(value))
        value = value.clone(schema2);
      return new Pair(key, value);
    }
    toJSON(_2, ctx) {
      const pair = (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
      return addPairToJSMap(ctx, pair, this);
    }
    toString(ctx, onComment, onChompKeep) {
      return (ctx == null ? void 0 : ctx.doc) ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
    }
  }
  function stringifyCollection(collection, ctx, options) {
    const flow = ctx.inFlow ?? collection.flow;
    const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
    return stringify2(collection, ctx, options);
  }
  function stringifyBlockCollection({ comment: comment2, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
    const { indent, options: { commentString } } = ctx;
    const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
    let chompKeep = false;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      let comment3 = null;
      if (isNode(item)) {
        if (!chompKeep && item.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
        if (item.comment)
          comment3 = item.comment;
      } else if (isPair(item)) {
        const ik = isNode(item.key) ? item.key : null;
        if (ik) {
          if (!chompKeep && ik.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
        }
      }
      chompKeep = false;
      let str2 = stringify(item, itemCtx, () => comment3 = null, () => chompKeep = true);
      if (comment3)
        str2 += lineComment(str2, itemIndent, commentString(comment3));
      if (chompKeep && comment3)
        chompKeep = false;
      lines.push(blockItemPrefix + str2);
    }
    let str;
    if (lines.length === 0) {
      str = flowChars.start + flowChars.end;
    } else {
      str = lines[0];
      for (let i = 1; i < lines.length; ++i) {
        const line = lines[i];
        str += line ? `
${indent}${line}` : "\n";
      }
    }
    if (comment2) {
      str += "\n" + indentComment(commentString(comment2), indent);
      if (onComment)
        onComment();
    } else if (chompKeep && onChompKeep)
      onChompKeep();
    return str;
  }
  function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
    const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
    itemIndent += indentStep;
    const itemCtx = Object.assign({}, ctx, {
      indent: itemIndent,
      inFlow: true,
      type: null
    });
    let reqNewline = false;
    let linesAtValue = 0;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      let comment2 = null;
      if (isNode(item)) {
        if (item.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, item.commentBefore, false);
        if (item.comment)
          comment2 = item.comment;
      } else if (isPair(item)) {
        const ik = isNode(item.key) ? item.key : null;
        if (ik) {
          if (ik.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, ik.commentBefore, false);
          if (ik.comment)
            reqNewline = true;
        }
        const iv = isNode(item.value) ? item.value : null;
        if (iv) {
          if (iv.comment)
            comment2 = iv.comment;
          if (iv.commentBefore)
            reqNewline = true;
        } else if (item.value == null && (ik == null ? void 0 : ik.comment)) {
          comment2 = ik.comment;
        }
      }
      if (comment2)
        reqNewline = true;
      let str = stringify(item, itemCtx, () => comment2 = null);
      reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
      if (i < items.length - 1) {
        str += ",";
      } else if (ctx.options.trailingComma) {
        if (ctx.options.lineWidth > 0) {
          reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
        }
        if (reqNewline) {
          str += ",";
        }
      }
      if (comment2)
        str += lineComment(str, itemIndent, commentString(comment2));
      lines.push(str);
      linesAtValue = lines.length;
    }
    const { start, end } = flowChars;
    if (lines.length === 0) {
      return start + end;
    } else {
      if (!reqNewline) {
        const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
        reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
      }
      if (reqNewline) {
        let str = start;
        for (const line of lines)
          str += line ? `
${indentStep}${indent}${line}` : "\n";
        return `${str}
${indent}${end}`;
      } else {
        return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
      }
    }
  }
  function addCommentBefore({ indent, options: { commentString } }, lines, comment2, chompKeep) {
    if (comment2 && chompKeep)
      comment2 = comment2.replace(/^\n+/, "");
    if (comment2) {
      const ic = indentComment(commentString(comment2), indent);
      lines.push(ic.trimStart());
    }
  }
  function findPair(items, key) {
    const k2 = isScalar(key) ? key.value : key;
    for (const it2 of items) {
      if (isPair(it2)) {
        if (it2.key === key || it2.key === k2)
          return it2;
        if (isScalar(it2.key) && it2.key.value === k2)
          return it2;
      }
    }
    return void 0;
  }
  class YAMLMap extends Collection {
    static get tagName() {
      return "tag:yaml.org,2002:map";
    }
    constructor(schema2) {
      super(MAP, schema2);
      this.items = [];
    }
    /**
     * A generic collection parsing method that can be extended
     * to other node classes that inherit from YAMLMap
     */
    static from(schema2, obj, ctx) {
      const { keepUndefined, replacer } = ctx;
      const map2 = new this(schema2);
      const add = (key, value) => {
        if (typeof replacer === "function")
          value = replacer.call(obj, key, value);
        else if (Array.isArray(replacer) && !replacer.includes(key))
          return;
        if (value !== void 0 || keepUndefined)
          map2.items.push(createPair(key, value, ctx));
      };
      if (obj instanceof Map) {
        for (const [key, value] of obj)
          add(key, value);
      } else if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj))
          add(key, obj[key]);
      }
      if (typeof schema2.sortMapEntries === "function") {
        map2.items.sort(schema2.sortMapEntries);
      }
      return map2;
    }
    /**
     * Adds a value to the collection.
     *
     * @param overwrite - If not set `true`, using a key that is already in the
     *   collection will throw. Otherwise, overwrites the previous value.
     */
    add(pair, overwrite) {
      var _a2;
      let _pair;
      if (isPair(pair))
        _pair = pair;
      else if (!pair || typeof pair !== "object" || !("key" in pair)) {
        _pair = new Pair(pair, pair == null ? void 0 : pair.value);
      } else
        _pair = new Pair(pair.key, pair.value);
      const prev = findPair(this.items, _pair.key);
      const sortEntries = (_a2 = this.schema) == null ? void 0 : _a2.sortMapEntries;
      if (prev) {
        if (!overwrite)
          throw new Error(`Key ${_pair.key} already set`);
        if (isScalar(prev.value) && isScalarValue(_pair.value))
          prev.value.value = _pair.value;
        else
          prev.value = _pair.value;
      } else if (sortEntries) {
        const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
        if (i === -1)
          this.items.push(_pair);
        else
          this.items.splice(i, 0, _pair);
      } else {
        this.items.push(_pair);
      }
    }
    delete(key) {
      const it2 = findPair(this.items, key);
      if (!it2)
        return false;
      const del = this.items.splice(this.items.indexOf(it2), 1);
      return del.length > 0;
    }
    get(key, keepScalar) {
      const it2 = findPair(this.items, key);
      const node = it2 == null ? void 0 : it2.value;
      return (!keepScalar && isScalar(node) ? node.value : node) ?? void 0;
    }
    has(key) {
      return !!findPair(this.items, key);
    }
    set(key, value) {
      this.add(new Pair(key, value), true);
    }
    /**
     * @param ctx - Conversion context, originally set in Document#toJS()
     * @param {Class} Type - If set, forces the returned collection type
     * @returns Instance of Type, Map, or Object
     */
    toJSON(_2, ctx, Type) {
      const map2 = Type ? new Type() : (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
      if (ctx == null ? void 0 : ctx.onCreate)
        ctx.onCreate(map2);
      for (const item of this.items)
        addPairToJSMap(ctx, map2, item);
      return map2;
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx)
        return JSON.stringify(this);
      for (const item of this.items) {
        if (!isPair(item))
          throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
      }
      if (!ctx.allNullValues && this.hasAllNullValues(false))
        ctx = Object.assign({}, ctx, { allNullValues: true });
      return stringifyCollection(this, ctx, {
        blockItemPrefix: "",
        flowChars: { start: "{", end: "}" },
        itemIndent: ctx.indent || "",
        onChompKeep,
        onComment
      });
    }
  }
  const map = {
    collection: "map",
    default: true,
    nodeClass: YAMLMap,
    tag: "tag:yaml.org,2002:map",
    resolve(map2, onError) {
      if (!isMap(map2))
        onError("Expected a mapping for this tag");
      return map2;
    },
    createNode: (schema2, obj, ctx) => YAMLMap.from(schema2, obj, ctx)
  };
  class YAMLSeq extends Collection {
    static get tagName() {
      return "tag:yaml.org,2002:seq";
    }
    constructor(schema2) {
      super(SEQ, schema2);
      this.items = [];
    }
    add(value) {
      this.items.push(value);
    }
    /**
     * Removes a value from the collection.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     *
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number")
        return false;
      const del = this.items.splice(idx, 1);
      return del.length > 0;
    }
    get(key, keepScalar) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number")
        return void 0;
      const it2 = this.items[idx];
      return !keepScalar && isScalar(it2) ? it2.value : it2;
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     */
    has(key) {
      const idx = asItemIndex(key);
      return typeof idx === "number" && idx < this.items.length;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     *
     * If `key` does not contain a representation of an integer, this will throw.
     * It may be wrapped in a `Scalar`.
     */
    set(key, value) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number")
        throw new Error(`Expected a valid index, not ${key}.`);
      const prev = this.items[idx];
      if (isScalar(prev) && isScalarValue(value))
        prev.value = value;
      else
        this.items[idx] = value;
    }
    toJSON(_2, ctx) {
      const seq2 = [];
      if (ctx == null ? void 0 : ctx.onCreate)
        ctx.onCreate(seq2);
      let i = 0;
      for (const item of this.items)
        seq2.push(toJS(item, String(i++), ctx));
      return seq2;
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx)
        return JSON.stringify(this);
      return stringifyCollection(this, ctx, {
        blockItemPrefix: "- ",
        flowChars: { start: "[", end: "]" },
        itemIndent: (ctx.indent || "") + "  ",
        onChompKeep,
        onComment
      });
    }
    static from(schema2, obj, ctx) {
      const { replacer } = ctx;
      const seq2 = new this(schema2);
      if (obj && Symbol.iterator in Object(obj)) {
        let i = 0;
        for (let it2 of obj) {
          if (typeof replacer === "function") {
            const key = obj instanceof Set ? it2 : String(i++);
            it2 = replacer.call(obj, key, it2);
          }
          seq2.items.push(createNode(it2, void 0, ctx));
        }
      }
      return seq2;
    }
  }
  function asItemIndex(key) {
    let idx = isScalar(key) ? key.value : key;
    if (idx && typeof idx === "string")
      idx = Number(idx);
    return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
  }
  const seq = {
    collection: "seq",
    default: true,
    nodeClass: YAMLSeq,
    tag: "tag:yaml.org,2002:seq",
    resolve(seq2, onError) {
      if (!isSeq(seq2))
        onError("Expected a sequence for this tag");
      return seq2;
    },
    createNode: (schema2, obj, ctx) => YAMLSeq.from(schema2, obj, ctx)
  };
  const string = {
    identify: (value) => typeof value === "string",
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: (str) => str,
    stringify(item, ctx, onComment, onChompKeep) {
      ctx = Object.assign({ actualString: true }, ctx);
      return stringifyString(item, ctx, onComment, onChompKeep);
    }
  };
  const nullTag = {
    identify: (value) => value == null,
    createNode: () => new Scalar(null),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new Scalar(null),
    stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
  };
  const boolTag = {
    identify: (value) => typeof value === "boolean",
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: (str) => new Scalar(str[0] === "t" || str[0] === "T"),
    stringify({ source, value }, ctx) {
      if (source && boolTag.test.test(source)) {
        const sv = source[0] === "t" || source[0] === "T";
        if (value === sv)
          return source;
      }
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
  };
  function stringifyNumber({ format: format2, minFractionDigits, tag, value }) {
    if (typeof value === "bigint")
      return String(value);
    const num = typeof value === "number" ? value : Number(value);
    if (!isFinite(num))
      return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
    let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
    if (!format2 && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
      let i = n.indexOf(".");
      if (i < 0) {
        i = n.length;
        n += ".";
      }
      let d2 = minFractionDigits - (n.length - i - 1);
      while (d2-- > 0)
        n += "0";
    }
    return n;
  }
  const floatNaN$1 = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber
  };
  const floatExp$1 = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "EXP",
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str),
    stringify(node) {
      const num = Number(node.value);
      return isFinite(num) ? num.toExponential() : stringifyNumber(node);
    }
  };
  const float$1 = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(str) {
      const node = new Scalar(parseFloat(str));
      const dot = str.indexOf(".");
      if (dot !== -1 && str[str.length - 1] === "0")
        node.minFractionDigits = str.length - dot - 1;
      return node;
    },
    stringify: stringifyNumber
  };
  const intIdentify$2 = (value) => typeof value === "bigint" || Number.isInteger(value);
  const intResolve$1 = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
  function intStringify$1(node, radix, prefix) {
    const { value } = node;
    if (intIdentify$2(value) && value >= 0)
      return prefix + value.toString(radix);
    return stringifyNumber(node);
  }
  const intOct$1 = {
    identify: (value) => intIdentify$2(value) && value >= 0,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "OCT",
    test: /^0o[0-7]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 2, 8, opt),
    stringify: (node) => intStringify$1(node, 8, "0o")
  };
  const int$1 = {
    identify: intIdentify$2,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^[-+]?[0-9]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 0, 10, opt),
    stringify: stringifyNumber
  };
  const intHex$1 = {
    identify: (value) => intIdentify$2(value) && value >= 0,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "HEX",
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 2, 16, opt),
    stringify: (node) => intStringify$1(node, 16, "0x")
  };
  const schema$2 = [
    map,
    seq,
    string,
    nullTag,
    boolTag,
    intOct$1,
    int$1,
    intHex$1,
    floatNaN$1,
    floatExp$1,
    float$1
  ];
  function intIdentify$1(value) {
    return typeof value === "bigint" || Number.isInteger(value);
  }
  const stringifyJSON = ({ value }) => JSON.stringify(value);
  const jsonScalars = [
    {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify: stringifyJSON
    },
    {
      identify: (value) => value == null,
      createNode: () => new Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^null$/,
      resolve: () => null,
      stringify: stringifyJSON
    },
    {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^true$|^false$/,
      resolve: (str) => str === "true",
      stringify: stringifyJSON
    },
    {
      identify: intIdentify$1,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^-?(?:0|[1-9][0-9]*)$/,
      resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
      stringify: ({ value }) => intIdentify$1(value) ? value.toString() : JSON.stringify(value)
    },
    {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
      resolve: (str) => parseFloat(str),
      stringify: stringifyJSON
    }
  ];
  const jsonError = {
    default: true,
    tag: "",
    test: /^/,
    resolve(str, onError) {
      onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
      return str;
    }
  };
  const schema$1 = [map, seq].concat(jsonScalars, jsonError);
  const binary = {
    identify: (value) => value instanceof Uint8Array,
    // Buffer inherits from Uint8Array
    default: false,
    tag: "tag:yaml.org,2002:binary",
    /**
     * Returns a Buffer in node and an Uint8Array in browsers
     *
     * To use the resulting buffer as an image, you'll want to do something like:
     *
     *   const blob = new Blob([buffer], { type: 'image/jpeg' })
     *   document.querySelector('#photo').src = URL.createObjectURL(blob)
     */
    resolve(src, onError) {
      if (typeof atob === "function") {
        const str = atob(src.replace(/[\n\r]/g, ""));
        const buffer = new Uint8Array(str.length);
        for (let i = 0; i < str.length; ++i)
          buffer[i] = str.charCodeAt(i);
        return buffer;
      } else {
        onError("This environment does not support reading binary tags; either Buffer or atob is required");
        return src;
      }
    },
    stringify({ comment: comment2, type, value }, ctx, onComment, onChompKeep) {
      if (!value)
        return "";
      const buf = value;
      let str;
      if (typeof btoa === "function") {
        let s = "";
        for (let i = 0; i < buf.length; ++i)
          s += String.fromCharCode(buf[i]);
        str = btoa(s);
      } else {
        throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
      }
      type ?? (type = Scalar.BLOCK_LITERAL);
      if (type !== Scalar.QUOTE_DOUBLE) {
        const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
        const n = Math.ceil(str.length / lineWidth);
        const lines = new Array(n);
        for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
          lines[i] = str.substr(o, lineWidth);
        }
        str = lines.join(type === Scalar.BLOCK_LITERAL ? "\n" : " ");
      }
      return stringifyString({ comment: comment2, type, value: str }, ctx, onComment, onChompKeep);
    }
  };
  function resolvePairs(seq2, onError) {
    if (isSeq(seq2)) {
      for (let i = 0; i < seq2.items.length; ++i) {
        let item = seq2.items[i];
        if (isPair(item))
          continue;
        else if (isMap(item)) {
          if (item.items.length > 1)
            onError("Each pair must have its own sequence indicator");
          const pair = item.items[0] || new Pair(new Scalar(null));
          if (item.commentBefore)
            pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
          if (item.comment) {
            const cn2 = pair.value ?? pair.key;
            cn2.comment = cn2.comment ? `${item.comment}
${cn2.comment}` : item.comment;
          }
          item = pair;
        }
        seq2.items[i] = isPair(item) ? item : new Pair(item);
      }
    } else
      onError("Expected a sequence for this tag");
    return seq2;
  }
  function createPairs(schema2, iterable, ctx) {
    const { replacer } = ctx;
    const pairs2 = new YAMLSeq(schema2);
    pairs2.tag = "tag:yaml.org,2002:pairs";
    let i = 0;
    if (iterable && Symbol.iterator in Object(iterable))
      for (let it2 of iterable) {
        if (typeof replacer === "function")
          it2 = replacer.call(iterable, String(i++), it2);
        let key, value;
        if (Array.isArray(it2)) {
          if (it2.length === 2) {
            key = it2[0];
            value = it2[1];
          } else
            throw new TypeError(`Expected [key, value] tuple: ${it2}`);
        } else if (it2 && it2 instanceof Object) {
          const keys = Object.keys(it2);
          if (keys.length === 1) {
            key = keys[0];
            value = it2[key];
          } else {
            throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
          }
        } else {
          key = it2;
        }
        pairs2.items.push(createPair(key, value, ctx));
      }
    return pairs2;
  }
  const pairs = {
    collection: "seq",
    default: false,
    tag: "tag:yaml.org,2002:pairs",
    resolve: resolvePairs,
    createNode: createPairs
  };
  class YAMLOMap extends YAMLSeq {
    constructor() {
      super();
      this.add = YAMLMap.prototype.add.bind(this);
      this.delete = YAMLMap.prototype.delete.bind(this);
      this.get = YAMLMap.prototype.get.bind(this);
      this.has = YAMLMap.prototype.has.bind(this);
      this.set = YAMLMap.prototype.set.bind(this);
      this.tag = YAMLOMap.tag;
    }
    /**
     * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
     * but TypeScript won't allow widening the signature of a child method.
     */
    toJSON(_2, ctx) {
      if (!ctx)
        return super.toJSON(_2);
      const map2 = /* @__PURE__ */ new Map();
      if (ctx == null ? void 0 : ctx.onCreate)
        ctx.onCreate(map2);
      for (const pair of this.items) {
        let key, value;
        if (isPair(pair)) {
          key = toJS(pair.key, "", ctx);
          value = toJS(pair.value, key, ctx);
        } else {
          key = toJS(pair, "", ctx);
        }
        if (map2.has(key))
          throw new Error("Ordered maps must not include duplicate keys");
        map2.set(key, value);
      }
      return map2;
    }
    static from(schema2, iterable, ctx) {
      const pairs2 = createPairs(schema2, iterable, ctx);
      const omap2 = new this();
      omap2.items = pairs2.items;
      return omap2;
    }
  }
  YAMLOMap.tag = "tag:yaml.org,2002:omap";
  const omap = {
    collection: "seq",
    identify: (value) => value instanceof Map,
    nodeClass: YAMLOMap,
    default: false,
    tag: "tag:yaml.org,2002:omap",
    resolve(seq2, onError) {
      const pairs2 = resolvePairs(seq2, onError);
      const seenKeys = [];
      for (const { key } of pairs2.items) {
        if (isScalar(key)) {
          if (seenKeys.includes(key.value)) {
            onError(`Ordered maps must not include duplicate keys: ${key.value}`);
          } else {
            seenKeys.push(key.value);
          }
        }
      }
      return Object.assign(new YAMLOMap(), pairs2);
    },
    createNode: (schema2, iterable, ctx) => YAMLOMap.from(schema2, iterable, ctx)
  };
  function boolStringify({ value, source }, ctx) {
    const boolObj = value ? trueTag : falseTag;
    if (source && boolObj.test.test(source))
      return source;
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
  const trueTag = {
    identify: (value) => value === true,
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new Scalar(true),
    stringify: boolStringify
  };
  const falseTag = {
    identify: (value) => value === false,
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
    resolve: () => new Scalar(false),
    stringify: boolStringify
  };
  const floatNaN = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber
  };
  const floatExp = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "EXP",
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str.replace(/_/g, "")),
    stringify(node) {
      const num = Number(node.value);
      return isFinite(num) ? num.toExponential() : stringifyNumber(node);
    }
  };
  const float = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(str) {
      const node = new Scalar(parseFloat(str.replace(/_/g, "")));
      const dot = str.indexOf(".");
      if (dot !== -1) {
        const f2 = str.substring(dot + 1).replace(/_/g, "");
        if (f2[f2.length - 1] === "0")
          node.minFractionDigits = f2.length;
      }
      return node;
    },
    stringify: stringifyNumber
  };
  const intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
  function intResolve(str, offset, radix, { intAsBigInt }) {
    const sign = str[0];
    if (sign === "-" || sign === "+")
      offset += 1;
    str = str.substring(offset).replace(/_/g, "");
    if (intAsBigInt) {
      switch (radix) {
        case 2:
          str = `0b${str}`;
          break;
        case 8:
          str = `0o${str}`;
          break;
        case 16:
          str = `0x${str}`;
          break;
      }
      const n2 = BigInt(str);
      return sign === "-" ? BigInt(-1) * n2 : n2;
    }
    const n = parseInt(str, radix);
    return sign === "-" ? -1 * n : n;
  }
  function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value)) {
      const str = value.toString(radix);
      return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
    }
    return stringifyNumber(node);
  }
  const intBin = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "BIN",
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
    stringify: (node) => intStringify(node, 2, "0b")
  };
  const intOct = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "OCT",
    test: /^[-+]?0[0-7_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
    stringify: (node) => intStringify(node, 8, "0")
  };
  const int = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber
  };
  const intHex = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "HEX",
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: (node) => intStringify(node, 16, "0x")
  };
  class YAMLSet extends YAMLMap {
    constructor(schema2) {
      super(schema2);
      this.tag = YAMLSet.tag;
    }
    add(key) {
      let pair;
      if (isPair(key))
        pair = key;
      else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
        pair = new Pair(key.key, null);
      else
        pair = new Pair(key, null);
      const prev = findPair(this.items, pair.key);
      if (!prev)
        this.items.push(pair);
    }
    /**
     * If `keepPair` is `true`, returns the Pair matching `key`.
     * Otherwise, returns the value of that Pair's key.
     */
    get(key, keepPair) {
      const pair = findPair(this.items, key);
      return !keepPair && isPair(pair) ? isScalar(pair.key) ? pair.key.value : pair.key : pair;
    }
    set(key, value) {
      if (typeof value !== "boolean")
        throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
      const prev = findPair(this.items, key);
      if (prev && !value) {
        this.items.splice(this.items.indexOf(prev), 1);
      } else if (!prev && value) {
        this.items.push(new Pair(key));
      }
    }
    toJSON(_2, ctx) {
      return super.toJSON(_2, ctx, Set);
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx)
        return JSON.stringify(this);
      if (this.hasAllNullValues(true))
        return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
      else
        throw new Error("Set items must all have null values");
    }
    static from(schema2, iterable, ctx) {
      const { replacer } = ctx;
      const set2 = new this(schema2);
      if (iterable && Symbol.iterator in Object(iterable))
        for (let value of iterable) {
          if (typeof replacer === "function")
            value = replacer.call(iterable, value, value);
          set2.items.push(createPair(value, null, ctx));
        }
      return set2;
    }
  }
  YAMLSet.tag = "tag:yaml.org,2002:set";
  const set = {
    collection: "map",
    identify: (value) => value instanceof Set,
    nodeClass: YAMLSet,
    default: false,
    tag: "tag:yaml.org,2002:set",
    createNode: (schema2, iterable, ctx) => YAMLSet.from(schema2, iterable, ctx),
    resolve(map2, onError) {
      if (isMap(map2)) {
        if (map2.hasAllNullValues(true))
          return Object.assign(new YAMLSet(), map2);
        else
          onError("Set items must all have null values");
      } else
        onError("Expected a mapping for this tag");
      return map2;
    }
  };
  function parseSexagesimal(str, asBigInt) {
    const sign = str[0];
    const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
    const num = (n) => asBigInt ? BigInt(n) : Number(n);
    const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
    return sign === "-" ? num(-1) * res : res;
  }
  function stringifySexagesimal(node) {
    let { value } = node;
    let num = (n) => n;
    if (typeof value === "bigint")
      num = (n) => BigInt(n);
    else if (isNaN(value) || !isFinite(value))
      return stringifyNumber(node);
    let sign = "";
    if (value < 0) {
      sign = "-";
      value *= num(-1);
    }
    const _60 = num(60);
    const parts = [value % _60];
    if (value < 60) {
      parts.unshift(0);
    } else {
      value = (value - parts[0]) / _60;
      parts.unshift(value % _60);
      if (value >= 60) {
        value = (value - parts[0]) / _60;
        parts.unshift(value);
      }
    }
    return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
  }
  const intTime = {
    identify: (value) => typeof value === "bigint" || Number.isInteger(value),
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "TIME",
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
    stringify: stringifySexagesimal
  };
  const floatTime = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "TIME",
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: (str) => parseSexagesimal(str, false),
    stringify: stringifySexagesimal
  };
  const timestamp = {
    identify: (value) => value instanceof Date,
    default: true,
    tag: "tag:yaml.org,2002:timestamp",
    // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
    // may be omitted altogether, resulting in a date format. In such a case, the time part is
    // assumed to be 00:00:00Z (start of day, UTC).
    test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
    resolve(str) {
      const match = str.match(timestamp.test);
      if (!match)
        throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
      const [, year, month, day, hour, minute, second] = match.map(Number);
      const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
      let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
      const tz = match[8];
      if (tz && tz !== "Z") {
        let d2 = parseSexagesimal(tz, false);
        if (Math.abs(d2) < 30)
          d2 *= 60;
        date -= 6e4 * d2;
      }
      return new Date(date);
    },
    stringify: ({ value }) => (value == null ? void 0 : value.toISOString().replace(/(T00:00:00)?\.000Z$/, "")) ?? ""
  };
  const schema = [
    map,
    seq,
    string,
    nullTag,
    trueTag,
    falseTag,
    intBin,
    intOct,
    int,
    intHex,
    floatNaN,
    floatExp,
    float,
    binary,
    merge,
    omap,
    pairs,
    set,
    intTime,
    floatTime,
    timestamp
  ];
  const schemas = /* @__PURE__ */ new Map([
    ["core", schema$2],
    ["failsafe", [map, seq, string]],
    ["json", schema$1],
    ["yaml11", schema],
    ["yaml-1.1", schema]
  ]);
  const tagsByName = {
    binary,
    bool: boolTag,
    float: float$1,
    floatExp: floatExp$1,
    floatNaN: floatNaN$1,
    floatTime,
    int: int$1,
    intHex: intHex$1,
    intOct: intOct$1,
    intTime,
    map,
    merge,
    null: nullTag,
    omap,
    pairs,
    seq,
    set,
    timestamp
  };
  const coreKnownTags = {
    "tag:yaml.org,2002:binary": binary,
    "tag:yaml.org,2002:merge": merge,
    "tag:yaml.org,2002:omap": omap,
    "tag:yaml.org,2002:pairs": pairs,
    "tag:yaml.org,2002:set": set,
    "tag:yaml.org,2002:timestamp": timestamp
  };
  function getTags(customTags, schemaName, addMergeTag) {
    const schemaTags = schemas.get(schemaName);
    if (schemaTags && !customTags) {
      return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : schemaTags.slice();
    }
    let tags = schemaTags;
    if (!tags) {
      if (Array.isArray(customTags))
        tags = [];
      else {
        const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
      }
    }
    if (Array.isArray(customTags)) {
      for (const tag of customTags)
        tags = tags.concat(tag);
    } else if (typeof customTags === "function") {
      tags = customTags(tags.slice());
    }
    if (addMergeTag)
      tags = tags.concat(merge);
    return tags.reduce((tags2, tag) => {
      const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
      if (!tagObj) {
        const tagName = JSON.stringify(tag);
        const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
      }
      if (!tags2.includes(tagObj))
        tags2.push(tagObj);
      return tags2;
    }, []);
  }
  const sortMapEntriesByKey = (a2, b2) => a2.key < b2.key ? -1 : a2.key > b2.key ? 1 : 0;
  class Schema {
    constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema: schema2, sortMapEntries, toStringDefaults }) {
      this.compat = Array.isArray(compat) ? getTags(compat, "compat") : compat ? getTags(null, compat) : null;
      this.name = typeof schema2 === "string" && schema2 || "core";
      this.knownTags = resolveKnownTags ? coreKnownTags : {};
      this.tags = getTags(customTags, this.name, merge2);
      this.toStringOptions = toStringDefaults ?? null;
      Object.defineProperty(this, MAP, { value: map });
      Object.defineProperty(this, SCALAR$1, { value: string });
      Object.defineProperty(this, SEQ, { value: seq });
      this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
    }
    clone() {
      const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
      copy.tags = this.tags.slice();
      return copy;
    }
  }
  function stringifyDocument(doc, options) {
    var _a2;
    const lines = [];
    let hasDirectives = options.directives === true;
    if (options.directives !== false && doc.directives) {
      const dir = doc.directives.toString(doc);
      if (dir) {
        lines.push(dir);
        hasDirectives = true;
      } else if (doc.directives.docStart)
        hasDirectives = true;
    }
    if (hasDirectives)
      lines.push("---");
    const ctx = createStringifyContext(doc, options);
    const { commentString } = ctx.options;
    if (doc.commentBefore) {
      if (lines.length !== 1)
        lines.unshift("");
      const cs = commentString(doc.commentBefore);
      lines.unshift(indentComment(cs, ""));
    }
    let chompKeep = false;
    let contentComment = null;
    if (doc.contents) {
      if (isNode(doc.contents)) {
        if (doc.contents.spaceBefore && hasDirectives)
          lines.push("");
        if (doc.contents.commentBefore) {
          const cs = commentString(doc.contents.commentBefore);
          lines.push(indentComment(cs, ""));
        }
        ctx.forceBlockIndent = !!doc.comment;
        contentComment = doc.contents.comment;
      }
      const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
      let body = stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
      if (contentComment)
        body += lineComment(body, "", commentString(contentComment));
      if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
        lines[lines.length - 1] = `--- ${body}`;
      } else
        lines.push(body);
    } else {
      lines.push(stringify(doc.contents, ctx));
    }
    if ((_a2 = doc.directives) == null ? void 0 : _a2.docEnd) {
      if (doc.comment) {
        const cs = commentString(doc.comment);
        if (cs.includes("\n")) {
          lines.push("...");
          lines.push(indentComment(cs, ""));
        } else {
          lines.push(`... ${cs}`);
        }
      } else {
        lines.push("...");
      }
    } else {
      let dc = doc.comment;
      if (dc && chompKeep)
        dc = dc.replace(/^\n+/, "");
      if (dc) {
        if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
          lines.push("");
        lines.push(indentComment(commentString(dc), ""));
      }
    }
    return lines.join("\n") + "\n";
  }
  class Document {
    constructor(value, replacer, options) {
      this.commentBefore = null;
      this.comment = null;
      this.errors = [];
      this.warnings = [];
      Object.defineProperty(this, NODE_TYPE, { value: DOC });
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
        replacer = void 0;
      }
      const opt = Object.assign({
        intAsBigInt: false,
        keepSourceTokens: false,
        logLevel: "warn",
        prettyErrors: true,
        strict: true,
        stringKeys: false,
        uniqueKeys: true,
        version: "1.2"
      }, options);
      this.options = opt;
      let { version } = opt;
      if (options == null ? void 0 : options._directives) {
        this.directives = options._directives.atDocument();
        if (this.directives.yaml.explicit)
          version = this.directives.yaml.version;
      } else
        this.directives = new Directives({ version });
      this.setSchema(version, options);
      this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
    }
    /**
     * Create a deep copy of this Document and its contents.
     *
     * Custom Node values that inherit from `Object` still refer to their original instances.
     */
    clone() {
      const copy = Object.create(Document.prototype, {
        [NODE_TYPE]: { value: DOC }
      });
      copy.commentBefore = this.commentBefore;
      copy.comment = this.comment;
      copy.errors = this.errors.slice();
      copy.warnings = this.warnings.slice();
      copy.options = Object.assign({}, this.options);
      if (this.directives)
        copy.directives = this.directives.clone();
      copy.schema = this.schema.clone();
      copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
      if (this.range)
        copy.range = this.range.slice();
      return copy;
    }
    /** Adds a value to the document. */
    add(value) {
      if (assertCollection(this.contents))
        this.contents.add(value);
    }
    /** Adds a value to the document. */
    addIn(path, value) {
      if (assertCollection(this.contents))
        this.contents.addIn(path, value);
    }
    /**
     * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
     *
     * If `node` already has an anchor, `name` is ignored.
     * Otherwise, the `node.anchor` value will be set to `name`,
     * or if an anchor with that name is already present in the document,
     * `name` will be used as a prefix for a new unique anchor.
     * If `name` is undefined, the generated anchor will use 'a' as a prefix.
     */
    createAlias(node, name2) {
      if (!node.anchor) {
        const prev = anchorNames(this);
        node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        !name2 || prev.has(name2) ? findNewAnchor(name2 || "a", prev) : name2;
      }
      return new Alias(node.anchor);
    }
    createNode(value, replacer, options) {
      let _replacer = void 0;
      if (typeof replacer === "function") {
        value = replacer.call({ "": value }, "", value);
        _replacer = replacer;
      } else if (Array.isArray(replacer)) {
        const keyToStr = (v2) => typeof v2 === "number" || v2 instanceof String || v2 instanceof Number;
        const asStr = replacer.filter(keyToStr).map(String);
        if (asStr.length > 0)
          replacer = replacer.concat(asStr);
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
        replacer = void 0;
      }
      const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
      const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(
        this,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        anchorPrefix || "a"
      );
      const ctx = {
        aliasDuplicateObjects: aliasDuplicateObjects ?? true,
        keepUndefined: keepUndefined ?? false,
        onAnchor,
        onTagObj,
        replacer: _replacer,
        schema: this.schema,
        sourceObjects
      };
      const node = createNode(value, tag, ctx);
      if (flow && isCollection(node))
        node.flow = true;
      setAnchors();
      return node;
    }
    /**
     * Convert a key and a value into a `Pair` using the current schema,
     * recursively wrapping all values as `Scalar` or `Collection` nodes.
     */
    createPair(key, value, options = {}) {
      const k2 = this.createNode(key, null, options);
      const v2 = this.createNode(value, null, options);
      return new Pair(k2, v2);
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
      return assertCollection(this.contents) ? this.contents.delete(key) : false;
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
      if (isEmptyPath(path)) {
        if (this.contents == null)
          return false;
        this.contents = null;
        return true;
      }
      return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    get(key, keepScalar) {
      return isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
    }
    /**
     * Returns item at `path`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
      if (isEmptyPath(path))
        return !keepScalar && isScalar(this.contents) ? this.contents.value : this.contents;
      return isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
    }
    /**
     * Checks if the document includes a value with the key `key`.
     */
    has(key) {
      return isCollection(this.contents) ? this.contents.has(key) : false;
    }
    /**
     * Checks if the document includes a value at `path`.
     */
    hasIn(path) {
      if (isEmptyPath(path))
        return this.contents !== void 0;
      return isCollection(this.contents) ? this.contents.hasIn(path) : false;
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    set(key, value) {
      if (this.contents == null) {
        this.contents = collectionFromPath(this.schema, [key], value);
      } else if (assertCollection(this.contents)) {
        this.contents.set(key, value);
      }
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
      if (isEmptyPath(path)) {
        this.contents = value;
      } else if (this.contents == null) {
        this.contents = collectionFromPath(this.schema, Array.from(path), value);
      } else if (assertCollection(this.contents)) {
        this.contents.setIn(path, value);
      }
    }
    /**
     * Change the YAML version and schema used by the document.
     * A `null` version disables support for directives, explicit tags, anchors, and aliases.
     * It also requires the `schema` option to be given as a `Schema` instance value.
     *
     * Overrides all previously set schema options.
     */
    setSchema(version, options = {}) {
      if (typeof version === "number")
        version = String(version);
      let opt;
      switch (version) {
        case "1.1":
          if (this.directives)
            this.directives.yaml.version = "1.1";
          else
            this.directives = new Directives({ version: "1.1" });
          opt = { resolveKnownTags: false, schema: "yaml-1.1" };
          break;
        case "1.2":
        case "next":
          if (this.directives)
            this.directives.yaml.version = version;
          else
            this.directives = new Directives({ version });
          opt = { resolveKnownTags: true, schema: "core" };
          break;
        case null:
          if (this.directives)
            delete this.directives;
          opt = null;
          break;
        default: {
          const sv = JSON.stringify(version);
          throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
        }
      }
      if (options.schema instanceof Object)
        this.schema = options.schema;
      else if (opt)
        this.schema = new Schema(Object.assign(opt, options));
      else
        throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
    }
    // json & jsonArg are only used from toJSON()
    toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
      const ctx = {
        anchors: /* @__PURE__ */ new Map(),
        doc: this,
        keep: !json,
        mapAsMap: mapAsMap === true,
        mapKeyWarned: false,
        maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
      };
      const res = toJS(this.contents, jsonArg ?? "", ctx);
      if (typeof onAnchor === "function")
        for (const { count, res: res2 } of ctx.anchors.values())
          onAnchor(res2, count);
      return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
    }
    /**
     * A JSON representation of the document `contents`.
     *
     * @param jsonArg Used by `JSON.stringify` to indicate the array index or
     *   property name.
     */
    toJSON(jsonArg, onAnchor) {
      return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
    }
    /** A YAML representation of the document. */
    toString(options = {}) {
      if (this.errors.length > 0)
        throw new Error("Document with errors cannot be stringified");
      if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
        const s = JSON.stringify(options.indent);
        throw new Error(`"indent" option must be a positive integer, not ${s}`);
      }
      return stringifyDocument(this, options);
    }
  }
  function assertCollection(contents) {
    if (isCollection(contents))
      return true;
    throw new Error("Expected a YAML collection as document contents");
  }
  class YAMLError extends Error {
    constructor(name2, pos, code2, message) {
      super();
      this.name = name2;
      this.code = code2;
      this.message = message;
      this.pos = pos;
    }
  }
  class YAMLParseError extends YAMLError {
    constructor(pos, code2, message) {
      super("YAMLParseError", pos, code2, message);
    }
  }
  class YAMLWarning extends YAMLError {
    constructor(pos, code2, message) {
      super("YAMLWarning", pos, code2, message);
    }
  }
  const prettifyError = (src, lc) => (error2) => {
    if (error2.pos[0] === -1)
      return;
    error2.linePos = error2.pos.map((pos) => lc.linePos(pos));
    const { line, col } = error2.linePos[0];
    error2.message += ` at line ${line}, column ${col}`;
    let ci2 = col - 1;
    let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
    if (ci2 >= 60 && lineStr.length > 80) {
      const trimStart = Math.min(ci2 - 39, lineStr.length - 79);
      lineStr = "…" + lineStr.substring(trimStart);
      ci2 -= trimStart - 1;
    }
    if (lineStr.length > 80)
      lineStr = lineStr.substring(0, 79) + "…";
    if (line > 1 && /^ *$/.test(lineStr.substring(0, ci2))) {
      let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
      if (prev.length > 80)
        prev = prev.substring(0, 79) + "…\n";
      lineStr = prev + lineStr;
    }
    if (/[^ ]/.test(lineStr)) {
      let count = 1;
      const end = error2.linePos[1];
      if ((end == null ? void 0 : end.line) === line && end.col > col) {
        count = Math.max(1, Math.min(end.col - col, 80 - ci2));
      }
      const pointer = " ".repeat(ci2) + "^".repeat(count);
      error2.message += `:

${lineStr}
${pointer}
`;
    }
  };
  function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
    let spaceBefore = false;
    let atNewline = startOnNewline;
    let hasSpace = startOnNewline;
    let comment2 = "";
    let commentSep = "";
    let hasNewline = false;
    let reqSpace = false;
    let tab = null;
    let anchor = null;
    let tag = null;
    let newlineAfterProp = null;
    let comma = null;
    let found = null;
    let start = null;
    for (const token of tokens) {
      if (reqSpace) {
        if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
          onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
        reqSpace = false;
      }
      if (tab) {
        if (atNewline && token.type !== "comment" && token.type !== "newline") {
          onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
        }
        tab = null;
      }
      switch (token.type) {
        case "space":
          if (!flow && (indicator !== "doc-start" || (next == null ? void 0 : next.type) !== "flow-collection") && token.source.includes("	")) {
            tab = token;
          }
          hasSpace = true;
          break;
        case "comment": {
          if (!hasSpace)
            onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const cb = token.source.substring(1) || " ";
          if (!comment2)
            comment2 = cb;
          else
            comment2 += commentSep + cb;
          commentSep = "";
          atNewline = false;
          break;
        }
        case "newline":
          if (atNewline) {
            if (comment2)
              comment2 += token.source;
            else if (!found || indicator !== "seq-item-ind")
              spaceBefore = true;
          } else
            commentSep += token.source;
          atNewline = true;
          hasNewline = true;
          if (anchor || tag)
            newlineAfterProp = token;
          hasSpace = true;
          break;
        case "anchor":
          if (anchor)
            onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
          if (token.source.endsWith(":"))
            onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
          anchor = token;
          start ?? (start = token.offset);
          atNewline = false;
          hasSpace = false;
          reqSpace = true;
          break;
        case "tag": {
          if (tag)
            onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
          tag = token;
          start ?? (start = token.offset);
          atNewline = false;
          hasSpace = false;
          reqSpace = true;
          break;
        }
        case indicator:
          if (anchor || tag)
            onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
          if (found)
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
          found = token;
          atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
          hasSpace = false;
          break;
        case "comma":
          if (flow) {
            if (comma)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
            comma = token;
            atNewline = false;
            hasSpace = false;
            break;
          }
        // else fallthrough
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
          atNewline = false;
          hasSpace = false;
      }
    }
    const last = tokens[tokens.length - 1];
    const end = last ? last.offset + last.source.length : offset;
    if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
      onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
    }
    if (tab && (atNewline && tab.indent <= parentIndent || (next == null ? void 0 : next.type) === "block-map" || (next == null ? void 0 : next.type) === "block-seq"))
      onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
    return {
      comma,
      found,
      spaceBefore,
      comment: comment2,
      hasNewline,
      anchor,
      tag,
      newlineAfterProp,
      end,
      start: start ?? end
    };
  }
  function containsNewline(key) {
    if (!key)
      return null;
    switch (key.type) {
      case "alias":
      case "scalar":
      case "double-quoted-scalar":
      case "single-quoted-scalar":
        if (key.source.includes("\n"))
          return true;
        if (key.end) {
          for (const st2 of key.end)
            if (st2.type === "newline")
              return true;
        }
        return false;
      case "flow-collection":
        for (const it2 of key.items) {
          for (const st2 of it2.start)
            if (st2.type === "newline")
              return true;
          if (it2.sep) {
            for (const st2 of it2.sep)
              if (st2.type === "newline")
                return true;
          }
          if (containsNewline(it2.key) || containsNewline(it2.value))
            return true;
        }
        return false;
      default:
        return true;
    }
  }
  function flowIndentCheck(indent, fc, onError) {
    if ((fc == null ? void 0 : fc.type) === "flow-collection") {
      const end = fc.end[0];
      if (end.indent === indent && (end.source === "]" || end.source === "}") && containsNewline(fc)) {
        const msg = "Flow end indicator should be more indented than parent";
        onError(end, "BAD_INDENT", msg, true);
      }
    }
  }
  function mapIncludes(ctx, items, search) {
    const { uniqueKeys } = ctx.options;
    if (uniqueKeys === false)
      return false;
    const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a2, b2) => a2 === b2 || isScalar(a2) && isScalar(b2) && a2.value === b2.value;
    return items.some((pair) => isEqual(pair.key, search));
  }
  const startColMsg = "All mapping items must start at the same column";
  function resolveBlockMap({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bm, onError, tag) {
    var _a2;
    const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? YAMLMap;
    const map2 = new NodeClass(ctx.schema);
    if (ctx.atRoot)
      ctx.atRoot = false;
    let offset = bm.offset;
    let commentEnd = null;
    for (const collItem of bm.items) {
      const { start, key, sep, value } = collItem;
      const keyProps = resolveProps(start, {
        indicator: "explicit-key-ind",
        next: key ?? (sep == null ? void 0 : sep[0]),
        offset,
        onError,
        parentIndent: bm.indent,
        startOnNewline: true
      });
      const implicitKey = !keyProps.found;
      if (implicitKey) {
        if (key) {
          if (key.type === "block-seq")
            onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
          else if ("indent" in key && key.indent !== bm.indent)
            onError(offset, "BAD_INDENT", startColMsg);
        }
        if (!keyProps.anchor && !keyProps.tag && !sep) {
          commentEnd = keyProps.end;
          if (keyProps.comment) {
            if (map2.comment)
              map2.comment += "\n" + keyProps.comment;
            else
              map2.comment = keyProps.comment;
          }
          continue;
        }
        if (keyProps.newlineAfterProp || containsNewline(key)) {
          onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
        }
      } else if (((_a2 = keyProps.found) == null ? void 0 : _a2.indent) !== bm.indent) {
        onError(offset, "BAD_INDENT", startColMsg);
      }
      ctx.atKey = true;
      const keyStart = keyProps.end;
      const keyNode = key ? composeNode2(ctx, key, keyProps, onError) : composeEmptyNode2(ctx, keyStart, start, null, keyProps, onError);
      if (ctx.schema.compat)
        flowIndentCheck(bm.indent, key, onError);
      ctx.atKey = false;
      if (mapIncludes(ctx, map2.items, keyNode))
        onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
      const valueProps = resolveProps(sep ?? [], {
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: bm.indent,
        startOnNewline: !key || key.type === "block-scalar"
      });
      offset = valueProps.end;
      if (valueProps.found) {
        if (implicitKey) {
          if ((value == null ? void 0 : value.type) === "block-map" && !valueProps.hasNewline)
            onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
          if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
            onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
        }
        const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : composeEmptyNode2(ctx, offset, sep, null, valueProps, onError);
        if (ctx.schema.compat)
          flowIndentCheck(bm.indent, value, onError);
        offset = valueNode.range[2];
        const pair = new Pair(keyNode, valueNode);
        if (ctx.options.keepSourceTokens)
          pair.srcToken = collItem;
        map2.items.push(pair);
      } else {
        if (implicitKey)
          onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
        if (valueProps.comment) {
          if (keyNode.comment)
            keyNode.comment += "\n" + valueProps.comment;
          else
            keyNode.comment = valueProps.comment;
        }
        const pair = new Pair(keyNode);
        if (ctx.options.keepSourceTokens)
          pair.srcToken = collItem;
        map2.items.push(pair);
      }
    }
    if (commentEnd && commentEnd < offset)
      onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
    map2.range = [bm.offset, offset, commentEnd ?? offset];
    return map2;
  }
  function resolveBlockSeq({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bs, onError, tag) {
    const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? YAMLSeq;
    const seq2 = new NodeClass(ctx.schema);
    if (ctx.atRoot)
      ctx.atRoot = false;
    if (ctx.atKey)
      ctx.atKey = false;
    let offset = bs.offset;
    let commentEnd = null;
    for (const { start, value } of bs.items) {
      const props = resolveProps(start, {
        indicator: "seq-item-ind",
        next: value,
        offset,
        onError,
        parentIndent: bs.indent,
        startOnNewline: true
      });
      if (!props.found) {
        if (props.anchor || props.tag || value) {
          if ((value == null ? void 0 : value.type) === "block-seq")
            onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
          else
            onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
        } else {
          commentEnd = props.end;
          if (props.comment)
            seq2.comment = props.comment;
          continue;
        }
      }
      const node = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, start, null, props, onError);
      if (ctx.schema.compat)
        flowIndentCheck(bs.indent, value, onError);
      offset = node.range[2];
      seq2.items.push(node);
    }
    seq2.range = [bs.offset, offset, commentEnd ?? offset];
    return seq2;
  }
  function resolveEnd(end, offset, reqSpace, onError) {
    let comment2 = "";
    if (end) {
      let hasSpace = false;
      let sep = "";
      for (const token of end) {
        const { source, type } = token;
        switch (type) {
          case "space":
            hasSpace = true;
            break;
          case "comment": {
            if (reqSpace && !hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = source.substring(1) || " ";
            if (!comment2)
              comment2 = cb;
            else
              comment2 += sep + cb;
            sep = "";
            break;
          }
          case "newline":
            if (comment2)
              sep += source;
            hasSpace = true;
            break;
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
        }
        offset += source.length;
      }
    }
    return { comment: comment2, offset };
  }
  const blockMsg = "Block collections are not allowed within flow collections";
  const isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
  function resolveFlowCollection({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, fc, onError, tag) {
    var _a2;
    const isMap2 = fc.start.source === "{";
    const fcName = isMap2 ? "flow map" : "flow sequence";
    const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? (isMap2 ? YAMLMap : YAMLSeq);
    const coll = new NodeClass(ctx.schema);
    coll.flow = true;
    const atRoot = ctx.atRoot;
    if (atRoot)
      ctx.atRoot = false;
    if (ctx.atKey)
      ctx.atKey = false;
    let offset = fc.offset + fc.start.source.length;
    for (let i = 0; i < fc.items.length; ++i) {
      const collItem = fc.items[i];
      const { start, key, sep, value } = collItem;
      const props = resolveProps(start, {
        flow: fcName,
        indicator: "explicit-key-ind",
        next: key ?? (sep == null ? void 0 : sep[0]),
        offset,
        onError,
        parentIndent: fc.indent,
        startOnNewline: false
      });
      if (!props.found) {
        if (!props.anchor && !props.tag && !sep && !value) {
          if (i === 0 && props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
          else if (i < fc.items.length - 1)
            onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
          if (props.comment) {
            if (coll.comment)
              coll.comment += "\n" + props.comment;
            else
              coll.comment = props.comment;
          }
          offset = props.end;
          continue;
        }
        if (!isMap2 && ctx.options.strict && containsNewline(key))
          onError(
            key,
            // checked by containsNewline()
            "MULTILINE_IMPLICIT_KEY",
            "Implicit keys of flow sequence pairs need to be on a single line"
          );
      }
      if (i === 0) {
        if (props.comma)
          onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
      } else {
        if (!props.comma)
          onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
        if (props.comment) {
          let prevItemComment = "";
          loop: for (const st2 of start) {
            switch (st2.type) {
              case "comma":
              case "space":
                break;
              case "comment":
                prevItemComment = st2.source.substring(1);
                break loop;
              default:
                break loop;
            }
          }
          if (prevItemComment) {
            let prev = coll.items[coll.items.length - 1];
            if (isPair(prev))
              prev = prev.value ?? prev.key;
            if (prev.comment)
              prev.comment += "\n" + prevItemComment;
            else
              prev.comment = prevItemComment;
            props.comment = props.comment.substring(prevItemComment.length + 1);
          }
        }
      }
      if (!isMap2 && !sep && !props.found) {
        const valueNode = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, sep, null, props, onError);
        coll.items.push(valueNode);
        offset = valueNode.range[2];
        if (isBlock(value))
          onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
      } else {
        ctx.atKey = true;
        const keyStart = props.end;
        const keyNode = key ? composeNode2(ctx, key, props, onError) : composeEmptyNode2(ctx, keyStart, start, null, props, onError);
        if (isBlock(key))
          onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
        ctx.atKey = false;
        const valueProps = resolveProps(sep ?? [], {
          flow: fcName,
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (valueProps.found) {
          if (!isMap2 && !props.found && ctx.options.strict) {
            if (sep)
              for (const st2 of sep) {
                if (st2 === valueProps.found)
                  break;
                if (st2.type === "newline") {
                  onError(st2, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                  break;
                }
              }
            if (props.start < valueProps.found.offset - 1024)
              onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
          }
        } else if (value) {
          if ("source" in value && ((_a2 = value.source) == null ? void 0 : _a2[0]) === ":")
            onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
          else
            onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
        }
        const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode2(ctx, valueProps.end, sep, null, valueProps, onError) : null;
        if (valueNode) {
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else if (valueProps.comment) {
          if (keyNode.comment)
            keyNode.comment += "\n" + valueProps.comment;
          else
            keyNode.comment = valueProps.comment;
        }
        const pair = new Pair(keyNode, valueNode);
        if (ctx.options.keepSourceTokens)
          pair.srcToken = collItem;
        if (isMap2) {
          const map2 = coll;
          if (mapIncludes(ctx, map2.items, keyNode))
            onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
          map2.items.push(pair);
        } else {
          const map2 = new YAMLMap(ctx.schema);
          map2.flow = true;
          map2.items.push(pair);
          const endRange = (valueNode ?? keyNode).range;
          map2.range = [keyNode.range[0], endRange[1], endRange[2]];
          coll.items.push(map2);
        }
        offset = valueNode ? valueNode.range[2] : valueProps.end;
      }
    }
    const expectedEnd = isMap2 ? "}" : "]";
    const [ce2, ...ee2] = fc.end;
    let cePos = offset;
    if ((ce2 == null ? void 0 : ce2.source) === expectedEnd)
      cePos = ce2.offset + ce2.source.length;
    else {
      const name2 = fcName[0].toUpperCase() + fcName.substring(1);
      const msg = atRoot ? `${name2} must end with a ${expectedEnd}` : `${name2} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
      onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
      if (ce2 && ce2.source.length !== 1)
        ee2.unshift(ce2);
    }
    if (ee2.length > 0) {
      const end = resolveEnd(ee2, cePos, ctx.options.strict, onError);
      if (end.comment) {
        if (coll.comment)
          coll.comment += "\n" + end.comment;
        else
          coll.comment = end.comment;
      }
      coll.range = [fc.offset, cePos, end.offset];
    } else {
      coll.range = [fc.offset, cePos, cePos];
    }
    return coll;
  }
  function resolveCollection(CN2, ctx, token, onError, tagName, tag) {
    const coll = token.type === "block-map" ? resolveBlockMap(CN2, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq(CN2, ctx, token, onError, tag) : resolveFlowCollection(CN2, ctx, token, onError, tag);
    const Coll = coll.constructor;
    if (tagName === "!" || tagName === Coll.tagName) {
      coll.tag = Coll.tagName;
      return coll;
    }
    if (tagName)
      coll.tag = tagName;
    return coll;
  }
  function composeCollection(CN2, ctx, token, props, onError) {
    var _a2;
    const tagToken = props.tag;
    const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
    if (token.type === "block-seq") {
      const { anchor, newlineAfterProp: nl } = props;
      const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
      if (lastProp && (!nl || nl.offset < lastProp.offset)) {
        const message = "Missing newline after block sequence props";
        onError(lastProp, "MISSING_CHAR", message);
      }
    }
    const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
    if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.tagName && expType === "seq") {
      return resolveCollection(CN2, ctx, token, onError, tagName);
    }
    let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
    if (!tag) {
      const kt2 = ctx.schema.knownTags[tagName];
      if ((kt2 == null ? void 0 : kt2.collection) === expType) {
        ctx.schema.tags.push(Object.assign({}, kt2, { default: false }));
        tag = kt2;
      } else {
        if (kt2) {
          onError(tagToken, "BAD_COLLECTION_TYPE", `${kt2.tag} used for ${expType} collection, but expects ${kt2.collection ?? "scalar"}`, true);
        } else {
          onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
        }
        return resolveCollection(CN2, ctx, token, onError, tagName);
      }
    }
    const coll = resolveCollection(CN2, ctx, token, onError, tagName, tag);
    const res = ((_a2 = tag.resolve) == null ? void 0 : _a2.call(tag, coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options)) ?? coll;
    const node = isNode(res) ? res : new Scalar(res);
    node.range = coll.range;
    node.tag = tagName;
    if (tag == null ? void 0 : tag.format)
      node.format = tag.format;
    return node;
  }
  function resolveBlockScalar(ctx, scalar, onError) {
    const start = scalar.offset;
    const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
    if (!header)
      return { value: "", type: null, comment: "", range: [start, start, start] };
    const type = header.mode === ">" ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL;
    const lines = scalar.source ? splitLines(scalar.source) : [];
    let chompStart = lines.length;
    for (let i = lines.length - 1; i >= 0; --i) {
      const content = lines[i][1];
      if (content === "" || content === "\r")
        chompStart = i;
      else
        break;
    }
    if (chompStart === 0) {
      const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
      let end2 = start + header.length;
      if (scalar.source)
        end2 += scalar.source.length;
      return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
    }
    let trimIndent = scalar.indent + header.indent;
    let offset = scalar.offset + header.length;
    let contentStart = 0;
    for (let i = 0; i < chompStart; ++i) {
      const [indent, content] = lines[i];
      if (content === "" || content === "\r") {
        if (header.indent === 0 && indent.length > trimIndent)
          trimIndent = indent.length;
      } else {
        if (indent.length < trimIndent) {
          const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
          onError(offset + indent.length, "MISSING_CHAR", message);
        }
        if (header.indent === 0)
          trimIndent = indent.length;
        contentStart = i;
        if (trimIndent === 0 && !ctx.atRoot) {
          const message = "Block scalar values in collections must be indented";
          onError(offset, "BAD_INDENT", message);
        }
        break;
      }
      offset += indent.length + content.length + 1;
    }
    for (let i = lines.length - 1; i >= chompStart; --i) {
      if (lines[i][0].length > trimIndent)
        chompStart = i + 1;
    }
    let value = "";
    let sep = "";
    let prevMoreIndented = false;
    for (let i = 0; i < contentStart; ++i)
      value += lines[i][0].slice(trimIndent) + "\n";
    for (let i = contentStart; i < chompStart; ++i) {
      let [indent, content] = lines[i];
      offset += indent.length + content.length + 1;
      const crlf = content[content.length - 1] === "\r";
      if (crlf)
        content = content.slice(0, -1);
      if (content && indent.length < trimIndent) {
        const src = header.indent ? "explicit indentation indicator" : "first line";
        const message = `Block scalar lines must not be less indented than their ${src}`;
        onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
        indent = "";
      }
      if (type === Scalar.BLOCK_LITERAL) {
        value += sep + indent.slice(trimIndent) + content;
        sep = "\n";
      } else if (indent.length > trimIndent || content[0] === "	") {
        if (sep === " ")
          sep = "\n";
        else if (!prevMoreIndented && sep === "\n")
          sep = "\n\n";
        value += sep + indent.slice(trimIndent) + content;
        sep = "\n";
        prevMoreIndented = true;
      } else if (content === "") {
        if (sep === "\n")
          value += "\n";
        else
          sep = "\n";
      } else {
        value += sep + content;
        sep = " ";
        prevMoreIndented = false;
      }
    }
    switch (header.chomp) {
      case "-":
        break;
      case "+":
        for (let i = chompStart; i < lines.length; ++i)
          value += "\n" + lines[i][0].slice(trimIndent);
        if (value[value.length - 1] !== "\n")
          value += "\n";
        break;
      default:
        value += "\n";
    }
    const end = start + header.length + scalar.source.length;
    return { value, type, comment: header.comment, range: [start, end, end] };
  }
  function parseBlockScalarHeader({ offset, props }, strict, onError) {
    if (props[0].type !== "block-scalar-header") {
      onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
      return null;
    }
    const { source } = props[0];
    const mode = source[0];
    let indent = 0;
    let chomp = "";
    let error2 = -1;
    for (let i = 1; i < source.length; ++i) {
      const ch = source[i];
      if (!chomp && (ch === "-" || ch === "+"))
        chomp = ch;
      else {
        const n = Number(ch);
        if (!indent && n)
          indent = n;
        else if (error2 === -1)
          error2 = offset + i;
      }
    }
    if (error2 !== -1)
      onError(error2, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
    let hasSpace = false;
    let comment2 = "";
    let length = source.length;
    for (let i = 1; i < props.length; ++i) {
      const token = props[i];
      switch (token.type) {
        case "space":
          hasSpace = true;
        // fallthrough
        case "newline":
          length += token.source.length;
          break;
        case "comment":
          if (strict && !hasSpace) {
            const message = "Comments must be separated from other tokens by white space characters";
            onError(token, "MISSING_CHAR", message);
          }
          length += token.source.length;
          comment2 = token.source.substring(1);
          break;
        case "error":
          onError(token, "UNEXPECTED_TOKEN", token.message);
          length += token.source.length;
          break;
        /* istanbul ignore next should not happen */
        default: {
          const message = `Unexpected token in block scalar header: ${token.type}`;
          onError(token, "UNEXPECTED_TOKEN", message);
          const ts = token.source;
          if (ts && typeof ts === "string")
            length += ts.length;
        }
      }
    }
    return { mode, indent, chomp, comment: comment2, length };
  }
  function splitLines(source) {
    const split = source.split(/\n( *)/);
    const first = split[0];
    const m2 = first.match(/^( *)/);
    const line0 = (m2 == null ? void 0 : m2[1]) ? [m2[1], first.slice(m2[1].length)] : ["", first];
    const lines = [line0];
    for (let i = 1; i < split.length; i += 2)
      lines.push([split[i], split[i + 1]]);
    return lines;
  }
  function resolveFlowScalar(scalar, strict, onError) {
    const { offset, type, source, end } = scalar;
    let _type;
    let value;
    const _onError = (rel, code2, msg) => onError(offset + rel, code2, msg);
    switch (type) {
      case "scalar":
        _type = Scalar.PLAIN;
        value = plainValue(source, _onError);
        break;
      case "single-quoted-scalar":
        _type = Scalar.QUOTE_SINGLE;
        value = singleQuotedValue(source, _onError);
        break;
      case "double-quoted-scalar":
        _type = Scalar.QUOTE_DOUBLE;
        value = doubleQuotedValue(source, _onError);
        break;
      /* istanbul ignore next should not happen */
      default:
        onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
        return {
          value: "",
          type: null,
          comment: "",
          range: [offset, offset + source.length, offset + source.length]
        };
    }
    const valueEnd = offset + source.length;
    const re2 = resolveEnd(end, valueEnd, strict, onError);
    return {
      value,
      type: _type,
      comment: re2.comment,
      range: [offset, valueEnd, re2.offset]
    };
  }
  function plainValue(source, onError) {
    let badChar = "";
    switch (source[0]) {
      /* istanbul ignore next should not happen */
      case "	":
        badChar = "a tab character";
        break;
      case ",":
        badChar = "flow indicator character ,";
        break;
      case "%":
        badChar = "directive indicator character %";
        break;
      case "|":
      case ">": {
        badChar = `block scalar indicator ${source[0]}`;
        break;
      }
      case "@":
      case "`": {
        badChar = `reserved character ${source[0]}`;
        break;
      }
    }
    if (badChar)
      onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
    return foldLines(source);
  }
  function singleQuotedValue(source, onError) {
    if (source[source.length - 1] !== "'" || source.length === 1)
      onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
    return foldLines(source.slice(1, -1)).replace(/''/g, "'");
  }
  function foldLines(source) {
    let first, line;
    try {
      first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
      line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
    } catch {
      first = /(.*?)[ \t]*\r?\n/sy;
      line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
    }
    let match = first.exec(source);
    if (!match)
      return source;
    let res = match[1];
    let sep = " ";
    let pos = first.lastIndex;
    line.lastIndex = pos;
    while (match = line.exec(source)) {
      if (match[1] === "") {
        if (sep === "\n")
          res += sep;
        else
          sep = "\n";
      } else {
        res += sep + match[1];
        sep = " ";
      }
      pos = line.lastIndex;
    }
    const last = /[ \t]*(.*)/sy;
    last.lastIndex = pos;
    match = last.exec(source);
    return res + sep + ((match == null ? void 0 : match[1]) ?? "");
  }
  function doubleQuotedValue(source, onError) {
    let res = "";
    for (let i = 1; i < source.length - 1; ++i) {
      const ch = source[i];
      if (ch === "\r" && source[i + 1] === "\n")
        continue;
      if (ch === "\n") {
        const { fold, offset } = foldNewline(source, i);
        res += fold;
        i = offset;
      } else if (ch === "\\") {
        let next = source[++i];
        const cc = escapeCodes[next];
        if (cc)
          res += cc;
        else if (next === "\n") {
          next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
        } else if (next === "\r" && source[i + 1] === "\n") {
          next = source[++i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
        } else if (next === "x" || next === "u" || next === "U") {
          const length = { x: 2, u: 4, U: 8 }[next];
          res += parseCharCode(source, i + 1, length, onError);
          i += length;
        } else {
          const raw = source.substr(i - 1, 2);
          onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
          res += raw;
        }
      } else if (ch === " " || ch === "	") {
        const wsStart = i;
        let next = source[i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
        if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
          res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
      } else {
        res += ch;
      }
    }
    if (source[source.length - 1] !== '"' || source.length === 1)
      onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
    return res;
  }
  function foldNewline(source, offset) {
    let fold = "";
    let ch = source[offset + 1];
    while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
      if (ch === "\r" && source[offset + 2] !== "\n")
        break;
      if (ch === "\n")
        fold += "\n";
      offset += 1;
      ch = source[offset + 1];
    }
    if (!fold)
      fold = " ";
    return { fold, offset };
  }
  const escapeCodes = {
    "0": "\0",
    // null character
    a: "\x07",
    // bell character
    b: "\b",
    // backspace
    e: "\x1B",
    // escape character
    f: "\f",
    // form feed
    n: "\n",
    // line feed
    r: "\r",
    // carriage return
    t: "	",
    // horizontal tab
    v: "\v",
    // vertical tab
    N: "",
    // Unicode next line
    _: " ",
    // Unicode non-breaking space
    L: "\u2028",
    // Unicode line separator
    P: "\u2029",
    // Unicode paragraph separator
    " ": " ",
    '"': '"',
    "/": "/",
    "\\": "\\",
    "	": "	"
  };
  function parseCharCode(source, offset, length, onError) {
    const cc = source.substr(offset, length);
    const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
    const code2 = ok ? parseInt(cc, 16) : NaN;
    if (isNaN(code2)) {
      const raw = source.substr(offset - 2, length + 2);
      onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
      return raw;
    }
    return String.fromCodePoint(code2);
  }
  function composeScalar(ctx, token, tagToken, onError) {
    const { value, type, comment: comment2, range } = token.type === "block-scalar" ? resolveBlockScalar(ctx, token, onError) : resolveFlowScalar(token, ctx.options.strict, onError);
    const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
    let tag;
    if (ctx.options.stringKeys && ctx.atKey) {
      tag = ctx.schema[SCALAR$1];
    } else if (tagName)
      tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
    else if (token.type === "scalar")
      tag = findScalarTagByTest(ctx, value, token, onError);
    else
      tag = ctx.schema[SCALAR$1];
    let scalar;
    try {
      const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
      scalar = isScalar(res) ? res : new Scalar(res);
    } catch (error2) {
      const msg = error2 instanceof Error ? error2.message : String(error2);
      onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
      scalar = new Scalar(value);
    }
    scalar.range = range;
    scalar.source = value;
    if (type)
      scalar.type = type;
    if (tagName)
      scalar.tag = tagName;
    if (tag.format)
      scalar.format = tag.format;
    if (comment2)
      scalar.comment = comment2;
    return scalar;
  }
  function findScalarTagByName(schema2, value, tagName, tagToken, onError) {
    var _a2;
    if (tagName === "!")
      return schema2[SCALAR$1];
    const matchWithTest = [];
    for (const tag of schema2.tags) {
      if (!tag.collection && tag.tag === tagName) {
        if (tag.default && tag.test)
          matchWithTest.push(tag);
        else
          return tag;
      }
    }
    for (const tag of matchWithTest)
      if ((_a2 = tag.test) == null ? void 0 : _a2.test(value))
        return tag;
    const kt2 = schema2.knownTags[tagName];
    if (kt2 && !kt2.collection) {
      schema2.tags.push(Object.assign({}, kt2, { default: false, test: void 0 }));
      return kt2;
    }
    onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
    return schema2[SCALAR$1];
  }
  function findScalarTagByTest({ atKey, directives, schema: schema2 }, value, token, onError) {
    const tag = schema2.tags.find((tag2) => {
      var _a2;
      return (tag2.default === true || atKey && tag2.default === "key") && ((_a2 = tag2.test) == null ? void 0 : _a2.test(value));
    }) || schema2[SCALAR$1];
    if (schema2.compat) {
      const compat = schema2.compat.find((tag2) => {
        var _a2;
        return tag2.default && ((_a2 = tag2.test) == null ? void 0 : _a2.test(value));
      }) ?? schema2[SCALAR$1];
      if (tag.tag !== compat.tag) {
        const ts = directives.tagString(tag.tag);
        const cs = directives.tagString(compat.tag);
        const msg = `Value may be parsed as either ${ts} or ${cs}`;
        onError(token, "TAG_RESOLVE_FAILED", msg, true);
      }
    }
    return tag;
  }
  function emptyScalarPosition(offset, before, pos) {
    if (before) {
      pos ?? (pos = before.length);
      for (let i = pos - 1; i >= 0; --i) {
        let st2 = before[i];
        switch (st2.type) {
          case "space":
          case "comment":
          case "newline":
            offset -= st2.source.length;
            continue;
        }
        st2 = before[++i];
        while ((st2 == null ? void 0 : st2.type) === "space") {
          offset += st2.source.length;
          st2 = before[++i];
        }
        break;
      }
    }
    return offset;
  }
  const CN = { composeNode, composeEmptyNode };
  function composeNode(ctx, token, props, onError) {
    const atKey = ctx.atKey;
    const { spaceBefore, comment: comment2, anchor, tag } = props;
    let node;
    let isSrcToken = true;
    switch (token.type) {
      case "alias":
        node = composeAlias(ctx, token, onError);
        if (anchor || tag)
          onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
        break;
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
      case "block-scalar":
        node = composeScalar(ctx, token, tag, onError);
        if (anchor)
          node.anchor = anchor.source.substring(1);
        break;
      case "block-map":
      case "block-seq":
      case "flow-collection":
        try {
          node = composeCollection(CN, ctx, token, props, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
        } catch (error2) {
          const message = error2 instanceof Error ? error2.message : String(error2);
          onError(token, "RESOURCE_EXHAUSTION", message);
        }
        break;
      default: {
        const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
        onError(token, "UNEXPECTED_TOKEN", message);
        isSrcToken = false;
      }
    }
    node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
    if (anchor && node.anchor === "")
      onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
    if (atKey && ctx.options.stringKeys && (!isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
      const msg = "With stringKeys, all keys must be strings";
      onError(tag ?? token, "NON_STRING_KEY", msg);
    }
    if (spaceBefore)
      node.spaceBefore = true;
    if (comment2) {
      if (token.type === "scalar" && token.source === "")
        node.comment = comment2;
      else
        node.commentBefore = comment2;
    }
    if (ctx.options.keepSourceTokens && isSrcToken)
      node.srcToken = token;
    return node;
  }
  function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment: comment2, anchor, tag, end }, onError) {
    const token = {
      type: "scalar",
      offset: emptyScalarPosition(offset, before, pos),
      indent: -1,
      source: ""
    };
    const node = composeScalar(ctx, token, tag, onError);
    if (anchor) {
      node.anchor = anchor.source.substring(1);
      if (node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
    }
    if (spaceBefore)
      node.spaceBefore = true;
    if (comment2) {
      node.comment = comment2;
      node.range[2] = end;
    }
    return node;
  }
  function composeAlias({ options }, { offset, source, end }, onError) {
    const alias = new Alias(source.substring(1));
    if (alias.source === "")
      onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
    if (alias.source.endsWith(":"))
      onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
    const valueEnd = offset + source.length;
    const re2 = resolveEnd(end, valueEnd, options.strict, onError);
    alias.range = [offset, valueEnd, re2.offset];
    if (re2.comment)
      alias.comment = re2.comment;
    return alias;
  }
  function composeDoc(options, directives, { offset, start, value, end }, onError) {
    const opts = Object.assign({ _directives: directives }, options);
    const doc = new Document(void 0, opts);
    const ctx = {
      atKey: false,
      atRoot: true,
      directives: doc.directives,
      options: doc.options,
      schema: doc.schema
    };
    const props = resolveProps(start, {
      indicator: "doc-start",
      next: value ?? (end == null ? void 0 : end[0]),
      offset,
      onError,
      parentIndent: 0,
      startOnNewline: true
    });
    if (props.found) {
      doc.directives.docStart = true;
      if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
        onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
    }
    doc.contents = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
    const contentEnd = doc.contents.range[2];
    const re2 = resolveEnd(end, contentEnd, false, onError);
    if (re2.comment)
      doc.comment = re2.comment;
    doc.range = [offset, contentEnd, re2.offset];
    return doc;
  }
  function getErrorPos(src) {
    if (typeof src === "number")
      return [src, src + 1];
    if (Array.isArray(src))
      return src.length === 2 ? src : [src[0], src[1]];
    const { offset, source } = src;
    return [offset, offset + (typeof source === "string" ? source.length : 1)];
  }
  function parsePrelude(prelude) {
    var _a2;
    let comment2 = "";
    let atComment = false;
    let afterEmptyLine = false;
    for (let i = 0; i < prelude.length; ++i) {
      const source = prelude[i];
      switch (source[0]) {
        case "#":
          comment2 += (comment2 === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
          atComment = true;
          afterEmptyLine = false;
          break;
        case "%":
          if (((_a2 = prelude[i + 1]) == null ? void 0 : _a2[0]) !== "#")
            i += 1;
          atComment = false;
          break;
        default:
          if (!atComment)
            afterEmptyLine = true;
          atComment = false;
      }
    }
    return { comment: comment2, afterEmptyLine };
  }
  class Composer {
    constructor(options = {}) {
      this.doc = null;
      this.atDirectives = false;
      this.prelude = [];
      this.errors = [];
      this.warnings = [];
      this.onError = (source, code2, message, warning) => {
        const pos = getErrorPos(source);
        if (warning)
          this.warnings.push(new YAMLWarning(pos, code2, message));
        else
          this.errors.push(new YAMLParseError(pos, code2, message));
      };
      this.directives = new Directives({ version: options.version || "1.2" });
      this.options = options;
    }
    decorate(doc, afterDoc) {
      const { comment: comment2, afterEmptyLine } = parsePrelude(this.prelude);
      if (comment2) {
        const dc = doc.contents;
        if (afterDoc) {
          doc.comment = doc.comment ? `${doc.comment}
${comment2}` : comment2;
        } else if (afterEmptyLine || doc.directives.docStart || !dc) {
          doc.commentBefore = comment2;
        } else if (isCollection(dc) && !dc.flow && dc.items.length > 0) {
          let it2 = dc.items[0];
          if (isPair(it2))
            it2 = it2.key;
          const cb = it2.commentBefore;
          it2.commentBefore = cb ? `${comment2}
${cb}` : comment2;
        } else {
          const cb = dc.commentBefore;
          dc.commentBefore = cb ? `${comment2}
${cb}` : comment2;
        }
      }
      if (afterDoc) {
        Array.prototype.push.apply(doc.errors, this.errors);
        Array.prototype.push.apply(doc.warnings, this.warnings);
      } else {
        doc.errors = this.errors;
        doc.warnings = this.warnings;
      }
      this.prelude = [];
      this.errors = [];
      this.warnings = [];
    }
    /**
     * Current stream status information.
     *
     * Mostly useful at the end of input for an empty stream.
     */
    streamInfo() {
      return {
        comment: parsePrelude(this.prelude).comment,
        directives: this.directives,
        errors: this.errors,
        warnings: this.warnings
      };
    }
    /**
     * Compose tokens into documents.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *compose(tokens, forceDoc = false, endOffset = -1) {
      for (const token of tokens)
        yield* this.next(token);
      yield* this.end(forceDoc, endOffset);
    }
    /** Advance the composer by one CST token. */
    *next(token) {
      switch (token.type) {
        case "directive":
          this.directives.add(token.source, (offset, message, warning) => {
            const pos = getErrorPos(token);
            pos[0] += offset;
            this.onError(pos, "BAD_DIRECTIVE", message, warning);
          });
          this.prelude.push(token.source);
          this.atDirectives = true;
          break;
        case "document": {
          const doc = composeDoc(this.options, this.directives, token, this.onError);
          if (this.atDirectives && !doc.directives.docStart)
            this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
          this.decorate(doc, false);
          if (this.doc)
            yield this.doc;
          this.doc = doc;
          this.atDirectives = false;
          break;
        }
        case "byte-order-mark":
        case "space":
          break;
        case "comment":
        case "newline":
          this.prelude.push(token.source);
          break;
        case "error": {
          const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
          const error2 = new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
          if (this.atDirectives || !this.doc)
            this.errors.push(error2);
          else
            this.doc.errors.push(error2);
          break;
        }
        case "doc-end": {
          if (!this.doc) {
            const msg = "Unexpected doc-end without preceding document";
            this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
            break;
          }
          this.doc.directives.docEnd = true;
          const end = resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
          this.decorate(this.doc, true);
          if (end.comment) {
            const dc = this.doc.comment;
            this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
          }
          this.doc.range[2] = end.offset;
          break;
        }
        default:
          this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
      }
    }
    /**
     * Call at end of input to yield any remaining document.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *end(forceDoc = false, endOffset = -1) {
      if (this.doc) {
        this.decorate(this.doc, true);
        yield this.doc;
        this.doc = null;
      } else if (forceDoc) {
        const opts = Object.assign({ _directives: this.directives }, this.options);
        const doc = new Document(void 0, opts);
        if (this.atDirectives)
          this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
        doc.range = [0, endOffset, endOffset];
        this.decorate(doc, false);
        yield doc;
      }
    }
  }
  const BOM = "\uFEFF";
  const DOCUMENT = "";
  const FLOW_END = "";
  const SCALAR = "";
  function tokenType(source) {
    switch (source) {
      case BOM:
        return "byte-order-mark";
      case DOCUMENT:
        return "doc-mode";
      case FLOW_END:
        return "flow-error-end";
      case SCALAR:
        return "scalar";
      case "---":
        return "doc-start";
      case "...":
        return "doc-end";
      case "":
      case "\n":
      case "\r\n":
        return "newline";
      case "-":
        return "seq-item-ind";
      case "?":
        return "explicit-key-ind";
      case ":":
        return "map-value-ind";
      case "{":
        return "flow-map-start";
      case "}":
        return "flow-map-end";
      case "[":
        return "flow-seq-start";
      case "]":
        return "flow-seq-end";
      case ",":
        return "comma";
    }
    switch (source[0]) {
      case " ":
      case "	":
        return "space";
      case "#":
        return "comment";
      case "%":
        return "directive-line";
      case "*":
        return "alias";
      case "&":
        return "anchor";
      case "!":
        return "tag";
      case "'":
        return "single-quoted-scalar";
      case '"':
        return "double-quoted-scalar";
      case "|":
      case ">":
        return "block-scalar-header";
    }
    return null;
  }
  function isEmpty(ch) {
    switch (ch) {
      case void 0:
      case " ":
      case "\n":
      case "\r":
      case "	":
        return true;
      default:
        return false;
    }
  }
  const hexDigits = new Set("0123456789ABCDEFabcdef");
  const tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
  const flowIndicatorChars = new Set(",[]{}");
  const invalidAnchorChars = new Set(" ,[]{}\n\r	");
  const isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
  class Lexer {
    constructor() {
      this.atEnd = false;
      this.blockScalarIndent = -1;
      this.blockScalarKeep = false;
      this.buffer = "";
      this.flowKey = false;
      this.flowLevel = 0;
      this.indentNext = 0;
      this.indentValue = 0;
      this.lineEndPos = null;
      this.next = null;
      this.pos = 0;
    }
    /**
     * Generate YAML tokens from the `source` string. If `incomplete`,
     * a part of the last line may be left as a buffer for the next call.
     *
     * @returns A generator of lexical tokens
     */
    *lex(source, incomplete = false) {
      if (source) {
        if (typeof source !== "string")
          throw TypeError("source is not a string");
        this.buffer = this.buffer ? this.buffer + source : source;
        this.lineEndPos = null;
      }
      this.atEnd = !incomplete;
      let next = this.next ?? "stream";
      while (next && (incomplete || this.hasChars(1)))
        next = yield* this.parseNext(next);
    }
    atLineEnd() {
      let i = this.pos;
      let ch = this.buffer[i];
      while (ch === " " || ch === "	")
        ch = this.buffer[++i];
      if (!ch || ch === "#" || ch === "\n")
        return true;
      if (ch === "\r")
        return this.buffer[i + 1] === "\n";
      return false;
    }
    charAt(n) {
      return this.buffer[this.pos + n];
    }
    continueScalar(offset) {
      let ch = this.buffer[offset];
      if (this.indentNext > 0) {
        let indent = 0;
        while (ch === " ")
          ch = this.buffer[++indent + offset];
        if (ch === "\r") {
          const next = this.buffer[indent + offset + 1];
          if (next === "\n" || !next && !this.atEnd)
            return offset + indent + 1;
        }
        return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
      }
      if (ch === "-" || ch === ".") {
        const dt2 = this.buffer.substr(offset, 3);
        if ((dt2 === "---" || dt2 === "...") && isEmpty(this.buffer[offset + 3]))
          return -1;
      }
      return offset;
    }
    getLine() {
      let end = this.lineEndPos;
      if (typeof end !== "number" || end !== -1 && end < this.pos) {
        end = this.buffer.indexOf("\n", this.pos);
        this.lineEndPos = end;
      }
      if (end === -1)
        return this.atEnd ? this.buffer.substring(this.pos) : null;
      if (this.buffer[end - 1] === "\r")
        end -= 1;
      return this.buffer.substring(this.pos, end);
    }
    hasChars(n) {
      return this.pos + n <= this.buffer.length;
    }
    setNext(state) {
      this.buffer = this.buffer.substring(this.pos);
      this.pos = 0;
      this.lineEndPos = null;
      this.next = state;
      return null;
    }
    peek(n) {
      return this.buffer.substr(this.pos, n);
    }
    *parseNext(next) {
      switch (next) {
        case "stream":
          return yield* this.parseStream();
        case "line-start":
          return yield* this.parseLineStart();
        case "block-start":
          return yield* this.parseBlockStart();
        case "doc":
          return yield* this.parseDocument();
        case "flow":
          return yield* this.parseFlowCollection();
        case "quoted-scalar":
          return yield* this.parseQuotedScalar();
        case "block-scalar":
          return yield* this.parseBlockScalar();
        case "plain-scalar":
          return yield* this.parsePlainScalar();
      }
    }
    *parseStream() {
      let line = this.getLine();
      if (line === null)
        return this.setNext("stream");
      if (line[0] === BOM) {
        yield* this.pushCount(1);
        line = line.substring(1);
      }
      if (line[0] === "%") {
        let dirEnd = line.length;
        let cs = line.indexOf("#");
        while (cs !== -1) {
          const ch = line[cs - 1];
          if (ch === " " || ch === "	") {
            dirEnd = cs - 1;
            break;
          } else {
            cs = line.indexOf("#", cs + 1);
          }
        }
        while (true) {
          const ch = line[dirEnd - 1];
          if (ch === " " || ch === "	")
            dirEnd -= 1;
          else
            break;
        }
        const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
        yield* this.pushCount(line.length - n);
        this.pushNewline();
        return "stream";
      }
      if (this.atLineEnd()) {
        const sp = yield* this.pushSpaces(true);
        yield* this.pushCount(line.length - sp);
        yield* this.pushNewline();
        return "stream";
      }
      yield DOCUMENT;
      return yield* this.parseLineStart();
    }
    *parseLineStart() {
      const ch = this.charAt(0);
      if (!ch && !this.atEnd)
        return this.setNext("line-start");
      if (ch === "-" || ch === ".") {
        if (!this.atEnd && !this.hasChars(4))
          return this.setNext("line-start");
        const s = this.peek(3);
        if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
          yield* this.pushCount(3);
          this.indentValue = 0;
          this.indentNext = 0;
          return s === "---" ? "doc" : "stream";
        }
      }
      this.indentValue = yield* this.pushSpaces(false);
      if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
        this.indentNext = this.indentValue;
      return yield* this.parseBlockStart();
    }
    *parseBlockStart() {
      const [ch0, ch1] = this.peek(2);
      if (!ch1 && !this.atEnd)
        return this.setNext("block-start");
      if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
        const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
        this.indentNext = this.indentValue + 1;
        this.indentValue += n;
        return yield* this.parseBlockStart();
      }
      return "doc";
    }
    *parseDocument() {
      yield* this.pushSpaces(true);
      const line = this.getLine();
      if (line === null)
        return this.setNext("doc");
      let n = yield* this.pushIndicators();
      switch (line[n]) {
        case "#":
          yield* this.pushCount(line.length - n);
        // fallthrough
        case void 0:
          yield* this.pushNewline();
          return yield* this.parseLineStart();
        case "{":
        case "[":
          yield* this.pushCount(1);
          this.flowKey = false;
          this.flowLevel = 1;
          return "flow";
        case "}":
        case "]":
          yield* this.pushCount(1);
          return "doc";
        case "*":
          yield* this.pushUntil(isNotAnchorChar);
          return "doc";
        case '"':
        case "'":
          return yield* this.parseQuotedScalar();
        case "|":
        case ">":
          n += yield* this.parseBlockScalarHeader();
          n += yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - n);
          yield* this.pushNewline();
          return yield* this.parseBlockScalar();
        default:
          return yield* this.parsePlainScalar();
      }
    }
    *parseFlowCollection() {
      let nl, sp;
      let indent = -1;
      do {
        nl = yield* this.pushNewline();
        if (nl > 0) {
          sp = yield* this.pushSpaces(false);
          this.indentValue = indent = sp;
        } else {
          sp = 0;
        }
        sp += yield* this.pushSpaces(true);
      } while (nl + sp > 0);
      const line = this.getLine();
      if (line === null)
        return this.setNext("flow");
      if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
        const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
        if (!atFlowEndMarker) {
          this.flowLevel = 0;
          yield FLOW_END;
          return yield* this.parseLineStart();
        }
      }
      let n = 0;
      while (line[n] === ",") {
        n += yield* this.pushCount(1);
        n += yield* this.pushSpaces(true);
        this.flowKey = false;
      }
      n += yield* this.pushIndicators();
      switch (line[n]) {
        case void 0:
          return "flow";
        case "#":
          yield* this.pushCount(line.length - n);
          return "flow";
        case "{":
        case "[":
          yield* this.pushCount(1);
          this.flowKey = false;
          this.flowLevel += 1;
          return "flow";
        case "}":
        case "]":
          yield* this.pushCount(1);
          this.flowKey = true;
          this.flowLevel -= 1;
          return this.flowLevel ? "flow" : "doc";
        case "*":
          yield* this.pushUntil(isNotAnchorChar);
          return "flow";
        case '"':
        case "'":
          this.flowKey = true;
          return yield* this.parseQuotedScalar();
        case ":": {
          const next = this.charAt(1);
          if (this.flowKey || isEmpty(next) || next === ",") {
            this.flowKey = false;
            yield* this.pushCount(1);
            yield* this.pushSpaces(true);
            return "flow";
          }
        }
        // fallthrough
        default:
          this.flowKey = false;
          return yield* this.parsePlainScalar();
      }
    }
    *parseQuotedScalar() {
      const quote = this.charAt(0);
      let end = this.buffer.indexOf(quote, this.pos + 1);
      if (quote === "'") {
        while (end !== -1 && this.buffer[end + 1] === "'")
          end = this.buffer.indexOf("'", end + 2);
      } else {
        while (end !== -1) {
          let n = 0;
          while (this.buffer[end - 1 - n] === "\\")
            n += 1;
          if (n % 2 === 0)
            break;
          end = this.buffer.indexOf('"', end + 1);
        }
      }
      const qb = this.buffer.substring(0, end);
      let nl = qb.indexOf("\n", this.pos);
      if (nl !== -1) {
        while (nl !== -1) {
          const cs = this.continueScalar(nl + 1);
          if (cs === -1)
            break;
          nl = qb.indexOf("\n", cs);
        }
        if (nl !== -1) {
          end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
        }
      }
      if (end === -1) {
        if (!this.atEnd)
          return this.setNext("quoted-scalar");
        end = this.buffer.length;
      }
      yield* this.pushToIndex(end + 1, false);
      return this.flowLevel ? "flow" : "doc";
    }
    *parseBlockScalarHeader() {
      this.blockScalarIndent = -1;
      this.blockScalarKeep = false;
      let i = this.pos;
      while (true) {
        const ch = this.buffer[++i];
        if (ch === "+")
          this.blockScalarKeep = true;
        else if (ch > "0" && ch <= "9")
          this.blockScalarIndent = Number(ch) - 1;
        else if (ch !== "-")
          break;
      }
      return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
    }
    *parseBlockScalar() {
      let nl = this.pos - 1;
      let indent = 0;
      let ch;
      loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
        switch (ch) {
          case " ":
            indent += 1;
            break;
          case "\n":
            nl = i2;
            indent = 0;
            break;
          case "\r": {
            const next = this.buffer[i2 + 1];
            if (!next && !this.atEnd)
              return this.setNext("block-scalar");
            if (next === "\n")
              break;
          }
          // fallthrough
          default:
            break loop;
        }
      }
      if (!ch && !this.atEnd)
        return this.setNext("block-scalar");
      if (indent >= this.indentNext) {
        if (this.blockScalarIndent === -1)
          this.indentNext = indent;
        else {
          this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
        }
        do {
          const cs = this.continueScalar(nl + 1);
          if (cs === -1)
            break;
          nl = this.buffer.indexOf("\n", cs);
        } while (nl !== -1);
        if (nl === -1) {
          if (!this.atEnd)
            return this.setNext("block-scalar");
          nl = this.buffer.length;
        }
      }
      let i = nl + 1;
      ch = this.buffer[i];
      while (ch === " ")
        ch = this.buffer[++i];
      if (ch === "	") {
        while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
          ch = this.buffer[++i];
        nl = i - 1;
      } else if (!this.blockScalarKeep) {
        do {
          let i2 = nl - 1;
          let ch2 = this.buffer[i2];
          if (ch2 === "\r")
            ch2 = this.buffer[--i2];
          const lastChar = i2;
          while (ch2 === " ")
            ch2 = this.buffer[--i2];
          if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
            nl = i2;
          else
            break;
        } while (true);
      }
      yield SCALAR;
      yield* this.pushToIndex(nl + 1, true);
      return yield* this.parseLineStart();
    }
    *parsePlainScalar() {
      const inFlow = this.flowLevel > 0;
      let end = this.pos - 1;
      let i = this.pos - 1;
      let ch;
      while (ch = this.buffer[++i]) {
        if (ch === ":") {
          const next = this.buffer[i + 1];
          if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
            break;
          end = i;
        } else if (isEmpty(ch)) {
          let next = this.buffer[i + 1];
          if (ch === "\r") {
            if (next === "\n") {
              i += 1;
              ch = "\n";
              next = this.buffer[i + 1];
            } else
              end = i;
          }
          if (next === "#" || inFlow && flowIndicatorChars.has(next))
            break;
          if (ch === "\n") {
            const cs = this.continueScalar(i + 1);
            if (cs === -1)
              break;
            i = Math.max(i, cs - 2);
          }
        } else {
          if (inFlow && flowIndicatorChars.has(ch))
            break;
          end = i;
        }
      }
      if (!ch && !this.atEnd)
        return this.setNext("plain-scalar");
      yield SCALAR;
      yield* this.pushToIndex(end + 1, true);
      return inFlow ? "flow" : "doc";
    }
    *pushCount(n) {
      if (n > 0) {
        yield this.buffer.substr(this.pos, n);
        this.pos += n;
        return n;
      }
      return 0;
    }
    *pushToIndex(i, allowEmpty) {
      const s = this.buffer.slice(this.pos, i);
      if (s) {
        yield s;
        this.pos += s.length;
        return s.length;
      } else if (allowEmpty)
        yield "";
      return 0;
    }
    *pushIndicators() {
      switch (this.charAt(0)) {
        case "!":
          return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
        case "&":
          return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const inFlow = this.flowLevel > 0;
          const ch1 = this.charAt(1);
          if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
            if (!inFlow)
              this.indentNext = this.indentValue + 1;
            else if (this.flowKey)
              this.flowKey = false;
            return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          }
        }
      }
      return 0;
    }
    *pushTag() {
      if (this.charAt(1) === "<") {
        let i = this.pos + 2;
        let ch = this.buffer[i];
        while (!isEmpty(ch) && ch !== ">")
          ch = this.buffer[++i];
        return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
      } else {
        let i = this.pos + 1;
        let ch = this.buffer[i];
        while (ch) {
          if (tagChars.has(ch))
            ch = this.buffer[++i];
          else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
            ch = this.buffer[i += 3];
          } else
            break;
        }
        return yield* this.pushToIndex(i, false);
      }
    }
    *pushNewline() {
      const ch = this.buffer[this.pos];
      if (ch === "\n")
        return yield* this.pushCount(1);
      else if (ch === "\r" && this.charAt(1) === "\n")
        return yield* this.pushCount(2);
      else
        return 0;
    }
    *pushSpaces(allowTabs) {
      let i = this.pos - 1;
      let ch;
      do {
        ch = this.buffer[++i];
      } while (ch === " " || allowTabs && ch === "	");
      const n = i - this.pos;
      if (n > 0) {
        yield this.buffer.substr(this.pos, n);
        this.pos = i;
      }
      return n;
    }
    *pushUntil(test) {
      let i = this.pos;
      let ch = this.buffer[i];
      while (!test(ch))
        ch = this.buffer[++i];
      return yield* this.pushToIndex(i, false);
    }
  }
  class LineCounter {
    constructor() {
      this.lineStarts = [];
      this.addNewLine = (offset) => this.lineStarts.push(offset);
      this.linePos = (offset) => {
        let low = 0;
        let high = this.lineStarts.length;
        while (low < high) {
          const mid = low + high >> 1;
          if (this.lineStarts[mid] < offset)
            low = mid + 1;
          else
            high = mid;
        }
        if (this.lineStarts[low] === offset)
          return { line: low + 1, col: 1 };
        if (low === 0)
          return { line: 0, col: offset };
        const start = this.lineStarts[low - 1];
        return { line: low, col: offset - start + 1 };
      };
    }
  }
  function includesToken(list2, type) {
    for (let i = 0; i < list2.length; ++i)
      if (list2[i].type === type)
        return true;
    return false;
  }
  function findNonEmptyIndex(list2) {
    for (let i = 0; i < list2.length; ++i) {
      switch (list2[i].type) {
        case "space":
        case "comment":
        case "newline":
          break;
        default:
          return i;
      }
    }
    return -1;
  }
  function isFlowToken(token) {
    switch (token == null ? void 0 : token.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
      case "flow-collection":
        return true;
      default:
        return false;
    }
  }
  function getPrevProps(parent) {
    switch (parent.type) {
      case "document":
        return parent.start;
      case "block-map": {
        const it2 = parent.items[parent.items.length - 1];
        return it2.sep ?? it2.start;
      }
      case "block-seq":
        return parent.items[parent.items.length - 1].start;
      /* istanbul ignore next should not happen */
      default:
        return [];
    }
  }
  function getFirstKeyStartProps(prev) {
    var _a2;
    if (prev.length === 0)
      return [];
    let i = prev.length;
    loop: while (--i >= 0) {
      switch (prev[i].type) {
        case "doc-start":
        case "explicit-key-ind":
        case "map-value-ind":
        case "seq-item-ind":
        case "newline":
          break loop;
      }
    }
    while (((_a2 = prev[++i]) == null ? void 0 : _a2.type) === "space") {
    }
    return prev.splice(i, prev.length);
  }
  function fixFlowSeqItems(fc) {
    if (fc.start.type === "flow-seq-start") {
      for (const it2 of fc.items) {
        if (it2.sep && !it2.value && !includesToken(it2.start, "explicit-key-ind") && !includesToken(it2.sep, "map-value-ind")) {
          if (it2.key)
            it2.value = it2.key;
          delete it2.key;
          if (isFlowToken(it2.value)) {
            if (it2.value.end)
              Array.prototype.push.apply(it2.value.end, it2.sep);
            else
              it2.value.end = it2.sep;
          } else
            Array.prototype.push.apply(it2.start, it2.sep);
          delete it2.sep;
        }
      }
    }
  }
  class Parser {
    /**
     * @param onNewLine - If defined, called separately with the start position of
     *   each new line (in `parse()`, including the start of input).
     */
    constructor(onNewLine) {
      this.atNewLine = true;
      this.atScalar = false;
      this.indent = 0;
      this.offset = 0;
      this.onKeyLine = false;
      this.stack = [];
      this.source = "";
      this.type = "";
      this.lexer = new Lexer();
      this.onNewLine = onNewLine;
    }
    /**
     * Parse `source` as a YAML stream.
     * If `incomplete`, a part of the last line may be left as a buffer for the next call.
     *
     * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
     *
     * @returns A generator of tokens representing each directive, document, and other structure.
     */
    *parse(source, incomplete = false) {
      if (this.onNewLine && this.offset === 0)
        this.onNewLine(0);
      for (const lexeme of this.lexer.lex(source, incomplete))
        yield* this.next(lexeme);
      if (!incomplete)
        yield* this.end();
    }
    /**
     * Advance the parser by the `source` of one lexical token.
     */
    *next(source) {
      this.source = source;
      if (this.atScalar) {
        this.atScalar = false;
        yield* this.step();
        this.offset += source.length;
        return;
      }
      const type = tokenType(source);
      if (!type) {
        const message = `Not a YAML token: ${source}`;
        yield* this.pop({ type: "error", offset: this.offset, message, source });
        this.offset += source.length;
      } else if (type === "scalar") {
        this.atNewLine = false;
        this.atScalar = true;
        this.type = "scalar";
      } else {
        this.type = type;
        yield* this.step();
        switch (type) {
          case "newline":
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine)
              this.onNewLine(this.offset + source.length);
            break;
          case "space":
            if (this.atNewLine && source[0] === " ")
              this.indent += source.length;
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            if (this.atNewLine)
              this.indent += source.length;
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = false;
        }
        this.offset += source.length;
      }
    }
    /** Call at end of input to push out any remaining constructions */
    *end() {
      while (this.stack.length > 0)
        yield* this.pop();
    }
    get sourceToken() {
      const st2 = {
        type: this.type,
        offset: this.offset,
        indent: this.indent,
        source: this.source
      };
      return st2;
    }
    *step() {
      const top = this.peek(1);
      if (this.type === "doc-end" && (top == null ? void 0 : top.type) !== "doc-end") {
        while (this.stack.length > 0)
          yield* this.pop();
        this.stack.push({
          type: "doc-end",
          offset: this.offset,
          source: this.source
        });
        return;
      }
      if (!top)
        return yield* this.stream();
      switch (top.type) {
        case "document":
          return yield* this.document(top);
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return yield* this.scalar(top);
        case "block-scalar":
          return yield* this.blockScalar(top);
        case "block-map":
          return yield* this.blockMap(top);
        case "block-seq":
          return yield* this.blockSequence(top);
        case "flow-collection":
          return yield* this.flowCollection(top);
        case "doc-end":
          return yield* this.documentEnd(top);
      }
      yield* this.pop();
    }
    peek(n) {
      return this.stack[this.stack.length - n];
    }
    *pop(error2) {
      const token = error2 ?? this.stack.pop();
      if (!token) {
        const message = "Tried to pop an empty stack";
        yield { type: "error", offset: this.offset, source: "", message };
      } else if (this.stack.length === 0) {
        yield token;
      } else {
        const top = this.peek(1);
        if (token.type === "block-scalar") {
          token.indent = "indent" in top ? top.indent : 0;
        } else if (token.type === "flow-collection" && top.type === "document") {
          token.indent = 0;
        }
        if (token.type === "flow-collection")
          fixFlowSeqItems(token);
        switch (top.type) {
          case "document":
            top.value = token;
            break;
          case "block-scalar":
            top.props.push(token);
            break;
          case "block-map": {
            const it2 = top.items[top.items.length - 1];
            if (it2.value) {
              top.items.push({ start: [], key: token, sep: [] });
              this.onKeyLine = true;
              return;
            } else if (it2.sep) {
              it2.value = token;
            } else {
              Object.assign(it2, { key: token, sep: [] });
              this.onKeyLine = !it2.explicitKey;
              return;
            }
            break;
          }
          case "block-seq": {
            const it2 = top.items[top.items.length - 1];
            if (it2.value)
              top.items.push({ start: [], value: token });
            else
              it2.value = token;
            break;
          }
          case "flow-collection": {
            const it2 = top.items[top.items.length - 1];
            if (!it2 || it2.value)
              top.items.push({ start: [], key: token, sep: [] });
            else if (it2.sep)
              it2.value = token;
            else
              Object.assign(it2, { key: token, sep: [] });
            return;
          }
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.pop(token);
        }
        if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
          const last = token.items[token.items.length - 1];
          if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st2) => st2.type !== "comment" || st2.indent < token.indent))) {
            if (top.type === "document")
              top.end = last.start;
            else
              top.items.push({ start: last.start });
            token.items.splice(-1, 1);
          }
        }
      }
    }
    *stream() {
      switch (this.type) {
        case "directive-line":
          yield { type: "directive", offset: this.offset, source: this.source };
          return;
        case "byte-order-mark":
        case "space":
        case "comment":
        case "newline":
          yield this.sourceToken;
          return;
        case "doc-mode":
        case "doc-start": {
          const doc = {
            type: "document",
            offset: this.offset,
            start: []
          };
          if (this.type === "doc-start")
            doc.start.push(this.sourceToken);
          this.stack.push(doc);
          return;
        }
      }
      yield {
        type: "error",
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML stream`,
        source: this.source
      };
    }
    *document(doc) {
      if (doc.value)
        return yield* this.lineEnd(doc);
      switch (this.type) {
        case "doc-start": {
          if (findNonEmptyIndex(doc.start) !== -1) {
            yield* this.pop();
            yield* this.step();
          } else
            doc.start.push(this.sourceToken);
          return;
        }
        case "anchor":
        case "tag":
        case "space":
        case "comment":
        case "newline":
          doc.start.push(this.sourceToken);
          return;
      }
      const bv = this.startBlockValue(doc);
      if (bv)
        this.stack.push(bv);
      else {
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML document`,
          source: this.source
        };
      }
    }
    *scalar(scalar) {
      if (this.type === "map-value-ind") {
        const prev = getPrevProps(this.peek(2));
        const start = getFirstKeyStartProps(prev);
        let sep;
        if (scalar.end) {
          sep = scalar.end;
          sep.push(this.sourceToken);
          delete scalar.end;
        } else
          sep = [this.sourceToken];
        const map2 = {
          type: "block-map",
          offset: scalar.offset,
          indent: scalar.indent,
          items: [{ start, key: scalar, sep }]
        };
        this.onKeyLine = true;
        this.stack[this.stack.length - 1] = map2;
      } else
        yield* this.lineEnd(scalar);
    }
    *blockScalar(scalar) {
      switch (this.type) {
        case "space":
        case "comment":
        case "newline":
          scalar.props.push(this.sourceToken);
          return;
        case "scalar":
          scalar.source = this.source;
          this.atNewLine = true;
          this.indent = 0;
          if (this.onNewLine) {
            let nl = this.source.indexOf("\n") + 1;
            while (nl !== 0) {
              this.onNewLine(this.offset + nl);
              nl = this.source.indexOf("\n", nl) + 1;
            }
          }
          yield* this.pop();
          break;
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop();
          yield* this.step();
      }
    }
    *blockMap(map2) {
      var _a2;
      const it2 = map2.items[map2.items.length - 1];
      switch (this.type) {
        case "newline":
          this.onKeyLine = false;
          if (it2.value) {
            const end = "end" in it2.value ? it2.value.end : void 0;
            const last = Array.isArray(end) ? end[end.length - 1] : void 0;
            if ((last == null ? void 0 : last.type) === "comment")
              end == null ? void 0 : end.push(this.sourceToken);
            else
              map2.items.push({ start: [this.sourceToken] });
          } else if (it2.sep) {
            it2.sep.push(this.sourceToken);
          } else {
            it2.start.push(this.sourceToken);
          }
          return;
        case "space":
        case "comment":
          if (it2.value) {
            map2.items.push({ start: [this.sourceToken] });
          } else if (it2.sep) {
            it2.sep.push(this.sourceToken);
          } else {
            if (this.atIndentedComment(it2.start, map2.indent)) {
              const prev = map2.items[map2.items.length - 2];
              const end = (_a2 = prev == null ? void 0 : prev.value) == null ? void 0 : _a2.end;
              if (Array.isArray(end)) {
                Array.prototype.push.apply(end, it2.start);
                end.push(this.sourceToken);
                map2.items.pop();
                return;
              }
            }
            it2.start.push(this.sourceToken);
          }
          return;
      }
      if (this.indent >= map2.indent) {
        const atMapIndent = !this.onKeyLine && this.indent === map2.indent;
        const atNextItem = atMapIndent && (it2.sep || it2.explicitKey) && this.type !== "seq-item-ind";
        let start = [];
        if (atNextItem && it2.sep && !it2.value) {
          const nl = [];
          for (let i = 0; i < it2.sep.length; ++i) {
            const st2 = it2.sep[i];
            switch (st2.type) {
              case "newline":
                nl.push(i);
                break;
              case "space":
                break;
              case "comment":
                if (st2.indent > map2.indent)
                  nl.length = 0;
                break;
              default:
                nl.length = 0;
            }
          }
          if (nl.length >= 2)
            start = it2.sep.splice(nl[1]);
        }
        switch (this.type) {
          case "anchor":
          case "tag":
            if (atNextItem || it2.value) {
              start.push(this.sourceToken);
              map2.items.push({ start });
              this.onKeyLine = true;
            } else if (it2.sep) {
              it2.sep.push(this.sourceToken);
            } else {
              it2.start.push(this.sourceToken);
            }
            return;
          case "explicit-key-ind":
            if (!it2.sep && !it2.explicitKey) {
              it2.start.push(this.sourceToken);
              it2.explicitKey = true;
            } else if (atNextItem || it2.value) {
              start.push(this.sourceToken);
              map2.items.push({ start, explicitKey: true });
            } else {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: [this.sourceToken], explicitKey: true }]
              });
            }
            this.onKeyLine = true;
            return;
          case "map-value-ind":
            if (it2.explicitKey) {
              if (!it2.sep) {
                if (includesToken(it2.start, "newline")) {
                  Object.assign(it2, { key: null, sep: [this.sourceToken] });
                } else {
                  const start2 = getFirstKeyStartProps(it2.start);
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                  });
                }
              } else if (it2.value) {
                map2.items.push({ start: [], key: null, sep: [this.sourceToken] });
              } else if (includesToken(it2.sep, "map-value-ind")) {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start, key: null, sep: [this.sourceToken] }]
                });
              } else if (isFlowToken(it2.key) && !includesToken(it2.sep, "newline")) {
                const start2 = getFirstKeyStartProps(it2.start);
                const key = it2.key;
                const sep = it2.sep;
                sep.push(this.sourceToken);
                delete it2.key;
                delete it2.sep;
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: start2, key, sep }]
                });
              } else if (start.length > 0) {
                it2.sep = it2.sep.concat(start, this.sourceToken);
              } else {
                it2.sep.push(this.sourceToken);
              }
            } else {
              if (!it2.sep) {
                Object.assign(it2, { key: null, sep: [this.sourceToken] });
              } else if (it2.value || atNextItem) {
                map2.items.push({ start, key: null, sep: [this.sourceToken] });
              } else if (includesToken(it2.sep, "map-value-ind")) {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [], key: null, sep: [this.sourceToken] }]
                });
              } else {
                it2.sep.push(this.sourceToken);
              }
            }
            this.onKeyLine = true;
            return;
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar": {
            const fs = this.flowScalar(this.type);
            if (atNextItem || it2.value) {
              map2.items.push({ start, key: fs, sep: [] });
              this.onKeyLine = true;
            } else if (it2.sep) {
              this.stack.push(fs);
            } else {
              Object.assign(it2, { key: fs, sep: [] });
              this.onKeyLine = true;
            }
            return;
          }
          default: {
            const bv = this.startBlockValue(map2);
            if (bv) {
              if (bv.type === "block-seq") {
                if (!it2.explicitKey && it2.sep && !includesToken(it2.sep, "newline")) {
                  yield* this.pop({
                    type: "error",
                    offset: this.offset,
                    message: "Unexpected block-seq-ind on same line with key",
                    source: this.source
                  });
                  return;
                }
              } else if (atMapIndent) {
                map2.items.push({ start });
              }
              this.stack.push(bv);
              return;
            }
          }
        }
      }
      yield* this.pop();
      yield* this.step();
    }
    *blockSequence(seq2) {
      var _a2;
      const it2 = seq2.items[seq2.items.length - 1];
      switch (this.type) {
        case "newline":
          if (it2.value) {
            const end = "end" in it2.value ? it2.value.end : void 0;
            const last = Array.isArray(end) ? end[end.length - 1] : void 0;
            if ((last == null ? void 0 : last.type) === "comment")
              end == null ? void 0 : end.push(this.sourceToken);
            else
              seq2.items.push({ start: [this.sourceToken] });
          } else
            it2.start.push(this.sourceToken);
          return;
        case "space":
        case "comment":
          if (it2.value)
            seq2.items.push({ start: [this.sourceToken] });
          else {
            if (this.atIndentedComment(it2.start, seq2.indent)) {
              const prev = seq2.items[seq2.items.length - 2];
              const end = (_a2 = prev == null ? void 0 : prev.value) == null ? void 0 : _a2.end;
              if (Array.isArray(end)) {
                Array.prototype.push.apply(end, it2.start);
                end.push(this.sourceToken);
                seq2.items.pop();
                return;
              }
            }
            it2.start.push(this.sourceToken);
          }
          return;
        case "anchor":
        case "tag":
          if (it2.value || this.indent <= seq2.indent)
            break;
          it2.start.push(this.sourceToken);
          return;
        case "seq-item-ind":
          if (this.indent !== seq2.indent)
            break;
          if (it2.value || includesToken(it2.start, "seq-item-ind"))
            seq2.items.push({ start: [this.sourceToken] });
          else
            it2.start.push(this.sourceToken);
          return;
      }
      if (this.indent > seq2.indent) {
        const bv = this.startBlockValue(seq2);
        if (bv) {
          this.stack.push(bv);
          return;
        }
      }
      yield* this.pop();
      yield* this.step();
    }
    *flowCollection(fc) {
      const it2 = fc.items[fc.items.length - 1];
      if (this.type === "flow-error-end") {
        let top;
        do {
          yield* this.pop();
          top = this.peek(1);
        } while ((top == null ? void 0 : top.type) === "flow-collection");
      } else if (fc.end.length === 0) {
        switch (this.type) {
          case "comma":
          case "explicit-key-ind":
            if (!it2 || it2.sep)
              fc.items.push({ start: [this.sourceToken] });
            else
              it2.start.push(this.sourceToken);
            return;
          case "map-value-ind":
            if (!it2 || it2.value)
              fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
            else if (it2.sep)
              it2.sep.push(this.sourceToken);
            else
              Object.assign(it2, { key: null, sep: [this.sourceToken] });
            return;
          case "space":
          case "comment":
          case "newline":
          case "anchor":
          case "tag":
            if (!it2 || it2.value)
              fc.items.push({ start: [this.sourceToken] });
            else if (it2.sep)
              it2.sep.push(this.sourceToken);
            else
              it2.start.push(this.sourceToken);
            return;
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar": {
            const fs = this.flowScalar(this.type);
            if (!it2 || it2.value)
              fc.items.push({ start: [], key: fs, sep: [] });
            else if (it2.sep)
              this.stack.push(fs);
            else
              Object.assign(it2, { key: fs, sep: [] });
            return;
          }
          case "flow-map-end":
          case "flow-seq-end":
            fc.end.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(fc);
        if (bv)
          this.stack.push(bv);
        else {
          yield* this.pop();
          yield* this.step();
        }
      } else {
        const parent = this.peek(2);
        if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
          yield* this.pop();
          yield* this.step();
        } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          fixFlowSeqItems(fc);
          const sep = fc.end.splice(1, fc.end.length);
          sep.push(this.sourceToken);
          const map2 = {
            type: "block-map",
            offset: fc.offset,
            indent: fc.indent,
            items: [{ start, key: fc, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map2;
        } else {
          yield* this.lineEnd(fc);
        }
      }
    }
    flowScalar(type) {
      if (this.onNewLine) {
        let nl = this.source.indexOf("\n") + 1;
        while (nl !== 0) {
          this.onNewLine(this.offset + nl);
          nl = this.source.indexOf("\n", nl) + 1;
        }
      }
      return {
        type,
        offset: this.offset,
        indent: this.indent,
        source: this.source
      };
    }
    startBlockValue(parent) {
      switch (this.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return this.flowScalar(this.type);
        case "block-scalar-header":
          return {
            type: "block-scalar",
            offset: this.offset,
            indent: this.indent,
            props: [this.sourceToken],
            source: ""
          };
        case "flow-map-start":
        case "flow-seq-start":
          return {
            type: "flow-collection",
            offset: this.offset,
            indent: this.indent,
            start: this.sourceToken,
            items: [],
            end: []
          };
        case "seq-item-ind":
          return {
            type: "block-seq",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken] }]
          };
        case "explicit-key-ind": {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          start.push(this.sourceToken);
          return {
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start, explicitKey: true }]
          };
        }
        case "map-value-ind": {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          return {
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start, key: null, sep: [this.sourceToken] }]
          };
        }
      }
      return null;
    }
    atIndentedComment(start, indent) {
      if (this.type !== "comment")
        return false;
      if (this.indent <= indent)
        return false;
      return start.every((st2) => st2.type === "newline" || st2.type === "space");
    }
    *documentEnd(docEnd) {
      if (this.type !== "doc-mode") {
        if (docEnd.end)
          docEnd.end.push(this.sourceToken);
        else
          docEnd.end = [this.sourceToken];
        if (this.type === "newline")
          yield* this.pop();
      }
    }
    *lineEnd(token) {
      switch (this.type) {
        case "comma":
        case "doc-start":
        case "doc-end":
        case "flow-seq-end":
        case "flow-map-end":
        case "map-value-ind":
          yield* this.pop();
          yield* this.step();
          break;
        case "newline":
          this.onKeyLine = false;
        // fallthrough
        case "space":
        case "comment":
        default:
          if (token.end)
            token.end.push(this.sourceToken);
          else
            token.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
      }
    }
  }
  function parseOptions(options) {
    const prettyErrors = options.prettyErrors !== false;
    const lineCounter = options.lineCounter || prettyErrors && new LineCounter() || null;
    return { lineCounter, prettyErrors };
  }
  function parseDocument(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser = new Parser(lineCounter == null ? void 0 : lineCounter.addNewLine);
    const composer = new Composer(options);
    let doc = null;
    for (const _doc of composer.compose(parser.parse(source), true, source.length)) {
      if (!doc)
        doc = _doc;
      else if (doc.options.logLevel !== "silent") {
        doc.errors.push(new YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
        break;
      }
    }
    if (prettyErrors && lineCounter) {
      doc.errors.forEach(prettifyError(source, lineCounter));
      doc.warnings.forEach(prettifyError(source, lineCounter));
    }
    return doc;
  }
  function parse(src, reviver, options) {
    let _reviver = void 0;
    const doc = parseDocument(src, options);
    if (!doc)
      return null;
    doc.warnings.forEach((warning) => warn(doc.options.logLevel, warning));
    if (doc.errors.length > 0) {
      if (doc.options.logLevel !== "silent")
        throw doc.errors[0];
      else
        doc.errors = [];
    }
    return doc.toJS(Object.assign({ reviver: _reviver }, options));
  }
  const name$4 = "frontmatter";
  const pluginFrontmatter = definePlugin({
    name: name$4,
    transform(transformHooks) {
      transformHooks.beforeParse.tap((_md, context) => {
        var _a2;
        const { content } = context;
        if (!/^---\r?\n/.test(content)) return;
        const match = /\n---\r?\n/.exec(content);
        if (!match) return;
        const raw = content.slice(4, match.index).trimEnd();
        let frontmatter;
        try {
          frontmatter = parse(raw.replace(/\r?\n|\r/g, "\n"));
          if (frontmatter == null ? void 0 : frontmatter.markmap) {
            frontmatter.markmap = normalizeMarkmapJsonOptions(
              frontmatter.markmap
            );
          }
        } catch {
          return;
        }
        context.frontmatter = frontmatter;
        context.parserOptions = {
          ...context.parserOptions,
          ...(_a2 = frontmatter == null ? void 0 : frontmatter.markmap) == null ? void 0 : _a2.htmlParser
        };
        context.frontmatterInfo = {
          lines: content.slice(0, match.index).split("\n").length + 1,
          offset: match.index + match[0].length
        };
      });
      return {};
    }
  });
  function normalizeMarkmapJsonOptions(options) {
    if (!options) return;
    ["color", "extraJs", "extraCss"].forEach((key) => {
      if (options[key] != null) options[key] = normalizeStringArray(options[key]);
    });
    ["duration", "maxWidth", "initialExpandLevel"].forEach((key) => {
      if (options[key] != null) options[key] = normalizeNumber(options[key]);
    });
    return options;
  }
  function normalizeStringArray(value) {
    let result;
    if (typeof value === "string") result = [value];
    else if (Array.isArray(value))
      result = value.filter((item) => item && typeof item === "string");
    return (result == null ? void 0 : result.length) ? result : void 0;
  }
  function normalizeNumber(value) {
    if (isNaN(+value)) return;
    return +value;
  }
  function patchJSItem(urlBuilder, item) {
    if (item.type === "script" && item.data.src) {
      return {
        ...item,
        data: {
          ...item.data,
          src: urlBuilder.getFullUrl(item.data.src)
        }
      };
    }
    return item;
  }
  function patchCSSItem(urlBuilder, item) {
    if (item.type === "stylesheet" && item.data.href) {
      return {
        ...item,
        data: {
          ...item.data,
          href: urlBuilder.getFullUrl(item.data.href)
        }
      };
    }
    return item;
  }
  const name$3 = "hljs";
  const preloadScripts$1 = [
    `@highlightjs/cdn-assets@${"11.11.1"}/highlight.min.js`
  ].map((path) => lt$1(path));
  const styles$1 = [
    `@highlightjs/cdn-assets@${"11.11.1"}/styles/default.min.css`
  ].map((path) => ut$1(path));
  const config$1 = {
    versions: {
      hljs: "11.11.1"
    },
    preloadScripts: preloadScripts$1,
    styles: styles$1
  };
  const plugin$2 = definePlugin({
    name: name$3,
    config: config$1,
    transform(transformHooks) {
      var _a2, _b, _c;
      let loading;
      const preloadScripts2 = ((_b = (_a2 = plugin$2.config) == null ? void 0 : _a2.preloadScripts) == null ? void 0 : _b.map(
        (item) => patchJSItem(transformHooks.transformer.urlBuilder, item)
      )) || [];
      const autoload = () => {
        loading || (loading = it$1(preloadScripts2));
        return loading;
      };
      let enableFeature = et$1;
      transformHooks.parser.tap((md) => {
        md.set({
          highlight: (str, language) => {
            enableFeature();
            const { hljs } = window;
            if (hljs) {
              return hljs.highlightAuto(str, language ? [language] : void 0).value;
            }
            autoload().then(() => {
              transformHooks.retransform.call();
            });
            return str;
          }
        });
      });
      transformHooks.beforeParse.tap((_2, context) => {
        enableFeature = () => {
          context.features[name$3] = true;
        };
      });
      return {
        styles: (_c = plugin$2.config) == null ? void 0 : _c.styles
      };
    }
  });
  function addDefaultVersions(paths, name2, version) {
    return paths.map((path) => {
      if (typeof path === "string" && !path.includes("://")) {
        if (!path.startsWith("npm:")) {
          path = `npm:${path}`;
        }
        const prefixLength = 4 + name2.length;
        if (path.startsWith(`npm:${name2}/`)) {
          path = `${path.slice(0, prefixLength)}@${version}${path.slice(
            prefixLength
          )}`;
        }
      }
      return path;
    });
  }
  var define_define_KATEX_RESOURCES_default = ["katex@0.16.43/dist/fonts/KaTeX_AMS-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Caligraphic-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_Caligraphic-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Fraktur-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_Fraktur-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-BoldItalic.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-Italic.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Math-BoldItalic.woff2", "katex@0.16.43/dist/fonts/KaTeX_Math-Italic.woff2", "katex@0.16.43/dist/fonts/KaTeX_SansSerif-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_SansSerif-Italic.woff2", "katex@0.16.43/dist/fonts/KaTeX_SansSerif-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Script-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size1-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size2-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size3-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size4-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Typewriter-Regular.woff2"];
  const name$2 = "katex";
  const preloadScripts = [
    `katex@${"0.16.43"}/dist/katex.min.js`
  ].map((path) => lt$1(path));
  const webfontloader = lt$1(
    `webfontloader@${"1.6.28"}/webfontloader.js`
  );
  webfontloader.data.defer = true;
  const styles = [`katex@${"0.16.43"}/dist/katex.min.css`].map(
    (path) => ut$1(path)
  );
  const config = {
    versions: {
      katex: "0.16.43",
      webfontloader: "1.6.28"
    },
    preloadScripts,
    scripts: [
      {
        type: "iife",
        data: {
          fn: (getMarkmap) => {
            window.WebFontConfig = {
              custom: {
                families: [
                  "KaTeX_AMS",
                  "KaTeX_Caligraphic:n4,n7",
                  "KaTeX_Fraktur:n4,n7",
                  "KaTeX_Main:n4,n7,i4,i7",
                  "KaTeX_Math:i4,i7",
                  "KaTeX_Script",
                  "KaTeX_SansSerif:n4,n7,i4",
                  "KaTeX_Size1",
                  "KaTeX_Size2",
                  "KaTeX_Size3",
                  "KaTeX_Size4",
                  "KaTeX_Typewriter"
                ]
              },
              active: () => {
                getMarkmap().refreshHook.call();
              }
            };
          },
          getParams({ getMarkmap }) {
            return [getMarkmap];
          }
        }
      },
      webfontloader
    ],
    styles,
    resources: define_define_KATEX_RESOURCES_default
  };
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var dist = {};
  var hasRequiredDist;
  function requireDist() {
    if (hasRequiredDist) return dist;
    hasRequiredDist = 1;
    var __importDefault = dist && dist.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(dist, "__esModule", { value: true });
    const katex_1 = __importDefault(require$$0);
    function isValidInlineDelim(state, pos) {
      const prevChar = state.src[pos - 1];
      const char = state.src[pos];
      const nextChar = state.src[pos + 1];
      if (char !== "$") {
        return { can_open: false, can_close: false };
      }
      let canOpen = false;
      let canClose = false;
      if (prevChar !== "$" && prevChar !== "\\" && (prevChar === void 0 || isWhitespace(prevChar) || !isWordCharacterOrNumber(prevChar))) {
        canOpen = true;
      }
      if (nextChar !== "$" && (nextChar == void 0 || isWhitespace(nextChar) || !isWordCharacterOrNumber(nextChar))) {
        canClose = true;
      }
      return { can_open: canOpen, can_close: canClose };
    }
    function isWhitespace(char) {
      return /^\s$/u.test(char);
    }
    function isWordCharacterOrNumber(char) {
      return /^[\w\d]$/u.test(char);
    }
    function isValidBlockDelim(state, pos) {
      const prevChar = state.src[pos - 1];
      const char = state.src[pos];
      const nextChar = state.src[pos + 1];
      const nextCharPlus1 = state.src[pos + 2];
      if (char === "$" && prevChar !== "$" && prevChar !== "\\" && nextChar === "$" && nextCharPlus1 !== "$") {
        return { can_open: true, can_close: true };
      }
      return { can_open: false, can_close: false };
    }
    function inlineMath(state, silent) {
      if (state.src[state.pos] !== "$") {
        return false;
      }
      const lastToken = state.tokens.at(-1);
      if ((lastToken == null ? void 0 : lastToken.type) === "html_inline") {
        if (/^<\w+.+[^/]>$/.test(lastToken.content)) {
          return false;
        }
      }
      let res = isValidInlineDelim(state, state.pos);
      if (!res.can_open) {
        if (!silent) {
          state.pending += "$";
        }
        state.pos += 1;
        return true;
      }
      let start = state.pos + 1;
      let match = start;
      let pos;
      while ((match = state.src.indexOf("$", match)) !== -1) {
        pos = match - 1;
        while (state.src[pos] === "\\") {
          pos -= 1;
        }
        if ((match - pos) % 2 == 1) {
          break;
        }
        match += 1;
      }
      if (match === -1) {
        if (!silent) {
          state.pending += "$";
        }
        state.pos = start;
        return true;
      }
      if (match - start === 0) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos = start + 1;
        return true;
      }
      res = isValidInlineDelim(state, match);
      if (!res.can_close) {
        if (!silent) {
          state.pending += "$";
        }
        state.pos = start;
        return true;
      }
      if (!silent) {
        const token = state.push("math_inline", "math", 0);
        token.markup = "$";
        token.content = state.src.slice(start, match);
      }
      state.pos = match + 1;
      return true;
    }
    function blockMath(state, start, end, silent) {
      let found = false;
      let pos = state.bMarks[start] + state.tShift[start];
      let max = state.eMarks[start];
      if (pos + 2 > max) {
        return false;
      }
      if (state.src.slice(pos, pos + 2) !== "$$") {
        return false;
      }
      pos += 2;
      let firstLine = state.src.slice(pos, max);
      const endIndexes = [...firstLine.matchAll(/\$\$/g)];
      if (endIndexes.length === 1 && endIndexes[0].index === firstLine.length - 2) {
        firstLine = firstLine.trim().slice(0, -2);
        found = true;
      } else if (endIndexes.length > 1) {
        return false;
      }
      if (silent) {
        return true;
      }
      let lastLine;
      let next;
      let lastPos;
      for (next = start; !found; ) {
        next++;
        if (next >= end) {
          break;
        }
        pos = state.bMarks[next] + state.tShift[next];
        max = state.eMarks[next];
        if (pos < max && state.tShift[next] < state.blkIndent) {
          break;
        }
        if (state.src.slice(pos, max).trim().slice(-2) === "$$") {
          lastPos = state.src.slice(0, max).lastIndexOf("$$");
          lastLine = state.src.slice(pos, lastPos);
          found = true;
        } else if (state.src.slice(pos, max).trim().includes("$$")) {
          lastPos = state.src.slice(0, max).trim().indexOf("$$");
          lastLine = state.src.slice(pos, lastPos);
          found = true;
        }
      }
      state.line = next + 1;
      const token = state.push("math_block", "math", 0);
      token.block = true;
      token.content = (firstLine && firstLine.trim() ? firstLine + "\n" : "") + state.getLines(start + 1, next, state.tShift[start], true) + (lastLine && lastLine.trim() ? lastLine : "");
      token.map = [start, state.line];
      token.markup = "$$";
      return true;
    }
    function blockBareMath(state, start, end, silent) {
      const startPos = state.bMarks[start] + state.tShift[start];
      const startMax = state.eMarks[start];
      const firstLine = state.src.slice(startPos, startMax);
      const beginMatch = firstLine.match(/^\s*\\begin\s*\{([^{}]+)\}/);
      if (!beginMatch) {
        return false;
      }
      if (start > 0) {
        const previousStart = state.bMarks[start - 1] + state.tShift[start - 1];
        const previousEnd = state.eMarks[start - 1];
        const previousLine = state.src.slice(previousStart, previousEnd);
        if (!/^\s*$/.test(previousLine)) {
          return false;
        }
      }
      if (silent) {
        return true;
      }
      const beginEndStack = [];
      let next = start;
      let lastLine;
      let found = false;
      outer: for (; !found; next++) {
        if (next >= end) {
          break;
        }
        const pos = state.bMarks[next] + state.tShift[next];
        const max = state.eMarks[next];
        if (pos < max && state.tShift[next] < state.blkIndent) {
          break;
        }
        const line = state.src.slice(pos, max);
        for (const match of line.matchAll(/(\\begin|\\end)\s*\{([^{}]+)\}/g)) {
          if (match[1] === "\\begin") {
            beginEndStack.push(match[2].trim());
          } else if (match[1] === "\\end") {
            beginEndStack.pop();
            if (!beginEndStack.length) {
              lastLine = state.src.slice(pos, max);
              found = true;
              break outer;
            }
          }
        }
      }
      state.line = next + 1;
      const token = state.push("math_block", "math", 0);
      token.block = true;
      token.content = (state.getLines(start, next, state.tShift[start], true) + (lastLine ?? "")).trim();
      token.map = [start, state.line];
      token.markup = "$$";
      return true;
    }
    function inlineMathBlock(state, silent) {
      var start, match, token, res, pos;
      if (state.src.slice(state.pos, state.pos + 2) !== "$$") {
        return false;
      }
      res = isValidBlockDelim(state, state.pos);
      if (!res.can_open) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos += 2;
        return true;
      }
      start = state.pos + 2;
      match = start;
      while ((match = state.src.indexOf("$$", match)) !== -1) {
        pos = match - 1;
        while (state.src[pos] === "\\") {
          pos -= 1;
        }
        if ((match - pos) % 2 == 1) {
          break;
        }
        match += 2;
      }
      if (match === -1) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos = start;
        return true;
      }
      if (match - start === 0) {
        if (!silent) {
          state.pending += "$$$$";
        }
        state.pos = start + 2;
        return true;
      }
      res = isValidBlockDelim(state, match);
      if (!res.can_close) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos = start;
        return true;
      }
      if (!silent) {
        token = state.push("math_block", "math", 0);
        token.block = true;
        token.markup = "$$";
        token.content = state.src.slice(start, match);
      }
      state.pos = match + 2;
      return true;
    }
    function inlineBareBlock(state, silent) {
      const text2 = state.src.slice(state.pos);
      if (!/^\n\\begin/.test(text2)) {
        return false;
      }
      state.pos += 1;
      if (silent) {
        return true;
      }
      const lines = text2.split(/\n/g).slice(1);
      let foundLine;
      const beginEndStack = [];
      outer: for (var i = 0; i < lines.length; ++i) {
        const line = lines[i];
        for (const match of line.matchAll(/(\\begin|\\end)\s*\{([^{}]+)\}/g)) {
          if (match[1] === "\\begin") {
            beginEndStack.push(match[2].trim());
          } else if (match[1] === "\\end") {
            beginEndStack.pop();
            if (!beginEndStack.length) {
              foundLine = i;
              break outer;
            }
          }
        }
      }
      if (typeof foundLine === "undefined") {
        return false;
      }
      const endIndex = lines.slice(0, foundLine + 1).reduce((p, c) => p + c.length, 0) + foundLine + 1;
      const token = state.push("math_inline_bare_block", "math", 0);
      token.block = true;
      token.markup = "$$";
      token.content = text2.slice(1, endIndex);
      state.pos = state.pos + endIndex;
      return true;
    }
    function handleMathInHtml(state, mathType, mathMarkup, mathRegex) {
      const tokens = state.tokens;
      for (let index = tokens.length - 1; index >= 0; index--) {
        const currentToken = tokens[index];
        const newTokens = [];
        if (currentToken.type !== "html_block") {
          continue;
        }
        const content = currentToken.content;
        for (const match of content.matchAll(mathRegex)) {
          if (!match.groups) {
            continue;
          }
          const html_before_math = match.groups.html_before_math;
          const math = match.groups.math;
          const html_after_math = match.groups.html_after_math;
          if (html_before_math) {
            newTokens.push({ ...currentToken, type: "html_block", map: null, content: html_before_math });
          }
          if (math) {
            newTokens.push({
              ...currentToken,
              type: mathType,
              map: null,
              content: math,
              markup: mathMarkup,
              block: true,
              tag: "math"
            });
          }
          if (html_after_math) {
            newTokens.push({ ...currentToken, type: "html_block", map: null, content: html_after_math });
          }
        }
        if (newTokens.length > 0) {
          tokens.splice(index, 1, ...newTokens);
        }
      }
      return true;
    }
    function escapeHtml2(unsafe) {
      return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    function default_1(md, options) {
      const katex = (options == null ? void 0 : options.katex) ?? katex_1.default;
      const enableBareBlocks = options == null ? void 0 : options.enableBareBlocks;
      const enableMathBlockInHtml = options == null ? void 0 : options.enableMathBlockInHtml;
      const enableMathInlineInHtml = options == null ? void 0 : options.enableMathInlineInHtml;
      const enableFencedBlocks = options == null ? void 0 : options.enableFencedBlocks;
      md.inline.ruler.after("escape", "math_inline", inlineMath);
      md.inline.ruler.after("escape", "math_inline_block", inlineMathBlock);
      if (enableBareBlocks) {
        md.inline.ruler.before("text", "math_inline_bare_block", inlineBareBlock);
      }
      md.block.ruler.after("blockquote", "math_block", (state, start, end, silent) => {
        if (enableBareBlocks && blockBareMath(state, start, end, silent)) {
          return true;
        }
        return blockMath(state, start, end, silent);
      }, {
        alt: ["paragraph", "reference", "blockquote", "list"]
      });
      const math_block_within_html_regex = /(?<html_before_math>[\s\S]*?)\$\$(?<math>[\s\S]+?)\$\$(?<html_after_math>(?:(?!\$\$[\s\S]+?\$\$)[\s\S])*)/gm;
      const math_inline_within_html_regex = /(?<html_before_math>[\s\S]*?)\$(?<math>.*?)\$(?<html_after_math>(?:(?!\$.*?\$)[\s\S])*)/gm;
      if (enableMathBlockInHtml) {
        md.core.ruler.push("math_block_in_html_block", (state) => {
          return handleMathInHtml(state, "math_block", "$$", math_block_within_html_regex);
        });
      }
      if (enableMathInlineInHtml) {
        md.core.ruler.push("math_inline_in_html_block", (state) => {
          return handleMathInHtml(state, "math_inline", "$", math_inline_within_html_regex);
        });
      }
      const katexInline = (latex) => {
        const displayMode = /\\begin\{(align|equation|gather|cd|alignat)\}/ig.test(latex);
        try {
          return katex.renderToString(latex, { ...options, displayMode });
        } catch (error2) {
          if (options == null ? void 0 : options.throwOnError) {
            console.log(error2);
          }
          return `<span class="katex-error" title="${escapeHtml2(latex)}">${escapeHtml2(error2 + "")}</span>`;
        }
      };
      const inlineRenderer = (tokens, idx) => {
        const content = tokens[idx].content;
        const hasBacktick = content.length > 2 && content[0] === "`" && content[content.length - 1] === "`";
        const sanitized = hasBacktick ? content.slice(1, -1) : content;
        return katexInline(sanitized);
      };
      const katexBlockRenderer = (latex) => {
        try {
          return `<p class="katex-block">${katex.renderToString(latex, { ...options, displayMode: true })}</p>`;
        } catch (error2) {
          if (options == null ? void 0 : options.throwOnError) {
            console.log(error2);
          }
          return `<p class="katex-block katex-error" title="${escapeHtml2(latex)}">${escapeHtml2(error2 + "")}</p>`;
        }
      };
      const blockRenderer = (tokens, idx) => {
        return katexBlockRenderer(tokens[idx].content) + "\n";
      };
      md.renderer.rules.math_inline = inlineRenderer;
      md.renderer.rules.math_inline_block = blockRenderer;
      md.renderer.rules.math_inline_bare_block = blockRenderer;
      md.renderer.rules.math_block = blockRenderer;
      if (enableFencedBlocks) {
        const mathLanguageId = "math";
        const originalFenceRenderer = md.renderer.rules.fence;
        md.renderer.rules.fence = function(tokens, idx, options2, env, self) {
          const token = tokens[idx];
          if (token.info.trim().toLowerCase() === mathLanguageId && enableFencedBlocks) {
            return katexBlockRenderer(token.content) + "\n";
          } else {
            return (originalFenceRenderer == null ? void 0 : originalFenceRenderer.call(this, tokens, idx, options2, env, self)) || "";
          }
        };
      }
    }
    dist.default = default_1;
    return dist;
  }
  var distExports = requireDist();
  const katexPluginModule = /* @__PURE__ */ getDefaultExportFromCjs(distExports);
  function interop(mod) {
    return mod.default || mod;
  }
  const katexPlugin = interop(katexPluginModule);
  const plugin$1 = definePlugin({
    name: name$2,
    config,
    transform(transformHooks) {
      var _a2, _b, _c, _d;
      let loading;
      const preloadScripts2 = ((_b = (_a2 = plugin$1.config) == null ? void 0 : _a2.preloadScripts) == null ? void 0 : _b.map(
        (item) => patchJSItem(transformHooks.transformer.urlBuilder, item)
      )) || [];
      const autoload = () => {
        loading || (loading = it$1(preloadScripts2));
        return loading;
      };
      const renderKatex = (source, displayMode) => {
        const { katex } = window;
        if (katex) {
          return katex.renderToString(source, {
            displayMode,
            throwOnError: false
          });
        }
        autoload().then(() => {
          transformHooks.retransform.call();
        });
        return source;
      };
      let enableFeature = et$1;
      transformHooks.parser.tap((md) => {
        md.use(katexPlugin);
        ["math_block", "math_inline"].forEach((key) => {
          const fn2 = (tokens, idx) => {
            enableFeature();
            const result = renderKatex(tokens[idx].content, !!tokens[idx].block);
            return result;
          };
          md.renderer.rules[key] = fn2;
        });
      });
      transformHooks.beforeParse.tap((_2, context) => {
        enableFeature = () => {
          context.features[name$2] = true;
        };
      });
      transformHooks.afterParse.tap((_2, context) => {
        var _a3;
        const markmap = (_a3 = context.frontmatter) == null ? void 0 : _a3.markmap;
        if (markmap) {
          ["extraJs", "extraCss"].forEach((key) => {
            var _a4, _b2;
            const value = markmap[key];
            if (value) {
              markmap[key] = addDefaultVersions(
                value,
                name$2,
                ((_b2 = (_a4 = plugin$1.config) == null ? void 0 : _a4.versions) == null ? void 0 : _b2.katex) || ""
              );
            }
          });
        }
      });
      return {
        styles: (_c = plugin$1.config) == null ? void 0 : _c.styles,
        scripts: (_d = plugin$1.config) == null ? void 0 : _d.scripts
      };
    }
  });
  const name$1 = "npmUrl";
  const pluginNpmUrl = definePlugin({
    name: name$1,
    transform(transformHooks) {
      transformHooks.afterParse.tap((_2, context) => {
        const { frontmatter } = context;
        const markmap = frontmatter == null ? void 0 : frontmatter.markmap;
        if (markmap) {
          ["extraJs", "extraCss"].forEach((key) => {
            const value = markmap[key];
            if (value) {
              markmap[key] = value.map((path) => {
                if (path.startsWith("npm:")) {
                  return transformHooks.transformer.urlBuilder.getFullUrl(
                    path.slice(4)
                  );
                }
                return path;
              });
            }
          });
        }
      });
      return {};
    }
  });
  const name = "sourceLines";
  const plugin = definePlugin({
    name,
    transform(transformHooks) {
      let frontmatterLines = 0;
      transformHooks.beforeParse.tap((_md, context) => {
        var _a2;
        frontmatterLines = ((_a2 = context.frontmatterInfo) == null ? void 0 : _a2.lines) || 0;
      });
      transformHooks.parser.tap((md) => {
        md.renderer.renderAttrs = st$1(
          md.renderer.renderAttrs,
          (renderAttrs, token) => {
            if (token.block && token.map) {
              const lineRange = token.map.map((line) => line + frontmatterLines);
              token.attrSet("data-lines", lineRange.join(","));
            }
            return renderAttrs(token);
          }
        );
        if (md.renderer.rules.fence) {
          md.renderer.rules.fence = st$1(
            md.renderer.rules.fence,
            (fence2, tokens, idx, ...rest) => {
              let result = fence2(tokens, idx, ...rest);
              const token = tokens[idx];
              if (result.startsWith("<pre>") && token.map) {
                const lineRange = token.map.map(
                  (line) => line + frontmatterLines
                );
                result = result.slice(0, 4) + ` data-lines="${lineRange.join(",")}"` + result.slice(4);
              }
              return result;
            }
          );
        }
      });
      return {};
    }
  });
  const plugins = [
    pluginFrontmatter,
    plugin$1,
    plugin$2,
    pluginNpmUrl,
    plugin$3,
    plugin
  ];
  const builtInPlugins = plugins;
  function cleanNode(node) {
    while (!node.content && node.children.length === 1) {
      node = node.children[0];
    }
    while (node.children.length === 1 && !node.children[0].content) {
      node = {
        ...node,
        children: node.children[0].children
      };
    }
    return {
      ...node,
      children: node.children.map(cleanNode)
    };
  }
  class Transformer {
    constructor(plugins2 = builtInPlugins) {
      this.assetsMap = {};
      this.urlBuilder = new C();
      this.hooks = createTransformHooks(this);
      this.plugins = plugins2.map(
        (plugin2) => typeof plugin2 === "function" ? plugin2() : plugin2
      );
      const assetsMap = {};
      for (const { name: name2, transform } of this.plugins) {
        assetsMap[name2] = transform(this.hooks);
      }
      this.assetsMap = assetsMap;
      const md = initializeMarkdownIt();
      this.md = md;
      this.hooks.parser.call(md);
    }
    transform(content, fallbackParserOptions) {
      var _a2;
      const context = {
        content,
        features: {},
        parserOptions: fallbackParserOptions
      };
      this.hooks.beforeParse.call(this.md, context);
      let { content: rawContent } = context;
      if (context.frontmatterInfo)
        rawContent = rawContent.slice(context.frontmatterInfo.offset);
      const html = this.md.render(rawContent, {});
      this.hooks.afterParse.call(this.md, context);
      const root = cleanNode(mr(html, context.parserOptions));
      root.content || (root.content = `${((_a2 = context.frontmatter) == null ? void 0 : _a2.title) || ""}`);
      return { ...context, root };
    }
    resolveJS(item) {
      return patchJSItem(this.urlBuilder, item);
    }
    resolveCSS(item) {
      return patchCSSItem(this.urlBuilder, item);
    }
    /**
     * Get all assets from enabled plugins or filter them by plugin names as keys.
     */
    getAssets(keys) {
      const styles2 = [];
      const scripts = [];
      keys ?? (keys = this.plugins.map((plugin2) => plugin2.name));
      for (const assets of keys.map((key) => this.assetsMap[key])) {
        if (assets) {
          if (assets.styles) styles2.push(...assets.styles);
          if (assets.scripts) scripts.push(...assets.scripts);
        }
      }
      return {
        styles: styles2.map((item) => this.resolveCSS(item)),
        scripts: scripts.map((item) => this.resolveJS(item))
      };
    }
    /**
     * Get used assets by features object returned by `transform`.
     */
    getUsedAssets(features) {
      const keys = this.plugins.map((plugin2) => plugin2.name).filter((name2) => features[name2]);
      return this.getAssets(keys);
    }
  }
  const pluginAssets = {
    katex: {
      styles: [
        {
          type: "stylesheet",
          data: {
            href: "https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.min.css"
          }
        }
      ],
      scripts: [
        {
          type: "script",
          data: {
            src: "https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.min.js"
          }
        }
      ]
    },
    hljs: {
      styles: [
        {
          type: "stylesheet",
          data: {
            href: "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/default.min.css"
          }
        }
      ],
      scripts: [
        {
          type: "script",
          data: {
            src: "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/core.min.js"
          }
        }
      ]
    },
    prism: {
      styles: [
        {
          type: "stylesheet",
          data: {
            href: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css"
          }
        }
      ],
      scripts: [
        {
          type: "script",
          data: {
            src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"
          }
        }
      ]
    }
  };
  async function loadPlugins(plugins2 = ["katex", "hljs"]) {
    const allStyles = [];
    const allScripts = [];
    for (const plugin2 of plugins2) {
      const assets = pluginAssets[plugin2];
      if (assets) {
        allStyles.push(...assets.styles);
        allScripts.push(...assets.scripts);
      }
    }
    await ct$1(allStyles);
    await it$1(allScripts);
    const loaded = {};
    if (typeof window !== "undefined") {
      loaded.katex = !!window.katex;
      loaded.hljs = !!window.hljs;
      loaded.Prism = !!window.Prism;
    }
    return loaded;
  }
  const transformerVersions = {
    "markmap-lib": "0.18.12"
  };
  exports.Transformer = Transformer;
  exports.builtInPlugins = builtInPlugins;
  exports.loadPlugins = loadPlugins;
  exports.patchCSSItem = patchCSSItem;
  exports.patchJSItem = patchJSItem;
  exports.pluginAssets = pluginAssets;
  exports.transformerVersions = transformerVersions;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
})(this.markmap = this.markmap || {}, window.katex);
