
/*
转赚红包
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头，不指定默认CK1， 变量 JDZHBTOPPIN='jdpin'
多少助力换下一个车头，默认999个 ，控制变量 JDZHBNUM='100';
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
开启提现到上限转红包 JDZHBTORED='true'
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb.js
updatetime:2023/8/21 fix
 */

const $ = new Env('Jd转赚红包');
const _0x292d21 = $.isNode() ? require("./sendNotify") : "",
      _0x4c4dc9 = $.isNode() ? require("./jdCookie.js") : "",
      _0x5e9a4e = require("./function/dylanz"),
      _0x2a7a15 = require("./USER_AGENTS");

let _0x1b052a = true,
    _0x3e663a = [],
    _0x404ac5 = [],
    _0x7984d6 = [],
    _0x3a6b30 = [],
    _0x233fa0 = [],
    _0x1860d8 = "",
    _0x50ee4d = "",
    _0x26c33d = "",
    _0x4e1eec,
    _0x5ec212 = process.env.JDZHBNUM || "9999",
    _0x3caba7 = process.env.JDZHBLTNUM || "0",
    _0x2fa63d = process.env.JDZHBDELAY || "1",
    _0x4a339e = process.env.JDZHBTORED || false,
    _0x56481c = process.env.JDZHBTOPPIN || "",
    _0x10be9c = process.env.TXSILENT || false;

