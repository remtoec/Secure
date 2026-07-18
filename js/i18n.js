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

  "landing.eyebrow": "書識圈 ×《Secure》讀書會",
  "landing.title": "每段關係，都有自己的座標",
  "landing.body": "依附系統的工作很簡單：人腦隨時在確認，親近的人此刻找不找得到、靠不靠得住。答案穩定，人就放得開，去冒險、去專心做自己的事；答案飄忽，注意力就被抽走，用來查看訊息、猜語氣、盤算下一步。Levine 常用小孩做例子：照顧者在房間，小孩自顧自玩玩具；照顧者一走開，玩具立刻失去吸引力。大人的機制相同，只是對象換了人。<br><br>研究用兩條軸描述你在一段關係中的位置：<strong>焦慮</strong>，你多常擔心對方不夠在乎你；<strong>迴避</strong>，你依賴對方時有多自在。你對媽媽、對伴侶、對好友，可以各自落在不同的位置；成人依附與童年的關聯亦不足一成，位置會隨經驗移動。所以這個工具逐段關係測量，並讓你隔一段時間重測，把移動畫在同一張圖上。",
  "landing.start": "開始測驗 →",
  "landing.viewMap": "查看我的地形圖",
  "landing.privacyTitle": "🔒 你的私隱",
  "landing.privacyBody": "無需登入、無需帳號：所有紀錄<strong>只儲存在此裝置的瀏覽器內</strong>，不會上傳到任何伺服器，連名稱也不會離開你的裝置。想備份、轉用新裝置，或與書友互相比較，隨時可以在「紀錄」頁<strong>匯出／匯入</strong>資料檔。",
  "landing.howTitle": "可以怎樣使用？",
  "landing.howBody": "<strong>逐段關係測</strong>：伴侶、媽媽、爸爸、好友、同事，每人一種顏色，畫在同一張圖上。<br><strong>隔期重測</strong>：關係變了，位置會移動，圖上會連出軌跡。<br><strong>關係檢核</strong>：15 條題目，檢視一段關係經不經得起投入，適合讀書會逐條討論。",
  "landing.disclaimer": "本工具僅供教育、自我了解及讀書會討論之用，並非臨床診斷。",

  "home.title": "開始新測驗",
  "home.body": "就<strong>一段特定關係</strong>回答 9 條題目。想到誰就測誰；同一個人隔一段時間再測，可以看到位置的移動。",
  "home.q1": "1 · 這次評估的是哪一段關係？",
  "home.q2": "2 · 為這位對象改個名稱或代號",
  "home.namePh": "例如：媽媽、阿明、太太⋯⋯",
  "home.nameHint": "名稱只儲存在你自己的裝置上，不會上傳到任何地方。",
  "home.retestTitle": "或：為已有的對象重測",
  "home.start": "開始作答 →",
  "home.times": "次",
  "home.stylesTitle": "四種依附風格",
  "home.stylesBody": "<strong>安全型</strong>：擔心少，靠近也自在。可以依賴對方，也接得住對方的依賴；吵完架，往往是先道歉的那一個。<br><strong>焦慮型</strong>：對關係的變化極敏感，別人未察覺的裂縫你先看見。代價是訊息一慢、語氣一冷，你就開始反覆檢查和解讀，很難停下來。<br><strong>迴避型</strong>：靠自己最安心。事情自己解決，情緒自己消化；對方想再走近一步，你會本能地退半步。<br><strong>恐懼迴避型</strong>：想靠近時怕受傷，退開後又掛念。兩股力同時拉，最耗神。",
  "home.stylesNote": "成人依附與童年的關聯不足一成，其餘來自後來的關係經驗。位置會移動，所以值得隔一段時間再量一次。",

  "quiz.who": "評估對象：{name}（{type}）",
  "quiz.qnum": "第 {n} 題／共 9 題",
  "quiz.prev": "← 上一題",
  "quiz.quit": "離開測驗",
  "quiz.anchorLow": "非常不同意",
  "quiz.anchorMid": "中立",
  "quiz.anchorHigh": "非常同意",
  "scaleLabels": ["非常不同意","不同意","有點不同意","中立／不確定","有點同意","同意","非常同意"],
  "scale5Labels": ["非常不同意","不同意","一般","同意","非常同意"],
  "quiz.specificReminder": "請根據你與這一位對象的關係作答，而不是整體人際關係。",
  "quiz.generalReminder": "請根據你在親密關係中的整體經驗作答。",
  "quiz.whoGeneral": "評估：你整體的依附傾向",

  "result.styleIs": "這段關係目前落在：",
  "result.styleIsGeneral": "你目前的整體位置：",
  "result.snapshotNote": "這是此刻的位置。關係變，位置會跟著移。",
  "result.snapshotNoteGeneral": "這是此刻的位置，會隨經驗移動。",
  "result.anxLabel": "焦慮分數（第 7–9 題平均，1–7）",
  "result.avdLabel": "迴避分數（第 1–6 題平均，1–7）",
  "result.tipTitle": "可以怎樣做",
  "result.nth": "這是你對「{name}」的第 {n} 次紀錄，到地形圖可以看到移動的軌跡。",
  "result.chartTitle": "你的依附地形圖",
  "result.chartNote": "虛線（4 分）為象限分界。左下角＝最安全。",
  "result.viewMap": "查看完整地形圖",
  "result.again": "再測另一段關係",

  "map.title": "依附地形圖",
  "map.body": "每種顏色代表一位對象；同一對象若有多次紀錄，會以線連接（淡色＝較早，實色＝最新），讓你看到關係隨時間的移動。點按圖上的點可查看詳情。",
  "map.saveImg": "🖼 將地形圖儲存為圖片",
  "map.bookTip": "隔幾個月回來重測，或加入新的對象。一個點移動的方向，通常比單次結果更有參考價值。",
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
  "collab.body": "《Secure》書末的 15 條檢核題（1 非常不同意 – 5 非常同意）。<strong>CARRP</strong> 問的是一個人是否一致（Consistent）、可得（Available）、有回應（Responsive）、可靠（Reliable）、可預測（Predictable）；<strong>SIMIs</strong> 指日常那些看似微不足道的小互動。這 15 條題目，檢視的就是這兩樣東西在這段關係中的狀態。",
  "collab.whoTitle": "評估對象",
  "collab.whoPh": "這段關係的對象（例如：阿明）",
  "collab.calc": "計算總分",
  "collab.clear": "開始新的檢核",
  "collab.unanswered": "還有題目未作答。",
  "collab.unnamed": "未命名",
  "collab.resultLabel": "「{name}」的安全關係總分",
  "collab.bandHigh": "大部分指標都拿到高分。這段關係經得起投入，繼續用 CARRP 的方式維持。",
  "collab.bandMid": "基礎不差，但有幾題分數偏低。逐題看回去，那幾題就是要修補的位置。",
  "collab.bandLow": "多項安全指標偏低。書中的次序是：先用 CARRP 的方式修補日常互動；認真試過仍沒有改善，就調低音量，降低這段關係的優先次序。",
  "collab.bandNote": "分界僅供參考，重點是逐題檢視：哪些範疇強？哪些弱？（書中原表只計總分。）",
  "collab.anchorLow": "非常不同意", "collab.anchorHigh": "非常同意",
  "collab.historyTitle": "過往檢核紀錄",
  "collab.confirmDel": "刪除這筆檢核紀錄？",

  "footer.html": "本工具採用依附研究廣泛使用的「焦慮 × 迴避」兩維度模型，題目為可自由使用的研究量表 ECR-RS（Fraley, Heffernan, Vicary &amp; Brumbaugh, 2011）之中文改寫版；「依附地形圖」的做法在 Amir Levine 醫生的著作《Secure》(2026) 中有詳細討論。<br>本工具僅供教育、自我了解及讀書會討論之用，並非臨床診斷。如有困擾，請尋求專業協助。",

  "questions": [
    "當我有需要時，向這個人求助是有幫助的。",
    "我通常會跟這個人談我的困擾和憂慮。",
    "遇到事情，我會找這個人商量。",
    "我覺得依靠這個人是容易的。",
    "我不太願意向這個人打開心扉。",
    "我寧願不讓這個人知道我內心深處的感受。",
    "我常常擔心這個人並不真正關心我。",
    "我害怕這個人可能會離開我。",
    "我擔心這個人不會像我重視他／她一樣重視我。",
  ],

  "questionsGeneral": [
    "當我有需要時，向親近的人求助是有幫助的。",
    "我通常會跟親近的人談我的困擾和憂慮。",
    "遇到事情，我會找親近的人商量。",
    "我覺得依靠別人是容易的。",
    "我不太願意向別人打開心扉。",
    "我寧願不讓別人知道我內心深處的感受。",
    "我常常擔心親近的人並不真正關心我。",
    "我害怕親近的人可能會離開我。",
    "我擔心別人對我的重視，不如我對他們的重視。",
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
      desc:"焦慮低、迴避也低。在這段關係裏，你不用花力氣確認對方走不走，省下來的注意力可以放回生活。有事直接說，對方也接得住。",
      descGeneral:"焦慮低、迴避也低。整體而言，你不用花太多力氣確認別人走不走，注意力可以放在生活本身。",
      tip:"這種穩定靠日常維持：對方需要時在場、有回應、說到做到（書中簡稱 CARRP）。Levine 有一條吵架規則值得試：一次只准一個人發脾氣，另一個負責穩住場面。你保持穩定，身邊的人也會慢慢安定下來。"},
    anxious: {name:"焦慮型",
      desc:"焦慮高、迴避低。你想靠近這個人，但一直在確認：他在乎我嗎？今晚會回覆嗎？別人看不見的細節你都看見，然後開始解讀，停不下來。",
      descGeneral:"焦慮高、迴避低。整體而言，你對關係的變化很敏感，常常在確認自己在別人心中的位置，也容易被這件事消耗。",
      tip:"你的敏感是真的：關係出問題，你通常最早知道。消耗你的是後面那段：試探、發脾氣或冷戰，事後又後悔（Levine 稱之為抗議行為）。下次跳過試探，直接講需要，然後看對方的反應。可靠的人會用行動讓你放心。如果需要已經講得清楚，幾個月後你仍然在猜，問題就未必在你的焦慮。"},
    avoidant:{name:"迴避型",
      desc:"焦慮低、迴避高。你習慣凡事自己來：問題自己處理，情緒自己消化。這個人想再靠近，你會覺得空間被壓縮，自然退開。",
      descGeneral:"焦慮低、迴避高。整體而言，你最信任自己；別人走得太近，你會自然讓出距離。",
      tip:"需要空間有它的來歷，不必自責。要留意的是下一步：對方把退開讀成拒絕，於是追得更緊，你就退得更遠。Levine 建議由最小的互動入手：訊息當日回，或講一件今天真正在意的事。距離仍然由你控制，只是讓對方知道你在。"},
    fearful: {name:"恐懼迴避型",
      desc:"焦慮和迴避都高。靠近的時候怕受傷，退開之後又掛念。兩種反應都在保護你，只是方向相反，所以特別累。",
      descGeneral:"焦慮和迴避都高。整體而言，你想靠近又怕受傷，退開了又掛念，經常在兩種反應之間來回。",
      tip:"這種拉扯通常有來歷，很多時和過去被傷害的經驗有關。先在你最穩定的一段關係裏練習：說一句真話，看對方接不接得住；接得住，下次再多說一點。如果拉扯持續影響生活，找專業人士談一次是值得的。"},
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

  "landing.eyebrow": "Bookfort × Secure book club",
  "landing.title": "Every relationship has its own coordinates",
  "landing.body": "Attachment is a safety system. The brain keeps checking whether the people close to us can be reached and counted on. When the answer is steady, attention is freed for work, play and risk; when it wavers, attention drains into re-reading messages and decoding tone. Levine's example is a toddler: while the caregiver is in the room, the toys are fascinating; the moment she leaves, they aren't. Adults run the same circuit, with different people.<br><br>Research locates you in a relationship along two axes: <strong>anxiety</strong> — how often you worry the other person doesn't care enough; <strong>avoidance</strong> — how comfortable you are depending on them. You can hold different positions with your mum, your partner and your best friend, and less than a tenth of adult attachment traces back to childhood. So this tool measures one relationship at a time, and lets you retest later to draw the movement on one map.",
  "landing.start": "Start the quiz →",
  "landing.viewMap": "View my map",
  "landing.privacyTitle": "🔒 Your privacy",
  "landing.privacyBody": "No login, no account — every record is stored <strong>only in this device's browser</strong>. Nothing is uploaded anywhere; even the names never leave your phone. To back up, move to a new device, or compare with friends, use <strong>export / import</strong> on the Records page anytime.",
  "landing.howTitle": "How to use it",
  "landing.howBody": "<strong>One relationship at a time</strong>: partner, mum, dad, best friend, colleague — one colour each, on one map.<br><strong>Retest later</strong>: when a relationship changes, its position moves, and the map draws the path.<br><strong>Relationship check</strong>: 15 items on whether a relationship holds up under investment — good for going through one by one at book club.",
  "landing.disclaimer": "For education, self-reflection and book-club discussion only — not a clinical diagnosis.",

  "home.title": "Start a new quiz",
  "home.body": "Answer 9 questions about <strong>one specific relationship</strong>. Test whoever comes to mind; retest the same person later to see the movement.",
  "home.q1": "1 · Which relationship are you assessing?",
  "home.q2": "2 · Give this person a name or nickname",
  "home.namePh": "e.g. Mum, Alex, my wife…",
  "home.nameHint": "Names are stored only on your own device and never uploaded.",
  "home.retestTitle": "Or: retest someone you've assessed before",
  "home.start": "Begin →",
  "home.times": "record(s)",
  "home.stylesTitle": "The four attachment styles",
  "home.stylesBody": "<strong>Secure</strong>: worries little, comfortable up close. Can depend and be depended on; often the first to apologise after a fight.<br><strong>Anxious</strong>: finely tuned to change — you spot cracks in a relationship before anyone else. The cost: a slow reply or a cool tone starts a loop of checking and re-reading.<br><strong>Avoidant</strong>: safest relying on yourself. Problems solved alone, feelings processed alone; when someone steps closer, you step back.<br><strong>Fearful-avoidant</strong>: wants closeness and braces against it at once. Both pulls protect you, in opposite directions.",
  "home.stylesNote": "Less than a tenth of adult attachment traces back to childhood; the rest is built from later relationships. Positions move, which is why it's worth measuring again after a while.",

  "quiz.who": "Assessing: {name} ({type})",
  "quiz.qnum": "Question {n} of 9",
  "quiz.prev": "← Back",
  "quiz.quit": "Exit quiz",
  "quiz.anchorLow": "Strongly disagree",
  "quiz.anchorMid": "Neutral",
  "quiz.anchorHigh": "Strongly agree",
  "scaleLabels": ["Strongly disagree","Disagree","Slightly disagree","Neutral / unsure","Slightly agree","Agree","Strongly agree"],
  "scale5Labels": ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"],
  "quiz.specificReminder": "Answer for this specific person, not your relationships in general.",
  "quiz.generalReminder": "Answer from your overall experience in close relationships.",
  "quiz.whoGeneral": "Assessing: your overall attachment pattern",

  "result.styleIs": "Right now, this relationship lands in: ",
  "result.styleIsGeneral": "Right now, your overall position: ",
  "result.snapshotNote": "A position, taken today. When the relationship moves, so does the dot.",
  "result.snapshotNoteGeneral": "A position, taken today; it moves with experience.",
  "result.anxLabel": "Anxiety score (mean of Q7–9, 1–7)",
  "result.avdLabel": "Avoidance score (mean of Q1–6, 1–7)",
  "result.tipTitle": "What you can do",
  "result.nth": "This is record #{n} for “{name}” — check the map to see the trajectory.",
  "result.chartTitle": "Your attachment topography",
  "result.chartNote": "Dashed lines (score 4) mark the quadrant boundaries. Bottom-left = most secure.",
  "result.viewMap": "View the full map",
  "result.again": "Assess another relationship",

  "map.title": "Attachment topography",
  "map.body": "Each colour is one person; repeated records are joined by a line (faded = earlier, solid = latest) so you can watch a relationship move over time. Tap a dot for details.",
  "map.saveImg": "🖼 Save map as an image",
  "map.bookTip": "Come back and retest after a few months, or add someone new. The direction a dot moves often says more than any single result.",
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
  "collab.body": "15 items (1 strongly disagree – 5 strongly agree) from the end of <em>Secure</em>. <strong>CARRP</strong> asks whether a person is consistent, available, responsive, reliable and predictable; <strong>SIMIs</strong> are the small everyday interactions. The checklist reads how both are doing in this relationship.",
  "collab.whoTitle": "Who are you assessing?",
  "collab.whoPh": "The person in this relationship (e.g. Alex)",
  "collab.calc": "Calculate total",
  "collab.clear": "Start a new checklist",
  "collab.unanswered": "Some items are still unanswered.",
  "collab.unnamed": "Unnamed",
  "collab.resultLabel": "Security total for “{name}”",
  "collab.bandHigh": "Most of the security indicators are green. This relationship holds up under investment — keep maintaining it the CARRP way.",
  "collab.bandMid": "The foundation is decent, but a few items scored low. Go back through them; those items are where the repair work is.",
  "collab.bandLow": "Several indicators are low. The book's order of operations: repair the everyday interactions the CARRP way first; if a real attempt changes nothing, turn the volume down and lower this relationship's priority.",
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

  "questionsGeneral": [
    "It helps to turn to the people I'm close to in times of need.",
    "I usually discuss my problems and concerns with the people I'm close to.",
    "I talk things over with the people in my life.",
    "I find it easy to depend on others.",
    "I don't feel comfortable opening up to others.",
    "I prefer not to show others how I feel deep down.",
    "I often worry that the people I care about don't really care for me.",
    "I'm afraid the people I'm close to may abandon me.",
    "I worry that others won't care about me as much as I care about them.",
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
      desc:"Low anxiety, low avoidance. In this relationship you don't spend energy checking whether the other person is about to leave; that attention goes back into living. You say things directly, and they land.",
      descGeneral:"Low anxiety, low avoidance. Overall, you spend little energy checking where you stand with people, so attention goes back into your own life.",
      tip:"Steadiness is maintained day by day: be there when it matters, respond, do what you said (the book's shorthand is CARRP). Levine's argument rule is worth trying: only one person gets to be upset at a time — the other holds the room steady. When you stay steady, people around you settle too."},
    anxious: {name:"Anxious",
      desc:"High anxiety, low avoidance. You want this person close, and you keep checking: do they care? Will they reply tonight? You notice details others miss, then read into them, and it's hard to stop.",
      descGeneral:"High anxiety, low avoidance. Overall, you're quick to sense change in your relationships and often check where you stand — which is exactly what wears you out.",
      tip:"Your sensitivity is real: when something is wrong in a relationship, you usually know first. What drains you is the next part — testing, blowing up or going cold, then regretting it (Levine calls this protest behaviour). Next time, skip the test and say the need directly, then watch the response. Reliable people reassure you with actions. If you've said the need plainly and months later you're still guessing, the problem may no longer be your anxiety."},
    avoidant:{name:"Avoidant",
      desc:"Low anxiety, high avoidance. You handle things yourself: problems solved alone, feelings processed alone. When this person steps closer, the space feels tight and you naturally pull back.",
      descGeneral:"Low anxiety, high avoidance. Overall, you trust yourself most; when people come too close, you instinctively make room.",
      tip:"Needing space has its history; no need for guilt. The risk is what happens next: they read your distance as rejection, press harder, you retreat further. Levine suggests starting with the smallest interactions — reply the same day, mention one thing that actually bothered you today. You still control the distance; they just know you're there."},
    fearful: {name:"Fearful-avoidant",
      desc:"Anxiety and avoidance both high. Coming close, you brace for the hurt; pulling away, you miss them. Both reactions protect you, just in opposite directions — which is why it's so tiring.",
      descGeneral:"Anxiety and avoidance both high. Overall, you move between wanting closeness and bracing against it, and the back-and-forth is what exhausts you.",
      tip:"This push-pull usually has a history, often in past hurt. Practise in your steadiest relationship first: say one true thing and see if it's received; if it is, say a little more next time. If the push-pull keeps disrupting your life, one conversation with a professional is a worthwhile step."},
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
