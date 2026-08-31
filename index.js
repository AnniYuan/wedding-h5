// ===================== 全部在这里修改配置 =====================
const pageConfig = {
  topSmallTitle: "✦ WILDWOOD WEDDING",
  topDate: "2026.09.27",
  bigTitle: "WEDDING\nINVITATION",

  cardTitle: "林间的特别邀请",
  photoSubTitle: "林间的我们",
  photoDesc: "—— 从孩童的梦境，走向现实的婚礼 ——",

  infoTitle: "一生一次的林间之约",
  infoDate: "2026年09月27日 · 星期六",
  infoPlace: "兰州喜来登酒店",
  infoCrew: "新郎 & 新娘",
  btnText: "接过信笺",

  nav: ["任务", "日程", "地图", "登记"],
  // 导航点击锚点（与 nav 一一对应；目标隐藏时回退到第一页信笺卡）
  navTargets: [".wrapper", "#page3", "#js-p3-map-btn", "#rsvpContainer"],

  // 第二页
  page2HeroTitle: "林间友人来信",
  page2CardTitle: "林间的友人来信",
  page2BtnText: "查看全部来信",
  page2Letters: [
    {
      mainAvatar: "./assets/avatar/letter-avatar-1.png",
      avatar: "./assets/avatar/letter-avatar-1.png",
      name: "林间小兔",
      time: "刚刚",
      text: "我们已收到你的婚礼邀请，愿穿过月光与花海，赴约这一场林间之约。"
    },
    {
      mainAvatar: "./assets/avatar/letter-avatar-2.png",
      avatar: "./assets/avatar/letter-avatar-2.png",
      name: "森林松鼠",
      time: "5分钟前",
      text: "听说森林深处有一场婚礼，我们准备了最甜的松果，等着为你们庆祝。"
    },
    {
      mainAvatar: "./assets/avatar/letter-avatar-3.png",
      avatar: "./assets/avatar/letter-avatar-3.png",
      name: "月光猫头鹰",
      time: "10分钟前",
      text: "月光洒满林间小路，我们将为你们照亮前方，祝福新人百年好合。"
    },
    {
      mainAvatar: "./assets/avatar/letter-avatar-4.png",
      avatar: "./assets/avatar/letter-avatar-4.png",
      name: "梦境精灵",
      time: "30分钟前",
      text: "在梦境的尽头收到了你们的请柬，我们会带着星光与花香，准时赴这一场林间之约。"
    }
  ],

  // 第三页：婚礼日程
  page3HeroTitle: "婚礼日程",
  page3CardTitle: "婚礼日程",
  page3SubTitle: "沿着林间光线，走向约定的时刻",
  page3Schedule: [
    { time: "13:00", label: "宾客签到" },
    { time: "13:30", label: "仪式入场" },
    { time: "14:00", label: "交换誓言" },
    { time: "14:10", label: "交换戒指" },
    { time: "14:30", label: "合影留念" },
    { time: "18:00", label: "晚宴开始" }
  ],

  // 婚纱照路径（素材留空时可先替换为占位图）
  photoUrl: [
    "./assets/photos/photo1.jpg",
    "./assets/photos/photo2.jpg",
    "./assets/photos/photo3.jpg"
  ],

  // 爱丽丝装饰素材
  decoRabbit: "./assets/decor/deco-rabbit.png",
  decoCup: "./assets/decor/deco-cup.png",

  // 边框装饰素材
  titleFont: "./assets/border/title-font.png",
  titleBorder: "./assets/border/title-border.png",
  avatorCard: "./assets/border/avator-card.png",
  envelope: "./assets/border/envelope.png",

  // -------- 回执表单配置（留空则不显示 RSVP 区域） --------
  iframeFormUrl: "",
  fallbackOpenUrl: ""
};

// ===================== 渲染静态文字 =====================
const $ = (sel) => document.querySelector(sel);

