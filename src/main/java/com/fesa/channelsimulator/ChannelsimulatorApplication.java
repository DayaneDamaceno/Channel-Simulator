package com.fesa.channelsimulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.fesa.channelsimulator.controllers"})
public class ChannelsimulatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChannelsimulatorApplication.class, args);
	}

}
