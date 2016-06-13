let timeinterval;
let timeinterval2;
let secs1;

Meteor.startup(function () {
  let endtime = 'December 8 2016 14:50:30 UTC-0400';
  const today = new Date();
  timeinterval = Meteor.setInterval(function () {
    Meteor.call("getCurrentTime", function (error, result) {
      Session.set("time", result);
      var t = getTimeRemaining(endtime);
      Session.set("t", t);
    });
  }, 1000);
});

Requests = {
  QueryString : function(item){
    let svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
    return svalue ? svalue[1] : svalue;
  }
}

//usage
let param = Requests.QueryString("a");
let color = Requests.QueryString("color");
/*console.log("param "+param);
console.log("color "+color);
console.log(window.location.href );
console.log(document.referrer); // to get the parent URL*/

function getTimeRemaining(endtime){
  let t = Date.parse(endtime) - Session.get('time');
  let seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
  let minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);
  let hours = ("0" + Math.floor( (t/(1000*60*60)) % 24 )).slice(-2);
  let days = Math.floor( t/(1000*60*60*24) );

  let seconds1 = seconds.substr(0,1);
  let seconds2 = seconds.substr(1);

  //console.log(t)
  if(t <= 0)
    clearInterval(timeinterval);

  let anim = function(obj) {
    obj.velocity({
      translateY: "-20px",
      /*scaleX: "2.5",*/
    //  y: "0",
      scaleY: ".6",
      /*scaleZ: "2.5"*/
    }, 300, "easeInSine")
    .velocity({
      translateY: "20px",
      //y: "-10px",
      scaleY: ".6",
      /*scaleZ: ".5"*/
    }, 0, "easeInSine")
    .velocity({
      translateY: "0",
      /*scaleX: "2.5",*/
    //  y: "10px",
      scaleY: "1",
      /*scaleZ: "2.5"*/
    }, 300, "easeInSine")
    .velocity({
      translateY: "0",
      /*scaleX: "2.5",*/
      //y: "0",
      scaleY: "1",
      /*scaleZ: "2.5"*/
    }, 400, "easeInSine")

  }

  anim($(".seconds"));
  if(secs1 != seconds1 ) {
    console.log("secs1 " + secs1);
    console.log("seconds1 " + seconds1);
    anim($(".seconds1"));
  }

  secs1 = seconds1;

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds,
    'seconds1': seconds1,
    'seconds2': seconds2
  };


}

Template.countdown.helpers({
  t: function () {
    return Session.get("t");
  },
  attributes: function() {
    if(param == "alt"){
      if(color){
        let b = "color:"+color;
        return {
          //class: "minutes",
          style: "border-radius: 50px; background: #ccc; " + b
        }
      }

    }
    /*return {
      class: "minutes alternate",
      style: "border-radius: 15px; background: #ccc; color: red;"
    }*/
    var b = "color:"+color;
    return {
      class: "minutes",
      style: b
    }
  }
});

Template.body.helpers({
  ended:function () {
    //console.log(Session.get("t").total <= 0);
    return Session.get("t").total <= 0;
  }
});