if ($.isNode()) {
  Object.keys(_0x4c4dc9).forEach(_0x5bc4a2 => {
    _0x233fa0.push(_0x4c4dc9[_0x5bc4a2]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x233fa0 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x56aafc($.getdata("CookiesJD") || "[]").map(_0x585dab => _0x585dab.cookie)].filter(_0x4be216 => !!_0x4be216);
}

!(async () => {
  if (!_0x233fa0[0]) {
    const _0x10ebf1 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x10ebf1);
    return;
  }

  $.log("\n当前版本：2.1.0 提现满转红包");
  console.log("执行流程，车头开团--助力--抽奖--提现");
  console.log("问题建议：https://t.me/dylan_jdpro");

//   let _0x5842d6 = await _0x2073f7();

  if (_0x56481c) {
    console.log("\n已指定PIN：" + _0x56481c);

    let _0x50d704 = _0x233fa0.findIndex(_0x8b0239 => _0x8b0239.includes(encodeURIComponent(_0x56481c)));

    _0x50d704 == -1 && (console.log("运行的CK中没找到指定的PIN，CK1为车头"), _0x50d704 = 0);
    _0x1860d8 = _0x233fa0[_0x50d704];
  } else {
    console.log("\n未指定PIN默认CK1车头");
    _0x1860d8 = _0x233fa0[0];
  }

  $.UserName = decodeURIComponent(_0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.UA = _0x2a7a15.UARAM ? _0x2a7a15.UARAM() : _0x2a7a15.USER_AGENT;
  console.log("\n——————————————车头开团——————————————");
  console.log("账号：" + ($.nickName || $.UserName));
  await _0x21ece6();

  if (!$.isLogin) {
    const _0x336cf0 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x336cf0);
    $.isNode() && (await _0x292d21.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
    return;
  }

  await _0x674355(1);
  await $.wait(1000);

//   if (_0x5842d6.length != 0) {
//     let _0x472809 = _0x5842d6[Math.floor(Math.random() * _0x5842d6.length)];

//     console.log("车头去助力 -> 作者");
//     $.UserName = decodeURIComponent(_0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
//     $.UA = _0x2a7a15.UARAM ? _0x2a7a15.UARAM() : _0x2a7a15.USER_AGENT;
//     await _0x222db3(_0x472809);
//     await $.wait(2000);
//   }

  console.log("————————————————————————————————————");
  console.log("\n\n开始助力车头...");
  _0x4e1eec = 0;

  for (let _0x39b428 of _0x3e663a) {
    if (_0x233fa0.length === 1) {
      console.log("");
      break;
    }

    console.log("\n去助力-> " + _0x39b428);
    $.suc = 0;
    $.alr = 0;
    $.nhp = 0;

    for (let _0x5ac1d5 = _0x4e1eec; _0x5ac1d5 < _0x233fa0.length; _0x5ac1d5++) {
      if (_0x233fa0[_0x5ac1d5]) {
        _0x1860d8 = _0x233fa0[_0x5ac1d5];
        $.UserName = decodeURIComponent(_0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x5ac1d5 + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = _0x2a7a15.UARAM ? _0x2a7a15.UARAM() : _0x2a7a15.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
        await _0x222db3(_0x39b428);

        if ($.suc > Number(_0x5ec212) + 1) {
          $.log("已达目标助力数，跳出！");
          _0x4e1eec = _0x5ac1d5 + 1;
          break;
        }

        await $.wait(1000);
      }
    }

    if ($.index === _0x233fa0.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }

  console.log("\n\n开始抽奖和提现...");
  _0x3caba7 != 0 && console.log("\n已设置本次运行抽奖次数 " + _0x3caba7);

  let _0x1754a1 = new Date();

  _0x1754a1.setDate(_0x1754a1.getDate() - 1);

  for (let _0x1125b5 = 0; _0x1125b5 < _0x233fa0.length; _0x1125b5++) {
    if (_0x233fa0[_0x1125b5]) {
      _0x1860d8 = _0x233fa0[_0x1125b5];
      $.UserName = decodeURIComponent(_0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1860d8.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x1125b5 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.fail = 0;
      _0x404ac5 = [];
      _0x7984d6 = [];
      $.txj = true;
      $.fg = 1;
      $.txfull = false;
      $.nocashnum = 0;
      $.end = false;
      $.UA = _0x2a7a15.UARAM ? _0x2a7a15.UARAM() : _0x2a7a15.USER_AGENT;
      console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

      let _0x33e17e = await _0x674355(0);

      if (_0x33e17e.code != "0") {
        continue;
      }

      $.log("本轮已抽奖次数：" + _0x33e17e.data.drawPrizeNum);
      $.log("当前剩余抽奖次数：" + $.times);
      $.log("本轮结束时间： " + _0x187d52(new Date(Date.now() + _0x33e17e.data.countDownTime)) + "\n");

      for (let _0xa5a18b = 0; _0xa5a18b < (_0x3caba7 != 0 && _0x3caba7 < $.times ? _0x3caba7 : $.times); _0xa5a18b++) {
        await _0x2b2033(_0xa5a18b + 1);

        if ($.end) {
          break;
        }

        await $.wait(Math.random() * 500 + _0x2fa63d * 1000);

        if ($.fail > 2) {
          $.log("连续3次优惠券，不继续抽了");
          break;
        }
      }

      _0x7984d6.length !== 0 && $.log("\n本次抽奖获得红包总计：" + _0x7984d6.reduce((_0x3e39ef, _0x48beed) => _0x3e39ef + _0x48beed * 100, 0) / 100 + "元");
      _0x404ac5.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x404ac5.reduce((_0x5021f3, _0x3202cf) => _0x5021f3 + _0x3202cf * 100, 0) / 100 + "元");

      if (new Date().getHours() < 7 && _0x10be9c) {
        continue;
      }

      $.log("\n开始提现(遍历奖励列表)...");
      _0x4a339e && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");

      for (let _0x29263f = 0; _0x29263f < 50; _0x29263f++) {
        if ($.nocashnum > 2) {
          break;
        }

        if ($.txfull && !_0x4a339e) {
          $.log("\n本月提现到上限!如转红包请设置变量");
          break;
        }

        await _0x59fb7b(_0x29263f + 1);
        await $.wait(1000);

        if (!$.baglist || $.baglist.length === 0) {
          break;
        }

        for (let _0x4bf121 of $.baglist) {
          if (new Date(_0x4bf121.createTime) < _0x1754a1) {
            $.nocashnum = 5;
            break;
          }

          if (_0x4bf121.prizeType == 4) {
            if (_0x4bf121.state == 0 || _0x4bf121.state == 2) {
              process.stdout.write("" + Number(_0x4bf121.amount));

              let _0x25d684 = await _0x4332d8(_0x4bf121);

              $.txfail && (await $.wait(5000), _0x25d684 = await _0x4332d8(_0x4bf121));

              if ($.txfull && !_0x4a339e) {
                break;
              }

              await $.wait(1000);

              if (_0x25d684.data.message.includes("上限") && _0x4a339e) {
                await _0x205374(_0x4bf121);
              }

              await $.wait(4000);
            } else {
              _0x4bf121.state == 8;
            }
          }
        }
      }

      _0x3a6b30 = [];
      await $.wait(2000);
    }
  }
})().catch(_0x4ff066 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4ff066 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x674355(_0x1c6798) {
  let _0x49e392 = "functionId=inviteFissionHome&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  return new Promise(async _0x3d6ce4 => {
    $.post(_0x2baf23(_0x49e392), async (_0x233cf6, _0x2699b6, _0x92b958) => {
      try {
        if (_0x233cf6) {
          console.log("" + JSON.stringify(_0x233cf6));
          console.log("homeinfo请求失败，请检查网路重试");
        } else {
          _0x92b958 = JSON.parse(_0x92b958);

          if (_0x92b958.code == 0) {
            $.times = _0x92b958.data.prizeNum;

            if (_0x1c6798) {
              console.log("助力码：" + _0x92b958.data.inviter);
            }

            _0x3e663a.push(_0x92b958.data.inviter);
          } else {
            console.log(_0x92b958.errMsg);
          }
        }
      } catch (_0x56c1d3) {
        $.logErr(_0x56c1d3, _0x2699b6);
      } finally {
        _0x3d6ce4(_0x92b958);
      }
    });
  });
}

async function _0x44a538() {
  const _0x25f2aa = {
    "linkId": "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0x187c88 = {
    "appId": "b8469",
    "fn": "inviteFissionReceive",
    "body": _0x25f2aa,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  _0x25f2aa = await _0x1d13a2(_0x187c88) //: "functionId=inviteFissionReceive&body=" + _0x25f2aa + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

  if (!_0x25f2aa) {
    return;
  }

  return new Promise(async _0x535bf1 => {
    $.post(_0x2baf23(_0x25f2aa), async (_0x1944ab, _0x5144f0, _0x412347) => {
      try {
        _0x1944ab ? (console.log("" + JSON.stringify(_0x1944ab)), console.log("receive请求失败，请检查网路重试")) : (_0x412347 = JSON.parse(_0x412347), _0x412347.code == 0 ? $.log("------提现金：" + _0x412347.data.amount) : $.txj = false);
      } catch (_0x1a3521) {
        $.logErr(_0x1a3521, _0x5144f0);
      } finally {
        _0x535bf1(_0x412347);
      }
    });
  });
}

async function _0x2b2033(_0x1d970a) {
  const _0x292f70 = {
    "linkId": "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0x5373c2 = {
    "appId": "c02c6",
    "fn": "inviteFissionDrawPrize",
    "body": _0x292f70,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": $.fg,
    "ua": $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x292f70 = await _0x5e9a4e.getbody(_0x5373c2);

  if (!_0x292f70) {
    return;
  }

  return new Promise(async _0x248383 => {
    $.post(_0x2baf23(_0x292f70), async (_0x31ac62, _0x4ed7aa, _0x462b49) => {
      try {
        if (_0x31ac62) {
          console.log("" + JSON.stringify(_0x31ac62));
          console.log("lottery请求失败，请检查网路重试");
        } else {
          _0x462b49 = JSON.parse(_0x462b49);

          if (_0x462b49.code == 0) {
            const _0x136464 = _0x462b49.data.prizeType;

            if (!_0x136464) {
              fail++;
            }

            switch (_0x136464) {
              case 1:
                console.log("第" + _0x1d970a + "次抽奖结果：垃圾卷 😤");
                $.fail++;
                break;

              case 4:
                let _0x165bca = parseFloat(_0x462b49.data.prizeValue).toFixed(2);

                console.log("第" + _0x1d970a + "次抽奖结果：" + _0x165bca + "现金 💰️");

                _0x404ac5.push(_0x165bca);

                const _0x2ae2b4 = {
                  "prizeValue": _0x462b49.data.prizeValue,
                  "id": _0x462b49.data.id,
                  "poolBaseId": _0x462b49.data.poolBaseId,
                  "prizeGroupId": _0x462b49.data.prizeGroupId,
                  "prizeBaseId": _0x462b49.data.prizeBaseId
                };

                _0x3a6b30.push(_0x2ae2b4);

                $.fail = 0;
                break;

              case 2:
                let _0x5650cc = parseFloat(_0x462b49.data.prizeValue).toFixed(2);

                console.log("第" + _0x1d970a + "次抽奖结果：" + _0x5650cc + "红包 🧧");

                _0x7984d6.push(_0x5650cc);

                $.fail = 0;
                break;

              default:
                console.log(JSON.stringify(_0x462b49.data));
            }
          } else {
            if (_0x462b49.errMsg.includes("火爆")) {
              console.log("第" + _0x1d970a + "次抽奖结果：未中奖！");
            } else {
              _0x462b49.errMsg.includes("结束") ? ($.end = true, console.log(_0x462b49.errMsg)) : console.log(_0x462b49.errMsg);
            }
          }
        }
      } catch (_0x1ff080) {
        $.logErr(_0x1ff080, _0x4ed7aa);
      } finally {
        _0x248383(_0x462b49);
      }
    });
  });
}

async function _0x59fb7b(_0x2dafaf) {
  const _0xbf9773 = {
    "pageNum": _0x2dafaf,
    "pageSize": 100,
    "linkId": "3orGfh1YkwNLksxOcN8zWQ",
    "business": "fission"
  };
  let _0x64c099 = {
    "appId": "f2b1d",
    "fn": "superRedBagList",
    "body": _0xbf9773,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  _0xbf9773 = await _0x5e9a4e.getbody(_0x64c099);

  if (!_0xbf9773) {
    return;
  }

  return new Promise(async _0x533f33 => {
    $.get(_0x2baf23(_0xbf9773), async (_0x17efc, _0x4c359f, _0xb2e4cc) => {
      try {
        if (_0x17efc) {
          console.log("" + JSON.stringify(_0x17efc));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0xb2e4cc = JSON.parse(_0xb2e4cc);

          if (_0xb2e4cc.code == 0) {
            $.baglist = _0xb2e4cc.data.items;
          } else {
            console.log(_0xb2e4cc.errMsg);
          }
        }
      } catch (_0x26b3e7) {
        $.logErr(_0x26b3e7, _0x4c359f);
      } finally {
        _0x533f33(_0xb2e4cc);
      }
    });
  });
}

async function _0x222db3(_0x1f2d11) {
  const _0x5418e0 = {
    "linkId": "3orGfh1YkwNLksxOcN8zWQ",
    "isJdApp": true,
    "inviter": _0x1f2d11
  };
  let _0x27a72a = {
    "appId": "02f8d",
    "fn": "inviteFissionBeforeHome",
    "body": _0x5418e0,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": 1,
    "ua": $.UA
  };
  _0x5418e0 = await _0x5e9a4e.getbody(_0x27a72a);

  if (!_0x5418e0) {
    return;
  }

  return new Promise(async _0x2a4026 => {
    $.post(_0x2baf23(_0x5418e0), async (_0x522bb4, _0x485da8, _0x2fe628) => {
      try {
        if (_0x522bb4) {
          console.log("" + JSON.stringify(_0x522bb4));
          console.log("help请求失败，请检查网路重试");
        } else {
          _0x2fe628 = JSON.parse(_0x2fe628);

          if (_0x2fe628.code == 0) {
            if (!_0x2fe628.data.helpFlg) {
              $.log("结果：不能助力自己！");
              return;
            }

            if (_0x2fe628.data.helpResult == 1) {
              $.suc++;
              $.alr = 0;
              console.log("结果：助力成功 ✅ " + ($.suc || ""));
            } else {
              if (_0x2fe628.data.helpResult == 6) {
                console.log("结果：已经助力过TA！");
                $.alr++;
              } else {
                if (_0x2fe628.data.helpResult == 3) {
                  console.log("结果：没有次数了！");
                  $.nohelp = true;
                  $.nhp++;
                } else {
                  if (_0x2fe628.data.helpResult == 2) {
                    $.log("结果：助力黑了 💣");
                    $.hot = true;
                  } else {
                    if (_0x2fe628.data.helpResult == 4) {
                      $.log("结果：没有助力次数！");
                      $.nhp++;
                    } else {
                      _0x2fe628.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x2fe628));
                    }
                  }
                }
              }
            }
          } else {
            console.log(_0x2fe628.errMsg);
          }
        }
      } catch (_0x1b44c2) {
        $.logErr(_0x1b44c2, _0x485da8);
      } finally {
        _0x2a4026(_0x2fe628);
      }
    });
  });
}

async function _0x4332d8(_0x542cb6) {
  let _0x204cde = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x542cb6.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x542cb6.poolBaseId + ",\"prizeGroupId\":" + _0x542cb6.prizeGroupId + ",\"prizeBaseId\":" + _0x542cb6.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  return new Promise(async _0x40941a => {
    $.post(_0x2baf23(_0x204cde), async (_0x3f99e6, _0x739e62, _0x14a0ad) => {
      try {
        if (_0x3f99e6) {
          console.log("" + JSON.stringify(_0x3f99e6));
          console.log("apCashWithDraw请求失败，请检查网路重试");
        } else {
          _0x14a0ad = JSON.parse(_0x14a0ad);

          if (_0x14a0ad.code == 0) {
            if (_0x14a0ad.data.message.indexOf("提现") > -1) {
              process.stdout.write("✅ ");
              $.txfail = false;
            } else {
              if (_0x14a0ad.data.message.includes("上限")) {
                $.txfull = true;
              } else {
                _0x14a0ad.data.message.includes("待发放") ? (process.stdout.write("❎"), $.txfail = true) : console.log(_0x14a0ad.data.message);
              }
            }
          } else {
            console.log(_0x14a0ad.errMsg);
          }
        }
      } catch (_0x437236) {
        $.logErr(_0x437236, _0x739e62);
      } finally {
        _0x40941a(_0x14a0ad);
      }
    });
  });
}

function _0x205374(_0xb65039) {
  let _0x19f64f = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0xb65039.id + ",\"business\":\"fission\",\"poolId\":" + _0xb65039.poolBaseId + ",\"prizeGroupId\":" + _0xb65039.prizeGroupId + ",\"prizeId\":" + _0xb65039.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  const _0x196e95 = {
    "Host": "api.m.jd.com",
    "Origin": "https://prodev.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "Cookie": _0x1860d8
  };
  const _0x4e1b25 = {
    "url": "https://api.m.jd.com/api",
    "body": _0x19f64f,
    "headers": _0x196e95
  };
  return new Promise(async _0x564ff4 => {
    $.post(_0x4e1b25, async (_0xd4e170, _0x183e49, _0x222386) => {
      try {
        _0xd4e170 ? (console.log("" + JSON.stringify(_0xd4e170)), console.log("apRecompenseDrawPrize 请求失败，请检查网路重试")) : (_0x222386 = JSON.parse(_0x222386), _0x222386.code == 0 ? _0x222386.data.resCode === "0" ? process.stdout.write("🧧 ") : console.log("兑换失败") : console.log(_0x222386.errMsg));
      } catch (_0x192c3f) {
        $.logErr(_0x192c3f, _0x183e49);
      } finally {
        _0x564ff4(_0x222386);
      }
    });
  });
}

function _0x2baf23(_0x13cdd0) {
  const _0x5ce217 = {
    "Host": "api.m.jd.com",
    "Origin": "https://prodev.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "Cookie": _0x1860d8
  };
  const _0x188963 = {
    "url": "https://api.m.jd.com/?" + _0x13cdd0,
    "headers": _0x5ce217
  };
  return _0x188963;
}

function _0x21ece6() {
  return new Promise(_0x10936d => {
    const _0x1ab2db = {
      "Cookie": _0x1860d8,
      "referer": "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x36abf2 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": _0x1ab2db,
      "timeout": 10000
    };
    $.get(_0x36abf2, (_0x172efb, _0x5b2609, _0x2cca6d) => {
      try {
        if (_0x2cca6d) {
          _0x2cca6d = JSON.parse(_0x2cca6d);

          if (!(_0x2cca6d.islogin === "1")) {
            _0x2cca6d.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x4b78f3) {
        console.log(_0x4b78f3);
      } finally {
        _0x10936d();
      }
    });
  });
}

function _0x584618() {
  return new Promise(_0x2d9bed => {
    !_0x1b052a ? $.msg($.name, "", "" + _0x50ee4d) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x50ee4d);

    _0x2d9bed();
  });
}

function _0x1d69c8(_0x40638a) {
  try {
    if (typeof JSON.parse(_0x40638a) == "object") {
      return true;
    }
  } catch (_0x3cdea4) {
    console.log(_0x3cdea4);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}

function _0x187d52(_0x1a0372) {
  const _0x1f4ea8 = _0x1a0372.getFullYear(),
        _0x23a347 = ("0" + (_0x1a0372.getMonth() + 1)).slice(-2),
        _0x5cc75d = ("0" + _0x1a0372.getDate()).slice(-2),
        _0x21c0be = ("0" + _0x1a0372.getHours()).slice(-2),
        _0x2b1c58 = ("0" + _0x1a0372.getMinutes()).slice(-2),
        _0x36ec46 = ("0" + _0x1a0372.getSeconds()).slice(-2);

  return _0x1f4ea8 + "/" + _0x23a347 + "/" + _0x5cc75d + " " + _0x21c0be + ":" + _0x2b1c58 + ":" + _0x36ec46;
}

function _0x56aafc(_0x5049c2) {
  if (typeof _0x5049c2 == "string") {
    try {
      return JSON.parse(_0x5049c2);
    } catch (_0x51979c) {
      console.log(_0x51979c);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}

function _0x1d13a2(_0x4602eb) {
  const _0x2387b5 = {
    "Content-Type": "application/json"
  };
  let _0x8a5789 = {
    "url": "http://123.57.164.4:8080/cxj",
    "body": JSON.stringify(_0x4602eb),
    "headers": _0x2387b5,
    "timeout": 10000
  },
      _0x529db6 = "";
  return new Promise(_0x34f007 => {
    $.post(_0x8a5789, (_0xc4746b, _0x1ddae0, _0xa56069) => {
      try {
        _0xc4746b ? console.log("连接失败") : (_0xa56069 = JSON.parse(_0xa56069), _0xa56069.code == 200 ? _0x529db6 = _0xa56069.data : $.log(_0xa56069.msg));
      } catch (_0x21d809) {
        console.log(_0x21d809, _0x1ddae0);
      } finally {
        _0x34f007(_0x529db6);
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }