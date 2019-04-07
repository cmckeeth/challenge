var baseUrl = "http://localhost:50365";

$(document).ready(function () {
    getItems();
});


function displayItems(itemsString) {
    var items = JSON.parse(itemsString);

    if (items && items.length) {
        for (i = 0; i < items.length; i++) {
            injectItem(items[i].Name, items[i].Description, items[i].Price, items[i].ImagePath);
        }
    }
    else
        console.log("No Items in inventory.")

}

//jquery ajax functions
function addItem(name, desc, price, imgPath) {
    const url = baseUrl + "/addItem";
    const data =
        {
            "Name": name,
            "Description": desc,
            "Price": price,
            "ImagePath": imgPath
        };
    $.ajax({
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('Content-Type', 'application/json');
        },
        url: url,
        data: JSON.stringify(data),
        processData: false,
        success: function (msg) {
            location.reload();
        }
    });
    addBoxToggle();
}
function removeItem(name) {
    const url = baseUrl + "/removeItem";
    const data =
        {
            "Name": name
        };
    $.ajax({
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('Content-Type', 'application/json');
        },
        url: url,
        data: JSON.stringify(data),
        processData: false,
        success: function (msg) {
            location.reload();
        }
    });
    removeBoxToggle();
}
function getItems() {
    const url = baseUrl + "/getItems";
    $.get(url, function (data, success) {
        console.log(data);
        if (success = "success")
        {
            displayItems(data);
        }
    });

}

function injectItem(_name, _desc, _price, _imgStr) {

    var wrapper = document.createElement("DIV");
    wrapper.className = "card-wrapper"
    var card = document.createElement("DIV");
    card.className = "flip-card"
    var inner = document.createElement("DIV");
    inner.className = "flip-card-inner"


    var front = document.createElement("DIV");
    front.className = "flip-card-front"
    var back = document.createElement("DIV");
    back.className = "flip-card-back"


    //set card elements
    var img = document.createElement("img");
    img.className = "prod-image";
    img.src = _imgStr;

    var name = document.createElement("h2");
    name.innerHTML = _name;

    var price = document.createElement("h3");
    price.innerHTML = "$"+_price;

    var desc = document.createElement("P");
    desc.innerHTML = _desc;

    //create div
    var main = document.getElementById("main")


    back.appendChild(name)
    back.appendChild(price);
    back.appendChild(desc);
    front.appendChild(img);
    inner.appendChild(back);
    inner.appendChild(front);
    card.appendChild(inner);
    wrapper.appendChild(card);
    main.appendChild(wrapper); 


}

//toggle functions
function addBoxToggle() {
    var x = document.getElementById("addBox");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function removeBoxToggle() {
    var x = document.getElementById("removeBox");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}