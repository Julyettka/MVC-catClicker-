class ListMaker{
    constructor(name, options){
        this.options = Object.assign({}, ListMaker.defaultOptions, options);
        this.name = name;
        this.listArea = document.querySelector(this.options.listArea);
        this.updateList(this.listArea, this.name, this.root);
    }
    updateList(listArea, name, root){
        let linode = document.createElement('li');
        let textnode = document.createTextNode(this.name);
        linode.appendChild(textnode);
        listArea.appendChild(linode);
    }
}

ListMaker.defaultOptions = {
    listArea: "#itemList"
};


class CaptionMaker{
    constructor(src){
        this.mainCont = document.querySelector('.generalContent');
        this.captionDiv = document.createElement('div');
        this.src = src;
        this.counter = this.captionIndex();
        this.getRootId(this.counter, this.captionDiv);
        this.createCaption(this.captionDiv, this.src, this.mainCont);

    }

    captionIndex(){
        let index = 0;
        return function(){
            return index++;
        }
    }

    getRootId(counter, captionDiv){
        let rootId = this.counter();
        this.captionDiv.id = "cat_" + rootId;
        return this.captionDiv;
    }

    createCaption(captionDiv, src){ //!!!!!!!!add alt to images
        this.captionDiv.className = "col-md-10 text-center";
        let captionHeader = document.createElement('h2');
        captionHeader.className = "nameField";
        let image = document.createElement('img');
        image.className = "photo-pic img-rounded";
        image.src = src;
        let caption = document.createElement('div');
        caption.className = "caption";
        let p_caption = document.createElement('p');
        let textnode = document.createTextNode("Click me, meow!");
        p_caption.appendChild(textnode);
        caption.appendChild(p_caption);
        let clickField = document.createElement('div');
        clickField.className = "clicked";
        this.captionDiv.append(captionHeader, image, caption, clickField); //hooray! append work fine
        this.mainCont.innerHTML = "";
        this.mainCont.append(this.captionDiv);
    }
}


class Clicker{
    constructor(root, name, options){
        this.options = Object.assign({}, Clicker.defaultOptions, options);
        this.root = root;
        this.name = name;
        
        this.nameField = this.root.querySelector(this.options.nameField);
        this.nameField.innerHTML = this.name;
        this.photo = this.root.querySelector(this.options.photo);
        this.clicksCounterField = this.root.querySelector(this.options.clicksCounterField);
        this.currentCount = this.options.count;
        this.photo.addEventListener('click', this.counter.bind(this));
    }


    counter(currentCount){
        this.currentCount++;
        this.clicksCounterField.innerHTML = this.currentCount;
        return this.currentCount;
    }
}

Clicker.defaultOptions = {
    photo: ".photo-pic",
    nameField: ".nameField",
    clicksCounterField: ".clicked",
    count: 0
};



function renderFunc(src, name){
    console.log("fffff");
    let animal = new CaptionMaker(src);
    let animal_Root = animal.getRootId(); 
    animal = new Clicker (animal_Root, name);
}

let cat_1 = new ListMaker('Kenny');
cat_1.listArea.childNodes[1].addEventListener('click', renderFunc.bind(this, "img/kitty.jpg", "Kenny"));

let cat_2 = new ListMaker('React');
cat_2.listArea.childNodes[2].addEventListener('click', renderFunc.bind(this, "img/kitty2.jpg", "React"));

let cat_3 = new ListMaker('Tom');
cat_3.listArea.childNodes[3].addEventListener('click', renderFunc.bind(this, "img/kitty3.jpg", "Tom"));

let cat_4 = new ListMaker('Kitty');
cat_4.listArea.childNodes[4].addEventListener('click', renderFunc.bind(this, "img/kitty4.jpg", "Kitty"));





