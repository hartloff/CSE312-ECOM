// TODO [in class]: Setup AJAX calls to request and render data

function initialize() {
    updateItems();
    setInterval(function () {
        updateItems();
        updateItems2();
    }, 10000)
}

function updateItems() {
    let AJAXRequest = new XMLHttpRequest();

    AJAXRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("items").innerHTML = toHTML(this.response);
        }
    };
    AJAXRequest.open('GET', '/allItems');
    AJAXRequest.send();
}


function updateItems2() {
    let AJAXRequest = new XMLHttpRequest();

    AJAXRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("stuff").innerHTML = this.response;
        }
    };
    AJAXRequest.open('GET', '/stuff');
    AJAXRequest.send();
}


function toHTML(rawResponse) {
    const data = JSON.parse(rawResponse);

    let html = "";

    for (const item of data) {
        html += "<hr/><h1>";
        html += item.name;
        html += "</h1><p>";
        html += item.description;
        html += "</p>";
        for (const review of item.reviews) {
            html += review.rating + ": " + review.review + "<br/>";
        }
        html += "<button>I Need These!</button><br/><br/>";

        // html += '<form method="post" action="/addReview">';
        // html += '<input type="text" name="id" value="' + item.id + '" hidden/>';
        for (let i = 1; i <= 5; i++) {
            html += '<input type="radio" name="rating_' + item.id + '" value="' + i + '"/> ' + i + '<br/>'
        }
        html += '<input type="text" id="review_' + item.id + '" width="100"/>';
        html += '<button onclick="submitReview(\'' + item.id + '\')">Submit</button>';
        // html += '<input type="submit">';
        // html += '</form>';
    }

    return html;
}

function submitReview(itemId) {
    const radioButtons = document.getElementsByName("rating_" + itemId);
    let rating = -1;
    for (const button of radioButtons) {
        if (button.checked) {
            rating = button.value;
        }
    }

    const review = document.getElementById("review_" + itemId).value;

    if (rating !== -1) {
        sendRating(itemId, rating, review);
    }
}

function sendRating(itemId, rating, review) {
    let AJAXRequest = new XMLHttpRequest();

    AJAXRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // document.getElementById("items").innerHTML = toHTML(this.response);
        }
    };
    AJAXRequest.open('POST', '/addReview');
    AJAXRequest.setRequestHeader("Content-Type", "application/json");
    AJAXRequest.send(JSON.stringify({id: itemId, rating: rating, review: review}));
}