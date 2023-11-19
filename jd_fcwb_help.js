/*
欢乐淘金（发财挖宝）助力

入口：京东APP——玩一玩——欢乐淘金

环境变量：
JD_FCWB_InviterId // 指定助力码 非必须，不填默认助力账号一  格式：inviterId&inviterCode
JD_FCWB_NUM // 指定人数  非必须，不填默认跑全部账号
代理变量： 本地IP理论正常助力，也无需开启代理
JD_FCWB_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_FCWB_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_FCWB_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_FCWB_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#欢乐淘金（发财挖宝）助力
1 1 1 1 * jd_fcwb_help.js, tag=欢乐淘金（发财挖宝）助力, enabled=true

*/

const $ = new Env('欢乐淘金(发财挖宝)助力')
const ili1Ii = require("./jdCookie"),
    Iilll1 = require("./function/sendJDNotify"),
    ll11I = require("./function/jdCommon"),
    iIi1I = require("./function/krgetH5st"),
    liIIl = process.env.JD_FCWB_Notify === "true",
    IlI1lI = process.env.JD_FCWB_InviterId || "",
    liIIi = process.env.JD_FCWB_NUM,
    IilllI = "cNAsHasSnzWTAtWhIQR4dA",
    iI1lIi = process.env.JD_FCWB_PROXY_OPEN === "true",
    l1lllI = process.env.JD_FCWB_PROXY_TUNNRL,
    llliIi = process.env.JD_FCWB_PROXY_URL,
    i1lIli = process.env.JD_FCWB_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";

let i1lIll = "",
    ll11ii = 0;
const liIlii = "2";
let llii1l = parseInt(liIlii) * 1000;
iI1lIi && (l1lllI || llliIi) && (llii1l = 100);
$.helpnum = 0;
$.FCWBEnd = false;
let liIlil = false;

