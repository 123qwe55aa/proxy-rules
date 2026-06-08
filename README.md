# Proxy Rules

Shadowrocket modular proxy rules configuration.
**loader + 遠程規則文件** 架構。

## 結構

```
default.conf          ← loader，只做導入，不改
private.list          ← 內網 / Tailscale，永遠 DIRECT
direct.list           ← 國內 / Apple / 直連服務
proxy.list            ← 海外 / 代理服務
reject.list           ← 廣告 / 追蹤 / REJECT
```

## 規則優先級

1. **private.list** — 保護內網、Tailscale、VPS
2. **reject.list** — 先擋廣告追蹤
3. **direct.list** — 明確直連
4. **proxy.list** — 明確代理
5. **GEOIP,CN,DIRECT** — 國內兜底
6. **FINAL,PROXY** — 其他全部出海

## 導入

Shadowrocket → 配置 → 從 URL 導入：

```
https://proxy-rules.tobyrunninglgc.workers.dev/default.conf
```

以後只改 rules/*.list，default.conf 不動。

## 更新

修改 rules → 部署 Worker → Shadowrocket 刷新配置。
