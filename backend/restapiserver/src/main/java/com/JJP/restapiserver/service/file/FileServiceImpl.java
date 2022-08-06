package com.JJP.restapiserver.service.file;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.file.UploadSuccessResponse;
import com.JJP.restapiserver.domain.entity.file.Image;
import com.JJP.restapiserver.repository.file.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    // 프로필 이미지 경로
    @Value("${properties.user}")
    private String uploadPath;

    private final FileRepository fileRepository;

    /**
     * 이미지 파일 업로드, 이미 업로드한 이미지가 있을 경우, 이미지 삭제 후 이미지 업로드
     *
     * @param file: 이미지파일
     * @param directory: 저장할 폴더명(ex. profile - 사용자의 프로필 사진들을 보관하는 폴더명)
     * @param registeredImg: 기존에 저장된 이미지의 경로 - 없다면, 새로운 이미지 등록
     * @return 파일이 저장된 경로명
     */
    @Override
    public ResponseEntity<?> saveFile(MultipartFile file, String directory, String registeredImg) {

        // 등록된 이미지가 있다면 등록된 이미지 삭제
        if (registeredImg.isEmpty()) {
            // 데이터 베이스에서 파일 삭제
            delete(registeredImg);
            // 경로에서 파일 삭제
            try {
                Files.delete(Path.of(registeredImg));
            } catch (IOException e) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Failed to delete the registered file."));
            }
        }

        String path = null;

        /** TODO: Stage, Post 별 경로 설정 */
        switch (directory) {
            case "user":
                path = uploadPath;
                break;
            case "stage":
//                path = ../img/stage
                break;
            case "post":
//                path = ??;
                break;
        }

        /** 파일 저장 */
        String fileName = StringUtils.cleanPath(file.getOriginalFilename()); // 파일의 실제이름
        String encodedFileName = UUID.randomUUID().toString() + fileName;
        try {

            if (fileName.contains("..")) // 파일 이름에 오류가 있는 경우
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Check your file name."));

            if (file.getSize() == 0) { // 빈 파일이 아닌지 확인
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Empty file."));
            }

            File dir = new File(path);
            if (dir.exists() == false) { // 디렉토리가 존재하지 않을 경우 디렉토리 만들기
                dir.mkdirs();
            }

            path += encodedFileName;

            // 파일 업로드
            Files.write(Path.of(path), file.getBytes());

            Image uploadImage = Image.builder().path(path)
                    .type(file.getContentType()).build();

            fileRepository.save(uploadImage);

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: saving file has failed."));
        }
        return ResponseEntity.ok(UploadSuccessResponse.builder().fileName(fileName).path(path).build());
    }

    @Override
    public ResponseEntity<?> removeFile(String filePath) {
        delete(filePath);
        return ResponseEntity.ok("Deleted the image successfully.");
    }

    /**
     * db에서 주어진 경로에 있는 파일 삭제
     * @param filePath : 삭제할 파일이 있는 경로명
     */
    private void delete(String filePath) {
        Image image = fileRepository.findByPath(filePath).get();
        fileRepository.delete(image);
    }

    /* 파일 다운로드 기능 필요하다면 주석 해제후 로직 작성
    @Override
    public ResponseEntity<?> getFile(String fileName) {
        Optional<FileResponse> dbFile = fileRepository.findByName(fileName);
        return null;
    }*/

}
