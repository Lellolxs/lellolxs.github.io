var fieldContainer = $("#fieldContainer");

const newField = `
<div class="wrap border border-secondary rounded-4 p-4 mb-3 justify-content-between">
<button class="btn btn-danger closebutton" onclick="delField(this)">X</button>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="width">Szélesség</label>
        <input type="number" id="width">
    </div>
</div>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="height">Magasság</label>
        <input type="number" id="height">
    </div>
</div>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="depth">Vastagság</label>
        <input type="number" id="depth">
    </div>
</div>
<div class="inputfields">
    <div style="width: fit-content;" class="mx-auto">
        <label for="count">Darabszám</label>
        <input type="number" id="count">
    </div>
</div>
</div>
`

function delField(a){
    $(a).parent().remove();
}

const inputs = document.getElementsByTagName('input');

function calculate() {
    for (let i = 0; i < inputs.length; i+=4) {
        let width = Number(inputs[i].value);
        let height = Number(inputs[i+1].value);
        let depth = Number(inputs[i+2].value);
        let count = Number(inputs[i+3].value);
        console.log(width*height*depth*count);
    }
}

function addField() {
    fieldContainer.append($.parseHTML(newField));
}