class Token {
  static #instance = null;
   constructor() {
     if(!Token.#instance) {
       Token.#instance = this
     } else {
       return Token.#instance
     }
  }

  set(name, jwt) {
     return localStorage.setItem(name, jwt);
  }

  get(name) {
    return localStorage.getItem(name)
  }

  remove(name) {
    localStorage.removeItem(name)
  }
}

export const token = new Token();

