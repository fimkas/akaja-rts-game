import {system} from "../main.js"
import {resource} from  "../resurse/resourse.js"

class Bilds{
    constructor(
        Bname, Bclass, BTNckass, BTNname,
        ProfitTax, ProfitWood, ProfitStone,  ProfitGold, ProfitFood, ProfitPeopleLimit,
        B_useWood, B_useStone, B_useGold,
        T_useWood, T_useStone, T_useGold, T_useFood) {

        //имя, класс
        this.Bname = Bname
        this.Bclass = Bclass
        this.BTNckass = BTNckass
        this.BTNname = BTNname
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
        if (system.build_it === this.Bname && document.getElementById(i).className === "cell") {
            document.getElementById(i).classList.add(this.Bclass);
            //ресурсы за ход
            resource.tax += this.ProfitTax
            resource.sawmill += this.ProfitWood
            resource.stone_mine += this.ProfitStone
            resource.gold_mine += this.ProfitGold
            resource.farm += this.ProfitFood
            resource.people_limit += this.ProfitPeopleLimit
            //использование ресурсов за ход

            //использование ресурсов для строительства

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

export let townHall = new Bilds(
    "town_hall", "town_hall", "build_menu-btn", "town hall",
    1, 0, 0, 0, 0, 10,
    3, 3, 0,
    0, 0, 0, 2)

export let farm = new Bilds (
    "farm", "farm", "build_menu-btn", "farm",
    0, 0, 0, 0, 1, 0,
    3, 3, 0,
    0, 0, 0, 2)

export let sawmill = new Bilds("sawmill", "sawmill", "build_menu-btn", "sawmill",
    0, 1, 0, 0, 0, 0,
    3, 3, 0,
    0, 0, 0, 2)