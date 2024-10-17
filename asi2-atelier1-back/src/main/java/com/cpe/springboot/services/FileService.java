package com.cpe.springboot.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
@Slf4j
public class FileService {

    @Value("${img.path}")
    private Path imgPath;

    public String saveImage(String filename, String base64Image) {

        String fullPath = Paths.get(String.valueOf(imgPath), filename).toString();
        File directory = imgPath.toFile();
        if (!directory.exists()) {
            directory.mkdirs();
        }
        byte[] decodedFile = Base64.getDecoder().decode(base64Image.getBytes(StandardCharsets.UTF_8));
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(fullPath))) {
            outputStream.write(decodedFile);
        } catch (Exception e) {
            log.error("Error while saving image", e);
        }
        return "/images/" + filename;
    }

}
