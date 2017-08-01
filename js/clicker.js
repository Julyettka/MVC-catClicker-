const model = {
      cats:[
        { name: "Gaspacho",
            id: "cat1",
            src: "img/kitty.jpg",
            clickCount: 0
        },
        { name: "Walker",
            id: "cat2",
            src: "img/kitty2.jpg",
            clickCount: 0
        },

        { name: "Hippo",
            id: "cat3",
            src: "img/kitty3.jpg",
            clickCount: 0
        },
        { name: "CrazyFrog",
            id: "cat4",
            src: "img/kitty4.jpg",
            clickCount: 0
        }
    ]
   
};


const octopus = {
     createList: function(){ //create list of li with cats' names
        let listArea = document.getElementById("itemList");
        listArea.innerHTML = "";
        let catsNames = model.cats.map(cat => cat.name);
        let catsId = model.cats.map(catId => catId.id);
        let i = 0;
        let liNodes = catsNames.map(function(name){
            let li = document.createElement("li");
            li.id = catsId[i];
            i++;
            let att = document.createAttribute("onClick");
            att.value = "view.displayCurrent(this.id)";
            li.setAttributeNode(att);
            let textNode = document.createTextNode(name);
            li.appendChild(textNode);
            listArea.appendChild(li);
        });
    },

    addCat: function(){
        let form = document.querySelector('form');
        form.innerHTML = "";
        let inputName = document.createElement('input');
        inputName.placeholder = 'Name';
        let inputSrc = document.createElement('input');
        inputSrc.placeholder = 'Add url';
        let saveButton = document.createElement('div'); //not button, imposible to add event list
        saveButton.className = 'btn btn-success';
        let textNode = document.createTextNode("Save");
        saveButton.appendChild(textNode);
        let cancelButton = document.createElement('div');
        cancelButton.className = 'btn btn-danger';
        let textNodeCancel = document.createTextNode("Cancel");
        cancelButton.appendChild(textNodeCancel);
        form.append(inputName, inputSrc, cancelButton, saveButton);
        saveButton.addEventListener('click', octopus.addToBase);
        cancelButton.addEventListener('click', octopus.cancelAddMode);
    },

    renderCat: function(liId){
        let currentCat = model.cats.find(cat => cat.id === liId);
        console.log(currentCat);
        let mainCont = document.querySelector('.generalContent');
        let captionDiv = document.createElement('div');
        captionDiv.className = "col-md-10 text-center";
        let captionHeader = document.createElement('h2');
        let h2name = document.createTextNode(currentCat.name);
        captionHeader.appendChild(h2name);
        captionHeader.className = "nameField";
        let image = document.createElement('img');
        image.className = "photo-pic img-rounded";
        image.src = currentCat.src;
        image.id = currentCat.name;
        let att = document.createAttribute("onClick");
        att.value = "view.likeCurrent(this.id)";
        image.setAttributeNode(att);
        let caption = document.createElement('div');
        caption.className = "caption";
        let p_caption = document.createElement('p');
        let textnode = document.createTextNode("Click me, meow!");
        p_caption.appendChild(textnode);
        caption.appendChild(p_caption);
        let clickField = document.createElement('div');
        clickField.className = "clicked";
        captionDiv.append(captionHeader, image, caption, clickField); //hooray! append work fine
        mainCont.innerHTML = "";
        mainCont.append(captionDiv);
        image.addEventListener("click", octopus.likes);   
    },

    likes: function makeCounter(imgId){
        let currentCat = model.cats.find(cat => cat.name === imgId);
        let click = ++currentCat.clickCount;
        // console.log(click); bug here, currentCat is undefined
        let likesField = document.querySelector(".clicked");
        likesField.innerHTML = click;
    },

    addToBase: function(){
        let form = document.querySelector('form');
        let inputName = form.childNodes[0].value;
        let inputSrc = form.childNodes[1].value;
        let catsId = model.cats.length + 1;
        console.log(catsId);
        let newCatObj = {name: inputName,
                        id : `cat${catsId}`,
                        src: inputSrc,
                        clickCount: 0 };
        model.cats.push(newCatObj);
        console.log(model.cats);
        view.displayList();
        form.innerHTML = "";
    },

    cancelAddMode: function(){
        let form = document.querySelector('form');
        form.innerHTML = "";
    }

};

const view = {
    displayList: function(){
        octopus.createList();
    },
    displayCurrent: function(currentCatId){
        octopus.renderCat(currentCatId);
    },
    likeCurrent: function (currentCatId){
        octopus.likes(currentCatId);
    },

    add: function(){
        octopus.addCat();
    }
    
}

view.displayList(); //make it go