if (iI1lIi) {
    liIlil = true;

    try {
        require("global-agent/bootstrap");

        if (llliIi) {
            console.log("\n☑️ API地址代理已开启：");
            console.log("☑️ 代理地址为：" + llliIi + "\n");
            let llii11 = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
            global.GLOBAL_AGENT.NO_PROXY = llii11.exec(llliIi)[0] + "," + i1lIli;
        } else l1lllI ? (global.GLOBAL_AGENT.HTTP_PROXY = l1lllI, global.GLOBAL_AGENT.NO_PROXY = "" + i1lIli, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_FCWB_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_FCWB_PROXY_URL='http://api.xxx.xxx'\n"));
    } catch (Iillli) {
        console.log("\n请安装global-agent依赖，才能启用代理！");
        console.log("\n安装命令：npm install global-agent\n");
        liIlil = false;
    }
} else console.log("\n⚠ 检测当前模式未开启代理："), console.log("⚠ 开启代理变量：export JD_FCWB_PROXY_OPEN='true' \n");

let llii1i = "";
const ll11il = Object.keys(ili1Ii).map(ll11l1 => ili1Ii[ll11l1]).filter(ll111 => ll111);
!ll11il[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
    liIIi ? console.log("❖ 已填写指定人数变量，指定人数 [" + liIIi + "]") : console.log("❖ 未填写指定人数变量，默认全车助力");

    if (IlI1lI) {
        let III111 = IlI1lI.split("&");
        $.zdinviter = III111[0];
        $.zdinviteCode = III111[1];
        console.log("❖ 已填写指定助力变量，开始助力 [" + $.zdinviteCode + "]");
    } else console.log("❖ 未填写指定助力变量，开始助力账号[1]");

    Iilll1.config({
        "title": $.name
    });

    for (let liIll1 = 0; liIll1 < ll11il.length; liIll1++) {
        $.index = liIll1 + 1;
        llii1i = ll11il[liIll1];
        ll11I.setCookie(llii1i);
        $.UserName = decodeURIComponent(ll11I.getCookieValue(llii1i, "pt_pin"));
        $.UA = ll11I.genUA($.UserName);
        $.message = Iilll1.create($.index, $.UserName);
        $.nickName = "";
        console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
        iI1lIi && liIlil && llliIi && (ll11ii % 5 == 0 && (await liIII(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1lIll), console.log("📶 " + i1lIll), ll11ii++);
        await iI1lIl();
        ll11I.unsetCookie();
        if ($.FCWBEnd || $.runEnd) break;
        await $.wait(parseInt(llii1l * 1 + 100, 10));
    }

    liIIl && Iilll1.getMessage() && (Iilll1.updateContent(Iilll1.content + "\n"), await Iilll1.push());
})().catch(I1I1ll => $.logErr(I1I1ll)).finally(() => $.done());

async function iI1lIl() {
    $.canWatering = true;
    $.hotproxy = false;

    try {
        if (IlI1lI) await Iili($.zdinviteCode, $.zdinviter); else {
            if ($.index == 1) {
                console.log("⏺️ 账号[1]获取助力信息");
                await iiIiII();
                if ($.runEnd) return;
            } else await Iili($.myinviteCode, $.markedPin);
        }
    } catch (illlii) {
        console.log(illlii.message);
    }
}

async function iiIiII() {
    $.happyDigHome = "";
    $.happyDigHelpList = "";
    await Iil1("happyDigHome");
    if ($.runEnd) return;
    await $.wait(parseInt(llii1l * 1 + 100, 10));
    await Iil1("happyDigHelpList");
    await $.wait(parseInt(llii1l * 1 + 100, 10));

    if ($.happyDigHome?.["markedPin"]) {
        $.myinviteCode = $.happyDigHome?.["inviteCode"];
        $.markedPin = $.happyDigHome?.["markedPin"];
        $.personNum = $.happyDigHelpList?.["personNum"] || 0;
        const l1l1Ii = new Date().valueOf(),
            IIIIlI = $.happyDigHome?.["leftTime"] + l1l1Ii,
            l1i11l = $.time("yyyy-MM-dd HH:mm:ss", IIIIlI);
        console.log("⏺️ 已开启活动，结束时间：" + l1i11l + "\n⏺️ 已有助力人数：" + $.personNum + "\n⏺️ 助力码：" + $.markedPin + "&" + $.myinviteCode);
    } else console.log("⏺️ 未能正确获取到助力码，退出执行！"), $.runEnd = true;
}

async function Iili(liiil1, lllII) {
    $.inviteCode = liiil1;
    $.inviter = lllII;
    await Iil1("happyDigHelp");
}

async function iIi11(l11iII, l1i11i) {
    try {
        switch (l11iII) {
            case "happyDigHelp":
                if (l1i11i?.["code"] === 0 && l1i11i?.["success"] === true) {
                    $.hotproxy = false;
                    $.happyDigHelp = l1i11i;

                    switch ($.happyDigHelp?.["success"]) {
                        case false:
                            console.log("❎ " + l1i11i.code + "-" + l1i11i.errMsg);
                            break;

                        case true:
                            if (IlI1lI) {
                                $.helpnum++;
                                console.log("✅ 助力成功 [" + $.helpnum + "]");

                                if (liIIi) {
                                    if (liIIi <= $.helpnum) {
                                        console.log("✅ 当前助力已达到指定助力人数，退出！");
                                        $.FCWBEnd = true;
                                        return;
                                    }
                                }
                            } else {
                                $.personNum++;
                                console.log("✅ 助力成功 [" + $.personNum + "]");

                                if (liIIi) {
                                    if (liIIi <= $.personNum) {
                                        console.log("✅ 当前助力已达到指定助力人数，退出！");
                                        $.FCWBEnd = true;
                                        return;
                                    }
                                }
                            }

                            break;

                        default:
                            {
                                console.log("[未知助力状态]:[" + $.happyDigHelp + "]");
                                $.hotproxy = true;
                                break;
                            }
                    }
                } else {
                    if (l1i11i.data?.["bizMsg"]) console.log("> " + l1i11i.code + "-" + l1i11i.errMsg); else {
                        if (l1i11i.errMsg) console.log("> " + l1i11i.code + "-" + l1i11i.errMsg); else {
                            if (l1i11i.msg) console.log("> " + l1i11i.code + "-" + l1i11i.msg); else {
                                console.log("❓" + l11iII + " " + JSON.stringify(l1i11i));
                            }
                        }
                    }
                }

                break;

            case "happyDigHome":
                if (l1i11i?.["code"] === 0 && l1i11i?.["success"] === true) $.hotproxy = false, $.happyDigHome = l1i11i.data; else {
                    if (l1i11i.data?.["bizMsg"]) console.log("> " + l1i11i.code + "-" + l1i11i.data?.["bizMsg"] + "}"); else {
                        if (l1i11i.errMsg) $.runEnd = true, console.log("> " + l1i11i.code + "-" + l1i11i.errMsg); else l1i11i.msg ? console.log("> " + l1i11i.code + "-" + l1i11i.msg) : console.log("❓" + l11iII + " " + JSON.stringify(l1i11i));
                    }
                }
                break;

            case "happyDigHelpList":
                if (l1i11i?.["code"] === 0 && l1i11i?.["success"] === true) $.hotproxy = false, $.happyDigHelpList = l1i11i.data; else {
                    if (l1i11i.data?.["bizMsg"]) console.log("> " + l1i11i.code + "-" + l1i11i.data?.["bizMsg"]); else {
                        if (l1i11i.errMsg) $.runEnd = true, console.log("> " + l1i11i.code + "-" + l1i11i.errMsg); else l1i11i.msg ? console.log("> " + l1i11i.code + "-" + l1i11i.msg) : console.log("❓" + l11iII + " " + JSON.stringify(l1i11i));
                    }
                }
                break;
        }
    } catch (llIil) {
        console.log("❌ 未能正确处理 " + l11iII + " 请求响应 " + (llIil.message || llIil));
    }
}

async function Iil1(llIii) {
    if ($.runEnd) return;
    let IIIIi1 = "",
        ii1IIl = "",
        ii1IIi = "GET",
        I1ll1l = "",
        I1ll1i = {};

    switch (llIii) {
        case "happyDigHome":
            I1ll1i = {
                "appId": "ce6c2",
                "functionId": "happyDigHome",
                "appid": "activities_platform",
                "clientVersion": "12.2.0",
                "client": "ios",
                "body": {
                    "linkId": IilllI
                },
                "version": "4.2",
                "ua": $.UA,
                "t": true
            }, I1ll1l = await iIi1I.getH5st(I1ll1i), IIIIi1 = "https://api.m.jd.com/api?" + I1ll1l.params;
            break;

        case "happyDigHelpList":
            I1ll1i = {
                "appId": "02f8d",
                "functionId": "happyDigHelpList",
                "appid": "activities_platform",
                "clientVersion": "12.2.0",
                "client": "ios",
                "body": {
                    "pageNum": 1,
                    "pageSize": 50,
                    "linkId": IilllI
                },
                "version": "4.2",
                "ua": $.UA,
                "t": true
            }, I1ll1l = await iIi1I.getH5st(I1ll1i), IIIIi1 = "https://api.m.jd.com/api?" + I1ll1l.params;
            break;

        case "happyDigHelp":
            I1ll1i = {
                "appId": "8dd95",
                "functionId": "happyDigHelp",
                "appid": "activities_platform",
                "clientVersion": "12.2.0",
                "client": "ios",
                "body": {
                    "linkId": IilllI,
                    "inviter": $.inviter,
                    "inviteCode": $.inviteCode
                },
                "version": "4.2",
                "ua": $.UA,
                "t": true
            }, I1ll1l = await iIi1I.getH5st(I1ll1i), IIIIi1 = "https://api.m.jd.com/api?" + I1ll1l.params;
            break;

        default:
            console.log("❌ 未知请求 " + llIii);
            return;
    }

    const i11iII = {
        "url": IIIIi1,
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": llii1i,
            "Host": "api.m.jd.com",
            "Referer": "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
            "X-Referer-Page": "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
            "Origin": "https://pro.m.jd.com",
            "x-rp-client": "h5_1.0.0",
            "User-Agent": $.UA
        },
        "body": ii1IIl,
        "timeout": 20000
    };
    ii1IIi === "GET" && (delete i11iII.body, delete i11iII.headers["Content-Type"]);
    const lI1Ii1 = 1;
    let i1I11 = 0,
        I1I1i1 = null,
        i1I1l = false;

    while (i1I11 < lI1Ii1) {
        if (i1I11 > 0) {
            await $.wait(1000);
        }

        const {
            err: ii1l1I,
            res: lI1lII,
            data: lIill1
        } = await ll11lI(i11iII, ii1IIi);

        if (ii1l1I) {
            if (typeof ii1l1I === "string" && ii1l1I.includes("Timeout awaiting 'request'")) I1I1i1 = llIii + " 请求超时，请检查网络重试"; else {
                const ilIlII = lI1lII?.["statusCode"];

                if (ilIlII) {
                    if ([403, 493].includes(ilIlII)) I1I1i1 = llIii + " 请求失败，IP被限制（Response code " + ilIlII + "）", $.hotproxy = true, i1I1l = true; else[400, 404].includes(ilIlII) ? ($.hotproxy = true, I1I1i1 = llIii + " 请求配置参数错误，请联系开发者进行反馈（Response code " + ilIlII + "）") : ($.hotproxy = true, I1I1i1 = llIii + " 请求失败（Response code " + ilIlII + "）");
                } else $.hotproxy = true, I1I1i1 = llIii + " 请求失败 => " + (ii1l1I.message || ii1l1I);
            }
            i1I11++;
        } else {
            const l1I1Il = ll11I.getResponseCookie(lI1lII),
                l1I1Ii = false;

            if (l1I1Ii) {
                console.log("\n---------------------------------------------------\n");
                console.log("🔧 " + llIii + " 响应Body => " + (lIill1 || "无") + "\n");
                console.log("🔧 " + llIii + " 响应Cookie => " + (l1I1Il || "无") + "\n");
                console.log("🔧 " + llIii + " 请求参数");
                console.log(i11iII);
                console.log("\n---------------------------------------------------\n");
            }

            try {
                const liliil = JSON.parse(lIill1);
                iIi11(llIii, liliil);
                break;
            } catch (I1iil1) {
                I1I1i1 = "❌ " + llIii + " 接口响应数据解析失败: " + I1iil1.message;
                console.log("🚫 " + llIii + " => " + String(lIill1 || "无响应数据"));
                l1I1Ii && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
                i1I11++;
            }

            i1I1l = false;
        }

        if (iI1lIi && liIlil) {
            if (llliIi) {
                $.hotproxy && (await liIII(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1lIll, ll11ii = 0, $.hotproxy = false, console.log("📶 " + i1lIll));
                ll11ii++;
            }
        }
    }

    i1I11 >= lI1Ii1 && (console.log(I1I1i1), i1I1l && ($.outFlag = true, $.message && $.message.fix(I1I1i1)));
}

async function ll11lI(iIiilI, iIiiil = "POST") {
    if (iIiiil === "POST") {
        return new Promise(async lIilli => {
            $.post(iIiilI, (Illll1, lI1iil, lIilll) => {
                lIilli({
                    "err": Illll1,
                    "res": lI1iil,
                    "data": lIilll
                });
            });
        });
    } else {
        if (iIiiil === "GET") {
            return new Promise(async ilI11i => {
                $.get(iIiilI, (lI1iiI, i11lII, iIIlli) => {
                    ilI11i({
                        "err": lI1iiI,
                        "res": i11lII,
                        "data": iIIlli
                    });
                });
            });
        } else {
            const iIIlll = "不支持的请求方法";
            return {
                "err": iIIlll,
                "res": null,
                "data": null
            };
        }
    }
}

function llliI1(I1iiiI, iiI1il) {
    return Math.floor(Math.random() * (iiI1il - I1iiiI)) + I1iiiI;
}

function liIII() {
    return new Promise(async llli1l => {
        $.get({
            "url": llliIi,
            "timeout": {
                "request": 5000
            }
        }, (IIliiI, i1111l) => {
            if (i1111l) {
                try {
                    let ilIIii = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
                        l1111 = ilIIii.exec(i1111l.body);
                    i1lIll = l1111[0];
                    global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1lIll;
                } catch (lIl1l1) { } finally {
                    llli1l();
                }
            }
        });
    });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
