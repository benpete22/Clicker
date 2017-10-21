var clicks = 0;
var totalClicks = 0;
var autoClick1Count = 0;
var autoClick1MultiCount = 1;
var masterMulti = 1;
var cps = 0;
var cps2 = 0;





    function update(num){
        if (num<0){clicks = clicks + num}
        else{
        clicks = clicks + num*masterMulti;
        totalClicks = totalClicks + num*masterMulti;
        cps = cps + num*masterMulti;
        }
        $("#clicks").html(numeral(Math.floor(clicks)).format('0.[000]a'))
        $("#totalClicks").html(numeral(Math.floor(totalClicks)).format('0.[000]a'))

    }
    function clicksPerSec(){
      cpsTimeout = setTimeout(function(){
        var calccps = cps + cps2
        calccps = calccps /2

         $("#cps").html(numeral(Math.floor(calccps*4)).format('0.[00]a')+"/s")
         cps2= cps
         cps = 0;
        clicksPerSec();
      }, 250);
    }
    $(function() { clicksPerSec()});


    function autoClick1(status){
        //clicks per run
        var autoclicks = 1
        autoclicks = autoclicks * autoClick1MultiCount;
        //duration of auto click
        var time = 5000/autoClick1Count

        if (autoClick1Count === 0){ status="continue"}
        if (status=="continue"){
            autoClick1Time = setTimeout(function(){ update(autoclicks); autoClick1("continue");}, time);
        }
    }





    $("#clicker").click(function(){
        update(1);
    });


    $("#autoClick1").click(function(){
        //base price
        var bPrice = 10
        var scale = 1.2
        var price = bPrice

        function calcPrice(){
            price = bPrice
            for (i = 0; i < autoClick1Count; i++) {
                price = price*scale
            }
            price = Math.floor(price)
            return price
        }
        price = calcPrice()

        if (clicks >= price){
            update(-price)
            autoClick1()
            autoClick1Count ++
            $("#autoClicker1Price").html(numeral(calcPrice()).format('0.[000]a'))
            $("#autoClicker1Count").html(autoClick1Count)
        }


    });
    $("#autoClick1Multi").click(function(){
        //base price
        var bPrice = 200
        var scale = 1.35
        var price = bPrice

        function calcPrice(){
            price = bPrice
            for (i = 0; i < autoClick1MultiCount; i++) {
                price = price*scale
            }
            price = Math.floor(price)
            return price
        }
        price = calcPrice()

        if (clicks >= price){
            update(-price)
            autoClick1MultiCount ++
            $("#autoClicker1MultiPrice").html(numeral(calcPrice()).format('0.[000]a'))
            $("#autoClicker1MultiCount").html(autoClick1MultiCount)
        }
    });
