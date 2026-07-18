"use strict";
/* ═══════════ 雙語文字 · Bilingual strings ═══════════
   所有介面文字集中在此檔，方便修改。
   All UI copy lives here — edit this file to tweak wording. */

const LANG_KEY = "attachment-lang";
let LANG = "zh";
try { LANG = localStorage.getItem(LANG_KEY) || "zh"; } catch (e) {}

/* 關係類別（儲存時用 key，顯示時翻譯） */
const REL_KEYS = ["general","partner","mother","father","family","friend","colleague","other"];

const I18N = {
zh: {
  "html.lang": "zh-Hant-HK",
  "app.title": "依附地形圖",
  "app.club": "書識圈 Bookfort ·《Secure》讀書會",
  "btn.theme": "🌗 深／淺色",
  "btn.lang": "EN",

  "nav.quiz": "測驗", "nav.map": "地形圖", "nav.records": "紀錄", "nav.collab": "關係檢核",

  "rel.general": "一般依附風格", "rel.partner": "伴侶", "rel.mother": "母親", "rel.father": "父親",
  "rel.family": "家人", "rel.friend": "朋友", "rel.colleague": "同事", "rel.other": "其他",
  "rel.general.short": "一般",

  "landing.eyebrow": "書識圈 ×《Secure》讀書會工具",
  "landing.title": "每段關係，都有自己的座標",
  "landing.body": "依附不是一個貼在身上的人格標籤，而是一套在關係中尋找安全的反應方式。你和某些人相處時可以很安定，遇到另一個人卻變得緊張、退開，或反覆確認對方還在不在。Amir Levine 在《Secure》中用「依附地形圖」說明這件事：把每段重要關係分開看，記下它在<strong>焦慮</strong>與<strong>迴避</strong>兩個維度上的位置。這個工具用 9 條題目幫你做同一件事；過一段時間再測，就能看到一段關係有沒有變得更安全，或仍在哪些地方拉扯。",
  "landing.start": "開始測驗 →",
  "landing.viewMap": "查看我的地形圖",
  "landing.privacyTitle": "🔒 你的私隱",
  "landing.privacyBody": "不用登入，也不用開帳號。所有紀錄<strong>只會留在此裝置的瀏覽器內</strong>，不會上傳到伺服器；你輸入的名稱也不會離開這部裝置。如要備份、換機，或在讀書會中自願分享，可到「紀錄」頁<strong>匯出／匯入</strong>資料檔。",
  "landing.howTitle": "怎樣使用",
  "landing.howBody": "<strong>一次只看一段關係</strong>：伴侶、母親、父親、好友、同事⋯⋯每位對象用一種顏色，放在同一張圖上。<br><strong>隔一段時間再測</strong>：如果互動方式改變，座標也會移動；多次紀錄會連成軌跡。<br><strong>再看日常互動</strong>：15 條安全關係檢核，幫你逐項看這段關係是否穩定、可回應、值得繼續投入。",
  "landing.disclaimer": "本工具僅供教育、自我了解及讀書會討論之用，並非臨床診斷。",

  "home.title": "開始新測驗",
  "home.body": "請先選定<strong>一位具體對象</strong>，再回答 9 條題目（1–7 分）。不要用「我平時的人際關係」作答；同一個你，在不同關係裡可能有不同反應。",
  "home.q1": "1 · 這次評估的是哪一段關係？",
  "home.q2": "2 · 為這位對象填一個名稱或代號",
  "home.namePh": "例如：媽媽、阿明、太太⋯⋯",
  "home.nameHint": "名稱只儲存在你自己的裝置上，不會上傳到任何地方。",
  "home.retestTitle": "或重測已有對象",
  "home.start": "開始作答 →",
  "home.times": "次",
  "home.recordOne": "次",
  "home.recordMany": "次",
  "home.stylesTitle": "四種依附風格",
  "home.stylesBody": "<strong>安全型</strong>：親近時大致安定，也能給彼此空間。<br><strong>焦慮型</strong>：很在意關係是否穩固，容易留意冷淡、延遲回覆或距離變化。<br><strong>迴避型</strong>：需要自主和空間；關係一靠近，身體和情緒可能先想退開。<br><strong>恐懼迴避型</strong>：一方面想靠近，一方面怕靠近後受傷，因此在拉近與退開之間擺盪。",
  "home.stylesNote": "這些分類不是判決。它們描述的是某段關係此刻如何影響你的安全感、距離感和注意力。",

  "quiz.who": "評估對象：{name}（{type}）",
  "quiz.qnum": "第 {n} 題／共 9 題",
  "quiz.prev": "← 上一題",
  "quiz.quit": "離開測驗",
  "quiz.anchorLow": "1 非常不同意",
  "quiz.anchorMid": "4 中立／不確定",
  "quiz.anchorHigh": "7 非常同意",
  "quiz.specificReminder": "請只想這一位對象：你在這段關係裡通常會怎樣反應？",

  "result.styleIs": "這段關係目前落在：",
  "result.snapshotNote": "請把結果當成一張當下的地圖：它描述這段關係如何牽動你，不替你或對方下定論。",
  "result.anxLabel": "焦慮分數（第 7–9 題平均，1–7）",
  "result.avdLabel": "迴避分數（第 1–6 題平均，1–7）",
  "result.tipTitle": "可以留意的地方",
  "result.nth": "這是你對「{name}」的第 {n} 次紀錄——到地形圖看看變化軌跡。",
  "result.chartTitle": "你的依附地形圖",
  "result.chartNote": "虛線（4 分）為象限分界。左下角＝最安全。",
  "result.viewMap": "查看完整地形圖",
  "result.again": "再測另一段關係",

  "map.title": "依附地形圖",
  "map.body": "每種顏色代表一位對象。同一對象有多次紀錄時，圖上會用線連起來；淡色是較早紀錄，實色是最新紀錄。你可以看見哪些關係穩定下來，哪些仍在靠近與退開之間移動。點按圖上的點可查看詳情。",
  "map.saveImg": "🖼 將地形圖儲存為圖片",
  "map.bookTip": "《Secure》的重點不是把人分類，而是看見：安全感會受不同關係影響，也能透過新的互動慢慢改寫。",
  "map.empty": "還沒有任何紀錄——先到「測驗」為一段關係作答吧。",
  "map.noData": "地形圖還沒有任何資料。",
  "map.imgFail": "圖片產生失敗，請重試。",

  "chart.secure": "安全型", "chart.anxious": "焦慮型", "chart.avoidant": "迴避型", "chart.fearful": "恐懼迴避型",
  "chart.xAxis": "焦慮程度 →", "chart.yAxis": "迴避程度 →", "chart.mostSecure": "◣ 最安全",
  "chart.aria": "依附地形圖：橫軸為焦慮分數，縱軸為迴避分數，各 1 至 7 分，4 分為象限分界。",
  "chart.imgTitle": "依附地形圖",
  "chart.imgCredit": "書識圈《Secure》讀書會",
  "chart.tipAnx": "焦慮", "chart.tipAvd": "迴避",

  "records.title": "測驗紀錄",
  "records.empty": "還沒有任何紀錄。",
  "records.none": "尚無紀錄",
  "records.deletePerson": "刪除對象",
  "records.delete": "刪除",
  "th.date": "日期", "th.anx": "焦慮", "th.avd": "迴避", "th.style": "風格", "th.person": "對象", "th.total": "總分",
  "records.confirmDelRec": "刪除「{name}」在 {date} 的這筆紀錄？",
  "records.confirmDelPerson": "刪除對象「{name}」及其全部 {n} 筆紀錄？此動作無法還原。",
  "records.backupTitle": "備份與還原",
  "records.backupBody": "所有紀錄只儲存在<strong>此裝置的瀏覽器</strong>內（無需登入）。如需轉用新裝置、與書友分享，或怕清除瀏覽器資料時遺失，請匯出成檔案保存；之後可隨時匯入還原。",
  "records.export": "⬇ 匯出資料（JSON 檔）",
  "records.import": "⬆ 匯入資料",
  "records.stats": "目前裝置上：{p} 位對象、{r} 筆測驗紀錄、{c} 筆檢核紀錄。",
  "records.wipeTitle": "清除全部資料",
  "records.wipe": "刪除此裝置上的所有紀錄",
  "records.wipeConfirm1": "確定要刪除此裝置上的全部紀錄嗎？此動作無法還原。建議先匯出備份。",
  "records.wipeConfirm2": "最後確認：真的要全部刪除？",
  "records.wiped": "已清除。",

  "import.title": "匯入資料",
  "import.summary": "檔案包含 {p} 位對象、{r} 筆測驗紀錄、{c} 筆檢核紀錄。要如何處理？",
  "import.merge": "合併到現有紀錄",
  "import.replace": "取代全部",
  "import.cancel": "取消",
  "import.bad": "無法讀取：這不是有效的依附地形圖備份檔。",
  "import.done": "匯入完成！",

  "collab.title": "這段關係值得繼續投入嗎？——安全關係檢核表",
  "collab.body": "這 15 條檢核題（1 非常不同意 – 5 非常同意）用來看一段關係的日常質地：對方是否穩定出現、能回應、說到做到，互動是否讓你慢慢安定下來。《Secure》把這些特質整理為 <strong>CARRP</strong>：一致（Consistent）、可得（Available）、有回應（Responsive）、可靠（Reliable）、可預測（Predictable）；也提醒我們留意日常微小互動（SIMIs）。",
  "collab.whoTitle": "評估對象",
  "collab.whoPh": "這段關係的對象（例如：阿明）",
  "collab.calc": "計算總分",
  "collab.clear": "開始新的檢核",
  "collab.unanswered": "還有題目未作答。",
  "collab.unnamed": "未命名",
  "collab.resultLabel": "「{name}」的安全關係總分",
  "collab.bandHigh": "這段關係有不少安全基礎：互動大致穩定，也能承載更多投入。",
  "collab.bandMid": "這段關係有可用的基礎，但安全感並不平均。請回頭看分數偏低的題目：問題多出在回應、穩定，還是消耗？",
  "collab.bandLow": "多個安全指標偏低，代表這段關係可能正在消耗你。可以先嘗試把需要說清楚，觀察對方能否更一致、更可回應；若長期沒有改變，就要考慮降低這段關係在生活中的優先次序。",
  "collab.bandNote": "總分只是一個入口。真正值得看的，是哪幾種互動令你安定，哪幾種互動反覆令你失去安全感。（書中原表只計總分。）",
  "collab.anchorLow": "非常不同意", "collab.anchorHigh": "非常同意",
  "collab.historyTitle": "過往檢核紀錄",
  "collab.confirmDel": "刪除這筆檢核紀錄？",

  "footer.html": "本工具採用依附研究廣泛使用的「焦慮 × 迴避」兩維度模型，題目為可自由使用的研究量表 ECR-RS（Fraley, Heffernan, Vicary &amp; Brumbaugh, 2011）之中文改寫版；「依附地形圖」的做法在 Amir Levine 醫生的著作《Secure》(2026) 中有詳細討論。<br>本工具僅供教育、自我了解及讀書會討論之用，並非臨床診斷。如有困擾，請尋求專業協助。",

  "questions": [
    "當我需要幫助時，向這個人傾訴對我是有幫助的。",
    "我通常會跟這個人談我的困擾和憂慮。",
    "遇到事情，我會找這個人商量。",
    "我覺得依靠這個人並不困難。",
    "我不太願意向這個人打開心扉。",
    "我寧願不讓這個人知道我內心深處的感受。",
    "我常常擔心這個人並不真正關心我。",
    "我害怕這個人終有一天會離我而去。",
    "我擔心這個人對我的重視，不如我對他／她的重視。",
  ],

  "collabItems": [
    "這個人把我的福祉放在心上。",
    "這個人願意付出，也願意接受。",
    "我在這段關係投入的心力是可持續的（不會過度消耗自己）。",
    "這段關係讓我感到公平、平衡。",
    "在這段關係中，我感到被聆聽、被看見、被重視。",
    "我也讓對方感到被聆聽、被看見、被重視。",
    "這個人在互動中不會刻意冷落我、排擠我，或用冷淡沉默回應我。",
    "這個人願意聆聽不同觀點，並尋求共識。",
    "這個人會支持我、撐我。",
    "我與這個人的日常微小互動（SIMIs）大多是正面的。",
    "在這段關係中，我的情緒是穩定的。",
    "這個人不會刻意做些事來懲罰我或「給我一個教訓」。",
    "這個人對我是 CARRP 的（一致、可得、有回應、可靠、可預測）。",
    "我對這個人也是 CARRP 的。",
    "整體而言，這個人值得我繼續投入。",
  ],

  "styles": {
    secure:  {name:"安全型",
      desc:"低焦慮、低迴避。這段關係大致讓你放心：你可以靠近，也可以保留自己的步伐；有需要時說得出口，對方不在眼前時也不會一直佔住你的注意力。",
      tip:"可以留意哪些日常互動讓你安定下來：準時回覆、願意解釋、衝突後仍肯修補。這些細節就是安全感累積的地方。"},
    anxious: {name:"焦慮型",
      desc:"高焦慮、低迴避。這段關係很容易牽動你：一句遲來的回覆、一點語氣變化，都可能讓你開始推想對方是否不在乎，或準備離開。",
      tip:"先把身體和注意力拉回來，再把需要說清楚。與其反覆追問自己是不是太多，不如觀察對方能否穩定回應、願意修補、說到做到。"},
    avoidant:{name:"迴避型",
      desc:"低焦慮、高迴避。這段關係一靠近，你可能先想保留距離：少說一點、慢一點回應，或把需要收起來，免得被捲入太多。",
      tip:"距離可以保護你，但如果對方只能感到你退開，關係會更難安定。可以從很小的回應開始：交代一下、承認一下、約定下一次再談。"},
    fearful: {name:"恐懼迴避型",
      desc:"高焦慮、高迴避。這段關係同時喚起想靠近和想退開的反應：靠近時怕受傷，退開後又怕失去，於是很難找到穩定位置。",
      tip:"先不用逼自己立刻信任或立刻離開。比較有用的是分辨：哪些互動真的帶來安全，哪些只是短暫安撫焦慮。若拉扯長期影響生活，請尋求心理專業協助。"},
  },
},

en: {
  "html.lang": "en",
  "app.title": "Attachment Topography",
  "app.club": "Bookfort 書識圈 · Secure Book Club",
  "btn.theme": "🌗 Theme",
  "btn.lang": "中",

  "nav.quiz": "Quiz", "nav.map": "Map", "nav.records": "Records", "nav.collab": "Relationship Check",

  "rel.general": "General attachment style", "rel.partner": "Partner", "rel.mother": "Mother", "rel.father": "Father",
  "rel.family": "Family", "rel.friend": "Friend", "rel.colleague": "Colleague", "rel.other": "Other",
  "rel.general.short": "General",

  "landing.eyebrow": "A Bookfort × Secure book-club tool",
  "landing.title": "Every relationship has its own coordinates",
  "landing.body": "Attachment is not a personality label. It is a safety system that comes alive in specific relationships. With one person you may feel steady; with another, you may scan for signs of distance, pull back, or keep checking whether the bond is still there. In <em>Secure</em>, Amir Levine uses attachment topography to look at these relationships one by one. This tool plots each relationship across two research-backed dimensions — <strong>anxiety</strong> and <strong>avoidance</strong>. Retake it later to see whether a relationship is becoming safer, or where it still pulls you off balance.",
  "landing.start": "Start the quiz →",
  "landing.viewMap": "View my map",
  "landing.privacyTitle": "🔒 Your privacy",
  "landing.privacyBody": "No login, no account — every record is stored <strong>only in this device's browser</strong>. Nothing is uploaded anywhere; even the names never leave your phone. To back up, move to a new device, or compare with friends, use <strong>export / import</strong> on the Records page anytime.",
  "landing.howTitle": "How to use it",
  "landing.howBody": "<strong>Look at one relationship at a time</strong>: partner, mum, dad, close friend, colleague… each person gets a colour on the same map.<br><strong>Come back later</strong>: when the pattern changes, the coordinates move; repeated records become a trajectory.<br><strong>Check the daily texture</strong>: the 15-item security checklist helps you examine whether this relationship is steady, responsive, and worth further investment.",
  "landing.disclaimer": "For education, self-reflection and book-club discussion only — not a clinical diagnosis.",

  "home.title": "Start a new quiz",
  "home.body": "Choose <strong>one specific person</strong>, then answer 9 questions on a 1–7 scale. Do not answer for your relationships in general; the same person can react differently in different bonds.",
  "home.q1": "1 · Which relationship are you assessing?",
  "home.q2": "2 · Give this person a name or nickname",
  "home.namePh": "e.g. Mum, Alex, my wife…",
  "home.nameHint": "Names are stored only on your own device and never uploaded.",
  "home.retestTitle": "Or: retest someone you've assessed before",
  "home.start": "Begin →",
  "home.times": "records",
  "home.recordOne": "record",
  "home.recordMany": "records",
  "home.stylesTitle": "The four attachment styles",
  "home.stylesBody": "<strong>Secure</strong>: closeness feels mostly safe, and there is room for both people to breathe.<br><strong>Anxious</strong>: the relationship feels fragile, so delayed replies, shifts in tone, or distance can take up a lot of attention.<br><strong>Avoidant</strong>: independence matters; when closeness increases, pulling back may feel safer than staying present.<br><strong>Fearful-avoidant</strong>: closeness is wanted and feared at the same time, so the relationship can swing between approach and retreat.",
  "home.stylesNote": "These are not verdicts on character. They describe how a particular relationship is shaping safety, distance, and attention right now.",

  "quiz.who": "Assessing: {name} ({type})",
  "quiz.qnum": "Question {n} of 9",
  "quiz.prev": "← Back",
  "quiz.quit": "Exit quiz",
  "quiz.anchorLow": "1 Strongly disagree",
  "quiz.anchorMid": "4 Neutral / unsure",
  "quiz.anchorHigh": "7 Strongly agree",
  "quiz.specificReminder": "Keep this one person in mind: how do you usually respond in this relationship?",

  "result.styleIs": "This relationship currently falls in: ",
  "result.snapshotNote": "Read this as a map of the current bond: it describes how this relationship affects you, not who either of you permanently are.",
  "result.anxLabel": "Anxiety score (mean of Q7–9, 1–7)",
  "result.avdLabel": "Avoidance score (mean of Q1–6, 1–7)",
  "result.tipTitle": "A tip for you",
  "result.nth": "This is record #{n} for “{name}” — check the map to see the trajectory.",
  "result.chartTitle": "Your attachment topography",
  "result.chartNote": "Dashed lines (score 4) mark the quadrant boundaries. Bottom-left = most secure.",
  "result.viewMap": "View the full map",
  "result.again": "Assess another relationship",

  "map.title": "Attachment topography",
  "map.body": "Each colour represents one person. When the same person has several records, the chart connects them with a line: faded points are earlier, solid points are latest. The movement shows which relationships are settling, and which still pull between closeness and distance. Tap a dot for details.",
  "map.saveImg": "🖼 Save map as an image",
  "map.bookTip": "The point of the map is not to sort people into boxes. It helps you see how different relationships affect safety, and how repeated interactions can slowly rewrite the pattern.",
  "map.empty": "No records yet — head to the Quiz tab and assess a relationship first.",
  "map.noData": "The map has no data yet.",
  "map.imgFail": "Couldn't generate the image — please try again.",

  "chart.secure": "SECURE", "chart.anxious": "ANXIOUS", "chart.avoidant": "AVOIDANT", "chart.fearful": "FEARFUL-AVOIDANT",
  "chart.xAxis": "More anxious →", "chart.yAxis": "More avoidant →", "chart.mostSecure": "◣ Most secure",
  "chart.aria": "Attachment topography chart: x-axis is the anxiety score, y-axis the avoidance score, each 1 to 7, quadrants split at 4.",
  "chart.imgTitle": "Attachment Topography",
  "chart.imgCredit": "Bookfort Secure Book Club",
  "chart.tipAnx": "anxiety", "chart.tipAvd": "avoidance",

  "records.title": "Quiz records",
  "records.empty": "No records yet.",
  "records.none": "No records",
  "records.deletePerson": "Delete person",
  "records.delete": "Delete",
  "th.date": "Date", "th.anx": "Anxiety", "th.avd": "Avoidance", "th.style": "Style", "th.person": "Person", "th.total": "Total",
  "records.confirmDelRec": "Delete the record for “{name}” from {date}?",
  "records.confirmDelPerson": "Delete “{name}” and all {n} of their records? This cannot be undone.",
  "records.backupTitle": "Backup & restore",
  "records.backupBody": "Everything is stored in <strong>this device's browser</strong> only (no login). To move to a new device, share with friends, or guard against clearing browser data, export a file — you can import it back anytime.",
  "records.export": "⬇ Export data (JSON file)",
  "records.import": "⬆ Import data",
  "records.stats": "On this device: {p} people, {r} quiz records, {c} checklist records.",
  "records.wipeTitle": "Clear all data",
  "records.wipe": "Delete all records on this device",
  "records.wipeConfirm1": "Delete ALL records on this device? This cannot be undone. Consider exporting a backup first.",
  "records.wipeConfirm2": "Final confirmation: really delete everything?",
  "records.wiped": "Cleared.",

  "import.title": "Import data",
  "import.summary": "The file contains {p} people, {r} quiz records and {c} checklist records. How should it be handled?",
  "import.merge": "Merge into existing records",
  "import.replace": "Replace everything",
  "import.cancel": "Cancel",
  "import.bad": "Couldn't read this file — it isn't a valid backup from this app.",
  "import.done": "Import complete!",

  "collab.title": "Is this relationship worth investing in? — Security checklist",
  "collab.body": "These 15 items (1 strongly disagree – 5 strongly agree) look at the daily texture of a relationship: whether the person shows up, responds, follows through, and helps your system settle. <em>Secure</em> gathers these qualities under <strong>CARRP</strong>: Consistent, Available, Responsive, Reliable, Predictable, and asks us to pay attention to the seemingly insignificant minor interactions (SIMIs) that happen every day.",
  "collab.whoTitle": "Who are you assessing?",
  "collab.whoPh": "The person in this relationship (e.g. Alex)",
  "collab.calc": "Calculate total",
  "collab.clear": "Start a new checklist",
  "collab.unanswered": "Some items are still unanswered.",
  "collab.unnamed": "Unnamed",
  "collab.resultLabel": "Security total for “{name}”",
  "collab.bandHigh": "This relationship has a strong base of security: the interaction is mostly steady, and it can likely hold further investment.",
  "collab.bandMid": "There is a usable foundation here, but security is uneven. Look back at the low-scoring items: is the strain about responsiveness, reliability, or emotional cost?",
  "collab.bandLow": "Several security indicators are low, which may mean this relationship is costing you more than it gives back. You can first state your needs clearly and watch whether the person becomes more consistent and responsive. If the pattern does not change, consider lowering this relationship’s priority in your life.",
  "collab.bandNote": "The total is only an entry point. What matters is item-by-item: which interactions help you settle, and which repeatedly take away your sense of safety? (The book's original table only records a total.)",
  "collab.anchorLow": "Strongly disagree", "collab.anchorHigh": "Strongly agree",
  "collab.historyTitle": "Past checklists",
  "collab.confirmDel": "Delete this checklist record?",

  "footer.html": "Built on the “anxiety × avoidance” two-dimension model widely used in attachment research; questions are the freely available ECR-RS scale (Fraley, Heffernan, Vicary &amp; Brumbaugh, 2011). The attachment-topography exercise is discussed in detail in Dr. Amir Levine's book <em>Secure</em> (2026).<br>For education, self-reflection and book-club discussion only — not a clinical diagnosis. If something here troubles you, please seek professional support.",

  /* ECR-RS (Fraley et al., 2011) — freely available for research/education use */
  "questions": [
    "It helps to turn to this person in times of need.",
    "I usually discuss my problems and concerns with this person.",
    "I talk things over with this person.",
    "I find it easy to depend on this person.",
    "I don't feel comfortable opening up to this person.",
    "I prefer not to show this person how I feel deep down.",
    "I often worry that this person doesn't really care for me.",
    "I'm afraid this person may abandon me.",
    "I worry that this person won't care about me as much as I care about him or her.",
  ],

  "collabItems": [
    "This person keeps my well-being in mind.",
    "This person is willing both to give and to receive.",
    "The effort I put into this relationship is sustainable — it doesn't drain me.",
    "The relationship feels fair and balanced.",
    "In this relationship I feel heard, seen and valued.",
    "I make the other person feel heard, seen and valued too.",
    "This person doesn't freeze me out or blank me in our interactions.",
    "This person is open to other points of view and looks for common ground.",
    "This person has my back.",
    "The small everyday interactions (SIMIs) with this person are mostly positive.",
    "I feel emotionally steady in this relationship.",
    "This person doesn't deliberately do things to punish me or “teach me a lesson”.",
    "This person is CARRP with me (consistent, available, responsive, reliable, predictable).",
    "I am CARRP with this person.",
    "Overall, this person is worth continuing to invest in.",
  ],

  "styles": {
    secure:  {name:"Secure",
      desc:"Low anxiety, low avoidance. This relationship mostly lets you settle: you can move closer, keep your own pace, ask for what you need, and not have the bond occupy your attention all the time.",
      tip:"Notice the concrete interactions that create that steadiness: timely replies, explanations when plans change, repair after conflict, and enough predictability to let both people get on with life."},
    anxious: {name:"Anxious",
      desc:"High anxiety, low avoidance. This relationship easily takes hold of your attention: a late reply or small shift in tone can start the question of whether the other person still cares or might leave.",
      tip:"Settle your body first, then state the need plainly. Instead of asking whether you are asking for too much, watch whether the other person can respond, repair, and follow through with some consistency."},
    avoidant:{name:"Avoidant",
      desc:"Low anxiety, high avoidance. When this relationship moves closer, distance may feel safer: saying less, replying later, or keeping needs private can become ways to stay in control.",
      tip:"Distance can protect you, but if the other person only experiences withdrawal, the bond becomes harder to steady. Start with small signals: explain briefly, acknowledge what happened, or agree on when to return to the conversation."},
    fearful: {name:"Fearful-avoidant",
      desc:"High anxiety and high avoidance. This relationship activates both wishes at once: to come close and to get away. Closeness can feel risky; distance can feel like loss.",
      tip:"You do not have to force immediate trust or make a dramatic exit. Start by separating what genuinely creates safety from what only quiets panic for a moment. If the push-pull pattern is affecting daily life, professional support can help."},
  },
},
};

/* 取字串 · translate */
function t(key){
  const d = I18N[LANG] || I18N.zh;
  return (key in d) ? d[key] : (I18N.zh[key] !== undefined ? I18N.zh[key] : key);
}
/* 帶參數 · with {placeholders} */
function tp(key, vars){
  let s = t(key);
  for(const k in vars) s = s.split("{"+k+"}").join(vars[k]);
  return s;
}
function setLang(lang){
  LANG = lang;
  try{ localStorage.setItem(LANG_KEY, lang); }catch(e){}
  document.documentElement.lang = t("html.lang");
}
/* 套用到帶 data-i18n 屬性的靜態元素 */
function applyI18n(){
  document.documentElement.lang = t("html.lang");
  document.title = t("app.title");
  document.querySelectorAll("[data-i18n]").forEach(el=>{ el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(el=>{ el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{ el.placeholder = t(el.dataset.i18nPh); });
}
