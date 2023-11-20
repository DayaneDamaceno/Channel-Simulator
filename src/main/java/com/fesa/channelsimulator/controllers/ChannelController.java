package com.fesa.channelsimulator.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/")
public class ChannelController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home() {

        return "home";
    }

    @RequestMapping(value = "/expressao/sinal-entrada", method = RequestMethod.GET)
    public @ResponseBody Map<String, String> obterExpressaoSinalDeEntrada(@RequestParam Float frequenciaDoSinal) {
        Map<String, String> response = new HashMap<>();
        response.put("expressao", "Math.abs(Math.sin(2*Math.PI*" + frequenciaDoSinal + "*x))");
        return response;
    }

    @RequestMapping(value = "/expressao/amplitude-canal", method = RequestMethod.GET)
    public @ResponseBody Map<String, String> obterExpressaoAmplitudeCanal(@RequestParam Float frequenciaInicialDoCanal, @RequestParam Float frequenciaFinalDoCanal) {
        Map<String, String> response = new HashMap<>();
        response.put("expressao", "(1/ " + frequenciaInicialDoCanal + ")*(x/Math.sqrt((1+(Math.pow((x/" + frequenciaInicialDoCanal + "),2)))*(1+(Math.pow((x/"+ frequenciaFinalDoCanal +"),2)))))");
        return response;
    }

    @RequestMapping(value = "/expressao/fase-canal", method = RequestMethod.GET)
    public @ResponseBody Map<String, String> obterExpressaoFaseCanal(@RequestParam Float frequenciaInicialDoCanal, @RequestParam Float frequenciaFinalDoCanal) {
        Map<String, String> response = new HashMap<>();
        response.put("expressao", "((-Math.PI/2) - Math.atan((x*(" + (frequenciaInicialDoCanal + frequenciaFinalDoCanal) + "))/( " + (frequenciaInicialDoCanal * frequenciaFinalDoCanal) + " - Math.pow(x,2))))*(180/Math.PI)");
        return response;
    }

    @RequestMapping(value = "/expressao/sinal-saida", method = RequestMethod.GET)
    public @ResponseBody Map<String, String> obterExpressaoSinalSaida(@RequestParam Float frequenciaDoSinal, @RequestParam Float frequenciaInicialDoCanal, @RequestParam Float frequenciaFinalDoCanal) {
        Map<String, String> response = new HashMap<>();

        var funcG = String.format("(1/%2$f)*(%1$f/Math.sqrt((1+(Math.pow((%1$f/%2$f),2)))*(1+(Math.pow((%1$f/%3$f),2)))))", frequenciaDoSinal, frequenciaInicialDoCanal, frequenciaFinalDoCanal);
        var funcFase = String.format("((-Math.PI/2) - Math.atan((%1$f*(%2$f + %3$f))/((%2$f*%3$f)- Math.pow(%1$f,2))))*(180/Math.PI)", frequenciaDoSinal, frequenciaInicialDoCanal, frequenciaFinalDoCanal);

        response.put("expressao", funcG + "*Math.abs(Math.sin(2*Math.PI*" + frequenciaDoSinal + "* x +"+ funcFase +"))");

        return response;
    }
}
