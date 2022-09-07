let item = document.getElementById('cont')
let btn = document.getElementById('btn_pop')
let theme = 'DARK'


btn.addEventListener('click', () => {
    item.classList.toggle('dark')
    if(item.classList.contains('dark')){
        theme = "DARK"
    }else {
        theme = "LIGHT"
    }

    localStorage.setItem("Theme", JSON.stringify(theme));

})



let getTheme = JSON.parse(localStorage.getItem("Theme"))

if(getTheme === "DARK") {
    item.classList.add("dark")
}