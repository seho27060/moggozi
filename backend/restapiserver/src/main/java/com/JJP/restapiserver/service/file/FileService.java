package com.JJP.restapiserver.service.file;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    ResponseEntity<?> saveFile(MultipartFile file, String directory, String registeredImg) throws IOException;

    ResponseEntity<?> removeFile(String filePath);

//    ResponseEntity<?> getFile(String fileName);
}
