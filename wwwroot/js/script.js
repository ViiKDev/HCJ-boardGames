reloadScripts();

function reloadScripts() {
    $('.house').unbind().on('click', function () {
        $(this).toggleClass('active');
        let coords = [$(this).attr('X'), $(this).attr('Y')]
        playerAction($(this).text(), coords);
        $('.house').not(this).each((_, el) => { $(el).removeClass('active') });
    })
}