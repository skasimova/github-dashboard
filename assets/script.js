let user = {
    name: "Джон",
    age: 30,

    sayHi() {
        // this - это "текущий объект"
        alert(this.name);
    }

};

user.sayHi();