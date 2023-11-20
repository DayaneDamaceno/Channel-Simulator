var notyf = new Notyf({
    duration: 5000,
    position: {
        x: 'right',
        y: 'top',
    },});
async function obterExpressao(grafic, frequencias) {
    const params = criarQueryString(frequencias);

    try {
        const response = await fetch(`/expressao/${grafic}?${params}`);
        if (!response.ok) {
            console.log(response)
            throw new Error('Erro ao chamar ao obter a expressão');
        }
        const data = await response.json();
        console.log(grafic, data.expressao);
        return data.expressao;
    } catch (error) {
        console.error(error);
    }
}

function criarQueryString(obj) {
    var queryString = '';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString.length > 0) {
                queryString += '&';
            }
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }
    }
    return queryString;
}

async function iniciarGraficoSinalEntrada() {

    let frequencias = {
        frequenciaDoSinal: parseFloat(document.querySelector("#f1").value)
    }

    let exp = await obterExpressao('sinal-entrada', frequencias);

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 100; x += 0.01) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x: xValues, y: yValues, mode: "lines"}];
    const layout = {title: "Sinal de Entrada",};
    Plotly.newPlot("graficoSinalEntrada", data, layout, {displayModeBar: false, scrollZoom: true});

    autoEscala("graficoSinalEntrada");
}

function iniciarGraficoAmplitudeEntrada(){

    let f1 = parseFloat(document.querySelector("#f1").value);

    const xArray1 = [0,0];
    const yArray1 = [0.63661,0];

    const xArray2 = [f1,f1];
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

async function iniciarGraficoAmpliCanal() {
    let frequencias = {
        frequenciaInicialDoCanal: parseFloat(document.querySelector("#f2").value),
        frequenciaFinalDoCanal: parseFloat(document.querySelector("#f2").value)
    }

    let exp = await obterExpressao('amplitude-canal', frequencias);
    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 100; x += 0.1) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x: xValues, y: yValues, mode: "lines"}];
    const layout = {title: "Amplitude do Canal",};
    Plotly.newPlot("graficoAmpliCanal", data, layout, {displayModeBar: false, scrollZoom: true});

    autoEscala("graficoAmpliCanal");
}

async function iniciarGraficoFaseCanal() {
    let frequencias = {
        frequenciaInicialDoCanal: parseFloat(document.querySelector("#f2").value),
        frequenciaFinalDoCanal: parseFloat(document.querySelector("#f2").value)
    }

    let exp = await obterExpressao('fase-canal', frequencias);

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x: xValues, y: yValues, mode: "lines"}];
    const layout = {title: "Fase do Canal",};
    Plotly.newPlot("graficoFaseCanal", data, layout, {displayModeBar: false, scrollZoom: true});

    autoEscala("graficoFaseCanal");
}

async function iniciarGraficoSinalSaida() {

    let frequencias = {
        frequenciaDoSinal: parseFloat(document.querySelector("#f1").value),
        frequenciaInicialDoCanal: parseFloat(document.querySelector("#f2").value),
        frequenciaFinalDoCanal: parseFloat(document.querySelector("#f2").value)
    }

    let exp = await obterExpressao('sinal-saida', frequencias);
    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 25; x += 0.001) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x: xValues, y: yValues, mode: "lines"}];
    const layout = {title: "Sinal de Saída",};
    Plotly.newPlot("graficoSinalSaida", data, layout, {displayModeBar: false, scrollZoom: true});

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

function toggleVisible(id, classe) {
    let div = document.getElementById(id);
    div.classList.toggle(classe);
}

function hidden(id) {
    let div = document.getElementById(id);
    if (!div.classList.contains("d-none")) {
        div.classList.add("d-none");
    }
}

function show(id) {
    let div = document.getElementById(id);
    if (div.classList.contains("d-none")) {
        div.classList.remove("d-none");
    }
}
function visibleHidden(id) {
    let div = document.getElementById(id);
    if (!div.classList.contains("visible-none")) {
        div.classList.add("visible-none");
    }
}

function isValid(){
    let f1 = document.querySelector("#f1").value;
    let f2 = document.querySelector("#f2").value;
    let f3 = document.querySelector("#f3").value;
    const values = [f1,f2,f3];

    if(values.includes('') || values.includes('0')){
        notyf.error('Preencha todas as frequencias');
        return false;
    }
    if(Number(f2) > Number(f3)){
        notyf.error('Frequência inicial do canal não pode ser maior que a final');
        return false;
    }
    return  true;

}

async function calcular(){
    if(!isValid()){
        show("empty");
        visibleHidden("content");
        return;
    }
    hidden("empty");
    toggleVisible("loading", "d-none");
    visibleHidden("content");
    await iniciarGraficoSinalEntrada();
    iniciarGraficoAmplitudeEntrada();
    iniciarGraficoFaseEntrada();
    await iniciarGraficoAmpliCanal();
    await iniciarGraficoFaseCanal();
    await iniciarGraficoSinalSaida();
    iniciarGraficoAmplitudeSaida();
    iniciarGraficoFaseSaida();
    toggleVisible("loading","d-none");
    toggleVisible("content","visible-none");
}

function autoEscala(grafico) {
    Plotly.relayout(grafico, {
        'xaxis.autorange': true,
        'yaxis.autorange': true
    });
}