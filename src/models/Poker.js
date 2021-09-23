const pokerKeys = {
	one: 'one',
	coffee: 'coffee',
	cover: 'cover',
};

class Poker {
	key;
	text;
	image;

    constructor({key,text,image}){
        this.key=key;
        this.text=text;
        this.image=image;
    }
}


export { Poker,pokerKeys};