$("#js-top-small-title").innerText = pageConfig.topSmallTitle;
$("#js-top-date").innerText = pageConfig.topDate;
// bigTitle 已改用图片素材 titleFont，此处仅保留配置以备后用

$("#js-card-title").innerText = pageConfig.cardTitle;
$("#js-photo-sub").innerText = pageConfig.photoSubTitle;
$("#js-photo-desc").innerText = pageConfig.photoDesc;

$("#js-info-title").innerText = pageConfig.infoTitle;
$("#js-info-date").innerText = pageConfig.infoDate;
$("#js-info-place").innerText = pageConfig.infoPlace;
$("#js-info-crew").innerText = pageConfig.infoCrew;
$("#js-btn-text").innerText = pageConfig.btnText;

// 边框装饰素材（兔子/茶杯已集成进 title-border.png，不再单独引用）
$("#js-title-font").src = pageConfig.titleFont;
document.documentElement.style.setProperty("--title-border-img", `url("${pageConfig.titleBorder}")`);
$("#js-envlope").src = pageConfig.envelope;

// ===================== 开场视频 =====================
const introVideo = $("#js-intro-video");

// 自动播放（静音，符合移动端浏览器策略）
introVideo.play().catch(() => {});

// 播放结束定格最后一帧
introVideo.addEventListener("ended", () => {
  introVideo.currentTime = introVideo.duration;
});

// 点击重新播放（带声音）
introVideo.addEventListener("click", () => {
  introVideo.muted = false;
  introVideo.currentTime = 0;
  introVideo.play();
});

// ===================== 照片轮播 =====================
const frames = document.querySelectorAll(".photo-frame");
const photoImgs = [$("#img-p1"), $("#img-p2"), $("#img-p3")];
let current = 1; // 中间为当前主图

function renderPhotos() {
  // 三个槽位：左 / 中 / 右 分别显示 prev / current / next 照片
  const order = [
    (current + pageConfig.photoUrl.length - 1) % pageConfig.photoUrl.length,
    current,
    (current + 1) % pageConfig.photoUrl.length
  ];
  photoImgs.forEach((img, i) => {
    img.src = pageConfig.photoUrl[order[i]];
  });
  frames.forEach((f, i) => f.classList.toggle("active", i === 1));
}

$("#js-prev").addEventListener("click", () => {
  current = (current + pageConfig.photoUrl.length - 1) % pageConfig.photoUrl.length;
  renderPhotos();
});
$("#js-next").addEventListener("click", () => {
  current = (current + 1) % pageConfig.photoUrl.length;
  renderPhotos();
});

// 素材缺失时隐藏破图
photoImgs.forEach((img) => {
  img.onerror = () => { img.style.visibility = "hidden"; };
});
renderPhotos();

