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

[Proxy]
🇸🇬 SG-VLESS = vless, 45.32.123.30, 443, uuid=49997afc-c405-41fb-aaa5-55db249ca865, udp-relay=true, reality=true, reality-pubkey=ScJwrWbfhdxBT3AXLhMq6GwrlYxmUh4HMNa-rPsjVHQ, reality-short-id=0123456789abcdef, sni=www.microsoft.com, flow=xtls-rprx-vision
🇸🇬 SG-VLESS-TLS = vless, 45.32.123.30, 8443, uuid=49997afc-c405-41fb-aaa5-55db249ca865, udp-relay=true, tls=true, tls-cert-sha256=3C:E9:95:BC:8A:AC:9E:7A:0E:30:DE:06:38:76:B8:29:FD:59:96:CC:F5:11:12:22:17:56:F2:56:21:70:E0:E2

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

# === Vultr VPS (SSH 直連) ===
IP-CIDR,45.32.123.30/32,no-resolve
IP-CIDR,45.77.250.74/32,no-resolve

# === 自身規則域名（雞生蛋問題）===
IP-CIDR,139.180.137.48/32,no-resolve
DOMAIN,proxy-rules.tobyleons.com

# === Apple 服務 ===
DOMAIN-SUFFIX,aaplimg.com
DOMAIN-SUFFIX,apple-cloudkit.com
DOMAIN-SUFFIX,apple.co
DOMAIN-SUFFIX,apple.com
DOMAIN-SUFFIX,apple.com.cn
DOMAIN-SUFFIX,apple.news
DOMAIN-SUFFIX,appstore.com
DOMAIN-SUFFIX,cdn-apple.com
DOMAIN-SUFFIX,crashlytics.com
DOMAIN-SUFFIX,icloud-content.com
DOMAIN-SUFFIX,icloud.com
DOMAIN-SUFFIX,icloud.com.cn
DOMAIN-SUFFIX,me.com
DOMAIN-SUFFIX,mzstatic.com
DOMAIN,www-cdn.icloud.com.akadns.net

# === 中國主流平台（百度系）===
DOMAIN-SUFFIX,baidu.com
DOMAIN-SUFFIX,baidubcr.com
DOMAIN-SUFFIX,bdstatic.com
DOMAIN-SUFFIX,yunjiasu-cdn.net

# === 阿里巴巴系 ===
DOMAIN-SUFFIX,taobao.com
DOMAIN-SUFFIX,tmall.com
DOMAIN-SUFFIX,tmall.hk
DOMAIN-SUFFIX,alicdn.com
DOMAIN-SUFFIX,alibaba.com
DOMAIN-SUFFIX,alikunlun.com
DOMAIN-SUFFIX,alipay.com
DOMAIN-SUFFIX,amap.com
DOMAIN-SUFFIX,autonavi.com
DOMAIN-SUFFIX,dingtalk.com
DOMAIN-SUFFIX,youku.com
DOMAIN-SUFFIX,1688.com
DOMAIN-SUFFIX,etao.com

# === 騰訊系 ===
DOMAIN-SUFFIX,qq.com
DOMAIN-SUFFIX,wechat.com
DOMAIN-SUFFIX,tencent.com
DOMAIN-SUFFIX,tencent-cloud.net
DOMAIN-SUFFIX,tenpay.com
DOMAIN-SUFFIX,gtimg.com
DOMAIN-SUFFIX,qhimg.com
DOMAIN-SUFFIX,qhres.com
DOMAIN-SUFFIX,idqqimg.com
DOMAIN-SUFFIX,servicewechat.com
DOMAIN-SUFFIX,dns.pub
DOMAIN-SUFFIX,doh.pub

# === 百度 / 愛奇藝 ===
DOMAIN-SUFFIX,iqiyi.com
DOMAIN-SUFFIX,iqiyipic.com

# === 嗶哩嗶哩 ===
DOMAIN-SUFFIX,bilibili.com
DOMAIN-SUFFIX,bilibili.tv
DOMAIN-SUFFIX,hdslb.com
DOMAIN-SUFFIX,biliapi.com
DOMAIN-SUFFIX,biliapi.net
DOMAIN-SUFFIX,acgvideo.com

