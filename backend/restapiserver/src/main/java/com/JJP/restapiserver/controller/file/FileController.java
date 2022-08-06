package com.JJP.restapiserver.controller.file;

import com.JJP.restapiserver.service.file.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@Tag(name = "FileController", description = "파일업로드 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/file")
public class FileController {

    private final FileService fileService;

    @Operation(summary = "이미지업로드", description = "registeredPath: 등록된 이미지 경로 / directory: 저장하고자하는 폴더명 / " +
            "file: enctype='multipart/form-data'")
    @PostMapping("/upload")
    public ResponseEntity<?> saveFile(@RequestParam("registeredImg") String registeredImg, @RequestParam("directory") String directory, @PathVariable MultipartFile file) throws Exception {

        return fileService.saveFile(file, directory, registeredImg);
    }

    // 파일 삭제
    @PostMapping("/delete/{filePath}")
    public ResponseEntity<?> deleteFile(@PathVariable("filePath") String filePath) {
        return fileService.removeFile(filePath);
    }

    /* TODO: MULTIPLE FILES UPLOAD/GET
    @PostMapping("/uploadM")
    public ResponseEntity<?> saveMuitlFiles(@RequestParam("files") MultipartFile[] files) {
        return fileService.saveMultiFiles(files);
    }
    */
}
