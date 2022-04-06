/*
VERSION: 0.1 BETA
*/

export const system = { //константы на которих живет все приложение, ИЗМЕНЕНИЯ НЕ ВНОСИТЬ!!. нормальное название не завезли
    //важные параметры:
    debag: false,
    build_it: "a",

    //параметры игрового поля:
    cell_lend: 2000,
    hills: 9,
    gold_ore: 5,
}

//импорт класса всех ресурсов
import {resource} from "./resurse/resourse.js"


//перемещение
document.addEventListener('keydown', (event) => {
    const keyName = event.code;

    if (keyName === 'KeyW') { //вверх
        window.scrollBy(0, -15)
    }
    if (keyName === 'KeyS') { //вниз
        window.scrollBy(0, 15)
    }
    if (keyName === 'KeyA') { //влево
        window.scrollBy(-15, 0)
    }
    if (keyName === 'KeyD') { //вправо
        window.scrollBy(15, 0)
    }

}, false);

// расчет продуктивности:
//золото
function gold_f() {
    for (let i = 1; i <= resource.gold_mine; i++) {
        resource.gold_mine_production = i * 3
    }
    resource.gold += resource.gold_mine_production //золото от шахт
    resource.gold += resource.tax //золото от налогов

    resource.gold_production = resource.gold_mine_production + resource.tax; //сумирование всех источников дохода

    resource.gold -= resource.gold_use // вычитаем потребление золота из прибили
    //расчет прибыли
    resource.gold_profit = resource.gold_production - resource.gold_use //получаем чистую доходность за ход
}
//еда
function food_f() {
    for (let i = 1; i <= resource.farm; i++) {
        resource.farm_production = i * 3
    }
    resource.food += resource.farm_production //еда от ферм
    resource.food -= resource.food_use // вычитаем потребление еды из прибили
    //расчет прибыли
    resource.farm_profit = resource.farm_production - resource.food_use //получаем чистую доходность за ход

}
//дерево
function wood_f() {
    //считаем сколь приносит одна лесопилка
    for (let i = 1; i <= resource.sawmill; i++) {
        resource.sawmill_production = i * 3
    }
    resource.wood += resource.sawmill_production //общая доходность всех лесопилок
    resource.wood -= resource.wood_use //вычитаем расход дерева из прибилии
    //расчет прибыли
    resource.wood_profit = resource.sawmill_production - resource.wood_use //получаем чистый доход за один ход
}
//камень
function stone_f() {
    for (let i = 1; i <= resource.stone_mine; i++) {
        resource.stone_mine_production = i * 3
    }
    resource.stone += resource.stone_mine_production

    resource.stone -= resource.stone_use
    resource.stone_profit = resource.stone_mine_production - resource.stone_use
}
//люди
// function people_f() {
// }

//обновление ресурсов
function resource_update() {
    //вызов функций ресурсов
    if (resource.food <= -10){
        alert("u lost")
        system.town_hall = 0
    }else {
        //золото
        document.querySelector('#resource_gold').innerHTML =
            "gold: " + resource.gold + " " + resource.gold_profit
        //еда
        document.querySelector('#resource_food').innerHTML =
            "food: " + resource.food  + " " + resource.farm_profit
        //дерево
        document.querySelector('#resource_wood').innerHTML =
            "wood: " + resource.wood + " " + resource.wood_profit
        //камень
        document.querySelector('#resource_stone').innerHTML =
            "stone: " + resource.stone + " " + resource.stone_profit
        //люди
        document.querySelector('#resource_people').innerHTML =
            "people: " + resource.people_use + "/" + resource.people_limit
    }
}
resource_update()

//генирация кнопк меню

let btn_turn = document.createElement('button') //хода
btn_turn.className = "turn_menu-btn"
btn_turn.innerHTML = "turn"
btn_turn.id = "turn__menu-button"
document.querySelector('#control_panel').append(btn_turn)

//строительства



//генерация мира:
for (let i = String(1); i <= system.cell_lend; i++) { //создание плиток
    let div = document.createElement('div')
    div.className = "cell"
    div.id = i
    document.querySelector('#cells').append(div)
}
//генерация гор
for (let i = 1; i <= system.hills + Math.floor(Math.random() * 3); i++) { // создание гор в рандомном месте
    const random = String(Math.floor(Math.random() * system.cell_lend))
    let rand_hills = Math.floor(Math.random() * 3)
    //выдача класов
    document.getElementById(random).classList.add('hills' + rand_hills);
    document.getElementById(random).classList.add('hills');
}
//генерация золотых гор
for (let i = 1; i <= system.gold_ore + Math.floor(Math.random() * 3); i++) { // создание золотых жыл в рандомном месте
    let random = String(Math.floor(Math.random() * system.cell_lend))
    //выдача класов
    document.getElementById(random).classList.add('gold_ore');
}

//кнопка хода
document.querySelector('#turn__menu-button').onclick = function () {
    if (system.town_hall === 0){ //предупреждение
        alert("установите ратушу")
    }
    if (system.town_hall !== 0){ // в случаее успеха закончить ход
        //вывод ресурсов на панель:
        gold_f(); food_f(); wood_f(); stone_f()
        resource_update()

        // дебаг:
        if (system.debag === true){
            console.log("build_it: " + resource.build_it)
            console.log("gold mine: " + resource.gold_mine)
            console.log("farm: " + resource.farm)
            console.log("sawmill: " + resource.sawmill)
            console.log("stone mine: " + resource.stone_mine)
            console.log("resource.stone: " + resource.stone )
        }
    }
}

//подключение зданий
import {townHall, farm, sawmill} from "./bilding/bildings.js"

townHall.bildBtn()
farm.bildBtn()
sawmill.bildBtn()

// обработка нажатия на кнопоки постройки:
document.querySelector('#mine__menu-button').onclick = function () {
    system.build_it = "mine"
}
document.querySelector('#house__menu-button').onclick = function () {
    system.build_it = "house"
}

// выполнение функции строительства:
for (let i = String(1); i <= system.cell_lend; i++) {
    document.getElementById(i).onclick = function (){

        townHall.bildFunc(i)
        farm.bildFunc(i)
        sawmill.bildFunc(i)


        if (system.build_it === "mine" && document.getElementById(i).className === "cell gold_ore" && system.town_hall !== 0) {
            document.getElementById(i).classList.add('minegold')
            resource.gold_mine++
            resource.food_use++

            resource_update()
            system.build_it = ""
        }

        if (system.build_it === "mine" &&
            document.getElementById(i).className === "cell hills0 hills" ||
            document.getElementById(i).className === "cell hills1 hills" ||
            document.getElementById(i).className === "cell hills2 hills" &&
            system.town_hall !== 0) {

            resource.stone_mine++
            resource.food_use++

            if (document.getElementById(i).className === "cell hills0 hills"){
                document.getElementById(i).classList.add('mine0')
            }
            if (document.getElementById(i).className === "cell hills1 hills"){
                document.getElementById(i).classList.add('mine1')
            }
            if (document.getElementById(i).className === "cell hills2 hills"){
                document.getElementById(i).classList.add('mine2')
            }

            resource_update()
            system.build_it = ""
        }

        if (system.build_it === "house" && document.getElementById(i).className === "cell" && system.town_hall !== 0){
            resource.tax++
            resource.food_use++
            resource.people_limit += 10

            resource_update()
            system.build_it = ""
        }

    }
}
