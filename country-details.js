const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
console.log(typeof id)

const allCards = document.querySelector(".all-cards")
const output = document.querySelector(".output")
const url = "https://docs.google.com/spreadsheets/d/"
const ssid = "1flZ5H3arFSNaRxb12TSEH3mX3iJCgbZrO0nfanFfU1g"
const query1 = `/gviz/tq?`
const endpoint = `${url}${ssid}${query1}`

const countryInfo = []

function callDataFromGoogleSheets(params) {
  fetch(endpoint)
    .then((res) => res.text())
    .then((data) => {
      const temp = data.substr(47).slice(0, -2)
      const json = JSON.parse(temp)
      const rows = json.table.rows

      rows.forEach((row) => {
        if (row.c[10].f === id) {
          countryInfo.push(row.c)
          console.log(countryInfo)
        }
      })
    })
    .then(() => {
      console.log(countryInfo[0])
      callInfo()
    })
}
callDataFromGoogleSheets()

function colorChange() {
  document.body.classList.toggle("dark")
  const changer = document.getElementsByClassName("changer")
  const changerText = changer[0].innerHTML

  if (changerText === "Dark Mode") {
    changer[0].innerHTML = "Light Mode"
  } else {
    changer[0].innerHTML = "Dark Mode"
  }
}

function callInfo() {
  console.log("entro")
  const templateAllCards = document.querySelector("#allCards").innerHTML
  const compileAllCards = Handlebars.compile(templateAllCards)
  const htmlCompiledAllCards = compileAllCards(countryInfo)
  document.querySelector(".all-cards").innerHTML = htmlCompiledAllCards
}
