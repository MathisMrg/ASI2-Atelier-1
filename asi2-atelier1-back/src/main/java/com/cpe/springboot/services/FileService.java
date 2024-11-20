package com.cpe.springboot.services;

import com.cpe.springboot.configurations.PathConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {


    private final PathConfig pathConfig;

    public String saveImage(String filename, String base64Image) {

        String fullPath = Paths.get(String.valueOf(pathConfig.getImgPath()), filename).toString();
        File directory = pathConfig.getImgPath().toFile();
        if (!directory.exists()) {
            directory.mkdirs();
        }
        byte[] decodedFile = Base64.getDecoder().decode(base64Image.getBytes(StandardCharsets.UTF_8));
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(fullPath))) {
            outputStream.write(decodedFile);
        } catch (Exception e) {
            log.error("Error while saving image", e);
        }
        return "/" + filename;
    }

    public String getUriPath(String filepath) {
        String url = "http://" + pathConfig.getLocalAddress()  + filepath;
        try {
            new URL(url);
        } catch (MalformedURLException e) {
            log.info("Error while creating URL", e);
            throw new RuntimeException(e);
        }
        return url;
    }

}
