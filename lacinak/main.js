var fieldContainer = $("#fieldContainer");
var resultField = $("#eredmeny");

const newField = `
<div class="wrap border border-secondary rounded-4 p-4 mb-3 justify-content-between">
<button class="btn btn-danger closebutton" onclick="delField(this)">X</button>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="width" class="form-label">Szélesség</label>
        <div class="input-group">
            <input type="number" id="width" class="form-control">
            <div class="input-group-append">
                <span class="input-group-text"> mm </span>
            </div>
        </div>
    </div>
</div>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="height" class="form-label">Magasság</label>
        <div class="input-group">
            <input type="number" id="height" class="form-control">
            <div class="input-group-append">
                <span class="input-group-text"> mm </span>
            </div>
        </div>
    </div>
</div>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="depth" class="form-label">Vastagság</label>
        <div class="input-group">
            <input type="number" id="depth" class="form-control">
            <div class="input-group-append">
                <span class="input-group-text"> mm </span>
            </div>
        </div>
    </div>
</div>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="count" class="form-label">Darabszám</label>
        <div class="input-group">
            <input type="number" id="count" class="form-control">
            <div class="input-group-append">
                <span class="input-group-text"> db </span>
            </div>
        </div>
    </div>
</div>
</div>
`

function delField(a){
    $(a).parent().remove();
}

const inputs = document.getElementsByTagName('input');

function calculate() {
    // TODO: convert to m from mm so big numbers dont crash the system.
    // this is a piece of shit as it is now but it works \ö/
    let sum = 0;
    for (let i = 0; i < inputs.length; i+=4) {
        let width = Number(inputs[i].value)/1000;
        let height = Number(inputs[i+1].value)/1000;
        let depth = Number(inputs[i+2].value)/1000;
        let count = Number(inputs[i+3].value);
        sum += width*height*depth*count;
    }
    resultField.empty();
    resultField.append(`<span title="${sum}">Eredmény: <u>${Math.round(sum*1000000)/1000000}m<sup>3</sup></u></span>`);
    //console.log(sum)
}

function addField() {
    fieldContainer.append($.parseHTML(newField));
}