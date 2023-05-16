/*
非plus购物返豆领取
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_gwfd.js
updatetime:2023/4/29
 */

const $ = new Env('购物返豆领取');
const lliI1li = $.isNode() ? require("./sendNotify") : "",
    Ii1i1il1 = $.isNode() ? require("./jdCookie.js") : "",
    iiiI1l = require("./USER_AGENTS");

let I1i1Ii1i = true,
    l1llllli = [],
    Ill1lIl1 = "",
    ll11iIi = "";

if ($.isNode()) {
    Object.keys(Ii1i1il1).forEach(lIi1IiII => {
        l1llllli.push(Ii1i1il1[lIi1IiII]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else l1llllli = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIlii1l($.getdata("CookiesJD") || "[]").map(i11lIiII => i11lIiII.cookie)].filter(IllIiII1 => !!IllIiII1);

!(async () => {
    if (!l1llllli[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let liliii1I = 0; liliii1I < l1llllli.length; liliii1I++) {
        if (l1llllli[liliii1I]) {
            Ill1lIl1 = l1llllli[liliii1I];
            $.UserName = decodeURIComponent(Ill1lIl1.match(/pt_pin=([^; ]+)(?=;?)/) && Ill1lIl1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = liliii1I + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = iiiI1l.UARAM ? iiiI1l.UARAM() : iiiI1l.USER_AGENT;
            await l1IillII();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await lliI1li.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await lilI1Il();

            if ($.orderlist.length == 0) {
                console.log("没有可领取！！！");
                continue;
            }

            let lIll1iiI = $.orderlist.map(Ii1lliI1 => Ii1lliI1.orderIdStr);
            await il1lilll(lIll1iiI);
            await $.wait(3000);
        }
    }
})().catch(IIl1II1I => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + IIl1II1I + "!", "");
}).finally(() => {
    $.done();
});

async function lilI1Il() {
    return new Promise(async liiIIIIi => {
        $.get(Iiii111l("manualCollectIndex", "%7B%22source%22%3A%22ljdhome%22%2C%22rnClient%22%3A%221%22%7D&appid=ld&clientVersion=11.6.5&client=android"), async (iIlIIIll, iIIIi1li, IlIli) => {
            try {
                if (iIlIIIll) {
                    console.log("" + JSON.stringify(iIlIIIll));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    IlIli = JSON.parse(IlIli);
                    IlIli.code == 0 ? $.orderlist = IlIli.data?.["orderList"] || [] : console.log(JSON.stringify(IlIli));
                }
            } catch (iIlIllII) {
                $.logErr(iIlIllII, iIIIi1li);
            } finally {
                liiIIIIi(IlIli);
            }
        });
    });
}

async function il1lilll(lii1l11I) {
    return new Promise(async lI11I1lI => {
        $.get(Iiii111l("manualCollectBeans", "%7B%22orderIdList%22%3A%5B%22" + encodeURIComponent(lii1l11I.toString()) + "%22%5D%7D&appid=ld&clientVersion=11.6.5&client=android"), async (IiIlIil, I1il11l1, I1l1Ii1) => {
            try {
                if (IiIlIil) {
                    console.log("" + JSON.stringify(IiIlIil));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    I1l1Ii1 = JSON.parse(I1l1Ii1);

                    if (I1l1Ii1.code == 0) {
                        if (I1l1Ii1.data.collectStatus == 0) $.log("领取成功！！"); else {
                            console.log(JSON.stringify(I1l1Ii1));
                        }
                    } else console.log(JSON.stringify(I1l1Ii1));
                }
            } catch (I11l11Ii) {
                $.logErr(I11l11Ii, I1il11l1);
            } finally {
                lI11I1lI(I1l1Ii1);
            }
        });
    });
}

function Iiii111l(lIilIiIi, Ili11lil) {
    return {
        "url": "https://api.m.jd.com/client.action?functionId=" + lIilIiIi + "&body=" + Ili11lil,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://h5.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": Ill1lIl1
        }
    };
}

function l1IillII() {
    return new Promise(IiIIiliI => {
        const i1Il1iI1 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": Ill1lIl1,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(i1Il1iI1, (IllIIii1, l1l1I11, l1liiil) => {
            try {
                if (l1liiil) {
                    l1liiil = JSON.parse(l1liiil);

                    if (l1liiil.islogin === "1") { } else l1liiil.islogin === "0" && ($.isLogin = false);
                }
            } catch (Ill1iIl) {
                console.log(Ill1iIl);
            } finally {
                IiIIiliI();
            }
        });
    });
}

function iiI1lIlI() {
    return new Promise(IlIll1i1 => {
        !I1i1Ii1i ? $.msg($.name, "", "" + ll11iIi) : $.log("京东账号" + $.index + $.nickName + "\n" + ll11iIi);
        IlIll1i1();
    });
}

function lli1iIll(lIil1iIi) {
    try {
        if (typeof JSON.parse(lIil1iIi) == "object") return true;
    } catch (l1111lII) {
        return console.log(l1111lII), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function lIlii1l(IIIiII) {
    if (typeof IIIiII == "string") try {
        return JSON.parse(IIIiII);
    } catch (lIlil11i) {
        return console.log(lIlil11i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }