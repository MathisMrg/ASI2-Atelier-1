package com.cpe.springboot.asi2_atelier1_img_gen.listeners;

import com.cpe.springboot.asi2_atelier1_img_gen.services.clientresponse.IImgGenClientResponseService;
import com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.IImgGenService;
import com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.exceptions.ImageGenerationException;
import com.cpe.springboot.common.ImageGenerationRequestDTO;
import com.cpe.springboot.common.ImageGenerationResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class ActiveMQListener {

    private final IImgGenService imgGenService;

    private final IImgGenClientResponseService clientResponseService;

    public ActiveMQListener(IImgGenService imgGenService, IImgGenClientResponseService clientResponseService) {
        this.imgGenService = imgGenService;
        this.clientResponseService = clientResponseService;
    }

    @JmsListener(destination = "imggen")
    public void onTextGenRequest(ImageGenerationRequestDTO req)  {
        log.info("request received : {}", req);
        try {
            clientResponseService.callbackClient(convertImageToDto(req, imgGenService.generateImage(req)), req.callbackUrl());
        } catch (ImageGenerationException e) {
            clientResponseService.callbackClient(convertImageGenerationExceptionToDto(req, e), req.callbackUrl());
        }
    }

    private ImageGenerationResponseDTO convertImageToDto(ImageGenerationRequestDTO req, String base64Image) {
        return new ImageGenerationResponseDTO(req.transactionId(), true, "", base64Image);
    }

    private ImageGenerationResponseDTO convertImageGenerationExceptionToDto(ImageGenerationRequestDTO req, ImageGenerationException e) {
        return new ImageGenerationResponseDTO(req.transactionId(), false, "exception occured during image gen :" + e.getMessage(), "");
    }
}
