function getCookie ( name ) {
    var matches = document.cookie.match( new RegExp(
        "(?:^|; )" + name.replace( /([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1' ) + "=([^;]*)"
    ) )
    return matches ? decodeURIComponent( matches[ 1 ] ) : undefined
}

function randRange ( data ) {
    var newTime = data[ Math.floor( data.length * Math.random() ) ];
    return newTime;
}

function lastpack ( numpack ) {
    var minNumPack = 3; // Минимальное количество упаковок
    var lastClass = $( '.lastpack' ); // Объект
    var numpackCookie = getCookie( "lastpack" );
    var timeArray = new Array( 2000, 13000, 15000, 7000, 6000, 11000 );

    if (numpackCookie == undefined) {
        document.cookie = numpack;
    } else {
        var numpack = numpackCookie;
    }

    if (numpack > minNumPack) {
        numpack--;
        document.cookie = "lastpack=" + numpack;
        lastClass.text( numpack );
    } else {
        lastClass.text( minNumPack );
    }
    clearInterval( timer );
    timer = setInterval( lastpack, randRange( timeArray ), numpack );
}

var timer = setInterval( lastpack, 0, 40 );

$( document ).ready( function () {

    $( '[name="country"]' ).on( 'change', function () {
        var geoKey = $( this ).find( 'option:selected' ).val();
        var data = $jsonData.prices[ geoKey ];
        var price = data.price;
        var oldPrice = data.old_price;
        var currency = data.currency
        $( "[value = " + geoKey + "]" ).attr( "selected", true ).siblings().attr( 'selected', false );

        $( '.price_land_s1' ).text( price );
        $( '.price_land_s2' ).text( oldPrice );
        $( '.price_land_curr' ).text( currency );
    } );

    /* scroll */

    // $('a[href*=#]:not([href=#])').click(function() {
    // if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    //   var target = $(this.hash);
    //   target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    //   if (target.length) {
    //     $('html,body').animate({
    //       scrollTop: target.offset().top
    //     }, 1000);
    //     return false;
    //   }
    // }
// } );

    /* timer */

    function update () {
        var Now = new Date(), Finish = new Date();
        Finish.setHours( 23 );
        Finish.setMinutes( 59 );
        Finish.setSeconds( 59 );
        if (Now.getHours() === 23 && Now.getMinutes() === 59 && Now.getSeconds === 59) {
            Finish.setDate( Finish.getDate() + 1 );
        }
        var sec = Math.floor( (Finish.getTime() - Now.getTime()) / 1000 );
        var hrs = Math.floor( sec / 3600 );
        sec -= hrs * 3600;
        var min = Math.floor( sec / 60 );
        sec -= min * 60;
        $( ".timer .hours" ).text( pad( hrs ) );
        $( ".timer .minutes" ).text( pad( min ) );
        $( ".timer .seconds" ).text( pad( sec ) );
        setTimeout( update, 200 );
    }

    function pad ( s ) {
        return ('00' + s).substr( -2 )
    }

    update();

    /* sliders */

    $( ".owl-carousel" ).owlCarousel( {
        items: 1,
        loop: true,
        smartSpeed: 300,
        mouseDrag: false,
        pullDrag: false,
        nav: true,
        navText: ""
    } );

} )
;