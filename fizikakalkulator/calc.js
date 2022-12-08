let promise = Promise.resolve();  // Used to hold chain of typesetting calls

function typeset(code) {
  promise = promise.then(() => MathJax.typesetPromise(code()))
                   .catch((err) => console.log('Typeset failed: ' + err.message));
  return promise;
}

function calc() {
    var tempunit = document.getElementById("unitofT").value;
    var voluunit = document.getElementById("unitofV").value;
    var presunit = document.getElementById("unitofP").value;
    
    var convtemp, convvol, convpres;

    var R = document.getElementById("InputR").value;
    var P = document.getElementById("InputP").value;
    var T = document.getElementById("InputT").value;
    var V = document.getElementById("InputV").value;
    var N = document.getElementById("InputN").value;

    let emptyfieldcount = 5;
    if (!(R == null || R == "")){
        emptyfieldcount--;
    }
    if (!(P == null || P == "")){
        emptyfieldcount--;
    }
    if (!(T == null || T == "")){
        emptyfieldcount--;
    }
    if (!(V == null || V == "")){
        emptyfieldcount--;
    }
    if (!(N == null || N == "")){
        emptyfieldcount--;
    }

    // Nyomás pascalban, térfogat m3-ban, hő kelvinben

    if (emptyfieldcount == 0){
        alert("Nincs mit számolni, minden meg van adva.");
    } else if (emptyfieldcount == 1){
        
        switch (tempunit) {
            case 'kelvin':
                convtemp = Math.round(Number(T)*1000)/1000; 
                break;
            case 'celsius':
                convtemp = Math.round((Number(T) + 273.15)*1000)/1000;
                break;
            case 'farenheit':
                convtemp = Math.round(((Number(T) - 32) * 5/9 + 273.15)*1000)/1000;
                break;
        }
    
        switch (voluunit) {
            case 'mm':
                convvol = Math.round(Number(V) / 1000000000*1000)/1000;
                break;
            case 'cm':
                convvol = Math.round(Number(V) / 1000000*1000)/1000;
                break;
            case 'dm':
            case 'l':
                // igen tudom
                convvol = Math.round(Number(V) / 1000 * 1000)/1000;
                break;
            case 'm':
                convvol = Math.round(Number(V)*1000)/1000;
                break;
        }
    
        switch (presunit) {
            case 'pa':
                convpres = Math.round(Number(P)*1000)/1000;
                break;
            case 'kpa':
                convpres = Math.round(Number(P) * 1000 * 1000) / 1000;
                break;
            case 'mpa':
                convpres = Math.round(Number(P) * 1000000 * 1000) / 1000;
                break;
            case 'gpa':
                convpres = Math.round(Number(P) * 1000000000 * 1000) / 1000;
                break;
            case 'tpa':
                convpres = Math.round(Number(P) * 1000000000000 * 1000) / 1000;
                break;
        }
        
        if (R == null || R == ""){
            typeset(() => {
                const math = document.getElementById("missingvar");
                math.innerHTML = "Jelen esetben \\(R\\) hiányzik, az egyesített gáztörvényt használva, ki tudjuk számolni az értékét.";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("equation");
                math.innerHTML = "$$R = {p \\cdot V \\over n \\cdot T}$$";
                math.style = "font-size: 120%;";
                return [math];
            });
            let somtext = document.getElementById("conversionnote");
            somtext.innerHTML = "Átváltott értékekkel, behelyettesítve:";
            somtext.style = "text-align: center;";

            typeset(() => {
                const math = document.getElementById("completeequation");
                math.innerHTML = `$$R = {${convpres}\\cdot ${convvol} \\over ${N} \\cdot ${convtemp}} = ${Math.round((convpres*convvol)/(N*convtemp)*1000)/1000}$$`;

                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });

            typeset(() => {
                const math = document.getElementById("Runitofmeasurement");
                math.innerHTML = "\\(J \\over mol*K\\)";

                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
        }
        else if (P == null || P == ""){
            typeset(() => {
                const math = document.getElementById("missingvar");
                math.innerHTML = "Jelen esetben \\(p\\) hiányzik, az egyesített gáztörvényt használva, ki tudjuk számolni az értékét.";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("equation");
                math.innerHTML = "$$p = {{n \\cdot R \\cdot T}\\over V}$$";
                math.style = "font-size: 120%;";
                return [math];
            });
            let somtext = document.getElementById("conversionnote");
            somtext.innerHTML = "Átváltott értékekkel, behelyettesítve:";
            somtext.style = "text-align: center;";

            typeset(() => {
                const math = document.getElementById("completeequation");
                math.innerHTML = `$$p = {{${N} \\cdot ${R} \\cdot ${convtemp}}\\over ${convvol}} = ${Math.round((N*R*convtemp)/convvol*1000)/1000}$$`;
                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("Runitofmeasurement");
                math.innerHTML = "\\(Pa\\)";

                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
        }
        else if (T == null || T == ""){
            typeset(() => {
                const math = document.getElementById("missingvar");
                math.innerHTML = "Jelen esetben \\(T\\) hiányzik, az egyesített gáztörvényt használva, ki tudjuk számolni az értékét.";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("equation");
                math.innerHTML = "$$T = {{p \\cdot V} \\over {n \\cdot R}}$$";
                math.style = "font-size: 120%;";
                return [math];
            });
            let somtext = document.getElementById("conversionnote");
            somtext.innerHTML = "Átváltott értékekkel, behelyettesítve:";
            somtext.style = "text-align: center;";

            typeset(() => {
                const math = document.getElementById("completeequation");
                math.innerHTML = `$$T = {{${convpres} \\cdot ${convvol}} \\over {${N} \\cdot ${R}}} = ${Math.round((convpres*convvol)/(N*R)*1000)/1000}$$`;
                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("Runitofmeasurement");
                math.innerHTML = "\\(K\\)";

                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
        }
        else if (V == null || V == ""){
            typeset(() => {
                const math = document.getElementById("missingvar");
                math.innerHTML = "Jelen esetben \\(V\\) hiányzik, az egyesített gáztörvényt használva, ki tudjuk számolni az értékét.";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("equation");
                math.innerHTML = "$$V = {{n \\cdot R \\cdot T}\\over p}$$";
                math.style = "font-size: 120%;";
                return [math];
            });
            let somtext = document.getElementById("conversionnote");
            somtext.innerHTML = "Átváltott értékekkel, behelyettesítve:";
            somtext.style = "text-align: center;";

            typeset(() => {
                const math = document.getElementById("completeequation");
                math.innerHTML = `$$V = {{${N} \\cdot ${R} \\cdot ${convtemp}}\\over ${convpres}} = ${Math.round((N*R*convtemp)/convpres*1000)/1000}$$`;
                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("Runitofmeasurement");
                math.innerHTML = "\\(m^3\\)";

                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
        }
        else if (N == null || N == ""){
            typeset(() => {
                const math = document.getElementById("missingvar");
                math.innerHTML = "Jelen esetben \\(n\\) hiányzik, az egyesített gáztörvényt használva, ki tudjuk számolni az értékét.";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("equation");
                math.innerHTML = "$$n = {{p \\cdot V} \\over {R \\cdot T}}$$";
                math.style = "font-size: 120%;";
                return [math];
            });
            let somtext = document.getElementById("conversionnote");
            somtext.innerHTML = "Átváltott értékekkel, behelyettesítve:";
            somtext.style = "text-align: center;";

            typeset(() => {
                const math = document.getElementById("completeequation");
                math.innerHTML = `$$n = {{${convpres} \\cdot ${convvol}} \\over {${R} \\cdot ${convtemp}}} = ${Math.round((convpres*convvol)/(R*convtemp)*1000)/1000}$$`;
                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
            typeset(() => {
                const math = document.getElementById("Runitofmeasurement");
                math.innerHTML = "\\(mol\\)";

                math.style = "display: inline-block; font-size: 120%;";
                return [math];
            });
        }
    } else {
        alert("Még csak egy ismeretlenes egyenletet tudunk megoldani.");
    }

}
function toggleEdit() {
    var inputfield = document.getElementById("InputR");
    inputfield.disabled = !inputfield.disabled;
}