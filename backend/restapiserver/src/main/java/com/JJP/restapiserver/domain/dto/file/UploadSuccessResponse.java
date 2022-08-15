package com.JJP.restapiserver.domain.dto.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadSuccessResponse {

    private String fileName;
    private String path;

}
