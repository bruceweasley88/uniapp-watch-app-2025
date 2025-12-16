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
  const _sfc_main$e = {
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
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" });
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/index/index.vue"]]);
  const _sfc_main$d = {
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
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-page" }, [
      vue.createElementVNode("view", { class: "login-card" }, [
        vue.createElementVNode("text", { class: "title" }, "Hello!"),
        vue.createElementVNode("view", { class: "subtitle" }, "Welcome back to danke!"),
        $data.type === "mobile" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "phone-group"
        }, [
          vue.createElementVNode("view", { class: "country-code click-active" }, "+86"),
          vue.createElementVNode("input", {
            type: "tel",
            class: "phone-input click-active",
            placeholder: "Mobile number"
          })
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "email-group click-active"
        }, [
          vue.createElementVNode("input", {
            type: "email",
            class: "email-input",
            placeholder: "Email address"
          })
        ])),
        vue.createElementVNode("input", {
          type: "password",
          class: "password-input click-active",
          placeholder: "Password"
        }),
        vue.createElementVNode("view", { class: "agreement-row" }, [
          vue.createElementVNode("view", { class: "checkbox selected click-active-max" }),
          vue.createElementVNode("text", null, [
            vue.createTextVNode("I have read the "),
            vue.createElementVNode("text", { class: "color-white" }, "user agreement"),
            vue.createTextVNode(" and I accept it")
          ])
        ]),
        vue.createElementVNode("button", {
          class: "login-btn click-active",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goToHome && $options.goToHome(...args))
        }, "Log in"),
        vue.createElementVNode("view", { class: "link-row" }, [
          vue.createElementVNode("text", {
            class: "color-white click-active",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.goToRegister && $options.goToRegister(...args))
          }, "Create new account"),
          vue.createElementVNode("text", null, "|"),
          vue.createElementVNode("text", {
            class: "click-active",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.goToForgot && $options.goToForgot(...args))
          }, "Forgot password")
        ]),
        vue.createElementVNode(
          "text",
          {
            class: "login-type-link click-active",
            onClick: _cache[3] || (_cache[3] = ($event) => $data.type = $data.type === "mobile" ? "email" : "mobile")
          },
          " Log in with " + vue.toDisplayString($data.type === "mobile" ? "Email" : "Mobile"),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-d08ef7d4"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/login/index.vue"]]);
  const _sfc_main$c = {
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "cotent-card" }, [
        vue.createElementVNode("text", { class: "title" }, "Sign up"),
        vue.createElementVNode("view", { class: "subtitle" }, "Please to register on account"),
        $data.type === "mobile" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "phone-group"
        }, [
          vue.createElementVNode("view", { class: "country-code click-active" }, "+86"),
          vue.createElementVNode("input", {
            type: "tel",
            class: "phone-input click-active",
            placeholder: "Mobile number"
          })
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "email-group click-active"
        }, [
          vue.createElementVNode("input", {
            type: "email",
            class: "email-input",
            placeholder: "Email address"
          })
        ])),
        vue.createElementVNode("view", { class: "verification-group click-active" }, [
          vue.createElementVNode("input", {
            type: "text",
            placeholder: "Verification code"
          }),
          vue.createElementVNode("view", { class: "click-active" }, "sent code")
        ]),
        vue.createElementVNode("input", {
          type: "password",
          class: "password-input click-active",
          placeholder: "Password"
        }),
        vue.createElementVNode("view", { class: "agreement-row" }, [
          vue.createElementVNode("view", { class: "checkbox click-active" }),
          vue.createElementVNode("text", null, [
            vue.createTextVNode("I have read the "),
            vue.createElementVNode("text", { class: "color-white" }, "user agreement"),
            vue.createTextVNode(" and I accept it")
          ])
        ]),
        vue.createElementVNode("button", { class: "submit-btn click-active" }, "Create new account"),
        vue.createElementVNode("view", { class: "link-row" }, [
          vue.createElementVNode(
            "text",
            {
              class: "color-white click-active",
              onClick: _cache[0] || (_cache[0] = ($event) => $data.type = $data.type === "mobile" ? "email" : "mobile")
            },
            " Register with " + vue.toDisplayString($data.type === "mobile" ? "Email" : "Mobile"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", null, "|"),
          vue.createElementVNode("text", {
            class: "click-active",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.goToLogin && $options.goToLogin(...args))
          }, "Log in")
        ])
      ])
    ]);
  }
  const PagesRegisterIndex = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-46a64346"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/register/index.vue"]]);
  const _sfc_main$b = {
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "cotent-card" }, [
        vue.createElementVNode("text", { class: "title" }, "Forgot password"),
        vue.createElementVNode("view", { class: "subtitle" }, "Please change your password"),
        $data.type === "mobile" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "phone-group"
        }, [
          vue.createElementVNode("view", { class: "country-code click-active" }, "+86"),
          vue.createElementVNode("input", {
            type: "tel",
            class: "phone-input click-active",
            placeholder: "Mobile number"
          })
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "email-group click-active"
        }, [
          vue.createElementVNode("input", {
            type: "email",
            class: "email-input",
            placeholder: "Email address"
          })
        ])),
        vue.createElementVNode("view", { class: "verification-group click-active" }, [
          vue.createElementVNode("input", {
            type: "text",
            placeholder: "Verification code"
          }),
          vue.createElementVNode("view", { class: "click-active" }, "sent code")
        ]),
        vue.createElementVNode("input", {
          type: "password",
          class: "password-input click-active",
          placeholder: "New password"
        }),
        vue.createElementVNode("view", { class: "agreement-row" }, [
          vue.createElementVNode("view", { class: "checkbox click-active" }),
          vue.createElementVNode("text", null, [
            vue.createTextVNode("I have read the "),
            vue.createElementVNode("text", { class: "color-white" }, "user agreement"),
            vue.createTextVNode(" and I accept it")
          ])
        ]),
        vue.createElementVNode("button", { class: "submit-btn click-active" }, "Reset"),
        vue.createElementVNode("view", { class: "link-row" }, [
          vue.createElementVNode(
            "text",
            {
              class: "color-white click-active",
              onClick: _cache[0] || (_cache[0] = ($event) => $data.type = $data.type === "mobile" ? "email" : "mobile")
            },
            " Register with " + vue.toDisplayString($data.type === "mobile" ? "Email" : "Mobile"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", null, "|"),
          vue.createElementVNode("text", {
            class: "click-active",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.goToLogin && $options.goToLogin(...args))
          }, "Log in")
        ])
      ])
    ]);
  }
  const PagesForgotIndex = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-ec6901be"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/forgot/index.vue"]]);
  const _sfc_main$a = {
    name: "AlertPopup",
    props: {
      // 弹窗显隐状态
      visible: {
        type: Boolean,
        default: false
      },
      // 顶部图片（参数）
      topImage: {
        type: String,
        required: true
      },
      // 标题文字
      title: {
        type: String,
        default: ""
      },
      // 正文内容
      content: {
        type: String,
        default: ""
      },
      // 按钮文字（参数）
      buttonText: {
        type: String,
        default: "OK"
      }
    },
    methods: {
      handleOk() {
        this.$emit("ok");
        this.$emit("update:visible", false);
      },
      handleOverlayClick() {
        this.$emit("ok");
        this.$emit("update:visible", false);
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.visible ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        onClick: _cache[2] || (_cache[2] = (...args) => $options.handleOverlayClick && $options.handleOverlayClick(...args)),
        onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
        }, ["stop", "prevent"])),
        class: "popup-overlay"
      },
      [
        vue.createElementVNode("view", {
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"])),
          class: "popup-container"
        }, [
          vue.createElementVNode("image", {
            class: "popup-top-img",
            src: $props.topImage,
            mode: "widthFix"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "popup-title" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($props.title),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "popup-content" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($props.content),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", {
            class: "popup-button click-active",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.handleOk && $options.handleOk(...args))
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($props.buttonText),
              1
              /* TEXT */
            )
          ])
        ])
      ],
      32
      /* NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const AlertPopup = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-d189285d"], ["__file", "/Users/bruce-mac/ios-watch-app/components/alert-popup.vue"]]);
  const _imports_0$5 = "/static/img/icon_photo.webp";
  const _imports_1$2 = "/static/img/img_banner.webp";
  const _sfc_main$9 = {
    components: {
      AlertPopup
    },
    data() {
      return {
        alertProfile: true
      };
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
      },
      handleStartDetection() {
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_alert_popup = vue.resolveComponent("alert-popup");
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
            src: _imports_0$5,
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
              src: _imports_1$2,
              style: { "height": "100%", "width": "100%" }
            })
          ]),
          vue.createElementVNode("swiper-item", null, [
            vue.createElementVNode("image", {
              src: _imports_1$2,
              style: { "height": "100%", "width": "100%" }
            })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", {
          class: "item item-bg-ecg click-active",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.toTest && $options.toTest(...args))
        }, [
          vue.createElementVNode("view", { class: "title" }, "ECG"),
          vue.createElementVNode("view", { class: "sub-title" }, "Measure ECG"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#6E67E2" }
          }, "Record")
        ]),
        vue.createElementVNode("view", {
          class: "item item-bg-heartrate click-active",
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.toBindding && _ctx.toBindding(...args))
        }, [
          vue.createElementVNode("view", { class: "title" }, "Heart rate"),
          vue.createElementVNode("view", { class: "sub-title" }, "Focus on heart health"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#EE7A95" }
          }, "Detect")
        ])
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "item item-bg-bloodoxygen click-active" }, [
          vue.createElementVNode("view", { class: "title" }, "Blood oxygen"),
          vue.createElementVNode("view", { class: "sub-title" }, "Detection and protection"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#FF7E3F" }
          }, "Detect")
        ]),
        vue.createElementVNode("view", { class: "item item-bg-bloodpressure click-active" }, [
          vue.createElementVNode("view", { class: "title" }, "Blood pressure"),
          vue.createElementVNode("view", { class: "sub-title" }, "Measure blood pressure"),
          vue.createElementVNode("view", {
            class: "button",
            style: { "color": "#449AF6" }
          }, "Detect")
        ])
      ]),
      vue.createVNode(_component_alert_popup, {
        visible: $data.alertProfile,
        "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => $data.alertProfile = $event),
        topImage: "/static/img/icon_personal.webp",
        title: "Please fill in your height and weight",
        content: "The reference standard values ​​of the detection indicators need to be matched according to your information.",
        buttonText: "Confirm",
        onOk: $options.handleStartDetection
      }, null, 8, ["visible", "onOk"])
    ]);
  }
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-4978fed5"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/home/index.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {};
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesReportIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-14542b8b"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/report/index.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {};
    },
    onLoad() {
      plus.navigator.closeSplashscreen();
    },
    methods: {
      toDevice() {
        uni.navigateTo({
          url: "/pages/device/index"
        });
      },
      toUpgrade() {
        uni.navigateTo({
          url: "/pages/upgrade/index"
        });
      },
      toLanguage() {
        uni.navigateTo({
          url: "/pages/language/index"
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", { class: "user-info click-active" }, [
          vue.createElementVNode("view", { class: "user-head" }, [
            vue.createElementVNode("image", {
              src: _imports_0$5,
              mode: "aspectFill",
              style: { "width": "100%", "height": "100%" }
            })
          ]),
          vue.createElementVNode("view", { class: "user-name" }, "Peppertones")
        ]),
        vue.createElementVNode("view", { class: "more click-active" })
      ]),
      vue.createElementVNode("view", { class: "points" }, [
        vue.createElementVNode("view", { class: "total-points" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "title-text" }, "Total Points"),
            vue.createElementVNode("text", { class: "title-records click-active" }, "Records")
          ]),
          vue.createElementVNode("view", { class: "body" }, [
            vue.createElementVNode("view", { class: "number" }, "3589"),
            vue.createElementVNode("view", { class: "tips" }, "Points can be withdrawn to wallet"),
            vue.createElementVNode("view", { class: "withdraw click-active" }, "Go to withdraw")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "wallet-block" }, [
        vue.createElementVNode("view", { class: "wallet click-active" }, [
          vue.createElementVNode("view", { class: "title" }, "Wallet"),
          vue.createElementVNode("view", { class: "body" }, [
            vue.createElementVNode("text", { class: "unit" }, "$"),
            vue.createElementVNode("text", { class: "number" }, "200.00"),
            vue.createElementVNode("text", { class: "unit" }, "HST"),
            vue.createElementVNode("view", { class: "go" })
          ])
        ]),
        vue.createElementVNode("view", { class: "address click-active" }, [
          vue.createElementVNode("view", { class: "title" }, "Wallet Address"),
          vue.createElementVNode("view", { class: "go" })
        ])
      ]),
      vue.createElementVNode("view", { class: "setting-title" }, "Setting"),
      vue.createElementVNode("view", { class: "setting" }, [
        vue.createElementVNode("view", { class: "setting-body" }, [
          vue.createElementVNode("view", {
            class: "item click-active",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.toDevice && $options.toDevice(...args))
          }, [
            vue.createElementVNode("text", { class: "text icon_smartdevice" }, "Smart device")
          ]),
          vue.createElementVNode("view", {
            class: "item click-active",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.toUpgrade && $options.toUpgrade(...args))
          }, [
            vue.createElementVNode("text", { class: "text icon_appvesion" }, "APP vesion")
          ]),
          vue.createElementVNode("view", {
            class: "item click-active",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.toLanguage && $options.toLanguage(...args))
          }, [
            vue.createElementVNode("text", { class: "text icon_language" }, "language")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "logout" }, [
        vue.createElementVNode("view", { class: "button click-active" }, "logout")
      ])
    ]);
  }
  const PagesMeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-c8e26b33"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/me/index.vue"]]);
  const _imports_0$4 = "/static/img/icon_back.png";
  const _sfc_main$6 = {
    name: "NavBar",
    props: {
      // 标题文字
      title: {
        type: String,
        default: ""
      }
    },
    methods: {
      toBack() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "nav-bar" }, [
      vue.createElementVNode("image", {
        class: "back click-active-max",
        src: _imports_0$4,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.toBack && $options.toBack(...args))
      }),
      vue.createElementVNode(
        "text",
        { class: "title" },
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      )
    ]);
  }
  const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-a0412dee"], ["__file", "/Users/bruce-mac/ios-watch-app/components/nav-bar.vue"]]);
  const _imports_0$3 = "/static/img/img_noupdate.webp";
  const _sfc_main$5 = {
    components: {
      NavBar
    },
    data() {
      const systemInfo = uni.getSystemInfoSync();
      return {
        version: systemInfo.appWgtVersion
      };
    },
    onload() {
    },
    onShow() {
      plus.navigator.closeSplashscreen();
    },
    methods: {
      toBack() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_nav_bar = vue.resolveComponent("nav-bar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode(_component_nav_bar, { title: "Version upgrade" }),
      vue.createElementVNode("view", { class: "body" }, [
        vue.createElementVNode("image", {
          class: "image",
          src: _imports_0$3
        }),
        vue.createElementVNode("view", { class: "text" }, "This is the latest version"),
        vue.createElementVNode(
          "view",
          { class: "version" },
          "Danke V" + vue.toDisplayString($data.version),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", {
          class: "button click-active",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toBindding && _ctx.toBindding(...args))
        }, "Upgrade now"),
        vue.createElementVNode("view", {
          class: "back click-active-max",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.toBack && $options.toBack(...args))
        }, "No upgrade")
      ])
    ]);
  }
  const PagesUpgradeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-8ba8cfcb"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/upgrade/index.vue"]]);
  const _imports_0$2 = "/static/img/icon_selected.webp";
  const _sfc_main$4 = {
    components: {
      NavBar
    },
    data() {
      return {
        current: "English(General)",
        list: [
          { "icon": "/static/lang/img_chinese.webp", "name": "中文" },
          { "icon": "/static/lang/img_danish.webp", "name": "Dansk" },
          { "icon": "/static/lang/img_en.webp", "name": "English(General)" },
          { "icon": "/static/lang/img_fr.webp", "name": "Français" },
          { "icon": "/static/lang/img_gerrman.webp", "name": "Deutsch" },
          { "icon": "/static/lang/img_hk.webp", "name": "繁體中文(香港)" },
          { "icon": "/static/lang/img_jp.webp", "name": "日本語" },
          { "icon": "/static/lang/img_ko.webp", "name": "한국어" },
          { "icon": "/static/lang/img_spanish.webp", "name": "Español" },
          { "icon": "/static/lang/img_tw.webp", "name": "繁體中文(台灣)" },
          { "icon": "/static/lang/img_us.webp", "name": "English(American)" }
        ]
      };
    },
    onload() {
    },
    onShow() {
      plus.navigator.closeSplashscreen();
    },
    methods: {
      onOk() {
        this.toBack();
      },
      toBack() {
        uni.navigateBack();
      },
      isSelected(item) {
        return item.name === this.current;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_nav_bar = vue.resolveComponent("nav-bar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode(_component_nav_bar, { title: "Language switching" }),
      vue.createElementVNode(
        "view",
        {
          class: "body",
          onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["stop"]))
        },
        [
          vue.createElementVNode("view", { class: "title" }, "Language"),
          vue.createElementVNode("view", { class: "sub-title" }, "Select your system language"),
          vue.createElementVNode("view", { class: "list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.list, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
                  vue.createElementVNode("view", { class: "text" }, [
                    vue.createElementVNode("image", {
                      class: "icon",
                      src: item.icon
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass(`name ${$options.isSelected(item) ? "name-selected" : ""}`)
                      },
                      vue.toDisplayString(item.name),
                      3
                      /* TEXT, CLASS */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "operate" }, [
                    $options.isSelected(item) ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      class: "selected_icon",
                      src: _imports_0$2
                    })) : vue.createCommentVNode("v-if", true)
                  ])
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "action" }, [
            vue.createElementVNode("view", {
              class: "cancel click-active-max",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.toBack && $options.toBack(...args))
            }, "cancel"),
            vue.createElementVNode("view", { class: "m" }, "|"),
            vue.createElementVNode("view", {
              class: "ok click-active-max",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.onOk && $options.onOk(...args))
            }, "ok")
          ])
        ],
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const PagesLanguageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-a43b35b8"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/language/index.vue"]]);
  const _imports_0$1 = "/static/img/img_nodate.webp";
  const _imports_1$1 = "/static/img/icon_connect.webp";
  const _imports_2 = "/static/img/icon_noconnect.webp";
  const _imports_3 = "/static/img/icon_red.webp";
  const _imports_4 = "/static/img/icon_green.webp";
  const _sfc_main$3 = {
    components: {
      NavBar
    },
    data() {
      return {
        list: [
          { name: "Danke H1Pro-5830", time: "2024-05-12 10:12", connected: true },
          { name: "Danke H1Pro-5822", time: "2024-05-12 10:12", connected: false }
        ]
      };
    },
    onload() {
    },
    onShow() {
      plus.navigator.closeSplashscreen();
    },
    methods: {
      toBindding() {
        uni.navigateTo({
          url: "/pages/bindding/index"
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_nav_bar = vue.resolveComponent("nav-bar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode(_component_nav_bar, { title: "Smate device" }),
      $data.list.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty"
      }, [
        vue.createElementVNode("image", {
          class: "image",
          src: _imports_0$1
        }),
        vue.createElementVNode("view", { class: "text" }, "There is no paired device yet, go add it now"),
        vue.createElementVNode("view", {
          class: "button click-active",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.toBindding && $options.toBindding(...args))
        }, "Binding Device")
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.list, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
              vue.createElementVNode("view", { class: "text" }, [
                item.connected ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  class: "icon",
                  src: _imports_1$1
                })) : (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  class: "icon",
                  src: _imports_2
                })),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "view",
                    { class: "name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "time" },
                    vue.toDisplayString(item.time),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              item.connected ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "status"
              }, [
                vue.createElementVNode("image", {
                  class: "status_icon",
                  src: _imports_3
                }),
                vue.createTextVNode(" connerted ")
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "status"
              }, [
                vue.createElementVNode("image", {
                  class: "status_icon",
                  src: _imports_4
                }),
                vue.createTextVNode(" Not connected ")
              ]))
            ]);
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ]))
    ]);
  }
  const PagesDeviceIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-1d9691da"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/device/index.vue"]]);
  const _imports_0 = "/static/img/img_diffusion.webp";
  const _imports_1 = "/static/img/img_watchb.webp";
  const _sfc_main$2 = {
    components: {
      NavBar,
      AlertPopup
    },
    data() {
      return {
        currentStatus: "success"
      };
    },
    onload() {
    },
    onShow() {
      plus.navigator.closeSplashscreen();
    },
    methods: {
      handleStartDetection() {
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_nav_bar = vue.resolveComponent("nav-bar");
    const _component_alert_popup = vue.resolveComponent("alert-popup");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode(_component_nav_bar, { title: "Binding Device" }),
      $data.currentStatus === "search" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "search"
      }, [
        vue.createElementVNode("view", { class: "title" }, "Make sure Bluetooth is turned on"),
        vue.createElementVNode("image", {
          class: "image",
          src: _imports_0
        }),
        vue.createElementVNode("view", { class: "tip" }, "Searching for devices...")
      ])) : vue.createCommentVNode("v-if", true),
      $data.currentStatus === "binding" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "binding"
      }, [
        vue.createElementVNode("view", { class: "title" }, "Keep your smartwatch screen lit during binding"),
        vue.createElementVNode("image", {
          class: "image",
          src: _imports_1
        }),
        vue.createElementVNode("view", { class: "tip" }, "Binding is in progress...")
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_alert_popup, {
        visible: $data.currentStatus === "success",
        topImage: "/static/img/icon_personal.webp",
        title: "Binding successful",
        content: "Please make sure the watch is in contact with your skin and do not move it. Click the 'Start Detection' button to start the detection.",
        buttonText: "Start detection",
        onOk: $options.handleStartDetection
      }, null, 8, ["visible", "onOk"])
    ]);
  }
  const PagesBinddingIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-b7239250"], ["__file", "/Users/bruce-mac/ios-watch-app/pages/bindding/index.vue"]]);
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
  __definePage("pages/upgrade/index", PagesUpgradeIndex);
  __definePage("pages/language/index", PagesLanguageIndex);
  __definePage("pages/device/index", PagesDeviceIndex);
  __definePage("pages/bindding/index", PagesBinddingIndex);
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
      plus.navigator.closeSplashscreen();
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
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
