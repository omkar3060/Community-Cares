package com.charity.charity;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckoutController {

    @Value("")
    private String stripeSecretKey; // Your Stripe secret key

    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession() {
        Stripe.apiKey = stripeSecretKey;

        try {
            // Create a Checkout Session
            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:8080/success") // Redirect URL after successful payment
                    .setCancelUrl("http://localhost:8080/cancel")   // Redirect URL if the payment is canceled
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd") // Currency (e.g., USD)
                                                    .setUnitAmount(1000L) // Amount in cents (e.g., $10.00)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Donation")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);

            // Return the session ID to the client as JSON
            return ResponseEntity.ok().body("{\"sessionId\": \"" + session.getId() + "\"}");
        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create checkout session");
        }
    }
}
