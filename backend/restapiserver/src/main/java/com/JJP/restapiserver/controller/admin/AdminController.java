package com.JJP.restapiserver.controller.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/")
    public String index(){

        return "index";
    }


    @GetMapping("/user")
    public String userManage(){
        return "userManage";
    }

    @GetMapping("/challenge")
    public String challengeManage(){
        return "challengeManage";
    }
    @GetMapping("/stage")
    public String stageManage(){
        return "stageManage";
    }

    @GetMapping("/post")
    public String postManage(){
        return "postManage";
    }

    @GetMapping("/comment")
    public String commentManage(){
        return "commentManage";
    }
}
