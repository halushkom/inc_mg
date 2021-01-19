class Casino{
    constructor(name) {
        this.name = name;
        this.machines = [];
    }
    get getMoney(){
        return this.machines.reduce((cur, machine) =>{
            return cur + machine.GameMachineBudget
        }, 0)
    }
    get getMachineCount (){
        return this.machines.length
    }

}

class GameMachine{
    constructor(number) {
        this.GameMachineBudget = number
    }
    get getMoney(){
        return this.GameMachineBudget
    }
    //метод для відправки грошей в загальну касу
    pushMoneyToBank(number){
        if (number<=this.GameMachineBudget){
            this.GameMachineBudget -= number
        }
        return number
    }

    //метод добавляє гроші в автомат
    addMoneyToGameMachine(number){
        this.GameMachineBudget += number
    }
    play(number){
        let rand1 = Math.floor(0 + Math.random() * (10 + 1 - 0));
        let rand2 = Math.floor(0 + Math.random() * (10 + 1 - 0));
        let rand3 = Math.floor(0 + Math.random() * (10 + 1 - 0));

        if (rand1 == rand2 || rand2 == rand3 || rand1 == rand3){
            console.log('YOU WIN X2')
            number *=2
            this.GameMachineBudget -= number
            return number
        }else if (rand1 == rand2 && rand2 == rand3){
            console.log('YOU WIN X3')
            number *=3
            this.GameMachineBudget -= number
            return number
        }else {
            console.log('YOU LOSE')
            this.GameMachineBudget += number
            return -number
        }
    }
}
class User{
    constructor(name, money) {
        this.name = name;
        this.money = money;
        this._selectMachine = null;

    if (money < 0) {
        console.log('Not anough money')
    }
}
    get selectMachine() {
        return this._selectMachine;
    }

    set selectMachine(machine) {
        this._selectMachine = machine;
    }
    play(money){
        if (money> this.money){
            console.log('Ooo man, please stop')
        }
        if (!this._selectMachine){
            console.log(`${this.name} choose game machine`)
            return
        }
        this.money += this._selectMachine.play(money)

    }
}

class SuperAdmin extends User{
    constructor(name, money) {
        super(name, money);
        this.casino = []
    }
    // метод який добавляє казино
    addCasino(casinoName){
        const newCasino = new Casino(casinoName)
        this.casino = newCasino
        return newCasino
    }
    // метод який подзволяє добавити ігрову машинку
    addGameMachine (casinoCash) {
        if (casinoCash>=this.money){
            console.log("Not enough money")
            return
        }
        const newMachine = new GameMachine(casinoCash)
        this.casino.machines.push(newMachine);
        this.money -= casinoCash;

        return newMachine;
    }
    getMoneyFromCasino(number){
        const machines = [...this.casino.machines]
        let sorted = machines.sort(elem => b.getMoney-a.getMoney)

        for (let i = 0; i< sorted.length; i++){
            if (number>= sorted[i].getMoney){
                number = number - sorted[i].getMoney
                sorted[i].pushMoneyToBank(sorted[i].getMoney)
            }
            this.addMoneyToGameMachine(number)
            return number
        }

    }
    // метод добавляє гроші в ігровий автомат
    addMoneyToGameMachine(id, money){
        if (money <= 0 ){
            console.log("Enter correct amount")
            return
        }
        if ((this.casino==0) || this.casino.machines.length == 0){
            console.log("Create casino or game machine")
            return
        }
        if (money >= this.money){
            console.log("Not enough money to add money to created new casino")
            return
        }
        if (this.casino.machines[id] === undefined) {
            console.error("Game machine ID is wrong.");

            return;
        }

        this.money -= money;
        this.casino.machines[id].GameMachineBudget += money;
    }
    // метод для видалення ігрового автомата і розприділення грошей між іншими
    removeGameMachine(id){
        const machines = [...this.casino.machines];
        if (!machines.length) {
            console.error("Please, create some machine.");

            return;
        }

        if (machines[id] === undefined) {
            console.error("Game machine ID is wrong.");

            return;
        }

        const cash = machines[id].GameMachineBudget;
        machines.splice(id, 1);
        const machineCount = machines.length;

        machines.forEach(machine => {
            const profit = (cash / machineCount).toFixed(2);
            machine.GameMachineBudget += +profit;
        });

        this.casino.machines = [...machines];
    }
}





/*const admin = new SuperAdmin('Nick', 10000)
//console.log(admin)
const casino = admin.addCasino("Lviv")
//console.log(casino)
const machine = admin.addGameMachine(1000)
console.log(casino)
admin.addGameMachine(600)

const machine1 = new GameMachine(1000)
console.log(machine1.GameMachineBudget)
const user = new User( 'Alex', 50 )
user.selectMachine = machine1

user.play(10)
user.play(10)
user.play(10)
user.play(10)
console.log(user)
//admin.getMoneyFromCasino(200)
console.log(casino.getMoney)
*/