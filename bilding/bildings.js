import {system} from "../main.js"
import {resource} from  "../resurse/resourse.js"

class Builds{
    constructor(
        BName, BClass, ButtonClass, ButtonName,
        ProfitTax, ProfitWood, ProfitStone,  ProfitGold, ProfitFood, ProfitPeopleLimit,
        B_useWood, B_useStone, B_useGold,
        T_useWood, T_useStone, T_useGold, T_useFood) {

        //имя, класс
        this.Bname = BName
        this.Bclass = BClass
        this.BTNckass = ButtonClass
        this.BTNname = ButtonName
        //прибиль
        this.ProfitTax = ProfitTax
        this.ProfitWood = ProfitWood
        this.ProfitStone = ProfitStone
        this.ProfitGold = ProfitGold
        this.ProfitFood = ProfitFood
        this.ProfitPeopleLimit = ProfitPeopleLimit
        //использование ресурсов для строительства
        this.B_useWood = B_useWood
        this.B_useStone = B_useStone
        this.B_useGold = B_useGold
        //использование ресурсов за ход
        this.T_useWood = T_useWood
        this.T_useStone = T_useStone
        this.T_useGold = T_useGold
        this.T_useFood = T_useFood
    }

    bildBtn() {
        let btn = document.createElement('button')
        btn.className = this.BTNckass
        btn.innerHTML = this.BTNname
        btn.id = this.Bname + "__menu-button"
        document.querySelector('#control_panel').append(btn)

        let Bname = this.Bname
        document.getElementById(this.Bname + "__menu-button").onclick = function () {
            system.build_it = Bname
        }
    }
    bildFunc(i) {
        if (system.build_it === this.Bname
            && document.getElementById(i).classList.contains("cell") === true
            && document.getElementById(i).classList.contains(this.Bclass) === true
            && document.getElementById(i).classList.contains(this.Bname) === false) {
            //добавление класса к елементу
            document.getElementById(i).classList.add(this.Bname);

            //ресурсы за ход
            resource.tax += this.ProfitTax
            resource.sawmill += this.ProfitWood
            resource.stone_mine += this.ProfitStone
            resource.gold_mine += this.ProfitGold
            resource.farm += this.ProfitFood
            resource.people_limit += this.ProfitPeopleLimit
            //использование ресурсов за ход
            resource.food_use += this.T_useFood
            resource.gold_use += this.T_useGold
            resource.wood_use += this.T_useWood
            resource.stone_use += this.T_useStone
            //использование ресурсов для строительства
            resource.wood -= this.B_useWood
            resource.stone -= this.B_useStone
            resource.gold -= this.B_useGold

            //дополнительно
            if (document.getElementById(i).classList.contains("hills0") === true){
                document.getElementById(i).classList.add('mine0')
            }
            if (document.getElementById(i).classList.contains("hills1") === true) {
                document.getElementById(i).classList.add('mine1')
            }
            if (document.getElementById(i).classList.contains("hills2") === true) {
                document.getElementById(i).classList.add('mine2')
            }

            //ОЧИСТКА СЕЛЕКТОРА
            system.build_it = ""
        }
    }
}

//добавлять здания тут
//     Bname, Bclass, BTNckass, BTNname,
//     ProfitTax, ProfitWood, ProfitStone, ProfitGold, ProfitFood, ProfitPeopleLimit,
//     B_useWood, B_useStone, B_useGold,
//     T_useWood, T_useStone, T_useGold, T_useFood

export let townHall = new Builds(
    "town_hall", "cell", "build_menu-btn", "town hall",
    1, 0, 0, 0, 0, 10,
    3, 3, 0,
    0, 0, 0, 2)

export let farm = new Builds (
    "farm", "cell", "build_menu-btn", "farm",
    0, 0, 0, 0, 1, 0,
    3, 3, 1,
    0, 0, 0, 0)

export let sawmill = new Builds(
    "sawmill", "cell", "build_menu-btn", "sawmill",
    0, 1, 0, 0, 0, 0,
    3, 3, 0,
    0, 0, 0, 1)

export let house = new Builds(
    "house", "cell", "build_menu-btn", "house",
    1, 0, 0, 0, 0, 10,
    3, 3, 0,
    0, 0, 0, 2)

export let mineGold = new Builds(
    "mineGold", "gold_ore", "build_menu-btn", "mine gold",
    0, 0, 0, 1, 0, 0,
    3, 3, 0,
    0, 0, 0, 1)

export let mineStone = new Builds(
    "mineStone", "hills", "build_menu-btn", "mine stone",
    0, 0, 1, 0, 0, 0,
    3, 3, 0,
    0, 0, 0, 1)