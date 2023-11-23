//Objeto responsável pela notificação de erro
var notyf = new Notyf({
    duration: 5000,
    position: {
        x: 'right',
        y: 'top',
    },});

//Função responsável por chamar a controller e retornar a expressão matemática
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

//Função responsável por concatenar os parâmetros em uma URL
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

// Função responsável por chamar a controller da fórmula do sinal de entrada e preencher o gráfico
async function iniciarGraficoSinalEntrada() {

    let frequencias = {
        frequenciaDoSinal: parseFloat(document.querySelector("#f1").value)
    }

    let exp = await obterExpressao('sinal-entrada', frequencias);

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= loopMaxSenoide(String(frequencias.frequenciaDoSinal)); x += loopPercorrerSenoide(String(frequencias.frequenciaDoSinal))) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x: xValues, y: yValues, mode: "lines"}];
    const layout = {title: "Sinal de Entrada",};
    Plotly.newPlot("graficoSinalEntrada", data, layout, {displayModeBar: false, scrollZoom: true});

    autoEscala("graficoSinalEntrada");
}

// Função responsável por chamar a controller da fórmula do amplitude de entrada e preencher o gráfico
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
    Plotly.newPlot("graficoAmplitudeEntrada", data, layout, {displayModeBar: false, scrollZoom: true});

    autoEscala("graficoAmplitudeEntrada");
}

// Função responsável por chamar a controller da fórmula do fase de entrada e preencher o gráfico
function iniciarGraficoFaseEntrada(){
    let f1 = parseFloat(document.querySelector("#f1").value);

    // Define Data
    let data = [];

    for (let k = 0; k <= 50; k += 1) {
        data.push({
            x: [k*f1, k*f1],
            y: [0, 180],
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

// Função responsável por chamar a controller da fórmula da amplitude do canal e preencher o gráfico
async function iniciarGraficoAmpliCanal() {
    let frequencias = {
        frequenciaInicialDoCanal: parseFloat(document.querySelector("#f2").value),
        frequenciaFinalDoCanal: parseFloat(document.querySelector("#f3").value)
    }

    let exp = await obterExpressao('amplitude-canal', frequencias);
    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= loopMaxSemSenoide(frequencias.frequenciaInicialDoCanal, frequencias.frequenciaFinalDoCanal); x += loopPercorrerSemSenoide(frequencias.frequenciaInicialDoCanal, frequencias.frequenciaInicialDoCanal)) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Amplitude do Canal",};
    Plotly.newPlot("graficoAmpliCanal", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoAmpliCanal");
}

// Função responsável por chamar a controller da fórmula da fase do canal e preencher o gráfico
async function iniciarGraficoFaseCanal() {
    let frequencias = {
        frequenciaInicialDoCanal: parseFloat(document.querySelector("#f2").value),
        frequenciaFinalDoCanal: parseFloat(document.querySelector("#f3").value)
    }

    let exp = await obterExpressao('fase-canal', frequencias);

    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= loopMaxSemSenoide(frequencias.frequenciaInicialDoCanal, frequencias.frequenciaFinalDoCanal); x += loopPercorrerSemSenoide(frequencias.frequenciaInicialDoCanal, frequencias.frequenciaInicialDoCanal)) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = { title: "Fase do Canal em Grau",};
    Plotly.newPlot("graficoFaseCanal", data, layout, {displayModeBar:false, scrollZoom: true});

    autoEscala("graficoFaseCanal");
}

// Função responsável por chamar a controller da fórmula do sinal de saída e preencher o gráfico
async function iniciarGraficoSinalSaida() {

    let frequencias = {
        frequenciaDoSinal: parseFloat(document.querySelector("#f1").value),
        frequenciaInicialDoCanal: parseFloat(document.querySelector("#f2").value),
        frequenciaFinalDoCanal: parseFloat(document.querySelector("#f3").value)
    }

    let exp = await obterExpressao('sinal-saida', frequencias);

    var funcG = (1/frequencias.frequenciaInicialDoCanal)*(frequencias.frequenciaDoSinal/Math.sqrt((1+(Math.pow((frequencias.frequenciaDoSinal/frequencias.frequenciaInicialDoCanal),2)))*(1+(Math.pow((frequencias.frequenciaDoSinal/frequencias.frequenciaFinalDoCanal),2)))));
    
    // Generate values
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= ((3+funcG) * loopMaxSenoide(String(frequencias.frequenciaDoSinal))); x += loopPercorrerSenoide(String(frequencias.frequenciaDoSinal))) {
        xValues.push(x);
        yValues.push(eval(exp));
    }

    // Display using Plotly
    const data = [{x: xValues, y: yValues, mode: "lines"}];
    const layout = {title: "Sinal de Saída",};
    Plotly.newPlot("graficoSinalSaida", data, layout, {displayModeBar: false, scrollZoom: true});

    autoEscala("graficoSinalSaida");
}

// Função responsável por chamar a controller da fórmula da amplitude de saida e preencher o gráfico
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

// Função responsável por chamar a controller da fórmula da fase de saida e preencher o gráfico
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
            y: [0, eval(exp) + 180],
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

// Função responsável por validar os valores de frequência
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

// Função responsável por chamar os grafico ao clicar no botão calcular
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

// Função responsável focar nos valores do grafico
function autoEscala(grafico) {
    Plotly.relayout(grafico, {
        'xaxis.autorange': true,
        'yaxis.autorange': true
    });
}

// Função responsável por calcular a quantidade máxima de períodos do gráfico de senoide
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

//Função responsável por calcular o menor valor inserido para o gráfico de senoide, evitando perda de desempenho
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

// Função responsável por calcular a quantidade máxima de períodos do gráfico sem senoide
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

//Função responsável por calcular o menor valor inserido para o gráfico de sem senoide, evitando perda de desempenho
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

