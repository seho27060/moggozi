package com.JJP.restapiserver.controller.Tag;

import com.JJP.restapiserver.domain.dto.tag.TagRequestDto;
import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.service.Tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("*")
@RestController
@RequestMapping("/hobby")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping("/search/{keyword}")
    public ResponseEntity<TagResponseDto> autoCompletion(@PathVariable String keyword){
        return tagService.autoCompletion(keyword);
    }

    @PostMapping("/save")
    public ResponseEntity saveTag(@RequestBody TagRequestDto tagRequestDto){
        if(tagService.existsByTag(tagRequestDto.getName()))
        {
            return new ResponseEntity(tagService.getTagByName(tagRequestDto.getName()), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity(tagService.saveTag(tagRequestDto.getName()), HttpStatus.OK);
        }
    }

    @GetMapping("/exist/{keyword}")
    public ResponseEntity checkTagExists(@PathVariable String keyword)
    {
        return new ResponseEntity(tagService.existsByTag(keyword), HttpStatus.OK);
    }
}
