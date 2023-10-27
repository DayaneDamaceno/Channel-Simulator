
function iniciarGraficoSinalEntrada(){
    let exp = "Math.sin(x)";

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Sinal de entrada",};
    Plotly.newPlot("graficoSinalEntrada", data, layout);
}

function iniciarGraficoAmplitudeEntrada(){
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
        title: "Amplitude de entrada",

    };

    // Display using Plotly
    Plotly.newPlot("graficoAmplitudeEntrada", data, layout);
}

function iniciarGraficoFaseEntrada(){
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
        title: "Fase de entrada",

    };

    // Display using Plotly
    Plotly.newPlot("graficoFaseEntrada", data, layout);
}

function iniciarGraficoCanal(){
    let exp = "Math.sin(x)";

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Canal Passa Faixa",};
    Plotly.newPlot("graficoCanal", data, layout);
}

function iniciarGraficoSinalSaida(){
    let exp = "Math.sin(x)";

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Sinal de Saida",};
    Plotly.newPlot("graficoSinalSaida", data, layout);
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
    Plotly.newPlot("graficoAmplitudeSaida", data, layout);
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
        title: "Fase de Saida",

    };

    // Display using Plotly
    Plotly.newPlot("graficoFaseSaida", data, layout);
}

iniciarGraficoSinalEntrada();
iniciarGraficoAmplitudeEntrada();
iniciarGraficoFaseEntrada();
iniciarGraficoCanal();
iniciarGraficoSinalSaida();
iniciarGraficoAmplitudeSaida();
iniciarGraficoFaseSaida();

