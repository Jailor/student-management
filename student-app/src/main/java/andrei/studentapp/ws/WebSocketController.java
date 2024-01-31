package andrei.studentapp.ws;

import lombok.Getter;
import lombok.Setter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/newDiscount")
    @SendTo("/topic/discounts")
    public DiscountInfo sendDiscount(DiscountInfo discountInfo) throws Exception {
        // Here, you can add the logic when a new discount is added
        return discountInfo;
    }
}

@Getter
@Setter
class DiscountInfo {
    private Long foodId;
    private Double discount;
    private Long providerId;
    // Getters and Setters
}