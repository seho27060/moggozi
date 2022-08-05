package com.JJP.restapiserver.controller.file;

import com.JJP.restapiserver.service.file.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/file")
public class FileController {

    private final FileService fileService;

    // 파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<?> saveFile(@RequestParam("path") String path, @RequestParam("pageName") String pageName, @PathVariable MultipartFile file) throws Exception {

        return fileService.saveFile(file, pageName, path);
    }

//    // 파일 삭제
//    @PostMapping("/delete/{filePath}")
//    public ResponseEntity<?> deleteFile(@PathVariable("filePath") String filePath) {
//        return fileService.deleteFile(filePath);
//    }

    /* TODO: MULTIPLE FILES UPLOAD/GET
    @PostMapping("/uploadM")
    public ResponseEntity<?> saveMuitlFiles(@RequestParam("files") MultipartFile[] files) {
        return fileService.saveMultiFiles(files);
    }
    */
}
