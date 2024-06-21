package com.charity.charity;

import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "rejected")
public class RejectedCampaign extends Campaign {

}
