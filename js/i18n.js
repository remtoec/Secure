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
  "landing.body": "依附研究數十年來的一個重要發現：依附風格並非一個固定的「人格標籤」——你面對媽媽時可以是安全型，面對伴侶時卻可能偏向焦慮型。Amir Levine 在《Secure》一書中對此有深入淺出的討論。這個小工具採用研究中廣泛使用的兩個維度，透過 9 條簡單題目，為你和每一位重要的人計算<strong>焦慮</strong>與<strong>迴避</strong>兩個分數，繪成一張屬於你的「依附地形圖」；隔一段時間重測，更可以看到每段關係隨時間移動的軌跡。",
  "landing.start": "開始測驗 →",
  "landing.viewMap": "查看我的地形圖",
  "landing.privacyTitle": "🔒 你的私隱",
  "landing.privacyBody": "無需登入、無需帳號——所有紀錄<strong>只儲存在此裝置的瀏覽器內</strong>，不會上傳到任何伺服器，連名字也不會離開你部機。想備份、轉用新裝置，或與書友互相比較，隨時可以在「紀錄」頁<strong>匯出／匯入</strong>資料檔。",
  "landing.howTitle": "可以點樣用？",
  "landing.howBody": "<strong>逐段關係測</strong>：伴侶、媽媽、爸爸、好友、同事⋯⋯每位對象一種顏色，全部畫在同一張圖上。<br><strong>隔期重測</strong>：關係會變，座標也會移動——地形圖會為你連起每次紀錄的軌跡。<br><strong>關係檢核</strong>：15 條「這段關係值得投入嗎？」檢核表，讀書會討論一流。",
  "landing.disclaimer": "本工具僅供教育、自我了解及讀書會討論之用，並非臨床診斷。",

  "home.title": "開始新測驗",
  "home.body": "就<strong>某一段特定關係</strong>回答 9 條題目（1–7 分）。你可以為不同的人分別作答，也可以為已有的對象重測，觀察變化。",
  "home.q1": "1 · 這次評估的是哪一段關係？",
  "home.q2": "2 · 為這位對象改個名稱或代號",
  "home.namePh": "例如：媽媽、阿明、太太⋯⋯",
  "home.nameHint": "名稱只儲存在你自己的裝置上，不會上傳到任何地方。",
  "home.retestTitle": "或：為已有的對象重測",
  "home.start": "開始作答 →",
  "home.times": "次",
  "home.stylesTitle": "四種依附風格",
  "home.stylesBody": "<strong>安全型</strong>：低焦慮、低迴避——親密自在，信任對方也信任自己。<br><strong>焦慮型</strong>：高焦慮、低迴避——渴望親近，卻常擔心對方不夠在乎自己。<br><strong>迴避型</strong>：低焦慮、高迴避——重視獨立，傾向與人保持情感距離。<br><strong>恐懼迴避型</strong>：高焦慮、高迴避——既渴望親密又害怕受傷，時近時遠。",
  "home.stylesNote": "依附風格並非「與生俱來、一成不變」——它會隨關係、隨時間改變。這正是本工具讓你反覆記錄的原因。",

  "quiz.who": "評估對象：{name}（{type}）",
  "quiz.qnum": "第 {n} 題／共 9 題",
  "quiz.prev": "← 上一題",
  "quiz.quit": "離開測驗",
  "quiz.anchorLow": "1 非常不同意",
  "quiz.anchorHigh": "7 非常同意",

  "result.styleIs": "這段關係目前屬於：",
  "result.anxLabel": "焦慮分數（第 7–9 題平均，1–7）",
  "result.avdLabel": "迴避分數（第 1–6 題平均，1–7）",
  "result.tipTitle": "給你的貼士",
  "result.nth": "這是你對「{name}」的第 {n} 次紀錄——到地形圖看看變化軌跡。",
  "result.chartTitle": "你的依附地形圖",
  "result.chartNote": "虛線（4 分）為象限分界。左下角＝最安全。",
  "result.viewMap": "查看完整地形圖",
  "result.again": "再測另一段關係",

  "map.title": "依附地形圖",
  "map.body": "每種顏色代表一位對象；同一對象若有多次紀錄，會以線連接（淡色＝較早，實色＝最新），讓你看到關係隨時間的移動。點按圖上的點可查看詳情。",
  "map.saveImg": "🖼 將地形圖儲存為圖片",
  "map.bookTip": "《Secure》提示：你可以隨時回到這張圖，加入新的對象，或檢視你與某人的依附風格是否已隨時間改變。",
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

  "collab.title": "這段關係值得投入嗎？——安全關係檢核表",
  "collab.body": "《Secure》書末的 15 條檢核題（1 非常不同意 – 5 非常同意），幫你檢視一段關係是否 <strong>CARRP</strong>——一致（Consistent）、可得（Available）、有回應（Responsive）、可靠（Reliable）、可預測（Predictable）——以及日常微小互動（SIMIs）的品質。",
  "collab.whoTitle": "評估對象",
  "collab.whoPh": "這段關係的對象（例如：阿明）",
  "collab.calc": "計算總分",
  "collab.unanswered": "還有題目未作答。",
  "collab.unnamed": "未命名",
  "collab.resultLabel": "「{name}」的安全關係總分",
  "collab.bandHigh": "這段關係展現出高度的安全特質，值得繼續投入。",
  "collab.bandMid": "這段關係有不錯的基礎，但部分範疇值得留意——看看哪幾題分數偏低。",
  "collab.bandLow": "這段關係在多個安全指標上偏低。書中建議：先嘗試 CARRP 式介入，若持續沒有改善，可考慮「調低音量、降低優先次序」。",
  "collab.bandNote": "分界僅供參考，重點是逐題檢視：哪些範疇強？哪些弱？（書中原表只計總分。）",
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
    "這個人在互動中不會刻意冷落我、排擠我，或對我木無表情。",
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
      desc:"低焦慮、低迴避。你在這段關係中能自在地親近對方、表達需要，也不太擔心被拋棄。這是最有利雙方成長的依附狀態。",
      tip:"繼續保持 CARRP——一致、可得、有回應、可靠、可預測。安全感是會傳染的：你的穩定也會令身邊的人更安全。"},
    anxious: {name:"焦慮型",
      desc:"高焦慮、低迴避。你渴望親近這個人，但常擔心對方不夠在乎你、可能離開你，情緒容易隨對方的一舉一動起伏。",
      tip:"焦慮型的敏銳其實是「知覺超能力」。留意「抗議行為—後悔」循環；直接、平靜地說出需要，並觀察對方是否 CARRP——值得的人會用行動讓你安心。"},
    avoidant:{name:"迴避型",
      desc:"低焦慮、高迴避。你重視獨立和空間，不習慣向這個人打開心扉，親密貼近反而令你不自在。",
      tip:"需要距離並非罪過，但長期迴避會令對方被觸發、關係惡性循環。嘗試小步分享感受，主動給予微小而穩定的回應（正面的 SIMIs）。"},
    fearful: {name:"恐懼迴避型",
      desc:"高焦慮、高迴避。你既渴望親密又害怕受傷，於是時而靠近、時而抽離，關係中經常感到拉扯。",
      tip:"這往往與過往受傷的經驗有關。從最安全、最 CARRP 的關係開始練習信任；若困擾持續，尋求心理專業協助是很值得的投資。"},
  },
},

