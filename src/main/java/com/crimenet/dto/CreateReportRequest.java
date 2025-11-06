package com.crimenet.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateReportRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Priority is required")
    private String priority;

    @NotBlank(message = "Location is required")
    private String location;

    private Double latitude;
    private Double longitude;
    private String incidentAt; // ISO 8601 date string
    private Boolean isAnonymous;
}
