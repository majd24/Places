//call the loadPlaces() function when the page loads
window.addEventListener("load", loadPlaces);


function loadPlaces(){
    var allPlaces = JSON.parse(localStorage.getItem("allPlaces"));

    document.getElementById("listOfPlaces").innerHTML = "";

    if (allPlaces != null && allPlaces.length > 0) {
        console.log(allPlaces)

        //for every JSON object (place) in the array...
        allPlaces.forEach(addItems);

        function addItems(item, index) {


            var ionItem = document.querySelector('#listOfPlaces');
            ionItem.innerHTML += `<ion-item-sliding >
            <ion-item lines="full">
                <ion-avatar slot="start">    
                    ${item.icon}
                </ion-avatar>
                            <ion-label class="PlaceLabel" data="${index}"> 
                                <h2 class="bold"> ${item.title}</h2>
                                <p class="bold">${item.category}</p>
                            </ion-label>
                            <ion-buttons>    
                                <ion-button id="favoriteIcon" class="favoriteButton" data="${index}">
                                    ${item.favoriteIcon}
                                </ion-button>
                            </ion-buttons>
                            </ion-item>
             <ion-item-options>
                <ion-item-option color="danger">
                    <ion-icon data="${index}" class="deletePlaceIcon" size="large" name="trash-outline" slot="bottom"></ion-icon>
                    Delete
                </ion-item-option>
              </ion-item-options>
           </ion-item-sliding> `;
                            

        }

        //retrieves ALL (array) elements with class="deletePlaceIcon"
        var deleteIconElements = document.querySelectorAll('.deletePlaceIcon');
        console.log(deleteIconElements);

        //go through all the elements with class="deletePlaceIcon" and add the click event listener so that the 'deletePlace()' function is called
        for (var i = 0; i < deleteIconElements.length; i++) {
            deleteIconElements[i].addEventListener("click", deletePlace)
        }

        var placeLabels = document.querySelectorAll('.PlaceLabel');
        for (var i = 0; i < placeLabels.length; i++) {
            placeLabels[i].addEventListener('click', presentModal);
        }


        var favoriteIconElements = document.querySelectorAll('.favoriteButton');
        console.log(favoriteIconElements);
        
        for (var i = 0; i < favoriteIconElements.length; i++) {
            favoriteIconElements[i].addEventListener("click", isFavorite)
        }
    

    }else {
        document.getElementById("listOfPlaces").innerHTML = "<ion-item><ion-label>Ops! no places saved yet.</ion-label></ion-item>";
    }
}




function deletePlace() {
    console.log("Delete Place....");
    //the variable 'this' refers to the originating element, in this case the trash icon that was clicked!
    console.log(this);
    //get the value of the data="" attribute from the originating element (the icon that was clicked)
    var placeIndex= this.getAttribute("data");
    console.log("Place index to delete: " + placeIndex);

    
    //step 1
    //get allMessages from localStorage
    var allPlaces = JSON.parse(localStorage.getItem("allPlaces"));

    //step 2:
    //delete message at index 
    allPlaces.splice(placeIndex, 1);

    //step 3:
    //save the new allMessages (missing the deleted message) back to the localStorage
    localStorage.setItem("allPlaces", JSON.stringify(allPlaces));

    //step 4:
    //reload the messages ()
    loadPlaces()
}








function isFavorite(){
    console.log("favorite Place....");
    console.log(this);
    var placeIndex = this.getAttribute("data");

    var allFavorite = JSON.parse(localStorage.getItem("allPlaces"));
    var favoriteUpdate = allFavorite[placeIndex];
    console.log("Before update: ", favoriteUpdate.favorite)

    if  (favoriteUpdate.favorite  == true){
        favoriteUpdate.favoriteIcon = '<ion-icon  slot="icon-only" name="star"></ion-icon>'
        favoriteUpdate.favorite  = false
        localStorage.setItem("allPlaces", JSON.stringify(allFavorite));
        
    }else {
        favoriteUpdate.favorite  = true
        favoriteUpdate.favoriteIcon = '<ion-icon  slot="icon-only" name="star-outline"></ion-icon>'
        localStorage.setItem("allPlaces", JSON.stringify(allFavorite));
    }
    loadPlaces()
    console.log("After update: ", favoriteUpdate.favorite)
    
}





customElements.define('modal-page', class extends HTMLElement {
    connectedCallback() {

        this.innerHTML = `
            <ion-header>
                <ion-toolbar color="danger">
                    <ion-title>${modalElement.componentProps.data.title} place information </ion-title>
                    <ion-buttons slot="primary">
                        <ion-button onClick="dismissModal()">
                            <ion-icon slot="icon-only" name="close"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
            <ion-card>
            ${modalElement.componentProps.data.icon}
        <ion-card-header>
          <ion-card-subtitle>Date:  ${modalElement.componentProps.data.date}, time: ${modalElement.componentProps.data.time}</ion-card-subtitle>
          <ion-card-title> Title: ${modalElement.componentProps.data.title} </ion-card-title>
        </ion-card-header>
        <ion-card-content>
            Descritption: ${modalElement.componentProps.data.description}
        </ion-card-content>
      </ion-card>
            </ion-content>`;
    }
});
const modalElement = document.createElement('ion-modal');

function presentModal() {
    var allPlaces = JSON.parse(localStorage.getItem("allPlaces"));
    //get the value for the data="" attribute (index)
    var index = this.getAttribute("data");

    // create the modal with the `modal-page` component
    modalElement.component = 'modal-page';
    modalElement.swipeToClose = true;
    modalElement.componentProps = {
        'data': allPlaces[index],
    };

    // present the modal
    document.body.appendChild(modalElement);
    return modalElement.present();
}

function dismissModal() {
    modalElement.dismiss();
}








/*

function choosenIcon(icon){
    var isFavourite = '<ion-icon slot="icon-only" name="star" ></ion-icon>';
    var isNotFavourite ='<ion-icon slot="icon-only" name="star-outline" ></ion-icon>';
    if(icon == ture){
        return isFavourite;
    }else{
        return isNotFavourite;
    }
}



function saveFavourite(){
    var place = {
        "favourite" : favourite
    }
}
async function saveFavourite(){
    var icon = true;


    choosenIcon(icon)

}



const CC = document.querySelector('#favouriteButton');
attachEvent(saveButton, 'click', saveButtonClicked);


*/