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
    constructor(Bname, Bclass) {
        this.Bname = Bname
        this.Bclass = Bclass
    }

    allerts() {
        alert(this.Bname)
        alert(this.Bclass)
    }
}

let bilds = new Bilds("town", "Bss")
bilds.allerts()