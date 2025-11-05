package com.crimenet.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateConversationRequest {
    private List<String> participants;
    private String reportId;
}
