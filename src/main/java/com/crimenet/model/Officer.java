package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class Officer {
    private String officerId;
    private String userId;
    private String stationId;
    private String badgeNumber;
    private String designation;
    private String areaAssigned;
    private Boolean isActive;
    private String shift;
    private String precinctCode;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
