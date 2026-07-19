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
  "landing.title": "你在不同關係裏，可能有不同的依附風格",
  "landing.body": "想像你剛出完差，收到伴侶的訊息：「看到後打給我，我們要談談。」你會先猜對方有好消息，還是已經生氣，甚至打算分手？也可能你沒有多想，忙着忙着便忘了回覆。老闆叫你回電話、朋友臨時取消晚飯，同一套反應也會出現。這些念頭並非隨機；依附風格會影響大腦怎樣判斷眼前的關係。<br><br>研究以兩條獨立的軸描述這些反應：<strong>焦慮</strong>，衡量你有多擔心對方會離開你，或並不愛你；<strong>迴避</strong>，衡量親近別人、依靠別人會令你多不自在。兩項分數都低，屬於安全型；兩項都高，屬於恐懼迴避型。你也許整體上偏向某一種風格，與媽媽、伴侶、朋友相處時卻落在不同位置。這個工具讓你分開測量，再把各段關係畫在同一張圖上。",
  "landing.start": "開始測驗 →",
  "landing.viewMap": "查看我的地形圖",
  "landing.privacyTitle": "🔒 你的私隱",
  "landing.privacyBody": "不用登入，也不用開帳號。所有紀錄<strong>只儲存在此裝置的瀏覽器內</strong>，不會上傳到伺服器；你輸入的名稱也不會離開這部裝置。如要備份、轉用新裝置，或在讀書會中自願分享，可到「紀錄」頁<strong>匯出／匯入</strong>資料檔。",
  "landing.howTitle": "怎樣使用",
  "landing.howBody": "<strong>分開測量</strong>：可以先看整體傾向，也可逐一測量伴侶、媽媽、爸爸、好友或同事；每位對象用一種顏色，畫在同一張圖上。<br><strong>日後再測</strong>：同一段關係可以出現不同結果；多次紀錄會連成一條路徑，方便比較。<br><strong>關係檢核</strong>：回答 15 條題目，看看雙方平日能否穩定出現、回應彼此、履行承諾，以及這段關係是否值得繼續投放心力。",
  "landing.disclaimer": "本工具僅供教育、自我了解及讀書會討論之用，並非臨床診斷。",

  "home.title": "開始新測驗",
  "home.body": "你可以先看<strong>整體依附傾向</strong>，也可以只看一段特定關係。每次回答 9 個陳述；日後再測同一對象，便能比較位置有沒有改變。",
  "home.q1": "1 · 這次想看整體傾向，還是哪一段關係？",
  "home.q2": "2 · 為這次結果輸入名稱或代號",
  "home.namePh": "例如：一般、媽媽、阿明、太太⋯⋯",
  "home.nameHint": "名稱只儲存在你自己的裝置上，不會上傳到任何地方。",
  "home.retestTitle": "或重測已有對象",
  "home.start": "開始作答 →",
  "home.recordOne": "次",
  "home.recordMany": "次",
  "home.stylesTitle": "四種依附風格",
  "home.stylesBody": "<strong>安全型</strong>：喜歡親近，也不容易把關係中的波動看成威脅。情緒受到影響時，別人通常很快就能令你平靜，你也較快原諒；有時卻會較遲察覺關係中的敵意或傷害。<br><strong>焦慮型</strong>：關係中的危險雷達很敏感。在不安全的環境裏，你可能比其他人更早發現問題；環境相對安全時，細微變化也可能令警報響起。<br><strong>迴避型</strong>：很重視獨立，習慣自己處理問題，也不喜歡別人為了滿足需要而走得太近。作者把這種步調比作流浪貓：奶可以先放下，親近要等牠準備好。<br><strong>恐懼迴避型</strong>：渴望親近，也提防親近可能帶來的傷害。有時單是靠近已經像一種威脅，於是寧願放棄關係的可能，也不想冒心碎的風險。",
  "home.stylesNote": "作者把依附風格放在焦慮與迴避兩條連續的軸上。你可能有一個整體傾向，面對不同的人時也會出現不同模式。訪談中，Levine 指童年依附只能解釋少於一成的成人依附差異；後來的經驗和其他因素仍會令位置改變。",

  "quiz.who": "評估對象：{name}（{type}）",
  "quiz.qnum": "第 {n} 題／共 9 題",
  "quiz.prev": "← 上一題",
  "quiz.quit": "離開測驗",
  "quiz.anchorLow": "非常不同意",
  "quiz.anchorMid": "中立",
  "quiz.anchorHigh": "非常同意",
  "scaleLabels": ["非常不同意","不同意","有點不同意","中立","有點同意","同意","非常同意"],
  "scale5Labels": ["非常不同意","不同意","中立","同意","非常同意"],
  "quiz.specificReminder": "請只想這一位對象：你在這段關係裏通常會怎樣反應？",
  "quiz.generalReminder": "請根據你對人際關係的整體想法和態度作答。",
  "quiz.whoGeneral": "評估：你整體的依附傾向",

  "result.styleIs": "這段關係這次的位置：",
  "result.styleIsGeneral": "這次量得的整體位置：",
  "result.snapshotNote": "這個結果記下你此刻在這段關係裏的反應。它不判定你或對方是怎樣的人；互動改變，分數也可能改變。",
  "result.snapshotNoteGeneral": "整體版記下你對人際關係的一般想法和態度。你與某一個人相處時，可能量得另一個位置；把兩種結果放在一起，便能看見整體傾向與特定關係有何異同。",
  "result.anxLabel": "焦慮分數（第 7–9 題平均，1–7）",
  "result.avdLabel": "迴避分數（第 1–6 題平均，1–7）",
  "result.tipTitle": "接下來可以留意甚麼",
  "result.nth": "這是你對「{name}」的第 {n} 次紀錄，到地形圖可以看到移動的軌跡。",
  "result.chartTitle": "你的依附地形圖",
  "result.chartNote": "兩條虛線以 4 分劃分四個象限；越接近左下角，焦慮與迴避分數越低。",
  "result.viewMap": "查看完整地形圖",
  "result.again": "再測另一段關係",

  "map.title": "依附地形圖",
  "map.body": "每種顏色代表一位對象。同一對象有多次紀錄時，系統會按日期把各點連起；淡色是較早的結果，實色是最新結果。你可以比較不同關係的位置，也可以查看同一段關係前後有沒有移動。點按圖上的點可查看詳情。",
  "map.saveImg": "🖼 將地形圖儲存為圖片",
  "map.bookTip": "作者建議日後可加入新的對象，也可為同一對象重測。每次結果都保留日期，讓你查看特定關係的依附位置有沒有隨時間改變。",
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

  "collab.title": "這段關係值得我繼續投入嗎？——安全關係檢核表",
  "collab.body": "《Secure》書末的 15 條檢核題（1＝非常不同意，5＝非常同意），逐項查看雙方平日怎樣相處。Levine 用 <strong>CARRP</strong> 概括讓人感到安全的五個條件：一致（Consistent）、可得（Available）、有回應（Responsive）、可靠（Reliable）、可預測（Predictable）。這些條件要在每天看來微小的互動（SIMIs）裏反覆出現，人才會逐漸感到安全。",
  "collab.whoTitle": "評估對象",
  "collab.whoPh": "這段關係的對象（例如：阿明）",
  "collab.calc": "計算總分",
  "collab.clear": "開始新的檢核",
  "collab.unanswered": "還有題目未作答。",
  "collab.unnamed": "未命名",
  "collab.resultLabel": "「{name}」的安全關係總分",
  "collab.lowTitle": "3 分或以下的題目",
  "collab.lowIntro": "先回看這些題目：相同情況多久出現一次？你有沒有把需要說清楚？對方之後的回應有沒有改變？",
  "collab.allHigh": "這次十五題都選了 4 或 5 分。下方總分只作紀錄。",
  "collab.bookOrder": "Levine 建議先把 CARRP 帶進日常互動，也把較多注意力留給能穩定支持你的人。若一段關係持續做不到這些條件，不一定要完全切斷；你可以降低它在生活中的優先次序。",
  "collab.totalNote": "原表只記總分，沒有訂立及格線；本工具因此不會替這段關係判定合格或不合格。",
  "collab.anchorLow": "非常不同意", "collab.anchorHigh": "非常同意",
  "collab.historyTitle": "過往檢核紀錄",
  "collab.confirmDel": "刪除這筆檢核紀錄？",

  "footer.html": "本工具採用依附研究廣泛使用的「焦慮 × 迴避」兩維度模型。題目取自可自由使用的研究量表 ECR-RS（Fraley, Heffernan, Vicary &amp; Brumbaugh, 2011），中文題目為依照英文原句所作的轉譯；「依附地形圖」的做法在 Amir Levine 醫生的著作《Secure》(2026) 中有詳細討論。關於安全系統、CARRP、SIMIs 及安全關係的解說，另轉述 Levine 在 University of Chicago <em>Big Brains</em> 的訪談。<br>本工具僅供教育、自我了解及讀書會討論之用，並非臨床診斷。如有困擾，請尋求專業協助。",

  "questions": [
    "我有需要時，找這個人通常能幫上忙。",
    "我通常會跟這個人談我的困擾和憂慮。",
    "遇到事情，我會找這個人商量。",
    "我很容易就能依靠這個人。",
    "我不太自在把心裏的事告訴這個人。",
    "我寧願不讓這個人知道我內心真正的感受。",
    "我常常擔心這個人並不真正關心我。",
    "我害怕這個人可能會拋下我。",
    "我擔心自己在乎這個人的程度，比對方在乎我更多。",
  ],

  "questionsGeneral": [
    "我有需要時，找別人通常能幫上忙。",
    "我通常會跟別人談我的困擾和憂慮。",
    "遇到事情，我會找人商量。",
    "我很容易就能依靠別人。",
    "我不太自在把心裏的事告訴別人。",
    "我寧願不讓別人知道我內心真正的感受。",
    "我常常擔心別人並不真正關心我。",
    "我害怕別人可能會拋下我。",
    "我擔心自己在乎別人的程度，比別人在乎我更多。",
  ],

  "collabItems": [
    "這個人把我過得好不好放在心上。",
    "這個人願意付出，也願意接受我的付出。",
    "我能夠持續為這段關係付出，不會因此耗盡自己。",
    "我覺得這段關係公平而平衡。",
    "在這段關係裏，對方會聽我說，也會留意我、重視我。",
    "我也會聽對方說、留意對方，讓對方感到受重視。",
    "相處時，這個人不會故意冷落或排擠我，也不會用沉默回應我。",
    "這個人願意聽不同意見，也願意一起尋找共識。",
    "遇到事情時，這個人會支持我。",
    "我與這個人的日常微小互動（SIMIs）大多友善、令人安心。",
    "在這段關係裏，我的情緒大致穩定。",
    "這個人不會刻意做些事來懲罰我或「給我一個教訓」。",
    "這個人與我相處時，通常一致、可得、有回應、可靠、可預測（CARRP）。",
    "我與這個人相處時，也做到一致、可得、有回應、可靠、可預測（CARRP）。",
    "整體而言，這個人值得我繼續投入。",
  ],

  "styles": {
    secure:  {name:"安全型",
      desc:"焦慮低、迴避也低。在這段關係裏，你喜歡親近，也不容易把波動看成危險。情緒受影響時，對方通常很快就能令你平靜，你也較快原諒和繼續生活；代價是有時會較遲察覺關係中的敵意或傷害。",
      descGeneral:"焦慮低、迴避也低。整體而言，你喜歡親近，也不容易把關係中的波動看成危險。別人通常很快就能令你平靜，你也較快原諒，有時卻會較遲發現關係裏的威脅。",
      tip:"安全感要靠日常互動維持：在重要時刻出現、回應對方、履行答應過的事。遇到衝突時，Levine 建議先由情緒較平靜的一方幫另一方平靜下來；如果兩邊都激動，便彼此道歉，再問對方此刻需要甚麼。"},
    anxious: {name:"焦慮型",
      desc:"焦慮高、迴避低。在這段關係裏，你的危險雷達很敏感，細微變化也會引起注意。環境確有危險時，這種敏感能讓你較早發現威脅；環境相對安全時，警報也可能在威脅很小的時候響起。",
      descGeneral:"焦慮高、迴避低。整體而言，你很快察覺關係可能出問題。這種敏感在危險環境裏有用；環境相對安全時，你仍可能花很多注意力確認別人是否在乎你。",
      tip:"作者建議借助你已有的安全關係。先找出那些聯絡有交代、需要時找得到、行動穩定的人，把較多時間和注意力留給他們。當身邊的關係較少反覆的威脅，你的危險雷達才有機會慢慢安靜下來。"},
    avoidant:{name:"迴避型",
      desc:"焦慮低、迴避高。你仍然想要關係，卻很重視獨立，也習慣自己處理問題。這個人走得太近或依賴你時，你會感到不自在，於是用大大小小的方法保留距離。",
      descGeneral:"焦慮低、迴避高。整體而言，你相信每個人應照顧好自己，也習慣靠自己解決問題。親近或依賴增加時，你較容易感到不自在。",
      tip:"先留意自己平日怎樣為親近設下路障。Levine 把每天看來微不足道的小互動視為改變的機會；你可以在這些互動裏練習一致、可得、有回應、可靠和可預測，讓對方逐漸知道何時找得到你。"},
    fearful: {name:"恐懼迴避型",
      desc:"焦慮和迴避都高。你渴望親近，也提防親近可能帶來的傷害。有時單是靠近已經像一種威脅，於是你寧願放棄一段關係的可能，也不想承受心碎；在已有的關係裏，你容易受傷，也容易把人推開。",
      descGeneral:"焦慮和迴避都高。整體而言，你渴望親近，也把親近視為可能的威脅。你可能保持距離，心裏卻仍然因缺少連結而難受。",
      tip:"先從你已經較有安全感的一段關係開始。留意對方是否持續出現、回應你、履行承諾；這些經驗可以成為往後建立安全感的材料。每次只增加一點親近，再根據對方實際的回應決定下一步。"},
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
  "landing.title": "Your attachment style can differ from one relationship to another",
  "landing.body": "Imagine returning from an important trip to a message from your partner: “Call me when you get this. We need to talk.” Do you expect good news, assume they are angry or about to end the relationship, or think so little of it that you forget to call? The same pattern can appear when your boss asks you to call or a friend cancels dinner. These first thoughts are not random; attachment style helps shape how the brain reads a relationship.<br><br>Research describes these responses along two independent dimensions: <strong>anxiety</strong>, how much you worry about being abandoned or unloved; and <strong>avoidance</strong>, how uncomfortable closeness and dependence make you. Low scores on both dimensions indicate secure attachment; high scores on both indicate fearful-avoidant attachment. You may have one general pattern yet respond differently with your mother, partner, or friend. This tool measures those relationships separately and plots them on one map.",
  "landing.start": "Start the quiz →",
  "landing.viewMap": "View my map",
  "landing.privacyTitle": "🔒 Your privacy",
  "landing.privacyBody": "No login, no account. Every record is stored <strong>only in this device's browser</strong>; nothing is uploaded, and the names you type never leave the device. To back up, move to a new device, or share at book club if you choose to, use <strong>export / import</strong> on the Records page.",
  "landing.howTitle": "How to use it",
  "landing.howBody": "<strong>Measure separately</strong>: assess your general pattern, then a partner, mum, dad, best friend, or colleague; each person gets one colour on the same map.<br><strong>Retest later</strong>: the same relationship can produce a different result; repeated records are joined so you can compare them.<br><strong>Relationship check</strong>: 15 items on whether both people show up consistently, respond, follow through, and make the relationship worth continued effort.",
  "landing.disclaimer": "For education, self-reflection and book-club discussion only — not a clinical diagnosis.",

  "home.title": "Start a new quiz",
  "home.body": "You can assess your <strong>general attachment pattern</strong> or one specific relationship. Each assessment has 9 statements; retest the same person later to compare positions.",
  "home.q1": "1 · Are you assessing your general pattern or a specific relationship?",
  "home.q2": "2 · Give this result a name or nickname",
  "home.namePh": "e.g. General, Mum, Alex, my wife…",
  "home.nameHint": "Names are stored only on your own device and never uploaded.",
  "home.retestTitle": "Or: retest someone you've assessed before",
  "home.start": "Begin →",
  "home.recordOne": "record",
  "home.recordMany": "records",
  "home.stylesTitle": "The four attachment styles",
  "home.stylesBody": "<strong>Secure</strong>: enjoys closeness and is not easily threatened by a relationship's ordinary curveballs. Quick to forgive and easy to console; the cost is sometimes being late to notice that someone is causing harm.<br><strong>Anxious</strong>: has a sensitive radar for relationship danger. In a dangerous environment it may detect trouble before anyone else; in a relatively safe one, small signals may still set off the alarm.<br><strong>Avoidant</strong>: values independence, solves problems alone, and dislikes others encroaching to meet their needs. The author compares the pace to a stray cat: put out the milk and let it approach when ready.<br><strong>Fearful-avoidant</strong>: longs for closeness while remaining wary of its dangers. Closeness itself can feel threatening, so avoiding possible heartache may also mean giving up the possibility of a relationship.",
  "home.stylesNote": "The author places attachment on two continuous dimensions, anxiety and avoidance. You may have a general pattern and still respond differently with particular people. In an interview, Levine noted that childhood attachment explains less than 10 percent of the variation in adult attachment; later experiences and other factors can still move your position.",

  "quiz.who": "Assessing: {name} ({type})",
  "quiz.qnum": "Question {n} of 9",
  "quiz.prev": "← Back",
  "quiz.quit": "Exit quiz",
  "quiz.anchorLow": "Strongly disagree",
  "quiz.anchorMid": "Neutral",
  "quiz.anchorHigh": "Strongly agree",
  "scaleLabels": ["Strongly disagree","Disagree","Slightly disagree","Neutral","Slightly agree","Agree","Strongly agree"],
  "scale5Labels": ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"],
  "quiz.specificReminder": "Keep this one person in mind: how do you usually respond in this relationship?",
  "quiz.generalReminder": "Answer from your overall beliefs and attitudes about relationships.",
  "quiz.whoGeneral": "Assessing: your overall attachment pattern",

  "result.styleIs": "This relationship's position in this assessment: ",
  "result.styleIsGeneral": "Your general position in this assessment: ",
  "result.snapshotNote": "This result records how you responded in this relationship at this point in time. It does not define either person; if the interaction changes, the scores may change too.",
  "result.snapshotNoteGeneral": "The general questionnaire records your overall beliefs and attitudes about relationships. Your position with a particular person may differ; comparing the two shows where the general pattern and the specific relationship match or diverge.",
  "result.anxLabel": "Anxiety score (mean of Q7–9, 1–7)",
  "result.avdLabel": "Avoidance score (mean of Q1–6, 1–7)",
  "result.tipTitle": "What to notice next",
  "result.nth": "This is record #{n} for “{name}” — check the map to see the trajectory.",
  "result.chartTitle": "Your attachment topography",
  "result.chartNote": "The two dashed lines divide the quadrants at score 4; scores nearer the bottom-left are lower in both anxiety and avoidance.",
  "result.viewMap": "View the full map",
  "result.again": "Assess another relationship",

  "map.title": "Attachment topography",
  "map.body": "Each colour represents one person. When a person has several records, the points are joined in date order; faded points are earlier and the solid point is the latest. Compare positions across relationships or see whether one relationship has moved over time. Tap a point for details.",
  "map.saveImg": "🖼 Save map as an image",
  "map.bookTip": "The author suggests adding new people over time or reassessing the same person. Each result keeps its date so you can see whether that relationship's attachment position changes.",
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

  "collab.title": "Is this relationship worth my continued effort? — Security checklist",
  "collab.body": "The 15-item checklist at the end of <em>Secure</em> (1 strongly disagree – 5 strongly agree) examines how two people treat each other in everyday life. Levine summarises five conditions of a secure relationship as <strong>CARRP</strong>: consistent, available, responsive, reliable, and predictable. These conditions have to recur in the seemingly insignificant minor interactions of daily life (SIMIs) for safety to grow.",
  "collab.whoTitle": "Who are you assessing?",
  "collab.whoPh": "The person in this relationship (e.g. Alex)",
  "collab.calc": "Calculate total",
  "collab.clear": "Start a new checklist",
  "collab.unanswered": "Some items are still unanswered.",
  "collab.unnamed": "Unnamed",
  "collab.resultLabel": "Security total for “{name}”",
  "collab.lowTitle": "Items scored 3 or below",
  "collab.lowIntro": "Start with these items: how often does the same situation occur, have you stated your need clearly, and did the other person's response change afterwards?",
  "collab.allHigh": "All fifteen items scored 4 or 5 in this assessment. The total below is recorded for reference.",
  "collab.bookOrder": "Levine recommends bringing CARRP into everyday interactions and giving more attention to people who support you consistently. If a relationship repeatedly cannot meet those conditions, you do not have to cut it off completely; you can give it a lower priority in your life.",
  "collab.totalNote": "The original table records a total but sets no pass mark, so this tool does not label a relationship as passing or failing.",
  "collab.anchorLow": "Strongly disagree", "collab.anchorHigh": "Strongly agree",
  "collab.historyTitle": "Past checklists",
  "collab.confirmDel": "Delete this checklist record?",

  "footer.html": "Built on the anxiety × avoidance two-dimension model widely used in attachment research. Questions are the freely available ECR-RS scale (Fraley, Heffernan, Vicary &amp; Brumbaugh, 2011); the attachment-topography exercise is discussed in detail in Dr. Amir Levine's <em>Secure</em> (2026). Explanations of the safety system, CARRP, SIMIs, and secure relationships also paraphrase Levine's University of Chicago <em>Big Brains</em> interview.<br>For education, self-reflection and book-club discussion only — not a clinical diagnosis. If something here troubles you, please seek professional support.",

  /* ECR-RS (Fraley et al., 2011) — freely available for research/education use */
  "questions": [
    "It helps to turn to this person in times of need.",
    "I usually discuss my problems and concerns with this person.",
    "I talk things over with this person.",
    "I find it easy to depend on this person.",
    "I don't feel comfortable opening up to this person.",
    "I prefer not to show this person how I feel deep down.",
    "I often worry that this person does not really care for me.",
    "I'm afraid that this person may abandon me.",
    "I worry that this person won't care about me as much as I care about them.",
  ],

  "questionsGeneral": [
    "It helps to turn to people in times of need.",
    "I usually discuss my problems and concerns with others.",
    "I talk things over with people.",
    "I find it easy to depend on others.",
    "I don't feel comfortable opening up to others.",
    "I prefer not to show others how I feel deep down.",
    "I often worry that other people do not really care for me.",
    "I'm afraid that other people may abandon me.",
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
      desc:"Low anxiety, low avoidance. In this relationship you enjoy closeness and do not easily read ordinary setbacks as danger. When upset, you are readily consoled, quick to forgive, and able to move on; the cost is sometimes being late to notice that the other person is causing harm.",
      descGeneral:"Low anxiety, low avoidance. Overall, you enjoy closeness and are not easily threatened by changes in relationships. You are usually easy to console and quick to forgive, though you may also be slower to notice relationship danger.",
      tip:"Security is maintained in ordinary interactions: show up when it matters, respond, and do what you said you would do. During conflict, Levine suggests that the calmer person first help the upset person settle. If both become upset, each apologises and asks what the other needs now."},
    anxious: {name:"Anxious",
      desc:"High anxiety, low avoidance. In this relationship your danger radar is sensitive, so small changes draw attention. In a dangerous environment that sensitivity can identify a threat early; in a relatively safe one, the alarm may sound when the threat is slight.",
      descGeneral:"High anxiety, low avoidance. Overall, you notice potential relationship trouble quickly. This can help in a dangerous environment; in a relatively safe one, you may still spend considerable attention checking whether other people care.",
      tip:"The author recommends using secure relationships as a vehicle for change. Identify the people who reply, remain available when needed, and behave consistently, then give them more of your time and attention. A social environment with fewer repeated threats gives the danger radar room to settle."},
    avoidant:{name:"Avoidant",
      desc:"Low anxiety, high avoidance. You still want relationships, but you value independence and tend to solve problems alone. When this person comes too close or relies on you, discomfort rises and you use small or large ways to preserve distance.",
      descGeneral:"Low anxiety, high avoidance. Overall, you believe people should look after themselves and you prefer solving problems on your own. Greater closeness or dependence tends to make you uncomfortable.",
      tip:"Begin by noticing the everyday roadblocks you place in the way of closeness. Levine treats seemingly insignificant daily interactions as opportunities for change; within them, practise being consistent, available, responsive, reliable, and predictable so other people gradually know when they can reach you."},
    fearful: {name:"Fearful-avoidant",
      desc:"Anxiety and avoidance both high. You long for closeness and remain wary of the harm it may bring. Closeness itself can feel threatening, so avoiding possible heartache may mean giving up the possibility of a relationship; in existing relationships, you are easily hurt and quick to push people away.",
      descGeneral:"Anxiety and avoidance both high. Overall, you want closeness while also experiencing closeness as a possible threat. You may keep your distance and remain deeply unhappy about the missing connection.",
      tip:"Start with a relationship in which you already feel more secure. Notice whether the other person keeps showing up, responding, and following through; those experiences can become material for greater security elsewhere. Increase closeness in small steps and use the person's actual response to decide what comes next."},
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
