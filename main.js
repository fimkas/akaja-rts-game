/*
VERSION: 0.1 BETA
*/

const system = { //константы на которих живет все приложение, ИЗМЕНЕНИЯ НЕ ВНОСИТЬ!!. нормальное название не завезли
    //важные параметры:
    debag: false,
    build_it: "",

    //параметры игрового поля:
    cell_lend: 2000,
    hills: 9,
    gold_ore: 5,

    town_hall: 0,
}

const resource = {
    people_limit: 0,
    people_use: 0,

    gold_mine: 0,
    gold_mine_production: 0,
    tax: 0,
    gold: 100,
    gold_production: 0,
    gold_profit: 0,
    gold_use: 0,

    farm: 0,
    farm_production: 0,
    food: 100,
    farm_profit: 0,
    food_use: 2,

    sawmill: 0,
    sawmill_production: 0,
    wood: 100,
    wood_profit: 0,
    wood_use: 0,

    //переменные связанные с камнем
    stone_mine: 0,
    stone_mine_production: 0,
    stone: 100,
    stone_profit: 0,
    stone_use: 0
}

//перемещение
document.addEventListener('keydown', (event) => {
    const keyName = event.code;

    if (keyName === 'KeyW') {
        window.scrollBy(0, -15)
    }
    if (keyName === 'KeyS') {
        window.scrollBy(0, 15)
    }
    if (keyName === 'KeyA') {
        window.scrollBy(-15, 0)
    }
    if (keyName === 'KeyD') {
        window.scrollBy(15, 0)
    }

}, false);

// расчет продуктивности:
function gold_f() {
    for (let i = 1; i <= resource.gold_mine; i++) {
        resource.gold_mine_production = i * 3
    }
    resource.gold += resource.gold_mine_production //золото от шахт

    resource.gold += resource.tax //золото от налогов

    resource.gold_production = resource.gold_mine_production + resource.tax; //сумирование всех источников дохода

    //расчет прибыли
    resource.gold -= resource.gold_use
    resource.gold_profit = resource.gold_production - resource.gold_use
}
function food_f() {
    for (let i = 1; i <= resource.farm; i++) {
        resource.farm_production = i * 3
    }
    resource.food += resource.farm_production //еда от ферм

    //расчет прибыли
    resource.food -= resource.food_use
    resource.farm_profit = resource.farm_production - resource.food_use

}
function wood_f() {
    for (let i = 1; i <= resource.sawmill; i++) {
        resource.sawmill_production = i * 3
    }
    resource.wood += resource.sawmill_production

    resource.wood -= resource.wood_use
    resource.wood_profit = resource.sawmill_production - resource.wood_use
}
function stone_f() {
    for (let i = 1; i <= resource.stone_mine; i++) {
        resource.stone_mine_production = i * 3
    }
    resource.stone += resource.stone_mine_production

    resource.stone -= resource.stone_use
    resource.stone_profit = resource.stone_mine_production - resource.stone_use
}

// function people_f() {
//     for (let i = 1; i <= resource.stone_mine; i++) {
//         resource.stone_mine_production = i * 3
//     }
// }

function resource_update() {
    document.querySelector('#resource_gold').innerHTML = "gold: " + resource.gold + " " + resource.gold_profit
    document.querySelector('#resource_food').innerHTML = "food: " + resource.food  + " " + resource.farm_profit
    document.querySelector('#resource_wood').innerHTML = "wood: " + resource.wood + " " + resource.wood_profit
    document.querySelector('#resource_stone').innerHTML = "stone: " + resource.stone + " " + resource.stone_profit
    document.querySelector('#resource_people').innerHTML = "people: " + resource.people_use + "/" + resource.people_limit
}

//генерация мира:
for (let i = 1; i <= system.cell_lend; i++) { //создание плиток
    let div = document.createElement('div')
    div.className = "cell"
    div.innerHTML = ".";
    div.id = i
    document.querySelector('#cells').append(div)
}

for (let i = 1; i <= system.hills + Math.floor(Math.random() * 3); i++) { // создание гор в рандомном месте
    const random = Math.floor(Math.random() * system.cell_lend)
    let rand_hills = Math.floor(Math.random() * 3)
    document.getElementById(random).classList.add('hills' + rand_hills);
    document.getElementById(random).classList.add('hills');

    document.getElementById(random).innerHTML = "hills"
}

for (let i = 1; i <= system.gold_ore + Math.floor(Math.random() * 3); i++) { // создание золотых жыл в рандомном месте
    let random = Math.floor(Math.random() * system.cell_lend)
    document.getElementById(random).innerHTML = "gold_ore"
    document.getElementById(random).classList.add('gold_ore');
}

// обработка нажатия на кнопоки постройки:
document.querySelector('#town-hall__menu-button').onclick = function () {
    system.build_it = "town_hall"
}

document.querySelector('#farm__menu-button').onclick = function () {
    system.build_it = "farm"
}

document.querySelector('#sawmill__menu-button').onclick = function () {
    system.build_it = "sawmill"
}

document.querySelector('#mine__menu-button').onclick = function () {
    system.build_it = "mine"
}

document.querySelector('#house__menu-button').onclick = function () {
    system.build_it = "house"
}

//кнопка хода
document.querySelector('#turn__menu-button').onclick = function () {
    if (system.town_hall === 0){
        alert("установите ратушу")
    }
    if (system.town_hall !== 0){
        //вывод ресурсов на панель:
        gold_f()
        food_f()
        wood_f()
        stone_f()
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
// выполнение функции строительства:
for (let i = 1; i <= system.cell_lend; i++) {
    document.getElementById(i).onclick = function (){

        if (system.build_it === "town_hall" && document.getElementById(i).innerHTML === "." && system.town_hall !== 1) {
            document.getElementById(i).innerHTML = system.build_it
            document.getElementById(i).classList.add('town_hall');
            document.querySelector('#town-hall__menu-button').style.display = 'none'
            system.town_hall = 1
            resource.tax++
            resource.people_limit += 10

            resource_update()
            system.build_it = ""
        }

        if (system.build_it === "farm" && document.getElementById(i).innerHTML === "." && system.town_hall !== 0) {
            document.getElementById(i).innerHTML = system.build_it
            document.getElementById(i).classList.add('farm');
            resource.farm++

            resource.wood -= 5
            resource.stone -= 5

            resource_update()
            system.build_it = ""
        }

        if (system.build_it === "sawmill" && document.getElementById(i).innerHTML === "." && system.town_hall !== 0) {
            document.getElementById(i).innerHTML = system.build_it
            resource.sawmill++
            resource.food_use++

            resource_update()
            system.build_it = ""
        }

        if (system.build_it === "mine" && document.getElementById(i).innerHTML === "gold_ore" && system.town_hall !== 0) {
            document.getElementById(i).innerHTML = system.build_it + "gold"
            resource.gold_mine++
            resource.food_use++

            resource_update()
            system.build_it = ""
        }

        if (system.build_it === "mine" && document.getElementById(i).innerHTML === "hills" && system.town_hall !== 0) {
            document.getElementById(i).innerHTML = system.build_it + "stone"
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

        if (system.build_it === "house" && document.getElementById(i).innerHTML === "." && system.town_hall !== 0){
            document.getElementById(i).innerHTML = system.build_it
            resource.tax++
            resource.food_use++
            resource.people_limit += 10

        }

    }
}
