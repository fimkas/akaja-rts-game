// class Bildings{
//     BildName: "name",
//     BildClass: "class",
//     //использование за ход
//     UseWood_turn: "",
//     UseFood_turn: "",
//     UseStone_turn: "",
//     UseGold_turn: "",
//     //использование для строительства
//     UseWood_bild: "",
//     UseFood_bild: "",
//     UseStone_bild: "",
//     UseGold_bild: ""
//     //функции здания
// }

class Bilds{
    constructor(Bname, Bclass, ProfitTax, B_useWood, B_useStone, B_useGold, T_useWood, T_useStone, T_useGold, T_useFood) {
        //имя, класс
        this.Bname = Bname
        this.Bclass = Bclass
        //прибиль
        this.ProfitTax = ProfitTax
        this.ProfitWood = ProfitWood
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

    allerts() {
        alert(this.Bname)
        alert(this.Bclass)
    }
}

//добавлять здания тут

export let townHall = new Bilds("town_hall", "town_hall", 1, 3, 3, 0)