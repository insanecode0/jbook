$(function() {
    
    var divResult,btnSearch,inputs,busqueda,timer1,timer2,clock,sresults;
    
     divResult = $('#resultado');
     btnSearch = $("#btnSearch");
     inputs = $("input");
     busqueda = $("#busqueda");
     sresult = $("<div></div>");
     sresult.addClass("sresult");
     clock = $("<div></div>");
     clock.addClass("clock");
    
    busqueda.focus();
    
    
    function jbookIt()
    {
        var text = busqueda.val();
        if(text == "my name")
        {
            
            divResult.html("Jesus Guerrero Alvarez");
        }
        else
        {
          whatIsThat(text); 
        }
       
    }
   
   btnSearch.click(jbookIt);
   busqueda.keyup(setColor);
   
   busqueda.keydown(function(event){
       if(event.which == 13){
           btnSearch.click();
       }
   });
   
   function whatIsThat(text)
   {
       clearInterval(timer1);
       clearInterval(timer2);
       
       switch(text.slice(0,5)){
           case "!math":
               mathOperations(text);
                break;
           case "!time":
                timeFuctions(text);
                break;
           case "!help":
               getHelp();
               break;
           case "!list":
               getList();
               break;
           
       }
       
       switch(text.slice(0,4)){
           case "!cls":
                clear();
                break;
        }
   }
   
   
   function mathOperations(text)
   {
       var data = text.split(" ");
           var operation = data[2];
           var result;
           var query = "<small class='query'>" + text.slice(5) + " = </small>";
           var param1 = parseInt(data[1]),param2 =parseInt(data[3]);
           
           switch(operation){
               case "+":
                   
                   result =   param1 + param2;
                   break;
               case "-":
                  
                   result = param1 - param2;
                   break;
               case "*":
                   
                   result = param1 * param2;
                   break;
               case "/":
                   result = param1 / param2;
                   break;
               default:
                    result ="we dont have that operation";
           }
           
           sresult.html("<h2>"+ query +  result + "</h2>");
           divResult.html(sresult);
       
   }
    
    
    function timeFuctions(text){
       var data,option,segs,mins,hours,fulldate,day,date,live = false,result;
       
        data = text.split(" ");
        option= data[1];
        date = new  Date();
        segs =  date.getSeconds();
        hours = date.getHours();
        mins = date.getMinutes();
        
        if (segs < 10){segs = "0"+segs}
        if (mins < 10){mins = "0"+ mins}
           
           switch(option){
              case "hours":
                  result = hours + ":" + mins + ":" + segs;
                  break;
              case "date":
                  result = date;
                  break;
              case "clock":
                  live = true;
                  timer1 = setInterval(liveClock,1000);
                  break;
              case "timer":
                  live = true;
                  newTimer(data[2]);
              default:
                  result="that function doesn't exist";
           }
           
           if(!live){
                sresult.html("<h2>"+ result +"</h2>");
                divResult.html(sresult);
           }
          
    } 
    
    function getHelp(){
        var htmlHelp;
        
        htmlHelp = "<p>!math mathematic operations formula: !math num1 operation num2</p>";
        htmlHelp +="<p>Eg. !math 5 * 3</p>";
        htmlHelp +="<p>!time time information  formula: !time {function} </p>";  
        htmlHelp +="<p>Eg. !time date</p>";   
        htmlHelp +="<p>time functions: hours,date,clock,timer</p>";
        htmlHelp +="<p>Eg. !time timer 5 (set timer with 5 minutes)</p>";
       
       divResult.html(htmlHelp);
       
    }
    
    function getList(){
        htmlHelp = "<p>!math num1 + num2</p>";
        htmlHelp +="<small>change the sign:  <br>addition (+), subtraction (-), multiplication (*), division(/)</small>";
        htmlHelp +="<br> <hr>";  
        htmlHelp +="<p>!time hours  </p>";  
        htmlHelp +="<p>!time date</p>";   
        htmlHelp +="<p>!time clock</p>";
        htmlHelp +="<p>!time timer 5 (set timer with 5 minutes)</p>";
         htmlHelp +="<small>change the minutes the number</small>";
        
         divResult.html(htmlHelp);
    }
           
    
    function liveClock() {
       var segs,mins,hours,fulldate,day,date,live,result;
       
        date = new  Date();
        segs =  date.getSeconds();
        hours = date.getHours();
        mins = date.getMinutes();
        
        if (segs < 10){segs = "0"+segs}
        if (mins < 10){mins = "0"+ mins}
        
        result ="<h1 class='time'>"+ hours + ":" + mins + ":"  + "<small class='segs'>" + segs + "<small></h1>";
        
        clock.html(result);
           
        divResult.html(clock);
    }
    
    function newTimer(mins,segs){
    
    if(mins != null){
        if(segs == null)segs = 0;
            timer2 = setInterval(countDown,1000);
    }
    else{
        timerHelp();
    }

    
        function countDown()
        {
            var sMin,sSeg,time;
            
           sMin = (mins > 10 ? mins : "0" + mins);
           sSeg = (segs > 10 ? segs : "0" + segs);
            
            
        time = "<h1 class='time'>" + "00" + ":" + sMin + ":"  + "<small class='segs'>" + sSeg + "<small> </h1>";
        
        clock.html(time);
           
        divResult.html(clock);
            
            if(segs > 0 )
            {
            segs = segs - 1;
            }
            else if(segs == 0 && mins > 0)
            {
                mins = mins - 1;
                segs = 59;
                
            }else if(segs == 0 && mins == 0){
                
                alert("tiempo terminado!!");
                clearInterval(timer2);
            }
            
           
                
        }   
    }

   function timerHelp(){
        htmlHelp = "<p>in order to set a timer, you need to give the minutes as parameter";
        htmlHelp +="<p>Eg. !time timer 5";
       
       divResult.html(htmlHelp);
       
   }    
    
    
    function clear(){
        divResult.html(" ");
        busqueda.val("");
    }
    
    function setColor(){
        jshorts(busqueda.val());
    } 
    
    
    
   function jshorts(text){
       
       switch(text.slice(0,5)){
           case "!math":
                busqueda.css("color","dodgerblue");
                break;
           case "!time":
                busqueda.css("color","#df5138");
                break;
            case "!help":
                busqueda.css("color","rgb(89,164,77)");
                break;
            case "!list":
                busqueda.css("color","rgb(5,166,179)");
                break;
            default:
                 busqueda.css("color","white");
                
       }
       
       switch(text.slice(0,4)){
           
            case "!cls":
                 busqueda.css("color","pink");
                 break;
                
       }
   }
   
});