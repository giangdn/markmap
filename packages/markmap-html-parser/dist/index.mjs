const qe = {
  _useHtmlParser2: !1
};
function $u(u, t) {
  if (!u)
    return t ?? qe;
  const e = {
    _useHtmlParser2: !!u.xmlMode,
    ...t,
    ...u
  };
  return u.xml ? (e._useHtmlParser2 = !0, e.xmlMode = !0, u.xml !== !0 && Object.assign(e, u.xml)) : u.xmlMode && (e._useHtmlParser2 = !0), e;
}
var S;
(function(u) {
  u.Root = "root", u.Text = "text", u.Directive = "directive", u.Comment = "comment", u.Script = "script", u.Style = "style", u.Tag = "tag", u.CDATA = "cdata", u.Doctype = "doctype";
})(S || (S = {}));
function Ie(u) {
  return u.type === S.Tag || u.type === S.Script || u.type === S.Style;
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
  cloneNode(t = !1) {
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
function m(u) {
  return Ie(u);
}
function _u(u) {
  return u.type === S.CDATA;
}
function W(u) {
  return u.type === S.Text;
}
function ut(u) {
  return u.type === S.Comment;
}
function je(u) {
  return u.type === S.Directive;
}
function Q(u) {
  return u.type === S.Root;
}
function N(u) {
  return Object.prototype.hasOwnProperty.call(u, "children");
}
function au(u, t = !1) {
  let e;
  if (W(u))
    e = new mu(u.data);
  else if (ut(u))
    e = new jt(u.data);
  else if (m(u)) {
    const n = t ? Ou(u.children) : [], i = new $t(u.name, { ...u.attribs }, n);
    n.forEach((r) => r.parent = i), u.namespace != null && (i.namespace = u.namespace), u["x-attribsNamespace"] && (i["x-attribsNamespace"] = { ...u["x-attribsNamespace"] }), u["x-attribsPrefix"] && (i["x-attribsPrefix"] = { ...u["x-attribsPrefix"] }), e = i;
  } else if (_u(u)) {
    const n = t ? Ou(u.children) : [], i = new Vt(n);
    n.forEach((r) => r.parent = i), e = i;
  } else if (Q(u)) {
    const n = t ? Ou(u.children) : [], i = new ru(n);
    n.forEach((r) => r.parent = i), u["x-mode"] && (i["x-mode"] = u["x-mode"]), e = i;
  } else if (je(u)) {
    const n = new Ut(u.name, u.data);
    u["x-name"] != null && (n["x-name"] = u["x-name"], n["x-publicId"] = u["x-publicId"], n["x-systemId"] = u["x-systemId"]), e = n;
  } else
    throw new Error(`Not implemented yet: ${u.type}`);
  return e.startIndex = u.startIndex, e.endIndex = u.endIndex, u.sourceCodeLocation != null && (e.sourceCodeLocation = u.sourceCodeLocation), e;
}
function Ou(u) {
  const t = u.map((e) => au(e, !0));
  for (let e = 1; e < t.length; e++)
    t[e].prev = t[e - 1], t[e - 1].next = t[e];
  return t;
}
const mt = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class Ue {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(t, e, n) {
    this.dom = [], this.root = new ru(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof e == "function" && (n = e, e = mt), typeof t == "object" && (e = t, t = void 0), this.callback = t ?? null, this.options = e ?? mt, this.elementCB = n ?? null;
  }
  onparserinit(t) {
    this.parser = t;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new ru(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
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
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((u) => u.charCodeAt(0))
), Gt = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((u) => u.charCodeAt(0))
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
  (Mu = String.fromCodePoint) !== null && Mu !== void 0 ? Mu : function(u) {
    let t = "";
    return u > 65535 && (u -= 65536, t += String.fromCharCode(u >>> 10 & 1023 | 55296), u = 56320 | u & 1023), t += String.fromCharCode(u), t;
  }
);
function $e(u) {
  var t;
  return u >= 55296 && u <= 57343 || u > 1114111 ? 65533 : (t = Ve.get(u)) !== null && t !== void 0 ? t : u;
}
var q;
(function(u) {
  u[u.NUM = 35] = "NUM", u[u.SEMI = 59] = "SEMI", u[u.EQUALS = 61] = "EQUALS", u[u.ZERO = 48] = "ZERO", u[u.NINE = 57] = "NINE", u[u.LOWER_A = 97] = "LOWER_A", u[u.LOWER_F = 102] = "LOWER_F", u[u.LOWER_X = 120] = "LOWER_X", u[u.LOWER_Z = 122] = "LOWER_Z", u[u.UPPER_A = 65] = "UPPER_A", u[u.UPPER_F = 70] = "UPPER_F", u[u.UPPER_Z = 90] = "UPPER_Z";
})(q || (q = {}));
const He = 32;
var V;
(function(u) {
  u[u.VALUE_LENGTH = 49152] = "VALUE_LENGTH", u[u.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", u[u.JUMP_TABLE = 127] = "JUMP_TABLE";
})(V || (V = {}));
function Gu(u) {
  return u >= q.ZERO && u <= q.NINE;
}
function Ge(u) {
  return u >= q.UPPER_A && u <= q.UPPER_F || u >= q.LOWER_A && u <= q.LOWER_F;
}
function ze(u) {
  return u >= q.UPPER_A && u <= q.UPPER_Z || u >= q.LOWER_A && u <= q.LOWER_Z || Gu(u);
}
function We(u) {
  return u === q.EQUALS || ze(u);
}
var k;
(function(u) {
  u[u.EntityStart = 0] = "EntityStart", u[u.NumericStart = 1] = "NumericStart", u[u.NumericDecimal = 2] = "NumericDecimal", u[u.NumericHex = 3] = "NumericHex", u[u.NamedEntity = 4] = "NamedEntity";
})(k || (k = {}));
var B;
(function(u) {
  u[u.Legacy = 0] = "Legacy", u[u.Strict = 1] = "Strict", u[u.Attribute = 2] = "Attribute";
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
      const a = t.charCodeAt(e);
      if (this.treeIndex = Ze(n, i, this.treeIndex + Math.max(1, r), a), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === B.Attribute && // We shouldn't have consumed any characters after the entity,
        (r === 0 || // And there should be no invalid characters.
        We(a)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (i = n[this.treeIndex], r = (i & V.VALUE_LENGTH) >> 14, r !== 0) {
        if (a === q.SEMI)
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
function Wt(u) {
  let t = "";
  const e = new zt(u, (n) => t += Hu(n));
  return function(i, r) {
    let a = 0, s = 0;
    for (; (s = i.indexOf("&", s)) >= 0; ) {
      t += i.slice(a, s), e.startEntity(r);
      const o = e.write(
        i,
        // Skip the "&"
        s + 1
      );
      if (o < 0) {
        a = s + e.end();
        break;
      }
      a = s + o, s = o === 0 ? a + 1 : a;
    }
    const c = t + i.slice(a);
    return t = "", c;
  };
}
function Ze(u, t, e, n) {
  const i = (t & V.BRANCH_LENGTH) >> 7, r = t & V.JUMP_TABLE;
  if (i === 0)
    return r !== 0 && n === r ? e : -1;
  if (r) {
    const c = n - r;
    return c < 0 || c >= i ? -1 : u[e + c] - 1;
  }
  let a = e, s = a + i - 1;
  for (; a <= s; ) {
    const c = a + s >>> 1, o = u[c];
    if (o < n)
      a = c + 1;
    else if (o > n)
      s = c - 1;
    else
      return u[c + i];
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
  String.prototype.codePointAt != null ? (u, t) => u.codePointAt(t) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (u, t) => (u.charCodeAt(t) & 64512) === 55296 ? (u.charCodeAt(t) - 55296) * 1024 + u.charCodeAt(t + 1) - 56320 + 65536 : u.charCodeAt(t)
  )
);
function Zt(u) {
  let t = "", e = 0, n;
  for (; (n = yt.exec(u)) !== null; ) {
    const i = n.index, r = u.charCodeAt(i), a = Qe.get(r);
    a !== void 0 ? (t += u.substring(e, i) + a, e = i + 1) : (t += `${u.substring(e, i)}&#x${Xe(u, i).toString(16)};`, e = yt.lastIndex += +((r & 64512) === 55296));
  }
  return t + u.substr(e);
}
function Qt(u, t) {
  return function(n) {
    let i, r = 0, a = "";
    for (; i = u.exec(n); )
      r !== i.index && (a += n.substring(r, i.index)), a += t.get(i[0].charCodeAt(0)), r = i.index + 1;
    return a + n.substring(r);
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
].map((u) => [u.toLowerCase(), u])), u0 = new Map([
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
].map((u) => [u.toLowerCase(), u])), t0 = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function e0(u) {
  return u.replace(/"/g, "&quot;");
}
function n0(u, t) {
  var e;
  if (!u)
    return;
  const n = ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) === !1 ? e0 : t.xmlMode || t.encodeEntities !== "utf8" ? Zt : Ye;
  return Object.keys(u).map((i) => {
    var r, a;
    const s = (r = u[i]) !== null && r !== void 0 ? r : "";
    return t.xmlMode === "foreign" && (i = (a = u0.get(i)) !== null && a !== void 0 ? a : i), !t.emptyAttrs && !t.xmlMode && s === "" ? i : `${i}="${n(s)}"`;
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
function ku(u, t = {}) {
  const e = "length" in u ? u : [u];
  let n = "";
  for (let i = 0; i < e.length; i++)
    n += i0(e[i], t);
  return n;
}
function i0(u, t) {
  switch (u.type) {
    case Ce:
      return ku(u.children, t);
    // @ts-expect-error We don't use `Doctype` yet
    case Re:
    case Le:
      return c0(u);
    case Oe:
      return d0(u);
    case Fe:
      return f0(u);
    case Me:
    case Pe:
    case Be:
      return s0(u, t);
    case De:
      return o0(u, t);
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
function s0(u, t) {
  var e;
  t.xmlMode === "foreign" && (u.name = (e = Ke.get(u.name)) !== null && e !== void 0 ? e : u.name, u.parent && r0.has(u.parent.name) && (t = { ...t, xmlMode: !1 })), !t.xmlMode && a0.has(u.name) && (t = { ...t, xmlMode: "foreign" });
  let n = `<${u.name}`;
  const i = n0(u.attribs, t);
  return i && (n += ` ${i}`), u.children.length === 0 && (t.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    t.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    t.selfClosingTags && At.has(u.name)
  )) ? (t.xmlMode || (n += " "), n += "/>") : (n += ">", u.children.length > 0 && (n += ku(u.children, t)), (t.xmlMode || !At.has(u.name)) && (n += `</${u.name}>`)), n;
}
function c0(u) {
  return `<${u.data}>`;
}
function o0(u, t) {
  var e;
  let n = u.data || "";
  return ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) !== !1 && !(!t.xmlMode && u.parent && t0.has(u.parent.name)) && (n = t.xmlMode || t.encodeEntities !== "utf8" ? Zt(n) : Je(n)), n;
}
function f0(u) {
  return `<![CDATA[${u.children[0].data}]]>`;
}
function d0(u) {
  return `<!--${u.data}-->`;
}
function Xt(u, t) {
  return ku(u, t);
}
function l0(u, t) {
  return N(u) ? u.children.map((e) => Xt(e, t)).join("") : "";
}
function xu(u) {
  return Array.isArray(u) ? u.map(xu).join("") : m(u) ? u.name === "br" ? `
` : xu(u.children) : _u(u) ? xu(u.children) : W(u) ? u.data : "";
}
function K(u) {
  return Array.isArray(u) ? u.map(K).join("") : N(u) && !ut(u) ? K(u.children) : W(u) ? u.data : "";
}
function yu(u) {
  return Array.isArray(u) ? u.map(yu).join("") : N(u) && (u.type === S.Tag || _u(u)) ? yu(u.children) : W(u) ? u.data : "";
}
function qu(u) {
  return N(u) ? u.children : [];
}
function Yt(u) {
  return u.parent || null;
}
function Jt(u) {
  const t = Yt(u);
  if (t != null)
    return qu(t);
  const e = [u];
  let { prev: n, next: i } = u;
  for (; n != null; )
    e.unshift(n), { prev: n } = n;
  for (; i != null; )
    e.push(i), { next: i } = i;
  return e;
}
function h0(u, t) {
  var e;
  return (e = u.attribs) === null || e === void 0 ? void 0 : e[t];
}
function b0(u, t) {
  return u.attribs != null && Object.prototype.hasOwnProperty.call(u.attribs, t) && u.attribs[t] != null;
}
function p0(u) {
  return u.name;
}
function tt(u) {
  let { next: t } = u;
  for (; t !== null && !m(t); )
    ({ next: t } = t);
  return t;
}
function et(u) {
  let { prev: t } = u;
  for (; t !== null && !m(t); )
    ({ prev: t } = t);
  return t;
}
function X(u) {
  if (u.prev && (u.prev.next = u.next), u.next && (u.next.prev = u.prev), u.parent) {
    const t = u.parent.children, e = t.lastIndexOf(u);
    e >= 0 && t.splice(e, 1);
  }
  u.next = null, u.prev = null, u.parent = null;
}
function g0(u, t) {
  const e = t.prev = u.prev;
  e && (e.next = t);
  const n = t.next = u.next;
  n && (n.prev = t);
  const i = t.parent = u.parent;
  if (i) {
    const r = i.children;
    r[r.lastIndexOf(u)] = t, u.parent = null;
  }
}
function x0(u, t) {
  if (X(t), t.next = null, t.parent = u, u.children.push(t) > 1) {
    const e = u.children[u.children.length - 2];
    e.next = t, t.prev = e;
  } else
    t.prev = null;
}
function m0(u, t) {
  X(t);
  const { parent: e } = u, n = u.next;
  if (t.next = n, t.prev = u, u.next = t, t.parent = e, n) {
    if (n.prev = t, e) {
      const i = e.children;
      i.splice(i.lastIndexOf(n), 0, t);
    }
  } else e && e.children.push(t);
}
function y0(u, t) {
  if (X(t), t.parent = u, t.prev = null, u.children.unshift(t) !== 1) {
    const e = u.children[1];
    e.prev = t, t.next = e;
  } else
    t.next = null;
}
function A0(u, t) {
  X(t);
  const { parent: e } = u;
  if (e) {
    const n = e.children;
    n.splice(n.indexOf(u), 0, t);
  }
  u.prev && (u.prev.next = t), t.parent = e, t.prev = u.prev, t.next = u, u.prev = t;
}
function fu(u, t, e = !0, n = 1 / 0) {
  return nt(u, Array.isArray(t) ? t : [t], e, n);
}
function nt(u, t, e, n) {
  const i = [], r = [Array.isArray(t) ? t : [t]], a = [0];
  for (; ; ) {
    if (a[0] >= r[0].length) {
      if (a.length === 1)
        return i;
      r.shift(), a.shift();
      continue;
    }
    const s = r[0][a[0]++];
    if (u(s) && (i.push(s), --n <= 0))
      return i;
    e && N(s) && s.children.length > 0 && (a.unshift(0), r.unshift(s.children));
  }
}
function S0(u, t) {
  return t.find(u);
}
function it(u, t, e = !0) {
  const n = Array.isArray(t) ? t : [t];
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (m(r) && u(r))
      return r;
    if (e && N(r) && r.children.length > 0) {
      const a = it(u, r.children, !0);
      if (a)
        return a;
    }
  }
  return null;
}
function Kt(u, t) {
  return (Array.isArray(t) ? t : [t]).some((e) => m(e) && u(e) || N(e) && Kt(u, e.children));
}
function v0(u, t) {
  const e = [], n = [Array.isArray(t) ? t : [t]], i = [0];
  for (; ; ) {
    if (i[0] >= n[0].length) {
      if (n.length === 1)
        return e;
      n.shift(), i.shift();
      continue;
    }
    const r = n[0][i[0]++];
    m(r) && u(r) && e.push(r), N(r) && r.children.length > 0 && (i.unshift(0), n.unshift(r.children));
  }
}
const Au = {
  tag_name(u) {
    return typeof u == "function" ? (t) => m(t) && u(t.name) : u === "*" ? m : (t) => m(t) && t.name === u;
  },
  tag_type(u) {
    return typeof u == "function" ? (t) => u(t.type) : (t) => t.type === u;
  },
  tag_contains(u) {
    return typeof u == "function" ? (t) => W(t) && u(t.data) : (t) => W(t) && t.data === u;
  }
};
function rt(u, t) {
  return typeof t == "function" ? (e) => m(e) && t(e.attribs[u]) : (e) => m(e) && e.attribs[u] === t;
}
function w0(u, t) {
  return (e) => u(e) || t(e);
}
function ue(u) {
  const t = Object.keys(u).map((e) => {
    const n = u[e];
    return Object.prototype.hasOwnProperty.call(Au, e) ? Au[e](n) : rt(e, n);
  });
  return t.length === 0 ? null : t.reduce(w0);
}
function E0(u, t) {
  const e = ue(u);
  return e ? e(t) : !0;
}
function N0(u, t, e, n = 1 / 0) {
  const i = ue(u);
  return i ? fu(i, t, e, n) : [];
}
function T0(u, t, e = !0) {
  return Array.isArray(t) || (t = [t]), it(rt("id", u), t, e);
}
function uu(u, t, e = !0, n = 1 / 0) {
  return fu(Au.tag_name(u), t, e, n);
}
function _0(u, t, e = !0, n = 1 / 0) {
  return fu(rt("class", u), t, e, n);
}
function k0(u, t, e = !0, n = 1 / 0) {
  return fu(Au.tag_type(u), t, e, n);
}
function q0(u) {
  let t = u.length;
  for (; --t >= 0; ) {
    const e = u[t];
    if (t > 0 && u.lastIndexOf(e, t - 1) >= 0) {
      u.splice(t, 1);
      continue;
    }
    for (let n = e.parent; n; n = n.parent)
      if (u.includes(n)) {
        u.splice(t, 1);
        break;
      }
  }
  return u;
}
var O;
(function(u) {
  u[u.DISCONNECTED = 1] = "DISCONNECTED", u[u.PRECEDING = 2] = "PRECEDING", u[u.FOLLOWING = 4] = "FOLLOWING", u[u.CONTAINS = 8] = "CONTAINS", u[u.CONTAINED_BY = 16] = "CONTAINED_BY";
})(O || (O = {}));
function te(u, t) {
  const e = [], n = [];
  if (u === t)
    return 0;
  let i = N(u) ? u : u.parent;
  for (; i; )
    e.unshift(i), i = i.parent;
  for (i = N(t) ? t : t.parent; i; )
    n.unshift(i), i = i.parent;
  const r = Math.min(e.length, n.length);
  let a = 0;
  for (; a < r && e[a] === n[a]; )
    a++;
  if (a === 0)
    return O.DISCONNECTED;
  const s = e[a - 1], c = s.children, o = e[a], f = n[a];
  return c.indexOf(o) > c.indexOf(f) ? s === t ? O.FOLLOWING | O.CONTAINED_BY : O.FOLLOWING : s === u ? O.PRECEDING | O.CONTAINS : O.PRECEDING;
}
function tu(u) {
  return u = u.filter((t, e, n) => !n.includes(t, e + 1)), u.sort((t, e) => {
    const n = te(t, e);
    return n & O.PRECEDING ? -1 : n & O.FOLLOWING ? 1 : 0;
  }), u;
}
function I0(u) {
  const t = Su(M0, u);
  return t ? t.name === "feed" ? C0(t) : D0(t) : null;
}
function C0(u) {
  var t;
  const e = u.children, n = {
    type: "atom",
    items: uu("entry", e).map((a) => {
      var s;
      const { children: c } = a, o = { media: ee(c) };
      L(o, "id", "id", c), L(o, "title", "title", c);
      const f = (s = Su("link", c)) === null || s === void 0 ? void 0 : s.attribs.href;
      f && (o.link = f);
      const h = $("summary", c) || $("content", c);
      h && (o.description = h);
      const b = $("updated", c);
      return b && (o.pubDate = new Date(b)), o;
    })
  };
  L(n, "id", "id", e), L(n, "title", "title", e);
  const i = (t = Su("link", e)) === null || t === void 0 ? void 0 : t.attribs.href;
  i && (n.link = i), L(n, "description", "subtitle", e);
  const r = $("updated", e);
  return r && (n.updated = new Date(r)), L(n, "author", "email", e, !0), n;
}
function D0(u) {
  var t, e;
  const n = (e = (t = Su("channel", u.children)) === null || t === void 0 ? void 0 : t.children) !== null && e !== void 0 ? e : [], i = {
    type: u.name.substr(0, 3),
    id: "",
    items: uu("item", u.children).map((a) => {
      const { children: s } = a, c = { media: ee(s) };
      L(c, "id", "guid", s), L(c, "title", "title", s), L(c, "link", "link", s), L(c, "description", "description", s);
      const o = $("pubDate", s) || $("dc:date", s);
      return o && (c.pubDate = new Date(o)), c;
    })
  };
  L(i, "title", "title", n), L(i, "link", "link", n), L(i, "description", "description", n);
  const r = $("lastBuildDate", n);
  return r && (i.updated = new Date(r)), L(i, "author", "managingEditor", n, !0), i;
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
function ee(u) {
  return uu("media:content", u).map((t) => {
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
function Su(u, t) {
  return uu(u, t, !0, 1)[0];
}
function $(u, t, e = !1) {
  return K(uu(u, t, e, 1)).trim();
}
function L(u, t, e, n, i = !1) {
  const r = $(e, n, i);
  r && (u[t] = r);
}
function M0(u) {
  return u === "rss" || u === "feed" || u === "rdf:RDF";
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
function ne(u, t, e) {
  return u ? u(t ?? u._root.children, null, void 0, e).toString() : "";
}
function P0(u, t) {
  return typeof u == "object" && u != null && !("length" in u) && !("type" in u);
}
function B0(u, t) {
  const e = P0(u) ? (t = u, void 0) : u, n = {
    ...this === null || this === void 0 ? void 0 : this._options,
    ...$u(t)
  };
  return ne(this, e, n);
}
function F0(u) {
  const t = { ...this._options, xmlMode: !0 };
  return ne(this, u, t);
}
function su(u) {
  const t = u ?? (this ? this.root() : []);
  let e = "";
  for (let n = 0; n < t.length; n++)
    e += K(t[n]);
  return e;
}
function R0(u, t, e = typeof t == "boolean" ? t : !1) {
  if (!u || typeof u != "string")
    return null;
  typeof t == "boolean" && (e = t);
  const n = this.load(u, this._options, !1);
  return e || n("script").remove(), [...n.root()[0].children];
}
function j0() {
  return this(this._root);
}
function ie(u, t) {
  if (t === u)
    return !1;
  let e = t;
  for (; e && e !== e.parent; )
    if (e = e.parent, e === u)
      return !0;
  return !1;
}
function U0(u) {
  return this.root().extract(u);
}
function V0(u, t) {
  if (!St(u) || !St(t))
    return;
  let e = u.length;
  const n = +t.length;
  for (let i = 0; i < n; i++)
    u[e++] = t[i];
  return u.length = e, u;
}
function St(u) {
  if (Array.isArray(u))
    return !0;
  if (typeof u != "object" || u === null || !("length" in u) || typeof u.length != "number" || u.length < 0)
    return !1;
  for (let t = 0; t < u.length; t++)
    if (!(t in u))
      return !1;
  return !0;
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
function U(u) {
  return u.cheerio != null;
}
function H0(u) {
  return u.replace(/[._-](\w|$)/g, (t, e) => e.toUpperCase());
}
function G0(u) {
  return u.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function E(u, t) {
  const e = u.length;
  for (let n = 0; n < e; n++)
    t(u[n], n);
  return u;
}
var z;
(function(u) {
  u[u.LowerA = 97] = "LowerA", u[u.LowerZ = 122] = "LowerZ", u[u.UpperA = 65] = "UpperA", u[u.UpperZ = 90] = "UpperZ", u[u.Exclamation = 33] = "Exclamation";
})(z || (z = {}));
function zu(u) {
  const t = u.indexOf("<");
  if (t < 0 || t > u.length - 3)
    return !1;
  const e = u.charCodeAt(t + 1);
  return (e >= z.LowerA && e <= z.LowerZ || e >= z.UpperA && e <= z.UpperZ || e === z.Exclamation) && u.includes(">", t + 2);
}
const cu = Object.prototype.hasOwnProperty, ou = /\s+/, Wu = "data-", at = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, z0 = /^{[^]*}$|^\[[^]*]$/;
function vu(u, t, e) {
  var n;
  if (!(!u || !m(u))) {
    if ((n = u.attribs) !== null && n !== void 0 || (u.attribs = {}), !t)
      return u.attribs;
    if (cu.call(u.attribs, t))
      return !e && at.test(t) ? t : u.attribs[t];
    if (u.name === "option" && t === "value")
      return su(u.children);
    if (u.name === "input" && (u.attribs.type === "radio" || u.attribs.type === "checkbox") && t === "value")
      return "on";
  }
}
function J(u, t, e) {
  e === null ? ae(u, t) : u.attribs[t] = `${e}`;
}
function W0(u, t) {
  if (typeof u == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof u != "string")
        throw new Error("Bad combination of arguments.");
      return E(this, (e, n) => {
        m(e) && J(e, u, t.call(e, n, e.attribs[u]));
      });
    }
    return E(this, (e) => {
      if (m(e))
        if (typeof u == "object")
          for (const n of Object.keys(u)) {
            const i = u[n];
            J(e, n, i);
          }
        else
          J(e, u, t);
    });
  }
  return arguments.length > 1 ? this : vu(this[0], u, this.options.xmlMode);
}
function vt(u, t, e) {
  return t in u ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    u[t]
  ) : !e && at.test(t) ? vu(u, t, !1) !== void 0 : vu(u, t, e);
}
function Pu(u, t, e, n) {
  t in u ? u[t] = e : J(u, t, !n && at.test(t) ? e ? "" : null : `${e}`);
}
function Z0(u, t) {
  var e;
  if (typeof u == "string" && t === void 0) {
    const n = this[0];
    if (!n || !m(n))
      return;
    switch (u) {
      case "style": {
        const i = this.css(), r = Object.keys(i);
        for (let a = 0; a < r.length; a++)
          i[a] = r[a];
        return i.length = r.length, i;
      }
      case "tagName":
      case "nodeName":
        return n.name.toUpperCase();
      case "href":
      case "src": {
        const i = (e = n.attribs) === null || e === void 0 ? void 0 : e[u];
        return typeof URL < "u" && (u === "href" && (n.tagName === "a" || n.tagName === "link") || u === "src" && (n.tagName === "img" || n.tagName === "iframe" || n.tagName === "audio" || n.tagName === "video" || n.tagName === "source")) && i !== void 0 && this.options.baseURI ? new URL(i, this.options.baseURI).href : i;
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
        return vt(n, u, this.options.xmlMode);
    }
  }
  if (typeof u == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof u == "object")
        throw new TypeError("Bad combination of arguments.");
      return E(this, (n, i) => {
        m(n) && Pu(n, u, t.call(n, i, vt(n, u, this.options.xmlMode)), this.options.xmlMode);
      });
    }
    return E(this, (n) => {
      if (m(n))
        if (typeof u == "object")
          for (const i of Object.keys(u)) {
            const r = u[i];
            Pu(n, i, r, this.options.xmlMode);
          }
        else
          Pu(n, u, t, this.options.xmlMode);
    });
  }
}
function wt(u, t, e) {
  var n;
  (n = u.data) !== null && n !== void 0 || (u.data = {}), typeof t == "object" ? Object.assign(u.data, t) : typeof t == "string" && e !== void 0 && (u.data[t] = e);
}
function Q0(u) {
  for (const t of Object.keys(u.attribs)) {
    if (!t.startsWith(Wu))
      continue;
    const e = H0(t.slice(Wu.length));
    cu.call(u.data, e) || (u.data[e] = re(u.attribs[t]));
  }
  return u.data;
}
function X0(u, t) {
  const e = Wu + G0(t), n = u.data;
  if (cu.call(n, t))
    return n[t];
  if (cu.call(u.attribs, e))
    return n[t] = re(u.attribs[e]);
}
function re(u) {
  if (u === "null")
    return null;
  if (u === "true")
    return !0;
  if (u === "false")
    return !1;
  const t = Number(u);
  if (u === String(t))
    return t;
  if (z0.test(u))
    try {
      return JSON.parse(u);
    } catch {
    }
  return u;
}
function Y0(u, t) {
  var e;
  const n = this[0];
  if (!n || !m(n))
    return;
  const i = n;
  return (e = i.data) !== null && e !== void 0 || (i.data = {}), u == null ? Q0(i) : typeof u == "object" || t !== void 0 ? (E(this, (r) => {
    m(r) && (typeof u == "object" ? wt(r, u) : wt(r, u, t));
  }), this) : X0(i, u);
}
function J0(u) {
  const t = arguments.length === 0, e = this[0];
  if (!e || !m(e))
    return t ? void 0 : this;
  switch (e.name) {
    case "textarea":
      return this.text(u);
    case "select": {
      const n = this.find("option:selected");
      if (!t) {
        if (this.attr("multiple") == null && typeof u == "object")
          return this;
        this.find("option").removeAttr("selected");
        const i = typeof u == "object" ? u : [u];
        for (const r of i)
          this.find(`option[value="${r}"]`).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? n.toArray().map((i) => su(i.children)) : n.attr("value");
    }
    case "input":
    case "option":
      return t ? this.attr("value") : this.attr("value", u);
  }
}
function ae(u, t) {
  !u.attribs || !cu.call(u.attribs, t) || delete u.attribs[t];
}
function wu(u) {
  return u ? u.trim().split(ou) : [];
}
function K0(u) {
  const t = wu(u);
  for (const e of t)
    E(this, (n) => {
      m(n) && ae(n, e);
    });
  return this;
}
function un(u) {
  return this.toArray().some((t) => {
    const e = m(t) && t.attribs.class;
    let n = -1;
    if (e && u.length > 0)
      for (; (n = e.indexOf(u, n + 1)) > -1; ) {
        const i = n + u.length;
        if ((n === 0 || ou.test(e[n - 1])) && (i === e.length || ou.test(e[i])))
          return !0;
      }
    return !1;
  });
}
function se(u) {
  if (typeof u == "function")
    return E(this, (n, i) => {
      if (m(n)) {
        const r = n.attribs.class || "";
        se.call([n], u.call(n, i, r));
      }
    });
  if (!u || typeof u != "string")
    return this;
  const t = u.split(ou), e = this.length;
  for (let n = 0; n < e; n++) {
    const i = this[n];
    if (!m(i))
      continue;
    const r = vu(i, "class", !1);
    if (r) {
      let a = ` ${r} `;
      for (const s of t) {
        const c = `${s} `;
        a.includes(` ${c}`) || (a += c);
      }
      J(i, "class", a.trim());
    } else
      J(i, "class", t.join(" ").trim());
  }
  return this;
}
function ce(u) {
  if (typeof u == "function")
    return E(this, (i, r) => {
      m(i) && ce.call([i], u.call(i, r, i.attribs.class || ""));
    });
  const t = wu(u), e = t.length, n = arguments.length === 0;
  return E(this, (i) => {
    if (m(i))
      if (n)
        i.attribs.class = "";
      else {
        const r = wu(i.attribs.class);
        let a = !1;
        for (let s = 0; s < e; s++) {
          const c = r.indexOf(t[s]);
          c >= 0 && (r.splice(c, 1), a = !0, s--);
        }
        a && (i.attribs.class = r.join(" "));
      }
  });
}
function oe(u, t) {
  if (typeof u == "function")
    return E(this, (a, s) => {
      m(a) && oe.call([a], u.call(a, s, a.attribs.class || "", t), t);
    });
  if (!u || typeof u != "string")
    return this;
  const e = u.split(ou), n = e.length, i = typeof t == "boolean" ? t ? 1 : -1 : 0, r = this.length;
  for (let a = 0; a < r; a++) {
    const s = this[a];
    if (!m(s))
      continue;
    const c = wu(s.attribs.class);
    for (let o = 0; o < n; o++) {
      const f = c.indexOf(e[o]);
      i >= 0 && f < 0 ? c.push(e[o]) : i <= 0 && f >= 0 && c.splice(f, 1);
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
(function(u) {
  u.Attribute = "attribute", u.Pseudo = "pseudo", u.PseudoElement = "pseudo-element", u.Tag = "tag", u.Universal = "universal", u.Adjacent = "adjacent", u.Child = "child", u.Descendant = "descendant", u.Parent = "parent", u.Sibling = "sibling", u.ColumnCombinator = "column-combinator";
})(g || (g = {}));
var _;
(function(u) {
  u.Any = "any", u.Element = "element", u.End = "end", u.Equals = "equals", u.Exists = "exists", u.Hyphen = "hyphen", u.Not = "not", u.Start = "start";
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
function iu(u) {
  switch (u.type) {
    case g.Adjacent:
    case g.Child:
    case g.Descendant:
    case g.Parent:
    case g.Sibling:
    case g.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const an = /* @__PURE__ */ new Set(["contains", "icontains"]);
function sn(u, t, e) {
  const n = parseInt(t, 16) - 65536;
  return n !== n || e ? t : n < 0 ? (
    // BMP codepoint
    String.fromCharCode(n + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
  );
}
function nu(u) {
  return u.replace(en, sn);
}
function Bu(u) {
  return u === 39 || u === 34;
}
function Nt(u) {
  return u === 32 || u === 9 || u === 10 || u === 12 || u === 13;
}
function Cu(u) {
  const t = [], e = fe(t, `${u}`, 0);
  if (e < u.length)
    throw new Error(`Unmatched selector: ${u.slice(e)}`);
  return t;
}
function fe(u, t, e) {
  let n = [];
  function i(b) {
    const p = t.slice(e + b).match(Et);
    if (!p)
      throw new Error(`Expected name, found ${t.slice(e)}`);
    const [l] = p;
    return e += b + l.length, nu(l);
  }
  function r(b) {
    for (e += b; e < t.length && Nt(t.charCodeAt(e)); )
      e++;
  }
  function a() {
    e += 1;
    const b = e;
    let p = 1;
    for (; p > 0 && e < t.length; e++)
      t.charCodeAt(e) === 40 && !s(e) ? p++ : t.charCodeAt(e) === 41 && !s(e) && p--;
    if (p)
      throw new Error("Parenthesis not matched");
    return nu(t.slice(b, e - 1));
  }
  function s(b) {
    let p = 0;
    for (; t.charCodeAt(--b) === 92; )
      p++;
    return (p & 1) === 1;
  }
  function c() {
    if (n.length > 0 && iu(n[n.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function o(b) {
    if (n.length > 0 && n[n.length - 1].type === g.Descendant) {
      n[n.length - 1].type = b;
      return;
    }
    c(), n.push({ type: b });
  }
  function f(b, p) {
    n.push({
      type: g.Attribute,
      name: b,
      action: p,
      value: i(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function h() {
    if (n.length && n[n.length - 1].type === g.Descendant && n.pop(), n.length === 0)
      throw new Error("Empty sub-selector");
    u.push(n);
  }
  if (r(0), t.length === e)
    return e;
  u: for (; e < t.length; ) {
    const b = t.charCodeAt(e);
    switch (b) {
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
        f("class", _.Element);
        break;
      }
      case 35: {
        f("id", _.Equals);
        break;
      }
      case 91: {
        r(1);
        let p, l = null;
        t.charCodeAt(e) === 124 ? p = i(1) : t.startsWith("*|", e) ? (l = "*", p = i(2)) : (p = i(0), t.charCodeAt(e) === 124 && t.charCodeAt(e + 1) !== 61 && (l = p, p = i(1))), r(0);
        let y = _.Exists;
        const w = nn.get(t.charCodeAt(e));
        if (w) {
          if (y = w, t.charCodeAt(e + 1) !== 61)
            throw new Error("Expected `=`");
          r(2);
        } else t.charCodeAt(e) === 61 && (y = _.Equals, r(1));
        let T = "", I = null;
        if (y !== "exists") {
          if (Bu(t.charCodeAt(e))) {
            const M = t.charCodeAt(e);
            let P = e + 1;
            for (; P < t.length && (t.charCodeAt(P) !== M || s(P)); )
              P += 1;
            if (t.charCodeAt(P) !== M)
              throw new Error("Attribute value didn't end");
            T = nu(t.slice(e + 1, P)), e = P + 1;
          } else {
            const M = e;
            for (; e < t.length && (!Nt(t.charCodeAt(e)) && t.charCodeAt(e) !== 93 || s(e)); )
              e += 1;
            T = nu(t.slice(M, e));
          }
          r(0);
          const C = t.charCodeAt(e) | 32;
          C === 115 ? (I = !1, r(1)) : C === 105 && (I = !0, r(1));
        }
        if (t.charCodeAt(e) !== 93)
          throw new Error("Attribute selector didn't terminate");
        e += 1;
        const R = {
          type: g.Attribute,
          name: p,
          action: y,
          value: T,
          namespace: l,
          ignoreCase: I
        };
        n.push(R);
        break;
      }
      case 58: {
        if (t.charCodeAt(e + 1) === 58) {
          n.push({
            type: g.PseudoElement,
            name: i(2).toLowerCase(),
            data: t.charCodeAt(e) === 40 ? a() : null
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
            if (l = a(), an.has(p)) {
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
        if (b === 42)
          e += 1, l = "*";
        else if (b === 124) {
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
function cn(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Fu, Tt;
function on() {
  return Tt || (Tt = 1, Fu = {
    trueFunc: function() {
      return !0;
    },
    falseFunc: function() {
      return !1;
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
function st(u) {
  return !de.has(u.type);
}
const fn = /* @__PURE__ */ new Map([
  [_.Exists, 10],
  [_.Equals, 8],
  [_.Not, 7],
  [_.Start, 6],
  [_.End, 6],
  [_.Any, 5]
]);
function dn(u) {
  const t = u.map(le);
  for (let e = 1; e < u.length; e++) {
    const n = t[e];
    if (!(n < 0))
      for (let i = e - 1; i >= 0 && n < t[i]; i--) {
        const r = u[i + 1];
        u[i + 1] = u[i], u[i] = r, t[i + 1] = t[i], t[i] = n;
      }
  }
}
function le(u) {
  var t, e;
  let n = (t = de.get(u.type)) !== null && t !== void 0 ? t : -1;
  return u.type === g.Attribute ? (n = (e = fn.get(u.action)) !== null && e !== void 0 ? e : 4, u.action === _.Equals && u.name === "id" && (n = 9), u.ignoreCase && (n >>= 1)) : u.type === g.Pseudo && (u.data ? u.name === "has" || u.name === "contains" ? n = 0 : Array.isArray(u.data) ? (n = Math.min(...u.data.map((i) => Math.min(...i.map(le)))), n < 0 && (n = 0)) : n = 2 : n = 3), n;
}
const ln = /[-[\]{}()*+?.,\\^$|#\s]/g;
function _t(u) {
  return u.replace(ln, "\\$&");
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
function G(u, t) {
  return typeof u.ignoreCase == "boolean" ? u.ignoreCase : u.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && hn.has(u.name);
}
const bn = {
  equals(u, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    return G(t, e) ? (r = r.toLowerCase(), (a) => {
      const s = n.getAttributeValue(a, i);
      return s != null && s.length === r.length && s.toLowerCase() === r && u(a);
    }) : (a) => n.getAttributeValue(a, i) === r && u(a);
  },
  hyphen(u, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    const a = r.length;
    return G(t, e) ? (r = r.toLowerCase(), function(c) {
      const o = n.getAttributeValue(c, i);
      return o != null && (o.length === a || o.charAt(a) === "-") && o.substr(0, a).toLowerCase() === r && u(c);
    }) : function(c) {
      const o = n.getAttributeValue(c, i);
      return o != null && (o.length === a || o.charAt(a) === "-") && o.substr(0, a) === r && u(c);
    };
  },
  element(u, t, e) {
    const { adapter: n } = e, { name: i, value: r } = t;
    if (/\s/.test(r))
      return A.falseFunc;
    const a = new RegExp(`(?:^|\\s)${_t(r)}(?:$|\\s)`, G(t, e) ? "i" : "");
    return function(c) {
      const o = n.getAttributeValue(c, i);
      return o != null && o.length >= r.length && a.test(o) && u(c);
    };
  },
  exists(u, { name: t }, { adapter: e }) {
    return (n) => e.hasAttrib(n, t) && u(n);
  },
  start(u, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    const a = r.length;
    return a === 0 ? A.falseFunc : G(t, e) ? (r = r.toLowerCase(), (s) => {
      const c = n.getAttributeValue(s, i);
      return c != null && c.length >= a && c.substr(0, a).toLowerCase() === r && u(s);
    }) : (s) => {
      var c;
      return !!(!((c = n.getAttributeValue(s, i)) === null || c === void 0) && c.startsWith(r)) && u(s);
    };
  },
  end(u, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    const a = -r.length;
    return a === 0 ? A.falseFunc : G(t, e) ? (r = r.toLowerCase(), (s) => {
      var c;
      return ((c = n.getAttributeValue(s, i)) === null || c === void 0 ? void 0 : c.substr(a).toLowerCase()) === r && u(s);
    }) : (s) => {
      var c;
      return !!(!((c = n.getAttributeValue(s, i)) === null || c === void 0) && c.endsWith(r)) && u(s);
    };
  },
  any(u, t, e) {
    const { adapter: n } = e, { name: i, value: r } = t;
    if (r === "")
      return A.falseFunc;
    if (G(t, e)) {
      const a = new RegExp(_t(r), "i");
      return function(c) {
        const o = n.getAttributeValue(c, i);
        return o != null && o.length >= r.length && a.test(o) && u(c);
      };
    }
    return (a) => {
      var s;
      return !!(!((s = n.getAttributeValue(a, i)) === null || s === void 0) && s.includes(r)) && u(a);
    };
  },
  not(u, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    return r === "" ? (a) => !!n.getAttributeValue(a, i) && u(a) : G(t, e) ? (r = r.toLowerCase(), (a) => {
      const s = n.getAttributeValue(a, i);
      return (s == null || s.length !== r.length || s.toLowerCase() !== r) && u(a);
    }) : (a) => n.getAttributeValue(a, i) !== r && u(a);
  }
}, pn = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), kt = 48, gn = 57;
function xn(u) {
  if (u = u.trim().toLowerCase(), u === "even")
    return [2, 0];
  if (u === "odd")
    return [2, 1];
  let t = 0, e = 0, n = r(), i = a();
  if (t < u.length && u.charAt(t) === "n" && (t++, e = n * (i ?? 1), s(), t < u.length ? (n = r(), s(), i = a()) : n = i = 0), i === null || t < u.length)
    throw new Error(`n-th rule couldn't be parsed ('${u}')`);
  return [e, n * i];
  function r() {
    return u.charAt(t) === "-" ? (t++, -1) : (u.charAt(t) === "+" && t++, 1);
  }
  function a() {
    const c = t;
    let o = 0;
    for (; t < u.length && u.charCodeAt(t) >= kt && u.charCodeAt(t) <= gn; )
      o = o * 10 + (u.charCodeAt(t) - kt), t++;
    return t === c ? null : o;
  }
  function s() {
    for (; t < u.length && pn.has(u.charCodeAt(t)); )
      t++;
  }
}
function mn(u) {
  const t = u[0], e = u[1] - 1;
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
function bu(u) {
  return mn(xn(u));
}
function pu(u, t) {
  return (e) => {
    const n = t.getParent(e);
    return n != null && t.isTag(n) && u(e);
  };
}
const Zu = {
  contains(u, t, { adapter: e }) {
    return function(i) {
      return u(i) && e.getText(i).includes(t);
    };
  },
  icontains(u, t, { adapter: e }) {
    const n = t.toLowerCase();
    return function(r) {
      return u(r) && e.getText(r).toLowerCase().includes(n);
    };
  },
  // Location specific methods
  "nth-child"(u, t, { adapter: e, equals: n }) {
    const i = bu(t);
    return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u, e) : function(a) {
      const s = e.getSiblings(a);
      let c = 0;
      for (let o = 0; o < s.length && !n(a, s[o]); o++)
        e.isTag(s[o]) && c++;
      return i(c) && u(a);
    };
  },
  "nth-last-child"(u, t, { adapter: e, equals: n }) {
    const i = bu(t);
    return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u, e) : function(a) {
      const s = e.getSiblings(a);
      let c = 0;
      for (let o = s.length - 1; o >= 0 && !n(a, s[o]); o--)
        e.isTag(s[o]) && c++;
      return i(c) && u(a);
    };
  },
  "nth-of-type"(u, t, { adapter: e, equals: n }) {
    const i = bu(t);
    return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u, e) : function(a) {
      const s = e.getSiblings(a);
      let c = 0;
      for (let o = 0; o < s.length; o++) {
        const f = s[o];
        if (n(a, f))
          break;
        e.isTag(f) && e.getName(f) === e.getName(a) && c++;
      }
      return i(c) && u(a);
    };
  },
  "nth-last-of-type"(u, t, { adapter: e, equals: n }) {
    const i = bu(t);
    return i === A.falseFunc ? A.falseFunc : i === A.trueFunc ? pu(u, e) : function(a) {
      const s = e.getSiblings(a);
      let c = 0;
      for (let o = s.length - 1; o >= 0; o--) {
        const f = s[o];
        if (n(a, f))
          break;
        e.isTag(f) && e.getName(f) === e.getName(a) && c++;
      }
      return i(c) && u(a);
    };
  },
  // TODO determine the actual root element
  root(u, t, { adapter: e }) {
    return (n) => {
      const i = e.getParent(n);
      return (i == null || !e.isTag(i)) && u(n);
    };
  },
  scope(u, t, e, n) {
    const { equals: i } = e;
    return !n || n.length === 0 ? Zu.root(u, t, e) : n.length === 1 ? (r) => i(n[0], r) && u(r) : (r) => n.includes(r) && u(r);
  },
  hover: Ru("isHovered"),
  visited: Ru("isVisited"),
  active: Ru("isActive")
};
function Ru(u) {
  return function(e, n, { adapter: i }) {
    const r = i[u];
    return typeof r != "function" ? A.falseFunc : function(s) {
      return r(s) && e(s);
    };
  };
}
const qt = {
  empty(u, { adapter: t }) {
    return !t.getChildren(u).some((e) => (
      // FIXME: `getText` call is potentially expensive.
      t.isTag(e) || t.getText(e) !== ""
    ));
  },
  "first-child"(u, { adapter: t, equals: e }) {
    if (t.prevElementSibling)
      return t.prevElementSibling(u) == null;
    const n = t.getSiblings(u).find((i) => t.isTag(i));
    return n != null && e(u, n);
  },
  "last-child"(u, { adapter: t, equals: e }) {
    const n = t.getSiblings(u);
    for (let i = n.length - 1; i >= 0; i--) {
      if (e(u, n[i]))
        return !0;
      if (t.isTag(n[i]))
        break;
    }
    return !1;
  },
  "first-of-type"(u, { adapter: t, equals: e }) {
    const n = t.getSiblings(u), i = t.getName(u);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      if (e(u, a))
        return !0;
      if (t.isTag(a) && t.getName(a) === i)
        break;
    }
    return !1;
  },
  "last-of-type"(u, { adapter: t, equals: e }) {
    const n = t.getSiblings(u), i = t.getName(u);
    for (let r = n.length - 1; r >= 0; r--) {
      const a = n[r];
      if (e(u, a))
        return !0;
      if (t.isTag(a) && t.getName(a) === i)
        break;
    }
    return !1;
  },
  "only-of-type"(u, { adapter: t, equals: e }) {
    const n = t.getName(u);
    return t.getSiblings(u).every((i) => e(u, i) || !t.isTag(i) || t.getName(i) !== n);
  },
  "only-child"(u, { adapter: t, equals: e }) {
    return t.getSiblings(u).every((n) => e(u, n) || !t.isTag(n));
  }
};
function It(u, t, e, n) {
  if (e === null) {
    if (u.length > n)
      throw new Error(`Pseudo-class :${t} requires an argument`);
  } else if (u.length === n)
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
function An(u, t) {
  return u === A.falseFunc ? A.falseFunc : (e) => t.isTag(e) && u(e);
}
function be(u, t) {
  const e = t.getSiblings(u);
  if (e.length <= 1)
    return [];
  const n = e.indexOf(u);
  return n < 0 || n === e.length - 1 ? [] : e.slice(n + 1).filter(t.isTag);
}
function Qu(u) {
  return {
    xmlMode: !!u.xmlMode,
    lowerCaseAttributeNames: !!u.lowerCaseAttributeNames,
    lowerCaseTags: !!u.lowerCaseTags,
    quirksMode: !!u.quirksMode,
    cacheResults: !!u.cacheResults,
    pseudos: u.pseudos,
    adapter: u.adapter,
    equals: u.equals
  };
}
const ju = (u, t, e, n, i) => {
  const r = i(t, Qu(e), n);
  return r === A.trueFunc ? u : r === A.falseFunc ? A.falseFunc : (a) => r(a) && u(a);
}, Uu = {
  is: ju,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: ju,
  where: ju,
  not(u, t, e, n, i) {
    const r = i(t, Qu(e), n);
    return r === A.falseFunc ? u : r === A.trueFunc ? A.falseFunc : (a) => !r(a) && u(a);
  },
  has(u, t, e, n, i) {
    const { adapter: r } = e, a = Qu(e);
    a.relativeSelector = !0;
    const s = t.some((f) => f.some(st)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [he]
    ) : void 0, c = i(t, a, s);
    if (c === A.falseFunc)
      return A.falseFunc;
    const o = An(c, r);
    if (s && c !== A.trueFunc) {
      const { shouldTestNextSiblings: f = !1 } = c;
      return (h) => {
        if (!u(h))
          return !1;
        s[0] = h;
        const b = r.getChildren(h), p = f ? [...b, ...be(h, r)] : b;
        return r.existsOne(o, p);
      };
    }
    return (f) => u(f) && r.existsOne(o, r.getChildren(f));
  }
};
function Sn(u, t, e, n, i) {
  var r;
  const { name: a, data: s } = t;
  if (Array.isArray(s)) {
    if (!(a in Uu))
      throw new Error(`Unknown pseudo-class :${a}(${s})`);
    return Uu[a](u, s, e, n, i);
  }
  const c = (r = e.pseudos) === null || r === void 0 ? void 0 : r[a], o = typeof c == "string" ? c : yn[a];
  if (typeof o == "string") {
    if (s != null)
      throw new Error(`Pseudo ${a} doesn't have any arguments`);
    const f = Cu(o);
    return Uu.is(u, f, e, n, i);
  }
  if (typeof c == "function")
    return It(c, a, s, 1), (f) => c(f, s) && u(f);
  if (a in Zu)
    return Zu[a](u, s, e, n);
  if (a in qt) {
    const f = qt[a];
    return It(f, a, s, 2), (h) => f(h, e, s) && u(h);
  }
  throw new Error(`Unknown pseudo-class :${a}`);
}
function Vu(u, t) {
  const e = t.getParent(u);
  return e && t.isTag(e) ? e : null;
}
function vn(u, t, e, n, i) {
  const { adapter: r, equals: a } = e;
  switch (t.type) {
    case g.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case g.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case g.Attribute: {
      if (t.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!e.xmlMode || e.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), bn[t.action](u, t, e);
    }
    case g.Pseudo:
      return Sn(u, t, e, n, i);
    // Tags
    case g.Tag: {
      if (t.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      let { name: s } = t;
      return (!e.xmlMode || e.lowerCaseTags) && (s = s.toLowerCase()), function(o) {
        return r.getName(o) === s && u(o);
      };
    }
    // Traversal
    case g.Descendant: {
      if (e.cacheResults === !1 || typeof WeakSet > "u")
        return function(o) {
          let f = o;
          for (; f = Vu(f, r); )
            if (u(f))
              return !0;
          return !1;
        };
      const s = /* @__PURE__ */ new WeakSet();
      return function(o) {
        let f = o;
        for (; f = Vu(f, r); )
          if (!s.has(f)) {
            if (r.isTag(f) && u(f))
              return !0;
            s.add(f);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(c) {
        let o = c;
        do
          if (u(o))
            return !0;
        while (o = Vu(o, r));
        return !1;
      };
    case g.Parent:
      return function(c) {
        return r.getChildren(c).some((o) => r.isTag(o) && u(o));
      };
    case g.Child:
      return function(c) {
        const o = r.getParent(c);
        return o != null && r.isTag(o) && u(o);
      };
    case g.Sibling:
      return function(c) {
        const o = r.getSiblings(c);
        for (let f = 0; f < o.length; f++) {
          const h = o[f];
          if (a(c, h))
            break;
          if (r.isTag(h) && u(h))
            return !0;
        }
        return !1;
      };
    case g.Adjacent:
      return r.prevElementSibling ? function(c) {
        const o = r.prevElementSibling(c);
        return o != null && u(o);
      } : function(c) {
        const o = r.getSiblings(c);
        let f;
        for (let h = 0; h < o.length; h++) {
          const b = o[h];
          if (a(c, b))
            break;
          r.isTag(b) && (f = b);
        }
        return !!f && u(f);
      };
    case g.Universal: {
      if (t.namespace != null && t.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return u;
    }
  }
}
function pe(u) {
  return u.type === g.Pseudo && (u.name === "scope" || Array.isArray(u.data) && u.data.some((t) => t.some(pe)));
}
const wn = { type: g.Descendant }, En = {
  type: "_flexibleDescendant"
}, Nn = {
  type: g.Pseudo,
  name: "scope",
  data: null
};
function Tn(u, { adapter: t }, e) {
  const n = !!(e != null && e.every((i) => {
    const r = t.isTag(i) && t.getParent(i);
    return i === he || r && t.isTag(r);
  }));
  for (const i of u) {
    if (!(i.length > 0 && st(i[0]) && i[0].type !== g.Descendant)) if (n && !i.some(pe))
      i.unshift(wn);
    else
      continue;
    i.unshift(Nn);
  }
}
function ge(u, t, e) {
  var n;
  u.forEach(dn), e = (n = t.context) !== null && n !== void 0 ? n : e;
  const i = Array.isArray(e), r = e && (Array.isArray(e) ? e : [e]);
  if (t.relativeSelector !== !1)
    Tn(u, t, r);
  else if (u.some((c) => c.length > 0 && st(c[0])))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  let a = !1;
  const s = u.map((c) => {
    if (c.length >= 2) {
      const [o, f] = c;
      o.type !== g.Pseudo || o.name !== "scope" || (i && f.type === g.Descendant ? c[1] = En : (f.type === g.Adjacent || f.type === g.Sibling) && (a = !0));
    }
    return _n(c, t, r);
  }).reduce(kn, A.falseFunc);
  return s.shouldTestNextSiblings = a, s;
}
function _n(u, t, e) {
  var n;
  return u.reduce((i, r) => i === A.falseFunc ? A.falseFunc : vn(i, r, t, e, ge), (n = t.rootFunc) !== null && n !== void 0 ? n : A.trueFunc);
}
function kn(u, t) {
  return t === A.falseFunc || u === A.trueFunc ? u : u === A.falseFunc || t === A.trueFunc ? t : function(n) {
    return u(n) || t(n);
  };
}
const xe = (u, t) => u === t, qn = {
  adapter: Iu,
  equals: xe
};
function In(u) {
  var t, e, n, i;
  const r = u ?? qn;
  return (t = r.adapter) !== null && t !== void 0 || (r.adapter = Iu), (e = r.equals) !== null && e !== void 0 || (r.equals = (i = (n = r.adapter) === null || n === void 0 ? void 0 : n.equals) !== null && i !== void 0 ? i : xe), r;
}
function Cn(u) {
  return function(e, n, i) {
    const r = In(n);
    return u(e, r, i);
  };
}
const ct = Cn(ge);
function me(u, t, e = !1) {
  return e && (u = Dn(u, t)), Array.isArray(u) ? t.removeSubsets(u) : t.getChildren(u);
}
function Dn(u, t) {
  const e = Array.isArray(u) ? u.slice(0) : [u], n = e.length;
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
function Nu(u) {
  return u.type !== "pseudo" ? !1 : Ln.has(u.name) ? !0 : u.name === "not" && Array.isArray(u.data) ? u.data.some((t) => t.some(Nu)) : !1;
}
function On(u, t, e) {
  const n = t != null ? parseInt(t, 10) : NaN;
  switch (u) {
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
function Mn(u) {
  for (; u.parent; )
    u = u.parent;
  return u;
}
function ot(u) {
  const t = [], e = [];
  for (const n of u)
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
function ye(u, t, e = {}) {
  return Ae([u], t, e);
}
function Ae(u, t, e = {}) {
  if (typeof t == "function")
    return u.some(t);
  const [n, i] = ot(Cu(t));
  return n.length > 0 && u.some(ct(n, e)) || i.some((r) => we(r, u, e).length > 0);
}
function Fn(u, t, e, n) {
  const i = typeof e == "string" ? parseInt(e, 10) : NaN;
  switch (u) {
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
      return t.filter((r, a) => a % 2 === 0);
    case "odd":
      return t.filter((r, a) => a % 2 === 1);
    case "not": {
      const r = new Set(ve(e, t, n));
      return t.filter((a) => !r.has(a));
    }
  }
}
function Se(u, t, e = {}) {
  return ve(Cu(u), t, e);
}
function ve(u, t, e) {
  if (t.length === 0)
    return [];
  const [n, i] = ot(u);
  let r;
  if (n.length) {
    const a = Yu(t, n, e);
    if (i.length === 0)
      return a;
    a.length && (r = new Set(a));
  }
  for (let a = 0; a < i.length && (r == null ? void 0 : r.size) !== t.length; a++) {
    const s = i[a];
    if ((r ? t.filter((f) => m(f) && !r.has(f)) : t).length === 0)
      break;
    const o = we(s, t, e);
    if (o.length)
      if (r)
        o.forEach((f) => r.add(f));
      else {
        if (a === i.length - 1)
          return o;
        r = new Set(o);
      }
  }
  return typeof r < "u" ? r.size === t.length ? t : (
    // Filter elements to preserve order
    t.filter((a) => r.has(a))
  ) : [];
}
function we(u, t, e) {
  var n;
  if (u.some(iu)) {
    const i = (n = e.root) !== null && n !== void 0 ? n : Mn(t[0]), r = { ...e, context: t, relativeSelector: !1 };
    return u.push(Bn), Tu(i, u, r, !0, t.length);
  }
  return Tu(t, u, e, !1, t.length);
}
function Rn(u, t, e = {}, n = 1 / 0) {
  if (typeof u == "function")
    return Ee(t, u);
  const [i, r] = ot(Cu(u)), a = r.map((s) => Tu(t, s, e, !0, n));
  return i.length && a.push(Xu(t, i, e, n)), a.length === 0 ? [] : a.length === 1 ? a[0] : tu(a.reduce((s, c) => [...s, ...c]));
}
function Tu(u, t, e, n, i) {
  const r = t.findIndex(Nu), a = t.slice(0, r), s = t[r], c = t.length - 1 === r ? i : 1 / 0, o = On(s.name, s.data, c);
  if (o === 0)
    return [];
  const h = (a.length === 0 && !Array.isArray(u) ? qu(u).filter(m) : a.length === 0 ? (Array.isArray(u) ? u : [u]).filter(m) : n || a.some(iu) ? Xu(u, [a], e, o) : Yu(u, [a], e)).slice(0, o);
  let b = Fn(s.name, h, s.data, e);
  if (b.length === 0 || t.length === r + 1)
    return b;
  const p = t.slice(r + 1), l = p.some(iu);
  if (l) {
    if (iu(p[0])) {
      const { type: y } = p[0];
      (y === g.Sibling || y === g.Adjacent) && (b = me(b, Iu, !0)), p.unshift(Pn);
    }
    e = {
      ...e,
      // Avoid absolutizing the selector
      relativeSelector: !1,
      /*
       * Add a custom root func, to make sure traversals don't match elements
       * that aren't a part of the considered tree.
       */
      rootFunc: (y) => b.includes(y)
    };
  } else e.rootFunc && e.rootFunc !== Eu.trueFunc && (e = { ...e, rootFunc: Eu.trueFunc });
  return p.some(Nu) ? Tu(b, p, e, !1, i) : l ? (
    // Query existing elements to resolve traversal.
    Xu(b, [p], e, i)
  ) : (
    // If we don't have any more traversals, simply filter elements.
    Yu(b, [p], e)
  );
}
function Xu(u, t, e, n) {
  const i = ct(t, e, u);
  return Ee(u, i, n);
}
function Ee(u, t, e = 1 / 0) {
  const n = me(u, Iu, t.shouldTestNextSiblings);
  return nt((i) => m(i) && t(i), n, !0, e);
}
function Yu(u, t, e) {
  const n = (Array.isArray(u) ? u : [u]).filter(m);
  if (n.length === 0)
    return n;
  const i = ct(t, e);
  return i === Eu.trueFunc ? n : n.filter(i);
}
const jn = /^\s*[+~]/;
function Un(u) {
  if (!u)
    return this._make([]);
  if (typeof u != "string") {
    const t = U(u) ? u.toArray() : [u], e = this.toArray();
    return this._make(t.filter((n) => e.some((i) => ie(i, n))));
  }
  return this._findBySelector(u, Number.POSITIVE_INFINITY);
}
function Vn(u, t) {
  var e;
  const n = this.toArray(), i = jn.test(u) ? n : this.children().toArray(), r = {
    context: n,
    root: (e = this._root) === null || e === void 0 ? void 0 : e[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(Rn(u, i, r, t));
}
function ft(u) {
  return function(t, ...e) {
    return function(n) {
      var i;
      let r = u(t, this);
      return n && (r = ht(r, n, this.options.xmlMode, (i = this._root) === null || i === void 0 ? void 0 : i[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && r.length > 1 ? e.reduce((a, s) => s(a), r) : r
      );
    };
  };
}
const du = ft((u, t) => {
  let e = [];
  for (let n = 0; n < t.length; n++) {
    const i = u(t[n]);
    i.length > 0 && (e = e.concat(i));
  }
  return e;
}), dt = ft((u, t) => {
  const e = [];
  for (let n = 0; n < t.length; n++) {
    const i = u(t[n]);
    i !== null && e.push(i);
  }
  return e;
});
function lt(u, ...t) {
  let e = null;
  const n = ft((i, r) => {
    const a = [];
    return E(r, (s) => {
      for (let c; (c = i(s)) && !(e != null && e(c, a.length)); s = c)
        a.push(c);
    }), a;
  })(u, ...t);
  return function(i, r) {
    e = typeof i == "string" ? (s) => ye(s, i, this.options) : i ? lu(i) : null;
    const a = n.call(this, r);
    return e = null, a;
  };
}
function eu(u) {
  return u.length > 1 ? Array.from(new Set(u)) : u;
}
const $n = dt(({ parent: u }) => u && !Q(u) ? u : null, eu), Hn = du((u) => {
  const t = [];
  for (; u.parent && !Q(u.parent); )
    t.push(u.parent), u = u.parent;
  return t;
}, tu, (u) => u.reverse()), Gn = lt(({ parent: u }) => u && !Q(u) ? u : null, tu, (u) => u.reverse());
function zn(u) {
  var t;
  const e = [];
  if (!u)
    return this._make(e);
  const n = {
    xmlMode: this.options.xmlMode,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
  }, i = typeof u == "string" ? (r) => ye(r, u, n) : lu(u);
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
const Wn = dt((u) => tt(u)), Zn = du((u) => {
  const t = [];
  for (; u.next; )
    u = u.next, m(u) && t.push(u);
  return t;
}, eu), Qn = lt((u) => tt(u), eu), Xn = dt((u) => et(u)), Yn = du((u) => {
  const t = [];
  for (; u.prev; )
    u = u.prev, m(u) && t.push(u);
  return t;
}, eu), Jn = lt((u) => et(u), eu), Kn = du((u) => Jt(u).filter((t) => m(t) && t !== u), tu), ui = du((u) => qu(u).filter(m), eu);
function ti() {
  const u = this.toArray().reduce((t, e) => N(e) ? t.concat(e.children) : t, []);
  return this._make(u);
}
function ei(u) {
  let t = 0;
  const e = this.length;
  for (; t < e && u.call(this[t], t, this[t]) !== !1; )
    ++t;
  return this;
}
function ni(u) {
  let t = [];
  for (let e = 0; e < this.length; e++) {
    const n = this[e], i = u.call(n, e, n);
    i != null && (t = t.concat(i));
  }
  return this._make(t);
}
function lu(u) {
  return typeof u == "function" ? (t, e) => u.call(t, e, t) : U(u) ? (t) => Array.prototype.includes.call(u, t) : function(t) {
    return u === t;
  };
}
function ii(u) {
  var t;
  return this._make(ht(this.toArray(), u, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
}
function ht(u, t, e, n) {
  return typeof t == "string" ? Se(t, u, { xmlMode: e, root: n }) : u.filter(lu(t));
}
function ri(u) {
  const t = this.toArray();
  return typeof u == "string" ? Ae(t.filter(m), u, this.options) : u ? t.some(lu(u)) : !1;
}
function ai(u) {
  let t = this.toArray();
  if (typeof u == "string") {
    const e = new Set(Se(u, t, this.options));
    t = t.filter((n) => !e.has(n));
  } else {
    const e = lu(u);
    t = t.filter((n, i) => !e(n, i));
  }
  return this._make(t);
}
function si(u) {
  return this.filter(typeof u == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    `:has(${u})`
  ) : (t, e) => this._make(e).find(u).length > 0);
}
function ci() {
  return this.length > 1 ? this._make(this[0]) : this;
}
function oi() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function fi(u) {
  var t;
  return u = +u, u === 0 && this.length <= 1 ? this : (u < 0 && (u = this.length + u), this._make((t = this[u]) !== null && t !== void 0 ? t : []));
}
function di(u) {
  return u == null ? this.toArray() : this[u < 0 ? this.length + u : u];
}
function li() {
  return Array.prototype.slice.call(this);
}
function hi(u) {
  let t, e;
  return u == null ? (t = this.parent().children(), e = this[0]) : typeof u == "string" ? (t = this._make(u), e = this[0]) : (t = this, e = U(u) ? u[0] : u), Array.prototype.indexOf.call(t, e);
}
function bi(u, t) {
  return this._make(Array.prototype.slice.call(this, u, t));
}
function pi() {
  var u;
  return (u = this.prevObject) !== null && u !== void 0 ? u : this._make([]);
}
function gi(u, t) {
  const e = this._make(u, t), n = tu([...this.get(), ...e.get()]);
  return this._make(n);
}
function xi(u) {
  return this.prevObject ? this.add(u ? this.prevObject.filter(u) : this.prevObject) : this;
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
function yi(u) {
  return function(e, n, i, r) {
    if (typeof Buffer < "u" && Buffer.isBuffer(e) && (e = e.toString()), typeof e == "string")
      return u(e, n, i, r);
    const a = e;
    if (!Array.isArray(a) && Q(a))
      return a;
    const s = new ru([]);
    return Z(a, s), s;
  };
}
function Z(u, t) {
  const e = Array.isArray(u) ? u : [u];
  t ? t.children = e : t = null;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    i.parent && i.parent.children !== e && X(i), t ? (i.prev = e[n - 1] || null, i.next = e[n + 1] || null) : i.prev = i.next = null, i.parent = t;
  }
  return t;
}
function Ai(u, t) {
  if (u == null)
    return [];
  if (typeof u == "string")
    return this._parse(u, this.options, !1, null).children.slice(0);
  if ("length" in u) {
    if (u.length === 1)
      return this._makeDomArray(u[0], t);
    const e = [];
    for (let n = 0; n < u.length; n++) {
      const i = u[n];
      if (typeof i == "object") {
        if (i == null)
          continue;
        if (!("length" in i)) {
          e.push(t ? au(i, !0) : i);
          continue;
        }
      }
      e.push(...this._makeDomArray(i, t));
    }
    return e;
  }
  return [t ? au(u, !0) : u];
}
function Ne(u) {
  return function(...t) {
    const e = this.length - 1;
    return E(this, (n, i) => {
      if (!N(n))
        return;
      const r = typeof t[0] == "function" ? t[0].call(n, i, this._render(n.children)) : t, a = this._makeDomArray(r, i < e);
      u(a, n.children, n);
    });
  };
}
function H(u, t, e, n, i) {
  var r, a;
  const s = [
    t,
    e,
    ...n
  ], c = t === 0 ? null : u[t - 1], o = t + e >= u.length ? null : u[t + e];
  for (let f = 0; f < n.length; ++f) {
    const h = n[f], b = h.parent;
    if (b) {
      const l = b.children.indexOf(h);
      l > -1 && (b.children.splice(l, 1), i === b && t > l && s[0]--);
    }
    h.parent = i, h.prev && (h.prev.next = (r = h.next) !== null && r !== void 0 ? r : null), h.next && (h.next.prev = (a = h.prev) !== null && a !== void 0 ? a : null), h.prev = f === 0 ? c : n[f - 1], h.next = f === n.length - 1 ? o : n[f + 1];
  }
  return c && (c.next = n[0]), o && (o.prev = n[n.length - 1]), u.splice(...s);
}
function Si(u) {
  return (U(u) ? u : this._make(u)).append(this), this;
}
function vi(u) {
  return (U(u) ? u : this._make(u)).prepend(this), this;
}
const wi = Ne((u, t, e) => {
  H(t, t.length, 0, u, e);
}), Ei = Ne((u, t, e) => {
  H(t, 0, 0, u, e);
});
function Te(u) {
  return function(t) {
    const e = this.length - 1, n = this.parents().last();
    for (let i = 0; i < this.length; i++) {
      const r = this[i], a = typeof t == "function" ? t.call(r, i, r) : typeof t == "string" && !zu(t) ? n.find(t).clone() : t, [s] = this._makeDomArray(a, i < e);
      if (!s || !N(s))
        continue;
      let c = s, o = 0;
      for (; o < c.children.length; ) {
        const f = c.children[o];
        m(f) ? (c = f, o = 0) : o++;
      }
      u(r, c, [s]);
    }
    return this;
  };
}
const Ni = Te((u, t, e) => {
  const { parent: n } = u;
  if (!n)
    return;
  const i = n.children, r = i.indexOf(u);
  Z([u], t), H(i, r, 0, e, n);
}), Ti = Te((u, t, e) => {
  N(u) && (Z(u.children, t), Z(e, u));
});
function _i(u) {
  return this.parent(u).not("body").each((t, e) => {
    this._make(e).replaceWith(e.children);
  }), this;
}
function ki(u) {
  const t = this[0];
  if (t) {
    const e = this._make(typeof u == "function" ? u.call(t, 0, t) : u).insertBefore(t);
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
function qi(...u) {
  const t = this.length - 1;
  return E(this, (e, n) => {
    if (!N(e) || !e.parent)
      return;
    const i = e.parent.children, r = i.indexOf(e);
    if (r < 0)
      return;
    const a = typeof u[0] == "function" ? u[0].call(e, n, this._render(e.children)) : u, s = this._makeDomArray(a, n < t);
    H(i, r + 1, 0, s, e.parent);
  });
}
function Ii(u) {
  typeof u == "string" && (u = this._make(u)), this.remove();
  const t = [];
  for (const e of this._makeDomArray(u)) {
    const n = this.clone().toArray(), { parent: i } = e;
    if (!i)
      continue;
    const r = i.children, a = r.indexOf(e);
    a < 0 || (H(r, a + 1, 0, n, i), t.push(...n));
  }
  return this._make(t);
}
function Ci(...u) {
  const t = this.length - 1;
  return E(this, (e, n) => {
    if (!N(e) || !e.parent)
      return;
    const i = e.parent.children, r = i.indexOf(e);
    if (r < 0)
      return;
    const a = typeof u[0] == "function" ? u[0].call(e, n, this._render(e.children)) : u, s = this._makeDomArray(a, n < t);
    H(i, r, 0, s, e.parent);
  });
}
function Di(u) {
  const t = this._make(u);
  this.remove();
  const e = [];
  return E(t, (n) => {
    const i = this.clone().toArray(), { parent: r } = n;
    if (!r)
      return;
    const a = r.children, s = a.indexOf(n);
    s < 0 || (H(a, s, 0, i, r), e.push(...i));
  }), this._make(e);
}
function Li(u) {
  const t = u ? this.filter(u) : this;
  return E(t, (e) => {
    X(e), e.prev = e.next = e.parent = null;
  }), this;
}
function Oi(u) {
  return E(this, (t, e) => {
    const { parent: n } = t;
    if (!n)
      return;
    const i = n.children, r = typeof u == "function" ? u.call(t, e, t) : u, a = this._makeDomArray(r);
    Z(a, null);
    const s = i.indexOf(t);
    H(i, s, 1, a, n), a.includes(t) || (t.parent = t.prev = t.next = null);
  });
}
function Mi() {
  return E(this, (u) => {
    if (N(u)) {
      for (const t of u.children)
        t.next = t.prev = t.parent = null;
      u.children.length = 0;
    }
  });
}
function Pi(u) {
  if (u === void 0) {
    const t = this[0];
    return !t || !N(t) ? null : this._render(t.children);
  }
  return E(this, (t) => {
    if (!N(t))
      return;
    for (const n of t.children)
      n.next = n.prev = n.parent = null;
    const e = U(u) ? u.toArray() : this._parse(`${u}`, this.options, !1, t).children;
    Z(e, t);
  });
}
function Bi() {
  return this._render(this);
}
function Fi(u) {
  return u === void 0 ? su(this) : typeof u == "function" ? E(this, (t, e) => this._make(t).text(u.call(t, e, su([t])))) : E(this, (t) => {
    if (!N(t))
      return;
    for (const n of t.children)
      n.next = n.prev = n.parent = null;
    const e = new mu(`${u}`);
    Z(e, t);
  });
}
function Ri() {
  const u = Array.prototype.map.call(this.get(), (e) => au(e, !0)), t = new ru(u);
  for (const e of u)
    e.parent = t;
  return this._make(u);
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
function Ui(u, t) {
  if (u != null && t != null || // When `prop` is a "plain" object
  typeof u == "object" && !Array.isArray(u))
    return E(this, (e, n) => {
      m(e) && _e(e, u, t, n);
    });
  if (this.length !== 0)
    return ke(this[0], u);
}
function _e(u, t, e, n) {
  if (typeof t == "string") {
    const i = ke(u), r = typeof e == "function" ? e.call(u, n, i[t]) : e;
    r === "" ? delete i[t] : r != null && (i[t] = r), u.attribs.style = Vi(i);
  } else if (typeof t == "object") {
    const i = Object.keys(t);
    for (let r = 0; r < i.length; r++) {
      const a = i[r];
      _e(u, a, t[a], r);
    }
  }
}
function ke(u, t) {
  if (!u || !m(u))
    return;
  const e = $i(u.attribs.style);
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
function Vi(u) {
  return Object.keys(u).reduce((t, e) => `${t}${t ? " " : ""}${e}: ${u[e]};`, "");
}
function $i(u) {
  if (u = (u || "").trim(), !u)
    return {};
  const t = {};
  let e;
  for (const n of u.split(";")) {
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
  return this.map((u, t) => {
    const e = this._make(t);
    return m(t) && t.name === "form" ? e.find(Ct).toArray() : e.filter(Ct).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
  ).map((u, t) => {
    var e;
    const n = this._make(t), i = n.attr("name"), r = (e = n.val()) !== null && e !== void 0 ? e : "";
    return Array.isArray(r) ? r.map((a) => (
      /*
       * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
       * These can occur inside of `<textarea>'s`
       */
      { name: i, value: a.replace(Dt, `\r
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
function Qi(u) {
  var t;
  return typeof u == "string" ? { selector: u, value: "textContent" } : {
    selector: u.selector,
    value: (t = u.value) !== null && t !== void 0 ? t : "textContent"
  };
}
function Xi(u) {
  const t = {};
  for (const e in u) {
    const n = u[e], i = Array.isArray(n), { selector: r, value: a } = Qi(i ? n[0] : n), s = typeof a == "function" ? a : typeof a == "string" ? (c) => this._make(c).prop(a) : (c) => this._make(c).extract(a);
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
function Ji(u, t) {
  return function e(n, i, r = !0) {
    if (n == null)
      throw new Error("cheerio.load() expects a string");
    const a = $u(i), s = u(n, a, r, null);
    class c extends hu {
      _make(h, b) {
        const p = o(h, b);
        return p.prevObject = this, p;
      }
      _parse(h, b, p, l) {
        return u(h, b, p, l);
      }
      _render(h) {
        return t(h, this.options);
      }
    }
    function o(f, h, b = s, p) {
      if (f && U(f))
        return f;
      const l = $u(p, a), y = typeof b == "string" ? [u(b, l, !1, null)] : "length" in b ? b : [b], w = U(y) ? y : new c(y, null, l);
      if (w._root = w, !f)
        return new c(void 0, w, l);
      const T = typeof f == "string" && zu(f) ? (
        // $(<html>)
        u(f, l, !1, null).children
      ) : Ki(f) ? (
        // $(dom)
        [f]
      ) : Array.isArray(f) ? (
        // $([dom])
        f
      ) : void 0, I = new c(T, w, l);
      if (T)
        return I;
      if (typeof f != "string")
        throw new TypeError("Unexpected type of selector");
      let R = f;
      const C = h ? (
        // If we don't have a context, maybe we have a root, from loading
        typeof h == "string" ? zu(h) ? (
          // $('li', '<ul>...</ul>')
          new c([u(h, l, !1, null)], w, l)
        ) : (
          // $('li', 'ul')
          (R = `${h} ${R}`, w)
        ) : U(h) ? (
          // $('li', $)
          h
        ) : (
          // $('li', node), $('li', [nodes])
          new c(Array.isArray(h) ? h : [h], w, l)
        )
      ) : w;
      return C ? C.find(R) : I;
    }
    return Object.assign(o, $0, {
      load: e,
      // `_root` and `_options` are used in static methods.
      _root: s,
      _options: a,
      // Add `fn` for plugins
      fn: c.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: c.prototype
    }), o;
  };
}
function Ki(u) {
  return !!u.name || u.type === "root" || u.type === "text" || u.type === "comment";
}
var x;
(function(u) {
  u[u.Tab = 9] = "Tab", u[u.NewLine = 10] = "NewLine", u[u.FormFeed = 12] = "FormFeed", u[u.CarriageReturn = 13] = "CarriageReturn", u[u.Space = 32] = "Space", u[u.ExclamationMark = 33] = "ExclamationMark", u[u.Number = 35] = "Number", u[u.Amp = 38] = "Amp", u[u.SingleQuote = 39] = "SingleQuote", u[u.DoubleQuote = 34] = "DoubleQuote", u[u.Dash = 45] = "Dash", u[u.Slash = 47] = "Slash", u[u.Zero = 48] = "Zero", u[u.Nine = 57] = "Nine", u[u.Semi = 59] = "Semi", u[u.Lt = 60] = "Lt", u[u.Eq = 61] = "Eq", u[u.Gt = 62] = "Gt", u[u.Questionmark = 63] = "Questionmark", u[u.UpperA = 65] = "UpperA", u[u.LowerA = 97] = "LowerA", u[u.UpperF = 70] = "UpperF", u[u.LowerF = 102] = "LowerF", u[u.UpperZ = 90] = "UpperZ", u[u.LowerZ = 122] = "LowerZ", u[u.LowerX = 120] = "LowerX", u[u.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})(x || (x = {}));
var d;
(function(u) {
  u[u.Text = 1] = "Text", u[u.BeforeTagName = 2] = "BeforeTagName", u[u.InTagName = 3] = "InTagName", u[u.InSelfClosingTag = 4] = "InSelfClosingTag", u[u.BeforeClosingTagName = 5] = "BeforeClosingTagName", u[u.InClosingTagName = 6] = "InClosingTagName", u[u.AfterClosingTagName = 7] = "AfterClosingTagName", u[u.BeforeAttributeName = 8] = "BeforeAttributeName", u[u.InAttributeName = 9] = "InAttributeName", u[u.AfterAttributeName = 10] = "AfterAttributeName", u[u.BeforeAttributeValue = 11] = "BeforeAttributeValue", u[u.InAttributeValueDq = 12] = "InAttributeValueDq", u[u.InAttributeValueSq = 13] = "InAttributeValueSq", u[u.InAttributeValueNq = 14] = "InAttributeValueNq", u[u.BeforeDeclaration = 15] = "BeforeDeclaration", u[u.InDeclaration = 16] = "InDeclaration", u[u.InProcessingInstruction = 17] = "InProcessingInstruction", u[u.BeforeComment = 18] = "BeforeComment", u[u.CDATASequence = 19] = "CDATASequence", u[u.InSpecialComment = 20] = "InSpecialComment", u[u.InCommentLike = 21] = "InCommentLike", u[u.BeforeSpecialS = 22] = "BeforeSpecialS", u[u.BeforeSpecialT = 23] = "BeforeSpecialT", u[u.SpecialStartSequence = 24] = "SpecialStartSequence", u[u.InSpecialTag = 25] = "InSpecialTag", u[u.InEntity = 26] = "InEntity";
})(d || (d = {}));
function j(u) {
  return u === x.Space || u === x.NewLine || u === x.Tab || u === x.FormFeed || u === x.CarriageReturn;
}
function gu(u) {
  return u === x.Slash || u === x.Gt || j(u);
}
function ur(u) {
  return u >= x.LowerA && u <= x.LowerZ || u >= x.UpperA && u <= x.UpperZ;
}
var F;
(function(u) {
  u[u.NoValue = 0] = "NoValue", u[u.Unquoted = 1] = "Unquoted", u[u.Single = 2] = "Single", u[u.Double = 3] = "Double";
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
  constructor({ xmlMode: t = !1, decodeEntities: e = !0 }, n) {
    this.cbs = n, this.state = d.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = d.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.xmlMode = t, this.decodeEntities = e, this.entityDecoder = new zt(t ? Gt : Ht, (i, r) => this.emitCodePoint(i, r));
  }
  reset() {
    this.state = d.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = d.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
  }
  write(t) {
    this.offset += this.buffer.length, this.buffer = t, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
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
      this.isSpecial = !1;
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
        this.isSpecial = !1, this.sectionStart = e + 2, this.stateInClosingTagName(t);
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
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
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
    this.isSpecial = !0, this.currentSequence = t, this.sequenceIndex = e, this.state = d.SpecialStartSequence;
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
    t === x.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = d.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : j(t) || (this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t));
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
    var n, i, r, a, s, c;
    this.options = e, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = (n = e.lowerCaseTags) !== null && n !== void 0 ? n : this.htmlMode, this.lowerCaseAttributeNames = (i = e.lowerCaseAttributeNames) !== null && i !== void 0 ? i : this.htmlMode, this.recognizeSelfClosing = (r = e.recognizeSelfClosing) !== null && r !== void 0 ? r : !this.htmlMode, this.tokenizer = new ((a = e.Tokenizer) !== null && a !== void 0 ? a : tr)(this.options, this), this.foreignContext = [!this.htmlMode], (c = (s = this.cbs).onparserinit) === null || c === void 0 || c.call(s, this);
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
    const a = this.htmlMode && er.get(t);
    if (a)
      for (; this.stack.length > 0 && a.has(this.stack[0]); ) {
        const s = this.stack.shift();
        (n = (e = this.cbs).onclosetag) === null || n === void 0 || n.call(e, s, !0);
      }
    this.isVoidElement(t) || (this.stack.unshift(t), this.htmlMode && (Pt.has(t) ? this.foreignContext.unshift(!0) : Bt.has(t) && this.foreignContext.unshift(!1))), (r = (i = this.cbs).onopentagname) === null || r === void 0 || r.call(i, t), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(t) {
    var e, n;
    this.startIndex = this.openTagStart, this.attribs && ((n = (e = this.cbs).onopentag) === null || n === void 0 || n.call(e, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /** @internal */
  onopentagend(t) {
    this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
  }
  /** @internal */
  onclosetag(t, e) {
    var n, i, r, a, s, c, o, f;
    this.endIndex = e;
    let h = this.getSlice(t, e);
    if (this.lowerCaseTagNames && (h = h.toLowerCase()), this.htmlMode && (Pt.has(h) || Bt.has(h)) && this.foreignContext.shift(), this.isVoidElement(h))
      this.htmlMode && h === "br" && ((a = (r = this.cbs).onopentagname) === null || a === void 0 || a.call(r, "br"), (c = (s = this.cbs).onopentag) === null || c === void 0 || c.call(s, "br", {}, !0), (f = (o = this.cbs).onclosetag) === null || f === void 0 || f.call(o, "br", !1));
    else {
      const b = this.stack.indexOf(h);
      if (b !== -1)
        for (let p = 0; p <= b; p++) {
          const l = this.stack.shift();
          (i = (n = this.cbs).onclosetag) === null || i === void 0 || i.call(n, l, p !== b);
        }
      else this.htmlMode && h === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = e + 1;
  }
  /** @internal */
  onselfclosingtag(t) {
    this.endIndex = t, this.recognizeSelfClosing || this.foreignContext[0] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
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
    var i, r, a, s;
    this.endIndex = e, (r = (i = this.cbs).oncomment) === null || r === void 0 || r.call(i, this.getSlice(t, e - n)), (s = (a = this.cbs).oncommentend) === null || s === void 0 || s.call(a), this.startIndex = e + 1;
  }
  /** @internal */
  oncdata(t, e, n) {
    var i, r, a, s, c, o, f, h, b, p;
    this.endIndex = e;
    const l = this.getSlice(t, e - n);
    !this.htmlMode || this.options.recognizeCDATA ? ((r = (i = this.cbs).oncdatastart) === null || r === void 0 || r.call(i), (s = (a = this.cbs).ontext) === null || s === void 0 || s.call(a, l), (o = (c = this.cbs).oncdataend) === null || o === void 0 || o.call(c)) : ((h = (f = this.cbs).oncomment) === null || h === void 0 || h.call(f, `[CDATA[${l}]]`), (p = (b = this.cbs).oncommentend) === null || p === void 0 || p.call(b)), this.startIndex = e + 1;
  }
  /** @internal */
  onend() {
    var t, e;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let n = 0; n < this.stack.length; n++)
        this.cbs.onclosetag(this.stack[n], !0);
    }
    (e = (t = this.cbs).onend) === null || e === void 0 || e.call(t);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var t, e, n, i;
    (e = (t = this.cbs).onreset) === null || e === void 0 || e.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (i = (n = this.cbs).onparserinit) === null || i === void 0 || i.call(n, this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(!this.htmlMode), this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
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
    t && this.write(t), this.ended = !0, this.tokenizer.end();
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
function ar(u, t) {
  const e = new Ue(void 0, t);
  return new rr(e, t).end(u), e.root;
}
const sr = Ji(yi(ar), ku);
Math.random().toString(36).slice(2, 8);
function cr(u, t) {
  const e = (n, i) => t(
    n,
    () => {
      var r;
      return (r = n.children) == null ? void 0 : r.map((a) => e(a, n));
    },
    i
  );
  return e(u);
}
var or = /* @__PURE__ */ ((u) => (u[u.None = 0] = "None", u[u.H1 = 1] = "H1", u[u.H2 = 2] = "H2", u[u.H3 = 3] = "H3", u[u.H4 = 4] = "H4", u[u.H5 = 5] = "H5", u[u.H6 = 6] = "H6", u[u.Block = 7] = "Block", u[u.List = 8] = "List", u[u.ListItem = 9] = "ListItem", u))(or || {});
const fr = {
  "div,p": ({ $node: u }) => ({
    queue: u.children()
  }),
  "h1,h2,h3,h4,h5,h6": ({ $node: u, getContent: t }) => ({
    ...t(u.contents())
  }),
  "ul,ol": ({ $node: u }) => ({
    queue: u.children(),
    nesting: !0
  }),
  li: ({ $node: u, getContent: t }) => {
    const e = u.children().filter("ul,ol");
    let n;
    if (u.contents().first().is("div,p"))
      n = t(u.children().first());
    else {
      let i = u.contents();
      const r = i.index(e);
      r >= 0 && (i = i.slice(0, r)), n = t(i);
    }
    return {
      queue: e,
      nesting: !0,
      ...n
    };
  },
  "table,pre,p>img:only-child": ({ $node: u, getContent: t }) => ({
    ...t(u)
  })
}, dr = {
  selector: "h1,h2,h3,h4,h5,h6,ul,ol,li,table,pre,p>img:only-child",
  selectorRules: fr
}, Ft = "markmap: ", lr = /^h[1-6]$/, hr = /^[uo]l$/, br = /^li$/;
function pr(u) {
  return lr.test(u) ? +u[1] : hr.test(u) ? 8 : br.test(u) ? 9 : 7;
}
function gr(u, t) {
  const e = {
    ...dr,
    ...t
  }, n = sr(u);
  let i = n("body");
  i.length || (i = n.root());
  let r = 0;
  const a = {
    id: r,
    tag: "",
    html: "",
    level: 0,
    parent: 0,
    childrenLevel: 0,
    children: []
  }, s = [];
  let c = 0;
  return p(i.children()), a;
  function o(l) {
    var T;
    const { parent: y } = l, w = {
      id: ++r,
      tag: l.tagName,
      level: l.level,
      html: l.html,
      childrenLevel: 0,
      children: l.nesting ? [] : void 0,
      parent: y.id
    };
    return (T = l.comments) != null && T.length && (w.comments = l.comments), Object.keys(l.data || {}).length && (w.data = l.data), y.children && ((y.childrenLevel === 0 || y.childrenLevel > w.level) && (y.children = [], y.childrenLevel = w.level), y.childrenLevel === w.level && y.children.push(w)), w;
  }
  function f(l) {
    let y;
    for (; (y = s[s.length - 1]) && y.level >= l; )
      s.pop();
    return y || a;
  }
  function h(l) {
    var T;
    const y = b(l), w = (T = n.html(y.$node)) == null ? void 0 : T.trimEnd();
    return { comments: y.comments, html: w };
  }
  function b(l) {
    const y = [];
    return l = l.filter((w, T) => {
      if (T.type === "comment") {
        const I = T.data.trim();
        if (I.startsWith(Ft))
          return y.push(I.slice(Ft.length).trim()), !1;
      }
      return !0;
    }), { $node: l, comments: y };
  }
  function p(l, y) {
    l.each((w, T) => {
      var pt;
      const I = n(T), R = (pt = Object.entries(e.selectorRules).find(
        ([gt]) => I.is(gt)
      )) == null ? void 0 : pt[1], C = R == null ? void 0 : R({ $node: I, $: n, getContent: h });
      if (C != null && C.queue && !C.nesting) {
        p(C.queue, y);
        return;
      }
      const M = pr(T.tagName);
      if (!C) {
        M <= 6 && (c = M);
        return;
      }
      if (c > 0 && M > c || !I.is(e.selector)) return;
      c = 0;
      const P = M <= 6;
      let Du = {
        // If the child is an inline element and expected to be a separate node,
        // data from the closest `<p>` should be included, e.g. `<p data-lines><img /></p>`
        ...I.closest("p").data(),
        ...I.data()
      }, Lu = C.html || "";
      if (I.is("ol>li") && (y != null && y.children)) {
        const xt = +(I.parent().attr("start") || 1) + y.children.length;
        Lu = `${xt}. ${Lu}`, Du = {
          ...Du,
          listIndex: xt
        };
      }
      const bt = o({
        parent: y || f(M),
        nesting: !!C.queue || P,
        tagName: T.tagName,
        level: M,
        html: Lu,
        comments: C.comments,
        data: Du
      });
      P && s.push(bt), C.queue && p(C.queue, bt);
    });
  }
}
function xr(u) {
  return cr(u, (t, e) => {
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
function mr(u, t) {
  const e = gr(u, t);
  return xr(e);
}
export {
  or as Levels,
  mr as buildTree,
  xr as convertNode,
  dr as defaultOptions,
  gr as parseHtml
};
