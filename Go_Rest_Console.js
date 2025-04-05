let consoleFormEl = document.getElementById("consoleForm");
let requestUrlEl = document.getElementById("requestUrl");
let responseStatusEl = document.getElementById("responseStatus");
let requestUrlErrMsgEl = document.getElementById("requestUrlErrMsg");

let requestMethodEl = document.getElementById("requestMethod");

let requestBodyEl = document.getElementById("requestBody");
let responseBodyEl = document.getElementById("responseBody");

let sendRequestBtnEl = document.getElementById("sendRequestBtn");

let formData = {
    requestUrl: "https://gorest.co.in/public-api/users",
    requestMethod: "POST",
    requestBody: ""
}

requestUrlEl.addEventListener("change", function(event) {
    formData.requestUrl = event.target.value;
});

requestMethodEl.addEventListener("change", function(event) {
    formData.requestMethod = event.target.value;
})

requestBodyEl.addEventListener("change", function(event) {
    formData.requestBody = event.target.value;
});

function validateForm(formData) {
    let {
        requestUrl
    } = formData;
    if (requestUrl === "") {
        requestUrlErrMsgEl.textContent = "Required*";
    } else {
        requestUrlErrMsgEl.textContent = "";
    }
}

function submitRequest(formData) {
    let {
        requestUrl,
        requestMethod,
        requestBody
    } = formData;

    let options = {
        method: requestMethod,
        body: requestBody
    };

    fetch(requestUrl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let responseStatus = jsonData.code;
            let responseBody = JSON.stringify(jsonData);
            responseStatusEl.value = responseStatus;
            responseBodyEl.value = responseBody;
        });
}


consoleFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm(formData);
    submitRequest(formData);
});