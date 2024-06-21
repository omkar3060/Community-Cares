package com.charity.charity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "accepted")
public class AcceptedCampaign extends Campaign {
    // No additional fields or methods needed
}