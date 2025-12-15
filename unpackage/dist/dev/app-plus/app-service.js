if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$8 = {
    data() {
      return {};
    },
    onShow() {
      uni.redirectTo({
        url: "/pages/login/index",
        success: () => plus.navigator.closeSplashscreen()
      });
    },
    methods: {}
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" });
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/index/index.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        type: "mobile"
        // 登录类型，默认为手机号登录，可选值：'mobile'（手机号登录）、'email'（邮箱登录）
      };
    },
    onShow() {
      plus.navigator.closeSplashscreen();
    },
    methods: {
      goToRegister() {
        uni.navigateTo({
          url: "/pages/register/index"
        });
      },
      goToForgot() {
        uni.navigateTo({
          url: "/pages/forgot/index"
        });
      },
      goToHome() {
        uni.switchTab({
          url: "/pages/home/index"
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-page" }, [
      vue.createElementVNode("view", { class: "login-card" }, [
        vue.createElementVNode("text", { class: "title" }, "Hello!"),
        vue.createElementVNode("view", { class: "subtitle" }, "Welcome back to danke!"),
        $data.type === "mobile" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "phone-group"
        }, [
          vue.createElementVNode("view", { class: "country-code" }, "+86"),
          vue.createElementVNode("input", {
            type: "tel",
            class: "phone-input",
            placeholder: "Mobile number"
          })
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "email-group"
        }, [
          vue.createElementVNode("input", {
            type: "email",
            class: "email-input",
            placeholder: "Email address"
          })
        ])),
        vue.createElementVNode("input", {
          type: "password",
          class: "password-input",
          placeholder: "Password"
        }),
        vue.createElementVNode("view", { class: "agreement-row" }, [
          vue.createElementVNode("view", { class: "checkbox" }),
          vue.createElementVNode("text", null, [
            vue.createTextVNode("I have read the "),
            vue.createElementVNode("text", { class: "color-white" }, "user agreement"),
            vue.createTextVNode(" and I accept it")
          ])
        ]),
        vue.createElementVNode("button", {
          class: "login-btn",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goToHome && $options.goToHome(...args))
        }, "Log in"),
        vue.createElementVNode("view", { class: "link-row" }, [
          vue.createElementVNode("text", {
            class: "color-white",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.goToRegister && $options.goToRegister(...args))
          }, "Create new account"),
          vue.createElementVNode("text", null, "|"),
          vue.createElementVNode("text", {
            onClick: _cache[2] || (_cache[2] = (...args) => $options.goToForgot && $options.goToForgot(...args))
          }, "Forgot password")
        ]),
        vue.createElementVNode(
          "text",
          {
            class: "login-type-link",
            onClick: _cache[3] || (_cache[3] = ($event) => $data.type = $data.type === "mobile" ? "email" : "mobile")
          },
          " Log in with " + vue.toDisplayString($data.type === "mobile" ? "Email" : "Mobile"),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-d08ef7d4"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/login/index.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        type: "mobile"
        // 登录类型，默认为手机号登录，可选值：'phone'（手机号登录）、'email'（邮箱登录）
      };
    },
    onLoad() {
    },
    methods: {
      goToLogin() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "cotent-card" }, [
        vue.createElementVNode("text", { class: "title" }, "Sign up"),
        vue.createElementVNode("view", { class: "subtitle" }, "Please to register on account"),
        $data.type === "mobile" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "phone-group"
        }, [
          vue.createElementVNode("view", { class: "country-code" }, "+86"),
          vue.createElementVNode("input", {
            type: "tel",
            class: "phone-input",
            placeholder: "Mobile number"
          })
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "email-group"
        }, [
          vue.createElementVNode("input", {
            type: "email",
            class: "email-input",
            placeholder: "Email address"
          })
        ])),
        vue.createElementVNode("view", { class: "verification-group" }, [
          vue.createElementVNode("input", {
            type: "text",
            placeholder: "Verification code"
          }),
          vue.createElementVNode("view", null, "sent code")
        ]),
        vue.createElementVNode("input", {
          type: "password",
          class: "password-input",
          placeholder: "Password"
        }),
        vue.createElementVNode("view", { class: "agreement-row" }, [
          vue.createElementVNode("view", { class: "checkbox" }),
          vue.createElementVNode("text", null, [
            vue.createTextVNode("I have read the "),
            vue.createElementVNode("text", { class: "color-white" }, "user agreement"),
            vue.createTextVNode(" and I accept it")
          ])
        ]),
        vue.createElementVNode("button", { class: "submit-btn" }, "Create new account"),
        vue.createElementVNode("view", { class: "link-row" }, [
          vue.createElementVNode(
            "text",
            {
              class: "color-white",
              onClick: _cache[0] || (_cache[0] = ($event) => $data.type = $data.type === "mobile" ? "email" : "mobile")
            },
            " Register with " + vue.toDisplayString($data.type === "mobile" ? "Email" : "Mobile"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", null, "|"),
          vue.createElementVNode("text", {
            onClick: _cache[1] || (_cache[1] = (...args) => $options.goToLogin && $options.goToLogin(...args))
          }, "Log in")
        ])
      ])
    ]);
  }
  const PagesRegisterIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-46a64346"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/register/index.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        type: "mobile"
        // 登录类型，默认为手机号登录，可选值：'phone'（手机号登录）、'email'（邮箱登录）
      };
    },
    onLoad() {
    },
    methods: {
      goToLogin() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "cotent-card" }, [
        vue.createElementVNode("text", { class: "title" }, "Forgot password"),
        vue.createElementVNode("view", { class: "subtitle" }, "Please change your password"),
        $data.type === "mobile" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "phone-group"
        }, [
          vue.createElementVNode("view", { class: "country-code" }, "+86"),
          vue.createElementVNode("input", {
            type: "tel",
            class: "phone-input",
            placeholder: "Mobile number"
          })
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "email-group"
        }, [
          vue.createElementVNode("input", {
            type: "email",
            class: "email-input",
            placeholder: "Email address"
          })
        ])),
        vue.createElementVNode("view", { class: "verification-group" }, [
          vue.createElementVNode("input", {
            type: "text",
            placeholder: "Verification code"
          }),
          vue.createElementVNode("view", null, "sent code")
        ]),
        vue.createElementVNode("input", {
          type: "password",
          class: "password-input",
          placeholder: "New password"
        }),
        vue.createElementVNode("view", { class: "agreement-row" }, [
          vue.createElementVNode("view", { class: "checkbox" }),
          vue.createElementVNode("text", null, [
            vue.createTextVNode("I have read the "),
            vue.createElementVNode("text", { class: "color-white" }, "user agreement"),
            vue.createTextVNode(" and I accept it")
          ])
        ]),
        vue.createElementVNode("button", { class: "submit-btn" }, "Reset"),
        vue.createElementVNode("view", { class: "link-row" }, [
          vue.createElementVNode(
            "text",
            {
              class: "color-white",
              onClick: _cache[0] || (_cache[0] = ($event) => $data.type = $data.type === "mobile" ? "email" : "mobile")
            },
            " Register with " + vue.toDisplayString($data.type === "mobile" ? "Email" : "Mobile"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", null, "|"),
          vue.createElementVNode("text", {
            onClick: _cache[1] || (_cache[1] = (...args) => $options.goToLogin && $options.goToLogin(...args))
          }, "Log in")
        ])
      ])
    ]);
  }
  const PagesForgotIndex = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-ec6901be"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/forgot/index.vue"]]);
  const _imports_0 = "/static/img/icon_photo.webp";
  const _imports_1 = "/static/img/img_banner.webp";
  const _sfc_main$4 = {
    data() {
      return {};
    },
    onLoad() {
    },
    onShow() {
      plus.navigator.closeSplashscreen();
    },
    methods: {
      toTest() {
        uni.navigateTo({
          url: "/pages/test/index"
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", { class: "hst" }, [
          vue.createElementVNode("view", { class: "title" }, "Mining progress"),
          vue.createElementVNode("view", { class: "number" }, [
            vue.createElementVNode("text", { class: "value" }, "8888.00010"),
            vue.createElementVNode("text", { class: "unit" }, "HST")
          ])
        ]),
        vue.createElementVNode("view", { class: "user-head" }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "aspectFill"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "poster" }, [
        vue.createElementVNode("swiper", {
          class: "swiper",
          circular: "",
          "indicator-dots": true,
          autoplay: true,
          interval: 3e3,
          duration: 500
        }, [
          vue.createElementVNode("swiper-item", null, [
            vue.createElementVNode("image", {
              src: _imports_1,
              style: { "height": "100%", "width": "100%" }
            })
          ]),
          vue.createElementVNode("swiper-item", null, [
            vue.createElementVNode("image", {
              src: _imports_1,
              style: { "height": "100%", "width": "100%" }
            })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", {
          class: "item item-bg-ecg",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.toTest && $options.toTest(...args))
        }, [
          vue.createElementVNode("view", { class: "title" }, "ECG"),
          vue.createElementVNode("view", { class: "sub-title" }, "Measure ECG"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#6E67E2" }
          }, "Record")
        ]),
        vue.createElementVNode("view", { class: "item item-bg-heartrate" }, [
          vue.createElementVNode("view", { class: "title" }, "Heart rate"),
          vue.createElementVNode("view", { class: "sub-title" }, "Focus on heart health"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#EE7A95" }
          }, "Detect")
        ])
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "item item-bg-bloodoxygen" }, [
          vue.createElementVNode("view", { class: "title" }, "Blood oxygen"),
          vue.createElementVNode("view", { class: "sub-title" }, "Detection and protection"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#FF7E3F" }
          }, "Detect")
        ]),
        vue.createElementVNode("view", { class: "item item-bg-bloodpressure" }, [
          vue.createElementVNode("view", { class: "title" }, "Blood pressure"),
          vue.createElementVNode("view", { class: "sub-title" }, "Measure blood pressure"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#449AF6" }
          }, "Detect")
        ])
      ])
    ]);
  }
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-4978fed5"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/home/index.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {};
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", { class: "title" }, "Report list"),
        vue.createElementVNode("view", { class: "sub-title" }, "Track test results and analyze data")
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", { class: "item item-bg-ecg" }, [
          vue.createElementVNode("view", { class: "title" }, "Electrocardiogram"),
          vue.createElementVNode("view", { class: "sub-title" }, "Record physical changes"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#6E67E2" }
          }, "Record")
        ]),
        vue.createElementVNode("view", { class: "item item-bg-heartrate" }, [
          vue.createElementVNode("view", { class: "title" }, "Heart rate"),
          vue.createElementVNode("view", { class: "sub-title" }, "Focus on heart health"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#EE7A95" }
          }, "Record")
        ]),
        vue.createElementVNode("view", { class: "item item-bg-bloodoxygen" }, [
          vue.createElementVNode("view", { class: "title" }, "Blood oxygen"),
          vue.createElementVNode("view", { class: "sub-title" }, "Detection and protection"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#FF7E3F" }
          }, "Detect")
        ]),
        vue.createElementVNode("view", { class: "item item-bg-bloodpressure" }, [
          vue.createElementVNode("view", { class: "title" }, "Blood pressure"),
          vue.createElementVNode("view", { class: "sub-title" }, "Measure blood pressure"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#449AF6" }
          }, "Detect")
        ])
      ])
    ]);
  }
  const PagesReportIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-14542b8b"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/report/index.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    onLoad() {
      plus.navigator.closeSplashscreen();
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode("view", { class: "user-head" }, [
            vue.createElementVNode("image", {
              src: _imports_0,
              mode: "aspectFill",
              style: { "width": "100%", "height": "100%" }
            })
          ]),
          vue.createElementVNode("view", { class: "user-name" }, "Peppertones")
        ]),
        vue.createElementVNode("view", { class: "more" })
      ]),
      vue.createElementVNode("view", { class: "points" }, [
        vue.createElementVNode("view", { class: "total-points" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "title-text" }, "Total Points"),
            vue.createElementVNode("text", { class: "title-records" }, "Records")
          ]),
          vue.createElementVNode("view", { class: "body" }, [
            vue.createElementVNode("view", { class: "number" }, "3589"),
            vue.createElementVNode("view", { class: "tips" }, "Points can be withdrawn to wallet"),
            vue.createElementVNode("view", { class: "withdraw" }, "Go to withdraw")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "wallet-block" }, [
        vue.createElementVNode("view", { class: "wallet" }, [
          vue.createElementVNode("view", { class: "title" }, "Wallet"),
          vue.createElementVNode("view", { class: "body" }, [
            vue.createElementVNode("text", { class: "unit" }, "$"),
            vue.createElementVNode("text", { class: "number" }, "200.00"),
            vue.createElementVNode("text", { class: "unit" }, "HST"),
            vue.createElementVNode("view", { class: "go" })
          ])
        ]),
        vue.createElementVNode("view", { class: "address" }, [
          vue.createElementVNode("view", { class: "title" }, "Wallet Address"),
          vue.createElementVNode("view", { class: "go" })
        ])
      ]),
      vue.createElementVNode("view", { class: "setting-title" }, "Setting"),
      vue.createElementVNode("view", { class: "setting" }, [
        vue.createElementVNode("view", { class: "setting-body" }, [
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("text", { class: "text icon_smartdevice" }, "Smart device")
          ]),
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("text", { class: "text icon_appvesion" }, "APP vesion")
          ]),
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("text", { class: "text icon_language" }, "language")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "logout" }, [
        vue.createElementVNode("view", { class: "button" }, "logout")
      ])
    ]);
  }
  const PagesMeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-c8e26b33"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/me/index.vue"]]);
  const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni;
  const name = "watchSdk";
  const moduleName = "watch-sdk";
  const moduleType = "";
  const errMsg = ``;
  const is_uni_modules = true;
  const pkg = /* @__PURE__ */ initUTSPackageName(name, is_uni_modules);
  const cls = /* @__PURE__ */ initUTSIndexClassName(name, is_uni_modules);
  const fitInit = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "fitInitByJs", keepAlive: false, params: [], return: "" });
  const onEvent = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "onEventByJs", keepAlive: false, params: [{ "name": "callback", "type": "UTSCallback" }], return: "" });
  const startScan = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "startScanByJs", keepAlive: false, params: [], return: "" });
  const connect = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "connectByJs", keepAlive: false, params: [{ "name": "deviceId", "type": "string" }], return: "" });
  const bind = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "bindByJs", keepAlive: false, params: [{ "name": "userId", "type": "string" }], return: "" });
  const unbind = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "unbindByJs", keepAlive: false, params: [], return: "" });
  const syncData = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "syncDataByJs", keepAlive: false, params: [], return: "" });
  const startMeasure = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "startMeasureByJs", keepAlive: false, params: [{ "name": "type", "type": "string" }, { "name": "interval", "type": "UInt8" }, { "name": "minutes", "type": "UInt8" }], return: "" });
  const stopMeasure = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "stopMeasureByJs", keepAlive: false, params: [], return: "" });
  const getAllConfig = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "getAllConfigByJs", keepAlive: false, params: [], return: "" });
  const _sfc_main$1 = {
    data() {
      return {
        devices: {},
        logList: []
      };
    },
    onLoad() {
      fitInit();
      onEvent((type, data) => {
        if (type === "onPeripheralDiscovered") {
          this.devices = {
            ...this.devices,
            [data.deviceId]: data.deviceName
          };
        }
        if (type === "onPeripheralConnectedNotification") {
          uni.showModal({
            content: "连接成功"
          });
        }
        if (type === "onPeripherialConnectFailureNotification") {
          uni.showModal({
            content: data.msg || "连接失败（-3）"
          });
        }
        if (type === "onLogMessage") {
          return;
        }
        this.logList.unshift({ type, data });
      });
    },
    methods: {
      start() {
        startScan();
      },
      list() {
        return Object.keys({
          ...this.devices
        });
      },
      connectDevice(id) {
        connect(id);
      },
      bindUser() {
        bind("1000");
      },
      unbindUser() {
        unbind();
      },
      clickSyncData() {
        syncData();
      },
      clickStartMeasure(type) {
        startMeasure(type, 50, 1);
      },
      clickStopMeasure() {
        stopMeasure();
      },
      clickConfig() {
        this.logList.unshift({
          type: "config",
          data: getAllConfig()
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", null, [
        vue.createElementVNode("text", {
          class: "title",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.start())
        }, "[ 扫描 ]")
      ]),
      vue.createElementVNode("view", null, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.list(), (key) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              onClick: ($event) => $options.connectDevice(key),
              style: { "line-height": "32px", "margin-bottom": "8px", "border": "1px solid #333" }
            }, vue.toDisplayString($data.devices[key]), 9, ["onClick"]);
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("button", {
        onClick: _cache[1] || (_cache[1] = (...args) => $options.bindUser && $options.bindUser(...args))
      }, "绑定"),
      vue.createElementVNode("button", {
        onClick: _cache[2] || (_cache[2] = (...args) => $options.unbindUser && $options.unbindUser(...args))
      }, "解绑"),
      vue.createElementVNode("button", {
        onClick: _cache[3] || (_cache[3] = (...args) => $options.clickSyncData && $options.clickSyncData(...args))
      }, "【同步】"),
      vue.createElementVNode("button", {
        onClick: _cache[4] || (_cache[4] = ($event) => $options.clickStartMeasure("ecg"))
      }, "心电图"),
      vue.createElementVNode("button", {
        onClick: _cache[5] || (_cache[5] = ($event) => $options.clickStartMeasure("heartRate"))
      }, "心率"),
      vue.createElementVNode("button", {
        onClick: _cache[6] || (_cache[6] = ($event) => $options.clickStartMeasure("bloodPressure"))
      }, "血压"),
      vue.createElementVNode("button", {
        onClick: _cache[7] || (_cache[7] = ($event) => $options.clickStartMeasure("bloodOxygen"))
      }, "血氧"),
      vue.createElementVNode("button", {
        onClick: _cache[8] || (_cache[8] = ($event) => $options.clickStartMeasure("respiratoryRate"))
      }, "呼吸率"),
      vue.createElementVNode("button", {
        onClick: _cache[9] || (_cache[9] = (...args) => $options.clickStopMeasure && $options.clickStopMeasure(...args))
      }, "【停止测量】"),
      vue.createElementVNode("button", {
        onClick: _cache[10] || (_cache[10] = (...args) => $options.clickConfig && $options.clickConfig(...args))
      }, "【获取配置】"),
      vue.createElementVNode("view", { style: { "margin-top": "16px" } }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.logList, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", { style: { "margin-bottom": "8px" } }, [
              vue.createElementVNode(
                "view",
                { style: { "font-weight": "bold" } },
                vue.toDisplayString(item.type),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString(JSON.stringify(item.data)),
                1
                /* TEXT */
              )
            ]);
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesTestIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/bruce-mac/ios-watch-app/pages/test/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/index", PagesLoginIndex);
  __definePage("pages/register/index", PagesRegisterIndex);
  __definePage("pages/forgot/index", PagesForgotIndex);
  __definePage("pages/home/index", PagesHomeIndex);
  __definePage("pages/report/index", PagesReportIndex);
  __definePage("pages/me/index", PagesMeIndex);
  __definePage("pages/test/index", PagesTestIndex);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/bruce-mac/ios-watch-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
