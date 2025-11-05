package com.crimenet.dto;

import lombok.Data;

@Data
public class UpdateStatusRequest {
    private String status;
    private String note;
}
