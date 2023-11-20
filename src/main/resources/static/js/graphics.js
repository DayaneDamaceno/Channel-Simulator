
function iniciarGraficoSinalEntrada(){

    let f1 = parseFloat(document.querySelector("#f1").value);

    let exp = "Math.abs(Math.sin(2*Math.PI*" + f1 + "*x))";

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= loopMaxSenoide(String(f1)); x += loopPercorrerSenoide(String(f1))) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Sinal de Entrada",};
    Plotly.newPlot("graficoSinalEntrada", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoSinalEntrada");
}

function iniciarGraficoAmplitudeEntrada(){

    let f1 = parseFloat(document.querySelector("#f1").value);

    const xArray1 = [0,0];
    const yArray1 = [0.63661,0];

    // Define Data
    let data = [
        {
            x: xArray1,
            y: yArray1,
            name:"2/π",
            showlegend: false,
            name:"N = 1",
            mode:"lines markers"

        }
    ];

    for (let k = 1; k <= 50; k += 1) {
        data.push({
            x: [k*f1, k*f1],
            y: [0, Math.abs((-2)/(Math.PI*(4*Math.pow(k,2) - 1)))],
            showlegend: false,
            name:"N = " + k,
            //marker: {color: ['red']},
            mode:"lines markers"
        });
    }

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Amplitude de Entrada",

    };

    // Display using Plotly
    Plotly.newPlot("graficoAmplitudeEntrada", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoAmplitudeEntrada");
}

function iniciarGraficoFaseEntrada(){
    let f1 = parseFloat(document.querySelector("#f1").value);

    // Define Data
    let data = [];

    for (let k = 0; k <= 50; k += 1) {
        data.push({
            x: [k*f1, k*f1],
            y: [0, 0],
            showlegend: false,
            name:"N = " + k,
            //marker: {color: ['red']},
            mode:"lines markers"
        });
    }

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Fase de Entrada em Grau",

    };

    // Display using Plotly
    Plotly.newPlot("graficoFaseEntrada", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoFaseEntrada");
}

function iniciarGraficoAmpliCanal(){

    let f2 = parseFloat(document.querySelector("#f2").value);
    let f3 = parseFloat(document.querySelector("#f3").value);

    let exp = "(1/ "+ f2 +")*(x/Math.sqrt((1+(Math.pow((x/"+ f2 +"),2)))*(1+(Math.pow((x/"+ f3 +"),2)))))";

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= loopMaxSemSenoide(f2, f3); x += loopPercorrerSemSenoide(f2, f3)) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Amplitude do Canal",};
    Plotly.newPlot("graficoAmpliCanal", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoAmpliCanal");
}

function iniciarGraficoFaseCanal(){
    let f2 = parseFloat(document.querySelector("#f2").value);
    let f3 = parseFloat(document.querySelector("#f3").value);

    let exp = "((-Math.PI/2) - Math.atan((x*("+ (f2 + f3) +"))/( "+ (f2*f3) +" - Math.pow(x,2))))*(180/Math.PI)";

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= loopMaxSemSenoide(f2, f3); x += loopPercorrerSemSenoide(f2, f3)) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Fase do Canal em Grua",};
    Plotly.newPlot("graficoFaseCanal", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoFaseCanal");
}

function iniciarGraficoSinalSaida(){

    let f1 = parseFloat(document.querySelector("#f1").value);
    let f2 = parseFloat(document.querySelector("#f2").value);
    let f3 = parseFloat(document.querySelector("#f3").value);

    var funcG = (1/f2)*(f1/Math.sqrt((1+(Math.pow((f1/f2),2)))*(1+(Math.pow((f1/f3),2)))));
    var funcFase = ((-Math.PI/2) - Math.atan((f1*(f2 + f3))/((f2*f3)- Math.pow(f1,2))))*(180/Math.PI);

    let exp = funcG + "*Math.abs(Math.sin(2*Math.PI*" + f1 + "* x +"+ funcFase +"))";

    console.log(funcG, loopMaxSenoide(String(f1)), loopPercorrerSenoide(String(f1)));

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= ((3+funcG)* loopMaxSenoide(String(f1))); x += loopPercorrerSenoide(String(f1))) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Sinal de Saída",};
    Plotly.newPlot("graficoSinalSaida", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoSinalSaida");
}