en: {
  "html.lang": "en",
  "app.title": "Attachment Topography",
  "app.club": "Bookfort 書識圈 · Secure Book Club",
  "btn.theme": "🌗 Theme",
  "btn.lang": "中",

  "nav.quiz": "Quiz", "nav.map": "Map", "nav.records": "Records", "nav.collab": "Checklist",

  "rel.general": "General attachment style", "rel.partner": "Partner", "rel.mother": "Mother", "rel.father": "Father",
  "rel.family": "Family", "rel.friend": "Friend", "rel.colleague": "Colleague", "rel.other": "Other",
  "rel.general.short": "General",

  "landing.eyebrow": "A Bookfort × Secure book-club tool",
  "landing.title": "Every relationship has its own coordinates",
  "landing.body": "A key finding from decades of attachment research: attachment style is not a fixed personality label — you can be secure with your mum yet lean anxious with your partner. Dr. Amir Levine discusses this in depth in <em>Secure</em>. This little tool uses the two dimensions widely used in the research — <strong>anxiety</strong> and <strong>avoidance</strong> — to score 9 short questions about one specific relationship and plot it on your personal “attachment topography” map. Retake it over time and watch each relationship move.",
  "landing.start": "Start the quiz →",
  "landing.viewMap": "View my map",
  "landing.privacyTitle": "🔒 Your privacy",
  "landing.privacyBody": "No login, no account — every record is stored <strong>only in this device's browser</strong>. Nothing is uploaded anywhere; even the names never leave your phone. To back up, move to a new device, or compare with friends, use <strong>export / import</strong> on the Records page anytime.",
  "landing.howTitle": "How to use it",
  "landing.howBody": "<strong>One relationship at a time</strong>: partner, mum, dad, best friend, colleague… each person gets a colour on the same map.<br><strong>Retake over time</strong>: relationships change and coordinates move — the map draws the trajectory between your records.<br><strong>Relationship checklist</strong>: a 15-item “is this relationship worth investing in?” check — great for book-club discussion.",
  "landing.disclaimer": "For education, self-reflection and book-club discussion only — not a clinical diagnosis.",

  "home.title": "Start a new quiz",
  "home.body": "Answer 9 questions (scored 1–7) about <strong>one specific relationship</strong>. You can assess different people separately, or retest someone to track change.",
  "home.q1": "1 · Which relationship are you assessing?",
  "home.q2": "2 · Give this person a name or nickname",
  "home.namePh": "e.g. Mum, Alex, my wife…",
  "home.nameHint": "Names are stored only on your own device and never uploaded.",
  "home.retestTitle": "Or: retest someone you've assessed before",
  "home.start": "Begin →",
  "home.times": "",
  "home.stylesTitle": "The four attachment styles",
  "home.stylesBody": "<strong>Secure</strong>: low anxiety, low avoidance — comfortable with closeness, trusting of both of you.<br><strong>Anxious</strong>: high anxiety, low avoidance — craves closeness but often worries the other person doesn't care enough.<br><strong>Avoidant</strong>: low anxiety, high avoidance — values independence and keeps emotional distance.<br><strong>Fearful-avoidant</strong>: high on both — longs for intimacy yet fears getting hurt, swinging near and far.",
  "home.stylesNote": "Attachment style is not fixed at birth — it shifts across relationships and over time. That's exactly why this tool lets you keep recording.",

  "quiz.who": "Assessing: {name} ({type})",
  "quiz.qnum": "Question {n} of 9",
  "quiz.prev": "← Back",
  "quiz.quit": "Exit quiz",
  "quiz.anchorLow": "1 Strongly disagree",
  "quiz.anchorHigh": "7 Strongly agree",

  "result.styleIs": "Right now, this relationship reads as: ",
  "result.anxLabel": "Anxiety score (mean of Q7–9, 1–7)",
  "result.avdLabel": "Avoidance score (mean of Q1–6, 1–7)",
  "result.tipTitle": "A tip for you",
  "result.nth": "This is record #{n} for “{name}” — check the map to see the trajectory.",
  "result.chartTitle": "Your attachment topography",
  "result.chartNote": "Dashed lines (score 4) mark the quadrant boundaries. Bottom-left = most secure.",
  "result.viewMap": "View the full map",
  "result.again": "Assess another relationship",

  "map.title": "Attachment topography",
  "map.body": "Each colour is one person; repeated records are joined by a line (faded = earlier, solid = latest) so you can watch a relationship move over time. Tap a dot for details.",
  "map.saveImg": "🖼 Save map as an image",
  "map.bookTip": "Tip from Secure: come back to this chart anytime to add new people, or to check whether your attachment style with someone has changed over time.",
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
  "collab.body": "15 check items (1 strongly disagree – 5 strongly agree) to review whether a relationship is <strong>CARRP</strong> — Consistent, Available, Responsive, Reliable, Predictable — and how the small everyday interactions (SIMIs) feel. Discussed in detail in <em>Secure</em>.",
  "collab.whoTitle": "Who are you assessing?",
  "collab.whoPh": "The person in this relationship (e.g. Alex)",
  "collab.calc": "Calculate total",
  "collab.unanswered": "Some items are still unanswered.",
  "collab.unnamed": "Unnamed",
  "collab.resultLabel": "Security total for “{name}”",
  "collab.bandHigh": "This relationship shows strongly secure qualities — worth continuing to invest in.",
  "collab.bandMid": "A decent foundation, but some areas deserve attention — look at which items scored low.",
  "collab.bandLow": "Several security indicators are low. The book's suggestion: try CARRP-style repairs first; if nothing improves, consider turning down the volume and lowering this relationship's priority.",
  "collab.bandNote": "The cut-offs are only a rough guide — the real value is reviewing item by item: where is this relationship strong, and where is it weak? (The book's original table only records a total.)",
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
      desc:"Low anxiety, low avoidance. In this relationship you're comfortable getting close, expressing needs, and you don't worry much about being left. This is the state that lets both people grow.",
      tip:"Keep being CARRP — consistent, available, responsive, reliable, predictable. Security is contagious: your steadiness makes the people around you more secure too."},
    anxious: {name:"Anxious",
      desc:"High anxiety, low avoidance. You crave closeness with this person but often worry they don't care enough or might leave, and your mood tracks their every move.",
      tip:"Anxious sensitivity is really a perceptual superpower. Watch the protest-behaviour → regret cycle; state your needs directly and calmly, and check whether this person is CARRP — the right people reassure you through action."},
    avoidant:{name:"Avoidant",
      desc:"Low anxiety, high avoidance. You value independence and space, rarely open up to this person, and too much closeness feels uncomfortable.",
      tip:"Needing distance is no crime, but chronic avoidance triggers the other person and feeds a vicious cycle. Try sharing feelings in small steps and offering small, steady positive responses (positive SIMIs)."},
    fearful: {name:"Fearful-avoidant",
      desc:"High anxiety and high avoidance. You long for intimacy yet fear getting hurt, so you swing between approaching and withdrawing, and the relationship often feels like a tug-of-war.",
      tip:"This pattern often traces back to past hurt. Practise trust starting from your safest, most CARRP relationship — and if the distress persists, professional support is a worthwhile investment."},
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
