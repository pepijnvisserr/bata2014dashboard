(function($, block) {

block.fn.locations = function(config) {
    var options = $.extend({
        memory: 20
    }, config);

    // create the necessary HTML in the block container
    this.$element.append('<ol class="locationlist"></ol>');

    // store list for later
    var $list = this.$element.find('ol');


    // register default handler for handling tweet data
    this.actions(function(e, locations){
        var $item = $('<div class="locationdiv"></div>');
        var $text1 = $('<p class="locationp">' + locations[0] + '</p>');
		var $text2 = $('<p class="locationamount">' + locations[1] + ' Tweets</p>');

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
