/*

脚本默认会帮我助力开工位，介意请添加变量HELP_JOYPARK，false为不助力
export HELP_JOYPARK=""

运行频繁会403，请自行定时运行

============Quantumultx===============
[task_local]
#特价版-牛牛乐园助力
1 1 1 1 * jd_tj_nnly_help.js, tag=特价版-牛牛乐园助力, enabled=true

*/
const $ = new Env('特价版-牛牛乐园助力');
const liIIi = $.isNode() ? require("./jdCookie.js") : "",
    IilllI = $.isNode() ? require("./sendNotify") : "",
    l1lllI = require("./function/krgetua");

let llliIi = [],
    i1lIli = "";

if ($.isNode()) {
    Object.keys(liIIi).forEach(llliI1 => {
        llliIi.push(liIIi[llliI1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else llliIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ll11lI($.getdata("CookiesJD") || "[]").map(liIII => liIII.cookie)].filter(llii11 => !!llii11);

$.invitePinTaskList = [];
$.invitePin = [""];
let i1lIll = Date.now();
message = "";
!(async () => {
    if (!llliIi[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let II1i = 0; II1i < llliIi.length; II1i++) {
        i1lIli = llliIi[II1i];

        if (i1lIli) {
            $.UserName = decodeURIComponent(i1lIli.match(/pt_pin=([^; ]+)(?=;?)/) && i1lIli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = II1i + 1;
            $.isLogin = true;
            $.nickName = "";
            $.openIndex = 0;
            UA = await l1lllI($.UserName);
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await IilllI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            // if ($.isNode()) {
            //     if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") { } else {
            //         $.kgw_invitePin = [""][Math.floor(Math.random() * 11)];
            //         await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            //         let II11 = await llii1l("", 2, $.kgw_invitePin);
            //         await $.wait(parseInt(Math.random() * 2000 + 3000, 10));

            //         if (II11.data && II11.data.helpState && II11.data.helpState === 1) { } else {
            //             if (II11.data && II11.data.helpState && II11.data.helpState === 3) { } else {
            //                 if (II11.data && II11.data.helpState && II11.data.helpState === 2) $.openIndex++; else { }
            //             }
            //         }
            //     }
            // }

            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            await llii1l();
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            if ($.joyBaseInfo && $.joyBaseInfo.invitePin) $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin), $.invitePinTaskList.push($.joyBaseInfo.invitePin); else {
                $.log($.name + " - " + $.UserName + "  助力码: null");
                $.invitePinTaskList.push("");
                $.isLogin = false;
                $.log("服务端异常，尝试手动进入活动，入口：特价版-我的-汪汪乐园");
                continue;
            }
            await liIlii();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

            for (const ii1II1 of $.taskList) {
                ii1II1.taskType === "SIGN" && ($.log("" + ii1II1.taskTitle), await liIlil(ii1II1.id, ii1II1.taskType, undefined), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), $.log(ii1II1.taskTitle + " 领取奖励"), await iI1lIl(ii1II1.id, ii1II1.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));

                if (ii1II1.taskType === "BROWSE_PRODUCT" || ii1II1.taskType === "BROWSE_CHANNEL" && ii1II1.taskLimitTimes !== 1) {
                    let iliIll = await ll11il(ii1II1.id, ii1II1.taskType);
                    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                    let llliIl = 6;

                    if (iliIll.length === 0) {
                        let iliIli = await iI1lIl(ii1II1.id, ii1II1.taskType);
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                        !iliIli.success && ($.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 领取完成!"), iliIll = await ll11il(ii1II1.id, ii1II1.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                    }

                    while (ii1II1.taskLimitTimes - ii1II1.taskDoTimes >= 0) {
                        if (iliIll.length === 0) {
                            $.log(ii1II1.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
                            break;
                        }

                        $.log(ii1II1.taskTitle + " " + ii1II1.taskDoTimes + "/" + ii1II1.taskLimitTimes);
                        let illliI = await liIlil(ii1II1.id, ii1II1.taskType, iliIll[llliIl].itemId, "activities_platform");
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                        illliI.code === 2005 || illliI.code === 0 ? $.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 任务完成！") : $.log("任务失败！");
                        llliIl++;
                        ii1II1.taskDoTimes++;
                        if (!iliIll[llliIl]) break;
                    }

                    for (let i11iIl = 0; i11iIl < ii1II1.taskLimitTimes; i11iIl++) {
                        let ll11ll = await iI1lIl(ii1II1.id, ii1II1.taskType);
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

                        if (!ll11ll.success) {
                            $.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 领取完成!");
                            break;
                        }
                    }
                } else {
                    if (ii1II1.taskType === "SHARE_INVITE") {
                        $.yq_taskid = ii1II1.id;

                        for (let liiiii = 0; liiiii < 5; liiiii++) {
                            let II1I = await iI1lIl($.yq_taskid, "SHARE_INVITE");
                            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            if (!II1I.success) break;
                            $.log("领取助力奖励成功！");
                        }
                    }
                }

                ii1II1.taskType === "BROWSE_CHANNEL" && ii1II1.taskLimitTimes === 1 && ($.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle), await llii1i(ii1II1.id, ii1II1.taskType, ii1II1.taskSourceUrl), $.log(ii1II1.taskTitle + "|" + ii1II1.taskShowTitle + " 领取奖励"), await iI1lIl(ii1II1.id, ii1II1.taskType));
            }
        }
    }

    $.log("\n======汪汪乐园开始内部互助======\n");

    for (let lI1111 = 0; lI1111 < llliIi.length; lI1111++) {
        i1lIli = llliIi[lI1111];

        if (i1lIli) {
            $.UserName = decodeURIComponent(i1lIli.match(/pt_pin=([^; ]+)(?=;?)/) && i1lIli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = lI1111 + 1;
            $.isLogin = true;
            $.nickName = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await IilllI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];

            for (const Ilil1 of $.newinvitePinTaskList) {
                $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + Ilil1);
                await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
                let IliII1 = await llii1l($.yq_taskid, 1, Ilil1);
                await $.wait(parseInt(Math.random() * 2000 + 3000, 10));

                if (IliII1.success) {
                    if (IliII1.data.helpState === 1) $.log("助力成功！"); else {
                        if (IliII1.data.helpState === 0) $.log("自己不能助力自己！"); else {
                            if (IliII1.data.helpState === 2) $.log("助力过了！"); else {
                                if (IliII1.data.helpState === 3) {
                                    $.log("没有助力次数了！");
                                    break;
                                } else IliII1.data.helpState === 4 && $.log("这个B助力满了！");
                            }
                        }
                    }
                } else {
                    $.log("数据异常 助力失败！\n\n");
                    break;
                }
            }
        }
    }
})().catch(llIii => $.logErr(llIii)).finally(() => $.done());

function liIlii() {
    return new Promise(i1I1l => {
        $.post(iiIiII("body={\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}&appid=activities_platform", "apTaskList"), async (i1I1i, IIiiII, llIiI) => {
            $.log("=== 任务列表 start ===");

            try {
                if (i1I1i) console.log("" + JSON.stringify(i1I1i)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    llIiI = JSON.parse(llIiI);
                    $.taskList = llIiI.data;

                    for (const Iii1I1 of $.taskList) {
                        $.log(Iii1I1.taskTitle + " " + Iii1I1.taskDoTimes + "/" + Iii1I1.taskLimitTimes);
                    }

                    $.log("=== 任务列表 end  ===");
                }
            } catch (i11iI1) {
                $.logErr(i11iI1, IIiiII);
            } finally {
                i1I1l(llIiI);
            }
        });
    });
}

async function llii1l(Iii1II = "", llIlI = "", l1iIil = "") {
    const illllI = {
        "functionId": "joyBaseInfo",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": i1lIll,
        "appid": "activities_platform",
        "body": "{\"taskId\":\"" + Iii1II + "\",\"inviteType\":\"" + llIlI + "\",\"inviterPin\":\"" + l1iIil + "\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
        II1II = await iIi11("4abce", illllI);
    return new Promise(lI1lIi => {
        $.post(Iili(II1II), async (illlll, IIIIiI, II1I1) => {
            try {
                illlll ? (console.log("" + JSON.stringify(illlll)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (II1I1 = JSON.parse(II1I1), $.joyBaseInfo = II1I1.data);
            } catch (ii1l1I) {
                $.logErr(ii1l1I, IIIIiI);
            } finally {
                lI1lIi(II1I1);
            }
        });
    });
}

async function liIlil(iiI1i1, ilIlII, iIiil1 = "", l1lI1i = "activities_platform") {
    const l1I1Il = {
        "functionId": "apDoTask",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": i1lIll,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + ilIlII + "\",\"taskId\":" + iiI1i1 + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + iIiil1 + "\"}"
    },
        l1I1Ii = await iIi11("4abce", l1I1Il);
    return new Promise(iIiiil => {
        $.post(Iili(l1I1Ii), async (iIiiii, ilIlIi, ilIlIl) => {
            try {
                iIiiii ? (console.log("" + JSON.stringify(iIiiii)), console.log($.name + " API请求失败，请检查网路重试")) : ilIlIl = JSON.parse(ilIlIl);
            } catch (l1lI1I) {
                $.logErr(l1lI1I, ilIlIi);
            } finally {
                iIiiil(ilIlIl);
            }
        });
    });
}

async function llii1i(l1lI11, lI1iii, i11lIi, ll1ll1 = "activities_platform") {
    const lIilli = {
        "functionId": "apDoTask",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": i1lIll,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + lI1iii + "\",\"taskId\":" + l1lI11 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + i11lIi + "\"}"
    },
        I1iiii = await iIi11("4abce", lIilli);
    return new Promise(lIilll => {
        $.post(Iili(I1iiii), async (ilI11i, ilI11l, li1I) => {
            try {
                ilI11i ? (console.log("" + JSON.stringify(ilI11i)), console.log($.name + " API请求失败，请检查网路重试")) : li1I = JSON.parse(li1I);
            } catch (ll1liI) {
                $.logErr(ll1liI, ilI11l);
            } finally {
                lIilll(li1I);
            }
        });
    });
}

async function ll11il(ll1li1, iIIlll) {
    const iiI1il = {
        "functionId": "apTaskDetail",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": i1lIll,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + iIIlll + "\",\"taskId\":" + ll1li1 + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
        iiI1ii = await iIi11("4abce", iiI1il);
    return new Promise(llli1l => {
        $.post(Iili(iiI1ii), async (llli1i, iiI1l1, i11lI1) => {
            try {
                llli1i ? (console.log("" + JSON.stringify(llli1i)), console.log($.name + " API请求失败，请检查网路重试")) : (i11lI1 = JSON.parse(i11lI1), !i11lI1.success ? $.taskDetailList = [] : $.taskDetailList = i11lI1?.["data"]?.["taskItemList"]);
            } catch (Ii1l11) {
                $.logErr(Ii1l11, iiI1l1);
            } finally {
                !i11lI1.success ? llli1l([]) : llli1l(i11lI1.data.taskItemList);
            }
        });
    });
}

async function iI1lIl(i1111l, i1111i) {
    const Illli1 = {
        "functionId": "apTaskDrawAward",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": i1lIll,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + i1111i + "\",\"taskId\":" + i1111l + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
        ilIIii = await iIi11("55276", Illli1);
    return new Promise(li1l => {
        $.post(Iili(ilIIii), async (iliiII, iiI1li, IIliii) => {
            try {
                iliiII ? (console.log("" + JSON.stringify(iliiII)), console.log($.name + " API请求失败，请检查网路重试")) : (IIliii = JSON.parse(IIliii), $.log("领取奖励"));
            } catch (i1111I) {
                $.logErr(i1111I, iiI1li);
            } finally {
                li1l(IIliii);
            }
        });
    });
}

function iiIiII(IliIl1, lIl1lI) {
    return {
        "url": "https://api.m.jd.com/client.action" + (lIl1lI ? "?functionId=" + lIl1lI : ""),
        "body": IliIl1,
        "headers": {
            "User-Agent": UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
            "Cookie": i1lIli
        }
    };
}

function Iili(lIiliI) {
    return {
        "url": "https://api.m.jd.com/?" + lIiliI,
        "headers": {
            "User-Agent": UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
            "Cookie": i1lIli
        }
    };
}

async function iIi11(Ii1IIi, Ii1IIl) {
    let ll1lli = {
        "appId": Ii1IIi,
        ...Ii1IIl,
        "ua": UA,
        "pin": $.UserName
    },
        ll1lll = {
            "url": "http://kr.kingran.cf/h5st",
            "body": JSON.stringify(ll1lli),
            "headers": {
                "Content-Type": "application/json"
            },
            "timeout": 30000
        };
    return new Promise(async lIl1ll => {
        $.post(ll1lll, (Ii111, Ii1III, ilIIi1) => {
            let lilili = "";

            try {
                if (Ii111) console.log("" + JSON.stringify(Ii111)), console.log($.name + " geth5st API请求失败，请检查网路重试"); else {
                    ilIIi1 = JSON.parse(ilIIi1);

                    if (typeof ilIIi1 === "object" && ilIIi1 && ilIIi1.body) {
                        if (ilIIi1.body) lilili = ilIIi1.body || "";
                    } else ilIIi1.code == 400 ? console.log("\n" + ilIIi1.msg) : console.log("\n可能连接不上接口，请检查网络");
                }
            } catch (lilill) {
                $.logErr(lilill, Ii1III);
            } finally {
                lIl1ll(lilili);
            }
        });
    });
}

function Iil1(l1lI1) {
    l1lI1 = l1lI1 || 32;
    let lI1I1i = "abcdef0123456789",
        liI1II = lI1I1i.length,
        i1Iii1 = "";

    for (i = 0; i < l1lI1; i++) i1Iii1 += lI1I1i.charAt(Math.floor(Math.random() * liI1II));

    return i1Iii1;
}

function ll11lI(lilI1I) {
    if (typeof lilI1I == "string") try {
        return JSON.parse(lilI1I);
    } catch (lI1I1I) {
        return console.log(lI1I1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
