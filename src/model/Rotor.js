class Rotor {
  static get ALPHABET() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  constructor(id, wiring, turnover) {
    this.id = id;
    this.wiring = wiring;
    this.turnover = turnover ? turnover : this.wiring.length - 1;
    this.alphabet = Rotor.ALPHABET;
    this.offset = 0;
    this.position = 0;
    this.onTurnover = undefined;
  }

  apply(ch) {
    // Obtener la posición inicial ajustada por el offset y la posición del rotor
    let pos = (Rotor.ALPHABET.indexOf(ch) + this.position - this.offset) % this.wiring.length;
    if (pos < 0) pos += this.wiring.length; // Asegurarse de que la posición esté en el rango

    // Obtener la letra cifrada basada en la posición en el wiring del rotor
    let ch2 = Rotor.ALPHABET.includes(ch) ? Rotor.ALPHABET[(Rotor.ALPHABET.indexOf(this.wiring[pos]) + this.offset) % this.wiring.length] : undefined;

    // Calcular la posición final ajustada por la posición del rotor
    let pos2 = (Rotor.ALPHABET.indexOf(ch2) - this.position + this.wiring.length) % this.wiring.length;
    
    return Rotor.ALPHABET[pos2]; // Devolver la letra cifrada
  }

  reverseApply(ch) {
    // Obtener la posición inicial ajustada por el offset y la posición del rotor
    let pos = (Rotor.ALPHABET.indexOf(ch) + this.position - this.offset) % this.wiring.length;
    if (pos < 0) pos += this.wiring.length; // Asegurarse de que la posición esté en el rango

    // Obtener la letra descifrada basada en la posición inversa en el wiring del rotor
    let ch2 = Rotor.ALPHABET.includes(ch) ? Rotor.ALPHABET[(this.wiring.indexOf(Rotor.ALPHABET[pos]) + this.offset) % this.wiring.length] : undefined;

    // Calcular la posición final ajustada por la posición del rotor
    let pos2 = (Rotor.ALPHABET.indexOf(ch2) - this.position + this.wiring.length) % this.wiring.length;
    
    return Rotor.ALPHABET[pos2]; // Devolver la letra descifrada
}

  setOffset(pos) {
    this.offset = pos;
  }

  setPosition(pos) {
    this.position = pos;
  }

  incPosition() {
    if (
      (this.turnover instanceof Array &&
        this.turnover.includes(this.position)) ||
      this.position === this.turnover
    ) {
      if (this.onTurnover) this.onTurnover();
    }
    this.position++;
    if (this.position >= this.wiring.length) this.position = 0;
  }

  appendRotorToLeft(rotor) {
    this.onTurnover = () => {
      rotor.incPosition();
    };
  }

  removeRotor() {
    this.onTurnover = undefined;
  }

  static get I() {
    return new Rotor("I", "EKMFLGDQVZNTOWYHXUSPAIBRCJ", 15);
  }

  static get II() {
    return new Rotor("II", "AJDKSIRUXBLHWTMCQGZNPYFVOE", 4);
  }

  static get III() {
    return new Rotor("III", "BDFHJLCPRTXVZNYEIWGAKMUSQO", 21);
  }

  static get IV() {
    return new Rotor("IV", "ESOVPZJAYQUIRHXLNFTGKDCMWB", 9);
  }

  static get V() {
    return new Rotor("V", "VZBRGITYUPSDNHLXAWMJQOFECK", 25);
  }

  static get VI() {
    return new Rotor("VI", "JPGVOUMFYQBENHZRDKASXLICTW", [25,12]);
  }

  static get VII() {
    return new Rotor("VII", "NZJHGRCXMYSWBOUFAIVLPEKQDT", [25,12]);
  }

  static get VIII() {
    return new Rotor("VIII", "FKQHTLXOCBJSPDZRAMEWNIUYGVT", [25,12]);
  }

  //Reflectors
  static get UKW_B() {
    return new Rotor("UKW-B", "YRUHQSLDPXNGOKMIEBFZCWVJAT");
  }

  static get UKW_C() {
    return new Rotor("UKW-C", "FVPJIAOYEDRZXWGCTKUQSBNMHL");
  }

  clone() {
    const clone = Object.create(Object.getPrototypeOf(this));
    Object.assign(clone, this);
    return clone;
  }
}

export default Rotor;
