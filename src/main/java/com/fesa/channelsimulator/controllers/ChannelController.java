package com.fesa.channelsimulator.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class ChannelController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home() {

        return "home";
    }
}
