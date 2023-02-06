function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getElementsByXpath(path) {
    const it = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    // return an array
    const result = [];
    for (let i = 0; i < it.snapshotLength; i++) {
        result.push(it.snapshotItem(i));
    }
    return result;
}
function blockAndDisplay() {
    var feed = $('[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]');
    feed.children().remove();
    $('.ticker_stream').remove();
    $('.ego_column').remove();
    $('#pagelet_games_rhc').remove();
    $('#pagelet_trending_tags_and_topics').remove();
    $('#pagelet_canvas_nav_content').remove();
    $('#stories_pagelet_below_composer').remove();

    // Handles the Apr 2022 Facebook redesign
    if (window.location.href.endsWith('facebook.com') || window.location.href.endsWith('facebook.com/')) {
        $('[role=feed]').remove();
    }

    $('[aria-label=Stories]').remove();
    $('[data-pagelet=Stories]').remove();

    // Handles the Sep 2022 Facebook redesign
    $('#ssrb_feed_start').parent().remove();

    getElementByXpath("//*[contains(text(),'News Feed posts')]").parentElement.style.visibility = 'hidden';
    // Other ideas:
    // document.querySelectorAll('div[aria-label="Actions for this post"]').forEach((x) => x.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.visibility = 'hidden');
    // document.querySelectorAll('a[aria-label="hide post"]').forEach((x) => x.parentElement.parentElement.parentElement.parentElement.visibility = 'hidden');

}

function hideSuggested() {
    const spans = getElementsByXpath("//*[contains(text(), 'Suggested for you')]");
    for (const span of spans) {
        span.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }
}

function hideAds() {
    const sponsored_svg = document.querySelectorAll('svg:has(use)');
    for (const svg of sponsored_svg) {
        svg.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }
}

window.setInterval(blockAndDisplay, 100);
// window.setInterval(hideSuggested, 100);
// window.setInterval(hideAds, 100);