function iniciarGraficoAmplitudeSaida(){
    let f1 = parseFloat(document.querySelector("#f1").value);
    let f2 = parseFloat(document.querySelector("#f2").value);
    let f3 = parseFloat(document.querySelector("#f3").value);

    let exp;
    let frequenciaX;


    const xArray1 = [0,0];
    const yArray1 = [0,0];

    // Define Data
    let data = [
        {
            x: xArray1,
            y: yArray1,
            name:"2/π",
            showlegend: false,
            name:"N = 1",
            mode:"lines markers"

        }
    ];

    for (let k = 1; k <= 50; k += 1) {

        frequenciaX = k*f1;

        exp = "(1/ "+ f2 +")*(" + k*f1 + "/Math.sqrt((1+(Math.pow((" + k*f1 + "/" + f2 +"),2)))*(1+(Math.pow((" + k*f1 + "/"+ f3 +"),2)))))";

        data.push({
            x: [frequenciaX, frequenciaX],
            y: [0, Math.abs((-2)/(Math.PI*(4*Math.pow(k,2) - 1))) * eval(exp)],
            showlegend: false,
            name:"N = " + k,
            //marker: {color: ['red']},
            mode:"lines markers"
        });
    }

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Amplitude de Saida",

    };

    // Display using Plotly
    Plotly.newPlot("graficoAmplitudeSaida", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoAmplitudeSaida");
}

function iniciarGraficoFaseSaida(){
    // Define Data
    let data = [];
    let exp;
    let frequenciaX;

    let f1 = parseFloat(document.querySelector("#f1").value);
    let f2 = parseFloat(document.querySelector("#f2").value);
    let f3 = parseFloat(document.querySelector("#f3").value);

    for (let k = 0; k <= 50; k += 1) {

        frequenciaX = k*f1;

        exp = "((-Math.PI/2) - Math.atan((" + frequenciaX + "*("+ (f2 + f3) +"))/( "+ (f2*f3) +" - Math.pow(" + frequenciaX + ",2))))*(180/Math.PI)";

        data.push({
            x: [frequenciaX, frequenciaX],
            y: [eval(exp), eval(exp)],
            showlegend: false,
            name:"N = " + k,
            //marker: {color: ['red']},
            mode:"lines markers"
        });
    }

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Fase de Saída em Grau",

    };

    // Display using Plotly
    Plotly.newPlot("graficoFaseSaida", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoFaseSaida");
}

iniciarGraficoSinalEntrada();
iniciarGraficoAmplitudeEntrada();
iniciarGraficoFaseEntrada();
iniciarGraficoAmpliCanal();
iniciarGraficoFaseCanal();
iniciarGraficoSinalSaida();
iniciarGraficoAmplitudeSaida();
iniciarGraficoFaseSaida();

function atualizarSinalGrafico() {
    setTimeout(function(){
        iniciarGraficoSinalEntrada();
        iniciarGraficoAmplitudeEntrada();
        iniciarGraficoFaseEntrada();
        iniciarGraficoAmpliCanal();
        iniciarGraficoFaseCanal();
        iniciarGraficoSinalSaida();
        iniciarGraficoAmplitudeSaida();
        iniciarGraficoFaseSaida();
    }, 200);
}

function autoEscala(grafico) {
    Plotly.relayout(grafico, {
        'xaxis.autorange': true,
        'yaxis.autorange': true
    });
}

function loopMaxSenoide(frequencia) {
    let numero;

    if(frequencia >= 1){

        let a = frequencia.toString().split('.')[0].length;

        numero = "0.";

        for (let x = 1; x < a; x += 1)
            numero += "0";

        numero+= "6";

    }else{

        let b = frequencia.toString().split('.')[1].length;
        numero = "6";

        for (let x = 1; x < b; x += 1)
            numero += "0";

    }

    return parseFloat(numero);
}

function loopPercorrerSenoide(frequencia) {
    let numero;

    if(frequencia >= 0.05){

        var a = frequencia.toString().split('.')[0].length;

        numero = "0.000";

        for (let x = 1; x < a; x += 1)
            numero += "0";

        numero+= "3";

    }else{

        var b = frequencia.toString().split('.')[1].length;
        numero = "5";

        for (let x = 3; x < b; x += 1)
            numero += "0";

    }

    return parseFloat(numero);
}

function loopMaxSemSenoide(f2, f3) {
    let numero, frequencia;

    frequencia = f2 > f3 ? f2 : f3;

    if(frequencia >= 0.005){

        let b = frequencia.toString().split('.')[0].length;
        numero = "200";

        for (let x = 1; x < b; x += 1)
            numero += "0";

    }else{

        let a = frequencia.toString().split('.')[1].length;

        numero = "0.";

        for (let x = 4; x < a; x += 1)
            numero += "0";

        numero+= "6";

    }

    return parseFloat(numero);
}

function loopPercorrerSemSenoide(f2, f3) {
    let numero, frequencia;

    frequencia = f2 > f3 ? f3 : f2;

    if(frequencia < 1){

        let b = frequencia.toString().split('.')[1].length;
        numero = "0.0";

        for (let x = 0; x < b; x += 1)
            numero += "0";

        numero+= "2";

    }else{

        if(frequencia > 250){
            let a = frequencia.toString().split('.')[0].length;

            numero = "3";

            for (let x = 3; x < a; x += 1)
                numero += "0";

            numero = f3-f2 > 25000 ? numero*4 : numero;
        }else
            numero = 0.8
    }



    return parseFloat(numero);
}

