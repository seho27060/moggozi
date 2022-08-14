package com.JJP.restapiserver.service.Tag;

import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;

import java.util.List;

public interface ChallengeTagService {
    public List<ChallengeTag> getChallengeTagContainingTag(String tag);
}
