/*
互动消息检测
仅检测，有豆到APP-我的-消息-互动消息去完成任务
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_hdcheck.js
updatetime:22023/08/24 屏蔽无用消息
 */

const $ = new Env('互动消息检查');
const _0x5f23a2 = $.isNode() ? require("./sendNotify") : "";
const _0xbf28e6 = $.isNode() ? require("./jdCookie.js") : "";
const _0x1ec1de = require("./USER_AGENTS");
const _0x8fbcc4 = require("./function/dylanx.js");
const _0x3680a2 = require("crypto-js");
let _0x48cde8 = true;
let _0x315a64 = [];
let _0x5c6a48 = "";
let _0x1b20b7 = "";
if ($.isNode()) {
  Object.keys(_0xbf28e6).forEach(_0x11fa1e => {
    _0x315a64.push(_0xbf28e6[_0x11fa1e]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x315a64 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x38734c($.getdata("CookiesJD") || "[]").map(_0x5708c2 => _0x5708c2.cookie)].filter(_0x49bdc2 => !!_0x49bdc2);
}
!(async () => {
  if (!_0x315a64[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("仅检测，有豆的话，去入口：APP-我的-消息-互动消息，做任务领取！\n");
  for (let _0x3f252d = 0; _0x3f252d < _0x315a64.length; _0x3f252d++) {
    if (_0x315a64[_0x3f252d]) {
      _0x5c6a48 = _0x315a64[_0x3f252d];
      $.UserName = decodeURIComponent(_0x5c6a48.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5c6a48.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x3f252d + 1;
      $.isLogin = true;
      $.nickName = "";
      $.hdlist = [];
      $.beanlist = [];
      $.UA = _0x1ec1de.UARAM ? _0x1ec1de.UARAM() : _0x1ec1de.USER_AGENT;
      await _0x350d07();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          ["open-url"]: "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await _0x5f23a2.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await _0x4bec21();
      for (let _0x1424b8 of $.hdlist) {
        if (_0x1424b8.expired || _0x1424b8.hasRead) {
          continue;
        }
        if (_0x1424b8.content.includes("京豆") && !_0x1424b8.content.includes("种豆") && !_0x1424b8.content.includes("农场") && !_0x1424b8.content.includes("签到") && !_0x1424b8.content.includes("昨日")) {
          $.beanlist.push(_0x1424b8.content);
        }
      }
      if ($.beanlist.length !== 0) {
        if (_0x1b20b7 == "") {
          _0x1b20b7 += "入口：APP-我的-消息-互动消息，去完成任务领豆吧！\n\n";
        }
        console.log("互动消息有豆，如下：\n");
        _0x1b20b7 += "【账号" + $.index + "：" + ($.nickName || $.UserName) + "】\n\n";
        for (let _0x28e20e of $.beanlist) {
          console.log(_0x28e20e + "\n");
          _0x1b20b7 += _0x28e20e + "\n\n";
        }
      } else {
        $.log("检测完毕，没有新的 给豆 消息！");
      }
      await $.wait(5000);
    }
  }
  if (_0x1b20b7) {
    await _0x5f23a2.sendNotify("" + $.name, "" + _0x1b20b7);
  }
})().catch(_0x51b1eb => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x51b1eb + "!", "");
}).finally(() => {
  $.done();
});
async function _0x4bec21() {
  let _0x4e4d6d = Date.now();
  let _0x408fc3 = _0xdc855e();
  let _0x2a9481 = _0xdc855e();
  let _0x4c6366 = {
    accountType: "12",
    bubblesCount: "0",
    lastMsgId: null,
    page: 1
  };
  let _0x2d2ba9 = _0x408fc3 + "&MessageCenter&{\"accountType\":\"12\",\"bubblesCount\":\"0\",\"lastMsgId\":null,\"page\":1}&98715&android&11.6.5&secondLvlMsgV854&0&zh_CN&0&wifi&" + _0x2a9481 + "&" + _0x408fc3 + "&12&jingdong&2276*1080&31&" + _0x4e4d6d + "&" + _0x408fc3;
  let _0x5be63 = "ddcccc63f0b2426fb61acb24c9439b3f";
  let _0x23b63a = _0x3680a2.HmacSHA256(_0x2d2ba9, _0x5be63);
  _0x23b63a = _0x3680a2.enc.Hex.stringify(_0x23b63a);
  let _0x7df707 = {
    url: "https://api.m.jd.com/client.action",
    body: "functionId=secondLvlMsgV854&lmt=0&t=" + _0x4e4d6d + "&appid=MessageCenter&clientVersion=11.6.5&build=98715&client=android&partner=jingdong&oaid=" + _0x2a9481 + "&sdkVersion=31&lang=zh_CN&harmonyOs=0&networkType=wifi&osVersion=12&screen=2276*1080&uuid=" + _0x408fc3 + "&aid=" + _0x408fc3 + "&openudid=" + _0x408fc3 + "&body=" + encodeURIComponent(JSON.stringify(_0x4c6366)) + "&sign=" + _0x23b63a,
    headers: {
      Host: "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      Cookie: _0x5c6a48
    }
  };
  return new Promise(async _0x2d1b45 => {
    $.post(_0x7df707, async (_0x1c00ff, _0x3698b2, _0x44557e) => {
      try {
        if (_0x1c00ff) {
          console.log("" + JSON.stringify(_0x1c00ff));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x44557e = JSON.parse(_0x44557e);
          if (_0x44557e.code == 0) {
            $.hdlist = _0x44557e.secondLevelList;
          } else {
            console.log(JSON.stringify(_0x44557e));
          }
        }
      } catch (_0x445ef8) {
        $.logErr(_0x445ef8, _0x3698b2);
      } finally {
        _0x2d1b45(_0x44557e);
      }
    });
  });
}
function _0xdc855e() {
  var _0xc906de;
  var _0x440540 = new Date().getTime();
  var _0x49003d = "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (_0x5699bb) {
    var _0xa0879f = (_0x440540 + Math.random() * 16) % 16 | 0;
    _0x440540 = Math.floor(_0x440540 / 16);
    return (_0x5699bb == "x" ? _0xa0879f : _0xa0879f & 3 | 8).toString(16);
  });
  return _0x49003d;
}
function _0xb845f3() {
  return;
}
function _0x350d07() {
  return new Promise(_0x14f34a => {
    const _0x158f63 = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: {},
      timeout: 10000
    };
    _0x158f63.headers.Cookie = _0x5c6a48;
    _0x158f63.headers.referer = "https://h5.m.jd.com/";
    _0x158f63.headers["User-Agent"] = $.UA;
    const _0x4f4fd3 = _0x158f63;
    $.get(_0x4f4fd3, (_0x10ed78, _0xdadd9b, _0x24432c) => {
      try {
        if (_0x24432c) {
          _0x24432c = JSON.parse(_0x24432c);
          if (_0x24432c.islogin === "1") {} else if (_0x24432c.islogin === "0") {
            $.isLogin = false;
          }
        }
      } catch (_0x4fc564) {
        console.log(_0x4fc564);
      } finally {
        _0x14f34a();
      }
    });
  });
}
function _0x1fc8e8() {
  return new Promise(_0x2887ee => {
    if (!_0x48cde8) {
      $.msg($.name, "", "" + _0x1b20b7);
    } else {
      $.log("京东账号" + $.index + $.nickName + "\n" + _0x1b20b7);
    }
    _0x2887ee();
  });
}
function _0xd1f551(_0x127132) {
  try {
    if (typeof JSON.parse(_0x127132) == "object") {
      return true;
    }
  } catch (_0x58160a) {
    console.log(_0x58160a);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x38734c(_0x5bc331) {
  if (typeof _0x5bc331 == "string") {
    try {
      return JSON.parse(_0x5bc331);
    } catch (_0x5a19ad) {
      console.log(_0x5a19ad);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }