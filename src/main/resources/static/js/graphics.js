
function iniciarGraficoSinalEntrada(){

    let f1 = parseFloat(document.querySelector("#f1").value);

    let exp = "Math.abs(Math.sin(2*Math.PI*" + f1 + "*x))";

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 100; x += 0.01) {
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

    const xArray2 = [1*f1,1*f1];
    const yArray2 = [0,0.2122];

    const xArray3 = [2*f1,2*f1];
    const yArray3 = [0,0.04244];

    const xArray4 = [3*f1,3*f1];
    const yArray4 = [0,0.01818];

    const xArray5 = [4*f1,4*f1];
    const yArray5 = [0,0.01010];

    const xArray6 = [5*f1,5*f1];
    const yArray6 = [0,0.00643];

    // Define Data
    const data = [
        {
            x: xArray1,
            y: yArray1,
            name:"2/π",
            mode:"lines"

        },
        {
            x: xArray2,
            y: yArray2,
            name:"-2/3π",
            mode:"lines"

        },
        {
            x: xArray3,
            y: yArray3,
            name:"-2/15π",
            mode:"lines"

        },
        {
            x: xArray4,
            y: yArray4,
            name:"-2/35π",
            mode:"lines"

        },
        {
            x: xArray5,
            y: yArray5,
            name:"-2/63π",
            mode:"lines"

        },
        {
            x: xArray6,
            y: yArray6,
            name:"-2/99π",
            mode:"lines"

        }
    ];

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Amplitude de Entrada",

    };

    // Display using Plotly
    Plotly.newPlot("graficoAmplitudeEntrada", data, layout, {displayModeBar:false, scrollZoom: true, responsive: true});

    autoEscala("graficoAmplitudeEntrada");
}

function iniciarGraficoFaseEntrada(){
    const xArray1 = [0,50];
    const yArray1 = [0,0];

    // Define Data
    const data = [
        {
            x: xArray1,
            y: yArray1,
            name:"-arctan(bn/an)",
            mode:"lines"
        }
    ];

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Fase de Entrada",

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
    for (let x = 0; x <= 100; x += 0.1) {
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
    for (let x = 0; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Fase do Canal",};
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
    console.log(exp);

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 25; x += 0.001) {
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
    const xArray1 = [10,10];
    const yArray1 = [10,0];

    const xArray2 = [20,20];
    const yArray2 = [20,0];

    // Define Data
    const data = [
        {
            x: xArray1,
            y: yArray1,
            mode:"lines"
        },
        {
            x: xArray2,
            y: yArray2,
            mode:"lines"
        }
    ];

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Amplitude de Saida",

    };

    // Display using Plotly
    Plotly.newPlot("graficoAmplitudeSaida", data, layout, {displayModeBar:false, scrollZoom: true});
}

function iniciarGraficoFaseSaida(){
    const xArray1 = [10,10];
    const yArray1 = [10,0];

    const xArray2 = [20,20];
    const yArray2 = [20,0];

    // Define Data
    const data = [
        {
            x: xArray1,
            y: yArray1,
            mode:"lines"
        },
        {
            x: xArray2,
            y: yArray2,
            mode:"lines"
        }
    ];

    // Define Layout
    const layout = {
        xaxis: {range: [0, 160], title: ""},
        yaxis: {range: [0, 16], title: ""},
        title: "Fase de Saída",

    };

    // Display using Plotly
    Plotly.newPlot("graficoFaseSaida", data, layout, {displayModeBar:false, scrollZoom: true});
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