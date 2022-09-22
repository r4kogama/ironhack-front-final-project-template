class User{
  constructor(name, surname, email, password, terms) {
    this.name = (name !== 'undefined' && name !== null) ? this.getOnlyName(name).trim() : null;
    this.surname = (surname !== 'undefined' && surname !== null) ? surname.trim() : null;
    this.email = (email !== 'undefined' && email !== null) ? email.trim().toLowerCase() : null;
    this.password = (password !== 'undefined' && password !== null) ? password.trim() : null;
    this.terms = (terms !== 'undefined' &&  terms !== null) ? terms : false;
  }

  getOnlyName(name){
    let wordName = name.split(' ')[0];
     return wordName.charAt(0).toUpperCase() + wordName.slice(1);
  }
}
export default User;
