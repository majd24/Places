function attachEvent(target, event, callback) {
    target.addEventListener(event, callback);
    
}



function saveDetails(title, category, description, date, time, icon, favorite, favoriteIcon) {
    var Place = {
        "title": title,
        "category": category,
        "description": description,
        "date":date,
        "time":time,
        "icon":icon,
        "favorite":favorite,
        "favoriteIcon":favoriteIcon
    }

    //See whether there are people saved in the localStorage with the key 'allPlaces', then convert into a JSON object.
    var existingPlaces = JSON.parse(localStorage.getItem('allPlaces'));
    if(existingPlaces == null)
    {
        /* If existingPlaces is null, thus it has not been declared as an array 
         * since there are no people saved in the array of JSON objects yet, 
         * then we will declare and initialize existingPlaces as an array. */
        existingPlaces = [];
    }

    //Add Place object to existingPlaces JSON object.
    existingPlaces.push(Place);

    /* Update the localStorage 'allPlaces' key with the newly added value. 
     * Given that the value in the localStorage setItem function is of type string, 
     * we would need to convert from JSON object to string in order to comply with type compatibility. */
    localStorage.setItem('allPlaces', JSON.stringify(existingPlaces));

    /* loadPeople();
     */
}


function validateData(title, category, description) {
    let areAllFieldsCorrect = false;
    //We use && because we need to ensure that BOTH fields are completed.
    if(title != '' && description != '' && category != 'hidden')
    areAllFieldsCorrect = true;
    return areAllFieldsCorrect;
}




function choosenIcon(category){
    var restaurantIcon = '<ion-icon size="large" name="restaurant-sharp"></ion-icon>';
    var shopIcon = '<ion-icon size="large" name="pricetags-sharp"></ion-icon>'
    var informationIcon = '<ion-icon size="large" name="information-circle-sharp"></ion-icon>'
    var leisureIcon = '<ion-icon size="large" name="umbrella-sharp"></ion-icon>'
    if(category == 'restaurant'){
        return restaurantIcon;
    }else if(category == 'shop'){
        return shopIcon;
    }else if(category == 'information'){
        return informationIcon;
    }else{
        return leisureIcon;
    }
}




async function saveButtonClicked() {
    var title = document.querySelector('#title').value;
    var category =  document.getElementById('categorySelect').value;
    var description = document.querySelector('#description').value;
    var date = new Date().getDate() +'/'+ (new Date().getMonth() + 1)+'/'+ new Date().getFullYear();
    var time = new Date().getHours() +"h/"+ new Date().getMinutes() +"m";
    var message, buttons = null
    var icon = choosenIcon(category);
    var favorite = true;
    var favoriteIcon='<ion-icon  slot="icon-only" name="star-outline"></ion-icon>';

    if(validateData(title, category, description)){
        message = "Are you sure you want to save this location"
        buttons = [{
            text: 'Cancel',
            role: 'cancel',
        }, {
            text: 'Ok',
            handler: () => {

                saveDetails(title, category, description, date, time, icon, favorite, favoriteIcon);

                window.location.href = "index.html";
            }
        }];

    }else{
        message = "You need to fill in ALL boxes!"
        buttons = ['Ok']
    }
    const alert = await alertController.create({
        message: message,
        buttons: buttons
    }); 
    
    await alert.present();

}




const CC = document.querySelector('#saveButton');
attachEvent(saveButton, 'click', saveButtonClicked);
/*attachEvent(window, 'load', onWindowLoaded);*/