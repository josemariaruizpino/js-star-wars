class Jedi {
    constructor(health, strength) {
      this.health = health
      this.strength = strength
    }
  
    attack() {
      return this.strength
    }
  
    receiveDamage(damage) {
      this.health -= damage
    }
  }
  
  class Sith extends Jedi {
    constructor(name, health, strength) {
      super(health, strength)
      this.name = name
    }
  
    receiveDamage(damage) {
      this.health -= damage
  
      return this.health > 0
        ? `${this.name} ha recibido ${damage} puntos de daño`
        : `${this.name} ha muerto en acto de combate`
    }
  
    battleCry() {
      return "El lado oscuro manda!"
    }
  }
  
  class Imperial extends Jedi {
    receiveDamage(damage) {
      this.health -= damage
  
      return this.health > 0
        ? `Un imperial ha recibido ${damage} puntos de daño`
        : `Un imperial ha muerto en combate`
    }
  }
  
  class War {
    constructor() {
      this.SithArmy = []
      this.ImperialArmy = []
      this.startTime = new Date().getTime()
    }
  
    addSith(sith) {
      this.SithArmy.push(sith)
    }
  
    addImperial(imperial) {
      this.ImperialArmy.push(imperial)
    }
  
    randomNumber(max) {
      return Math.floor(Math.random() * max)
    }
  
    genericAttack() {
      if (this.SithArmy.length > 0 && this.ImperialArmy.length > 0) {
        let randomSith = this.SithArmy[this.randomNumber(this.SithArmy.length)]
        let randomImperial = this.ImperialArmy[this.randomNumber(this.ImperialArmy.length)]
        const randomAttacker = ['imperial', 'sith'].sort(() => 0.5 - Math.random());
  
        let toReturn
  
        if (randomAttacker[0] === 'imperial') {
          toReturn = randomSith.receiveDamage(randomImperial.attack())
          this.SithArmy = this.SithArmy.filter(sith => sith.health > 0)
        } else {
          toReturn = randomImperial.receiveDamage(randomSith.attack())
          this.ImperialArmy = this.ImperialArmy.filter(imperial => imperial.health > 0)
        }
  
        this.printWar(randomAttacker[0])
        return toReturn
      }
    }
  
    showStatus() {
      console.log('Imperials army: ', this.ImperialArmy.length)
      console.log('Siths army: ', this.SithArmy.length)
  
      if (this.ImperialArmy.length <= 0) {
        console.clear()
        return "Siths have won the war of the century!"
      } else if (this.SithArmy.length <= 0) {
        console.clear()
        return "Imperials have fought for their lives and survived another day..."
      } else {
        return `Siths and Imperials are still in the thick of battle.`
      }
    }
  
    printWar(randomAttacker) {
  
      let time = new Date().getTime() - this.startTime
  
      this.SithArmy.length > 0 && this.ImperialArmy.length > 0 && console.clear()
      console.log(randomAttacker + ' attack:')
      console.log('=========================================')
      console.log(this.showStatus())
      console.log('War time: ' + new Date(time).getUTCSeconds() + 's')
      console.log('=========================================')
    }
  }
  
  
  const myWar = new War()
  
  const generateSith = () => new Sith('Harald', 90, 75)
  const generateImperial = () => new Imperial(90, 75)
  
  for (let i = 0; i <= 10; i++) {
    myWar.addSith(generateSith())
    myWar.addImperial(generateImperial())
  }
  
  const warInterval = setInterval(() => {
    if (myWar.ImperialArmy.length <= 0 || myWar.SithArmy.length <= 0) {
      clearInterval(warInterval)
    }
  
    myWar.genericAttack()
  
  }, 1000)
  