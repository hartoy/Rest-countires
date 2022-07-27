console.log("call")

const allCards = document.querySelector(".all-cards")
const output = document.querySelector(".output")
const url = "https://docs.google.com/spreadsheets/d/"
const ssid = "1flZ5H3arFSNaRxb12TSEH3mX3iJCgbZrO0nfanFfU1g"
const query1 = `/gviz/tq?`
const endpoint = `${url}${ssid}${query1}`

const totalInfo = []

function callDataFromGoogleSheets(params) {
  fetch(endpoint)
    .then((res) => res.text())
    .then((data) => {
      const temp = data.substr(47).slice(0, -2)
      const json = JSON.parse(temp)
      const rows = json.table.rows

      rows.forEach((row) => {
        totalInfo.push(row.c)
      })
    })
    .then(() => {
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
  const templateAllCards = document.querySelector("#allCards").innerHTML
  const compileAllCards = Handlebars.compile(templateAllCards)
  const htmlCompiledAllCards = compileAllCards(totalInfo)
  document.querySelector(".all-cards").innerHTML = htmlCompiledAllCards
}

;(function ($) {
  function searcher() {
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase()
        const limit = document.getElementsByClassName("limit")
        // console.log(limit)
        // console.log($(".limit"))

        $(".limit").each(function () {
          let country = this.getAttribute("id").toLowerCase()
          // console.log(country.indexOf(value))

          if (country.indexOf(value) < 0) {
            $(this).removeClass("show")
          } else {
            $(this).addClass("show")
          }
        })
      })
    })
  }
  searcher()
})(jQuery)

filterSelection("all")
function filterSelection(c) {
  var x, i, limit
  x = document.getElementsByClassName("card")
  console.log(x)
  limit = document.getElementsByClassName("limit")
  console.log(limit)
  if (c == "World") c = ""
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show")
    if (x[i].className.indexOf(c) > -1) {
      w3AddClass(x[i], "show")
    }
  }

  for (i = 0; i < limit.length; i++) {
    w3RemoveClass(limit[i], "show")
    if (x[i].className.indexOf(c) > -1) {
      w3AddClass(limit[i], "show")
    }
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2
  arr1 = element.className.split(" ")
  arr2 = name.split(" ")
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i]
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2
  arr1 = element.className.split(" ")
  arr2 = name.split(" ")
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1)
    }
  }
  element.className = arr1.join(" ")
}
