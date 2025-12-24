"use strict"; // 1. 厳格モード（必須要件）

const express = require("express"); // 2. expressを読み込む
const app = express(); // 3. ここで「app」を初期化する（ここがエラーの原因でした！）

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })); // POSTを受け取るために必要

// --- 4. データの定義 (各12個) ---

let baseballData = [
  { id: 1, name: "村上 宗隆", team: "ヤクルト", pos: "内野手", avg: 0.256, hr: 33 },
  { id: 2, name: "近本 光司", team: "阪神", pos: "外野手", avg: 0.285, hr: 8 },
  { id: 3, name: "岡本 和真", team: "巨人", pos: "内野手", avg: 0.278, hr: 41 },
  { id: 4, name: "柳田 悠岐", team: "ソフトバンク", pos: "外野手", avg: 0.299, hr: 22 },
  { id: 5, name: "宮﨑 敏郎", team: "DeNA", pos: "内野手", avg: 0.326, hr: 20 },
  { id: 6, name: "万波 中正", team: "日本ハム", pos: "外野手", avg: 0.265, hr: 25 },
  { id: 7, name: "佐々木 朗希", team: "ロッテ", pos: "投手", avg: 0.000, hr: 0 },
  { id: 8, name: "源田 壮亮", team: "西武", pos: "内野手", avg: 0.257, hr: 0 },
  { id: 9, name: "小郷 裕哉", team: "楽天", pos: "外野手", avg: 0.262, hr: 10 },
  { id: 10, name: "紅林 弘太郎", team: "オリックス", pos: "内野手", avg: 0.275, hr: 8 },
  { id: 11, name: "細川 成也", team: "中日", pos: "外野手", avg: 0.253, hr: 24 },
  { id: 12, name: "菊池 涼介", team: "広島", pos: "内野手", avg: 0.258, hr: 9 }
];

let movieData = [
  { id: 1, title: "七人の侍", director: "黒澤明", year: 1954, genre: "時代劇" },
  { id: 2, title: "千と千尋の神隠し", director: "宮崎駿", year: 2001, genre: "アニメ" },
  { id: 3, title: "君の名は。", director: "新海誠", year: 2016, genre: "アニメ" },
  { id: 4, title: "ゴジラ-1.0", director: "山崎貴", year: 2023, genre: "特撮" },
  { id: 5, title: "東京物語", director: "小津安二郎", year: 1953, genre: "ドラマ" },
  { id: 6, title: "万引き家族", director: "是枝裕和", year: 2018, genre: "ドラマ" },
  { id: 7, title: "るろうに剣心", director: "大友啓史", year: 2012, genre: "アクション" },
  { id: 8, title: "ドライブ・マイ・カー", director: "濱口竜介", year: 2021, genre: "ドラマ" },
  { id: 9, title: "シン・エヴァンゲリオン", director: "庵野秀明", year: 2021, genre: "アニメ" },
  { id: 10, title: "Shall we ダンス?", director: "周防正行", year: 1996, genre: "コメディ" },
  { id: 11, title: "おくりびと", director: "滝田洋二郎", year: 2008, genre: "ドラマ" },
  { id: 12, title: "羅生門", director: "黒澤明", year: 1950, genre: "ミステリー" }
];

let historyData = [
  { id: 1, event: "遣隋使派遣", year: 607, person: "聖徳太子", desc: "小野妹子らを隋に派遣" },
  { id: 2, event: "大化の改新", year: 645, person: "中大兄皇子", desc: "公地公民制の導入" },
  { id: 3, event: "平城京遷都", year: 710, person: "元明天皇", desc: "奈良に都を移す" },
  { id: 4, event: "鎌倉幕府成立", year: 1185, person: "源頼朝", desc: "武家政治の始まり" },
  { id: 5, event: "本能寺の変", year: 1582, person: "織田信長", desc: "明智光秀の謀反" },
  { id: 6, event: "関ヶ原の戦い", year: 1600, person: "徳川家康", desc: "天下分け目の戦い" },
  { id: 7, event: "江戸幕府開府", year: 1603, person: "徳川家康", desc: "江戸時代の始まり" },
  { id: 8, event: "大政奉還", year: 1867, person: "徳川慶喜", desc: "政権を朝廷に返上" },
  { id: 9, event: "明治維新", year: 1868, person: "明治天皇", desc: "近代国家への転換" },
  { id: 10, event: "廃藩置県", year: 1871, person: "木戸孝允", desc: "中央集権体制の確立" },
  { id: 11, event: "日本国憲法公布", year: 1946, person: "吉田茂", desc: "主権在民・平和主義" },
  { id: 12, event: "東京オリンピック", year: 1964, person: "佐藤栄作", desc: "高度経済成長の象徴" }
];

// --- 5. ルーティング (app.get/post) ---

// トップページ（メニューを表示）
app.get("/", (req, res) => {
  res.send(`
    <h1>最終課題：Webアプリケーション</h1>
    <ul>
      <li><a href="/baseball">1. 日本プロ野球システム</a></li>
      <li><a href="/movie">2. 映画情報システム</a></li>
      <li><a href="/history">3. 日本史出来事システム</a></li>
    </ul>
  `);
});

// プロ野球 (4ルート)
app.get("/baseball", (req, res) => res.render("bb_list", { data: baseballData }));
app.get("/baseball/:id", (req, res) => res.render("bb_detail", { item: baseballData[req.params.id] }));
app.post("/baseball/add", (req, res) => {
  baseballData.push({ ...req.body, id: baseballData.length + 1 });
  res.redirect("/baseball");
});
app.get("/baseball/delete/:id", (req, res) => {
  baseballData.splice(req.params.id, 1);
  res.redirect("/baseball");
});

// 映画 (4ルート)
app.get("/movie", (req, res) => res.render("mv_list", { data: movieData }));
app.get("/movie/:id", (req, res) => res.render("mv_detail", { item: movieData[req.params.id] }));
app.post("/movie/add", (req, res) => {
  movieData.push({ ...req.body, id: movieData.length + 1 });
  res.redirect("/movie");
});
app.get("/movie/delete/:id", (req, res) => {
  movieData.splice(req.params.id, 1);
  res.redirect("/movie");
});

// 歴史 (4ルート)
app.get("/history", (req, res) => res.render("hi_list", { data: historyData }));
app.get("/history/:id", (req, res) => res.render("hi_detail", { item: historyData[req.params.id] }));
app.post("/history/add", (req, res) => {
  historyData.push({ ...req.body, id: historyData.length + 1 });
  res.redirect("/history");
});
app.get("/history/delete/:id", (req, res) => {
  historyData.splice(req.params.id, 1);
  res.redirect("/history");
});

// --- 6. サーバ起動 ---
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});