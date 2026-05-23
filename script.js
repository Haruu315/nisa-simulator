let myChart = null

function calc() {
    const monthly  = Number(document.getElementById("monthly").value)
    const yearRate = Number(document.getElementById("rate").value) / 100
    const years    = Number(document.getElementById("years").value)
    const monthRate = yearRate / 12

    let total = 0
    const labels        = []
    const totalData     = []
    const principalData = []

    for (let month = 1; month <= years * 12; month++) {
        total = total * 1 + total * monthRate + monthly//複利の計算

        if (month % 12 === 0) {
            let year = month / 12//何年目かを計算する
            labels.push(year + "年")//グラフの横軸に年数を追加する
            totalData.push(Math.round(total))//そのときの資産総額を配列に追加。Math.round() で小数点以下を四捨五入
            principalData.push(monthly * 12 * year)//元本の累計を計算して追加。「毎月の積立額 × 12ヶ月 × 何年目か」
        }
    }

    const principal = monthly * 12 * years
    const profit    = Math.round(total) - principal

    document.getElementById("result-total").textContent     = Math.round(total).toLocaleString() + "円"
    document.getElementById("result-principal").textContent = principal.toLocaleString() + "円"
    document.getElementById("result-profit").textContent    = profit.toLocaleString() + "円"

    if (myChart) myChart.destroy()//「myChartに何か入っていたら古いグラフを消す」です。ボタンを2回押すと古いグラフの上に新しいグラフが重なってバグるので、先に消しています。最初は null なので1回目はスキップされます。
    myChart = new Chart(document.getElementById("chart"), {
        type: "line",//グラフの種類
        data: {
            labels: labels,
            datasets: [
                { label: "資産総額", data: totalData,     borderColor: "blue" },
                { label: "元本",     data: principalData, borderColor: "gray" }
            ]
        }
    })
}


//principal:元本、元金、主要