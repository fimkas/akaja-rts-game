import {system} from "../main.js"

class Bilds{
    constructor(
        Bname, Bclass, BTNckass, BTNname, BTNid,
        ProfitTax, ProfitWood, ProfitGold, ProfitPeopleLimit,
        B_useWood, B_useStone, B_useGold,
        T_useWood, T_useStone, T_useGold, T_useFood) {

        //имя, класс
        this.Bname = Bname
        this.Bclass = Bclass
        this.BTNckass = BTNckass
        this.BTNname = BTNname
        this.BTNid = BTNid
        //прибиль
        this.ProfitTax = ProfitTax
        this.ProfitWood = ProfitWood
        this.ProfitGold = ProfitGold
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
        btn.id = this.BTNid
        document.querySelector('#control_panel').append(btn)

        document.getElementById(this.BTNid).onclick = function () {
            system.build_it = "town_hall"
        }
    }
}

//добавлять здания тут

export let townHall = new Bilds(
    "town_hall", "town_hall", "build_menu-btn", "town hall", "town-hall__menu-button",
    1, 0, 0, 10,
    3, 3, 0,
    0, 0, 0, 2)