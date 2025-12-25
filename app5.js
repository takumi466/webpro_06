"use strict";

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// --- 初期データ (各12個) ---

// 1. プロ野球選手管理システム
let baseball = [
    { id: 0, name: "村上 宗隆", team: "ヤクルト", pos: "内野手", avg: 0.256, hr: 33 },
    { id: 1, name: "近本 光司", team: "阪神", pos: "外野手", avg: 0.285, hr: 8 },
    { id: 2, name: "岡本 和真", team: "巨人", pos: "内野手", avg: 0.278, hr: 41 },
    { id: 3, name: "牧 秀悟", team: "DeNA", pos: "内野手", avg: 0.293, hr: 29 },
    { id: 4, name: "坂倉 将吾", team: "広島", pos: "捕手", avg: 0.273, hr: 12 },
    { id: 5, name: "細川 成也", team: "中日", pos: "外野手", avg: 0.253, hr: 24 },
    { id: 6, name: "宮城 大弥", team: "オリックス", pos: "投手", avg: 0.000, hr: 0 },
    { id: 7, name: "佐々木 朗希", team: "ロッテ", pos: "投手", avg: 0.000, hr: 0 },
    { id: 8, name: "柳田 悠岐", team: "ソフトバンク", pos: "外野手", avg: 0.299, hr: 22 },
    { id: 9, name: "浅村 栄斗", team: "楽天", pos: "内野手", avg: 0.274, hr: 26 },
    { id: 10, name: "源田 壮亮", team: "西武", pos: "内野手", avg: 0.257, hr: 0 },
    { id: 11, name: "万波 中正", team: "日本ハム", pos: "外野手", avg: 0.265, hr: 25 }
];

// 2. 映画情報管理システム
let movies = [
    { id: 0, title: "七人の侍", director: "黒澤明", year: 1954, genre: "時代劇" },
    { id: 1, title: "千と千尋の神隠し", director: "宮崎駿", year: 2001, genre: "アニメ" },
    { id: 2, title: "君の名は。", director: "新海誠", year: 2016, genre: "アニメ" },
    { id: 3, title: "ゴジラ-1.0", director: "山崎貴", year: 2023, genre: "特撮" },
    { id: 4, title: "東京物語", director: "小津安二郎", year: 1953, genre: "ドラマ" },
    { id: 5, title: "万引き家族", director: "是枝裕和", year: 2018, genre: "ドラマ" },
    { id: 6, title: "るろうに剣心", director: "大友啓史", year: 2012, genre: "アクション" },
    { id: 7, title: "シン・ゴジラ", director: "庵野秀明", year: 2016, genre: "特撮" },
    { id: 8, title: "おくりびと", director: "滝田洋二郎", year: 2008, genre: "ドラマ" },
    { id: 9, title: "ドライブ・マイ・カー", director: "濱口竜介", year: 2021, genre: "ドラマ" },
    { id: 10, title: "Shall we ダンス?", director: "周防正行", year: 1996, genre: "コメディ" },
    { id: 11, title: "羅生門", director: "黒澤明", year: 1950, genre: "ミステリー" }
];

// 3. 日本史出来事管理システム
let history = [
    { id: 0, event: "大化の改新", year: 645, person: "中大兄皇子", desc: "公地公民制の導入" },
    { id: 1, event: "平城京遷都", year: 710, person: "元明天皇", desc: "奈良に都を移す" },
    { id: 2, event: "鎌倉幕府成立", year: 1185, person: "源頼朝", desc: "武家政治の始まり" },
    { id: 3, event: "本能寺の変", year: 1582, person: "織田信長", desc: "明智光秀の謀反" },
    { id: 4, event: "関ヶ原の戦い", year: 1600, person: "徳川家康", desc: "天下分け目の戦い" },
    { id: 5, event: "江戸幕府開府", year: 1603, person: "徳川家康", desc: "江戸時代の始まり" },
    { id: 6, event: "大政奉還", year: 1867, person: "徳川慶喜", desc: "政権を朝廷に返上" },
    { id: 7, event: "廃藩置県", year: 1871, person: "明治政府", desc: "中央集権体制の確立" },
    { id: 8, event: "日露戦争終結", year: 1905, person: "東郷平八郎", desc: "ポーツマス条約" },
    { id: 9, event: "東京五輪", year: 1964, person: "池田勇人", desc: "高度経済成長の象徴" },
    { id: 10, event: "遣隋使派遣", year: 607, person: "聖徳太子", desc: "小野妹子を隋に送る" },
    { id: 11, event: "日本国憲法公布", year: 1946, person: "吉田茂", desc: "平和主義と国民主権" }
];

// --- ルーティング ---

// トップページ
app.get("/", (req, res) => res.render("index"));

// 1. 野球システム (仕様書のパス /baseball に統一)
app.get("/baseball", (req, res) => res.render("baseball_list", { data: baseball }));
app.get("/baseball/:id", (req, res) => res.render("baseball_detail", { item: baseball.find(b => b.id == req.params.id) }));
app.post("/baseball/add", (req, res) => {
    const newId = baseball.length > 0 ? Math.max(...baseball.map(b => b.id)) + 1 : 0;
    baseball.push({ ...req.body, id: newId, avg: Number(req.body.avg), hr: Number(req.body.hr) });
    res.redirect("/baseball");
});
app.post("/baseball/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const idx = baseball.findIndex(b => b.id === id);
    if (idx !== -1) baseball[idx] = { ...req.body, id: id, avg: Number(req.body.avg), hr: Number(req.body.hr) };
    res.redirect("/baseball/" + id);
});
app.get("/baseball/delete/:id", (req, res) => {
    baseball = baseball.filter(b => b.id != req.params.id);
    res.redirect("/baseball");
});

// 2. 映画システム
app.get("/movies", (req, res) => res.render("movies_list", { data: movies }));
app.get("/movies/:id", (req, res) => res.render("movies_detail", { item: movies.find(m => m.id == req.params.id) }));
app.post("/movies/add", (req, res) => {
    const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 0;
    movies.push({ ...req.body, id: newId, year: Number(req.body.year) });
    res.redirect("/movies");
});
app.post("/movies/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const idx = movies.findIndex(m => m.id === id);
    if (idx !== -1) movies[idx] = { ...req.body, id: id, year: Number(req.body.year) };
    res.redirect("/movies/" + id);
});
app.get("/movies/delete/:id", (req, res) => {
    movies = movies.filter(m => m.id != req.params.id);
    res.redirect("/movies");
});

// 3. 日本史システム
app.get("/history", (req, res) => res.render("history_list", { data: history }));
app.get("/history/:id", (req, res) => res.render("history_detail", { item: history.find(h => h.id == req.params.id) }));
app.post("/history/add", (req, res) => {
    const newId = history.length > 0 ? Math.max(...history.map(h => h.id)) + 1 : 0;
    history.push({ ...req.body, id: newId, year: Number(req.body.year) });
    res.redirect("/history");
});
app.post("/history/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const idx = history.findIndex(h => h.id === id);
    if (idx !== -1) history[idx] = { ...req.body, id: id, year: Number(req.body.year) };
    res.redirect("/history/" + id);
});
app.get("/history/delete/:id", (req, res) => {
    history = history.filter(h => h.id != req.params.id);
    res.redirect("/history");
});

app.listen(8080, () => console.log("Running at http://localhost:8080"));