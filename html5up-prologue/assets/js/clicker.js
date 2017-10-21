var clicks = 200;
var totalClicks = 0;
var autoClick1Count = 0;
var autoClick1MultiCount = 1;
var masterMulti = 1;
var cps10= 0;
var cps9= 0;
var cps8= 0;
var cps7= 0;
var cps6= 0;
var cps5= 0;
var cps4= 0;
var cps3= 0;
var cps2= 0;
var cps = 0;
//test

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

        var calccps = cps + cps2 +cps3 +cps4 + cps5 +cps6 +cps7 +cps8+cps9+cps10
        calccps = calccps /10
         cps10= cps9
         cps9= cps8
         cps8= cps7
         cps7= cps6
         cps6= cps5
         cps5= cps4
         cps4= cps3
         cps3= cps2
         cps2= cps
         cps = 0;


        $("#cps").html(numeral(calccps).format('0.[00]a')+"/s")
        clicksPerSec();
      }, 1000);
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
        var scale = 1.25
        var price = bPrice

        function calcPrice(){
            price = bPrice
            for (i = 0; i < autoClick1MultiCount; i++) {
                price = price*scale
                //sets the price to base if there are is only 1 multiplyer
                //multiplyer count starts at 1 to avoid #*0 = 0 issues.
                if (autoClick1MultiCount ===1){price = bPrice}
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
