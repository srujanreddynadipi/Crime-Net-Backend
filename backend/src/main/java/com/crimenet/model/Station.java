package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class Station {
    private String stationId;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private String contact;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
