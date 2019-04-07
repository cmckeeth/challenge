var baseUrl = "localhost:50365";

function displayItems() {
    var items = getItems();

    for(var item in items)
    {
        

    }


}







//async functions

function getItems() {
    var url = baseUrl + "/items";
    

    return items;
}


function addItem(name, price, desc, image) {
    var url = baseUrl + "/items";


}


function removeItem(name) {
    var url = baseUrl + "/items";



}