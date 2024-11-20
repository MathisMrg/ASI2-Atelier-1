package com.cpe.springboot.configurations;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Path;

@Configuration
@ConfigurationProperties(prefix = "img")
@Getter
@Setter
@NoArgsConstructor
@Slf4j
public class PathConfig {
    private Path imgPath;
    @NotNull
    private String localAddress;

}
