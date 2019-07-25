
// TODO [in class]: Setup AJAX calls to request and render data

function loadItems() {
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("items").innerHTML = generateHTML(this.responseText);
        }
    };
    ajaxRequest.open("GET", "items", true);
    ajaxRequest.send();
}


function generateHTML(rawData){
    const data = JSON.parse(rawData);
    let html = "";
    for(let item of data){
        html += "<h1>";
        html += item.name;
        html += "</h1><p>";
        html += item.description;
        html += "</p><button>I Need These!</button><hr/>";

    }
    return html;
}


// {{#each items }}
// <h1>{{ this.name }}</h1>
//
// <p>
// {{ this.description }}
// </p>
//
// <button>I Need These!</button>
// <hr/>
//
// {{/each}}
