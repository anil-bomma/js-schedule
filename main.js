let sec1 = 0;
let sec2 = 0;
let min1 = 0;
let min2 = 0;

let timer;
let interval;
let oneMinInterval;

const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => {
            ++sec1;
            if (sec1 < 10) {
                document.querySelector("#sec-2").value = sec1;
            } else if (sec1 >= 10) {
                sec1 = 0;
                ++sec2;
                if (sec2 >= 6) {
                    sec1 = 0;
                    sec2 = 0;
                    ++min1;
                    if (min1 >= 10) {
                        min1 = 0;
                        sec1 = 0;
                        sec2 = 0;
                        ++min2;
                        document.querySelector("#sec-2").value = sec1;
                        document.querySelector("#sec-1").value = sec2;
                        document.querySelector("#min-2").value = min1;
                        document.querySelector("#min-1").value = min2;
                    } else {
                        document.querySelector("#sec-2").value = sec1;
                        document.querySelector("#sec-1").value = sec2;
                        document.querySelector("#min-2").value = min1;
                    }
                } else {
                    document.querySelector("#sec-2").value = sec1;
                    document.querySelector("#sec-1").value = sec2;
                }
            }
        }, 1000);
    }
}

const stopTimer = () => {
    clearInterval(timer);
}

const resetTimer = () => {
    timer = 0;
    sec1 = sec2 = min1 = min2 = 0;
    document.querySelector("#sec-2").value = 0;
    document.querySelector("#sec-1").value = 0;
    document.querySelector("#min-2").value = 0;
    document.querySelector("#min-1").value = 0;
}


secTime = async (second) => {
    let promise = new Promise((resolve, reject) => {
        let timeOut = second * 1000;

        interval = setInterval(() => {
            --second;
            let strTime = second.toString();
            document.querySelector("#s1").value = strTime.length == 2 ? strTime.charAt(0) : "0";
            document.querySelector("#s2").value = strTime.length == 2 ? strTime.charAt(1) : strTime;
        }, 1000)

        setTimeout(() => {
            clearInterval(interval);
            resolve("done!");
        }, timeOut)
    });

    await promise;
}

const setBackTimer = async () => {
    if (!interval) {
        let m1 = document.querySelector("#m1").value;
        let m2 = document.querySelector("#m2").value;
        let s1 = document.querySelector("#s1").value;
        let s2 = document.querySelector("#s2").value;

        let totalMinute = parseInt(`${m1}${m2}`);
        let totalSecond = parseInt(`${s1}${s2}`);

        let oneMin = 60;

        if (totalMinute) {

            if (totalSecond) {
                await secTime(totalSecond);
            }

            let timeOut = totalMinute * 60 * 1000;

            --totalMinute;
            let strTime = totalMinute.toString();
            document.querySelector("#m1").value = strTime.length == 2 ? strTime.charAt(0) : "0";
            document.querySelector("#m2").value = strTime.length == 2 ? strTime.charAt(1) : strTime;

            oneMinInterval = setInterval(() => {
                oneMin = 60;
                --totalMinute;
                if (totalMinute > 0) {
                    let strTime = totalMinute.toString();
                    document.querySelector("#m1").value = strTime.length == 2 ? strTime.charAt(0) : "0";
                    document.querySelector("#m2").value = strTime.length == 2 ? strTime.charAt(1) : strTime;
                }
            }, 60000)


            interval = setInterval(() => {
                --oneMin;
                let strTime = oneMin.toString();
                document.querySelector("#s1").value = strTime.length == 2 ? strTime.charAt(0) : "0";
                document.querySelector("#s2").value = strTime.length == 2 ? strTime.charAt(1) : strTime;
            }, 1000)

            setTimeout(() => {
                clearInterval(oneMinInterval);
                clearInterval(interval);
                document.querySelector("#s1").value = 0;
                document.querySelector("#s2").value = 0;
                window.alert("Timeout completed...!");
            }, timeOut)

        } else {
            let timeOut = totalSecond * 1000;

            interval = setInterval(() => {
                --totalSecond;
                let strTime = totalSecond.toString();
                document.querySelector("#s1").value = strTime.length == 2 ? strTime.charAt(0) : "0";
                document.querySelector("#s2").value = strTime.length == 2 ? strTime.charAt(1) : strTime;
            }, 1000)

            setTimeout(() => {
                clearInterval(interval);
                document.querySelector("#s1").value = 0;
                document.querySelector("#s2").value = 0;
                window.alert("Timeout completed...!");
            }, timeOut)
        }
    }
}

const stopBackTimer = () => {
    clearInterval(interval);
}

const resetBackTimer = () => {
    interval = 0;
    s1 = s2 = m1 = m2 = 0;
    clearInterval(interval);
    document.querySelector("#s1").value = 0;
    document.querySelector("#s2").value = 0;
    document.querySelector("#m1").value = 0;
    document.querySelector("#m2").value = 0;
}