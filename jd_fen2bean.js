/**
2023/2/7  create
2023/3/15 fix
只积分换豆，换积分用jd_washbean.js
默认定时不执行，自行设置
33 2 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_fen2bean.js
问题建议TG -> https://t.me/dylan_jdpro
*/

const $ = new Env('物流积分换豆');
const _0x4566ca = $.isNode() ? require("./sendNotify") : "";

const _0x485a7d = $.isNode() ? require("./jdCookie.js") : "";

let _0x83fda9 = [],
    _0x324a60 = "",
    _0x4872b6;

if ($.isNode()) {
    Object.keys(_0x485a7d).forEach(_0x1ccfa5 => {
        _0x83fda9.push(_0x485a7d[_0x1ccfa5]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x83fda9 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x26708b => _0x26708b.cookie)].filter(_0x2143b2 => !!_0x2143b2);
}

!(async () => {
    if (!_0x83fda9[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n有问题联系TG-> https://t.me/dylan_jdpro\n");

    for (let _0x29829d = 0; _0x29829d < _0x83fda9.length; _0x29829d++) {
        if (_0x83fda9[_0x29829d]) {
            _0x324a60 = _0x83fda9[_0x29829d];
            $.UserName = decodeURIComponent(_0x324a60.match(/pt_pin=([^; ]+)(?=;?)/) && _0x324a60.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x29829d + 1;
            $.isLogin = true;
            $.nickName = "";
            $.cu_integral = undefined;
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x1393e7();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                const _0x146fb3 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x146fb3);

                if ($.isNode()) {
                    await _0x4566ca.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            await _0x2bfe4f();
            await $.wait(2000);
        }
    }
})().catch(_0x8d01a7 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x8d01a7 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x2bfe4f() {
    await _0x13211e();
    await $.wait(500);

    if ($.cu_integral == undefined) {
        console.log("未获取到积分信息，跳出！");
        return;
    }

    if ($.cu_integral >= "5000") {
        $.cu_integral = 2000;
    }

    if ($.cu_integral >= "100") {
        $.log("开始兑换" + $.cu_integral + "京豆\n");
        await _0x2b39c9(2, $.cu_integral);
        $.sflag && (await $.wait(1000), await _0x2b39c9(2, $.cu_integral));
    } else {
        {
            $.log("积分不足100，跳过兑换\n");
            return;
        }
    }
}

function _0x2e1fa5() {
    return new Promise(async _0x4cf37c => {
        const _0x54eb73 = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Cookie": _0x324a60,
            "Host": "wq.jd.com",
            "Referer": "https://wqs.jd.com/promote/201801/bean/mybean.html",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
        };
        const _0x461573 = {
            "url": "https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=" + Date.now() + "&g_login_type=1&sceneval=2",
            "headers": _0x54eb73
        };
        $.get(_0x461573, (_0x5e42c5, _0x5963e, _0x5e222d) => {
            try {
                if (_0x5e42c5) {
                    console.log("" + JSON.stringify(_0x5e42c5));
                    console.log("getexpirebeans API请求失败，请检查网路重试");
                } else {
                    _0x5e222d ? (_0x5e222d = JSON.parse(_0x5e222d.slice(23, -13)), _0x4872b6 = 0, _0x5e222d.ret === 0 && (_0x5e222d.expirejingdou.forEach(_0x22f7ee => {
                        _0x4872b6 += _0x22f7ee.expireamount;
                    }), $.log("近七天将过期京豆" + _0x4872b6 + "个\n"))) : console.log("京东服务器返回空数据");
                }
            } catch (_0x1532b6) {
                $.logErr(_0x1532b6, _0x5963e);
            } finally {
                _0x4cf37c();
            }
        });
    });
}

function _0x592862() {
    return new Promise(async _0x305999 => {
        $.post(_0x14076b("integralHistory", "[{\"pin\":\"$cooMrdGatewayUid$\", \"pageSize\":10,\"pageNo\":1}]"), (_0x2adf5d, _0x712b29, _0x54b165) => {
            try {
                if (_0x2adf5d) {
                    $.log("" + JSON.stringify(_0x2adf5d));
                    $.log(" API请求失败，请检查网路重试");
                } else {
                    _0x54b165 = JSON.parse(_0x54b165);

                    if (_0x54b165.success) {
                        $.log("积分收支记录：");

                        let _0x4638a3 = _0x54b165.content.slice(0, 7);

                        _0x4638a3.forEach(_0x12c57a => {
                            console.log(_0x12c57a.sceneName + "：" + _0x12c57a.integration + " at " + new Date(_0x12c57a.createTime).toLocaleString());
                        });
                    }
                }
            } catch (_0xd7be41) {
                $.log(_0xd7be41, _0x712b29);
            } finally {
                _0x305999();
            }
        });
    });
}

function _0x13211e() {
    return new Promise(async _0x305d47 => {
        $.post(_0x14076b("userAccount", "[{\"pin\":\"$cooMrdGatewayUid$\"}]"), (_0x1993b7, _0x276bb7, _0x3557e9) => {
            try {
                _0x1993b7 ? ($.log("" + JSON.stringify(_0x1993b7)), $.log(" API请求失败，请检查网路重试")) : (_0x3557e9 = JSON.parse(_0x3557e9), _0x3557e9.success && ($.cu_integral = _0x3557e9.content.integral, $.log("当前总积分：" + $.cu_integral + "\n")));
            } catch (_0x5d5ee2) {
                $.log(_0x5d5ee2, _0x276bb7);
            } finally {
                _0x305d47();
            }
        });
    });
}

function _0x2b39c9(_0x13736e, _0x4818a9) {
    let _0x8ed79a;

    $.sflag = false;
    _0x13736e == 1 ? _0x8ed79a = "京豆兑换物流积分" : _0x8ed79a = "物流积分兑换京豆";

    let _0x2254d1 = _0x5da508("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"),
        _0x23bb1a = "[{\"businessNo\":\"" + _0x2254d1 + "\",\"title\":\"" + _0x8ed79a + "\",\"pin\" : \"$cooMrdGatewayUid$\",\"type\":" + _0x13736e + ",\"transferNumber\":" + _0x4818a9 + " }]";

    return new Promise(_0x294dd8 => {
        $.post(_0x14076b("transfer", _0x23bb1a), (_0x38c6dc, _0x10e7b0, _0x50bc4c) => {
            try {
                if (_0x38c6dc) {
                    $.log(JSON.stringify(_0x38c6dc));
                    $.log("请求失败");
                } else {
                    _0x50bc4c = JSON.parse(_0x50bc4c);

                    if (_0x50bc4c.code == 1) {
                        $.log("兑换成功！\n");
                    } else {
                        if (_0x50bc4c.code == 2005) {
                            $.log("今日兑换额度已达上限，明日赶早！\n");
                        } else {
                            $.sflag = true;
                            console.log(JSON.stringify(_0x50bc4c));
                            console.log("\n兑换失败，重试\n");
                        }
                    }
                }
            } catch (_0x356f22) {
                $.log(_0x356f22, _0x10e7b0);
            } finally {
                _0x294dd8();
            }
        });
    });
}

function _0x746c8a(_0x1c7dd0, _0x1352d2) {
    var _0x1ba70b = _0x1c7dd0.slice(0),
        _0x48be1d = _0x1c7dd0.length,
        _0x298a05 = _0x48be1d - _0x1352d2,
        _0x122133,
        _0x464b0c;

    while (_0x48be1d-- > _0x298a05) {
        _0x464b0c = Math.floor((_0x48be1d + 1) * Math.random());
        _0x122133 = _0x1ba70b[_0x464b0c];
        _0x1ba70b[_0x464b0c] = _0x1ba70b[_0x48be1d];
        _0x1ba70b[_0x48be1d] = _0x122133;
    }

    return _0x1ba70b.slice(_0x298a05);
}

function _0x14076b(_0x10d9e2, _0x5be2f7) {
    const _0x168e38 = {
        "Accept": "*/*",
        "Cookie": _0x324a60,
        "Accept-Language": "zh-cn",
        "Referer": "https://jingcai-h5.jd.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "AppParams": "{\"appid\":158,\"ticket_type\":\"m\"}",
        "User-Agent": $.UA,
        "access": "H5",
        "LOP-DN": "jingcai.jd.com",
        "Content-Type": "application/json;charset=utf-8"
    };
    _0x168e38.Accept = "*/*";
    _0x168e38.Cookie = _0x324a60;
    _0x168e38["Accept-Language"] = "zh-cn";
    _0x168e38.Referer = "https://jingcai-h5.jd.com/";
    _0x168e38["Accept-Encoding"] = "gzip, deflate, br";
    _0x168e38.AppParams = "{\"appid\":158,\"ticket_type\":\"m\"}";
    _0x168e38["User-Agent"] = $.UA;
    _0x168e38.access = "H5";
    _0x168e38["LOP-DN"] = "jingcai.jd.com";
    _0x168e38["Accept-Language"] = "zh-cn";
    _0x168e38.Accept = "application/json, text/plain, */*";
    _0x168e38["Content-Type"] = "application/json;charset=utf-8";
    const _0x3fbcc3 = {
        "url": "https://lop-proxy.jd.com/JingIntegralApi/" + _0x10d9e2,
        "headers": _0x168e38,
        "body": _0x5be2f7
    };
    return _0x3fbcc3;
}

function _0x5da508(_0x1a3b4f = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0xd0fc3e = 0) {
    return _0x1a3b4f.replace(/[xy]/g, function (_0x45811d) {
        var _0x5d03d3 = Math.random() * 16 | 0,
            _0x3fab87 = _0x45811d == "x" ? _0x5d03d3 : _0x5d03d3 & 3 | 8;

        if (_0xd0fc3e) {
            busNo = _0x3fab87.toString(36).toUpperCase();
        } else {
            busNo = _0x3fab87.toString(36);
        }

        return busNo;
    });
}

function _0x1393e7() {
    return new Promise(async _0x3ab622 => {
        const _0x4af499 = {
            "url": "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
            "headers": {
                "Host": "wq.jd.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Cookie": _0x324a60,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        };
        $.get(_0x4af499, (_0x9892b3, _0x1ff726, _0x99d930) => {
            try {
                if (_0x9892b3) {
                    $.logErr(_0x9892b3);
                } else {
                    if (_0x99d930) {
                        _0x99d930 = JSON.parse(_0x99d930);

                        if (_0x99d930.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }

                        _0x99d930.retcode === 0 && _0x99d930.data && _0x99d930.data.hasOwnProperty("userInfo") && ($.nickName = _0x99d930.data.userInfo.baseInfo.nickname);
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x4a86a6) {
                $.logErr(_0x4a86a6);
            } finally {
                _0x3ab622();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }