var wallet ='4BBVQcztrosUfRFFfSogauHvSdH1TKfJS26nkAnVn8xPJRpbFeSWQ3BBseTY6fMDxUJ2kZqEgwoSPKWV3RxXo9wR6NZGuc3';
var timer = 30;
var miner = {
  getOverview:function(address) {
    $.ajax({
      method: 'GET',
      url: 'https://api.nanopool.org/v1/xmr/user/' + address + ''
    })
    .done(function(data){
      console.log(data.data);
      miner.displayWorkers(data.data);
    });
  },
  displayWorkers:function(account) {
    var walletAddr = account.account;
    var balance = parseFloat(account.unconfirmed_balance) + parseFloat(account.balance);
    var onlineWorkers = account.workers.length;
    var threeAvg = account.avgHashrate.h3;
    var twoFourAvg = account.avgHashrate.h24;

    $("#balance").html(balance);
    $("#account").html(walletAddr);
    $("#workers").html('Online Workers - ' + onlineWorkers + '<br>3hr Average: ' + threeAvg + '<br>24hr Average: ' + twoFourAvg + 'h/s')
    for (var i = 0; i < account.workers.length; i++) {
      // < a href = "#!"
      // class = "collection-item" > Alan < /a>
      $("#workersList").append("<li class='collection-item'>" + account.workers[i].id + "</b> >> 3hr - " + account.workers[i].avg_h3 + "h/s" + ", 24hr - " + account.workers[i].avg_h24 + "h/s </li>");
    }
  }
}

miner.getOverview(wallet);

$("#lookup").on('click', function(e) {
  e.preventDefault();
  $('#newSearch').modal('hide')
  wallet = $("input[name=xmrAddress]").val();
  $("#workersList").empty();
  miner.getOverview(wallet);
});
$("#lookup").submit(function(e) {
  e.preventDefault();
  wallet = $("input[name=xmrAddress]").val();
  $("#workersList").empty();
  $('#newSearch').modal('hide')
  miner.getOverview(wallet);
});

setInterval(function(){
  $("#workersList").empty();
  miner.getOverview(wallet);
}, 30000);

setInterval(function(){
  timer--;
  $("#timer").text(timer);
  if (timer == 1) {
    timer = 31;
  }
}, 1000)
