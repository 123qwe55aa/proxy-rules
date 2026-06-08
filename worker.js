// Cloudflare Worker — proxy-rules
// 部署：wrangler deploy
// 參考：https://proxy-rules.tobyleons.com/default.conf

const files = {
  "/default.conf": `[General]
bypass-system = true
skip-proxy = 127.0.0.1, localhost, *.local, 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10, *.ts.net, 100.90.177.36/32
tun-excluded-routes = 10.0.0.0/8, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.88.99.0/24, 192.168.0.0/16, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 255.255.255.255/32, 239.255.255.250/32
dns-server = system
fallback-dns-server = system
ipv6 = true
prefer-ipv6 = false
icmp-auto-reply = true
private-ip-answer = true
udp-policy-not-supported-behaviour = REJECT

[Rule]
RULE-SET,https://proxy-rules.tobyleons.com/private.list,DIRECT
RULE-SET,https://proxy-rules.tobyleons.com/reject.list,REJECT
RULE-SET,https://proxy-rules.tobyleons.com/direct.list,DIRECT
RULE-SET,https://proxy-rules.tobyleons.com/proxy.list,PROXY
GEOIP,CN,DIRECT
FINAL,PROXY
`,

  "/private.list": `# private.list — 內網 / Tailscale / localhost，永遠 DIRECT
IP-CIDR,127.0.0.0/8,no-resolve
IP-CIDR,100.64.0.0/10,no-resolve
IP-CIDR,10.0.0.0/8,no-resolve
IP-CIDR,10.48.0.0/12,no-resolve
IP-CIDR,172.16.0.0/12,no-resolve
IP-CIDR,192.168.0.0/16,no-resolve
IP-CIDR,192.168.128.0/17,no-resolve
IP-CIDR,100.90.177.36/32,no-resolve
IP-CIDR,139.180.137.48/32,no-resolve
DOMAIN-SUFFIX,ts.net
DOMAIN-SUFFIX,tailscale
DOMAIN-SUFFIX,local
DOMAIN-SUFFIX,lisa-local
DOMAIN,localhost
DOMAIN,toby.local
DOMAIN,Lisa.local
`,

  "/direct.list": `# direct.list — 明確直連（國內 / Apple / 常用服務）
# Loaded by: default.conf → RULE-SET,direct.list,DIRECT

# === 自身規則域名（雞生蛋問題）===
IP-CIDR,139.180.137.48/32,no-resolve
DOMAIN,proxy-rules.tobyleons.com
DOMAIN-SUFFIX,apple.com
DOMAIN-SUFFIX,icloud.com
DOMAIN-SUFFIX,cdn-apple.com
DOMAIN-SUFFIX,aaplimg.com
DOMAIN-SUFFIX,baidu.com
DOMAIN-SUFFIX,qq.com
DOMAIN-SUFFIX,wechat.com
DOMAIN-SUFFIX,taobao.com
DOMAIN-SUFFIX,tmall.com
DOMAIN-SUFFIX,alicdn.com
DOMAIN-SUFFIX,bilibili.com
DOMAIN-SUFFIX,douyin.com
DOMAIN-SUFFIX,zhihu.com
DOMAIN-SUFFIX,weibo.com
DOMAIN-SUFFIX,jd.com
DOMAIN-SUFFIX,xiaohongshu.com
DOMAIN-SUFFIX,163.com
DOMAIN-SUFFIX,sohu.com
`,

  "/proxy.list": `# proxy.list — 明確代理（海外服務）
DOMAIN-SUFFIX,google.com
DOMAIN-SUFFIX,gstatic.com
DOMAIN-SUFFIX,googleapis.com
DOMAIN-SUFFIX,youtube.com
DOMAIN-SUFFIX,ytimg.com
DOMAIN-SUFFIX,github.com
DOMAIN-SUFFIX,githubusercontent.com
DOMAIN-SUFFIX,githubassets.com
DOMAIN-SUFFIX,github.io
DOMAIN-SUFFIX,openai.com
DOMAIN-SUFFIX,chatgpt.com
DOMAIN-SUFFIX,oaistatic.com
DOMAIN-SUFFIX,oaiusercontent.com
DOMAIN-SUFFIX,anthropic.com
DOMAIN-SUFFIX,claude.ai
DOMAIN-SUFFIX,cloudflare.com
DOMAIN-SUFFIX,workers.dev
DOMAIN-SUFFIX,discord.com
DOMAIN-SUFFIX,telegram.org
DOMAIN-SUFFIX,reddit.com
DOMAIN-SUFFIX,wikipedia.org
DOMAIN-SUFFIX,stackoverflow.com
DOMAIN-SUFFIX,docker.com
`,

  "/reject.list": `# reject.list — 廣告 / 追蹤 / REJECT
DOMAIN-SUFFIX,doubleclick.net
DOMAIN-SUFFIX,googlesyndication.com
DOMAIN-SUFFIX,googleadservices.com
DOMAIN-SUFFIX,adservice.google.com
DOMAIN-SUFFIX,googletagmanager.com
DOMAIN-KEYWORD,tracker
DOMAIN-KEYWORD,analytics
DOMAIN-KEYWORD,ads
`,
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const body = files[url.pathname];

    if (!body) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "access-control-allow-origin": "*",
        },
      });
    }

    return new Response(body, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=60",
        "access-control-allow-origin": "*",
      },
    });
  },
};
