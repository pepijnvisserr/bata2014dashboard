(function($, block) {

block.fn.hashtags = function(config) {
    var options = $.extend({
        memory: 20
    }, config);

    // create the necessary HTML in the block container
    this.$element.append('<ol class="hashtaglist"></ol>');

    // store list for later
    var $list = this.$element.find('ol');


    // register default handler for handling tweet data
    this.actions(function(e, hashtags){
        var $item = $('<div class="hashtagdiv"></div>');
        var $text1 = $('<a href="https://twitter.com/hashtag/' + hashtags[0] + '?src=hash"><p class="hashtagp">#' + hashtags[0] + '</p></a>');
		var $text2 = $('<p class="hashtagamount">' + hashtags[1] + ' Tweets</p>');

        $item.append($text1);
		$item.append($text2);
        $list.prepend($item);

        // remove stale tweets
        if ($list.children().size() > options.memory) {
            $list.children().last().remove();
        }
    });

    return this.$element;
};
})(jQuery, block);