# === 抖音 / 頭條 ===
DOMAIN-SUFFIX,douyin.com
DOMAIN-SUFFIX,iesdouyin.com
DOMAIN-SUFFIX,snssdk.com
DOMAIN-SUFFIX,toutiao.com
DOMAIN-SUFFIX,pstatp.com

# === 美團點評 ===
DOMAIN-SUFFIX,meituan.com
DOMAIN-SUFFIX,meituan.net
DOMAIN-SUFFIX,dianping.com

# === 知乎 ===
DOMAIN-SUFFIX,zhihu.com
DOMAIN-SUFFIX,zhimg.com

# === 微博 ===
DOMAIN-SUFFIX,weibo.com
DOMAIN-SUFFIX,weibocdn.com
DOMAIN-SUFFIX,weico.cc

# === 京東 ===
DOMAIN-SUFFIX,jd.com
DOMAIN-SUFFIX,jd.hk
DOMAIN-SUFFIX,jdpay.com
DOMAIN-SUFFIX,360buyimg.com

# === 小紅書 ===
DOMAIN-SUFFIX,xiaohongshu.com
DOMAIN-SUFFIX,xhscdn.com

# === 網易 ===
DOMAIN-SUFFIX,163.com
DOMAIN-SUFFIX,126.net
DOMAIN-SUFFIX,netease.com

# === 小米 ===
DOMAIN-SUFFIX,xiaomi.com
DOMAIN-SUFFIX,miui.com
DOMAIN-SUFFIX,mi-img.com

# === 其他國內常用 ===
DOMAIN-SUFFIX,sina.com
DOMAIN-SUFFIX,sinaimg.cn
DOMAIN-SUFFIX,sohu.com
DOMAIN-SUFFIX,sohucs.com
DOMAIN-SUFFIX,sohu-inc.com
DOMAIN-SUFFIX,ctrip.com
DOMAIN-SUFFIX,booking.com
DOMAIN-SUFFIX,smzdm.com
DOMAIN-SUFFIX,douban.com
DOMAIN-SUFFIX,doubanio.com
DOMAIN-SUFFIX,sspai.com
DOMAIN-SUFFIX,ithome.com
DOMAIN-SUFFIX,luojilab.com
DOMAIN-SUFFIX,kaiyanapp.com
DOMAIN-SUFFIX,b612.net
DOMAIN-SUFFIX,camera360.com
DOMAIN-SUFFIX,feng.com
DOMAIN-SUFFIX,gandi.net
DOMAIN-SUFFIX,gifshow.com
DOMAIN-SUFFIX,huya.com
DOMAIN-SUFFIX,keepcdn.com
DOMAIN-SUFFIX,maoyan.com
DOMAIN-SUFFIX,mgtv.com
DOMAIN-SUFFIX,mubu.com
DOMAIN-SUFFIX,raychase.net
DOMAIN-SUFFIX,scomper.me
DOMAIN-SUFFIX,snapdrop.net
DOMAIN-SUFFIX,xiachufang.com
DOMAIN-SUFFIX,xiami.com
DOMAIN-SUFFIX,xiami.net
DOMAIN-SUFFIX,ximalaya.com
DOMAIN-SUFFIX,yangkeduo.com
DOMAIN-SUFFIX,zimuzu.io
DOMAIN-SUFFIX,zimuzu.tv

# === 銀行 / 支付 ===
DOMAIN-SUFFIX,abchina.com
DOMAIN-SUFFIX,cmbchina.com
DOMAIN-SUFFIX,cmbimg.com
DOMAIN-SUFFIX,paypal.com
DOMAIN-SUFFIX,paypalobjects.com

