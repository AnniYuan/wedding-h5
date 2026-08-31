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

  // 第二页
  page2HeroTitle: "林间友人来信",
  page2CardTitle: "林间的友人来信",
  page2InfoTitle: "一封来自林间的回信",
  page2BtnText: "查看全部来信",
  page2Letters: [
    {
      mainAvatar: "./assets/avatar/林间友人来信素材.png",
      avatar: "./assets/avatar/林间友人来信素材.png",
      name: "林间小兔",
      time: "刚刚",
      text: "我们已收到你的婚礼邀请，愿穿过月光与花海，赴约这一场林间之约。"
    },
    {
      mainAvatar: "./assets/avatar/林间友人来信素材 (1).png",
      avatar: "./assets/avatar/林间友人来信素材 (1).png",
      name: "森林松鼠",
      time: "5分钟前",
      text: "听说森林深处有一场婚礼，我们准备了最甜的松果，等着为你们庆祝。"
    },
    {
      mainAvatar: "./assets/avatar/林间友人来信素材 (2).png",
      avatar: "./assets/avatar/林间友人来信素材 (2).png",
      name: "月光猫头鹰",
      time: "10分钟前",
      text: "月光洒满林间小路，我们将为你们照亮前方，祝福新人百年好合。"
    }
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
  envlope: "./assets/border/envlope.png",

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
$("#js-title-border").src = pageConfig.titleBorder;
$("#js-envlope").src = pageConfig.envlope;

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

// ===================== 第二页内容（复用第一页结构） =====================
$("#js-p2-top-small-title").innerText = pageConfig.topSmallTitle;
$("#js-p2-top-date").innerText = pageConfig.topDate;
$("#js-p2-hero-title").innerText = pageConfig.page2HeroTitle;
$("#js-p2-card-title").innerText = pageConfig.page2CardTitle;
$("#js-p2-envlope").src = pageConfig.envlope;
$("#js-p2-info-title").innerText = pageConfig.page2InfoTitle;
$("#js-p2-btn-text").innerText = pageConfig.page2BtnText;

// 信纸内容：默认渲染第一封来信
const p2Letters = pageConfig.page2Letters;

(function renderP2Letter() {
  const letter = p2Letters[0];
  $("#js-p2-info-from").innerText = letter.name;
  $("#js-p2-info-time").innerText = letter.time;
  $("#js-p2-info-words").innerText = letter.text;
})();

// 全部来信弹层
const p2Modal = $("#js-p2-modal");
const p2List = $("#js-p2-letters-list");

p2List.innerHTML = p2Letters.map((l) => `
  <div class="p2-letter-item">
    <img src="${l.avatar}" alt="${l.name}">
    <div class="p2-letter-item-main">
      <div class="p2-letter-item-meta">
        <span class="p2-letter-item-name">${l.name}</span>
        <span class="p2-letter-item-time">${l.time}</span>
      </div>
      <div class="p2-letter-item-body">${l.text}</div>
    </div>
  </div>`).join("");

$("#js-p2-view-all").addEventListener("click", () => p2Modal.classList.add("open"));
$("#js-p2-modal-close").addEventListener("click", () => p2Modal.classList.remove("open"));
p2Modal.addEventListener("click", (e) => {
  if (e.target === p2Modal) p2Modal.classList.remove("open");
});