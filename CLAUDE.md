# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
(**AI Agent 你回复问题时,必须使用中文汉字输出**)

## 介绍
本项目为一个手表控制app，使用uniapp作为ios的开发技术栈

## 注意
@apis/*Api.js中的token，会自动写入，不需要手动处理

## 颜色规范
背景：色值 111217
登录浅：色值 272935
渐变色：38FFA7 - 45F6FF
橙色：色值 FF8640
字体颜色：色值 FFFFFF
填写默认字体颜色：色值 7D7E83
渐变色上字体 / 黑色主：色值 1C1F2A
说明小字颜色：色值 60626A
蓝文字：色值 27BDC1
灰线条：色值 EAEAEA
蓝文字（补充）：色值 44F6FB

## 代码风格
用最尽可能少的代码，完成功能的实现。
不要过度设计，不要拆分过多的方法
尽可能使用async/await,而不是Promis.then
修复时不需要加修复备注
**不要过度防御，不要使用try catch**
**用最少的代码完成任务**
**用最简洁的代码完成任务**
**用最清晰的代码完成任务**