# === 學術 / 教育 ===
DOMAIN-SUFFIX,acm.org
DOMAIN-SUFFIX,acs.org
DOMAIN-SUFFIX,aip.org
DOMAIN-SUFFIX,ams.org
DOMAIN-SUFFIX,annualreviews.org
DOMAIN-SUFFIX,aps.org
DOMAIN-SUFFIX,ascelibrary.org
DOMAIN-SUFFIX,asm.org
DOMAIN-SUFFIX,asme.org
DOMAIN-SUFFIX,astm.org
DOMAIN-SUFFIX,bmj.com
DOMAIN-SUFFIX,cambridge.org
DOMAIN-SUFFIX,cas.org
DOMAIN-SUFFIX,clarivate.com
DOMAIN-SUFFIX,ebscohost.com
DOMAIN-SUFFIX,emerald.com
DOMAIN-SUFFIX,engineeringvillage.com
DOMAIN-SUFFIX,ieee.org
DOMAIN-SUFFIX,iop.org
DOMAIN-SUFFIX,jamanetwork.com
DOMAIN-SUFFIX,jhu.edu
DOMAIN-SUFFIX,jstor.org
DOMAIN-SUFFIX,karger.com
DOMAIN-SUFFIX,libguides.com
DOMAIN-SUFFIX,mpg.de
DOMAIN-SUFFIX,nature.com
DOMAIN-SUFFIX,nvidia.com
DOMAIN-SUFFIX,oecd-ilibrary.org
DOMAIN-SUFFIX,oracle.com
DOMAIN-SUFFIX,osapublishing.org
DOMAIN-SUFFIX,oup.com
DOMAIN-SUFFIX,ovid.com
DOMAIN-SUFFIX,oxfordartonline.com
DOMAIN-SUFFIX,oxfordbibliographies.com
DOMAIN-SUFFIX,oxfordmusiconline.com
DOMAIN-SUFFIX,pnas.org
DOMAIN-SUFFIX,proquest.com
DOMAIN-SUFFIX,rsc.org
DOMAIN-SUFFIX,sagepub.com
DOMAIN-SUFFIX,sciencedirect.com
DOMAIN-SUFFIX,scopus.com
DOMAIN-SUFFIX,siam.org
DOMAIN-SUFFIX,spiedigitallibrary.org
DOMAIN-SUFFIX,springer.com
DOMAIN-SUFFIX,springerlink.com
DOMAIN-SUFFIX,tandfonline.com
DOMAIN-SUFFIX,udacity.com
DOMAIN-SUFFIX,un.org
DOMAIN-SUFFIX,webofknowledge.com
DOMAIN-SUFFIX,wiley.com
DOMAIN-SUFFIX,worldbank.org
DOMAIN-SUFFIX,worldscientific.com

# === 常用軟件更新 ===
DOMAIN-SUFFIX,visualstudio.com
DOMAIN,download.jetbrains.com
DOMAIN,officecdn-microsoft-com.akamaihd.net
DOMAIN,speedtest.macpaw.com

# === 遊戲 ===
DOMAIN-SUFFIX,steampowered.com
DOMAIN-SUFFIX,steamgames.com
DOMAIN-SUFFIX,steamcontent.com
DOMAIN-SUFFIX,steamstatic.com
DOMAIN-SUFFIX,steamcdn-a.akamaihd.net
DOMAIN-SUFFIX,steamusercontent.com
DOMAIN-SUFFIX,steamstat.us
DOMAIN-SUFFIX,steam-chat.com
DOMAIN-SUFFIX,steamcommunity.com
DOMAIN,blzddist1-a.akamaihd.net
DOMAIN,file-igamecj.akamaized.net

# === 實用工具 ===
DOMAIN-SUFFIX,ipip.net
DOMAIN-SUFFIX,ipv6-test.com
DOMAIN-SUFFIX,test-ipv6.com
DOMAIN-SUFFIX,whatismyip.com
DOMAIN-SUFFIX,netspeedtestmaster.com
DOMAIN-SUFFIX,accuweather.com
DOMAIN-SUFFIX,weather.com
DOMAIN-SUFFIX,dnsleaktest.com
DOMAIN-SUFFIX,dnsleak.com
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

  "/sub": `vless://49997afc-c405-41fb-aaa5-55db249ca865@45.32.123.30:443?encryption=none&security=reality&sni=www.microsoft.com&fp=chrome&pbk=ScJwrWbfhdxBT3AXLhMq6GwrlYxmUh4HMNa-rPsjVHQ&sid=0123456789abcdef&type=tcp&flow=xtls-rprx-vision#SG-VLESS-Reality
vless://49997afc-c405-41fb-aaa5-55db249ca865@45.32.123.30:8443?encryption=none&security=tls&sni=proxy.tobyleons.com&fp=chrome&type=tcp#SG-VLESS-TLS`,

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
