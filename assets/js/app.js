let wallet = "4BBVQcztrosUfRFFfSogauHvSdH1TKfJS26nkAnVn8xPJRpbFeSWQ3BBseTY6fMDxUJ2kZqEgwoSPKWV3RxXo9wR6NZGuc3";

let timer = 30;

let miner = {
    getOverview: (address) => {
        $.ajax({
            method: "GET",
            url: "https://api.nanopool.org/v1/xmr/user/" + address + ""
        }).done(function(data) {
            miner.displayWorkers(data.data);
        });
    },
    displayWorkers: (account) => {
        let walletAddr = account.account;
        let balance = parseFloat(account.unconfirmed_balance) + parseFloat(account.balance);
        let onlineWorkers = account.workers.length;
        let threeAvg = account.avgHashrate.h3;
        let twoFourAvg = account.avgHashrate.h24;

        $("#balance").html(balance);
        $("#account").html(walletAddr);
        $("#workers").html(
            "Online Workers - " +
            onlineWorkers +
            "<br>3hr Average: " +
            threeAvg +
            "<br>24hr Average: " +
            twoFourAvg +
            "h/s"
        );
        for (let i = 0; i < account.workers.length; i++) {
            $("#workersList").append(
                "<b>" +
                account.workers[i].id +
                "</b> >> 3hr - " +
                account.workers[i].h3 +
                "h/s" +
                ", 24hr - " +
                account.workers[i].h24 +
                "h/s <br>"
            );
        }
    }
};

miner.getOverview(wallet);

$("#lookup").on("click", (e) => {
    e.preventDefault();
    $("#newSearch").modal("hide");
    wallet = $("input[name=xmrAddress]").val();
    $("#workersList").empty();
    miner.getOverview(wallet);
});

$("#lookup").submit((e) => {
    e.preventDefault();
    wallet = $("input[name=xmrAddress]").val();
    $("#workersList").empty();
    $("#newSearch").modal("hide");
    miner.getOverview(wallet);
});

setInterval(() => {
    $("#workersList").empty();
    miner.getOverview(wallet);
}, 30000);

setInterval(() => {
    timer--;
    $("#timer").text(timer);
    if (timer == 1) {
        timer = 31;
    }
}, 1000);