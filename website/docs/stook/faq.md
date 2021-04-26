---
id: faq
title: FAQ
sidebar_label: FAQ
---

## 和 Redux、Mobx 有什么区别? 可以代替他们吗？

和 Redux 相比，Stook 更简单，学习成本更低，对 TypeScript 支持更好，相同点是两者都是 immutable 的。

和 Mobx 相比， Mobx 是 mutable 的，Stook 是类 Redux 的 immutable。

Stook 和 Redux、Mobx 是解决同一个问题的不同解决方案，他们之间可以互相替代，也可以混合使用，Stook 会更灵活，因为它能即插即用。

## 支持 TypeScript 吗？

完美支持，详情请看[TypeScript](docs/stook/typescript)。

## 性能怎样？会有 "Too many re-renders"问题吗？

性能跟原始的 useState 无差别，遵循 useState 的用法，就不会有 "Too many re-renders" 问题。
