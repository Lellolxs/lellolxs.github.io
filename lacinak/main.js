var fieldContainer = $("#fieldContainer");
var resultField = $("#eredmeny");

const newField = `
<div class="border border-secondary rounded-4 p-3 pb-2 mb-3 text-light input-bg">
    <button class="btn btn-danger closebutton" onclick="delField(this)">X</button>
    <div class="wrap justify-content-between">
        <div class="inputfields">
            <div style="width: fit-content;" class="mx-auto">
                <label for="width" class="form-label">Szélesség</label>
                <div class="input-group">
                    <input type="number" id="width" oninput="calcIndividual(this)" class="form-control calc-input">
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
                    <input type="number" id="height" oninput="calcIndividual(this)" class="form-control calc-input">
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
                    <input type="number" id="depth" oninput="calcIndividual(this)" class="form-control calc-input">
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
                    <input type="number" id="count" oninput="calcIndividual(this)" value="1" class="form-control calc-input">
                    <div class="input-group-append">
                        <span class="input-group-text"> db </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-light text-center mt-2 individual">
        <span class="">1 db: 0 m<sup>3</sup> | x db: 0 m<sup>3</sup></span>
    </div>
</div>
`

function delField(a){
    $(a).parent().remove();
}


function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

const inputs = document.getElementsByClassName('calc-input');

const r_cost = document.getElementById('resource-cost');
const cost = document.getElementById('cost');
var sum = 0;

function calculate() {
    sum = 0;
    for (let i = 0; i < inputs.length; i+=4) {
        let width = Number(inputs[i].value)/1000;
        let height = Number(inputs[i+1].value)/1000;
        let depth = Number(inputs[i+2].value)/1000;
        let count = Number(inputs[i+3].value);
        sum += width*height*depth*count;
    }
    resultField.empty();
    sum = Math.round(sum*10000)/10000;
    resultField.append(`<span title="${sum}">Össz térfogat: ${sum} m<sup>3</sup></span>`);
    if (isNaN(parseFloat(r_cost.value))) {

    } else {
        cost.innerText = `Összeg: ${formatMoney(sum*parseFloat(r_cost.value))} Ft.`
    }
}

function recalcPrice(){
    if (isNaN(parseFloat(r_cost.value))) {
        return;
    }
    cost.innerText = `Összeg: ${formatMoney(sum*parseFloat(r_cost.value))} Ft.`
}

function addField() {
    fieldContainer.append($.parseHTML(newField));
}

function calcIndividual(e){
    let localroot = $(e).closest('.current-field');
    let individual = localroot.children('.individual');
    let width = parseFloat(localroot.children('#width').value)/1000;
    let height = parseFloat(localroot.children('#height').value)/1000;
    let depth = parseFloat(localroot.children('#depth').value)/1000;
    let count = parseFloat(localroot.children('#count').value);
    let volume = width*depth*height;

    console.log(localroot)
    // console.log(localroot.children('.individual'));
    console.log(localroot.children('#count').html());

    individual.empty();
    individual.append(`<h5>1 db: ${Math.round(volume*10000)/10000} m<sup>3</sup>\t${count} db: ${Math.round(volume*count*10000)/10000} m<sup>3</sup></h5>`);
}