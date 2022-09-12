
let HtmlElements = [
    document.querySelectorAll("input"),
    document.querySelectorAll('[contenteditable=true]'),
    document.querySelectorAll('textarea'),
    document.querySelectorAll('iframe'),
]
let dictionary = [
    {
        mainWord: "Cat",
        replaceWordFirst: "Dog",
        replaceWordSecond: "Rat",
        replaceWordThird: "bat",
    },
    {
        mainWord: "Helo",
        replaceWordFirst: "hello",
        replaceWordSecond: "Help",
        replaceWordThird: "Hell",
    },
    {
        mainWord: "heldp",
        replaceWordFirst: "help",
        replaceWordSecond: "held",
        replaceWordThird: "hello",
    }
]
let isOpen = false
let x = 0
let y = 0

document.body.addEventListener('mousemove', function (e: any) {
    y = e.clientY
    x = e.clientX
});
const removeMenu = () => {
    let menu = document.getElementById('menu_text') as HTMLHtmlElement
    let style = document.getElementById('menu_style') as HTMLHtmlElement

    isOpen = false
    if(menu && style){
        menu.remove()
        style.remove()
    }
}

const makeReplacement = (i: any, p: any, element: HTMLHtmlElement, word: { word: any, index: any }) => {
    isOpen = true
    if (!document.body.contains(document.getElementById('menu_text'))
        && !document.body.contains(document.getElementById('menu_style'))) {
        createPopUpInfo(true, i.replaceWordFirst, i.replaceWordSecond, i.replaceWordThird)
    }
    let links = document.querySelectorAll(".chose_box-btn")
    let btn = document.getElementById("btn") as HTMLHtmlElement;

    btn.addEventListener('click', () => {
        isOpen && removeMenu()
    })

    links.forEach((v: any) => {
        v.addEventListener("click", (l: any) => {
            l.preventDefault()
            let sent;
            if (p.target.nodeName === "INPUT" || p.target.nodeName === "TEXTAREA") {
                sent = p.target.value.split(' ')


                sent.splice(word.index, 1, l.target.innerText.toString().trim())
                p.target.value = sent.join(' ')

            } else {
                sent = p.target.innerText.split(' ')

                sent.splice(word.index, 1, l.target.innerText.toString().trim())
                p.target.innerText = sent.join(' ')
            }

            isOpen && removeMenu()
            element.focus()

        })
    })
}
// @ts-ignore
const changeWord = (sentence: any, p: any, word?: any, element: HTMLHtmlElement) => {


    dictionary.forEach((i: any) => {
        if (word.word === i.mainWord && p.type === "click") {
            makeReplacement(i, p, element, word)
        } else if (p.type === 'keypress') {

            sentence.forEach((words: any) => {
                if (words === i.mainWord && !isOpen) {

                    makeReplacement(i, p, element, word)
                }
            })
        }
    })
}


const createPopUpInfo = (isShow: boolean, var1?: string, var2?: string, var3?: string) => {

    const div = document.createElement("div");
    const style = document.createElement('style');
    style.innerHTML = `
        .container_menu{
            width: 150px;
            margin: 10px auto;
            border-radius: 12px;
            background: #fff;
            box-shadow: 0 0 4px 0 rgb(0 0 0 / 30%);
            display: block;
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            z-index: 1000;
        }
        .choose_box{
            list-style: none;
            padding-left: 0;
            margin: 0;
        }
        #btn{
            padding: 5px 10px;
            margin: 8px;
            outline: none;
            background-color: rgba(70, 0, 255, 0.8);
            color: #fff;
            font-weight: 600;
            border: 0;
            border-radius: 12px;
            display: flex;
            margin-right: auto;
            cursor:pointer;
        }   
        
        a:visited {
            color: #000 !important;
        }
        
        .chose_box-btn{
            text-decoration: none;
            color: #000;
            font-weight: 600;
            font-size: 16px;
            display: block;
             font-family: sans-serif;

        }
        
        .choose_box-item{
            margin-bottom: 5px;
            padding: 8px 12px;
            transition: .2s;
        }
        
        .choose_box-item:hover{
            background-color: rgba(70, 0, 255, 0.8);
           
        }
        
        .choose_box-item:hover a{
            color: #fff;
        }

        
        .choose_box-item:last-child{
            margin-bottom: 0;
            border-radius: 0 0 12px 12px;
        }
    `;
    div.className = "container_menu"
    div.setAttribute("id", "menu_text");
    style.setAttribute('id', 'menu_style');
    div.innerHTML = `
       <button class="btnClose" id="btn">Close</button>
       <ul class="choose_box">
          <li class="choose_box-item">
              <a class="chose_box-btn"  href="#">
                  ${var1}
              </a>
          </li>
          <li class="choose_box-item">
              <a class="chose_box-btn" href="#">
                  ${var2}
              </a>
          </li>
          <li class="choose_box-item">
              <a class="chose_box-btn" href="#">
                  ${var3}
              </a>
          </li>
      </ul>
    `

    document.body.append(div, style)



}

const getClickedWord = (selectionStart: any, value: any) => {
    let arr = value.split(" ");
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].length + 1
        if (sum > selectionStart) {
            if(arr[i].length < 15){
                return {word: arr[i].trim(), index: i};
            }
        }
    }
}

const handleHTMLElement = (items: HTMLHtmlElement[]) => {
    let word: { word: any; index: number } | undefined ;
    let sentence: any;
    items.forEach((element: HTMLHtmlElement) => {
        element.addEventListener("click", (e: any) => {

            if (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA") {
                let i = e.currentTarget.selectionStart
                word = getClickedWord(i, e.target.value)
                sentence = e.target.value.split(' ')
            } else {

                // @ts-ignore
                word = getClickedWord(window.getSelection().focusOffset, e.target.innerText)
                sentence = e.target.innerText.split(' ')
            }
            if(word){
                changeWord(sentence, e, word, element)
            }

        })


        element.addEventListener("keypress", (p: any) => {

            if (p.target.nodeName === "INPUT" || p.target.nodeName === "TEXTAREA") {
                sentence = p.target.value.split(' ')
            } else {
                sentence = p.target.innerText.split(' ')
            }
            changeWord(sentence, p, word, element)
        })
    })
}

HtmlElements.forEach((i: any) => {
    handleHTMLElement(i)
})
