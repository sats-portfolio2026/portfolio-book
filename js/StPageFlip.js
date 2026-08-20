
const book = document.getElementById("book");

const screenWidth = document.documentElement.clientWidth;

/* ========================================
表示モード
======================================== */

// 900px以上：見開き
// 899px以下：1ページ
const isPC = screenWidth >= 900;

let pageWidth;
let pageHeight;


/* ========================================
ページサイズ
======================================== */

if (isPC) {

    // ------------------------------------
    // PC：見開き
    // ------------------------------------

    // 左右40pxずつ余白
    const bookWidth = Math.min(
        1200,
        screenWidth - 80
    );

    // 1ページ分
    pageWidth = bookWidth / 2;

    // 600 : 800 の比率
    pageHeight = pageWidth * (800 / 600);


} else {

    // ------------------------------------
    // SP・タブレット：1ページ
    // ------------------------------------

    // 最大600px
    // 左右20pxずつ余白
    pageWidth = Math.min(
        600,
        screenWidth - 40
    );

    // 600 : 800 の比率
    pageHeight = pageWidth * (800 / 600);

}

/* ========================================
StPageFlip
======================================== */

const pageFlip = new St.PageFlip(book, {

    width: pageWidth,
    height: pageHeight,

    size: "fixed",

    // 1ページ表示なら表紙を表示
    showCover: !isPC,

    // 1ページ表示なら縦向き
    usePortrait: !isPC,

    // ナレーションページから開始
    startPage: 2,

    flippingTime: 1000,

    useMouseEvents: true,

    mobileScrollSupport: true

});


/* ========================================
ページ読み込み
======================================== */

pageFlip.loadFromHTML(
    document.querySelectorAll(".page")
);


/* ========================================
目次
======================================== */

document
    .querySelectorAll(".contents-list a")
    .forEach(link => {

        link.addEventListener("click", function(e) {

            e.preventDefault();

            const pageNumber =
                Number(this.dataset.page);

            pageFlip.flip(pageNumber);

        });

    });


/* ========================================
リサイズ
======================================== */

let resizeTimer;

window.addEventListener("resize", function() {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function() {

        location.reload();

    }, 200);

});


