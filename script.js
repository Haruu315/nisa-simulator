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
        total = total * 1 + total * monthRate + monthly 

        if (month % 12 === 0) {
            let year = month / 12
            labels.push(year + "年")
            totalData.push(Math.round(total))
            principalData.push(monthly * 12 * year)
        }
    }

    const principal = monthly * 12 * years
    const profit    = Math.round(total) - principal

    document.getElementById("result-total").textContent     = Math.round(total).toLocaleString() + "円"
    document.getElementById("result-principal").textContent = principal.toLocaleString() + "円"
    document.getElementById("result-profit").textContent    = profit.toLocaleString() + "円"

    if (myChart) myChart.destroy()
    myChart = new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                { label: "資産総額", data: totalData,     borderColor: "blue" },
                { label: "元本",     data: principalData, borderColor: "gray" }
            ]
        }
    })
}