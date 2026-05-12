# 🛡️ Angular PR Guardian

[![npm version](https://badge.fury.io/js/angular-pr-guardian.svg)](https://www.npmjs.com/package/angular-pr-guardian)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/angular-pr-guardian)](https://nodejs.org/)
[![Downloads](https://img.shields.io/npm/dm/angular-pr-guardian)](https://www.npmjs.com/package/angular-pr-guardian)

**Automated Angular 20+ Migration Readiness Tool** - Scan your Angular project for deprecated APIs, performance issues, and get actionable migration recommendations.

## ✨ Features

- ✅ **20+ Migration Rules** covering Angular 20+ readiness
- ✅ **Standalone Components** detection and migration path
- ✅ **Signals** migration from RxJS BehaviorSubject
- ✅ **New Control Flow** (`@if`/`@for` vs `*ngIf`/`*ngFor`)
- ✅ **Performance Optimizations** (trackBy, OnPush detection)
- ✅ **Deprecated APIs** (toPromise, entryComponents, etc.)
- ✅ **HTTP/Router** best practices
- ✅ **Zero Configuration** - Works out of the box
- ✅ **GitHub Support** - Works with local paths AND GitHub URLs
- ✅ **Detailed Reports** with prioritized fix suggestions

## 📦 Installation

### Global Install (Recommended)
```bash
npm install -g angular-pr-guardian