// ===================== 底部导航 =====================
const navBox = $("#js-bottom-nav");
navBox.insertAdjacentHTML("beforeend", '<span class="nav-mark">▼</span>');
pageConfig.nav.forEach((text, i) => {
  const item = document.createElement("span");
  item.className = "nav-item";
  item.innerText = text;
  // 锚点滚动：按 navTargets 配置定位到对应页面元素
  item.addEventListener("click", () => {
    const sel = (pageConfig.navTargets || [])[i];
    let el = sel ? document.querySelector(sel) : null;
    // 目标隐藏（如未配置 RSVP 表单）时回退到第一页信笺卡
    if (el && !el.getClientRects().length) {
      el = document.querySelector(".letter-card");
    }
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  navBox.appendChild(item);
});
navBox.insertAdjacentHTML("beforeend", '<span class="nav-mark">▲</span>');

// ===================== RSVP 回执表单 =====================
const rsvpContainer = $("#rsvpContainer");
const rsvpIframe = $("#rsvpIframe");
const fallbackWrap = $("#fallbackWrap");
const openFormBtn = $("#openFormBtn");

if (pageConfig.iframeFormUrl) {
  rsvpContainer.style.display = "block";
  rsvpIframe.src = pageConfig.iframeFormUrl;
  rsvpIframe.onerror = () => { fallbackWrap.style.display = "block"; };
}
openFormBtn.onclick = () => {
  if (pageConfig.fallbackOpenUrl) {
    window.open(pageConfig.fallbackOpenUrl, "_blank");
  }
};

// ===================== 第二页：林间友人来信轮播 =====================
$("#js-p2-top-small-title").innerText = pageConfig.topSmallTitle;
$("#js-p2-top-date").innerText = pageConfig.topDate;
$("#js-p2-hero-title").innerText = pageConfig.page2HeroTitle;
$("#js-p2-card-title").innerText = pageConfig.page2CardTitle;

const p2Letters = pageConfig.page2Letters;
let p2Current = 0;

const p2MainAvatar = $("#js-p2-main-avatar");
const p2Avatar = $("#js-p2-avatar");
const p2Name = $("#js-p2-name");
const p2Time = $("#js-p2-time");
const p2Text = $("#js-p2-text");
const p2Dots = $("#js-p2-dots");

// 素材缺失时隐藏破图
p2MainAvatar.onerror = () => { p2MainAvatar.style.visibility = "hidden"; };
p2Avatar.onerror = () => { p2Avatar.style.visibility = "hidden"; };

// 撑高副本：把每封信的正文各渲染一份隐形拷贝，与真正的正文共用同一个 grid 单元格。
// 卡片高度因此恒等于最长的那封，翻页时容器不会跳动（纯 CSS 决定，无需 JS 测量）。
const p2Body = $("#js-p2-body");
p2Letters.forEach((item) => {
  const ghost = document.createElement("p");
  ghost.className = "p2-paper-text p2-text-ghost";
  ghost.setAttribute("aria-hidden", "true");
  ghost.innerText = item.text;
  p2Body.appendChild(ghost);
});

// 渲染分页圆点
p2Dots.innerHTML = p2Letters.map((_, i) =>
  `<span class="p2-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
).join("");

function renderP2Card(index) {
  const item = p2Letters[index];
  p2MainAvatar.style.visibility = "visible";
  p2MainAvatar.src = item.mainAvatar;
  p2Avatar.style.visibility = "visible";
  p2Avatar.src = item.avatar;
  p2Name.innerText = item.name;
  p2Time.innerText = item.time;
  p2Text.innerText = item.text;

  // 更新指示圆点状态
  p2Dots.querySelectorAll(".p2-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// 左右翻页与圆点点击
$("#js-p2-prev").addEventListener("click", () => {
  p2Current = (p2Current + p2Letters.length - 1) % p2Letters.length;
  renderP2Card(p2Current);
});
$("#js-p2-next").addEventListener("click", () => {
  p2Current = (p2Current + 1) % p2Letters.length;
  renderP2Card(p2Current);
});
p2Dots.addEventListener("click", (e) => {
  if (e.target.classList.contains("p2-dot")) {
    p2Current = Number(e.target.dataset.index);
    renderP2Card(p2Current);
  }
});

// 初始渲染
renderP2Card(0);

// ===================== 第三页：婚礼日程 =====================
$("#js-p3-top-small-title").innerText = pageConfig.topSmallTitle;
$("#js-p3-top-date").innerText = pageConfig.topDate;
$("#js-p3-hero-title").innerText = pageConfig.page3HeroTitle;
$("#js-p3-card-title").innerText = pageConfig.page3CardTitle;
$("#js-p3-sub").innerText = pageConfig.page3SubTitle;

const p3Schedule = $("#js-p3-schedule");
p3Schedule.innerHTML = pageConfig.page3Schedule.map((item) =>
  `<li class="p3-item"><span class="p3-time">${item.time}</span><span class="p3-label">${item.label}</span></li>`
).join("");